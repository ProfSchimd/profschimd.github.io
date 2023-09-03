---
title: "Laboratorio 1: DB per Commercio Elettronico in SQL"
running_title: "Lab 1: SQL e-commerce"
summary: "In questo laboratorio verrà creato e riempito un database per un sito di commercio elettronico utilizzando i costrutti SQL per Data Definition Language (DDL)."
type: lecture
weight: 1000
---

## Obiettivo
In questa lezione di laboratorio, gli studenti esploreranno e acquisiranno familiarità con diverse istruzioni *Data Definition Language* (DDL) del linguaggio SQL. Saranno discussi istruzioni per la creazione, modifica e gestione di tabelle. Verranno inoltre implementate nella base di dati vincoli di dominio e di integrità referenziale.

## Contenuti

## 1 - Creazione delle Tabelle

### 1.1 - Tabella `customer`
Per creare la tabella `customer`, dovresti definire gli attributi e i vincoli seguenti:

1. `id` (`INT`): Questo campo sarà la chiave primaria della tabella e deve essere generato automaticamente in modo incrementale.
2. `email` (`VARCHAR`): Questo campo obbligatorio rappresenta l'indirizzo email del cliente. Deve essere unico per ogni cliente.
3. `address` (`TEXT`): Questo campo contiene l'indirizzo fisico del cliente, è richiesto che ogni cliente imposti un indirizzo per la consegna.
4. `birth_date` (`DATE`): Questo campo rappresenta la data di nascita del cliente.
5. `avatar` (`BLOB`): Questo campo è utilizzato per archiviare l'immagine di profilo.
6. `last_login` (`DATETIME`): Questo campo rappresenta l'ultima data e ora in cui il cliente ha effettuato l'accesso. 

Assicurati di utilizzare la sintassi SQL corretta per creare la tabella `customer` con gli attributi e i vincoli sopra descritti.

### 2 - Inserimento dei Dati
   - **2.1 INSERT**: Utilizzo dell'istruzione SQL INSERT per aggiungere dati alle tabelle.
   - **2.2 NOT NULL e UNIQUE**: Applicazione dei vincoli NOT NULL e UNIQUE durante l'inserimento.

### 3 - Modifica dei Dati
   - **3.1 UPDATE**: Utilizzo dell'istruzione SQL UPDATE per modificare dati esistenti nelle tabelle.
   - **3.2 ON DELETE**: Introduzione all'opzione ON DELETE nelle chiavi esterne.

### 4 - Eliminazione dei Dati
   - **4.1 DELETE**: Utilizzo dell'istruzione SQL DELETE per rimuovere dati dalle tabelle.

### 5 = Modifica della Struttura delle Tabelle
   - **5.1 ALTER**: Introduzione all'istruzione SQL ALTER per modificare la struttura delle tabelle.
   - **5.2 DROP**: Utilizzo dell'istruzione SQL DROP per eliminare tabelle.

## Attività

1. Creazione delle tabelle:
   - Creare le tabelle `Customer` e `Invoice` con attributi appropriati.
   - Utilizzare l'attributo AUTO_INCREMENT per definire le chiavi primarie.

2. Inserimento dei Dati:
   - Inserire dati di esempio nelle tabelle `Customer` e `Invoice`.
   - Applicare i vincoli NOT NULL e UNIQUE quando necessario.

3. Modifica dei Dati:
   - Modificare alcune informazioni dei clienti e delle fatture utilizzando l'istruzione UPDATE.

4. Eliminazione dei Dati:
   - Rimuovere dati specifici dalle tabelle utilizzando l'istruzione DELETE.

5. Modifica della Struttura delle Tabelle:
   - Aggiungere nuove colonne alle tabelle `Customer` e `Invoice` utilizzando ALTER.
   - Eliminare una delle tabelle utilizzando DROP.

## Risorse
- Documentazione SQL
- Software per la gestione di database (es. MySQL, SQLite)
- Esempi di dati per le tabelle Customer e Invoice.