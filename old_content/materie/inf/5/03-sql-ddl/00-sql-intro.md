---
title: Standard Query Language (SQL)
running_title: SQL
type: lecture
weight: 1
summary: "In questo breve lezione si discutono motivazione e origine del linguaggio SQL."
---

## Perché un linguaggio dedicato
L'unità precedente propone un [laboratorio]({{<ref "l01-sqlite.md">}}) nel quale si inizia a familiarizzare con il modello relazionale utilizzando il tool visuale *DB Browser for SQLite*. Mentre l'aggiunta to pochi record ad una tabella può essere facilmente eseguita con un tool di questo tipo, la gestione di basi di dati con milioni (o miliardi) di record suddivise su migliaia di tabelle (ognuna con decine di attributi), può essere eseguita solo utilizzando tool più sofisticati e mediante programmi e applicativi appositamente creati.

In altro [laboratorio]({{<ref "l01-file-dati.md">}}) si è inoltre visto che anche i più moderni linguaggi di programmazione (Javascript, Python, ...) non sono adatti alla gestione e all'*interrogazioni* di basi dati e/o di dati strutturati.

Appare quindi evidente la necessità di un tool che permetta di gestire facilmente una base di dati, anche di grandi dimensioni, in modo che tale gestione possa essere integrata all'interno di un'applicazione, ad esempio all'interno di un una *web application*. Fortunatamente lo strumento in questione esiste è prende il nome di **Standard Query Language (SQL)**.

## Breve storia di SQL
Il progenitore di SQL fu sviluppato, nella metà degli anni 70, da Donald D. Chamberlin e Raymond F. Boyce presso IBM, il linguaggio venne chiamato *SEQUEL* (Structured English QUEry Language), nome che viene spesso utilizzato anche per l'attuale SQL (che andrebbe correttamente pronunciato *es-chiu-el*) il cui acronimo (ottenuto eliminando le vocali da SEQUEL) è stato successivamente associato a *Structured Query Language*.

SQL ha avuto una forte espansione, specialmente per opera di IBM, tra la fine degli anni 70 e l'inizio degli anni 80. Questo successo fu anche dovuto al rilascio da parte di Oracle (all'epoca *Relational Software, Inc.*) del suo DBMS relazionale che comprendeva pieno supporto di SQL.

Dal 1986, l'ANSI e l'ISO hanno adottato e promosso lo standard SQL che oggi è ufficialmente giunto alla versione 2023.

## DDL e DQL
La gestione di un database relazionale è un'operazione molto complessa che comprende numerose istruzioni. Per facilità di descrizione le istruzioni vengono suddivise in base all'effetto che queste hanno sulla base di dati ed in base al risultato che producono. In particolare noi ci occuperemo
* di *Data Definition Language (DDL)* che indica l'insieme delle operazioni che modificano lo schema di un database e
* di *Data Query Language (DQL)* che indica l'insieme delle operazioni per recuperare (senza modificare) dati da un database.

{{<observe>}}
La suddivisione tra DDL e DQL non è la più esaustiva, volendo andare più in dettaglio oltre a DQL e DDL si possono anche identificare
* *Data Manipulation Language (DML)* per la modifica dei record e
* *Data Control Language (DCL)* per la gestione della base di dati.

In queste lezioni includeremo DML e DCL nell'insieme di istruzioni che abbiamo denominato DDL.
{{</observe>}}
