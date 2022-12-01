---
title: "Alberi"
type: lecture
weight: 100
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

* `Root`
* `Size`
* `Leaves`
* `Add`
* `Remove`

### Alberi in Java

#### La classe `TreeNode`

#### La classe `Tree`

## Alberi binari

### Alberi di ricerca binari

#### Ricerca binaria

## Visite di un albero

### Pre-order

### Post-order

### In-order

### Breadth-first

## Riferimenti
