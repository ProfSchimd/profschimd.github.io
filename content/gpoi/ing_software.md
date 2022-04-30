---
title: Ingegneria del software
layout: page
materia: gpoi
align: justify
---

La disciplina del *project management* si occupa dello studio delle tecniche e delle metodologie per la
gestione dei progetti di natura qualsiasi (ponti, missioni spaziali, software, progetti sociali, ...).
Ovviamente ogni tipologia di prodotto/servizio risultante da un progetto ha caratteristiche proprie e
non è pensabile che le tecniche di project management generico siano sufficiente ad affrontare qualsiasi
progetto nel migliore dei modi.

La disciplina che si occupa della progettazione e dello sviluppo di progetti software è chiamata **ingegneria
del software** di cui diamo una definizione sotto

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-text"></i> Definizione: <strong>Ingegneria del software</strong></h5>

L' **ingegneria del software** (**software engineering** in inglese) è quella disciplina informatica che si occupa dei processi produttivi e delle metodologie di sviluppo finalizzate alla realizzazione di sistemi software. Si propone una serie di obiettivi legati all'evoluzione dello sviluppo del software (inteso come attività industriale) sia da un punto di vista tecnologico (per es. attraverso la definizione di nuovi linguaggi di programmazione) che metodologico (per esempio il perfezionamento dei modelli di ciclo di vita del software).
(Fonte: [Wikipedia, 2022](https://it.wikipedia.org/wiki/Ingegneria_del_software))
</div>

Di questa lunga definizione esaminiamo alcuni concetti importanti.
* *Disciplina informatica*: si tratta, quindi, di una materia (disciplina) che deve essere nota ad ogni
bravo informatico.
* *Processi produttivi*: l'insieme delle attività che hanno l'obiettivo di *sviluppare* (*develop* in inglese)
il prodotto/servizio, in questo il *sistema software*. 
* *Sistemi software*: il prodotto sviluppato in ambito di *software development* quali, ad esempio, sito web,
software gestionale, ...
* *Tecnologico*: l'insieme degli strumenti e delle *tecnologie* utilizzate nello sviluppo quali, ad esempio,
linguaggi di sviluppo e IDE, piattaforma di sviluppo (cloud, server locale), ...
* *Metodologico*: come utilizzare nel migliore dei modi gli strumenti per lo sviluppo software (*test-driven
development*, software *design pattern*) e come organizzare i processi di sviluppo (*ciclo di vita* del software,
gestione dei *bug*, ...).

Volendo parafrasare, possiamo dire che *l'ingegneria del software è la materia che si occupa
delle attività di creazione di software studiando gli strumenti software ed il loro utilizzo*.
Lo scopo è, ovviamente, quello di **soddisfare i requisiti del cliente** (cliente che può
essere *interno* o *esterno*).

## Processo di sviluppo del software
Vediamo ora

### Il ciclo di vita del software
La maggior parte degli oggetti che compriamo ed utilizziamo ha un proprio **ciclo di vita** che inizia nel
momento in cui esso viene *concepito* e/o *progettato* e termina quando l'oggetto vine *dismesso*.
I prodotti software non sono un eccezione e l'ingegneria del software si occupa di tutte le fasi del ciclo
di vita di un software che possiamo descrivere in modo molto semplificato come
1. Progettazione
2. Sviluppo
3. Manutenzione

Ovviamente, ognuna di queste tre fasi viene poi suddivisa in sotto-fasi che poi sono studiate singolarmente.
Ci sono diversi modi in cui questa suddivisione può essere fatta, una molto utilizzata viene chiamata
[Software Development Life Cycle (SDLC)][1] e prevede nove fasi.

1. **Analisi preliminare** (*preliminary analysis*): viene effettuata per comprendere se il progetto è
fattibile, quali sarebbero i costi (stimati grossolanamente), quali risorse si possiedono e quali si
dovrebbero acquisire. Inoltre si valuta se il progetto ha un **rapporto costo/benefici** in linea con
gli obiettivi dell'azienda.
2. **Analisi e definizione dei requisiti** (*systems analysis, requirements definition*): sulla base delle
esigenze dei clienti, si identificano le funzionalità del sistema (*analisi dei requisiti*). Raccolti i
requisiti si passa poi alla definizione degli obiettivi del progetto.
3. **Progettazione** (*software design*): le funzionalità del sistema sono definite e rese esplicite in
un documento da consegnare agli sviluppatori (es. diagrammi [UML dei casi d'uso](/content/tpsit/uml_use_case.html)).
Inoltre il sistema nel suo complesso viene progettato di modo che si possa procedere alla suddivisione
dei compiti tra i vari componenti del team di sviluppo.
4. **Sviluppo** (*development*): le varie parti del software vengono sviluppate e codificate.
5. **Integrazione e testing** (*integration and testing*): i vari moduli vengono collegati in un unico
software e le funzionalità vengono testate.
6. **Accettazione e deploy** (*acceptance and deployment*): 
7. **Mantenimento** (*maintenance): il software nell'ambiente reale ("in produzione") viene
monitorato per individuare *bug* e modifiche che si rendano necessarie.
8. **Valutazione** (*evaluation*): si valuta se il prodotto finale (il software sviluppato e ora in
esecuzione) è conforme ai requisiti dei clienti (sia quelli espressi inizialmente sia quelli raccolti
durant l'utilizzo del software stesso). Questa fase viene spesso trascurata, ma è fondamentale per
individuare eventuali problemi nella fase di progettazione e sviluppo, la domanda fondamentale è
"perché qualcosa nel software consegnato non è come ci si aspettava ad inizio sviluppo?"
9. **Dismissione** (*disposal*): si procede all'abbandono del sistema solitamente migrando ad un nuovo
sistema.

<div class="alert alert-danger" markdown="1">
<h5 class="no_toc"><i class="bi bi-exclamation-triangle"></i> Attenzione</h5>

Il *project plan* relativo ad un progetto software, non coincide con il ciclo di vita del
software stesso. Innanzitutto, il piano di progetto va preparato prima di iniziare la fase
di progettazione e sviluppo del software stesso. Inoltre, la fase di manutenzione viene
solitamente gestita al termine del progetto, in altre parole mentre sviluppare un sistema
software è solitamente un *progetto*, farne la manutenzione è normalmente un *processo*.
</div>

[1]: https://en.wikipedia.org/wiki/Systems_development_life_cycle



