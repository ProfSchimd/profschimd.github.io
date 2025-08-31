---
title: "L'operazione SELECT in SQL"
running_title: "SQL: SELECT FROM"
type: lecture
summary: "Questa lezione presente il costrutto base SELECT-FROM utilizzato per le interrogazioni SQL. Vengono inoltre introdotti i concetti di alias e e la sintassi che utilizza il punto . per qualificare la tabella."
weight: 100
---

In questa prima lezione di SQL, esploreremo il comando `SELECT ... FROM ...` fondamentale per *interrogare* (*to query*) un database. Impareremo come selezionare colonne specifiche (operazione di proiezione dell'algebra relazionale) da una tabella e come filtrare le righe (operazione di *selezione* dell'algebra relazionale) che soddisfano determinate condizioni.

Per gli esempi di questa lezione, utilizzeremo la seguente istanza della tabella `Student`


{{<table>}}
| student_id | first_name | last_name | birth_date  | registration_date      | home_address        | email               |
|------------|------------|-----------|-------------|------------------------|---------------------|---------------------|
| 1          | Raimondo   | Bianchi   | 2004-01-01  | 2023-02-17 09:00:00   | 123 Main St         | raimondo@example.com|
| 2          | Edoardo    | Conte     | 2004-08-19  | 2023-02-17 09:30:00   | 456 Elm St          | edoardo@example.com |
| 3          | Mario      | Bianchi   | 2008-05-10  | 2023-02-17 10:00:00   | 789 Oak St          | mario@example.com   |
| 4          | Alice      | Rossi     | 2003-02-20  | 2023-02-17 10:30:00   | 101 Maple St        | alice@example.com   |
| 5          | Mario      | Rossi     | 2007-10-31  | 2023-02-17 11:00:00   | 202 Cedar St        | mario2@example.com  |
| 6          | Barbara    | Verdi     | 2007-04-01  | 2023-02-17 11:30:00   | 303 Pine St         | barbara@example.com |
| 7          | Carlo      | Rossi     | 2006-10-31  | 2023-02-17 12:00:00   | 404 Birch St        | carlo@example.com   |
| 8          | Davide     | Visconti  | 2004-06-22  | 2023-02-17 12:30:00   | 505 Redwood St      | davide@example.com  |
| 9          | Michela    | Sciascia  | 2006-02-22  | 2023-02-17 13:00:00   | 606 Cedar St        | michela@example.com |
{{</table>}}


## Proiezione: `SELECT ... FROM ...`

{{<column/columns>}}
{{<column/col>}}
La proiezione è il processo di selezione delle colonne da una tabella specifica, in SQL la proiezione si ottiene utilizzando il comando `SELECT` seguito dalla lista delle colonne da selezionare e specificando la/e tabella/e da cui operare la selezione mediante la clausola `FROM`.

Ad esempio, possiamo utilizzare la query seguente per selezionare il `first_name` e il `last_name` degli studenti dalla tabella `Student`:

```sql
SELECT first_name, last_name
FROM Student;
```

Possiamo vedere a fianco il risultato della seguente query. 

È importante notare che SQL non produce risultati sotto forma di insiemi, è infatti possibile avere una tabella con valori duplicati, ad esempio la seguente query

```sql
SELECT last_name
FROM Student;
```

produce il risultato mostrato a fianco, vediamo che per ogni riga della tabella originale esiste una riga nella tabella risultante. Questo aspetto di SQL permette di utilizzare il linguaggio per query del tipo *conta quanti studenti hanno il cognome Bianchi*.

{{</column/col>}}
{{<column/col>}}

{{<table>}}
| first_name | last_name |
|------------|-----------|
| Raimondo   | Bianchi   |
| Edoardo    | Conte     |
| Mario      | Bianchi   |
| ...        | ...       |
{{</table>}}

{{<table>}}
| last_name |
|-----------|
| Bianchi   |
| Conte     |
| Bianchi   |
| Rossi     |
| Rossi     |
| Verdi     |
| Rossi     |
| Visconti  |
| Sciascia  |
{{</table>}}

{{</column/col>}}
{{</column/columns>}}

{{<important>}}
Il risultato di una qualsiasi query SQL (quindi anche `SELECT ...`) è sempre una tabella (relazione). Anche nel caso in cui si abbia come risultato un singolo valore, questo sarà una riga di una tabella con una sola colonna. Quest rende possibile *query nidificate* (*nested query*) in cui il risultato di una query è utilizzato all'interno di un'altra query.
{{</important>}}

### L'utilizzo di `*`

Nella lista di colonne è possibile utilizzare l'asterisco (*star*) `*` per indicare che si vogliono selezionare tutte le colonne della tabella. Questa possibilità strana dal momento che la seguente query

```sql
SELECT *
FROM Student;
```

produce esattamente la tabella `Student`. Tuttavia sarà utile `*` quando l'unico scopo della query sarà selezionare alcune righe utilizzando la clausola `WHERE` che verrà discussa in una [lezione successiva]({{<ref "02-where-order-by.md">}})

### Utilizzo di più tabelle
È possibile indicare una lista di tabelle nella clausola `FROM`, in questo caso viene creata una tabella unica risultante dal *prodotto cartesiano* di tutte le tabelle. Vediamo in un caso molto semplice cosa significa il prodotto cartesiano tra due tabelle.

{{<column/columns>}}
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

Nell'ambito dei database relazionali, il prodotto cartesiano tra tabelle non è un'operazione significativa, ad esempio nel prodotto `Student` \\(\times\\) `Class`, cosa indica nella realtà la tupla `(Bob,2A,1A,101)`? Il prodotto cartesiano, tuttavia, è il punto di partenza dell'operazione [join]({{<ref "03-sql-join.md">}}) che è fondamentale quando si opera con database relazionali.

## Alias

### Alias su tabelle

È possibile assegnare alias alle colonne o alle tabelle per renderle più leggibili o per abbreviare i nomi lunghi. Ad esempio, possiamo assegnare un alias "S" alla tabella Student e un alias "T" alla tabella Teacher in questo modo:

```sql
SELECT S.first_name, T.last_name
FROM Student AS S, Teacher AS T;
```

Questo rende la query più comprensibile e facile da leggere.

### Alias su colonne

Gli alias su colonne consentono di assegnare nomi alternativi alle colonne di output nella query. Questo può essere utile per rendere più chiari e significativi i risultati o per abbreviare nomi lunghi di colonne. Gli alias vengono definiti nella clausola `SELECT` e vengono utilizzati per rinominare temporaneamente le colonne nella query.

```sql
SELECT first_name AS First, last_name AS Last
FROM Student;
```

In questo esempio, stiamo assegnando gli alias `First` e `Last` alle colonne `first_name` e `last_name` nella tabella `Student`. Il risultato della query includerà colonne con questi alias anziché i nomi originali delle colonne, rendendo i risultati più leggibili e comprensibili.

Ovviamente è possibile combinare alias per tabelle e per colonne

```sql
SELECT S.last_name AS StudentLast, T.last_name AS TeacherLast
FROM Student AS S, Teacher AS T;
```

## Esempi

Vediamo ora alcuni esempi di query `SELECT ... FROM ...`

1. Selezionare cognome e data di nascita degli studenti
```sql
SELECT last_name AS Cognome, birth_date AS
FROM Student;
```
2. Selezionare nome, indirizzo e email di studenti
```sql
SELECT first_name, home_address, email
FROM Student;
```
3. Selezionare cognome e indirizzo email di studenti utilizzando come nomi di colonne `Surname`, `Contact`
```sql
SELECT last_name AS Surname, email AS Contact
FROM Student;
```

## Domande e Esercizi

### Domande
1. Indica in quali casi può essere utile utilizzare l'alias per le tabelle.
2. Indica in quali casi può essere utile utilizzare l'alias per le colonne.
3. Nell'esempio del prodotto cartesiano, quali righe ti sembra abbiano senso? Perché?.
4. Nell'esempio sopra con cognomi duplicati, quale sarebbe il risultato se SQL fornisse un insieme?

### Esercizi
Per i seguenti esercizi si consideri la seguente tabella `Teacher`

{{<table>}}
| teacher_id | first_name | last_name | birth_date  | hire_date  | email              | phone_number |
|------------|------------|-----------|-------------|------------|--------------------|--------------|
| 1          | Luca       | Galli     | 1980-03-15  | 2005-07-20 | luca@example.com   | 123-456-789  |
| 2          | Laura      | Ferrari   | 1975-09-28  | 2010-02-12 | laura@example.com  | 987-654-321  |
| 3          | Marco      | Bianchi   | 1990-12-10  | 2015-11-30 | marco@example.com  | 111-222-333  |
| 4          | Anna       | Russo     | 1985-06-03  | 2008-08-05 | anna@example.com   | 555-888-777  |
| 5          | Giuseppe   | Conti     | 1992-11-22  | 2017-04-15 | giuseppe@example.com | 777-333-111  |
{{</table>}}

1. Selezionare nome, cognome e data di assunzione di ogni insegnante.
2. Selezionare cognome, email e numero di telefono di ogni insegnante, indicando i nome delle colonne in italiano.
3. Selezionare identificativo e email degli insegnanti.

