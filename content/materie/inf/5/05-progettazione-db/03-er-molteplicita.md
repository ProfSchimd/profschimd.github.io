---
title: "Diagramma ER: Molteplicità e vincoli"
running_title: ER Molteplicità
type: lecture
weight: 300
---

##  Molteplicità

## Vincoli di partecipazione
Certe entità possono esistere unicamente in virtù della loro partecipazione ad una relazione, ad esempio uno `Studente` deve essere `Iscritto` ad una `Classe` perché possa essere presente nel database della scuola. 

In generale è importante sapere il *numero minimo* di relazioni a cui un entità deve partecipare, nell'esempio questo numero minimo è 1, cioè ogni studente deve appartenere ad almeno una classe, come abbiamo visto [sopra](#molteplicità), in questo esempio anche il numero massimo è uno, cioè uno studente non può essere iscritto a più classi contemporaneamente. 

{{<def>}}
Si chiama **partecipazione totale** il vincolo per cui un'entita deve partecipare ad almeno una istanza di una relazione. Nell'esempio sopra, `Studente` ha un vincolo di partecipazione totale con la relazione `Iscritto`. 
{{</def>}}

{{<def>}}
Si chiama **partecipazione parziale** il vincolo per cui un'entità può o meno partecipare ad istanze di una relazione. Ad esempio l'entità `Insegnante` ha un vincolo di partecipazione parziale con la relazione `Insegna` collegata all'entità `Classe`.
{{</def>}}

Nel diagramma ER, la partecipazione totale può essere indicata utilizzando una doppia linea nella connessione tra l'entità e la relazione a cui essa è vincolata in modo totale. Una linea singola, in questo notazione, implica una partecipazione parziale.

Per determinare se un'entità ha una partecipazione totale in un relazione basta rispondere alla seguente domanda: *È obbligatorio che ogni istanza dell'entità partecipi alla relazione?*. Vediamo questo trucco in azione con alcuni esempi.
* Ogni `Studente` deve essere `Iscritto` ad una `Classe`? Si, allora la partecipazione è totale.
* Ogni `Insegnante` deve `Insegnare` in una `Classe`? No, allora la partecipazione è parziale.
* Ogni `Cliente` deve `Acquistare` qualche prodotto? No (clienti appena iscritti), allora la partecipazione è parziale.
* Ogni `Album` deve essere stato `Pubblicato` da un `Artista`?. Si , allora la partecipazione è totale.