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

## Relazione e Tupla
When a relation is thought of as a table of values, each row in the table represents a collection of related data values. A row represents a fact that typically corresponds to a real-world entity or relationship. The table name and column names are used to help to interpret the meaning of the values in each row.

{{<def title="Schema di Relazione">}}
Uno **schema di relazione** è definito da un *nome* e da una lista di *attributi* \\(A_1,...,A_n\\) il numero \\(n\\) di attributi si dice **grado** dello schema. Ad ogni singolo attributo \\(A_i\\) è associato un *dominio*.
{{</def>}}

{{<def title="Relazione">}}
Una **relazione** per uno *schema di relazione* è un insieme di \\(t\\) realizzazioni (*tuple*) dello schema.
{{</def>}}

{{<def title="Tupla">}}
Una **tupla** per uno schema di relazione è una lista ordinata di valori \\(t_1,\ldots,t_n\\) dove ogni valore \\(t_i\\) deve essere un valore del dominio di \\(A_i\\) oppure il valore `NULL`.
{{</def>}}


### Attributi
Each attribute Ai is the name of a role played by some domain D in the relation schema R. D is called the domain of Ai and is denoted by dom(Ai). A relation schema is used to describe a relation; R is called the name of this relation. The degree (or arity) of a relation is the number of attributes n of its relation schema.

## Lo stato di uno schema

### Vincoli e stati validi

## Database relazionale



