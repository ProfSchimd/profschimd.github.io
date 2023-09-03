---
title: "Le istruzioni ALTER e DROP"
running_title: ALTER e DROP
type: lecture
weight: 400
summary: "Quest lezione presenta le istruzioni ALTER e DROP. ALTER permette di modificare lo schema di una relazione. DROP permette di eliminare completamente una relazione o un intero schema."
---

## `ALTER`

L'istruzione `ALTER` in SQL viene utilizzata per modificare lo schema di una tabella esistente. È possibile aggiungere, modificare o eliminare colonne esistenti, nonché aggiungere vincoli, chiavi primarie o chiavi esterne. Ecco un esempio di come utilizzare l'istruzione ALTER per aggiungere una nuova colonna `age` alla tabella Student:

### Aggiunta
Per l'aggiunta di una colonna si usa `ADD ` indicando la colonna da aggiungere mediante la stessa sintassi usata in [`CREATE TABLE`]({{<ref "01-ddl-create.md">}})

```sql
ALTER TABLE Student
ADD class_id INT;
```
In questo esempio, stiamo aggiungendo una nuova colonna di tipo INT chiamata `class_id` alla tabella `Student`.

## `ALTER`

L'istruzione `ALTER` in SQL viene utilizzata per modificare lo schema di una tabella esistente. È possibile aggiungere, modificare o eliminare colonne esistenti, nonché aggiungere vincoli, chiavi primarie o chiavi esterne. Ecco un esempio di come utilizzare l'istruzione ALTER per aggiungere una nuova colonna `age` alla tabella Student:

### Modifica

Per la modifica di una colonna esistente, è possibile utilizzare l'istruzione `ALTER TABLE` seguita dal nome della colonna da modificare, seguita da `ALTER COLUMN` e le nuove specifiche della colonna. Ad esempio, se vogliamo modificare la lunghezza massima della colonna `first_name` da 255 a 50 caratteri, possiamo farlo in questo modo:

```sql
ALTER TABLE Student
ALTER COLUMN first_name VARCHAR(50);
```

Se si vuole cambiare il nome di una colonna bisogna usare `RENAME COLUMN`

```sql
ALTER TABLE Student
RENAME COLUMN last_name TO second_name;
```

### Eliminazione

Per eliminare una colonna da una tabella, è possibile utilizzare l'istruzione `ALTER TABLE` seguita dal nome della colonna da eliminare, seguita da `DROP COLUMN`. Ad esempio, se vogliamo eliminare la colonna `home_address` dalla tabella `Student`, possiamo farlo in questo modo:

```sql
ALTER TABLE Student
DROP COLUMN home_address;
```

Ricorda che l'eliminazione di una colonna comporterà la perdita di tutti i dati contenuti in quella colonna. Assicurati di eseguire questa operazione con cautela e di eseguire il backup dei dati importanti prima di procedere.


## `DROP`


L'istruzione DROP in SQL viene utilizzata per eliminare una tabella, un database o altri oggetti del database. Ecco un esempio di come utilizzare l'istruzione DROP per eliminare la tabella Student:

```sql
DROP TABLE Student;
```

Questa istruzione eliminerà completamente la tabella Student dal database, inclusi tutti i suoi dati e la sua struttura.

{{<attention>}}
I dettagli delle istruzioni sopra elencate, specialmente `ALTER TABLE`, variano nei diversi DBMS. È fondamentale **consultare sempre il manuale del DBMS che si sta utilizzando** per essere certi che si utilizzi la corretta sintassi.
{{</attention>}}

#### Chiavi Esterne e DROP

Quando si elimina una tabella che ha chiavi esterne da altre tabelle, è importante considerare cosa accade alle chiavi esterne. In genere, un database SQL gestisce automaticamente le chiavi esterne in modo che non si verifichino riferimenti a record inesistenti. Pertanto, quando si elimina una tabella, il database gestirà anche le chiavi esterne in modo da mantenere l'integrità referenziale dei dati. 

Ciò può comportare la cancellazione dei record correlati nelle tabelle collegate o il loro aggiornamento in base alle regole di eliminazione definite. Ad esempio, se la tabella `Student` ha una chiave esterna in una tabella `Enrollment` e si elimina la tabella `Student`, il database può automaticamente cancellare tutti i record di `Enrollment` che fanno riferimento a studenti che sono stati eliminati. Questo comportamento può variare a seconda del database e delle [regole di eliminazione definite]({{<ref "01-ddl-create.md#vincoli-di-integrità-referenziale">}}).