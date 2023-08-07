---
title: Relazioni
type: lecture
weight: 100
summary: "Questa lezione introduce il concetto di relazione che ha un ruolo centrale nel modello relazionale delle base di dati. La lezione discute anche i concetti di attributo e schema di una base di date relazionale."
---

## Modelli
Una base di dati può essere descritta in diversi modi secondo le esigenze, vi sono tre *livelli* di descrizione che nella progettazione delle basi di dati si utilizzano:
1. livello **concettuale** in cui la parte importante sono i *concetti* che sono rappresentati nella base di dati,
2. livello **logico** in cui viene descritto il modo in cui i dati sono organizzati a livello "logico",
3. livello **fisico** in cui si descrive come i dati sono memorizzati nei supporti fisici quali SSD, dischi.

Ognuno di questi livelli può essere basato su tecniche e nomenclatura specifici, in pratica ogni livello può essere descritto mediante **modelli**. Si parla perciò di modelli concettuali, logici e fisici.

Con questa unità si introduce il modello logico noto come **modello relazionale**, più avanti ci occuperemo del modello concettuale noto come **diagramma entità-relazione**.

Non ci occupiamo di modelli fisici in quanto questi sono normalmente gestiti dai DBMS i quali si occupano di organizzare le informazioni a partire dal modello logico che adottano (ad esempio il modello relazione per DBMS relazionali) in un modello fisico che sia efficiente e che garantisca il miglior funzionamento della base di dati.

### Progettazione di basi di dati
Dedicheremo un'intera unità alla [progettazione di basi di dati]({{<ref "05-progettazione-db" >}}) anche perché **la progettazione stessa è richiesta durante la seconda prova d'Esame di informatica**. Qui introduciamo brevemente i passi che tipicamente si svolgono durante la progettazione.
1. **Analisi dei requisiti**: si definiscono, interrogando gli utenti finali, tutti i dati, le *query* e le funzionalità che la base di dati deve supportare.
2. **Progettazione concettuale**: a partire dall'analisi dei requisiti, avendo scelto un modello concettuale specifico, si crea la rappresentazione concettuale della base di dati.
3. **Progettazione logica**: a partire dalla progettazione concettuale, avendo scelto un modello logico specifico, si crea la rappresentazione logica della base di dati.
4. **Sviluppo e testing**: utilizzando la rappresentazione logica, avendo scelto un DBMS adeguato, si realizza la base di dati, si creano le query e le *viste* e si procede con i test di funzionamento.IN

## Il modello relazionale
La maggior parte dei database attualmente in utilizzo sono basati sul modello logico dei *database relazionali*. Anche se oggi altri tipi di database chiamato [*NoSQL* (Not Only SQL)]({{<ref "06-nosql" >}}) sono popolari, la conoscenza approfondita del modello relazionale e delle tecniche di progettazione di database relazionali, sono ancora competenze fondamentali per uno sviluppatore (specialmente, ma non esclusivamente, per sviluppatori backend).

Il modello relazionale si basa sul concetto di *relazione* che verrà presentato nella [prossima sezione](#relazione-e-tupla) insieme al concetto di tupla. Un database è normalmente composto di un insieme di relazioni che vanno sotto il nome di schema della base di dati. È importante, inoltre, ricordare la differenza tra livello intensionale, lo schema della base di dati, e livello estensionale, lo *stato* della base di dati.

Mentre questa lezione ha lo scopo di introdurre con definizioni ed esempi i concetti fondamentali dei database relazionali, le lezioni successive sono altrettanto importanti:
* [le chiavi e i vincoli di uno schema relazionale]({{<ref "02-chiavi-integrita.md" >}});
* [algebra relazionale]({{<ref "03-algebra-relazionale.md" >}}).

I moduli successivi introducono SQL che è il linguaggio per creare e gestire database relazionali, una conoscenza adeguata di tale linguaggio è spesso un requisito per ottenere posizioni di lavoro da sviluppatori.

{{<important>}}
Avere una comprensione "teorica" del modello relazionale permette di capire meglio come utilizzare sul campo strumenti come SQL. Per questo motivo è importante studiare ed assimilare il materiale presentato in questo modulo cosicché nei moduli successivi ci si possa pienamente concentrare sull'utilizzo del linguaggio SQL e sulla progettazione di database relazionali.
{{</important>}}

## Relazione e Tupla
Il modello relazionale prevede che le entità del mondo da descrivere siano tradotti in *relazioni*. Una relazione può essere vista come una tabella fatta di colonne e riga a cui è associato un *nome* che rappresenta il *nome della relazione*. Ogni colonna corrisponde ad un *attributo* ed ogni riga ad una *istanza* detta anche *tupla*. A differenza di una tabella Excel, una relazione deve avere un *dominio* ben specificato per ogni colonna (in Excel la cella `A1` può contenere un numero mentre la cella `A2` una stringa). Il numero di attributi di una relazione prende il nome di *grado* della relazione.

Introduciamo ora una prima definizione di *schema di relazione*, è importante notare che questa definizione riguarda lo *schema* cioè il livello intensionale: come è fatta mentre **non riguarda** lo *stato* cioè il livello estensionale: cosa contiene. 

{{<def title="Schema di Relazione">}}
Uno **schema di relazione** è definito da un *nome* e da una lista di *attributi* \\(A_1,...,A_n\\) il numero \\(n\\) di attributi si dice **grado** dello schema. Ad ogni singolo attributo \\(A_i\\) è associato un *dominio*.
{{</def>}}

{{<example>}}
Consideriamo l'entità *studente* che nella base di dati è descritto da *nome*, *cognome* e *data di nascita*. Nel modello relazionale utilizzeremo una relazione/tabella chiamata `Studente` con tre attributi/colonne: `Nome`, `Cognome` e `DataDiNascita`. Il Dominio dei primi due attributi sarà quello delle stringhe di possibili nomi, mentre il terzo attributo avrà come dominio tutte le possibili date, ad esempio nel formato `AAAA-MM-GG`.

{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
|   ....   |   ...   |      ...      |
{{</table>}}
{{</example>}}

Mentre lo schema di una relazione rappresenta come è fatta la relazione e come sono fatte le istanze (righe della tabella), il contenuto rappresenta lo *stato* della relazione e si descrive indicando le *tuple* (righe) che compongono la relazione. Ogni tupla è una *sequenza ordinata di \\(n\\) valori*, analizziamo bene questa definizione.
* Sequenza significa che i valori sono in successione (uno dopo l'altro), esiste perciò un primo, un secondo, un ultimo valore. La tupla `(Mario,Rossi,1970-07-23)` ha come primo valore `Mario`, come secondo valore `Rossi` e come terzo e ultimo valore `1970-07-23`.
* Ordinata significa che l'ordine dei valori conta. La tupla `(Mario,Rossi,1970-07-23)` è diversa dalla tupla `(Rossi,Mario,1970-07-23)`.
* \\(n\\) rappresenta il numero di valori che è anche il grado della relazione a cui la tupla si riferisce.
* Valori indica che una tupla contiene "qualcosa" che deve essere preso dai domini corrispondenti. La tupla `(Musk,XÆA-12,2020-05-04)`, ad esempio, contiene dei valori non validi per i domini associati a causa del carattere `Æ` che normalmente non può essere utilizzato per nomi o cognomi.

{{<example>}}
Riprendendo l'esempio precedente, aggiungiamo alla relazione `Studente`  due *tuple* una per lo studente *Edoardo Conte* ed una per lo studente *Raimondo Bianchi*.
{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
| Edoardo  | Conte   | 1923-08-19    |
| Raimondo | Bianchi | 1946-01-01    |
{{</table>}}
Le due tuple possono essere indicate anche nel seguente modo:
* `(Edoardo, Conte, 1923-08-19)` 
* `(Raimondo, Bianchi, 1946-01-01)`

È importante notare che, essendo le tuple sequenze *ordinate*, non si possono inserire "a piacere" i valori queste sono tuple non valide per lo schema `Studente`.
* `(1923-08-19, Edoardo, Conte)` 
* `(Bianchi, Raimondo, 1946-01-01)`
* `(Bianchi, Raimondo)`

L'ultimo esempio mostra come una tupla valida debba indicare *tutti* i valori degli attributi. Vedremo che in alcuni casi è possibile indicarne solo alcuni, ma questo è possibile **solo se sono indicati valori da inserire nel caso non siano dati esplicitamente**. Anche in questo, tuttavia, va esplicitato quali valori sono indicati esplicitamente. Ad esempio la seguente tupla `(Giacomo, 2010-01-02)` può indicare che va preso il cognome o il nome di default. Supponendo che `NULL` sia valido valore per nome e cognome, la tupla può indicare uno dei due seguenti casi:
* `(Giacomo, NULL, 2010-01-02)`
* `(NULL, Giacomo, 2010-01-02)`

L'unica soluzione è indicare esplicitamente se `Giacomo` riguarda il primo (nome) o il secondo (cognome) attributo.
{{</example>}}

Possiamo quindi dare la seguente definizione di tupla.

{{<def title="Tupla">}}
Una **tupla** per uno schema di relazione è una lista ordinata di valori \\(t_1,\ldots,t_n\\) dove ogni valore \\(t_i\\) deve essere un valore del dominio di \\(A_i\\) il quale può o meno contenere il valore `NULL`.
{{</def>}}


{{<observe>}}
Il termine *tupla* può suonare strano, si tratta infatti di una italianizzazione del termine inglese *tuple* il quale indica una sequenza di \\(n\\) valori. L'origine del termine inglese è semplice: dopo i termini pair, triple e quadruple (coppie, terne e quaterne), per indicare una sequenza di \\(n\\) valori si può scrivere \\(n\\)-tuple (ad esempio 5-tuple, 9-tuple). L'unica cosa a cui bisogna fare attenzione quando il termine inglese *tuple* viene tradotto in italiano è al singolare plurale:
* singolare: l'inglese *tuple* diventa *tupla* in italiano,
* plurale: l'inglese *tuples* diventa *tuple* in italiano.

In pratica la parola *tuple* è singolare in italiano e plurale in inglese.
{{</observe>}}

Ora che abbiamo viso cosa è lo schema di una relazione e cosa sono le tuple, possiamo finalmente definire il concetto di relazione

{{<def title="Relazione">}}
Una **relazione** per uno *schema di relazione* è un insieme di \\(m\\) *tuple* ognuna delle quali deve essere *univoca* e deve contenere un valore valido (compreso nel dominio) per ogni attributo.
{{</def>}}

Due osservazioni importanti vanno fatte rispetto alla definizione di relazione appena proposta.
* Una relazione è un **insieme** di tuple, gli insiemi sono oggetti **non ordinati** e perciò in una relazione l'ordine delle tuple non ha alcuna importanza. Le due seguenti tabelle rappresentano esattamente la stessa relazione.
{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
| Edoardo  | Conte   | 1923-08-19    |
| Raimondo | Bianchi | 1946-01-01    |
{{</table>}}
{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
| Raimondo | Bianchi | 1946-01-01    |
| Edoardo  | Conte   | 1923-08-19    |
{{</table>}}
* Ogni tupla deve essere **univoca** cioè non possono esserci "doppioni". La seguente tabelle **non** rappresenta una relazione data la presenza di righe uguali
{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
| Raimondo | Bianchi | 1946-01-01    |
| Edoardo  | Conte   | 1923-08-19    |
| Raimondo | Bianchi | 1946-01-01    |
{{</table>}}
Tuttavia la seguente tabella è una valida relazione
{{<table>}}
| Id | Nome     | Cognome | DataDiNascita |
|----|----------|---------|---------------|
| 1  | Raimondo | Bianchi | 1946-01-01    |
| 2  | Edoardo  | Conte   | 1923-08-19    |
| 3  | Raimondo | Bianchi | 1946-01-01    |
{{</table>}}
in quanto la colonna `Id` differenzia quelle con i rimanenti attributi uguali.

### Vincoli e stati validi
Lo *stato* di una relazione (righe della tabella) rappresenta la situazione del mondo reale che si sta cercando di rappresentare nella base di dati. Tuttavia, non tutte le combinazioni di valori degli attributi sono realtà possibile. Ad esempio uno studente non può avere una data di nascita nel futuro e nemmeno una data troppo nel passato. Diremo che i valori hanno dei **vincoli** che vanno rispettati, altrimenti lo stato *non è valido*. Queste tuple sono ovviamente non valide per una base di dati di una scuola.
* `(Renato, Carta, 1596-03-31)`
* `(Luisa, Turati, 2975-07-29)`

{{<attention>}}
In ogni istante l'intera base di dati deve memorizzare unicamente *stati validi* altrimenti le informazioni recuperati da esso potrebbero causare malfunzionamenti dell'applicazione (ad esempio non accettare l'iscrizione di uno studente se la data è sbagliata). È compito dello sviluppatore garantire che la base di dati sia sempre in uno stato valido. Caso in cui questo non sia garantito vanno considerati bug dell'applicazione la cui gravità dipende dagli effetti che questi bug possono avere.
{{</attention>}}

## Database relazionale
Abbiamo visto come una relazione rappresenta un'entità (ad esempio l'entità *studente*). Tuttavia, una base di dati è normalmente composta di varie entità (*studenti*, *professori*, *materie*, ...), per questo motivo un **database relazionale** di norma contiene diverse relazioni (anche centinaia nei casi più complessi) che sono tra loro collegate.

{{<example>}}
Vediamo in questo esempio un piccolo database per la memorizzazioni di informazioni relative ad una scuola. Il DB descriverà informazioni su: studenti, professori, classi e materie e dovrà indicare quali studenti appartengono a quale classe e quali professori insegnano quali materia in quali classi.

Come prima cosa individuiamo le *entità* che vogliamo considerare nel nostro DB elencano le caratteristiche (*attributi*) che ci interessano.
* **Studente**: *nome*, *cognome*, *data di nascita*, *classe*
* **Professore**: *nome*, *cognome*, *materia*
* **Materia**: *nome*, *ore settimanali*, *ore laboratorio*, *elenco insegnanti*
* **Classe**: *nome*, *aula*, *elenco studenti*

Consideriamo ora la relazione `Classe`, mentre gli attributi `Nome` e `Aula` sono semplici da definire, l'attributo `ElencoStudenti` presenta un problema. Se, ad esempio, la classe `1A` ha studenti e la classe `2A` ne ha 21, come facciamo a mettere questo in una tabella che deve avere un numero prestabilito di colonne? Una possibile soluzione è creare una tabella che abbiamo più colonne di quelle che servono (ad esempio 40) e memorizzare gli studenti uno per colonna lasciando dello spazio vuoto per le colonne in eccesso. Questa soluzione ha diversi problemi, ad esempio lo spreco di memoria perché anche un valore vuoto o `NULL` occupa spazio. Vedremo nelle prossime lezione che la soluzione passa attraverso l'attributo `Classe` della relazione studente. Infatti possiamo ottenere l'elenco degli studenti della `2A` elencando le tuple in `Studente` che hanno valore `2A` nell'attributo `Classe`. Questo meccanismo prende il nome di *chiave esterna* e verrà trattato in dettaglio in una [prossima lezione]({{<ref "02-chiavi-integrita.md#chiave-esterna" >}}).

Un ragionamento simile a quanto fatto per *elenco studenti* dell'entità *classe* può essere fatto per *elenco insegnanti* dell'entità *materia*.
{{</example>}}

{{<exercise title="Magazzino">}}
Definire le relazioni per le seguenti entità, indicando, per ogni attributo, il tipo e il dominio (ad esempio: tipo *intero* dominio *valori tra 1 e 5*).
* **Prodotto**: *codice*, *nome*, *descrizione*, *prezzo*, *quantità in magazzino*
* **Fornitore**: *codice fornitore*, *nome*, *indirizzo*, *telefono*
* **Ordine**: *data ordine*, *prodotto*, *fornitore*, *quantità*

Spiegare le scelte effettuate, specialmente per quanto riguarda l'entità *ordine*.
{{</exercise>}}



