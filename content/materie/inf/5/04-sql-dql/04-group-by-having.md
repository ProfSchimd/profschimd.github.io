---
title: "Aggregazione: GROUP BY e HAVING"
running_title: "GROUP BY"
type: lecture
summary: "In questa lezione viene discusso il concetto di aggregazione mediante GROUP BY e del filtraggio mediante HAVING. Vengono inoltre introdotte le funzioni di riduzione (SUM, COUNT, ...)."
weight: 400
---

## Aggregazione con `GROUP BY`

La clausola `GROUP BY` è utilizzata in SQL per raggruppare le righe di una tabella in base ai valori di una o più colonne. Una volta raggruppate le righe, è possibile eseguire operazioni di *aggregazione* quali somma, conteggio, media e altre. 

{{<column/columns>}}
{{<column/col>}}
Ad esempio, supponiamo di voler contare gli studenti di ogni classe, la seguente query esegue tale operazione producendo una tabella con
* due colonne e 
* tante righe quante sono le classi con almeno uno studente (vedi a fianco).

```sql
SELECT class_id, COUNT(class_id)
FROM student
GROUP BY class_id;
```
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| class_id | COUNT(class_id) |
|----------| ----------------|
| 1 |	1 |
| 2 |	1 |
| 3 |	2 |
| 4 |	2 |
| 5 |	2 |
| 6 |	4 |
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

Vediamo di capire meglio come opera `GROUP BY`.
1. Per prima cosa il motore che esegue la query SQL individua la tabella su cui operare, nell'esempio è la tabella `student` della clausola `FROM`, ma in casi più complicati può essere una tabella ottenuta mediante operazioni di `JOIN` (vedi esempio sotto).
2. Una volta individuata la tabella, vengono raggruppate le righe con lo stesso valore del/degli attributo/i indicati in `GROUP BY`, nell'esempio le righe con lo stesso `class_id` vengono raggruppate.

{{<include "img/img-sql-group-by.html">}}

{{<attention>}}
Una volta raggruppate le righe, i valori rispetto ai quali non viene fatto il raggruppamento e le colonne che non risultano dall'aggregazione non hanno alcun significato. Inoltre, non possiamo neanche sapere quale sarà il valore di tale colonne poiché il DBMS può operare scelte legate all'efficienza dell'esecuzione della query.

Ad esempio modificando la query sopra come segue
```sql
SELECT class_id, COUNT(class_id), last_name
FROM student
GROUP BY class_id;
```

vediamo che è presente una nuova colonna `last_name` (correttamente, visto che è stato inserito nella `SELECT`)

{{<table>}}
| class_id | COUNT(class_id) | last_name |
|----------|-----------------|-----------|
| 1        | 1               | De Marchi |
| 2        | 1               | Bianchi   |
| 3        | 2               | Rossi     |
| 4        | 2               | Rossi     |
| 5        | 2               | Visconti  |
| 6        | 4               | Bianchi   |
{{</table>}}

Ma cosa rappresenta tale colonna? In questo caso siamo certi che si tratta del cognome di uno studente della classe con `class_id` corrispondente, ma di certo non sappiamo quale studente specifico e perché sia stato scelto proprio quello. In caso di query con `JOIN` potremmo anche trovarci con valori ancora più sorprendenti. Perciò è fondamentale **non usare come colonne, attributi che non sono stati raggruppati e che non risultano dall'aggregazione di righe**.

{{</attention>}}

## Filtraggio con `HAVING`

La clausola `HAVING` viene utilizzata in combinazione con `GROUP BY` per filtrare i risultati delle operazioni di aggregazione. Mentre `WHERE` filtra le righe prima che vengano raggruppate, `HAVING` permette di filtrare i gruppi di righe risultanti dalle operazioni di aggregazione. Ad esempio, se vogliamo trovare tutti i livelli scolastici con un numero di studenti maggiore di 100, useremo `HAVING` per applicare questo filtro dopo aver eseguito il raggruppamento. In pratica, `HAVING` è utile quando desideriamo imporre condizioni basate su risultati aggregati, ad esempio, trovare i dipartimenti con una media di età degli insegnanti superiore a 40 anni.

### Differenza tra `HAVING` e `WHERE`

La principale differenza tra `HAVING` e `WHERE` risiede nel momento in cui vengono applicati i filtri. `WHERE` viene applicato prima della fase di raggruppamento, quindi filtra le righe individuali prima che vengano aggregate. D'altra parte, `HAVING` viene applicato dopo la fase di raggruppamento, quindi si concentra sui risultati delle operazioni di aggregazione. In altre parole, `WHERE` viene utilizzato per filtrare le righe dei dati grezzi, mentre `HAVING` opera sui dati aggregati. Ad esempio, con `WHERE` possiamo escludere le righe degli studenti con età inferiore a 18 anni, mentre con `HAVING` possiamo escludere i gruppi di livelli scolastici con meno di 100 studenti.

## Funzioni di riduzione

Le funzioni di riduzione, o funzioni di aggregazione, sono utilizzate per eseguire calcoli su gruppi di righe in una tabella. Alcune delle funzioni di riduzione più comuni includono SUM (somma), COUNT (conteggio), AVG (media), MAX (massimo) e MIN (minimo). Queste funzioni vengono utilizzate insieme a `GROUP BY` per calcolare valori aggregati basati su gruppi specifici. Ad esempio, utilizzando `SUM` e `GROUP BY`, possiamo calcolare il totale delle votazioni degli studenti in ciascun corso. Le funzioni di riduzione sono essenziali quando si desidera ottenere statistiche o aggregazioni sui dati in un database, consentendo di estrarre informazioni significative e utili dai dati grezzi.
