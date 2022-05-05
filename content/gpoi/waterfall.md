---
title: Modello a cascata
layout: page
materia: gpoi
align: justify
---

Nel metodo a cascata, il *ciclo di vita* del software viene suddiviso in fasi in cui ogni
fase segue dalla precedente (una dopo l'altra, in cascata). Le fasi normalmente incluse in
questo modello sono:

1. Analisi dei requisiti (requirements)
2. Progettazione (design)
3. Codifica (implementation)
4. Testing
5. Deployment
6. Manutenzione (maintenance)

Nel seguito vediamo in dettaglio queste fasi, partendo però dalla primissima fase, non
indicata nella lista sopra: lo studio di fattibilità.

## Fase 0: studio di fattibilità

Non viene ufficialmente incluso nel modello a cascata, ma lo **studio di fattibilità** precede qualsiasi altra fase.
Durante lo studio di fattibilità si cerca di capire se il software è effettivamente realizzabile date
* le tecnologie attuali
* le risorse a disposizione
* i tempi a disposizione
* ...

Inoltre, ogni azienda/organizzazione deve chiedersi se il progetto è in linea con i propri obiettivi e se il progetto
rappresenta un guadagno (soldi, brevetti, efficienza, qualità, …) per l’azienda.

## Fase 1: Analisi dei requisiti (*software requirements*)
Si tratta della prima fase di un progetto software durante la quale si  definiscono le caratteristiche del prodotto finale.
Alcune delle domande a cui questa fase deve dare una risposta sono:

* Cosa deve fare il software? Cosa non deve fare?
* Quali funzionalità deve possedere il software?
* Quali sono le esigenze di utenti, clienti, stakeholder, ...?

Il risultato dell'analisi dei requisiti è un documento o *scheda di prodotto* (*product requirements document*) che rappresenta
il riferimento del progetto. In particolare, le caratteristiche che non compaiono nella scheda di progetto, non sono da
includere. Se si decidesse di sviluppare le caratteristiche non espresse, sarebbe concepibile che queste non vengano considerate
come "lavoro utile" al momento del pagamento.

La conduzione dell'analisi dei requisiti, quindi, è un'operazione estremamente importante e deve essere condotta nel migliore
dei modi. Per un approfondimento sul concetto di requisito e sull'analisi dei requisiti si può fare riferimento alla
[seguente pagina](/content/tpsit/requisiti.html).


## Fase 2: Progettazione (*design*)
Una volta definite le caratteristiche del software, si passa alla sua progettazione. Questa fase richiede di rendere i requisiti
descritti nella scheda di progetto, delle unità di lavoro (*work packages*) da poter assegnare agli sviluppatori. Alcuni degli
elementi da considerare sono:

* i *moduli* da sviluppare,
* le *classi* da includere nei vari moduli,
* ...

Durante la fase di progettazione può essere d'aiuto l'uso di schemi quali

* [Diagramma delle classi UML](/content/tpsit/uml_classi.html)
* Diagramma di stato UML
* ...

Alla fine della progettazione si predispone un documento che descrive l’*architettura del software* (come è fatto) in
sufficiente dettaglio di modo che si possa procedere all'assegnazione del lavoro.

## Fase 3: Codifica (*implementation*)
Questa fase prevede la stesura del software in termini di

* scrittura del codice,
* documentazione del codice e del software
* debugging del codice,
* ...

## Fase 4: Testing
La fase di testing rappresenta il momento in cui il software sviluppato viene "messo alla prova" con l'intento di:

* verificare che il software non contenga bug (o che ne contenga pochi e non gravi);
* integrare i vari moduli in un unico software;
* verificare che il software soddisfi i requisiti definiti nell'analisi dei requisiti (fase 1);
* verificare le prestazioni del software (tempo di esecuzione, reattività,  *User experience*, ...) e i 
requisiti di sistema (CPU, RAM, spazio su disco, ...)

## Fase 5: Deployment
Terminata la fase di testing, il software è pronto per passare "in produzione". In questa fase si
procede con:

* l'installazione del software presso il cliente
* il testing del software nell’ambiente di produzione

Inoltre, durante il deployment, si verifica con il cliente che il software soddisfi ai requisiti individuati.
È importante sottolineare come questa verifica non sia la stessa operazione fatta durante il testing. Infatti,
mentre il testing viene, solitamente fatto dagli sviluppatori, la verifica con il cliente rappresenta il
momento cruciale in cui il software viene dichiarato come *soddisfacente le esigenze del cliente*.

## Fase 6: Manutenzione (*maintenance*)
Una volta installato presso il cliente, il software non termina il suo ciclo di vita, si potrebbe anzi dire che
è questo il momento in cui il software inizia ad essere utilizzato e a svolgere la funzione per cui è stato
progettato e sviluppato.

Per questo motivo, il software necessita di essere mantenuto in funzione nel sistema in cui opera. Questa
fase, quindi, ha diversi compiti tra cui:

* correzioni dei bug individuati durante l'utilizzo;
* aggiornamento del software (es. dopo l'installazione di un nuovo sistema operativo)
* aggiornamento delle funzionalità (es. nuove esigenze del clienti)

Va sottolineato come questa fase sia gestita fuori dal progetto propriamente detto (nel senso del *project
management*), ma all’interno di un *processo aziendale*. Se così non fosse, infatti, il rischio sarebbe che il
progetto non abbia una fine ben definita (caratteristica fondamentale di ogni progetto). 
La manutenzione, infatti di un software, infatti prosegue per tutto il suo ciclo di vita, il periodo in cui
il software rimarrà in utilizzo non solitamente noto ed è quindi impossibile dire quando finirà la manutenzione. 
Quindi, se includessimo la manutenzione nel progetto, non sapremmo dire quando il progetto finirà.

## Esercizio: modello a cascata e WBS
Dal modello a cascata si può ricavare in modo relativamente semplice una *Work Breakdown Structure* (WBS).

1. Si consideri un progetto software e si conduca l'analisi dei requisiti;
2. Per ogni fase del modello a cascata, dalla progettazione in poi, si definisce la corrispondente attività di
livello 1 della WBS;
3. Per ogni attività di livello 1, si prosegue con la definizione delle opportune attività dei livelli successivi
fino ad ottenere la lista delle attività da assegnare utilizzando la *Organization Breakdown Structure* (OBS).

[1]: https://it.wikipedia.org/wiki/Modello_a_cascata
[2]: https://en.wikipedia.org/wiki/Waterfall_model
[3]: https://en.wikipedia.org/wiki/Product_requirements_document