---
title: "L'istruzione INSERT"
running_title: INSERT
type: lecture
weight: 200
summary: "Quest lezione presenta l'istruzione INSERT del linguaggio SQL. Viene discusso il suo utilizzo inserire tuple di relazioni definite con il comando CREATE."
---

## `INSERT INTO`

Dopo aver creato una o più tabelle, queste vanno riempite con tuple, a tale scopo si usa l'istruzione `INSERT INTO` di SQL. Esistono due possibile sintassi per `INSERT INTO`:
* indicando tutti i valori degli attributi e
* indicando solo alcuni dei valori degli attributi.

### Formato contratto e completo
Per inserire uno o più tuple in una tabella, si può elencare tra parentesi tonde la lista dei valori per ogni attributo **nello stesso ordine in cui sono stati dichiarati nella `CREATE`**.

Ad esempio per inserire alcuni record nella tabella `Student` utilizziamo `INSERT INTO` nel seguente modo.

```sql
INSERT INTO VALUES
    (1, 'Raimondo', 'Bianchi', '2004-01-01', '2023-02-17 09:00:00', '123 Main St', 'raimondo@example.com'),
    (2, 'Edoardo', 'Conte', '2004-08-19', '2023-02-17 09:30:00', '456 Elm St', 'edoardo@example.com'),
    (3, 'Mario', 'Bianchi', '2008-05-10', '2023-02-17 10:00:00', '789 Oak St', 'mario@example.com'),
    (4, 'Alice', 'Rossi', '2003-02-20', '2023-02-17 10:30:00', '101 Maple St', 'alice@example.com'),
    (5, 'Mario', 'Rossi', '2007-10-31', '2023-02-17 11:00:00', '202 Cedar St', 'mario2@example.com'),
    (6, 'Barbara', 'Verdi', '2007-04-01', '2023-02-17 11:30:00', '303 Pine St', 'barbara@example.com'),
    (7, 'Carlo', 'Rossi', '2006-10-31', '2023-02-17 12:00:00', '404 Birch St', 'carlo@example.com'),
    (8, 'Davide', 'Visconti', '2004-06-22', '2023-02-17 12:30:00', '505 Redwood St', 'davide@example.com'),
    (9, 'Michela', 'Sciascia', '2006-02-22', '2023-02-17 13:00:00', '606 Cedar St', 'michela@example.com');

```

La tabella risultate

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

### Formato esteso e parziale
Supponiamo ora di aver creato la tabella `Student` nel seguente modo.

```sql
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255), NOT NULL
    birth_date DATE NOT NULL,
    registration_date DATETIME DEFAULT '2023-01-01 00:00:00',
    home_address TEXT,
    email VARCHAR(100) NOT NULL UNIQUE
);
```

L'attributo `registration_date` ha un valore di default (discutibile!) per cui potrei evitare di indicarlo in fase di inserimento. Posso evitare di indicare anche `home_address` poiché non è stato indicato con `NOT NULL` e di conseguenza ha `NULL` come valore di default. Tuttavia `email` va indicato perché è segnato come `NOT NULL` e non ha alcun valore di default. 

Per indicare solo parte degli attributi a cui assegnare un valore, devo elencare nell'istruzione `INSERT INTO` quali attributi intendo indicare fornendone il nome. Ecco un esempio in cui sono stti omessi i valori per `registration_date` e `home_address`.

```sql
INSERT INTO Student (student_id, first_name, last_name, birth_date, email)
VALUES
    (1, 'Raimondo', 'Bianchi', '2004-01-01', 'raimondo@example.com'),
    (2, 'Edoardo', 'Conte', '2004-08-19', 'edoardo@example.com'),
    (3, 'Mario', 'Bianchi', '2008-05-10', 'mario@example.com'),
    (4, 'Alice', 'Rossi', '2003-02-20', 'alice@example.com'),
    (5, 'Mario', 'Rossi', '2007-10-31', 'mario2@example.com'),
    (6, 'Barbara', 'Verdi', '2007-04-01', 'barbara@example.com'),
    (7, 'Carlo', 'Rossi', '2006-10-31', 'carlo@example.com'),
    (8, 'Davide', 'Visconti', '2004-06-22', 'davide@example.com'),
    (9, 'Michela', 'Sciascia', '2006-02-22', 'michela@example.com');
```

La risultante tabella sarà la seguente.

{{<table>}}
| student_id | first_name | last_name | birth_date | registration_date         | home_address       | email               |
|------------|------------|-----------|------------|---------------------------|---------------------|---------------------|
| 1          | Raimondo   | Bianchi   | 2004-01-01 | 2023-01-01 00:00:00      | NULL                | raimondo@example.com |
| 2          | Edoardo    | Conte     | 2004-08-19 | 2023-01-01 00:00:00      | NULL                | edoardo@example.com  |
| 3          | Mario      | Bianchi   | 2008-05-10 | 2023-01-01 00:00:00      | NULL                | mario@example.com    |
| 4          | Alice      | Rossi     | 2003-02-20 | 2023-01-01 00:00:00      | NULL                | alice@example.com    |
| 5          | Mario      | Rossi     | 2007-10-31 | 2023-01-01 00:00:00      | NULL                | mario2@example.com   |
| 6          | Barbara    | Verdi     | 2007-04-01 | 2023-01-01 00:00:00      | NULL                | barbara@example.com  |
| 7          | Carlo      | Rossi     | 2006-10-31 | 2023-01-01 00:00:00      | NULL                | carlo@example.com    |
| 8          | Davide     | Visconti  | 2004-06-22 | 2023-01-01 00:00:00      | NULL                | davide@example.com   |
| 9          | Michela    | Sciascia  | 2006-02-22 | 2023-01-01 00:00:00      | NULL                | michela@example.com  |

{{</table>}}

{{<attention>}}
Se si prova a creare un'istruzione `INSERT INTO` omettendo attributi che non hanno valore di default e che sono segnati `NOT NULL`, verrà generato un errore e l'operazione di inserimento non andrà a buon fine.
{{</attention>}}

## Domande e Esercizi

{{<exercise title="Gestione di un magazzino">}}
* Utilizzando lo schema creato nell'[esercizio alla fine della lezione precedente]({{<ref "01-ddl-create.md#domande-ed-esercizi">}}) scrivere l'istruzione `INSERT INTO` in modo che ogni tabella abbia almeno quattro tuple.
* Utilizzare sia la versione completa che la versione parziale di `INSERT INTO` modificando lo schema inserendo vincoli `NOT NULL` dove opportuno e fornendo per gli attributi pertinenti dei valori di default.
{{</exercise>}}