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
    IListPosition prev();
}
```

Si noti che:
* il valore (*value*) è di tipo `Object` per poter indicare qualsiasi tipo,
* ogni posizione permette di accedere al successore mediante `next()` ed
al predecessore mediante `prev()`,
* i metodi `prev` e `next` restituiscono a loro volta una posizione.

## Liste singolarmente concatenate

## Liste doppiamente concatenate