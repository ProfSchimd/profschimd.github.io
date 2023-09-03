---
title: "Le istruzioni UPDATE, DELETE"
running_title: UPDATE e DELETE
type: lecture
weight: 300
summary: "Quest lezione presenta le istruzioni UPDATE e DELETE del linguaggio SQL. UPDATE permette di modificare il valore di attributi in tuple esistenti. DELETE permette di cancellare tuple che soddisfano ad una certa condizione."
---

## `UPDATE`





Supponiamo che vogliamo aggiornare l'indirizzo email di uno studente specifico, ad esempio, il cui `student_id` è 3. L'istruzione SQL `UPDATE` ci consente di fare ciò:

```sql
UPDATE Student
SET email = 'nuova_email@example.com'
WHERE student_id = 3;
```

Dopo l'esecuzione di questa istruzione, l'indirizzo email dello studente con `student_id` 3 sarà cambiato in 'nuova_email@example.com'. La tabella `Student` risultante avrà l'aspetto seguente:

{{<table>}}
| student_id | first_name | last_name | birth_date | registration_date       | home_address    | email                |
|------------|------------|-----------|------------|--------------------------|-----------------|----------------------|
| 1          | Raimondo   | Bianchi   | 2004-01-01 | 2023-02-17 09:00:00     | 123 Main St     | raimondo@example.com |
| 2          | Edoardo    | Conte     | 2004-08-19 | 2023-02-17 09:30:00     | 456 Elm St      | edoardo@example.com  |
| 3          | Mario      | Bianchi   | 2008-05-10 | 2023-02-17 10:00:00     | 789 Oak St      | **nuova_email@example.com** `<-` |
| 4          | Alice      | Rossi     | 2003-02-20 | 2023-02-17 10:30:00     | 101 Maple St    | alice@example.com   |
| 5          | Mario      | Rossi     | 2007-10-31 | 2023-02-17 11:00:00     | 202 Cedar St    | mario2@example.com  |
| 6          | Barbara    | Verdi     | 2007-04-01 | 2023-02-17 11:30:00     | 303 Pine St     | barbara@example.com |
| 7          | Carlo      | Rossi     | 2006-10-31 | 2023-02-17 12:00:00     | 404 Birch St    | carlo@example.com   |
| 8          | Davide     | Visconti  | 2004-06-22 | 2023-02-17 12:30:00     | 505 Redwood St  | davide@example.com  |
| 9          | Michela    | Sciascia  | 2006-02-22 | 2023-02-17 13:00:00     | 606 Cedar St    | michela@example.com |
{{</table>}}

## `DELETE`

Supponiamo ora che vogliamo eliminare uno studente specifico dalla tabella `Student`, ad esempio, quello con `student_id` 5. L'istruzione SQL `DELETE` ci consente di farlo:

```sql
DELETE FROM Student
WHERE student_id = 5;
```

Dopo l'esecuzione di questa istruzione, lo studente con `student_id` 5 sarà rimosso dalla tabella `Student`. La tabella risultante avrà l'aspetto seguente:

{{<table>}}
| student_id | first_name | last_name | birth_date | registration_date       | home_address    | email                |
|------------|------------|-----------|------------|--------------------------|-----------------|----------------------|
| 1          | Raimondo   | Bianchi   | 2004-01-01 | 2023-02-17 09:00:00     | 123 Main St     | raimondo@example.com |
| 2          | Edoardo    | Conte     | 2004-08-19 | 2023-02-17 09:30:00     | 456 Elm St      | edoardo@example.com  |
| 3          | Mario      | Bianchi   | 2008-05-10 | 2023-02-17 10:00:00     | 789 Oak St      | nuova_email@example.com |
| 4          | Alice      | Rossi     | 2003-02-20 | 2023-02-17 10:30:00     | 101 Maple St    | alice@example.com   |
| 6          | Barbara    | Verdi     | 2007-04-01 | 2023-02-17 11:30:00     | 303 Pine St     | barbara@example.com |
| 7          | Carlo      | Rossi     | 2006-10-31 | 2023-02-17 12:00:00     | 404 Birch St    | carlo@example.com   |
| 8          | Davide     | Visconti  | 2004-06-22 | 2023-02-17 12:30:00     | 505 Redwood St  | davide@example.com  |
| 9          | Michela    | Sciascia  | 2006-02-22 | 2023-02-17 13:00:00     | 606 Cedar St    | michela@example.com |
{{</table>}}

Questi sono esempi di come le istruzioni `UPDATE` e `DELETE` possono essere utilizzate per modificare o eliminare dati da una tabella SQL esistente.

{{<attention>}}
Quando un'istruzione `UPDATE` o `DELETE` viene eseguita su un database e non trova alcun record che soddisfi la condizione specificata, la query verrà comunque eseguita senza causare errori, ma non avrà alcun effetto sui dati del database.
{{</attention>}}

### Cancellazione e update multipli

Quando la condizione in un'istruzione `UPDATE` o `DELETE` individua più di un record, l'operazione verrà eseguita su tutti i record che soddisfano la condizione. Ad esempio, se vogliamo aggiornare o eliminare tutti i record degli studenti con il cognome "Bianchi" nella tabella Student, verranno interessati tutti i record con questo cognome.

Ecco un esempio di query SQL per l'istruzione `DELETE` con la condizione `last_name='Bianchi'` nella tabella Student:

```sql
DELETE FROM Student
WHERE last_name='Bianchi';
```

Dopo l'esecuzione di questa query, i record degli studenti con il cognome "Bianchi" saranno eliminati dalla tabella Student. Di seguito viene mostrata la tabella risultante senza i record che soddisfano la condizione:

{{<table>}}
| student_id | first_name | last_name | birth_date | registration_date       | home_address     | email                |
|------------|------------|-----------|------------|--------------------------|------------------|----------------------|
| 2          | Edoardo    | Conte     | 2004-08-19 | 2023-02-17 09:30:00     | 456 Elm St       | edoardo@example.com  |
| 4          | Alice      | Rossi     | 2003-02-20 | 2023-02-17 10:30:00     | 101 Maple St     | alice@example.com    |
| 5          | Mario      | Rossi     | 2007-10-31 | 2023-02-17 11:00:00     | 202 Cedar St     | mario2@example.com   |
| 6          | Barbara    | Verdi     | 2007-04-01 | 2023-02-17 11:30:00     | 303 Pine St      | barbara@example.com  |
| 7          | Carlo      | Rossi     | 2006-10-31 | 2023-02-17 12:00:00     | 404 Birch St     | carlo@example.com    |
| 8          | Davide     | Visconti  | 2004-06-22 | 2023-02-17 12:30:00     | 505 Redwood St   | davide@example.com   |
| 9          | Michela    | Sciascia  | 2006-02-22 | 2023-02-17 13:00:00     | 606 Cedar St     | michela@example.com |
{{</table>}}

Come mostrato sopra, i record degli studenti con il cognome "Bianchi" sono stati eliminati dalla tabella `Student`, e sono rimasti solo i record che non soddisfano la condizione.
