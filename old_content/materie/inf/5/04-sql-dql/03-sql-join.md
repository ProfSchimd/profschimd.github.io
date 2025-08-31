---
title: "L'operazione JOIN in SQL"
running_title: "JOIN in SQL"
type: lecture
summary: "In questa lezione si viene introdotto il concetto di JOIN comprese le sue varianti (naturale, inner e outer)."
weight: 300
---

## Il concetto di `JOIN`
Nei database relazionali concetti correlati sono collegati tra di loro mediante *chiave esterne*, quando vi è la necessità di "riunire" queste informazioni in un'unica relazione (tabella), si procede ad un'operazione chiamata *join*.

L'operazione di join produce una relazione a partire da due o più altre relazioni. In base al tipo di unione, si possono presentare diversi [tipi di join](#tipologie-di-join), il punto di partenza di una join è il prodotto cartesiano che discutiamo brevemente di seguito.

### Il prodotto cartesiano
Prendiamo due insiemi \\(A=\lbrace a,b \rbrace\\) e \\(B=\lbrace c,d\rbrace\\), il prodotto cartesiano è l'insieme di tutte le coppie \\((x,y)\\) che si possono formare prendendo il primo elemento \\(x\\) dal primo insieme ed il secondo elemento \\(y\\) dal secondo insieme.

$$ A \times B = \lbrace (a,c), (b,c), (a,d), (b,d) \rbrace $$

Nell'algebra relazionale il prodotto cartesiano tra relazione produce una relazione dove ogni tupla è composta da una tupla della prima relazione e da una tupla della seconda relazione.]]{{<column/columns>}}
{{<column/col>}}
`Student`
{{<table>}}
| Name | class |
|------|-------|
| Al   | 1A    |
| Bob  | 2A    |
{{</table>}}
{{</column/col>}}
{{<column/col>}}
`Class`
{{<table>}}
| id | room |
|----|------|
| 1A | 101  |
| 2A | 203  |
{{</table>}}
{{</column/col>}}
{{<column/col>}}
`Student` \\(\times\\) `Class` 
{{<table>}}
| Name | class | id | room |
|------|-------|----|------|
| Al   | 1A    | 1A | 101  |
| Al   | 1A    | 2A | 203  |
| Bob  | 2A    | 1A | 101  |
| Bob  | 2A    | 2A | 203  |
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

Le informazioni contenute nel prodotto cartesiano, tuttavia, non sono sempre *valide* per la base di dati, per questo motivo vanno filtrate. Una *join* è la combinazione del prodotto cartesiano e del filtraggio.


## Tipologie di `JOIN`
Quando si esegue un join ti tabelle sulla base di un attributo, le tuple presenti in una tabella potrebbero non avere corrispondenza nell'altra tabella. Sulla base di come il join tratta questa situazione, identifichiamo quattro tipi di operazioni di join, rappresentati di seguito in termini insiemistici.

{{<include "img/img-join-type.html">}}

### `INNER JOIN`
Si tratta dell'operazione di join più comune in quanto include nel risultato solo le tuple che hanno corrispondenza in entrambe le tabelle.

```sql
SELECT S.last_name, S.first_name, C.level, C.section
FROM Student AS S LEFT JOIN Class AS C
ON S.class = C.class_id;
```

### `OUTER JOIN`

Consideriamo un database dove una tabella `Cliente` contiene informazioni sui clienti ed una tabella `Item` contiene una tupla per ogni prodotto inserito nel carrello. Supponiamo di voler trovare tutti i clienti che hanno il loro carrello vuoto. La prima soluzione che viene in mente è di fare un un `JOIN` tra la tabella `Cliente` e la tabella `Item` la quale contiene come chiave esterna il riferimento al cliente.

```sql
SELECT *
FROM cliente JOIN item on cliente.email = item.customer
WHERE item.quantita = 0
```

Purtroppo questa soluzione non produce alcun risultato, il motivo è che, ogni item sul carrello ha almeno quantità 1 (non si può mettere sul carrello quantità 0 di un qualche prodotto). Di conseguenza la condizione `WHERE` non è mai vera e quindi la tabella risultante dalla query è sempre vuota.

Quello che noi vorremmo è individuare quelle tuple di `Cliente` che **non** compaiono nella tabella di join, questo però non è possibile con un *inner join*, ma è necessario un operazione di **outer join**. L'outer join esegue il join in modo che vengano include anche tuple che non hanno corrispondenza in entrambe le tabelle.

Esistono tre tipi di outer join:
1. **full outer join**: include tutte le tuple in entrambe le tabelle
2. **left outer join**: include tutte le tuple che si trovano sulla tabelle di sinistra
3. **right outer join**: include tutte le tuple che si trovano sulla tabelle di destra

Mentre il full outer join si utilizza raramente (in alcuni database non è nemmeno supportato), left a right outer join vengono utilizzati in quanto utili in diverse situazioni, per questo motivo vengono discussi più in dettaglio di seguito.

Come per l'inner join, anche per l'outer join il risultato è una tabella che comprende tutte le colonne di entrambe le tabelle. Nell'inner join, tuttavia, queste colonne hanno valori presi dalle tabelle stesse in quanto il join è fatto in modo da "affiancare" tuple che sono corrispondenti. Nell'outer join alcune tuple una tabella (ad esempio della tabella a sinistra nel left outer join) non hanno corrispondenza nella seconda tabella (ad esempio nella tabella di destra nel left outer join). Nella tabella di join i valori delle colonne senza corrispondenza sono messi a `NULL`.

{{<observe>}}
Quando si parla di left e right join, viene spesso omesso il termine outer in quanto sottinteso, nel seguito faremo spesso così. Va comunque ricordato che l'espressione *left join* equivale a *left outer join* e l'espressione *right join* equivale a *right outer join*.
{{</observe>}}

#### `LEFT JOIN`

Il primo esempio di left join è proprio con cui abbiamo introdotto l'outer join sopra. Vogliamo individuare i clienti che hanno il carrello vuoto. Utilizzando il left join con la tabella `Cliente` a sinistra, quello che ci interessa sono esattamente le tuple che non hanno corrispondenza in `Item` cioè quei clienti che non hanno nessun item. Ecco la query corrispondente.

```sql
SELECT cliente.email, cliente.first_name, cliente.second_name
FROM cliente LEFT JOIN item on cliente.email = item.customer
WHERE item.customer is NULL;
```

#### `RIGHT JOIN`

{{<def>}}
L'operazione **outer join** esegue un join in cui vengono include anche le tuple che non hanno corrispondenza in entrambe le tabelle unite. Esistono tre tipi di outer join, il **full outer join** comprende tutte le tuple ed è la stessa cosa del prodotto cartesiano. Il **left outer join** comprende tutte le tuple che si trovano nella tabella di sinistra. Il **right outer join** comprende tutte le tuple che si trovano nella tabella di destra.
{{</def>}}

## Esempi di `JOIN`

