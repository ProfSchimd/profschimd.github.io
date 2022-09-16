---
title: Mutex, Semafori e Monitor
weight: 80
---

## Mutex
Il concetto di **Mutex** (Mutual Exclusive) viene usato per indicare una qualche risorsa che può essere utilizzata da **un solo thread o processo** per volta

{{<observe>}}
Si dice quindi che *l'uso da parte un thread esclude l'uso da tutti gli altri da cui la dicitura mutua esclusione*.
{{</observe>}}

In pratica, un *mutex* è una variabile `bool`, quindi che può assumere solo i valor `true` e
`false`. Quando la variabile è `true` il mutex è stato acquisito da un qualche thread ed
è quindi **locked**. Quando la variabile è `false` il mutex è **unlocked** (*libero*) ed un
thread che ne ha bisogno lo può acquisire impostando la variabile a true

{{<attention>}}
Anche se un mutex si può implementare con una semplice variabile booleana, è necessario che
esista un meccanismo di [Sezione Critica](sezione_critica.html) che garantisce che *la variabile
non può essere oggetto di* **data race** tra thread diversi.
{{</attention>}}

Per quanto detto sopra, il mutex viene spesso chiamato **lock** in quanto rappresenta un
meccanismo di "blocco" dell'utilizzo di una risorsa, vediamo come si usa un mutex.

{{<exercise>}}
Disegnare il *sequence diagram* di una situazione in cui la variabile booleana condivisa
`mutex` che ha valore `false` (mutex libero) viene letta da due thread prima che nessuno dei due la cambi. Quindi entrambi
vedono il mutex libero ed entrambi impostano a `true` il valore.
{{</exercise>}}

### Utilizzo di un Mutex
Supponiamo di avere una risorsa condivisa, ad esempio un file, sulla quale diversi thread
possono leggere e scrivere. Ovviamente non vogliamo che i thread scrivano in maniera
disordinata. Per esempio se il Thread 1 scrive il nome dello studente `Albert Einstein`,
mentre il Thread 2 scrive il nome dello studente `Steve Jobs`, di certo non vogliamo che
il file contenga

    Steve Einstein
    Albert Jobs

e nemmeno

    StAlbeeve JrtEinstobs
    ein

cosa che potrebbe succedere senza un controllo su chi scrive prima e chi scrive dopo.

Come detto sopra possiamo evitare questo, usando una variabile booleana che rappresenta
il lock (mutex) al file. Un estratto di codice Java che fa questo è il seguente (è
importante che la variabile `fileLocked` sia condivisa).
{{<highlight java>}}
// shared variable for the mutex
boolean fileLocked = false; 
...
// Thread (1 and 2 are similar)
while (fileLocked) {
    // do nothing
}
// acquire the lock, do things, and free the lock
fileLocked = true;
// use the file
fileLocked = false;
{{</highlight>}}

### Implementazione di un mutex
Nell'esempio sopra abbiamo visto come una semplice variabile booleana sia sufficiente
a creare un mutex. Tuttavia, abbiamo anche detto che questa soluzione non garantisce
che il mutex (la variabile) sia letto e scritto nell'ordine corretto (vedi esercizio
sopra).

Per evitare conflitti nella gestione della variabile condivisa (`fileLocked` nel
nostro esempio), possiamo usare una *sezione critica* in Java che, ricordiamo, si crea
con la parola chiave `synchronized` (vedi [questa]() pagina).

Ricordiamo che il `synchronized` di Java si può usare sia all'interno di un metodo,
sia come "descrittore" del metodo, nell'esempio che segue useremo `synchronized` nel
secondo modo.

{{<highlight java>}}
public class Mutex {
    private boolean locked;
    public Mutex() {
        locked = false;
    }
    public synchronized boolean lock() {
        if (!locked) {
            locked = true;
            return locked;
        }
        return false;
    }

    public synchronized boolean unlock() {
        if (locked) {
            locked = false;
            return false;
        }
        return true;
    }

    public boolean isLocked() {
        return locked;
    }
}
{{</highlight>}}

## Semafori
I mutex come descritti sopra permettono di mettere un *lock* (cioè un "lucchetto") ad una risorsa, ma **solo un thread alla volta può accedere a quella risorsa**. Alcune risorse potrebbero essere accessibili a più thread per volta, ad esempio in un processore con 4 core, 4 thread possono essere eseguiti contemporaneamente, ma altri thread che volessero essere eseguiti devono essere messi in attesa che un qualche core si liberi.

Un meccanismo che permette l'accesso fino a `T` thread contemporaneamente (ma non più di `T`) si usano i **semafori**. Un semaforo è semplicemente un *contatore* che tiene traccia di quanti thread stanno usando una determinata risorsa. Quando il contatore raggiunge il limite, allora il *semaforo diventa rosso* e nessun altro thread può usare la risorsa fino a che uno dei thread che la sta utilizzando la libera.

L'idea di un semaforo è che il thread che vuole accedere alla risorsa deve mettersi in attesa `wait` che la risorsa si liberi (semaforo verde). Quando un thread non ha più bisogno di accedere ad una risorsa che ha acquisito mediante semaforo, segnala (`signal`) il rilascio della risorsa. La seguente versione Java del semaforo rappresenta un punto di partenza che, come vedremo, può essere esteso in modo opportuno.

{{<highlight java>}}
public class Semaphore {
    private int value;
    public Semaphore(int v) {
        value = v;
    }
    // using wait doesn't work because Object already has the wait method
    public synchronized boolean waitSemaphore() {
        if (value > 0) {
            value--;
            return true; // can access resource
        }
        return false; // cannot access resource
    }
    // using signal doesn't work because Object already has the signal method
    public synchronized void signalRelease() {
        value++;
    }
}
{{</highlight>}}

Notiamo che l'implementazione del semaforo avviene mediante un *countdown*, cioè si parte dal numero di "posti" disponibili per l'accesso alla risorsa e si decrementa fino a che non si raggiunge `value` zero che indica che *non ci sono più posti disponibili* (semaforo rosso).

### Coda al semaforo
L'idea del semaforo per la gestione delle risorse presenta un'altra analogia con i semafori per la gestione del traffico, la *coda*. In un semaforo, quando un thread richiede una risorsa che non è disponibile (semaforo rosso), il thread si mette in attesa che la risorsa si liberi (come l'auto in attesa del semaforo verde). In pratica di fronte al semaforo si viene a formare una **coda di thread** in attesa che qualche altro thread liberi la risorsa.

Il codice che segue mostra una "bozza" di classe `Semaforo` che aggiunge alla versione sopra la coda (oggetto `Queue`) dei thread che sono in attesa dell'accesso alla risorsa.

{{<highlight java>}}
public class Semaphore {
    private int value;
    private Queue coda;
    public Semaphore(int v) {
        value = v;
        // coda = ...
    }
    public synchronized void waitSemaphore(Thread t) {
        value--;
        if (value < 0) {
            coda.addTOWaitingList(t);
        }
    }
    public synchronized void signalRelease() {
        value++;
        if (value <= 0) {
            coda.risvegliaIlProssimoThreadInCoda();
        }
    }
}
{{</highlight>}}

{{<observe>}}
Il codice sopra utilizza in maniera "intelligente" la variabile `value`.

* Appena creata la classe, `value` contiene il numero di accessi contemporanei massimo.
* In ogni momento, `value` può essere:
    * positivo ad indicare quanti thread possono ancora accedere alla risorsa;
    * zero significa che non ci sono più posti disponibili (semaforo rosso) **e** e non ci sono thread in coda;
    * negativo indica che non ci sono posti disponibili **e** ci sono `|value|` (**valore assoluto**) processi in coda.
</div>
{{</observe>}}

## Monitor