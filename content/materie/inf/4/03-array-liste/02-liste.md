---
title: "Liste"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/list
weight: 20
summary: "In questa lezione si affrontano le strutture dati di tipo lista sia singolarmente che doppiamente concatenate."
---

## La ADT `List`
Nel linguaggio informatico una *lista* è una struttura dati che permette l'accesso agli
elementi *spostandosi tra elementi adiacenti* (successivo e precedente). La lista assomiglia ad una
sequenza di oggetti non numerati per cui l'unico modo per accedere all'elemento numero `i` è
partire dall'inizio e contarne uno dopo l'altro fino a raggiungere l'`i`-esimo. Un esempio
concreto può essere un mazzo di carte: per sapere, ad esempio, la decima carta, dobbiamo
partire dall'inizio (che va opportunamente definito) scartare le prime 9 carte e quindi
ottenere la decima.

A differenza del mazzo di carte, tuttavia, la lista non permette di scegliere una "carta"
(elemento della lista) a caso, bensì permette solo l'accesso diretto ad elementi ben definiti
quali l'inizio (*testa*, *head*) o la fine (*coda* o *tail*) della lista.

Alcune operazioni sono estremamente semplici da eseguire su una lista:
* l'inserimento e l'eliminazione in testa o in coda;
* lo *split* (chiamato anche *splice*) della lista su un elemento ben preciso.

Alcune operazioni sono semplici a patto che sia disponibile un elemento (*posizione*)
ben specifico:
* eliminazione dell'elemento;
* inserimento prima o dopo l'elemento;
* split rispetto all'elemento.

Infine ci sono operazioni che richiedono diverse istruzioni su una lista:
* accesso all'elemento di indice `i` (specialmente se `i` non è "vicino" all'inizio o alla fine);
* ricerca di un elemento.

{{<observe>}}
Per comodità utilizzeremo un modo semplice di indicare le liste utilizzando delle frecce
`->`. La lista che contiene i numeri (ordinati) da `1` a `5`, sarà indicata nel seguente
modo

    1 -> 2 -> 3 -> 4 -> 5

Un altro esempio può essere la lista

    2 -> 4 -> 0 -> 2 -> 3 -> 3

nella quale si nota come vi possano essere elementi con lo stesso contenuto (stesso numero
in questo caso).
{{</observe>}}

### Il concetto di *posizione* nella lista
Come visto sopra, le operazioni su una lista possono essere basate su uno specifico
elemento della lista, parlare di elementi è troppo generico e rischio di confondersi
con il contenuto, per questo è meglio parlare di **posizione** nella lista.

{{<def title="Posizione e Valore">}}
Una **posizione** in una lista è la rappresentazione di un "posto" all'interno del
quale possiamo inserire un **valore** (o contenuto). Ad una posizione nelle liste,
inoltre, si associa anche una posizione **precedente** (*predecessor*) e una
posizione **successiva** (*successor*).
Esempi di posizione sono
* *prima*, 
* *ultima*, 
* *penultima*, 
* *la prima posizione con valore `123`*, 
* *la precedente alla prima posizione con valore `123`*, 
* *la prima posizione dalla fine con valore `123`*, 
* ...
{{</def>}}

Cerchiamo di capire meglio il concetto di posizione con qualche esempio.
{{<example>}}
Consideriamo la seguente lista

    10 -> -2 -> 120 -> 0 -> 123 -> 0 -> 11

* valore della *prima posizione*: `10`
* valore dell'*ultima posizione*: `11`
* valore della *penultima posizione*: `0`
{{</example>}}

Nelle liste come negli array, le posizioni possono anche essere associate a degli
indici, ad esempio la prima posizione ha indice `0`, la seconda ha indice `1` e
così via. In effetti gli array sono strutture dati in cui le posizioni vengono
indicate da indici.

{{<attention>}}
L'uso del termine *posizione* può generare confusione soprattutto le prime volte che
si lavora con le liste. Bisogna sempre tenere a mente che nelle liste **per posizione
non si intende un indice, ma un segnaposto** che contiene un *valore* (*value* o
*content*), un *successore* e, nelle liste doppiamente concatenate, un *predecessore*.

Inoltre, bisogna stare attenti a non confondere la posizione con il contenuto, ad
esempio in una lista di interi il numero `12` può comparire più di una volta, ma
**in posizioni diverse**, inoltre `12` in questo caso non è necessariamente l'indice.
{{</attention>}}

#### Posizione in Java
Il concetto di *posizione nella lista* sopra definito può essere espresso in una
interfaccia Java nel seguente modo

```java
public interface IListPosition {
    Object value();
    IListPosition next();
    public void setNext(IListPosition newNext);
    IListPosition prev();
    public void setPrev(IListPosition newPrev);
}
```

Si noti che:
* il valore (*value*) è di tipo `Object` per poter indicare qualsiasi tipo,
* ogni posizione permette di accedere al successore mediante `next()` ed
al predecessore mediante `prev()`,
* i metodi `prev` e `next` restituiscono a loro volta una posizione.

{{<exercise>}}
Realizzare una classe Java `ListPosition` che implementa l'interfaccia `IListPosition`
definita sopra. Prevedere oltre ai metodi dell'interfaccia anche dei metodi per
impostare: *valore*, *predecessore* e *successore*.
{{</exercise>}}

## Liste singolarmente concatenate
Una *lista singolarmente concatenata* è una lista in cui ogni posizione è collegata
alla successiva, ma non alla precedente.
{{<column/two-cols wl=6 wr=6 content="left" embed="img/single_list.html">}}
Nello schema a fianco, ogni posizione è rappresentata da un oggetto con due parti:
un *content* per memorizzare il valore ed un *next* per collegare una posizione alla
successiva.

Per segnalare la "fine della lista" (una posizione senza una posizione
seguente), è sufficiente impostare il valore di *next* a `null`. L'inizio della
lista, invece, viene individuato mediante un riferimento al primo elemento che
spesso chiamiamo *head* (o *first*).
{{</column/two-cols>}}

## Liste doppiamente concatenate
Una *lista doppiamente concatenata* è una lista in cui ogni posizione è collegata
sia alla successiva sia alla precedente.
{{<column/two-cols wl=6 wr=6 content="left" embed="img/double_list.html">}}
Nello schema a fianco, ogni posizione è rappresentata da un oggetto con tre parti:
un *content* per memorizzare il valore, un *next* per collegare una posizione alla
successiva, ed un *prev* per collegare una posizione alla precedente.

Per segnalare la "fine della lista" (una posizione senza una posizione
seguente), è sufficiente impostare il valore di *next* a `null`. L'inizio della
lista, invece, viene individuato mediante un riferimento al primo elemento che
spesso chiamiamo *head* (o *first*). Nel caso di liste doppiamente concatenate
abbiamo anche la necessità di segnalare che il primo elemento non ha alcun
predecessore, anche in questo caso si può usare una riferimento impostate al valore
`null`.
{{</column/two-cols>}}

{{<attention>}}
La presenza di *head* può sembrare superflua, infatti la prima posizione della
lista si riconosce dal fatto che *prev* è `null` e l'ultimo dal fatto che
*next* è `null`. La necessità del riferimento *head* deriva dal problema di
tenere un "punto di accesso" alla lista. In pratica *head* è un riferimento
che ci permette di "accedere" alla lista.
{{</attention>}}

{{<observe title="Lista vuota">}}
Ci si può chiedere come indicare che una lista è vuota, cioè non contiene
elementi. Il modo semplice (valido per liste singolarmente e doppiamente
concatenate) è avere il riferimento *head* impostato a `null`.
{{</observe>}}

## Operazioni su liste
La struttura dati lista può, ovviamente, essere utilizzata per tutte le usuali
[operazioni]({{< ref "01-operazione.md" >}}) di accesso e manipolazione dei dati.
Inoltre le liste, a differenza degli array, permettono di eseguire alcune operazione, come
il [*merge*](#merge) e lo [*split*](#splicing) (chiamato *splicing*), in maniera molto efficiente.

In questa lezione vedremo il codice Java per alcune 
operazioni utilizzando l'interfaccia `IListPosition` discussa sopra.
Per rappresentare una lista useremo una semplice classe contenente:
* un riferimento, chiamato `head`, che punti alla *testa della lista*;
* un intero `n` che conta gli elementi attualmente memorizzati nella
lista;
* un riferimento, chiamato `tail`, che punti alla coda della lista, **solo nel
caso di liste doppiamente concatenate**.

{{<column/columns>}}
{{<column/col>}}
```java
// SinglyLinkedList.java
public class SinglyLinkedList {
    private IListPosition head;
    private int n;
    public SinglyLinkedList() {
        head = null;
        n = 0;
    }
}
 
```
{{</column/col>}}
{{<column/col>}}
```java
// DoublyLinkedList.java
public class DoublyLinkedList {
    private IListPosition head;
    private IListPosition tail;
    private int n;
    public DoublyLinkedList() {
        head = tail = null;
        n = 0;
    }
}
```
{{</column/col>}}
{{</column/columns>}}

Nel codice sotto, inoltre, faremo uso della classe concreta `ListPosition` che implementa
l'interfaccia `IListPosition` e che prevede il seguente costruttore per inizializzare
tutti i tre parametri `content`, `next` e `prev` (per evitare confusione con i nomi dei
metodi i campi per `next` e `prev` sono chiamati `predecessor` e `successor`, rispettivamente).

```java
public class ListPosition implements IListPosition {
    private Object content;
    private IListPosition successor;
    private IListPosition predecessor;

    public ListPosition(Object c, IListPosition n, IListPosition p) {
        content = c;
        successor = n;
        predecessor = p;
    }
    // Implementazione (ovvia) di IListPosition
    // ...
}
```

### Inserimento e cancellazione
Vediamo quattro tipi di operazione di inserimento/cancellazione
1. inserimento/cancellazione in *testa*
2. inserimento/cancellazione in *coda* (solo *doubly linked*)
3. inserimento/cancellazione *dopo* una data posizione
4. inserimento/cancellazione *prima* di una data posizione (solo *doubly linked*)

#### Inserimento in testa
L'inserimento in testa è possibile sia per le singly che per le doubly linked list,
tuttavia bisogna fare attenzione al caso di liste vuote (e doppia attenzione nel caso
di doubly linked list).

```java
public void insertAtHead(Object o) {
    // crea IListPosition per l'oggetto da inserire
    // Il suo 'next' sarà quello che è adesso in testa
    // Funziona anche se la lista è vuota, perché?
    ListPosition newPosition = new ListPosition(o, head, null);
    // Inserisco la 'posizione' appena creata come nuova testa
    head = newPosition;
    // aggiorno il conteggio degli elementi
    n++;
} 
```

Lo stesso metodo nelle *doubly* linked list va modificato per tenere conto:
* del riferimento alla coda `tail` (solo se la lista è vuota prima dell'inserimento) e
* del puntatore `prev` della *vecchia testa* (se la lista non è vuota).

```java
public void insertAtHead(Object o) {
    ListPosition newPosition = new ListPosition(o, head, null);
    head = newPosition;
    if(tail == null) { // la lista era vuota (tail -> null)
        tail = newPosition;
    } else { // esisteva una head e quindi aggiorno il suo prev
        newPosition.next().setPrev(newPosition); // !!!
    }
    n++;
} 
```

La seguente riga

```java
newPosition.next().setPrev(newPosition);
```

non fa altro che accedere alla vecchia testa (che adesso è il successore della nuova testa)
e modificare il suo `prev` in modo da puntare alla nuova testa.

#### Inserimento in coda

{{<exercise>}}
L'inserimento in coda per una *doubly* linked list è la versione "speculare" dell'inserimento
in testa sempre per la *doubly* linked list. Realizzare il codice Java è un buon esercizio per
comprendere meglio quanto discusso sopra sull'inserimento in testa.
{{</exercise>}}

{{<exercise>}}
Non avendo un riferimento diretto alla coda della lista, la *singly* linked list non permette
l'inserimento allo stesso modo della *doubly* linked list. Tuttavia, è possibile comunque
fare l'inserimento in coda ottenendo prima il riferimento all'ultimo elemento della lista (il
riferimento `tail` se ci fosse) e poi inserendo successivamente a questo. Realizzare il codice
Java per l'inserimento in coda in una lista singolarmente concatenata.
{{</exercise>}}

#### Inserimento dopo
Un'altra possibilità per l'inserimento in una lista è indicare la posizione del
nuovo elemento rispetto ad un elemento già esistente. Il caso più semplice è
l'inserimento *dopo* la posizione `pos`.

```java
public void insertAfter(Object o, IListPosition pos) {
    IListPosition newPos = new ListPosition(o, pos.next(), null);
    pos.setNext(newPos);
    n++;
}
```

{{<exercise>}}
Come nel caso di `insertAtHead` il caso di *doubly linked list* richiede un po'
più di attenzione data la presenza dei riferimenti `prev` e del riferimento  `tail`
alla coda della lista. Realizzare il metodo

```java
public void insertAfter(Object o, IListPosition pos);
```

in una *doubly linked list*.
{{</exercise>}}

#### Inserimento prima
Data una posizione all'interno della lista, si può immaginare all'inserimento di
un nuovo elemento nella posizione precedente. Nel caso si liste singolarmente
concatenate questa operazione è lievemente più complessa di `insertAfter` poiché
manca il riferimento `prev` che indica la posizione precedente (è comunque
possibile tale operazione , vedi esercizio sotto). 

{{<exercise>}}
Realizzare il codice Java per l'inserimento in una *doubly linked list* di un nuovo
elemento che sia nella posizione precedente ad un elemento dato. La firma del metodo
da implementare è la seguente

```java
public void insertBefore(Object o, IListPosition pos);
```
{{</exercise>}}

{{<exercise>}}
L'inserimento *prima* di una posizione data può essere fatto anche in una *singly linked
list*, tuttavia questa operazione richiede di individuare la posizione all'interno della
lista ed anche la posizione che precede quest'ultima. Realizzare il metodo
```java
public void insertBefore(Object o, IListPosition pos);
```
nella classe `SinglyLinkedList`.

**Suggerimento** Iniziare cercando una posizione `p` tale che (`p == pos`), durante
questa ricerca tenere traccia anche della posizione che precede `p` (attenzione che
`p` potrebbe anche essere `head`).
{{</exercise>}}

{{<important>}}
Le operazione `insertBefore` e `removeBefore` possono essere realizzate anche in *singly
linked list*, ma questo risulta più complicato rispetto ad `insertAfter` e `removeAfter`.
Per questo motivo tali operazioni sono **raramente** implementate in una *singly linked
list*. Nel caso la struttura utilizzata richiedesse frequenti utilizzo di `insertBefore`
e/o `removeBefore` è consigliabile usare una *doubly linked list*.
{{</important>}}

### Cancellazione in testa
Dagli esempi sopra si può vedere come l'inserimento sia un operazione "semplice"
nelle liste, anche la cancellazione, come vederemo, richiede poche istruzioni.

Iniziamo vedendo la cancellazione dell'elemento che si trova nelle testa della
lista. In questo caso per cancellazione si intende che la posizione viene rimossa
dalla lista e che l'elemento che seguiva quello rimosso, diventa la nuova testa
della lista.

Il codice Java qui sotto mostra la rimozione in testa per una *singly* linked
list.

```java
public Object removeAtHead() {
    if (head == null) {
        return null; // Rimozione da una lista vuota, errore?
    }
    IListPosition removed = head;
    head = head.next();
    n--;
    return removed.value();
}
```

Si noti che il codice restituisce anche il *valore* dell'elemento eliminato,
senza questa restituzione il contenuto verrebbe perso a meno che non fosse
stato precedentemente memorizzato.

Nel caso di *doubly* linked list è necessario aggiustare anche i riferimenti
`prev` ed eventualmente la coda.
{{<exercise>}}
Realizzare il metodo java

```java
public Object removeAtHead();
```

in una lista doppiamente concatenata.
{{</exercise>}}

### Ricerca
Come già visto negli array, anche nelle liste è possibile *cercare* uno specifico
valore all'interno di una lista. A differenza degli array in cui l'accesso avviene
mediante indicizzazione (cioè con la posizione), nelle liste l'accesso è *sequenziale*,
utilizzando i riferimenti `next` e `prev`.

Per cercare all'interno di un lista, si usa il concetto di *iteratore* che rappresenta
un "puntatore" all'elemento attuale della lista, durante la ricerca l'iteratore viene
spostato in avanti ad ogni ciclo, fino a raggiungere la fine della lista.

```java
public IListPosition search(Object o) {
    IListPosition iterator = head;
    while(iterator != null) {
        if(iterator.value().equals(o)) {
            return iterator;
        }
        iterator = iterator.next();
    }
    return null;
}
```

{{<attention>}}
Nel codice sopra il confronto tra l'elemento cercato `o` e il valore di una posizione
avviene con il metodo `equals`. Questo perché in Java (come in molti altri linguaggi),
l'operatore di uguaglianza `==` interroga l'uguaglianza dei riferimenti e non del loro
contenuto.
{{</attention>}}

### *Splicing*
Una operazione molto semplice da eseguire su una lista è la sua divisione in due
o più sottoliste. Questa operazione viene definita *splicing* (o *split*) della
lista, ovviamente per effettuare lo splicing dobbiamo sapere in quale posizione
dovrà avvenire lo spezzamento.

```java
public SinglyLinkedList splice(IListPosition splicePosition) {
    SinglyLinkedList tailList = new SinglyLinkedList();
    tailList.head = splicePosition.next();
    splicePosition.setNext(null);
    IListPosition iterator = tailList.head;
    while(iterator != null) {
        tailList.n++;
        iterator = iterator.next();
    }
    n -= tailList.n;
    return tailList;
}
```

### Merge
Oltre a spezzare una lista, è possibile anche unire due o più liste utilizzando
l'operazione di *merge* (fusione) di due liste.

Il seguente codice Java aggiunge alla fine della lista corrente una lista `other`
restituendo la nuova lista.

```java
public SinglyLinkedList merge(SinglyLinkedList other) {
    // current list is empty
    if (head == null) {
        head = other.head;
        n = other.n;
        return this;
    }
    // Finds the tail of the current list
    IListPosition last = head;
    while(last.next() != null) {
        last = last.next();
    }
    last.setNext(other.head);
    n+= other.n;
    return this;
}
```

## Esercizi su liste

### Ricerca e indicizzazione
{{<exercise title="Elemento di indice">}}
Anche se le liste sono strutture dati che non prevedono in modo naturale
l'indicizzazione (`0,1,...`) dei propri elementi, è possibile (a volte utile)
scrivere un metodo che acceda all'elemento di indice \\(i\\) della lista.
L'indice rappresenta (solitamente partendo da \\(0\\)) l'ordine all'interno
della lista a partire dalla testa.

Scrivere un metodo

```java
public IListPosition positionAtIndex(int i); 
```

che restituisce la posizione che si trova nella posizione `i` della lista.
{{</exercise>}}

### Inserimento, Merge e split
{{<exercise title="Merge in posizione">}}
Scrivere un metodo Java che inserisce un'intera lista all'interno di
un'altra, a partire da una posizione data.

```java
public void insertAllAt(SinglyLinkedList other, IListPosition pos);
```

Se la lista di partenza è

```
1 -> 2 -> 5 ->
```

e la lista `other` è

```
3 -> 4 ->
```

la chiamata a `insertAllAt` con la posizione contenente `2` cambierà la lista
originale in

```
1 -> 2 -> 3 -> 4 -> 5 ->
```

{{</exercise>}}


