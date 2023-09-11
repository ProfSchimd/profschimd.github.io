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
Oltre ai tipi previsti dallo standard SQL, ogni DBMS [qui](https://www.w3schools.com/sql/sql_datatypes.asp) si trova, ad esempio, la lista (non completa) dei tipi definiti in [MySQL][3], [qui][4] la lista relativa al DBMS MariaDB (MariaDB è un progetto *open source* nato da MySQL dopo che questo è stato acquisito da Oracle).
{{</important>}}

#### `AUTO INCREMENT`
Spesso si creano chiavi primarie sotto forma di valori interi, in molti DBMS (ad esempio MariaDB) è possibile indicare che un attributo intero deve assumere valori consecutivi e distinti, `AUTO_INCREMENT` permette di fare questo. Nell'esempio sotto, le chiavi `student_id` e `teacher_id` avranno valori interi via via crescenti: `1,2,3,...`.


```sql
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    -- ...
);

CREATE TABLE Teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    -- ...
);
```

{{<important>}}
Il supporto di `AUTO_INCREMENT` non è uguale in tutti i DBMS, inoltre il comportamento può risultare non ovvio in certe situazioni. Per questo motivo è sempre opportuno consultare la documentazione del DBMS in uso. Ad esempio [qui](https://mariadb.com/kb/en/auto_increment/) si trova la documentazione di `AUTO_INCREMENT` per il DBMS MariaDB.
{{</important>}}

{{<attention>}}
In SQLite è scoraggiato l'uso di `AUTO_INCREMENT` (la cui sintassi corretta à `AUTOINCREMENT` senza underscore `_`) per motivi di efficienza. SQLite assegna automaticamente un identificativo (chiamato `ROWID`) ad ogni riga delle tabelle. Se la tabella contiene un `INT PRIMARY KEY` **senza `AUTOINCREMENT`**, allora SQLite, automaticamente, utilizza l'identificativo di riga per la chiave.

```sql
CREATE TABLE Student (
    -- Errore (non segnalato da DB Browser!)
    student_id INT AUTO_INCREMENT PRIMARY KEY,

    -- Ok, ma non usa ROWID
    student_id INT AUTOINCREMENT PRIMARY KEY,
    
    -- Ok, usa ROWID come chiave primaria (scelta da preferire)
    student_id INT PRIMARY KEY,
);
```
{{</attention>}}


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

#### `NUT NULL` e `UNIQUE`
Esistono due vincoli di dominio che possono essere espressi in SQL:
* `NOT NULL` impone che un attributo non possa avere il valore `NULL` (non indicando questo vincolo, i valori `NULL` sono ammessi di default).
* `UNIQUE` impone che i valori per un attributo siano unici nella relazione. In altre parole non possono esistere due tuple con lo stesso valore di attributi che sono identificati con `UNIQUE`.

Possiamo, ad esempio, modificare la definizione della tabella `Teacher` nel seguente modo
```sql
CREATE TABLE Teacher (
    teacher_id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birth_date DATE,
    hire_date DATE,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE
);
```

Notiamo che `UNIQUE` e `NOT NULL` possono essere usati insieme, infatti il vincolo di `UNIQUE` non si applica ai valori `NULL` (possono esistere più tuple con valore `NULL` per un attributo `UNIQUE`).

Dall'esempio capiamo che per una tuple di `Teacher` devono essere specificati (`NOT NULL`) nome, cognome e email. Inoltre l'email deve essere unica (quindi l'email potrebbe essere utilizzata come chiave primaria in quanto chiave candidata)

{{<observe>}}
La chiave primaria deve per definizione essere `UNIQUE`, infatti non possono esistere due tuple con la stessa chiave primaria. Inoltre la chiave primaria non può essere `NULL`. Nell'esempio sopra, tuttavia, non si è indicato `teacher_id` con `UNIQUE` nè con `NOT NULL` questo perché `PRIMARY KEY`, per quanto appena detto, implica entrambi questi vincoli. In generala in una relazione ogni *chiave candidata* soddisfa i vincoli `UNIQUE` e `NOT NULL`.
{{</observe>}}

È possibile esprimere il vincolo `UNIQUE` su una combinazione di attributi. Ad esempio per essere sicuri che nella relazione `Class` esista un'unica tupla per ogni classe possiamo aggiungere il seguente vincolo

```sql
CREATE TABLE Class (
    -- Come sopra
    UNIQUE(level, section);
);
```

Ad esempio `level=1` e `section=A` può esistere una sola volta nella relazione, tuttavia può esistere anche una tupla con `level=1` e `section=B`, come anche la tupla con `level=2` e `section=A`. Notare che se noi avessimo usato la seguente sintassi:

```sql
CREATE TABLE Class (
    -- ...
    level INT UNIQUE CHECK (level >= 1 AND level <= 5)
    section UNIQUE VARCHAR(8) NOT NULL,
    -- ...
);
```

solo una tupla potrebbe avere `level=1` e solo una tupla potrebbe avere `section=A`.

### Valore di default
La parola chiave `DEFAULT` in SQL è utilizzata per assegnare un valore predefinito a una colonna quando un nuovo record viene inserito nella tabella e nessun valore specifico è fornito per quella colonna. In altre parole, se non si specifica un valore per la colonna durante un'operazione di `INSERT`, il valore predefinito specificato con `DEFAULT` verrà utilizzato automaticamente.

```sql
CREATE TABLE Class (
    class_id INT PRIMARY KEY,
    level INT DEFAULT 1 CHECK (level >= 1 AND level <= 5),
    section VARCHAR(8) DEFAULT 'A' NOT NULL,
    location VARCHAR(16)
);
```

Quando un attributo non è dichiarato `NOT NULL` e non viene specificato un valore con `DEFAULT`, le tuple che non specificano il valore dell'attributo in fase di inserimento prendono il valore `NULL`.

### Vincoli di integrità referenziale
L'opzione `ON DELETE` nelle chiavi esterne di SQL è utilizzata per specificare il comportamento desiderato quando viene eliminata una riga nella tabella *padre* (riferita dalla chiave esterna). Ci sono diverse strategie previste le più importanti sono:

- `ON DELETE CASCADE`: Quando una tupla nella tabella riferita, tutte le tuple che la riferiscono vengono automaticamente eliminate. Questa opzione garantisce che non ci siano record orfani.

- `ON DELETE SET NULL`: Quando una tupla nella tabella riferita, il valore nella colonna corrispondente della tabella figlio viene impostato su `NULL`. Questa opzione può essere utile quando si desidera consentire record orfani, ma si vuole mantenere la coerenza dei dati, ovviamente non è possibile utilizzare questa opzione se la chiave esterna è definita `NOT NULL`.

- `ON DELETE RESTRICT`: Questa opzione impedisce l'eliminazione di una riga nella tabella padre se esistono record corrispondenti nella tabella figlio.


Nel caso della tabella `ClassTeacher`, se si utilizza `ON DELETE CASCADE` per la chiave esterna `teacher_id`, quando un insegnante viene eliminato dalla tabella `Teacher`, tutte le associazioni nella tabella `ClassTeacher` relative a quel professore verranno automaticamente eliminate, garantendo che non ci siano riferimenti orfani nella tabella `ClassTeacher`.

```sql
CREATE TABLE ClassTeacher (
    teacher_id INT,
    class_id INT,
    year VARCHAR(4),
    PRIMARY KEY (teacher_id, class_id),
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES Class(id) ON DELETE CASCADE
);
```

## `CREATE SCHEMA`

L'istruzione `CREATE SCHEMA` viene utilizzata per creare uno schema nel database. Uno schema è un contenitore logico che può contenere tabelle, viste, procedure, funzioni e altri oggetti del database. Gli schemi vengono utilizzati per organizzare e separare gli oggetti del database in gruppi logici.

Ecco un esempio di come utilizzare l'istruzione `CREATE SCHEMA`:

```sql
CREATE SCHEMA my_schema;
```

## Domande ed Esercizi


Rispondi alle seguenti domande motivando la risposta.

1. Quando si progetta una nuova tabella utilizzando l'istruzione CREATE TABLE, quali sono alcune delle considerazioni importanti da tenere a mente per definire gli attributi, le chiavi primarie e le chiavi esterne in modo efficace? Come queste decisioni possono influenzare le prestazioni e la struttura del database?
2. Durante la creazione di una tabella tramite CREATE TABLE, quali tipi di vincoli di dominio e restrizioni possono essere applicati agli attributi? In che modo l'uso di vincoli come NOT NULL, UNIQUE, CHECK e DEFAULT può contribuire a garantire l'integrità dei dati e prevenire errori nel database?

{{<exercise title="Gestione di un magazzino">}}

Devi creare una base di dati per la gestione di un magazzino. La base di dati dovrà contenere tre tabelle: `Product`, `Supplier`, e `Stock`. Ecco i requisiti per ciascuna tabella:

1. `Product`:
   - Attributi: `product_id` (INT), `name` (VARCHAR), `description` (TEXT), `price` (DECIMAL), `category` (VARCHAR).
   - `product_id` è la chiave primaria.
   - Il prezzo (`price`) deve essere un valore decimale positivo.
   - La categoria (`category`) rappresenta la categoria di appartenenza del prodotto.

2. `Supplier`:
   - Attributi: `supplier_id` (INT), `name` (VARCHAR), `contact_name` (VARCHAR), `email` (VARCHAR), `phone_number` (VARCHAR).
   - `supplier_id` è la chiave primaria.
   - L'indirizzo email (`email`) deve essere unico per ogni fornitore.
   - Il numero di telefono (`phone_number`) deve seguire un formato specifico.

3. `Stock`:
   - Attributi: `stock_id` (INT), `product_id` (INT), `supplier_id` (INT), `quantity` (INT), `purchase_date` (DATE).
   - `stock_id` è la chiave primaria.
   - `product_id` è una chiave esterna collegata alla tabella `Product`, indicando il prodotto in magazzino.
   - `supplier_id` è una chiave esterna collegata alla tabella `Supplier`, indicando il fornitore del prodotto in magazzino.
   - `quantity` rappresenta la quantità di prodotti disponibili in magazzino.
   - La data di acquisto (`purchase_date`) deve essere una data valida.

Scrivi l'istruzione SQL per creare queste tre tabelle, rispettando i requisiti e utilizzando `CREATE TABLE`.

{{</exercise>}}

## Riferimenti
* [`CREATE TABLE` (W3School)][1]
* [Tipi dati (W3School)][2]

[1]: https://www.w3schools.com/sql/sql_create_table.asp
[2]: https://www.w3schools.com/sql/sql_datatypes.asp
[3]: https://www.mysql.com/it/
[4]: https://mariadb.com/kb/en/data-types/
[5]: https://mariadb.com/kb/en/auto_increment/