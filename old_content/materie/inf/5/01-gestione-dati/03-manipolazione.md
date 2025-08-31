---
title: Manipolare i dati
weight: 300
type: lecture
---

## Manipolare i dati
la possibilità di accedere in modo efficiente ai dati memorizzati è l'obiettivo principale della progettazione di una buona base di dati, presupposto indispensabile per un buon sistema informativo. Ci sono quattro principali operazioni descritti dall'acronimo inglese CRUD: Create, Read, Update Delete.

Per una migliore spiegazione useremo la base di dati sviluppata negli [esercizi]({{< ref "02-rappresentazione#esercizi" >}} ) della lezione precedente:
* `Cliente` rappresenta i clienti di un sito di commercio elettronico;
* `Prodotto` rappresenta i prodotti venduti;
* `Item` rappresenta un prodotto inserito nel `Carrello`;
* `Carrello` rappresenta la lista dei prodotti inseriti nel carrello da un certo cliente.

### Creazione (Create)
La *creazione* (**C**reate) permette di inserire nuova informazione (ad esempio un nuovo record) nella base di date. L'inserimento non deve violare i vincoli (ad esempio la email deve avere il formato valido `name@dominio`). Quando si utilizza un DBMS, alcuni vincoli sono automaticamente controllati, se l'inserimento viola uno di questi, il DBMS rifiuta l'operazione.

### Lettura (Read)
La *lettura* (**R**ead) permette di accedere all'informazione già presente nella base di dati. L'informazione di recuperare deve essere descritta con una **query** (vedi definizione sotto). Durante una lettura, il DBMS verifica i permessi di accesso per l'utente che ha effettuato la query rifiutandola nel caso di accessi non autorizzati. Ad esempio, un cliente può accedere al proprio carrello, ma non al carrello di altri clienti. 

{{<def>}}
Una **query** è una richiesta di accesso all'informazione descritta in un qualche linguaggio. Questo linguaggio può essere il linguaggio naturale *dammi tutti i clienti con il carrello vuoto*, oppure può essere espressa in un linguaggio formale (ad esempio SQL). Questo secondo caso è quello più frequente in quanto permette al DBMS di recuperare, controllare e restituire l'informazione richiesta.
{{</def>}}

### Aggiornamento (Update)
L'*aggiornamento* (**U**pdate) permette di modificare informazione che è già presente nella base di dati. Ad esempio, se un prodotto cambia di prezzo o non è più disponibile nel magazzino, la base di dati deve essere aggiornata per tenere conto di tale cambiamento nella realtà di interesse.
L'aggiornamento può dare origine agli stessi problemi di permessi e di violazione dei vincoli descritti in precedenza.

### Cancellazione (Delete)
La *cancellazione* (**D**elete) permette l'eliminazione di informazione (ad esempio un record) da una base di dati. Ad esempio, se un prodotto non è più disponibile nel listini perché fuori produzione, tale prodotto può essere eliminato. Anche nel caso della cancellazione, è possibile che manchino le autorizzazioni necessarie. Inoltre è anche possibile che, a seguito della cancellazione, alcuni vincoli siano violati.

## Problematiche

### Anomalie
Le operazioni CRUD sopra descritte possono creare *anomalie* nel base di dati, come conseguenza il sistema si può trovare in uno stato *corrotto* o non aderente alla realtà. Ad esempio, nel momento in cui due clienti contemporaneamente mettono nel carrello un prodotto di cui ne è disponibile una sola unità, si ha un problema di *inconsistenza* poiché lo stesso oggetto si trova in due carrelli e solo un cliente potrà acquistarlo.

#### Replicazione 
La *replicazione* (*replication* o *duplication*) è la situazione in cui la *stessa* informazione (lo stesso dato o insieme di dati) è presente in due o più "copie" nella base di dati. Ad esempio, se il record `Item` memorizza anche il `prezzo` di un prodotto nel carrello, allora ogni item di ogni carrello avrà una copia del data `prezzo`.

#### Consistenza
La replicazione può generare problemi di *consistenza* (*consistency*). Uno stato è consistente se **tutte le copie di un dato sono coerenti, cioè hanno lo stesso valore**. Nell'esempio del `Carrello`, se ogni `Item` ha anche il prezzo, diversi record `Item` per lo stesso prodotto potrebbero memorizzare prezzi diversi. In questo caso si dice che è stata violata la consistenza. 

Una base di dati ben progettata non permette queste violazione, tuttavia non è semplice ottenere una tale garanzia e, in certi casi, può essere impossibile garantire la consistenza.

### Concorrenza e Atomicità
Una basi di dati è spesso utilizzata in maniera concorrente, ad esempio, più clienti possono, contemporaneamente, consultare il catalogo, aggiungere/togliere item dal carrello, ... . Due clienti che vogliono acquistare l'ultimo iPhone rimasto, devono compiere le operazioni in maniera concorrente e non devono verificarsi anomalie quali, ad esempio, l'acquisto contemporaneo.

I DBMS offrono funzionalità che permettono l'esecuzione di *transazioni atomiche*, cioè operazioni di accesso e/o modifica di dati eseguite in maniera *atomica* vale a dire come se si trattasse di un'unica singola operazione. In questo modo si prevengono molte (ma no tutte) delle anomalie dovute alla concorrenza. Ad esempio l'acquisto di un prodotto deve essere un'operazione atomica in modo che si limitino le possibilità di erroneamente eseguirla più volte. Tratteremo in dettaglio l'atomicità delle transazioni in una futura lezione, al momento è importante conoscere il problema di modo che si abbia consapevolezza della necessità di prendere contromisure in fase di progettazione di una base di dati.
