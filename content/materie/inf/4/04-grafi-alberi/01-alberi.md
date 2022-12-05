---
title: "Alberi"
type: lecture
weight: 100
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/tree
summary: "Le strutture dati ad albero rappresentano un valido strumento per rappresentare informazione gerarchica. Gli alberi sono usati spesso per operazioni di ricerca in quanto permettono di strutturare l'informazione in modo da agevolare la ricerca."
---

Le strutture dati ad albero sono usate per rappresentare le informazioni che abbiano
una *struttura gerarchica*, il tipico esempio di una struttura gerarchica è dato dai
rapporti di parentela, un altro esempio è dato dall'organizzazione dei file e delle
cartelle all'interno del *filesystem* di un computer.

In tutti questi casi, ed in molti altri, la struttura migliore per mantenere i dati
organizzati è quella ad albero. Tuttavia gli alberi sono molto utilizzati anche come
struttura per favorire la *ricerca*.

## Concetti sugli alberi

{{<column/two-cols wl=7 wr=5 content="left" embed="img/albero-esempio.html">}}
Facendo riferimento alla figura a sinistra, vediamo subito che, normalmente, il modo
di disegnare un albero è contrario rispetto a quello che si si aspetterebbe, l'albero
infatti cresce e si ramifica verso il basso, anziché verso l'altro, come gli alberi
biologici.

Sempre dall'immagine a sinistra si vede che una struttura ad albero, a meno che non
sia vuoto, ha sempre una **radice** (*root*), nell'esempio `Alice` che è l'inizio
dell'albero. Le frecce indicano la direzione in cui l'albero cresce, ad un certo
punto la crescita si ferma in corrispondenza delle **foglie** (*leaves*) indicate
in verde nella figura. Esempi di foglie, quindi, sono `Gill`, `Henry`, `Nick`, ...

Ogni elemento dell'albero viene chiamato **nodo** (*node*) ed è collegato da **archi**
(*arcs*) con i propri **figli** (*children*) e con l'unico **padre** (*parent*).
Ad esempio `Fred` ha come figli `Jean` e `Kevin` e come padre `David`.
Si noti che *i nodi foglia non hanno figli* mentre i nodi con figli vengono chiamati
**nodi interni**, anche la radice che non ha padre è sempre un nodo interno, se la
radice non ha figli è sia nodo interno sia foglia (ed è l'unico caso possibile).

L'utilizzo dell'analogia con i gradi di parentela viene spesso usato per indicare
anche relazioni non dirette, nodi con lo stesso padre sono chiamati **fratelli**
(*siblings*), i figli, i figli dei figli, e via dicendo sono i **discendenti**
(*descendants*) di un nodo. Ad esempio, `Bob` ha come discendenti `Carol`, `Henry`
e `Ian`. Allo stesso modo il padre, il padre del padre e così via, rappresentano
gli **antenati** (*ancestors*) di un nodo. Ad esempio `Laura` ha come antenati
`Jean`, `Fred`, `David` e `Alice`.
{{</column/two-cols>}}

Riassumiamo quindi le varie cose viste in alcune definizioni

{{<def title="Albero">}}
Un **albero** (*tree*) è una struttura dati gerarchica costituita da **nodi** (*nodes*)
collegati mediante **archi** (*arcs*). Ogni albero non vuoto ha un nodo **radice**
(*root*), ogni nodo può avere dei **figli** (*children*), nodi senza figli si dicono
**foglie** (*leaves*) mentre gli altri nodi sono detti **nodi interni** (*internal nodes*).
Tutti i nodi ad eccezioni della radice hanno *esattamente un nodo padre* e nessun nodo
può essere antenato di un suo antenato, in altre parole negli alberi non ci devono
essere *cicli* (percorsi chiusi, cioè che ritornano sullo steso nodo)
{{</def>}}

{{<attention>}}
In certi casi gli archi negli alberi non vengono rappresentati come frecce, ma
semplicemente come dei segmenti (*lati*) che collegano i vari nodi. Questo succede
soprattutto quando si interpretano gli alberi come casi particolari di grafi.
Un caso noto è l'algoritmo per trovare, in un grafo, l'*albero di copertura minimale*
(*minimum spanning tree*), in questo caso il grafo potrebbe essere *non orientato*
(senza frecce) che determinerebbe un albero di copertura, a sua volta, senza frecce.
{{</attention>}}

Completiamo quindi la lista dei "gradi di parentela" in un albero:
* *padre* (*parent*): unico nodo antenato diretto (la radice non ha padre)
* *figli* (*children*): nodi discendenti diretti (collegate da una freccia)
* *discendenti* (*descendants*): figli, nipoti, pro-nipoti, ...,
* *antenati* (*ancestor*): padre, nonno, bisnonno, ...
* *fratelli* (*siblings*): nodi che hanno lo stesso padre
* *cugini* (*cousins*): nodi con padre diverso, ma alla stessa *altezza* (vedi sotto)

{{<example>}}
Vediamo alcuni esempi di "parentela" riferendoci all'albero della figura sopra.
* `Alice` è il padre di `Bob`, `David` e `Gill`; `Bob` è il padre di `Carol`; ...
* `Emily` e `Fred` sono figli di `David`; `Henry` e `Ian` sono figli di `Carol`; ...
* `Carol`, `Henry` e `Ian` sono discendenti di `Bob`, `Gill` non ha discendenti; ...
* `Fred` è antenato di `Jean`, `Kevin`, `Laura`, `Mallory` e `Nick`, `Alice` è antenato di tutti; ...
* `Bob`, `David` e `Gill` sono fratelli; `Carol` non ha fratelli; ...
* `Carol` è cugino di `Emily` e `Fred`; `Henry` è cugino di `Jean` e `Fred`; ...
{{</example>}}

La sequenza di nodi che si ottiene percorrendo un albero viene chiamato **percorso**
(*path*). Partendo dalla radice è possibile raggiungere i vari nodi attraverso
uno specifico percorso. Da un nodo qualsiasi è inoltre possibile raggiungere la
radice e uno qualsiasi degli antenati attraverso un unico percorso. 

Dato un nodo, chiamiamo **profondità** (*depth*) di quel nodo il numero di antenati,
ad esempio `Fred` ha profondità 2 (i suoi due antenati sono `David` e `Alice`),
`Mallory` ha profondità 4; la radice (`Alice` nell'esempio) ha profondità 0.

Inoltre ad ogni nodo associamo un'**altezza** (*height*) che è il numero massimo
di discendenti sullo stesso percorso, ad esempio l'altezza di `Bob` è 2,
l'altezza di `David` è 3, l'altezza di `Gill` è 0. Chiamiamo **altezza dell'albero**
l'altezza della radice, nell'esempio l'altezza di `Alice` è 4, quindi l'albero
nella figura ha altezza 4.

Riassumiamo i concetti esposti nella seguente definizione.

{{<def title="Profondità e altezza">}}
La **profondità** (*depth*) di un nodo è il numero di *antenati* di quel nodo,
l'**altezza di un nodo** (*node height*) il numero massimo di discendenti,
l'**altezza di un albero** (*tree height*) è l'altezza del nodo radice.
{{</def>}}

### ADT Albero
Una struttura dati astratta per gli alberi dovrebbe comprendere alcune
operazioni per l'accesso ai nodi dell'albero. Le modifiche ad un albero
solitamente si fanno accedendo direttamente ai nodi coinvolti

* `Root` restituisce la radice dell'albero.
* `Size` restituisce il numero totale di nodi dell'albero.
* `AllNodes` restituisce tutti i nodi dell'albero.
* `InternalNodes` restituisce i nodi *interni* dell'albero.
* `Leaves` restituisce i nodi *foglia* dell'albero.
* `Search` restituisce, se esiste, il nodo con valore dato.
* `SetRoot` imposta il nodo radice dell'albero.

### Alberi in Java
Come nel caso delle liste, anche le strutture dati ad albero utilizzando il concetto
di posizione che chiamiamo *nodo*. I nodi sono collegati tra di loro in modo da
formare la struttura di albero. Negli alberi i collegamenti esistono tra un nodo
e i suoi figli, nella pratica viene anche utilizzato un collegamento da un nodo
verso il proprio padre. Ovviamente le foglie non hanno collegamento verso i figli
mentre la radice non ha collegamento al padre.

Il nodo contiene anche un *valore* che rappresenta l'informazione che si vuole
memorizzare. Nell'esempio sopra il nodo radice (colorato di rosso) conterrà il
valore `Alice` ed avrà il collegamento ai figli che sono tre nodi contenenti i
valori `Bob`, `David` e `Gill`.

L'interfaccia Java per un nodo dell'albero viene mostrata di seguito.

#### La classe `TreeNode`

```java
public interface ITreeNode {
    Object value();
    ITreeNode parent();
    ITreeNode[] children();
    void setValue(Object val);
    void setParent(ITreeNode parent);
    void addChild(ITreeNode child);
    void removeChild(ITreeNode child);
    boolean isRoot();
    boolean isLeaf();
    boolean isInternal();
}
```

L'interfacci contiene diversi metodi per:
* interrogare il nodo
    * `value()` restituisce il valore
    * `parent()` restituisce il padre
    * `children()` restituisce tutti i figli
* modificare il nodo
    * `setParent()` imposta il collegamento al padre
    * `addChild()` aggiunge il collegamento ad un nuovo figlio
    * `removeChild()` rimuove il collegamento ad un figlio esistente
* utili informazioni
    * `isRoot()` determina se il nodo è radice
    * `isLeaf()` determina se il nodo è una foglia
    * `isInternal()` determina se il nodo è interno

L'implementazione in Java dell'interfaccia `ITreeNode` viene lasciata come
esercizio in quanto non richiede particolari accorgimenti (ad eccezione do
`addChild` e `removeChild` che devono mantenere la struttura ad albero).

#### La classe `Tree`
In pratica la struttura ad albero è interamente determinata dai collegamenti
tra i nodi. Per questo motivo l'interfaccia `ITree` sotto dichiarata non contiene
metodi per la modifica, ma solo per la sua interrogazione. L'unica eccezione
è rappresentata dal metodo `setRoot` che permette di impostare il nodo radice

```java
public interface ITree {
    ITreeNode getRoot();
    void setRoot(ITreeNode root);
    ITreeNode[] getNodes();
    ITreeNode[] getLeaves();
    ITreeNode[] getInternalNodes();
    int size();
    boolean isEmpty();
    ITreeNode search(Object o);
}   
```

Notiamo anche l'esistenza di un metodo `search` che permette di cercare un
dato oggetto all'interno dell'albero. La ricerca in un albero è un problema
che merita di essere trattato a parte, in particolare quando si parlerà di
[visite di un albero](#visite-di-un-albero).

{{<observe>}}
Le interfacce `ITreeNode` e `ITree` sopra sono state definite in modo che
per indicare un albero sia sufficiente dire chi è il nodo radice. Una volta
ottenuto un collegamento alla radice è possibile navigare l'albero in modo
da raggiungere tutti i suoi nodi.

In realtà un qualsiasi nodo dell'albero sarebbe sufficiente per poter
raggiungere tutti i nodi. Infatti è sempre possibile seguire i collegamenti
al padre fino a raggiungere la radice dalla quale si può poi raggiungere
ogni altro nodo.
{{</observe>}}

{{<exercise>}}
Implementare in Java l'interfaccia `ITreeNode` descritta sopra mediante una
classe concreta di nome `TreeNode`. Oltre ai metodi dell'interfaccia la classe
deve prevedere un costruttore che imposti il *valore* (`value`) del node, il riferimento
al *nodo padre* (`parent`) e la *lista dei figli* (`children`). La firma del
costruttore sarà quindi:
```java
public TreeNode(Object value, ITreeNode parent, ITreeNode[] children)
```
{{</exercise>}}

{{<exercise>}}
Implementare in Java l'interfaccia `ITree` descritta sopra mediante una
classe concreta di nome `Tree`. Oltre ai metodi dell'interfaccia, la
classe deve prevedere un costruttore senza parametri che crea un albero
vuoto.
{{</exercise>}}

{{<attention>}}
Il metodo `size()` della classe deve restituire il numero di nodi complessivamente
memorizzati nell'albero. Questa operazione potrebbe essere realizzata tenendo
traccia dei nodi presenti con una variabile `n`, tuttavia risulta difficile
aggiornare tale variabile in quanto operazioni su alcuni nodi potrebbero cambiare
il numero `n` senza che la classe `Tree` sia in grado di aggiornarlo. Ad esempio
il codice
```java
Tree tree = new Tree();
// aggiunge radice ed altri nodi a 'tree'
// ...
tree.getRoot().addChild(new TreeNode());
```
aggiunge un figlio alla radice usando il metodo `addChild` che, appartiene ad
`ITreeNode` e non ad `ITree`, come si fa, quindi, ad aggiornare `n`?
{{</attention>}}

{{<attention>}}
La *ricerca* (`search`) all'interno di un albero verrà
discussa sotto nella sezione [visite di un albero](#visite-di-un-albero).
Lo studente può comunque provare a realizzare una propria idea di ricerca
come utile esercizio di pratica.
{{</attention>}}

### Semplici algoritmi su alberi
Vediamo qui alcuni semplici algoritmi su alberi.
#### Profondità di un nodo 
Abbiamo visto sopra che la *profondità* di un nodo è il numero di antenati di quel
nodo, dato un `ITreeNode` come possiamo calcolare la sua profondità? La strategia
risolutiva è molto semplice e sfrutta la ricorsione.

{{<highlight java "linenos=table">}}
public static int getDepth(ITreeNode node) {
    if (node.parent() == null) {
        return 0;
    }
    return 1 + getDepth(node.parent());
}
{{</highlight>}}

L'algoritmo è semplice:
* se il nodo è la radice (`node.parent() == null`), allora la sua profondità è `0`,
* altrimenti la sua profondità sarà uno più della profondità del padre per calcolare
la quale usiamo la ricorsione (`getDepth(node.parent())`).

#### Altezza di un nodo
Il calcolo dell'altezza di un nodo utilizza un approccio simile al calcolo della
profondità, tuttavia ci sono due importanti differenze:
* la ricorsione sarà sui figli anziché sul padre e quindi *ci saranno tante chiamate
ricorsive quanti sono i figli*;
* una volta che conosco l'altezza dei figli devo prendere il massimo di queste per
calcolare l'altezza del nodo.

{{<highlight java "linenos=table">}}
public static int getHeight(ITreeNode node) {
    // 'node' is a leaf, its height is 0
    if (node.isLeaf()) {
        return 0;
    }
    // get the height of each children
    ITreeNode[] children = node.children();
    int[] childrenHeights = new int[children.length];
    for (int i = 0; i < children.length; i++) {
        childrenHeights[i] = getHeight(children[i]);
    }
    // get the height of the highest child
    int maxHeight = childrenHeights[0];
    for (int i = 1; i < childrenHeights.length; i++) {
        maxHeight = (maxHeight > childrenHeights[i]) ? maxHeight : childrenHeights[i];
    }
    return maxHeight + 1;
}
{{</highlight>}}

## Alberi binari
Finora abbiamo visto che non c'è limite al numero di figli che un nodo di un albero
può avere. Se prendiamo l'intero albero chiamiamo **arietà** (*arity*) il numero di
figli del suo nodo con il maggior numero di figli. Nell'esempio sopra l'albero ha
arietà 3 in quanto sia `Alice` che `Jean` hanno tre figli mentre gli altri nodi
interni ne hanno meno di 3.

Per avere una struttura ad albero e non una semplice lista (che è un albero con
arietà 1), l'albero deve avere almeno arietà 2. Cioè deve esistere almeno un nodo
con almeno due figli. Chiamiamo **albero binario** (*binary tree*) un albero in
cui tutti i nodi hanno *al massimo due figli* (tuttavia, possono averne uno o zero).

In un albero binario possiamo semplificare la gestione dei figli di un nodo in
quanto questi possono essere 0, 1 o 2. Spesso si fa riferimento ai figli *sinistro*
(*left child*) e *destro* (*right child*) immaginando l'albero disegnato nel modo
che abbiamo visto sopra.

{{<example>}}
Come già detto, l'albero dell'esempio sopra non è binario poiché ci sono due
nodi con tre figli. Se però consideriamo il sottoalbero la cui radice è `Bob`,
allora vediamo che si tratta di un albero binario con `Bob` che come unico
figlio `Carol` (che può essere sia destro che sinistro) il quale ha due figli
`Henry` (figlio sinistro) e `Ian` (figlio destro).
{{</example>}}

{{<column/two-cols wl=6 wr=6 content="left" embed="img/albero-binario-ricerca.html">}}
Vediamo un esempio di albero binario dove il contenuto di ogni nodo è un intero
anziché una stringa (utilizzando le interfacce Java definite sopra si dovrà usare
la classe `Integer`, perché?).

A destra troviamo un esempio in cui ci sono nodo con 0, 1 e 2 figli mentre non ci
sono nodi con 3 o più figli, ne segue che l'albero a destra è un albero binario.

La radice dell'albero contiene il valore `53` ed ha due figli, il figlio sinistro
che contiene il valore `42` ed il figlio destro che contiene il valore `56`.
Vediamo inoltre come il nodo con valore `21` ha un solo figlio, dal disegno possiamo
dedurre che si tratti del nodo destro. L'albero, inoltre, contiene complessivamente
9 foglie.

Abbiamo già detto che un nodo qualsiasi si può considerare come radice di un sottoalbero,
negli alberi binari per ogni nodo possiamo avere due sottoalberi uno con radice il figlio
sinistro ed uno con radice il figlio destro. 
{{</column/two-cols>}}

In un albero binario un *cammino* (*path*) può essere indicato semplicemente indicando,
per ogni nodo, se si segue il figlio destro o il figlio sinistro. Ad esempio, il cammino
dalla radice (`53`) alla foglia `55` può essere descritto indicando il nodo di partenza
(in questo caso la radice) e successivamente indicando i figli attraversati in questo
case: destro (`56`), sinistro (`55`) e destro (`55`).

La seguente interfaccia estende `ITreeNode` e definisce l'interfaccia `BinaryTreeNode`
che aggiunge i metodi per recuperare ed impostare i figli sinistro e destro.

```java
public interface IBinaryTreeNode extends ITreeNode {
    ITreeNode getLeftChild();
    void setLeftChild(ITreeNode child);
    ITreeNode getRightChild();
    void setRightNode(ITreeNode child);
}
```

{{<exercise>}}
Partendo dall'implementazione di `ITreeNode`, realizzare un'implementazione
dell'interfaccia `IBinaryTreeNode`. Fare attenzione alla gestione dei metodi
`addChild` e `removeChild` ereditati da `TreeNode`. Questa implementazione
deve preveder un costruttore con quattro parametri:
1. il valore (`value`)
2. il nodo padre (`parent`)
3. il figlio sinistro (`left`) e
4. il figlio destro (`right`).
{{</exercise>}}

## Visite di un albero
La **visita** (*visit*) di un albero è l'operazione che attraverso (visita)
tutti i nodi esattamente una volta. Normalmente durante la visita ad un nodo
viene effettuata un'operazione, ad esempio la stampa a video del suo valore.
Tuttavia rimane il problema dell'*ordine in cui visitare* i nodi.

{{<column/two-cols wl=8 wr=4 content="left" embed="img/albero-binario-piccolo.html">}}
Consideriamo l'albero a destra costituito dalla radice e dai suoi due figli.
È possibile visitare tale albero in almeno tre modi diversi.
1. Visito prima la radice, poi il figlio sinistro ed infine il figlio destro,
l'output ottenuto stampando i valori secondo questa visita è `8 3 16`, questa
visita si chiama [**pre-order visit**](#pre-order).
2. Visito prima il figlio sinistro, poi la radice poi il figlio destro, l'output
in questo caso sarà `3 8 16`, questa visita si chiama [**in-order visit**](#in-order).
3. Visito prima il figlio sinistro, poi il figlio destro ed infine la radice, l'output
in questo caso sarà `3 16 8`, questa visita si chiama [**post-order visit**](#post-order).

Vediamo più in dettaglio come implementare in Java tutte queste visite.
{{</column/two-cols>}}

### Pre-order

### In-order

### Post-order

### Breadth-first

## Alberi di ricerca binari

### Ricerca binaria

## Riferimenti
