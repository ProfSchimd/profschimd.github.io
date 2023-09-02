---
title: "L'istruzione CREATE"
running_title: CREATE
type: lecture
weight: 100
summary: "Questa lezione presenta l'istruzione CREATE del linguaggio SQL. Viene discusso il suo utilizzo per creare relazioni e per creare schemi."
---

Per creare tabelle SQL fornisce l'istruzione `CREATE TABLE`. Nel momento in cui si crea una tabella, si devono definire i suoi attributi per ognuno dei quali è necessario indicare un *tipo*. Vanno inoltre definite la chiave primaria e le eventuali chiavi esterne e vanno infine indicati eventuali vincoli di dominio.

## `CREATE TABLE`

Nella forma più semplice, nell'istruzione `CREATE TABLE` si indicano:
* *nome* della tabella e
* *lista* dei *nomi* e *tipo* delle colonne.

```sql
CREATE TABLE Student(
    id INT,
    first_name VARCHAR(255),
    second_name VARCHAR(255)
    birth_date DATE
);
```

L'esempio crea una tabella di nome `Student` con 4 colonne: 2 stringhe di lunghezza massima 255, una intera ed una indicante una data.

{{<attention>}}
Un'istruzione SQL termina sempre con il punto e virgola `;`. Può accadere che una singola istruzione senza punto e virgola venga accettata, ma nel caso (frequente) in cui si debbano eseguire più istruzioni una di seguito all'altra il punto e virgola diventa necessario.
{{</attention>}}

Normalmente i DBMS rifiutano, generando un errore, la creazione di una tabella con lo stesso nome di una tabella già esistente nel database. In certi casi, vogliamo che il DBMS crei la tabella se non esista, ma che non faccia nulla se è già presente (anziché generare un errore). SQL prevede una variante per questo scopo.

```sql
CREATE TABLE IF NOT EXISTS Student(
    ...
);
```

### Tipi di dati SQL
Ogni attributo di una relazione deve avere un tipo ed un dominio associato, in SQL sono disponibili numerosi tipi (ben più di quelli che discuteremo qui) ad ognuno dei quali è associato un dominio. Inoltre il dominio può essere ristretto inserendo vincoli sui [valori](#vincoli-di-dominio) ammessi.

#### Tipi numerici

* `INT`: Questo tipo di dati rappresenta numeri interi, ovvero numeri senza parte frazionaria. Può essere utilizzato per memorizzare valori come 1, 10, -5, ecc.

* `DECIMAL`: Il tipo di dati `DECIMAL`, noto anche come `NUMERIC`, è utilizzato per memorizzare numeri decimali con una precisione e una scala specificate. È adatto per rappresentare valori monetari o altre quantità precise.

#### Tipi stringa

* `CHAR(M)`: Il tipo di dati `CHAR` rappresenta una stringa di lunghezza fissa di `M` caratteri. La stringa viene spesso riempita con spazi bianchi per raggiungere la lunghezza specificata.

* `VARCHAR(M)`: Il tipo di dati `VARCHAR` rappresenta una stringa di lunghezza variabile con una lunghezza massima di `M` caratteri. Non riempie la stringa con spazi bianchi inutili, quindi è più efficiente per le stringhe più corte.

* `TEXT(M)`: Il tipo di dati `TEXT` rappresenta una stringa di lunghezza variabile con una lunghezza massima opzionale di `M` caratteri. È adatto per memorizzare testi lunghi, come descrizioni o note.

* `DATE`: Il tipo di dati `DATE` rappresenta una data, inclusi giorno, mese e anno.

* `TIME`: Il tipo di dati `TIME` rappresenta un orario del giorno, inclusi ore, minuti, secondi e frazioni di secondo.

* `DATETIME`: Il tipo di dati `DATETIME` rappresenta una combinazione di data e orario, inclusi giorno, mese, anno, ore, minuti, secondi e frazioni di secondo.

#### Tipi *Large Object*

* `BLOB`: Il tipo di dati `BLOB`, che sta per "Binary Large Object," è utilizzato per memorizzare dati binari di grandi dimensioni, come immagini, file audio o file binari. È adatto per contenuti non testuali e offre una capacità di memorizzazione estesa.

Vediamo un esempio di utilizzo di alcuni dei tipi sopra elencati. Riprendiamo la tabella `Student` definita sopra, aggiungendo alcuni campi e creano anche una tabella `Teacher`.

```sql
-- Definizione della tabella Student
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birth_date DATE,
    registration_date DATETIME,
    home_address TEXT,
    email VARCHAR(100)
);

-- Definizione della tabella Teacher
CREATE TABLE Teacher (
    teacher_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birth_date DATE,
    hire_date DATE,
    email VARCHAR(100),
    phone_number VARCHAR(15)
);

```

{{<important>}}
Oltre ai tipi previsti dallo standard SQL, ogni DBMS [qui][2] si trova, ad esempio, la lista (non completa) dei tipi definiti in [MySQL][3], [qui][4] la lista relativa al DBMS MariaDB (MariaDB è un progetto *open source* nato da MySQL dopo che questo è stato acquisito da Oracle).
{{</important>}}

### Chiavi

#### Chiave primaria

Nell'esempio presentato sopra sono stati definiti di attributi (uno per tabella) come `PRIMARY KEY`, in SQL è previsto che ogni tabella creata abbia una chive primaria che, nel caso in cui si tratti di un singolo attributo, può essere indicata dopo la dichiarazione del tipo.

Quando la chiave primaria è formata da più attributi, non è possibile utilizzare la stessa sintassi, in altre parole **la seguente istruzione SQL non è valida**

```sql
CREATE TABLE ClassTeacher (
    class_id INT PRIMARY KEY,
    teacher_id INT PRIMARY KEY,
    ...
)
```

Per indicare una chiave primaria con più attributi la si dichiara dopo aver elencato tutti gli attributi

```sql
CREATE TABLE ClassTeacher (
    teacher_id INT,
    class_id INT,
    PRIMARY KEY (teacher_id, class_id),
    ...
);
```

#### Chiave esterna

Nell'esempio sopra, la tabella `ClassTeacher` mette in collegamento insegnanti e classi in cui questi insegna. Si è visto che in un database relazione questo collegamento avviene mediante *chiavi esterne*. In SQL è possibile dichiarare le chiavi esterne indicando quale/i attributo/i sono chiavi esterne e a che attributo si riferiscono.

Per l'esempio sopra avremo quindi (ipotizzando di avere una tabelle `Class`)

```sql
CREATE TABLE ClassTeacher (
    teacher_id INT,
    class_id INT,
    year VARCHAR(4),
    PRIMARY KEY (teacher_id, class_id),
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id),
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

```

### Vincoli di dominio
Un vincolo di dominio è una regola che specifica il tipo di dati o il range di valori che un attributo può contenere. Questo vincolo definisce le restrizioni sui valori che possono essere inseriti in un attributo. Ad esempio, è possibile definire un vincolo di dominio che limita un attributo a contenere solo valori interi positivi o stringhe di lunghezza massima di 50 caratteri.

I vincoli di dominio sono utili per garantire l'integrità dei dati nel database e per evitare l'inserimento di dati non validi.

Ecco un esempio di come definire un vincolo di dominio in SQL:

```sql
CREATE TABLE Class (
    class_id INT PRIMARY KEY,
    level INT CHECK (level >= 1 AND level <= 5)
    section VARCHAR(8) NOT NULL,
    location VARCHAR(16),
);

```


## `CREATE SCHEMA`

L'istruzione `CREATE SCHEMA` viene utilizzata per creare uno schema nel database. Uno schema è un contenitore logico che può contenere tabelle, viste, procedure, funzioni e altri oggetti del database. Gli schemi vengono utilizzati per organizzare e separare gli oggetti del database in gruppi logici.

Ecco un esempio di come utilizzare l'istruzione `CREATE SCHEMA`:

```sql
CREATE SCHEMA my_schema;
```

## Riferimenti
* [`CREATE TABLE` (W3School)][1]
* [Tipi dati (W3School)][2]

[1]: https://www.w3schools.com/sql/sql_create_table.asp
[2]: https://www.w3schools.com/sql/sql_datatypes.asp
[3]: https://www.mysql.com/it/
[4]: https://mariadb.com/kb/en/data-types/