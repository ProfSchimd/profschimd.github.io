---
title: "Algoritmi su grafi"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/graphs/algoritms
weight: 300
summary: "L'utilizzo dei grafi come strutture dati permette l'esecuzione di algoritmi altrimenti difficili, se non impossibili, da realizzare. Questa lezione presenta alcuni tra i più importanti algoritmi su grafi."
---

## Visite su grafo
La **visita** di un grafo è consiste nel raggiungere tutti i nodi del grafo
utilizzando gli archi che sono disponibili. Le visite dei grafi sono legate alle
[visite negli alberi]({{< ref "01-alberi.md#visite-di-un-albero" >}}) nel senso
che le visite su alberi si possono pensare come casi particolari di visite su
grafi, in effetti **un albero è un caso speciale di grafo**.

Nel caso degli alberi, le varie visite si diversificano sulla base del fatto che
esplorino l'albero *in profondità* (prima i figli, i figli dei figli, ...)
anziché esplorare nodi allo stesso "livello". In un grafo non esiste il concetto
di figlio o di padre, tuttavia, partendo da un dato nodo, ci si può porre il
problema di esplorare il grafo utilizzando una delle due seguenti strategie:

* esploro prima tutti i vicini del nodo dato, una volta fatto questo, passo
ad esplorare i vicini dei vicini;
* esploro prima un vicini, poi i vicini di quel vicino e così via fino a che
non ho terminato e torno scegliendo un secondo vicino del quale esplorare i
suoi vicini, i vicini dei suoi vicini, ...

Queste due strategie danno luogo a due diversi algoritmi di visita, nel caso
di esplorazione dei vicini immediati, si parla di [*Breadth-First Search (BFS)*](#visita-breadth-first-search-bfs)
nel caso di esplorazione dei vicini dei vicini si parla di [*Depth-First Search (DFS)*](#visita-depth-first-search-dfs).


{{<attention>}}
Nella lezione [Concetto di Grafo]({{< ref "02-concetto-di-grafo.md" >}}), abbiamo
visto la rappresentazione di grafi mediante lista di adiacenza. Nella implementazione
presente nel [repository](https://github.com/ProfSchimd/teaching-material/blob/main/inf/datastructure/graphs/adjacency-list/ALGraph.java),
tutti i nodi del grafo sono memorizzati mediante un `ArrayList` in Java. Si potrebbe
pensare che scorrere tale `ArrayList` corrisponda ad una visita, tuttavia questo
**non è vero** in quanto tale *enumerazione* dei nodi **non garantisce che si passi
da un nodo al successivo seguendo solo cammini validi**.
{{</attention>}}

In molti algoritmi su grafo è necessario memorizzare informazione in ogni nodo,
tale informazione viene utilizzata e in certi casi modificata dall'algoritmo.
Quando questo sarà necessario, utilizzeremo una versione di `GraphNode` modificata
con tutti gli eventuali campi utili all'algoritmo. Ad esempio, gli algoritmi di
visita spesso necessitano di un campo boolean `visited` impostato a `true` solo
dopo che il nodo è stato visitato, in questo caso potremmo avere una classe
`GraphNode` simile alla seguente

```java
public class GraphNode {
    public Object value;
    public ArrayList<GraphNode> neighbors;
    public boolean visited;
}
```

### Visita *Breadth-First Search (BFS)*
A breadth-first search (BFS) is  an algorithm for traversing a finite graph. BFS visits the sibling vertices before visiting the child vertices


### Visita *Depth-First Search (DFS)*
A depth-first search (DFS) is an algorithm for traversing a finite graph. DFS visits the child vertices before visiting the sibling vertices

## Dijkstra
L'algoritmo di Dijkstra è un algoritmo utilizzato per cercare i cammini minimi in un grafo

## Ford-Fulkerson
Ford-Fulkerson permette di trovare il flusso massimo che attraversa un grafo da un punto ad un altro di questo. 

## Cammini

### Cammino Euleriano
cammino che tocca tutti i suoi archi una e una volta sola. 

### Cammino Hamilatoniano
un cammino in un grafo (orientato o non orientato) è detto hamiltoniano se esso tocca tutti i vertici del grafo una e una sola volta

## Minimum Spanning Tree

## Riferimenti

* [Visite di grafi (Wikipedia EN)][1]
* [Algoritmo di Dijkstra (Wikipedia EN)][2]
* [Algoritmo di Ford-Flukersen (Wikipedia EN)][3]
* [Percorsi Euleriani (Wikipedia EN)][4]
* [Percorsi Hamiltoniani (Wikipedia EN)][5]
* [Algoritmo di Prim (Wikipedia EN)][6]


[1]: https://en.wikipedia.org/wiki/Graph_traversal
[2]: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
[3]: https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm
[4]: https://en.wikipedia.org/wiki/Eulerian_path
[5]: https://en.wikipedia.org/wiki/Hamiltonian_path
[6]: https://en.wikipedia.org/wiki/Prim%27s_algorithm