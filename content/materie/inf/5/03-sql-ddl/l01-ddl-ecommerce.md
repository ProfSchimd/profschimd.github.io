---
title: "Laboratorio 1: DB per Commercio Elettronico in SQL"
running_title: "Lab 1: SQL e-commerce"
summary: "In questo laboratorio verrà creato e riempito un database per un sito di commercio elettronico utilizzando i costrutti SQL per Data Definition Language (DDL)."
type: lecture
weight: 1000
---

## Obiettivo
In questa lezione di laboratorio, gli studenti esploreranno e acquisiranno familiarità con diverse istruzioni *Data Definition Language* (DDL) del linguaggio SQL. Saranno discussi istruzioni per la creazione, modifica e gestione di tabelle. Verranno inoltre implementate nella base di dati vincoli di dominio e di integrità referenziale.

## Istruzioni
Nello svolgere il laboratorio si seguano le seguente linee guida.

* Tutte le istruzioni SQL create durante l'esercitazione vanno eseguite utilizzando un DBMS (ad esempio SQLite mediante DB Browser o MariaDB) verificando che ogni istruzione venga eseguita senza errori.

## 1 - Creazione delle Tabelle
Come primo passo vanno create le tabelle: `customer`, `invoice` e product

### 1.1 - Tabella `customer`
Per creare la tabella `customer`, dovresti definire gli attributi e i vincoli seguenti:

1. `id` (`INT`): Questo campo sarà la chiave primaria della tabella e deve essere generato automaticamente in modo incrementale.
2. `email` (`VARCHAR`): Questo campo obbligatorio rappresenta l'indirizzo email del cliente. Deve essere unico per ogni cliente.
3. `address` (`TEXT`): Questo campo contiene l'indirizzo fisico del cliente, è richiesto che ogni cliente imposti un indirizzo per la consegna.
4. `birth_date` (`DATE`): Questo campo rappresenta la data di nascita del cliente.
5. `avatar` (`BLOB`): Questo campo è utilizzato per archiviare l'immagine di profilo.
6. `last_login` (`DATETIME`): Questo campo rappresenta l'ultima data e ora in cui il cliente ha effettuato l'accesso. 

Assicurati di utilizzare la sintassi SQL corretta per creare la tabella `customer` con gli attributi e i vincoli sopra descritti.

### 1.2 - Tabella `product`
Per creare la tabella `product`, dovresti definire gli attributi e i vincoli seguenti:

1. `id` (`INT`): Questo campo sarà la chiave primaria della tabella e deve essere generato automaticamente in modo incrementale.
2. `name` (`VARCHAR`): Questo campo obbligatorio rappresenta il nome del prodotto e deve essere unico per ogni prodotto.
3. `description` (`TEXT`): Questo campo contiene una descrizione testuale del prodotto.
4. `price` (`DECIMAL`): Questo campo rappresenta il prezzo del prodotto e non può essere nullo.
5. `stock_quantity` (`INT`): Questo campo rappresenta la quantità di prodotti disponibili in magazzino e non può essere nullo.
6. `discount` (`DECIMAL`): Questo campo rappresenta la percentuale di sconto applicata al prodotto e deve essere compreso tra 0 (incluso) e 100 (escluso).
7. detail_page_url (`VARCHAR`): Questo campo contiene l'URL della pagina di dettaglio del prodotto.

Assicurati di utilizzare la sintassi SQL corretta per creare la tabella product con gli attributi e i vincoli sopra descritti.


### 1.3 - Tabella `invoice`
Per completare il database del nostro sistema di commercio elettronico, è necessario definire la tabella `invoice`, che conterrà informazioni sulle fatture emesse ai clienti. Segui le istruzioni seguenti per creare la tabella `invoice` con gli attributi e i vincoli necessari:

1. `id` (`INT`): Questo campo rappresenta l'identificativo unico di ogni fattura ed è una chiave primaria generata automaticamente in modo incrementale.
2. `issue_date` (`DATE`): Questo campo rappresenta la data di emissione della fattura ed è obbligatorio.
3. `total_amount` (`DECIMAL(10, 2)`): Questo campo indica l'importo totale della fattura e deve essere un numero decimale con un massimo di 10 cifre, di cui 2 decimali. Inoltre, deve essere maggiore di zero.
4. `customer_id` (`INT`): Questo campo rappresenta l'ID del cliente a cui è stata emessa la fattura ed è obbligatorio ed deve fare riferimento alla `customer`.
5. `paid` (`BOOLEAN`): Questo campo è un valore booleano che indica se la fattura è stata pagata o meno. Ha un valore di default impostato su `FALSE` per indicare che la fattura non è stata ancora incassata.

Assicurati di utilizzare la sintassi SQL corretta per creare la tabella `invoice` con gli attributi e i vincoli sopra descritti.


## 2 - Inserimento dei Dati

Ora che abbiamo definito le tabelle `customer`, `product` e `invoice` con i loro attributi e vincoli, passiamo alla fase di inserimento dei dati. In questa parte del laboratorio, il tuo compito è popolare ciascuna di queste tabelle con almeno 4 tuple valide, assicurandoti di rispettare tutti i vincoli definiti in precedenza.

### Tabella `customer`

- Inserisci almeno 4 clienti con dati validi, assicurandoti che ciascun cliente abbia un indirizzo email unico.
- Fornisci i dati richiesti come l'indirizzo fisico, la data di nascita, l'avatar e l'ultima data di accesso.
- Assicurati che il campo `email` sia unico e che gli altri vincoli vengano rispettati.

### Tabella `product`

- Inserisci almeno 4 prodotti con dati validi, fornendo i dettagli come nome, descrizione, prezzo, quantità in stock, percentuale di sconto e URL della pagina di dettaglio.
- Assicurati che il campo `name` sia unico e che gli altri vincoli vengano rispettati.

### Tabella `invoice`

- Inserisci almeno 4 fatture con dati validi, fornendo la data di emissione, l'importo totale, l'ID del cliente a cui è stata emessa la fattura e lo stato di pagamento (paid).
- Assicurati di rispettare il vincolo `total_amount > 0` per l'importo totale e che l'ID del cliente sia un riferimento valido alla tabella `customer`.

Una volta completato l'inserimento dei dati, verifica che tutte le tabelle contengano almeno 4 tuple valide e che tutti i vincoli definiti in precedenza siano stati rispettati. Buon lavoro!


## 3 - Modifica dei Dati

In questa sezione, esploreremo l'uso dell'istruzione SQL `UPDATE` per modificare i dati nelle tabelle `customer`, `product` e `invoice`. Utilizzeremo almeno un record in ciascuna tabella per illustrare come eseguire l'aggiornamento dei dati esistenti. Inoltre, proveremo a eseguire modifiche che potrebbero violare alcuni dei vincoli imposti sulle tabelle e osserveremo come il database reagisce a tali modifiche.

## 4 - Eliminazione dei Dati

Esegui almeno un'operazione `DELETE` che coinvolga una tupla che è riferita mediante chiave esterna da un'altra tabella. Cosa succede alle tuple della tabella che contiene la chiave esterna? Perché accade ciò? 

## 5 - Modifica della Struttura delle Tabelle


In questa parte del laboratorio, utilizzeremo l'istruzione SQL `ALTER TABLE` per apportare modifiche a una tabella esistente e l'istruzione `DROP TABLE` per eliminare una tabella dal database.

### 5.1 Modifica medinate `ALTER TABLE``

Utilizzeremo l'istruzione `ALTER TABLE` per apportare una modifica a una delle tabelle esistenti. L'obiettivo è aggiungere una nuova colonna denominata `membership_status` alla tabella `customer`. La colonna `membership_status` rappresenterà lo stato di appartenenza dei clienti, ad esempio, "Standard" o "Premium". La colonna sarà di tipo `VARCHAR` e ammetterà valori NULL.

Prepara un file `alter_table.sql` contenente l'istruzione SQL `ALTER TABLE` per aggiungere la nuova colonna. Assicurati di rispettare la sintassi SQL corretta e verifica che la colonna sia stata aggiunta con successo alla tabella `customer`.

### 5.2 Eliminazione mediante `DROP TABLE`

Utilizzeremo l'istruzione SQL `DROP TABLE` per eliminare la tabella `product` dal nostro database. L'obiettivo è rimuovere completamente la tabella dal database, inclusi tutti i dati in essa contenuti. 

Prepara un file `drop.sql` contenente l'istruzione SQL `DROP TABLE` per eliminare la tabella `product`. Dopo aver eseguito questa query, verifica che la tabella sia stata eliminata con successo dal database.

Nota: L'eliminazione di una tabella è irreversibile, pertanto esegui questa operazione con cautela e solo se sei sicuro di voler eliminare definitivamente la tabella e tutti i dati ad essa associati.
