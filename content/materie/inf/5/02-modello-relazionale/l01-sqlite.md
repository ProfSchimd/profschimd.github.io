---
title: "Laboratorio 1: DB Browser for SQLite"
running_title: "Lab 1: SQLite"
summary: "In questo laboratorio si familiarizza con il DB Browser for SQLite analizzando e manipolando tabelle."
type: lecture
weight: 1000
---

[SQLite][2] è uno standard per creare database relazionali su singolo file, si tratta di uno standard in veloce espansione e sempre più utilizzato. Va tuttavia sottolineato che SQLite **non è un DBMS**, ma un insieme di regole. Fortunatamente esistono diversi DBMS che utilizzano lo standard SQLite, uno di questi è [DB Browser for SQLite][2] disponibile gratuitamente per tutti i sistemi operativi. Questo laboratorio ha lo scopo di far familiarizzare con tale strumento e, contemporaneamente, approfondire e mettere in pratica i concetti teorici del modulo.

{{<important>}}
In base al sistema operativo utilizzato, alla versione disponibile e alla lingua impostata su DB Browser, le opzioni possono essere diverse da quelle presentate in questa lezione.
{{</important>}}

{{<attention>}}
Come il nome stesso implica, SQLite è una versione ridotta (*lite*) di SQL che, quindi, non implementa l'intero standard. Per questo motivo, pur rappresentando un ottimo strumento didattico e per piccoli progetti, SQLite non è adatto a gestire database di grandi dimensioni o per creare applicazioni complesse.
{{</attention>}}

## L'interfaccia di SQLite Browser
Appena avviato DB Browser presenta un'interfaccia simile a quella del seguente screenshot

{{<include "img/db-browser-started.html">}}

In questa situazione, DB Browser non ha alcun database aperto e perciò non ha alcuna informazione da mostrare. 

{{<column/two-cols wr=7 wl=5 content="left" embed="img/db-browser-navigating.html">}}
Se si apre un file nel formato SQLite (solitamente hanno estensione `db` o `sqlite`), si vedrà la struttura, cliccando su "Browser Data" e selezionando poi la tabella di interesse si può vedere la relazione a livello estensionale (cioè la lista di tuple). È anche possibile usare la parte laterale per visualizzare lo schema in modo che sia sempre possibile consultare le tabelle anche durante la navigazione delle tuple.

Una terza scheda (in alto a destra nell'immagine) permette di modificare il contenuto di una cella della tabella. Una volta effettuate le modifiche desiderate bisogna cliccare "Apply" e salvare il database (File -> Save All). Si può notare che prima di fare "Save All" (momento in cui le modifiche vengono scritte sul file), le funzioni "Write Changes" e "Revert Changes" sono abilitate, questo permette di meglio gestire il Database fino a che non viene salvato su file.

Infine si può notare come nel menù si siano abilitate altre opzioni tra cui "Close Database" che permette di chiudere il file e salvare tutte le modifiche che sono state apportate.
{{</column/two-cols>}}

{{<important>}}
Se qualcuna delle schede non è visibile, si può renderla visibile dal menù "View" selezionando la scheda di interesse. Dallo stesso menù è anche possibile nascondere quelle schede che non interessano in modo che l'interfaccia grafica risulti più adatta all'utilizzo.
{{</important>}}

## Esercizio: Creare e riempire un DB
In questo laboratorio creeremo un database SQLIte utilizzando DB Browser for SQLite, iniziamo cliccando su "New Database" e selezionando posizione e nome del file, per lo scopo creiamo un file chiamato `ecommerce.sqlite`.

### 1 - Creare tabelle
Nel momento in cui si seleziona il file, DB Browser mostra il menù per la creazione di tabelle (immagini sotto a sinistra), creare una tabella `Customer` con le seguenti caratteristiche (vedi anche immagine sotto a destra)
* Campo `Id` numerico definito come chiave primaria (`PK`);
* Campo `Email` testuale che non può essere `NULL` (`NN`) e che deve essere univoco (`U`);
* Campo `Address` testuale
* Campo `BirthDate` di tipo testo (vedremo il tipo `DATE` quando tratteremo [SQL]({{<ref "04-sql-dql" >}})) 
* Campo `Avatar` di tipo `BLOB` (Binary Large Object)

{{<column/columns>}}

{{<column/col>}}
{{<include "img/db-browser-create-empty.html">}}
{{</column/col>}}

{{<column/col>}}
{{<include "img/db-browser-create-filling.html">}}
{{</column/col>}}

{{</column/columns>}}

### 2 - Riempire di valori
Utilizzando la scheda di modifica dei valori aggiungere almeno 4 righe alla tabella `Customer`. Per aggiungere una nuova riga cliccare sul bottone "Insert new record" e riempire i campi utilizzando La scheda "Edit Database Cell" **ricordarsi di cliccare Apply ad ogni campo modificato** (vedi immagine sotto).

{{<include "img/db-browser-new-row.html">}}


{{<exercise>}}
Per vedere l'effetto di `UNIQUE` (che dovrebbe abilitato per l'attributo `Email`, vedi sopra) aggiungere una riga con un indirizzo già presente nella tabella. Cosa accade?
{{</exercise>}}

### 3 - Creare la tabella `Invoice` con chiave esterna
Aggiungere una seconda tabella chiamata `Invoice` al database contenente i seguenti campi
* `Number` (chiave primaria) intero,
* `Date` testo,
* `Total` di tipo numerico e
* `Customer` di tipo intero, questo campo deve essere definito `NOT NULL` (`NN`) e deve essere una chiave esterna per la chiave `Id` della tabella `Customer`.

Aggiungere almeno 4 fatture di cui due per lo stesso cliente.

{{<important>}}
Se durante l'inserimento nella tabella `Invoice` compare un errore del tipo "NOT NULL failed", provare a salvare nuovamente, l'errore dovrebbe sparire.
{{</important>}}

### 4 - Eseguire una semplice query
Nella scheda "Execute SQL" copiare ed incollare il seguente codice SQL

```sql
SELECT *
FROM Customer, Invoice
WHERE Customer.Id = Invoice.Customer AND Invoice.Total > 100
```

Eseguire quindi la query utilizzando il pulsante "Execute All" (simbolo "Play"), cosa si vede?

{{<attention>}}
Se l'esecuzione termina con un errore, probabilmente non si sono seguiti i passaggi correttamente. Affinché tutto funzioni devono essere stati usati esattamente i nomi indicati nel testo ed il tipo indicato. Attenzione che i valori numerici con la virgola vanno inseriti utilizzando il punto `.` come divisore, quindi `99.99` e non `99,99`.
{{</attention>}}

Cosa si vede

## Riferimenti
* [SQLite Browser][1]
* [Documentazione ufficiale SQLite][2]
  
[1]: https://sqlitebrowser.org/
[2]: https://www.sqlite.org/