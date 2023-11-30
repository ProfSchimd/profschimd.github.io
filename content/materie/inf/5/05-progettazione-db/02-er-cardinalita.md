---
title: "Diagramma ER: Cardinalità e partecipazione"
running_title: ER Cardinalità
type: lecture
weight: 200
---

Nella [lezione precedente]({{<ref "01-er-intro.md" >}}) sono stati introdotti i concetti di *entità* e *relazione* e la loro rappresentazione nei diagrammi ER. Si è visto che le relazioni mettono in collegamento (in relazione) due o più entità, spesso è utile sapere anche la *cardinalità* di tale relazioni vale a dire quante *istanze* delle entità partecipano ad una data relazione. Questa lezione presenta i concetti di *vincolo di cardinalità* e *vincolo di partecipazione* ad una relazione.

##  Vincoli di cardinalità
I **vincoli di cardinalità** delle relazioni esprimono il *massimo* numero di relazioni a cui una specifica istanza di un'entità può partecipare. Ad esempio, nella relazione `Composta` tra le entità `Studente` e `Classe` può essere imposto che *ogni studente deve appartenere ad una sola classe* e, allo stesso tempo, ogni classe può avere un numero qualsiasi di studenti, in questo caso parliamo di una relazione `1:N` (`1` a `N`),  ma esistono diversi tipi di cardinalità.

### Relazioni `1:1`
{{<column/two-cols wl=7 wr=5 content="left" embed="img/er-cardinalita-11.html">}}
Quando il vincolo di cardinalità di una relazione impone che ognuna delle relazioni partecipi con *al più un'istanza*, allora diciamo che la relazione è di tipo `1:1`. Ad esempio nel database della scuola possiamo imporre che una classe abbia al massimo un coordinatore di classe e che un insegnante abbiamo al massimo una classe da coordinare. 
{{</column/two-cols>}}
Una relazione `1:1` può essere facilmente rappresentata nel modello logico relazionale da un attributo che può essere messo in una delle due tabelle associate all'entità (possiamo avere l'attributo `coordinatore_di_classe` in `Classe` o l'attributo `coordina` in `Insegnante`).

### Relazioni `1:N`
{{<column/two-cols wl=7 wr=5 content="left" embed="img/er-cardinalita-1N.html">}}
Una relazione in cui il vincolo di cardinalità sia di istanza singola per un'entità e non imponga limite nell'altra la chiamiamo relazione `1:N` (raramente si usa anche `N:1` nel caso in cui si voglia esplicitare una prima e una seconda entità), che chiamiamo *uno a `N`* o *uno a molti*. Ad esempio se la classe è `Composta` di molti studente, ma ogni `Studente` può appartenere ad una sola classe, la corrispondenze relazione (vedi a fianco) è `1:N`. 
{{</column/two-cols>}}
Una relazione `1:N` può essere rappresentata nel modello logico relazionale utilizzando un attributo nella tabella corrispondente all'entità la cui partecipazione è singola. Ad esempio, possiamo inserire in `Studente` l'attributo `class_di_appartenenza`, sarebbe più problematico inserire un attributo in `Classe` in quanto questo dovrebbe contenere tutti gli studenti della classe e non sarebbe, perciò, un attributo atomico.

### Relazioni `N:M`
{{<column/two-cols wl=7 wr=5 content="left" embed="img/er-cardinalita-NM.html">}}
Un relazione in cui entrambe le entità partecipanti non abbia vincolo massimo sul numero di istanze è una relazione `N:M` (*`N` a `M`* o *molti a molti*) a volte si usa anche `N:N` (ma il numero di istanze partecipanti non deve essere lo stesso). Ad esempio un `Insegnante` può insegnare più di una materia e la stessa materia può essere insegnate da più di un insegnante.  
{{</column/two-cols>}}
Una relazione `N:M` può essere tradotta nel modello logico relazionale utilizzando una *tabella di collegamento* nella quale ogni istanza della relazione rappresenta una riga. Questa tabella avrà chiavi esterne verso le tabelle di entità e l'insieme di queste chiavi esterne costituirà la chiave primaria della tabella di collegamento stessa.


## Vincoli di partecipazione
Certe entità possono esistere unicamente in virtù della loro partecipazione ad una relazione, ad esempio uno `Studente` deve essere iscritto ad una `Classe` perché possa essere presente nel database della scuola. 

In generale è importante sapere il *numero minimo* di relazioni a cui un entità deve partecipare, nell'esempio questo numero minimo è 1, cioè ogni studente deve appartenere ad almeno una classe, come abbiamo visto [sopra](#vincoli-di-cardinalità), in questo esempio anche il numero massimo è uno, cioè uno studente non può essere iscritto a più classi contemporaneamente. 

{{<def>}}
Si chiama **partecipazione totale** il vincolo per cui un'entita deve partecipare ad almeno una istanza di una relazione. Nell'esempio sopra, `Studente` ha un vincolo di partecipazione totale con la relazione `Composta`. 
{{</def>}}

{{<def>}}
Si chiama **partecipazione parziale** il vincolo per cui un'entità può o meno partecipare ad istanze di una relazione. Ad esempio l'entità `Insegnante` ha un vincolo di partecipazione parziale con la relazione `Insegna` collegata all'entità `Materia`.
{{</def>}}

{{<column/two-cols wl=7 wr=5 content="left" embed="img/er-partecipazione.html">}}
Nel diagramma ER, la partecipazione totale è indicata utilizzando una doppia linea nella connessione tra l'entità e la relazione a cui essa è vincolata in modo totale. Una linea singola, in questo notazione, indica una partecipazione parziale. A fianco vediamo come modificare il diagramma della relazione `Composta` a cui è stato aggiunto il vincolo di partecipazione totale tra `Studente` e `Composta`. Il fatto che il collegamento tra `Classe` e`Composta` sia indicato con una singola linea indica che può esistere un'entità `Classe` anche senza che questa partecipi alla relazione `Composta` (cioè una classe senza studenti).
{{</column/two-cols>}}

---

Per determinare se un'entità ha una partecipazione totale in un relazione basta rispondere alla seguente domanda: *È obbligatorio che ogni istanza dell'entità partecipi alla relazione?*. Vediamo questo trucco in azione con alcuni esempi.
* Ogni `Studente` deve essere `Iscritto` ad una `Classe`? Si, allora la partecipazione è totale.
* Ogni `Insegnante` deve `Insegnare` in una `Classe`? No, allora la partecipazione è parziale.
* Ogni `Cliente` deve `Acquistare` qualche prodotto? No (clienti appena iscritti), allora la partecipazione è parziale.
* Ogni `Album` deve essere stato `Pubblicato` da un `Artista`?. Si , allora la partecipazione è totale.