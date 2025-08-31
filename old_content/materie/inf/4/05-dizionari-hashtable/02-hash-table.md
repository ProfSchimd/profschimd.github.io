---
title: "Struttura dati hash table"
type: lecture
weight: 200
summary: "Questa lezione presenta le struttura di tipo hash table, prima introducendo il concetto di funzione di hash e poi presentando la struttura hash table basata su liste di collisione. Gli esempi forniti sono nel linguaggio Java." 
---

Una *tabella di hash* è una struttura dati che memorizza dati associando ad ogni *valore* una *chiave* calcolata mediante una *funzione di hash*. Supponiamo di voler memorizzare il valore \\( x \\) utilizzando una funzione di hash \\( h(x) \\), la tabella di hash sarà quindi una tabella in cui per ogni riga esiste una chiave, ad esempio \\( h(x) \\) ed uno o più valori, ad esempio \\( x \\). Nel resto della lezione vedremo i dettagli delle tabelle hash utilizzando esempi nel linguaggio Java.

## Funzioni di hash
Un aspetto fondamentale delle tabelle di hash è la *funzione di hash* (*hash function*) che indichiamo qui con \\( h(x) \\). È importante tenere sempre a mente che il *dominio* di tale funzioni (i possibili valori di \\(x\\)) non è necessariamente un dominio numerico. In effetti \\(x\\) può essere qualsiasi cosa dato da memorizzare. Per quanto riguardo il *codominio* di \\(x\\), invece, si richiede che questo sia numerico, tipicamente un sottoinsieme dei numeri naturali (zero incluso). Questo requisito è fondamentale in quanto \\(h(x)\\) rappresenta l'indice con cui accederemo alla tabella, per questo deve essere un numero intero non negativo. Il valore \\(h(x)\\) viene chiamato *valore di hash* (o semplicemente *hash*) di \\(x\\).

{{<def title="Funzione hash">}}
Una **funzione hash** \\(h(x)\\) è una funzione che ha come dominio una qualsiasi sequenza di bit (i dati) e come codominio un sottoinsieme dei numeri naturali \\(\mathbb{N}\\).

$$ h:\\{0,1\\}^* \longrightarrow \mathbb{H} \subset \mathbb{N} $$
{{</def>}}

### Collisioni
Un concetto importante nella progettazione di tabelle di hash è quello di *collisione* (*collision*), si parla di collisione quando due oggetti diversi \\(x_1\\) e \\(x_2\\) danno hanno stesso valore di hash.

$$ h(x_1) = h(x_2) $$

In altre parole due oggetti che generano una collisione, devono essere memorizzati nella stessa riga della tabella di hash. Come vedremo [sotto](#tabelle-hash) questo è un aspetto importante nell'implementazione di una tabella di hash in quanto **la tabella di hash è tanto più efficiente quanto più rare sono le collisioni**.

{{<attention>}}
Le presenza o meno di collisioni, dipende dalla funzione di hash scelta e non dal modo in cui si memorizza la tabella di hash. Per questo motivo, la scelta di \\( h(x) \\) è estremamente importante.
{{</attention>}}

### Esempi di funzione hash
Un classico esempio di funzione di hash è la funzione *resto* che, tuttavia, si può utilizzare solo quando \\( x \\) è un valore numerico intero. 

$$ h(x) = x \\ \\textrm{mod} \\ M $$

Il valore \\(M\\) è importante nella progettazione di una tabella di hash. Ricordiamo infatti che il resto della divisione di un numero intero \\(x\\) per \\(M\\) è un valore intero nell'intervallo \\([0,M)\\), aperto a destro cioè \\(M\\) escluso. In altre parole \\(M\\) rappresenta il numero di righe della tabella. Di conseguenza, \\(M\\) rappresenta la dimensione in memoria della tabella. Per mantenere la tabella compatta, si potrebbe pensare che un \\(M\\) piccolo sia la scelta migliore, tuttavia, quando \\(M\\) è troppo piccolo si verificano molte collisioni che rendono meno efficiente la tabella di hash.

## Tabelle hash

## Struttura `HashTable` in Java

## Riferimenti