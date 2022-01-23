---
title: Mutex, Semafori e Monitor
layout: page
materia: tpsit
align: justify
---

## Mutex
Il concetto di <span class="text-danger">Mutex</span> (Mutual Exclusive) viene usato per indicare una qualche risorsa che può essere utilizzata da **un solo thread o processo** per volta

<div class="alert alert-success" markdown="1">
<strong><i class="bi bi-exclamation-octagon"></i> Terminologia</strong><br />
Si dice quindi che *l'uso da parte un thread esclude l'uso da tutti gli altri da cui la dicitura mutua esclusione*.
</div>

In pratica, un *mutex* è una variabile ``bool``, quindi che può assumere solo i valor ``true`` e
``false``. Quando la variabile è ``true`` il mutex è stato acquisito da un qualche thread ed
è quindi **locked**. Quando la variabile è ``false`` il mutex è **unlocked** (*libero*) ed un
thread che ne ha bisogno lo può acquisire impostando la variabile a true

<div class="alert alert-danger" markdown="1">
<strong><i class="bi bi-exclamation-triangle"></i> Attenzione</strong><br />
Anche se un mutex si può implementare con una semplice variabile booleana, è necessario che
esista un meccanismo di [Sezione Critica](sezione_critica.html) che garantisce che *la variabile
non può essere oggetto di* **data race** tra thread diversi.
</div>

Per quanto detto sopra, il mutex viene spesso chiamato **lock** in quanto rappresenta un
meccanismo di "blocco" dell'utilizzo di una risorsa, vediamo come si usa un mutex.

<div class="alert alert-info" markdown="1">
<strong><i class="bi bi-pen"></i> Esercizio</strong><br />
Disegnare il *sequence diagram* di una situazione in cui la variabile booleana condivisa
``mutex`` che ha valore ``false`` (mutex libero) viene letta da due thread prima che nessuno dei due la cambi. Quindi entrambi
vedono il mutex libero ed entrambi impostano a ``true`` il valore.
</div>

### Utilizzo di un Mutex
Supponiamo di avere una risorsa condivisa, ad esempio un file, sulla quale diversi thread
possono leggere e scrivere. Ovviamente non vogliamo che i thread scrivano in maniera
disordinata. Per esempio se il Thread 1 scrive il nome dello studente ``Albert Einstein``,
mentre il Thread 2 scrive il nome dello studente ``Steve Jobs``, di certo non vogliamo che
il file contenga

    Steve Einstein
    Albert Jobs

e nemmeno

    StAlbeeve JrtEinstobs
    ein

cosa che potrebbe succedere senza un controllo su chi scrive prima e chi scrive dopo.

Come detto sopra possiamo evitare questo, usando una variabile booleana che rappresenta
il lock (mutex) al file. Un estratto di codice Java che fa questo è il seguente (è
importante che la variabile ``fileLocked`` sia condivisa).
{% highlight java %}
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
{% endhighlight %}

### Implementazione di un mutex
Nell'esempio sopra abbiamo visto come una semplice variabile booleana sia sufficiente
a creare un mutex. Tuttavia, abbiamo anche detto che questa soluzione non garantisce
che il mutex (la variabile) sia letto e scritto nell'ordine corretto (vedi esercizio
sopra).

Per evitare conflitti nella gestione della variabile condivisa (``fileLocked`` nel
nostro esempio), possiamo usare una *sezione critica* in Java che, ricordiamo, si crea
con la parola chiave ``synchronized`` (vedi [questa](sezione_critica.html) pagina).

Ricordiamo che il ``synchronized`` di Java si può usare sia all'interno di un metodo,
sia come "descrittore" del metodo, nell'esempio che segue useremo ``synchronized`` nel
secondo modo.

{% highlight java %}
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
{% endhighlight %}

## Semafori

## Monitor