---
title: "Queue e Stack"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/queue-and-stack
weight: 10
summary: "In questa lezione si affrontano le strutture dati queue (coda) e stack (pila) indicando il loro comportamento e le operazioni che sono normalmente disponibile per queste strutture."
---

Come visto in une [lezione precedente]({{< ref "01-operazione.md" >}}), le strutture dati
si caratterizzano per le operazioni che possono essere eseguite su di esse. Due casi
semplici di strutture dati sono la coda (*queue*) e la pila (*stack*) che permettono
inserimento, accesso e cancellazione solo in punti ben specifici. Nonostante la loro
semplicità, queste strutture dati sono utilizzate molto di frequente ed è perciò
importante conoscerne il funzionamento.

## Queue (coda)
{{<column/two-cols wl=8 wr=4 content="left" embed="img/img_queue.html">}}
La struttura dati *queue* (in italiano *coda*) descrive, in termini informatici, quello che
accade nelle code come quelle che si trovano, ad esempio, alla cassa del supermercato.
Gli elementi "entrano" alla fine della coda (*tail*), ed "escono" all'inizio della coda (*head*).

Questo comportamento vine detto **FIFO: First In First Out** cioè il
primo elemento inserito (la prima persona and *accodarsi* in cassa) sarà anche il primo
elemento ad essere recuperato (la prima persona ad essere servita alla cassa).

Nelle code l'operazione di inserimento prende il nome di *enqueue* e l'operazione di cancellazione
prende il nome di *dequeue*; l'accesso è possibile solo al "primo della fila" e prende il nome
di *front* (a volte *head*). Se a queste operazioni aggiungiamo le operazioni *size* per sapere
quanti elementi sono presenti nella coda e *is empty* per sapere se la coda è vuota, otteniamo
la seguente interfaccia Java.
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

{{<example>}}
Considerando l'interfaccia in alto e supponendo di memorizzare stringhe, vediamo cosa
succede agli elementi in coda in base alle operazioni svolte.
1. Ipotizzando una coda inizialmente vuota, l'esecuzione delle seguenti operazioni:
`enqueue("Alice")`, `enqueue("Bob")` e `enqueue("Carol")` riempono una coda che
possiamo immaginare come una sequenza di stringhe del tipo: `Carol, Bob, Alice`
2. Supponiamo ora di eseguire l'istruzione `dequeue()`, essa restituirà la stringa
`Alice` lasciando la coda con i soli due elementi `Carol, Bob`.
3. Supponiamo ora di aggiungere due nuovi elementi `enqueue("David")`, `enqueue("Emily")`
e successivamente eseguire un `dequeue()`, il risultato sarà la coda: `Emily, David, Carol`.
4. A questo punto una chiamata al metodo `size()` dovrà restituire `3` ed una
chiamata a `isEmpty()` dovrà restituire `false`.
5. Per svuotare la coda dobbiamo ora effettuare tre chiamate a `dequeue()` le quali
restituiranno, in ordine, le stringhe `Carol`, `David` e `Emily`.
6. A questo punto avremo una coda per cui `size()` restituirà `0` e `isEmpty()` restituirà
`true`.
{{</example>}}

{{<exercise title="Svuotare la coda">}}
Sia data il riferimento `q` ad una istanza di tipo `IQueue`, scrivere il codice Java per lo svuotamento della
coda il cui riferimento è `q`. Proporre due soluzione: una che utilizza `for` e `size()` ed un'altra che
utilizza `while` e `isEmpty()`.
{{</exercise>}}

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

{{<example>}}
Supponendo di partire da una pila vuota vediamo come si modifica il contenuto della pila
operando su di adesso.
1. Iniziamo eseguendo le seguenti operazioni: `push("Alice")`, `push("Bob")` e `push("Carol")`,
rappresentando lo stack come una sequenza di stringhe avremo: `Carol, Bob, Alice`.
2. Eseguendo una volta l'operazione `pop()` otterremo la stringa `Carol` e la pila diventerà
`Bob, Alice`.
3. Supponiamo ora di aggiungere due nuovi elementi `push("David")`, `push("Emily")`
e successivamente eseguire un `pop()`, il risultato sarà la coda: `David, Bob, Alice` (cosa
avrà restituito `pop`? Perché?).
4. A questo punto una chiamata al metodo `size()` dovrà restituire `3` ed una
chiamata a `isEmpty()` dovrà restituire `false`.
5. Per svuotare la coda dobbiamo ora effettuare tre chiamate a `pop()` le quali
restituiranno, in ordine, le stringhe `David`, `Bob` e `Alice`.
6. A questo punto avremo una coda per cui `size()` restituirà `0` e `isEmpty()` restituirà
`true`.
{{</example>}}

{{<exercise title="Inversione di array">}}
Supponendo di avere a disposizione un riferimento `s` ad un'istanza di tipo `IStack` come
definita sopra, utilizzando unicamente tale riferimento, si scriva un algoritmo in Java per
l'inversione di un array di `String`. Ad esempio, l'array `["A","BB","CCC"]` deve diventare
l'array `["CCC","BB","A"]` **senza usare alcun array di supporto**.
{{</exercise>}}
