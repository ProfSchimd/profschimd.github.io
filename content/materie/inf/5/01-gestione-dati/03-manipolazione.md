---
title: Manipolare i dati
weight: 300
type: lecture
---

## Manipolare i dati
I dati memorizzati in una base di dati sono spesso acceduti manipolati, la possibilità di fare tali operazioni in modo efficiente è l'obiettivo della progettazione di una buona base di dati che rappresenta un passo fondamentale nella creazione di un buon sistema informativo.

Le operazioni che si possono eseguire sui dati sono principalmente quattro e vengono spesso sintetizzati dall'acronimo inglese CRUD: Create, Read, Update Delete. Vediamo ora in dettaglio le caratteristiche di queste operazioni.

Di seguito useremo la base di dati sviluppata negli [esercizi]({{< ref "02-rappresentazione#esercizi" >}} ) della lezione precedente:
* `Cliente` rappresenta i clienti di un sito di commercio elettronico;
* `Prodotto` rappresenta i prodotti venduti;
* `Item` rappresenta un prodotto inserito nel `Carrello`;
* `Carrello` rappresenta la lista dei prodotti inseriti nel carrello da un certo cliente.

### Creazione (Create)
La *creazione* (**C**reate) permette di inserire nuova informazione (ad esempio un nuovo record) nella base di date. Quando si inserisce un dato, è bene verificare che non vengano violati vincoli (ad esempio la email deve avere il formato valido `name@dominio`). Quando si utilizza un DBMS, alcuni vincoli sono automaticamente controllati e se l'inserimento viola uno di questi, il DBMS rifiuta l'inserimento.

### Lettura (Read)
La *lettura* (**R**ead) permette di accedere all'informazione già presente nella base di dati. L'informazione di interesse deve essere ben descritta dalla **query** di lettura (vedi definizione sotto). Quando si legge informazione da un database, il DBMS controlla che i dati necessari a soddisfare la richiesta siano accessibili all'utente. Ad esempio un cliente può accedere al proprio carrello, ma non al carrello di altri clienti. Nel caso in cui un DBMS rilevasse una richiesta non autorizzata, rifiuterà la query.

{{<def>}}
Una **query** è una richiesta di accesso all'informazione descritta in un qualche linguaggio. Questo linguaggio può essere il linguaggio naturale *dammi tutti i clienti con il carrello vuoto*, oppure può essere espressa in un linguaggio formale (ad esempio SQL). Questo secondo caso è quello più frequente in quanto permette al DBMS di recuperare, controllare e restituire l'informazione richiesta.
{{</def>}}

### Aggiornamento (Update)

### Cancellazione (Delete)

## Problematiche

### Concorrenza

### Replicazione 

### Consistenza

### Atomicità