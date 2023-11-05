---
title: "Introduzione alla progettazione di basi di dati"
running_title: Progettazione DB
type: lecture
weight: 10
summary: "Il primo passo per la creazione di una base di dati è la sua progettazione. Questa lezione discute le motivazioni e gli obiettivi della progettazione introducendo i tre livelli di progettazione: concettuale, logica e fisica."
---


In una moderna applicazione, i dati rappresentano l'unica fonte di "verità" da cui recuperare informazione. Ad esempio, il registro elettronico utilizzato da una scuola, contiene le informazioni su studenti, classi, voti, ... 

{{<column/two-cols wr=6 wl=6 content="left" embed="img/web-architecture.html">}}
Per visualizzare le informazioni in una pagina web (vedi figura a fianco) dopo che i dati sono recuperati da un database (ad esempio con una query SQL), questi vengono inseriti in una pagina HTML o in un file JSON (ad esempio utilizzando PHP) da un web server il quale spedisci il risultato al cliente.

Tale schema si adatta perfettamente ad uno sviluppo di applicazioni attraverso il pattern *Model-View-Control (MVC)* in cui il *model* è rappresentato dal database, il *control* dal server e il *view* dal client.
{{</column/two-cols>}}

## Perché progettare una base di dati
Come detto, l'unica sorgente di informazione è il database (il *model* nel pattern MVC) ed è perciò necessario che tale sorgente contenga tutta l'informazione necessaria al corretto funzionamento dell'applicazione. Tuttavia non è sufficiente che l'informazione ci sia, essa deve anche essere utilizzabile in modo efficiente ed efficace. Ad esempio, se il registro elettronico necessitasse di diversi minuti per recuperare l'informazione relativa ad una classe, questo renderebbe le operazioni di appello molto più complicate, parliamo in questo caso di una gestione *non efficiente* dei dati. Come altro esempio consideriamo un errore nella progettazione che determina l'impossibilità di avere due voti nella stessa materia lo stesso giorno. Questo potrebbe essere un problema in alcuni casi, ad esempio nel caso di un'interrogazione ed una prova di laboratorio fatta lo stesso giorno.

Per operare una buona progettazione è necessario conoscere nel miglior modo possibile le esigenze dei futuri utenti dell'applicazione stessa, questa fase della progettazione prende il nome di *analisi dei requisiti* e viene brevemente discussa in seguito.

### L'analisi dei requisiti
Durante l'**analisi dei requisiti** (*requirements analysis*) lo scopo è individuare le esigenze implicite ed espliciti dei futuri utilizzatori della base di dati.

#### Diagramma UML dei casi d'uso

{{<column/two-cols wr=6 wl=6 content="left" embed="img/use-case.html">}}
Uno strumento che può essere d'aiuto nella fase di analisi dei requisiti è il [*diagrammi UML dei casi d'uso*]({{<ref "02-use-case.md" >}}) nel quale si individua gli *attori* (utenti) e gli *usi* che questi faranno del sistema. 

Di fianco vediamo un esempio di un diagramma dei casi d'uso in cui due attori *Stagista* e *Dipendente* interagiscono con il sistema nel visualizzare e modificare l'anagrafica dei fornitori. Dallo schema vediamo come i due attori abbiano "viste" diverse del sistema, mentre il dipendente può visualizzare e modificare, lo stagista può solo visualizzare. Inoltre si capisce la diagramma come vi sia la necessità di ordinare alfabeticamente l'anagrafica e come le operazioni di modifica siano di tre tipiL aggiunta, eliminazione e modifica.

Come si vede un "semplice" diagramma dei casi d'uso permette di individuare alcuni dei requisiti del sistema (e quindi della base di dati), tuttavia è bene sottolineare che lo schema da solo non è sufficiente, ma deve essere corredato di una descrizione (anche breve) di quegli aspetti che non sono deducibili dallo schema (ad esempio che informazioni visualizzare per ogni fornitore, oppure come realizzare i controlli per la modifica). 
{{</column/two-cols>}}

Terminata l'analisi dei requisiti, si dovrebbe avere a disposizione un documento che descrive il sistema e le azioni che gli utenti compiono su di essi. Da queste interazioni si possono dedurre le informazioni che devono essere memorizzate nel database, questo processo di traduzione prende il nome di *progettazione concettuale* ed è uno degli aspetti più importanti e critici della progettazione. Per questo motivo buona parte delle lezioni di questo modulo sono dedicate alla progettazione concettuale utilizzando uno strumento chiamato *Diagramma Entità-Relazione (Entity-Relationship)* spesso abbreviato con diagramma ER.

{{<attention>}}
L'analisi dei requisiti è un passaggio fondamentale che **deve coinvolgere pienamente il cliente** che rappresenta gli utenti futuri. Non è mai opportuno fare ipotesi sull'utilizzo e/o sui tipi di dati da memorizzare senza aver avuto adeguata discussione con il cliente. Ad esempio, assumere che tutti gli studenti di una scuola sono in unica classe può sembrare una cosa normale, ma in certi casi si rende necessario inserire uno stesso studente su più classi (ad esempio per delle attività extra orario scolastico).
{{</attention>}}

## Tipi di progettazione
Per giungere dall'analisi dei requisti al database finale è necessario effettuare dei passaggi intermedi.
1. La progettazione concettuale permette di tradurre la descrizione della realtà presente nei requisiti in *entità* che troveranno posto nel database in modo organico e collegato.
2. Una volta individuate le entità e le loro *relazioni*, si passa alla scelta del tipo di database (ad esempio relazionale) ed alla traduzione del progetto concettuale in un *progetto logico* che rappresenta le stesse entità e relazioni sotto forma di costrutti del modello logico scelto (ad esempio tabelle, colonne, chiavi, ... nel modello relazionale).
3. Una volta scelto il modello logico ed avendo il progetto logico si può passare alla *progettazione fisica* che traduce i costrutti del modello logico (ad esempio le tabelle) in costrutti "fisici" della macchine (ad esempio file). Questo passaggio spesso è tutto i carico al DBMS che si occupa di tradurre il modello logico in un modello fisico. Per questo motivo non ci occuperemo di progettazione fisica.

### Progettazione Concettuale
La fase di *progettazione concettuale* permette di identificare nell'analisi dei requisiti i *concetti* fondamentali che devono essere presenti all'interno della base di dati. Il termine concetto è spesso sostituito da *entità* e *relazione* essendo il Diagramma ER lo strumento pressoché universale per la fase di progettazione concettuale.

Per comprendere meglio la fase di progettazione concettuale vediamo un esempio analizzando un estratto di una possibile analisi dei requisiti per un registro elettronico. Nell'esempio sono state evidenziate alcune parole importanti che rappresentano informazione da mantenere nella base di dati.

Si deve permettere l'inserimento di un {{<mark>}}voto{{</mark>}} per ogni {{<mark>}}materia{{</mark>}} nella {{<mark>}}pagella{{</mark>}} finale, i voti possibili sono solo {{<mark>}}voti interi{{</mark>}} compresi tra 1 e 10 (non 6.5 o 7/8) o il {{<mark>}}valore NC{{</mark>}} che indica assenza di valutazione. Non è possibile procedere alla fase successiva dello {{<mark>}}scrutinio{{</mark>}} se tutti gli studenti non hanno una valutazione per tutte le materie previste.

In fase di progettazione concettuale è opportuno prevedere che vi sia un costrutto (entità o relazione) per ciascuno degli elementi sopra evidenziati, in caso contrario il rischio è di non aderire alle specifiche (si immagini, ad esempio, la mancanza del voto NC oppure la mancanza del concetto di pagella).

### Progettazione Logica
Nella fase di *progettazione logica* si parte dal progetto concettuale (ad esempio dal diagramma ER) e si produce un progetto logico della base di dati. L'esito di questa fase dipende dal *modello logico* che si sceglie per la base di dati. In questo modulo ci occuperemo unicamente di *modello relazionale* nel qual caso la progettazione deve individuare:
* le tabelle e gli attributi che descrivono la realtà;
* i vincoli (di dominio e di chiave) che esistono nella realtà;
* i collegamenti (chiavi esterne) tra tabelle.

La creazione di un modello logico relazionale a partire da un diagramma ER concettuale è un'operazione comune che richiede l'applicazione di *regole di traduzione* che permettono di creare lo schema logico a partire dallo schema concettuale. Anche se tali regole sono fissate, è sempre possibile apportare degli aggiustamenti oppure operare delle scelte che permettano di migliorare la progettazione. Tuttavia queste "deviazioni" dalla procedura "standard" di traduzione, debbono essere adeguatamente motivate. Ci occuperemo di questo processo di traduzione in una [lezione successiva]({{<ref "04-progettazione-logica.md">}}) di questo modulo.

{{<observe>}}
È interessante osservare come nel modello concettuale non è importante quale modello logico si utilizzerà, creare una rappresentazione dei concetti indipendente dal modello logico, ma non sotto forma di requisiti in linguaggio naturale è esattamente lo scopo della progettazione concettuale. Allo stesso modo, il progetto logico non indica in nessun modo come i costrutti del modello logico devono essere implementati in pratica, questo permette di descrivere un database indipendentemente dal modo in cui verrà realizzato (file, indici, collegamenti, ...).
{{</observe>}}

### Progettazione Fisica
La progettazione fisica parte dal progetto logico e determina in che modo i vari costrutti del modello logico scelto vengono realizzati in software. Ad esempio, partendo da un modello logico relazionale ci si deve chiedere come si realizzano in software (ad esempio in C++ o in Java):
* la tabelle e gli attributi (array, liste, dizionari, classi, ...);
* i riferimenti (puntatori, classi, ...);
* memorizzazione su memoria esterna (file ad accesso casuale, file di testo, indice ad albero, ...);

Non ci occuperemo in questo modulo di progettazione fisica in quanto la gestione è normalmente delegata al DBMS, tuttavia è importante sapere che le scelte operate in questa fase (anche se operate da chi sviluppa il DBMS) possono avere un impatto importante sull'efficienza della base di dati. Per questo motivo la progettazione fisica deve essere condotta utilizzando un'attenta scelta degli algoritmi e delle strutture dati che possano supportare le operazioni di accesso alla base di dati.