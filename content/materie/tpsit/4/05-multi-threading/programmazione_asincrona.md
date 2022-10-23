---
title: Programmazione asincrona
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/concurrency/async-programming
weight: 50
---

## Programmazione sequenziale
Normalmente siamo abituati a pensare ad un programma come ad una **sequenza di istruzione**, questo è in effetti quello che accade all'interno di un core della CPU che esegue continuamente il [ciclo di fetch-and-execute]({{< ref "cpu.md" >}}). Per questo motivo si parla anche di **programmazione sequenziale** nel qual caso il compito del programmatore è trovare la giusta sequenza di istruzione (siano esse istruzioni Java, C++, assembly, ...).

{{<column/two-cols wl=8 wr=4 content="left" embed="img/img_iphone.html">}}
Tuttavia, se si pensa a come oggi usiamo i nostri dispositivi (smartphone, laptop, PC, ...), ci si accorge subito che non si tratta di un un "uso sequenziale". Siamo ormai abituati ad interagire con il dispositivo e ad aspettarci che reagisca al nostro input (tap, click, swipe, ...). In pratica un dispositivo moderno è un oggetto in grado di reagire ad **eventi** che si verificano quali:

* tap di un icona,
* click di un bottone con il tasto destro del mouse,
* inserimento di un carattere dalla tastiera,
* gesture di "scuotimento" del dispositivo,
* ...

in questo scenario è normale domandarsi se esista qualcosa di meglio della programmazione sequenziale per gestire tutti questi input.
{{</column/two-cols>}}


<!-- ## Programmazione ad eventi -->

## Programmazione asincrona

La **programmazione asincrona** è un caso particolare di programmazione ad eventi molto
utilizzato nello sviluppo di applicazioni Web (ma non solo). L'idea della programmazione
asincrona è che una operazione viene avviata (ad esempio una richiesta ad un sito Web)
e solo quando questa richiesta termina, una procedura *asincrona* viene eseguita.

Uno dei principali utilizzi della programmazione asincrona è evitare che un programma si
blocchi in attesa di un'operazione che richiede tanto tempo. Ad esempio, il download di un
immagine da un sito bloccherebbe il browser (o il *rendering* della pagina web) se non
fosse eseguito utilizzando la programmazione asincrona.

La programmazione asincrona si basa su due idee relativamente semplici
1. **chiamata asincrona** (o *non bloccante*) di una funzione (o di un metodo) e
2. **operazione futura** (o *future*) da eseguire al termine della chiamata asincrona.

{{<column/two-cols vl=6 wr=6 content="right" embed="img/sequence_diagram_async.html">}}
Nella figura a fianco, vediamo il *sequence diagram* di una tipica chiamata asincrona
con utilizzo di un future.
1. Il thread `Main` ad un certo punto, esegue una *chiamata asincrona* ad una funzione
(che diventerà un thread) `Async`. Appena dopo questa chiamata, `Main` riprende
con le istruzioni successive.
2. `Async` esegue le proprie istruzioni al termine delle quali chiama la funzione
`Future` la quale ha il compito di gestire il risultato di `Async`.
3. Nell'esempio a lato, questa gestione termina con la restituzione a `Main` di un
qualche esito, **ma questo non è necessario**. Ad esempio `Future` potrebbe
semplicemente salvare un file oppure cambiare qualcosa nell'interfaccia (o nella pagina
web) senza "disturbare" `Main`.
{{</column/two-cols>}}

Due cose dell'esempio sopra sono importanti:
* `Main` non è mai in attesa che si completi l'operazione asincrona,
* `Async` e `Future` avvengono uno dopo l'altro e quindi non servono due thread
distinti (per questo motivo `Async` e `Future` sono spesso un'unica funzione o
metodo, vedi sotto la classe `FutureTask` di Java).

### Programmazione asincrona in Java: `FutureTask`

Vediamo ora come in Java sia possibile sfruttare la programmazione asincrona. La classe
Java che permette questo è [`FutureTask`](https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/FutureTask.html). A differenza di altri linguaggi (ad esempio JavaScript),
Java richiede un po' di codice per utilizzare la programmazione asincrona, in particolare
1. bisogna utilizzare un `ExecutorService` per avviare una chiamata asincrona
2. bisogna predisporre una classe che sia `Runnable` o  `Callable` con il codice asincrono

{{<attention>}}
In Java la classe `FutureTask` è la classe che esegue il codice asincrono (il thread
`Async` nell'esempio sopra). Non è previsto in Java che vi sia un metodo chiamato al
termine del metodo asincrono.
{{</attention>}}

#### `FutureTask` con `Runnable`
Quando si intende usare un `FutureTask` per eseguire una routine che non ha valori
di ritorno, è possibile usare l'interfaccia `Runnable`. Questo metodo risulta comodo
in quanto questa è la stessa interfaccia che si usa per avviare `Thread` ed è perciò
possibile passare dall'utilizzo "diretto" dei thread all'utilizzo "indiretto" mediante
future in modo molto semplice.

Vediamo un esempio molto semplice di una classe `AsyncRunnable` che implementa
l'interfaccia `Runnable` e che nel proprio metodo `run()` si mette in *sleep* per
5 secondi prima di stampare a video un messaggio e terminare (i 5 secondi di sleep
servono solo per l'esempio, normalmente il metodo `run()` esegue operazioni più
utili).

{{<highlight java>}}
public class AsyncRunnable implements Runnable {
    @Override
    public void run() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("run() terminato");
    }
}
{{</highlight>}}

Fatto questo è possibile avviare un `FutureTask` che utilizzi un'istanza della classe
`AsyncRunnable` (come se si avviasse un thread). Questo deve essere fatto mediante un
`ExecutorService` che gestisce vari thread (nell'esempio sotto si usa il *factory method*
`newFixedThreadPool` della classe `Executors`).

{{<highlight java>}}
String result = null;
AsyncRunnable runnable = new AsyncRunnable();
FutureTask<String> taskRun = new FutureTask<String>(runnable, result);
ExecutorService executor = Executors.newFixedThreadPool(2); // 2 thread
executor.execute(taskRun);
{{</highlight>}}

Le istruzioni che seguono l'ultima riga vengono subito eseguite senza aspettare che il
metodo `run()` dell'istanza `runnable` termini. Questo è esattamente il comportamento
*asincrono* che volevamo ottenere.

{{<attention>}}
La libreria Java obbliga a creare un `FutureTask` con un `Runnable` e un valore
di ritorno (`String` nell'esempio). Siccome il metodo `run()` di `Runnable`
restituisce `void` (cioè non restituisce nulla), non c'è nessun risultato da e
la variabile passata rimarrà sempre al valore impostato. Per operazioni asincrone che
producono un risultato (un `Future`) è preferibile usare `FutureTask` con un
oggetto `Callable` come descritto sotto.
{{</attention>}}

#### `FutureTask` con `Callable`
L'utilizzo di `FutureTask` con l'interfaccia `Callable` è molto simile al caso
precedente. Prima vediamo una semplice implementazione di tale interfaccia.

{{<highlight java>}}
public class AsyncCallable implements Callable<String> {
    @Override
    public String call() throws Exception {
        Thread.sleep(5000);
        System.out.println("call() terminato");
        return "Risultato: 42";
    }
}
{{</highlight>}}

Notiamo subito alcune differenze con il caso `Runnable`.
* `Callable` ha un *generic* e quindi dobbiamo aggiungere `<String>` dopo il nome
dell'interfaccia. Questo vuol dire che il metodo `call()` restituisce `String`, se
avessimo voluto restituire qualcos'altro, ad esempio un intero, avremmo inserito tra
i simboli `<>` qualcosa di appropriato, ad esempio `<int>`.
* Il metodo da implementare non è `run()`, ma `call()` che, a differenza di `run()`
restituisce qualcosa diverso da `void`. Inoltre il metodo `call` deve dichiarare
`throws Exception` in quanto può generare eccezioni (si nota, infatti, che `Thread.sleep`
non è all'interno di `try...catch` come nel caso precedente).

Il codice per utilizzare questa classe con un `FutureTask` è quasi identico al caso
di `Runnable` visto sopra.

{{<highlight java>}}
String result = null;
AsyncCallable callable = new AsyncCallable();
FutureTask<String> taskCall = new FutureTask<String>(callable);
executor.execute(taskCall);
System.out.println("call() avviato");
{{</highlight>}}

A questo punto sorge spontanea la seguente domanda: *come è possibile recuperare il risultato di
`call` una volta terminato il metodo*? Notiamo che non c'è da nessuna parte la possibilità di
inserire un'istruzione tipo

    result = callable.call();

che sarebbe il metodo **sincrono** per eseguire il codice di `call()`.

Per recuperare il risultato restituito da `call()` (la string `"Risultato: 42"` nel nostro
esempio) si usa il metodo `get()` della classe `FutureTask`.

{{<highlight java>}}
try {
    result = taskCall.get();
    System.out.print("get() -> ");
    System.out.println(result);
} catch (InterruptedException e) {
    e.printStackTrace();
} catch (ExecutionException e) {
    e.printStackTrace();
}
{{</highlight>}}

{{<attention>}}
Il metodo `get()` della classe `FutureTask` è un *metodo bloccante* che rimane in
attesa del risultato fino a che il metodo `call` (o `run` se si usa `Runnable`)
non termina. Per questo motivo è importante **non chiamare il metodo `get` fino a che
il risultato non sia assolutamente indispensabile per proseguire con l'esecuzione**.
{{</attention>}}

{{<important>}}
l'`Executor` di Java che abbiamo visto nei precedenti esempi deve essere fermato affinché
il programma termini. Questo è possibile utilizzando il metodo `shutdown()` che avvia
lo "spegnimento" dell'`Executor`. Il metodo `shutdown()` non termina i task che sono
ancora in esecuzione, ma aspetta che tutti siano terminati.
{{</important>}}

