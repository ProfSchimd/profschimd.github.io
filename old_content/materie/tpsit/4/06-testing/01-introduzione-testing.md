---
title: Introduzione al testing
type: lecture
weight: 100
summary: "Questa lezione introduce i concetti base di testing i quali si possono
applicare a tutti i linguaggi di programmazione."
---

Oggigiorno, una significativa parte delle attività lavorative e ricreative viene
gestita mediante sistemi *software*. Basti pensare alla giornata tipo di ognuno
di noi:
* la sveglia di mattina viene spesso impostata su una App del nostro smartphone;
* per vedere le notizie accendiamo la televisione che contiene un vero e proprio
sistema operativo;
* montati sull'autobus utilizziamo una timbratrice automatica mentre ascoltiamo
un sistema automatico annunciare le fermate;
* arrivati a scuola segniamo presenze e assenze sul registro elettronico al quale
accediamo mediante un dispositivo tipo PC, tablet, ...

Non vi è dubbio che le nostre vite dipendano dal corretto funzionamento di hardware
e software di tutti i tipi (telefonini, timbratrici, server, ...). Ma chi ci
garantisce che tali sistemi stiano funzionando correttamente? Come è possibile
*misurare* la correttezza di un software?

Per l'hardware è possibile stabilire alcune misure che garantiscano il corretto
funzionamento, ad esempio la corrente erogata, la tensione tra due punti del
circuito, la corretta messa a terra, ... Per il software risulta più difficile
stabilire una simile lista di misure in quanto **è spesso difficile individuare
tutti i possibili utilizzi che si possono fare un dato software**.

{{<column/two-cols wl=6 wr=6 embed="img/first-computer-bug.html" content="left">}}
Questa difficoltà ha determinato nel tempo la distribuzione di software con difetti
più o meno numerosi. Per indicare tali è ormai usuale indicare questo con il termine
**bug** (formica o più genericamente insetto in inglese). L'origine di questo 
termine risale agli anni '40 quando un errore accaduto durante l'esecuzione di un
programma sul calcolatore *Mark II* (presso l'università di Harvard), fu causato
(probabilmente) da una *falena* (*moth* in inglese) ritrovata all'interno del
meccanismo del calcolatore. Nella figura a destra si può vedere il primo *bug*
della storia dei calcolatori!

Il **testing** è un tentativo di ridurre al minimo la presenza di bug in un
software attraverso la definizione di una lista di **test** che il software deve
essere in grado di superare. In un certo senso questi test rappresentano la misure
che devono essere eseguite su un software affinché lo si possa definire pronto
per il *deployment* (messa in esercizio in produzione).
{{</column/two-cols>}}

In base a quale aspetto del software si mette sotto test, ci sono vari tipi di
testing:
* *unit testing*
* *integration testing*
* *system testing*

## Unit testing
Lo *unit testing* si riferisce ai test che verificano il corretto funzionamento
di una specifica *unità* di codice ad esempio una funzione, un metodo, ...
Normalmente questi test vengono definiti prima di iniziare l'implementazione della
parte sotto test (questo è un aspetto fondamentale del *test driven development*).

La difficoltà nello sviluppare una buona *suite* di unit test risiede nell'identificare
quali test effettuare. Ad esempio in una funzione bisogna decidere quali *input*
e quali *output* provare.

Ogni test individuato in fase di definizione dei test, deve essere implementato
utilizzando librerie apposite disponibili nei vari linguaggi, ad esempio [`jUnit`][1]
per Java. Molti linguaggi mettono a disposizione librerie per *unit testing*
attraverso l'installazione standard (ad esempio [Python `unittest`][2]) oppure
attraverso pacchetti ufficiali (ad esempio [Dart test][3]).

{{<observe>}}
Non è raro imbattersi in situazioni in cui la quantità di codice scritto per
eseguire il testing di unità sia maggiore (anche sensibilmente) rispetto alla
quantità di codice per implementare l'unità stessa.

Si potrebbe pensare che questo può generare molti errori nel codice di testing,
tuttavia questo codice, di norma, risulta molto semplice e perciò molto meno
soggetto all'introduzione di bug (che, tuttavia, non può mai essere escluso del
tutto).
{{</observe>}}

Normalmente gli *unit test* vengono eseguiti eseguendo l'unità in esame
(tipicamente una funzione o un metodo) con degli input appositamente selezionati.
L'output prodotto dall'unità di codice sotto test viene confrontato (di norma
usando un'*asserzione* presente in molti linguaggi come funzione/macro `assert`)
con un valore atteso, se i due valori coincidono il test si dice che è passato,
(*pass*) altrimenti si dice che è fallito (*fail*)

### Esempi di *unit testing*
Vediamo ora alcuni esempi di unità di codice da sottoporre a unit testing per i
quali individueremo alcuni aspetti che devono ragionevolmente essere testati.

#### Funzione `max`
Consideriamo la funzione (o metodo) per il calcolo del massimo tra due numeri
interi. Una suite di testing dovrebbe considerare almeno un test per i seguenti
casi:
* due numeri positivi
* due numeri negativi
* un numero positivo ed uno negativo
* uno o entrambi i numeri pari a 0
* un numero molto grande (ad esempio l'intero più grande possibile)
* numeri uguali

#### Metodo `addUser`
Consideriamo un metodo di una classe il cui scopo è aggiungere un nuovo utente
all'anagrafica. In questo il caso il codice del metodo potrebbe essere complesso,
ad esempio il metodo potrebbe inserire un nuovo *record* su un database oppure
aprire un file `csv` dove è contenuta l'anagrafica. I casi in cui il metodo
`addUser` deve essere testato dovrebbero includere:
* aggiunta di un utente non esistente
* aggiunta di un utente già esistente
* passaggio di valori incoerenti (ad esempio email non valida)
* passaggio di eventuali parametri `null` o vuoti

{{<attention>}}
Affinché gli *unit test* siano efficaci, è necessario che questi vengano eseguiti
in *isolamento*. Ad esempio se il metodo `addUser` accede ad un file, bisogna
evitare che lo unit test sia falsato da un problema (ad esempio nella gestione dei
file) che non dipende dal metodo stesso.

Nel caso in cui l'unità sotto test interagisca con altro codice, si cerca di evitare
che questo interferisca con i test utilizzando dei *mock* che rappresentano dei
"monconi" di codice che replicano l'output del codice utilizzato dall'unità sotto
test.
{{</attention>}}

### Link utili per *unit testing*
Come detto sopra ogni linguaggio ha oggi almeno una libreria/pacchetto per il
testing, specialmente per *unit testing*. Qui sotto viene riportata una lista
(minimale) di link a risorse per eseguire unit testing in alcuni dei più utilizzati
linguaggi.

* [Java `jUnit`][1]
* [Python `unittest`][2]
* [Javascript `jest`][4]
* [PHPUnit][5]
* [Dart `test` package][3]

## Integration testing
Gli *integration test* (test di integrazione) hanno lo scopo di verificare il
corretto funzionamento del software una volta che le varie parti dello stesso
(ad esempio classi, package, ...) vengono collegati ed *integrati* in un unico
progetto software.

Gli integration test vengono eseguiti al termine della fase di programmazione e
dopo che tutti gli *unit test* sono stati eseguiti e passati su tutte le unità
del codice. L'esito di un integration test dipende dalle specifiche del software
definite in fase di progettazione e derivanti dall'*analisi dei requisiti*.

Lo scopo degli integration test è *garantire che le varie parti del software
interagiscono tra di loro secondo le specifiche definite in fase di progettazione.
In altre parole, gli integration testing sono i testi che si occupano di verificare
la corretta integrazione tra le varie "interfacce" (API) delle parti di software.

### Esempi di *integration testing*
Seguendo il pattern di progettazione *Model-View-Control*, un software viene
tipicamente suddiviso in tre parti: Model, View e Control. Alla base di questo
pattern c'è l'idea che il model (i dati) e la view (l'interfaccia grafica) non
interagiscono direttamente, bensì utilizzano il control come tramite. Ne segue
che i tre moduli possono essere sviluppati in isolamento, ma la loro integrazione
deve essere sottoposta ad *integration test*.

#### Model-Control

#### Control-View

## System testing
System testing tests a completely integrated system to verify that the system meets its requirements.

### Esempi di *system testing*

## CI/CD: Continuous Integration Continuous Development

[1]: https://junit.org/
[2]: https://docs.python.org/3/library/unittest.html
[3]: https://pub.dev/packages/test
[4]: https://jestjs.io/
[5]: https://phpunit.de/

