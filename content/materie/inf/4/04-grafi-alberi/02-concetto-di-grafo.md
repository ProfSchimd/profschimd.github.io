---
title: "Il concetto di grafo"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/graphs
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
Vediamo ora una definizione formale di grafo.

{{<def title="Grafo">}}
Un grafo è un insieme di **nodi** (*nodes*) collegati tra di loro mediante **lati**
(*edges*) o **archi** (*arcs*), ogni lato o arco mette in collegamento due nodi
diverso oppure un nodo con sé stesso, in questo secondo caso il collegamento viene
anche detto *self-loop* (o semplicemente *loop*). Se il collegamento ha una direzione (c'è una
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

### Grado
Come visto nell'esempio sopra, ogni nodo può essere connesso a quanti altri nodi
si vuole, anche a zero (`Zoe`, nell'esempio sopra, non ha lati incidenti). Inoltre,
in un grafo orientato un nodo `A` può avere un arco uscente verso `B`, ma potrebbe
non avere l'arco entrante in `A` e uscente da `B`. Vediamo nella seguente definizione
come rendere precisi questi concetti.

{{<def title="Grado">}}
Per un grafo *non orientato*, il numero di lati incidenti ad un dato nodo `A` viene
detto **grado** (**degree**) di `A` e si indica con \\(\delta(A)\\). Un self-loop
in un dato nodo `A` va contato come due lati distinti.

Per un grafo *orientato*, il numeri di archi entranti ad un dato nodo `A` viene detto
**grado entrante** e si indica con \\(\delta^{+}(A)\\), il numero di archi uscenti da
un dato nodo `A`, viene detto **grado uscente** e si indica con \\(\delta^{-}(A)\\).
Per i grafo orientato il **grado** (complessivo) di un dato nodo `A` è la differenza
tra il grado entrante ed il grado uscente
$$ \delta(A) = \delta^{+}(A) - \delta^{-}(B) $$
Un self-loop in un dato nodo `A` va considerato come un arco entrante ed un arco
uscente.
{{</def>}}

### Percorso e connettività
In un grafo è possibile "muoversi" da un nod ad un altro percorrendo i lati o gli
archi. Ad esempio nel grafo sopra posso "spostarmi" da `Alice` ad `Eric`, ad esempio,
attraverso `Carol` oppure attraverso `Fred`. È possibile raggiungere `Eric` da `Alice`
attraverso `Bob`, `Fred`, `David` e `Carol`. Ognuno di questa sequenza di nodi che
sono tra loro vicini, viene detta percorso, vediamo meglio la definizione di percorso
in un grafo.

{{<def title="Percorso">}}
In un grafo un **percorso** (**path**) è una sequenza di nodi \\(a, b, c, d, \ldots \\)
a patto che tra due nodi adiacenti nella lista \\(x, y\\) vi sia un lato nel caso di
grafi non orientati o un arco uscente da \\(x\\) ed entrante in \\(y\\) nel caso di
grafi orientati.
{{</def>}}

### Esempio: grafo non orientato
{{<column/two-cols wr=4 wl=8 content=left embed="img/train-station-graph.html">}}
Vediamo i concetti esposti sopra con un esempio su un grafo orientato in cui i nodi
rappresentato stazioni ferroviarie e i lato rappresentano collegamenti ad alta
velocità (vedi figura a destra).

Ricordiamo che il grado rappresenta il numero totale di lati incidenti, per cui
il nodo `TO` ha grado 2, il nodo `MI` ha grado 4, `VE` grado 2 `BO` grado 4 e
così via.

Ci sono diversi percorsi nel grafo a destra, ad esempio `TO, MI, VE` è un percorso
che parte da `TO` ed arriva `VE` passando per `MI`. Un altro esempio è `BO, FI, GE, MI, BO`
in questo caso l'inizio e la fine del percorso sono lo stesso nodo `BO`. Anche il seguente
è un percorso `VE, BO, MI, VE, BO, MI` il quale percorre due volte lo stesso sotto
percorso `VE, BO, MI`. 
{{</column/two-cols>}}

### Esempio: grafo orientato
{{<column/two-cols wr=4 wl=8 content=left embed="img/grafo-orientato.html">}}
In questo secondo esempio, vediamo i concetti esposti sopra applicati ad un grafo
orientato (figura a destra).

Il grado entrante \\(\delta^+\\), uscente \\(\delta^-\\) e complessivo
\\(\delta\\) di ogni singolo nodo del grafo è riportato nella seguente tabella

{{<table>}}
| Nodo | \\(\delta^+\\) | \\(\delta^-\\) | \\( \delta \\) |
|------|---------------|-----------------|----------------|
|   A  |   2           |        1        |      1         |
|   B  |   2           |        3        |     -1         |
|   C  |   2           |        1        |      1         |
|   D  |   1           |        2        |     -1         |
|   E  |   2           |        1        |      1         |
{{</table>}}
{{</column/two-cols>}}
In un grafo orientato i percorsi devono seguire le frecce affinché siano validi,
nella figura sopra il percorso `A, B, D` è un percorso valida, ma non lo è il
seguente percorso `A, C, D` non esiste infatti un arco tra `A` e `C` (ne esiste uno
tra `C` ed `A`). Il seguente è anche un percorso valido `A, B, B, A`, in questo
caso si è percorso una volta il loop `(B,B)`, anche il seguente è perciò un
percorso valido `B, B, B`, si noti però che questo non lo è `A, A, A` in quanto
non c'è un loop `(A,A)`.

Infine notiamo come un qualsiasi percorso che termini in `E`, ad esempio `A, B, D, E`,
può unicamente rimanere in attraverso l'unico arco uscente da `E` che riporta d
`E` stesso (tale arco è un loop).

### Grafi pesati
I grafi visti finora non differenziano tra i vari lati/archi nel senso che non
hanno alcun valore associato ad essi. I **grafi pesati**, per contro, associano
ad ogni lato/arco del grafo un *peso* (tipicamente un valore numerico).

{{<column/two-cols wr=4 wl=8 content=left embed="img/grafo-pesato.html">}}
La figura a destra mostra nuovamente l'esempio di grafo non orientato per le
stazioni ferrovieri in cui sono stati inseriti dei pesi ad ogni lato. In questo
esempio i pesi sono numerici e potrebbero rappresentare il tempo di percorrenza
in minuti della tratta associata. Ad esempio, tra Milano e Bologna (lato tra
`MI` e `BO`) il tempo di percorrenza, secondo questo grafo, è di 130 minuti, mentre
tra Bologna e Firenze è di 45 minuti. Inoltre, essendo il grafo non orientato il
peso di un lato vale in entrambe le direzioni, nell'esempio il tempo di percorrenza
indicato vale qualsiasi sia il verso in cui si percorre il lato. Ad esempio anche
il tempo tra Bologna e Milano sarà di 130 minuti, mentre sarà di 45 minuti quello
tra Firenze e Bologna.

In caso di grafi orientati, tuttavia, sappiamo che un arco può essere percorso
in una sola direzione (indicata dalla freccia nella rappresentazione grafica),
perciò non possiamo dire che il peso di un arco valga indipendentemente dalla
direzione. Infatti in un grafo orientato il peso deve essere dato a tutti gli
archi, ad esempio l'arco da `A` a `B` avrà un peso e un peso, che potrebbe essere
diverso, lo avrà anche l'arco da `B` ad `A`.
{{</column/two-cols>}}

## Rappresentazione di grafi
Quanto visto sopra è una rappresentazione matematica (utilizzando formule e simboli
matematici) dei grafi, vediamo ora come traduciamo questo in un linguaggio di
programmazione (Java negli esempi sotto).

Ci sono due modi principali per rappresentare grafi:
* attraverso *liste di adiacenza* in cui dei nodi sono collegati tra di loro (simile
a quanto abbiamo visto per [alberi]({{< ref "01-alberi.md" >}}) e [liste]({{< ref "02-liste.md" >}}));
* attraverso una *matrice* che indica i collegamenti, ci sono due possibili tecniche
di questo tipo chiamate *matrice di adiacenza* e *matrice di incidenza*.

Nelle prossime sezioni andremo a discutere queste due metodologie di rappresentazione
di grafi.

### Rappresentazione mediante liste di adiacenza
Per rappresentare i grafi mediante *liste di adiacenza* (*adjacency list*), si
parte con il definire un *nodo* del grafo che contiene:
* un *valore* (*value*), di tipo `Object` nel nostro esempio,
* ed una *lista di nodi adiacenti*, un `ArrayList` nel nostro esempio.

```java
public class GraphNode {
    public Object value;
    public ArrayList<GraphNode> neighbors;
}
```

Ogni arco tra nodi, ad esempio tra `Alice` e `Bob`, deve prevedere l'inserimento
nella lista di un nodo di tutti i suoi vicini. Ad esempio il codice sotto inserisce
come vicini del nodo `eric` i nodi `carol` e `fred` (nel codice si assume che le
istanze siano già state create).

```java
eric.neighbors.add(carol);
eric.neighbors.add(fred);
```

Nel caso di grafi non direzionati, se `Carol` è vicino di `Eric` allora anche `Eric`
è vicino di `Carol`, per questo motivo il grafo sarà correttamente rappresentato se,
oltre al codice sopra, viene eseguito anche il seguente

```java
carol.neighbors.add(eric);
fred.neighbors.add(carol);
```

{{<important>}}
Nella creazione delle classi `Graph` e `GraphNode`, non si è tenuto conto del
fatto che in un grafo non orientato ogni lato deve essere memorizzato due volte.
Ad esempio un lato tra `A` e `B` sarà nell'`ArrayList` di `A` e di `B`. Questo
crea un problema di *ridondanza* perché la stessa informazione è memorizzata in
due posti diversi. Ogni volta che si aggiorna tale informazione (ad esempio si
elimina il lato), l'aggiornamento deve essere riportato in tutti i punti in cui
essa è presente (ad esempio sia `A` elimina `B` dai vicini, sia `B` elimina `A`
dai vicini).
{{</important>}}

{{<observe>}}
La rappresentazione dei grafi mediante lista di adiacenza non è adatta a
rappresentare grafi pesati. Per convincersi basta porsi la seguente domanda:
*dove inseriremmo l'informazione del peso di un lato (ad esempio tra `A` e `B`)?*

Dopo averci pensato un po', ci si rende conto che ogni possibile scelta presenta
dei problemi in termini di complicazione del codice. Il problema risiede nel
fatto che la lista di adiacenza, non comprende il concetto di lato/arco, bensì usa
il concetto di *nodo vicino* per indicare la presenza di un lato/arco. Per questo
motivo il peso, che è associato ad un arco, non ha un posto "naturale" dove possa
essere memorizzato.
{{</observe>}}

### Rappresentazione mediante matrici
Una **matrice** è una tabella di numeri, in una matrice abbiamo **righe** e
**colonne** che indichiamo con interi `0,1,2,...` (come gli indici di un array bidimensionale
in Java). Per indicare una **cella** di una matrice domanda, quindi, dire quale
indice di riga `i` e quale indice di colonna `j`. Consideriamo la seguente
matrice (in matematica le matrici si includono tra quadre o tra tonde, qui
scegliamo di usare le quadre).
$$
\mathbf{M} = \begin{bmatrix}
1 & -2 & 1 & 0 & 3\\\\
0 & 0  & 1 & 0 & 1\\\\
1 & 1 & 1 & 1 & 1\\\\
\end{bmatrix}
$$

La matrice indicata con \\(\mathbf{M}\\):
* ha 3 righe di indice `0,1,2`,
* ha 5 colonne di indice `0,1,2,3,4`,
* si dice una matrice \\(3 \times 5 \\) (si legge *tre per cinque*),
* **non è** una matrice \\(5 \times 3\\),
* ha un totale di \\(15\\)(\\(=3\times 5\\)) elementi,
* ha il valore `-2` nella cella di indici \\(i=0, j=1\\),
* ha il valore `1` nella cella di indici \\( i=1, j=2 \\)
* ha l'ultima riga tutta di valori uguali (`1` in questo caso).

#### Matrice di adiacenza
Dato un grafo con \\( n\ \\) nodi, la sua **matrice di adiacenza** è una
matrice con \\(n\\) righe e \\(n\\) colonne. Ognuno degli \\(n\\) nodi è associato
ad un indice `0,1,...,n-1` (attenzione al meno `1`!), in questo modo ogni riga
è associata ad un nodo ed ogni colonna è associata ad un nodo. Quindi possiamo
indicare con un numero ogni nodo del grafo.

{{<example>}}
Consideriamo l'esempio del grafo sociale all'inizio della pagina, possiamo immaginare
di ordinare i nodi in ordine alfabetico e associarli ai numeri interi:

```
Alice -> 0
Bob   -> 1
Carol -> 2
David -> 3
Eric  -> 4
Fred  -> 5
Zoe   -> 6
```

Come ci aspettavamo, gli indici vanno da `0` a `6` essendoci \\(7\\) nodi nel grafo.
{{</example>}}

{{<attention>}}
A differenza delle tabelle (ad esempio in un foglio di calcolo), le matrici non
possono avere celle vuote.
{{</attention>}}

Passiamo ora a definire formalmente il contenuto di una matrice di adiacenza.

{{<def title="Matrice di adiacenza">}}
Dato un grafo con \\(n\\) nodi, la sua **matrice di adiacenza** (**adjacency matrix**)
è una matrice \\(n \times n\\) (con \\(n\\) righe e \\(n\\) colonne) i cui valori
delle celle dipendono dalla presenza o meno di un lato/arco. La cella \\((i,j)\\) della
matrice ha:
* il valore `1` se esiste un arco o un lato dal nodo \\(i\\) al nodo \\(j\\),
* il valore `0` se **non** esiste un arco o un lato lato dal nodo \\(i\\) al nodo \\(j\\),
* il valore `2` se \\(i=j\\) e esiste il self-loop in \\(i\\) (o in \\(j\\) visto che sono uguali).
{{</def>}}

{{<example title="Matrice di adiacenza per un grafo non orientato">}}
Consideriamo il grafo sociale (`Alice`, `Bob`, ...) con i nodi associati agli
indici come nell'esempio sopra. La matrice di adiacenza del grafo sarà
$$
\begin{bmatrix}
0 & 1 & 1 & 1 & 0 & 1 & 0 \\\\
1 & 0 & 0 & 0 & 0 & 1 & 0 \\\\
1 & 0 & 0 & 1 & 1 & 0 & 0 \\\\
1 & 0 & 1 & 0 & 0 & 1 & 0 \\\\
0 & 0 & 1 & 0 & 0 & 1 & 0 \\\\
1 & 1 & 0 & 1 & 1 & 0 & 0 \\\\
0 & 0 & 0 & 0 & 0 & 0 & 0 \\\\ 
\end{bmatrix}
$$
{{</example>}}

{{<example title="Matrice di adiacenza per un grafo orientato">}}
Consideriamo il grafo orientato dell'esempio sopra con i nodi in
ordine alfabetico (`A -> 0`, `B -> 1`, ..., `E -> 4`), la matrice di adiacenza
del grafo è la seguente
$$
\begin{bmatrix}
0 & 1 & 0 & 0 & 0 \\\\
1 & 1 & 1 & 1 & 0 \\\\
1 & 0 & 0 & 0 & 0 \\\\
0 & 0 & 1 & 0 & 1 \\\\
0 & 0 & 0 & 0 & 1 \\\\
\end{bmatrix}
$$
{{</example>}}

#### Matrice di incidenza
Nella matrice di incidenza anziché memorizzare nodi sia sulle righe che sulle
colonne, si memorizzano sulle righe i nodi e sulle colonne gli archi.
I valori presenti nella matrice dipendono dal fatto che il grafo sia orientato
o non orientato:
* nei grafi non orientati ogni colonna ha esattamente due valori ad `1`,
precisamente nelle righe dei nodi collegati da tale arco, tutti gli altri
valori sono `0`;
* nei grafi non orientati ogni colonna ha esattamente un valore ad `1` ed un
volare `-1`, il valore `1` nella riga associata al nodo in cui l'arco entra, il
valore `-1` nella riga associata al nodo da cui l'arco esce, tutti gli altri
valori sono `0`.

{{<column/two-cols wl=8 wr=4 content="left" embed="img/grafo-orientato.html">}}
Riprendendo a destra il nostro esempio di grafo orientato e supponendo che nelle
righe ci siano i nodi nell'ordine alfabetico `A`, `B`, ...
$$ 
\begin{bmatrix}
1 & -1 & 0  & 0 & -1 & 0  & 0  & 0 & 0\\\\
-1 & 1 & 1  & 1 & 0  & 0  & 0  & 0 & 1/-1\\\\
0 & 0  & -1 & 0 & 1  & -1 & 0  & 0 & 0\\\\
0 & 0  & 0 & -1 & 0  & 1  & 1  & 0 & 0\\\\
0 & 0  & 0  & 0 & 0  & 0  & -1 & 1/-1 & 0\\\\
\end{bmatrix}
$$
Si nota subito un problema dovuto al fatto che i self-loop dovrebbero avere un valore
che indica la loro esistenza, il valore `0` è già utilizzato per indicare i nodi
non connessi dall'arco. Fortunatamente si può usare un qualsiasi valore diverso da
`0` (anche `1` o `-1`), infatti le colonne associate a self-loop avranno un unico
valore diverso da `0` in corrispondenza della riga associata al nodo stesso (nodo che
è unico in quanto un loop collega un nodo a se stesso)
{{</column/two-cols>}}

{{<observe>}}
La rappresentazione mediante matrice di incidenza non viene usata di frequente,
quando si vuole rappresentare un grafo utilizzando matrici si preferisci utilizzare
la matrice di adiacenza discussa sopra.
{{</observe>}}

{{<exercise>}}
Un altro motivo per preferire la matrice di adiacenza alla matrice di incidenza
è che la seconda, in certi casi, occupa più spazio in memoria. Lo spazio occupato
in memoria è il numero di celle quindi il numero di righe per il numero di colonne
$$ \textrm{Spazio in memoria} = \textrm{Numero righe} \times \textrm{Numero colonne} $$

Per vedere che la differenza tra le due matrici scriverle nei casi di un *grafo 
non orientato e completo* (cioè contenente tutti i possibili lati) fatto di \\(n\\)
nodi per vari valori \\(n=3,4,5,6\\).

* Quante righe e quante colonne hanno le due matrici nei vari casi?
* Perché la matrice di incidenza, per i valori alti di \\(n\\) molte più colonne?
{{</exercise>}}
