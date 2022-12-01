---
title: "Il concetto di grafo"
type: lecture
weight: 200
---

Consideriamo il problema di rappresentare i collegamento tra gli utenti iscritti
ad un *social network*. Ogni iscritto avrà come contatto diversi altri iscritti i
quali, a loro volta, saranno collegati ad altri iscritti.

{{<column/two-cols wr=6 wl=6 content="left" embed="img/social-graph.html">}}
Un modo per rappresentare una *rete sociale* è quello di porre ogni persona come
un *nodo* della rete e poi collegare tra di loro quei nodi che sono contatti diretti
nel social network.

Nell'immagine a destra vediamo un esempio di rete sociale, in questo caso vi
sono 6 iscritti (`Alice`, `Bob`, `Carol`, ...) che sono tra loro collegati da segmenti.
Questo potrebbe essere un modo per descrivere il concetto di *contatto* in un
social network come Facebook nel quale il contatto è *bidirezionale*. Ad esempio
`Alice` è un contatto di `Bob`, ma anche `Bob` è un contatto di `Alice`. Vedremo
Altri tipo di social network prevedono contatti *unidirezionali*, ad esempio su
Instagram, un utente `Giulie` più seguire un altro utente `Henry` senza che
`Henry` segua `Giulie`.

Sempre guardando all'immagine a destra notiamo che:
* gli iscritti non hanno tutti lo stesso numero di contatti, ad esempio `Alice` e
`Fred` hanno quattro contatti, mentre `Bob` ed `Eric` solo due;
* qualche iscritto, ad esempio `Zoe` potrebbe avere zero contatti;
* non esiste una struttura sequenziale degli iscritti, ad esempio non ha senso dire
che `Alice` viene prima di `David` e dopo `Bob`;
* se immaginiamo di *percorrere* i collegamenti, possono esistere diverse "strade"
per arrivare a destinazione, ad esempio per "raggiungere" `David` da `Bob`, posso
"passare" da `Alice` o da `Fred`.
{{</column/two-cols>}}

{{<exercise>}}
Pensa una situazione del mondo reale in cui la rappresentazione dei dati mediante
strutture sequenziali (tipo array e liste) non è adatta. Fai, con un breve disegno
simile a quello sopra, un esempio e spiega perché, secondo te, non è possibile la
rappresentazione con una struttura a lista.
{{</exercise>}}

## Definizione di grafo

{{<def title="Grafo">}}
Un grafo è un insieme di **nodi** (*nodes*) collegati tra di loro mediante **lati**
(*edges*) o **archi** (*arcs*), ogni lato o arco mette in collegamento due nodi
diverso oppure un nodo con sé stesso. Se il collegamento ha una direzione (c'è una
partenza ed un arrivo), allora diciamo che il grafo è *direzionato* (*directed*),
e chiamiamo i collegamenti *archi* altrimenti diciamo che il grafo è *non
direzionato* (*undirected*) e chiamiamo i collegamenti *lati*
{{</def>}}

{{<attention>}}
È importante non confondere il modo grafico di rappresentare un grafo mediante
punti (cerchi) e segmenti con i concetti di nodi e archi. Ovviamente, ogni
punto rappresenta un nodo ed ogni segmento un arco, **ma sono possibile altre
rappresentazioni**. Una rappresentazione spesso usata in informatica è quella
[mediante matrici](#rappresentazione-mediante-matrici) (che tratteremo sotto).
In matematica, i grafi sono spesso rappresentati mediante insiemi, ad esempio,
il grafo dell'immagine sopra sarà composta da:
* l'insieme dei *nodi*:
$$ \lbrace A, B, C, D, E, F, Z\rbrace $$
* l'insieme dei *lati*:
$$ \lbrace (A, B), (A, C), (A, D), (A,F), (B, F), (C,D), (C,E), (D,F), (F,E)\rbrace $$

{{</attention>}}

## Rappresentazione di grafi

### Rappresentazione mediante nodi

### Rappresentazione mediante matrici


