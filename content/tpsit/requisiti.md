---
title: Requisiti software
layout: page
materia: tpsit
align: justify
---

## Requisiti di un software

Nella *progettazione* di un software uno degli obiettivi è, ovviamente, quello di
soddisfare l'*utente finale*. Cosa significa "soddisfare" in questo caso? A questa
domanda non può esistere un'unica risposta in quanto la soddisfazione dipende da
quello che l'utente si aspetta. Quello che l'utente si aspetta dipende da quali
sono le sue *esigenze* (rispetto al software). Quindi, nel progettare
un software **è fondamentale conoscere le esigenze del cliente** che verranno poi
tradotte in **requisiti** del software stesso.

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-text"></i> Definizione: Requisiti software</h5>
I **requisiti** di un software sono le *caratteristiche* e le *funzionalità* che un
software deve possedere per essere considerato, da parte dell'utente, adatto allo scopo.
Fondamentale è che ogni requisito possa essere *verificato*, cioè si deve poter dire
se un software soddisfa o meno quel requisito.
</div>

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg" height="20em">
In English: software requirements</h5>
A **software requirement** is a property that must be exhibited by something in order to solve some problem in the real world,
an essential property of all software requirements is that they are verifiable. (*IEEE Software Engineer Body Of Knowledge
(SWEBOK)*)
</div>

Per progettare un software, quindi, è necessario conoscere le esigenze degli utenti
finali, che devono perciò essere interrogati su quello che loro si aspettano dal
software. Per esempio, se il progetto prevede lo sviluppo di un *software gestionale*
(il software che gestisce il *sistema informativo* di un azienda, esempio dipendenti,
clienti, fatture, ...) si andranno a interrogare i dipendenti dell'azienda.
In certi casi però questo non è possibile, si pensi, ad esempio, ad una
software house che sviluppa videogiochi e che vuole conquistare mercato con un gioco
innovativo. Chi sono gli utenti da interrogare? Come è possibile interrogare gli
utenti su quello che si aspettano da un gioco che ancora non esiste? Come si vede,
l'*analisi dei requisiti software* non è sempre un operazione semplice ed immediata,
ma può richiedere tempo e sforzo notevoli.


<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-code"></i> Esempio: software gestionale</h5>
Facciamo ora alcuni esempi di requisiti che un *software gestionale* deve possedere.
La raccolta e l'analisi dei requisiti di un software (anche semplice) richiede diverse
pagine di documentazione perciò ci limitiamo qui a pochi esempi che possano fornire
un'idea di massima. 

* **Gestione dell'anagrafica fornitori** Il software deve permettere di: consultare,
modificare e stampare una schermata (eventualmente composta di più pagine) che
contenga l'elenco dei fornitori (ordinabile secondo l'ordine alfabetico) di modo
che per ogni fornitore siano mostrate le informazioni di: ragione sociale, indirizzo
legale, sito web del fornitore.

* **Modalità "manager" e modalità "impiegato"** Il software deve poter funzionare
(almeno) in due distinte modalità: quella *manager* utilizzata dai *quadri*
dell'azienda e quella *impiegato* usata da tutti gli altri. Nella modalità manager
sono visibili tutte le informazioni presenti nel database. Nella modalità impiegato
non sono accessibili le sezioni relative a: anagrafica dipendente, piani di business,
documenti manageriali.

* **Compatibilità con diversi dispositivi** Il software deve essere fruibile su
qualsiasi piattaforma sia tramite PC che tramite dispositivi *mobile* (es. Smartphone
e Tablet) senza che vi sia alcuna differenza tra le operazioni che possono essere
compiute in un caso e nell'altro.
</div>

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-code"></i> Esempio: videogioco</h5>
I requisiti di un videogioco i cui utenti (giocatori) non sono noti, non sono
facili da rendere formali. Tuttavia, è necessario avere una lista completa di
tali requisiti per poter procedere allo sviluppo del software. Come nell'esempio
precedente, anche in questo caso ci limitiamo a fornire un numero minimo di
requisiti.

* **Modalità single player e multiplayer** Il gioco deve comprendere due possibili
modalità di gioco una con giocatore singolo ed uno con più giocatori. Nel primo
caso il giocatore sarà in competizione con degli altri giocatori artificiali che
devono adattarsi alle abilità del giocatore stesso. Nel caso di multiplayer non
è prevista la presenza di giocatori artificiali. Il numero di giocatori in
modalità multiplayer deve essere almeno 2 e non più di 32.

* **Diverse interfacce di controllo** Il gioco si deve poter controllare con diverse
modalità: tastiera + mouse, pad e touchscreen + giroscopio. Il gioco deve fornire
un'esperienza di gioco simile indipendentemente dal controllo utilizzato. In particolare
non ci devono essere possibilità utilizzabili con un tipo di controllo e non con
altri tipi.

* **Punteggio globale** Ci deve essere una *scoreboard* mondiale nella quale
il gioco salva automaticamente i risultati del giocatori. Questa classifica
deve essere consultabile in un'apposita schermata del gioco che deve mostrare:
posizione e punteggio del giocatore, nome, punteggio e posizione dei giocatori
immediatamente precedenti e seguente nella classifica. La schermata deve anche
dare la possibilità di scorrere (sia in alto che in basso) la classifica e di
cercare i giocatori per nome (in modo da poter vedere la posizione ed il
punteggio di un giocatore di si sappia il nome, es. di un amico).
</div>

## Raccolta dei requisiti

Nella fase di raccolta dei requisiti, bisogna tener conto di diverse *sorgenti* di
tali requisiti. Nel paragrafo sopra ci siamo concentrati sugli utenti finali
"espliciti" del software, ma non sono gli unici ad avere dei requisiti sul software.
Un esempio di sorgente che non è ovvio è la *legge*. Si pensi ad un software per
il commercio elettronico che memorizza dati sensibili tra cui indirizzo di residenza,
data di nascita, numeri di carta di credito ed altro. Il software deve ovviamente
rispondere al requisito di segretezza di questi dati (per esempio il GDPR europeo).
Quindi la *conformità alle leggi sul trattamento dei dati* è un requisito che il
software deve possedere, ma che non possiamo pensare come ad un requisito espresso
da uno specifico utente. 

Vediamo, quindi, quali sono le possibili sorgenti di requisiti.
* **Stakeholder** (portatori di interesse): chiunque interagisca in qualche modo con
il software, ha interesse nei confronti di esso e quindi può avere delle esigenze
che il progettista deve tenere in considerazione. Esempi di stakeholder sono: utenti,
manager, clienti, ...

* **Ambiente di lavoro**: un software che venga sviluppato per un'azienda deve
tener conto della realtà dell'azienda: che dispositivi ci sono, che rete viene
usata, dove si trovano geograficamente le sedi, quante persone contemporaneamente
usano il software, ...

* **Regole di mercato**: ogni software deve obbedire a delle regole e a delle
leggi che possono diventare parte dei requisiti. Ad esempio il trattamento dei
dati, oppure il linguaggio utilizzato dai personaggi di un videogioco oppure le
regole sul commercio.

* **Obiettivi**: ogni azienda ha i propri *obiettivi* ed il software deve
essere in linea con essi. Ad esempio un azienda che promuove la parità di genere
può volere un software che usi testo e linguaggio neutro rispetto al sesso.
Anche il più banale obiettivo di fare utili si traduce in un budget assegnato
allo sviluppo del software, il budget quindi diventa un requisito del software.

* **Conoscenze di dominio**: i software vengono usati per fare operazioni in
un preciso *dominio*. Ad esempio un software di commercio elettronico opera
in uno o più stati dove ci potrebbero essere monete diverse (es. Euro e Dollaro).
Oppure in un'azienda metalmeccanica il software potrebbe aver bisogno di
informazione relative ai materiali che usano e alle caratteristiche di questi
materiali.

<div class="alert alert-success" markdown="1">
<h5 class="no_toc"><i class="bi bi-eye"></i> Approfondimento: stakeholder</h5>

Il termine *stakeholder* viene utilizzato spesso in ambito lavorativo e, come scritto
anche sopra viene tradotto con *portatori di interesse*. gli stakeholder sono quindi
tutte le persone *fisiche* e *giuridiche* che sono in qualche modo interessate da un
prodotto. 

Prendiamo come esempio un software gestionale, gli stakeholder in questo caso sono
molteplici.
* Dipendenti dell'azienda 
* Clienti e fornitori dell'azienda, se presenti nel sistema o se interagiscono con il sistema
* Le autorità garanti della protezione dei dati (se il sistema memorizza dati personali)
* L'azienda che produce il software
* Le aziende che offrono l'*hosting* del software (se presenti)
* ...

Come si vede la lista degli stakeholder è spesso lunga e comprende, oltre a persone fisiche
(es. dipendenti) anche persone *giuridiche* (es. aziende, garante della protezione dei dati).
</div>

## Classificazione dei requisiti

Può risultare comodo classificare i requisiti raccolta ecco in ottica di una
migliore progettazione del software e del suo sviluppo. Tra le varie proposte
di classificazione dei requisiti presentiamo qui quella denominata **FURPS**,
acronimo che rappresenta l'inizio di ognuno di essi
* **Functionality** (*funzionalità*) riguarda le caratteristiche e le funzionalità
del software. Ad esempio, la possibilità di stampare la lista clienti è una
funzionalità di un software gestionale.
* **Usability** (*usabilità*) riguarda la facilità di utilizzo del software.
Ad esempio la possibilità di usare un videogioco con diversi tipi di controller
è un aspetto di usabilità.
* **Reliability** (*affidabilità*) riguarda la "robustezza" del software intesa
come stabilità e mancanza di *crash*. Ad esempio la capacità di un sistema
operativo di funzionare senza bloccarsi o bloccarsi raramente.
* **Performance** (*prestazioni*) riguarda l'efficienza del software, esempio
la reattività o la velocità di esecuzione. Ad esempio la capacità di riconoscere
un volto in un video in tempo reale.
* **Supportability** (*manutenibilità*) riguarda la possibilità di mantenere,
espandere e correggere bug enl software. Ad esempio la possibilità di correggere
velocemente un bug di sicurezza (che potrebbe compromettere i dati).

<div class="alert alert-danger" markdown="1">
<strong><i class="bi bi-exclamation-triangle"></i> Attenzione: importanza dei requisiti</strong><br />
Spesso si tende a considerare la raccolta e l'analisi dei requisiti come uno spreco di
tempo. Questo errore è tipico di molti programmatori e/o team di sviluppo che non hanno
sufficiente esperienza con lo sviluppo di software. Per evitare di incorrere in questo
errore, basta tenere a mente che **se un aspetto del software non è stato considerato
nell'analisi dei requisiti, allora non verrà realizzato**.

In particolare questo ha due implicazioni "opposte":
* se il cliente ci aveva comunicato una sua necessità che non viene realizzata, il progetto
sarà incompleto,
* se il cliente **non** ci aveva comunicato un requisito, ma noi lo abbiamo comunque
realizzato, questo non verrà pagato.
</div>

