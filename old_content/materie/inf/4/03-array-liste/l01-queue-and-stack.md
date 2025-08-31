---
title: "Laboratorio: Queue e Stack"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/queue-and-stack
weight: 910
summary: "In questo laboratorio, si procede all'implementazione in Java delle interfacce per queue (code) e stack (liste)."
---

## Le interfacce `IQueue` e `IStack`
Vediamo qui una breve definizione dell *strutture dati astratte* chiamate *queue* (*coda*)
e *stack* (*pila*), più dettagli sono forniti nella [Lezione su queue e stack]({{<ref 01-queue-and-stack.md>}}).

### Queue (coda)
La struttura dati *queue* (in italiano *coda*) descrive, in termini informatici, quello che
accade nelle code, ad esempio alla cassa del supermercato. Gli elementi "entrano" nella
coda alla fine di questa detta anche la *coda* (*tail*), ed "escono" all'inizio della coda,
detta anche la *testa* (*head*).

Da questo comportamento deriva la politica nota come **FIFO: First In First Out** cioè il
primo elemento inserito (la prima persona and *accodarsi* in cassa) sarà anche il primo
elemento ad essere recuperato (la prima persona ad essere servita alla cassa).

Nelle code l'operazione di inserimento prende il nome di *enqueue* e l'operazione di cancellazione
prende il nome di *dequeue*; l'accesso è possibile solo al "primo della fila" e prende il nome
di *front* (a volte *head*). Se a queste operazioni aggiungiamo le operazioni *size* per sapere
quanti elementi sono presente e *is empty* per sapere se la coda è vuota abbiamo la seguente
interfaccia Java.

{{<highlight java>}}
public interface IQueue {
    void enqueue(Object o);
    Object dequeue();
    Object front();
    int size();
    boolean isEmpty();
}
{{</highlight>}}

### Stack (pila)
La struttura dati *stack* (in italiano *pila*) descrive in termini informatici, quello
che accade ogni volta che impiliamo degli oggetti (ad esempio i piatti, le magliette,
i fogli, ...). Gli elementi "entrano" nella pila sulla sommità di essa, detta *top*, ed
"escono" sempre dalla sommità.

Da questo comportamento deriva la politica note come **LIFO: Last In First Out** cioè
l'ultimo elemento inserito (l'ultima maglia impilata) sarà anche il primo elemento elemento
ad essere recuperato (la prima maglia che prenderò dall'armadio).

Nelle pile l'operazione di inserimento prende il nome di *push* e l'operazione di cancellazione
prende il nome di *pop*; l'accesso è possibile alla sommità della pila e l'operazione prende
il nome di *top*. Se a queste operazioni aggiungiamo le operazioni *size* per sapere
quanti elementi sono presente e *is empty* per sapere se la coda è vuota abbiamo la seguente
interfaccia Java.

{{<highlight java>}}
public interface IStack {
    void push(Object o);
    Object pop();
    Object top();
    int size();
    boolean isEmpty();
}
{{</highlight>}}

## Esercizio

### Parte 1: implementazione di queue e stack
Creare due classi Java

1. `ArrayQueue` che implementa l'interfaccia `IQueue` e che realizza la politica FIFO
utilizzando **esclusivamente array Java del tipo `Object[]`**
2. `ArrayStack` che implementa l'interfaccia `IStack` e che realizza la politica LIFO
utilizzando **esclusivamente array Java del tipo `Object[]`**

è possibile usare variabili di tipo primitivi `int`, `double`, ... o di tipo `String`,
ma non è possibile usare oggetti di tipo container dalla libreria Java quali: `ArrayList`,
`LinkedList`, ...

Nell'implementazione va tenuto conto di quanto segue.
* La struttura dati deve poter ospitare un numero qualsiasi di elementi, si suggerisce
di aumentare la dimensione dell'array usato quando questo è pieno.
* Il tentativo di cancellare da una struttura vuota deve essere opportunamente gestito
senza che il programma vada in *crash* in queste situazioni.

### Parte 2: creazione di un `main` per la verifica
Creare una classe contenente il `main` che verifichi il corretto funzionamento di tutti
i metodi delle classi implementate. Ricordarsi di verificare anche i casi "limite":
struttura piena, struttura vuota, input sbagliati.

### Parte 3: Misurazione delle prestazione
Utilizzando la funzione `System.currentTimeMillis()` o avvalendosi di una eventuale
classe `Stopwatch`, misurare i tempi di esecuzione delle seguenti operazioni:

* Inserimento di 100000 (centomila) elementi su una struttura vuota.
* Cancellazione di 50000 (cinquanta mila) elementi da una struttura che ne contiene 50000.
* Inserimento di 50000 (cinquanta mila) elementi da una struttura che ne contiene già altri 50000.
* Svuotamento completo di una struttura che contiene 100000 (centomila) elementi.

Eseguire le misure sia sulle code che sulle liste implementate

### Parte 4: Analisi dei dati
Preparare una relazione sui risultati ottenuti al punto precedente, la relazione deve
contenere almeno

* una breve introduzione al problema (mezza pagina circa): cosa era richiesto, quali sono
gli strumenti usati;
* una spiegazione (1 - 2 pagine) dell'idea (non il codice) per risolvere il problema;
* la presentazione (1 - 2 pagine) dei risultati con **un commento ed una possibile spiegazione
dei risultati**, in questa parte si possono usare tabelle e grafici se opportuno;
* una parte di conclusione (mezza pagina) sui problemi incontrati e su cosa si potrebbe fare per
risolverli nonché cosa fare migliorare la soluzione proposta.

### Parte 5: Presentazione della soluzione e dei risultati
Preparare una presentazione orale per spiegare il problema, la soluzione e i risultati
ottenuti, una presentazione **non** la trascrizione in un *power point* della relazione

* una presentazione deve essere accompagnata da slide che siano una *guida* non un *copione*;
* una presentazione (e le slide) *riassume* l'informazione presente nella relazione;
* una presentazione va condotta entro un *tempo limitato*;
* la capacità di parlare e di catturare l'attenzione è fondamentale.

---


## Istruzioni per il lavoro di gruppo
Il presente laboratorio può essere anche assegnato come lavoro di gruppo, i gruppi
dovrebbero essere di 2 o 4 componenti, meglio in numero pari per assegnare metà al
task di sviluppo di un coda (queue), metà allo sviluppo di una pila (stack).

### Coppie
Nel caso di gruppi di 2 persone (coppie) è possibile procedere in parallelo assegnando
ad ognuno il compito di sviluppatore e tester contemporaneamente. In particolare ogni
membro del gruppo sarà lo sviluppatore di una struttura (es. coda) e tester dell'altra
(es. pila).

### Gruppo da 4 persone
Il gruppo di 4 persone può essere diviso in due sottogruppi da due persone, i compiti
dei singoli membri possono essere assegnate nei due seguenti modi:
* ogni gruppo si occupa di una struttura dati, un membro del gruppo è sviluppatore,
l'altro è tester;
* un sottogruppo è fatto di soli sviluppatori, l'altro di soli tester, in questo caso sono
possibile due ripartizione all'interno del sottogruppo
    * una persona per ogni struttura dati
    * entrambe si occupano di entrambe le strutture dati.

### Pair programming
Nell metodologie di sviluppo *agile* sono previste tecniche di programmazione chiamate
[*pair programming*](1), l'idea è che due persone contemporaneamente lavorano allo stesso
codice: un *driver* scrive l'altro, il *navigator*, segue la stesura e aiuta a correggere errori o suggerisce modi diversi di fare. Le due persone si scambiano frequentemente i ruoli.

{{<attention>}}
Nel pair programming è importante seguire alcune regole fondamentali:
* il navigator non critica il lavoro, ma propone modi migliori di risolvere un
problema;
* ogni suggerimento deve essere discusso senza antipatie e senza scartarle a priori;
* il navigator non deve **mai** per nessun motivo prendere la tastiera in mano,
soprattutto mentre il driver sta scrivendo;
* gli errori ovvi (es. punto e virgola, mancanza di parentesi, ...) **non** vanno segnalati,
di norma ci pensa il compilatore;
{{</attention>}}

{{<observe>}}
Durante il pair programming è importante che:
* il navigator tenga a mente l'intero progetto in quanto il driver è concentrato sulla
singola riga di codice e/o sulla singola funzione/metodo;
* ci sia un continuo dialogo tra driver e navigator: il pair programming **non si pratica
in silenzio**;
* il navigator deve comprendere tutto quello che il driver sta scrivendo, ad esempio una
sintassi che non conosce o che non capisce deve essere spiegata dal driver;

{{</observe>}}

## Link utili
* [Pair programming][1]

[1]: https://en.wikipedia.org/wiki/Pair_programming
