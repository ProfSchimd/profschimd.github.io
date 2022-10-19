---
title: "Queue e Stack"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/queue-and-stack
weight: 30
summary: "In questa lezione si affrontano le strutture dati queue (coda) e stack (pila) indicando il loro comportamento e le operazioni che sono normalmente disponibile per queste strutture."
---

Come visto in une [lezione precedente]{{< ref 01-operazione.md >}}, le strutture dati
si caratterizzano per le operazioni che possono essere eseguite su di esse. Due casi
semplici di strutture dati sono la coda (*queue*) e la pila (*stack*) che permettono
inserimento, accesso e cancellazione solo in punti ben specifici. Nonostante la loro
semplicità, queste strutture dati sono utilizzate molto di frequente ed è perciò
importante conoscerne il funzionamento.

## Queue (coda)
{{<column/two-cols wl=8 wr=4 content="left" embed="img/img_queue.html">}}
La struttura dati *queue* (in italiano *coda*) descrive, in termini informatici, quello che
accade nelle code, ad esempio alla cassa di un supermercato. Gli elementi "entrano" alla
fine della coda (*tail*), ed "escono" all'inizio della coda (*head*).

Questo comportamento vine detto **FIFO: First In First Out** cioè il
primo elemento inserito (la prima persona and *accodarsi* in cassa) sarà anche il primo
elemento ad essere recuperato (la prima persona ad essere servita alla cassa).

Nelle code l'operazione di inserimento prende il nome di *enqueue* e l'operazione di cancellazione
prende il nome di *dequeue*; l'accesso è possibile solo al "primo della fila" e prende il nome
di *front* (a volte *head*). Se a queste operazioni aggiungiamo le operazioni *size* per sapere
quanti elementi sono presente e *is empty* per sapere se la coda è vuota abbiamo la seguente
interfaccia Java.
{{</column/two-cols>}}

{{<highlight java>}}
public interface IQueue {
    void enqueue(Object o);
    Object dequeue();
    Object front();
    int size();
    boolean isEmpty();
}
{{</highlight>}}

## Stack (pila)
{{<column/two-cols wl=10 wr=2 content="left" embed="img/img_stack.html">}}
La struttura dati *stack* (in italiano *pila*) descrive, in termini informatici, quello
che accade ogni volta che impiliamo degli oggetti (ad esempio i piatti, le magliette,
i fogli, ...). Gli elementi "entrano" sulla sommità della pila, detta *top*, ed
"escono" sempre dalla sommità.

Questo comportamento vine detto **LIFO: Last In First Out** cioè
l'ultimo elemento inserito (l'ultima maglia impilata) sarà anche il primo elemento elemento
ad essere recuperato (la prima maglia che prenderò dall'armadio).

Nelle pile l'operazione di inserimento prende il nome di *push* e l'operazione di cancellazione
prende il nome di *pop*; l'accesso è possibile alla sommità della pila e l'operazione prende
il nome di *top*. Se a queste operazioni aggiungiamo le operazioni *size* per sapere
quanti elementi sono presente e *is empty* per sapere se la coda è vuota abbiamo la seguente
interfaccia Java.
{{</column/two-cols>}}

{{<highlight java>}}
public interface IStack {
    void push(Object o);
    Object pop();
    Object top();
    int size();
    boolean isEmpty();
}
{{</highlight>}}
