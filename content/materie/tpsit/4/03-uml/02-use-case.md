---
title: "Diagrammi dei casi d'uso UML"
running_title: "Diagramma dei Casi d'uso"
weight: 200
type: lecture
---

In [questa pagina]({{<ref "00-requisiti.md" >}}) viene brevemente discussa la
problematica della *raccolta e analisi dei requisiti* di un software. Affinché
tale operazione risulti pienamente efficace, si deve procedere alla
**documentazione** di tali requisiti. In questo pagina discutiamo ciò che
lo standard UML mette a disposizione a questo scopo:  i **diagrammi dei casi d'uso**
(*use-case diagram*).

Come tutti i diagrammi UML, anche i diagrammi dei casi d'uso sono rappresentazioni
grafiche che seguono specifiche regole. I diagrammi dei
casi d'uso contengono informazioni su:
* il *sistema* software in esame,
* gli *attori* che interagiscono con il sistema,
* i *casi d'uso* che coinvolgono gli attori ed il sistema e
* le *relazioni* tra casi d'uso e tra attori.

Cominciamo con il semplice esempio semplice mostrato nella figura sottostante.

{{<include "img/uml_usecase_player.html">}}

Il diagramma è tutto contenuto in un rettangolo che rappresenta l'intero caso
d'uso, in questo caso `Videogame use case`. All'interno di questo rettangolo
troviamo un ulteriore zona denominata nell'esempio `System boundary` che
rappresenta schematicamente il sistema software. Può succedere che questa
delimitazione (sia del caso d'uso, sia del sistema) venga omessa in quanto
sottintese.

La parte più importante del diagramma è rappresentata dagli **attori** indicati
con delle persone stilizzate e u **casi d'uso** indicate con degli ovali. Nella
figura sopra abbiamo un solo attore `Player` e 5 casi d'uso `Start game`,
`Load game`, `New game`, `Save game` e `View score`. Inoltre esistono
collegamenti di due tipi: uno tra attori e casi d'uso e uno tra casi d'uso. Un
collegamento tra un attore e un caso d'uso indica che quell'attore interagisce
con il sistema facendo un'azione che è indicata nel collegamento. Ad
esempio nella figura vediamo che `Player` interagisce con il sistema
premendo il bottone `start` (azione `hits "start"`) a cui il sistema risponde
attivando la procedura `Start game`. Il secondo tipo di collegamento,
rappresentato da una freccia tratteggiata con etichetta `<<extend>>`, indica
una *relazione di specializzazione* tra casi d'uso. Nell'esempio vediamo che ci
`Start game` ha due possibili specializzazioni `Load game` e `New game`
ad indicare la possibilità
di iniziare un gioco precedentemente salvato o un nuovo gioco. Chiaramente
entrambe queste azioni sono un "inizio di gioco", ma il sistema farà operazioni
diverse nei due casi, per questo motivo vengono suddivisi in casi specializzati.

{{<exercise>}}
1. Disegnare il diagrammo dei casi d'uso per le operazioni di installazione di un
nuovo software. Rappresentare l'attore `Sistemista` e i casi d'uso: `Install`,
`Uninstall`, `Update`. 
1. Se è possibile installare due versioni diverse dello stesso software, ad esempio
in italiano ed in inglese, come modificheresti il diagrammo creato al punto precedente?
{{</exercise>}}

## Dall'analisi dei requisiti al diagramma dei casi d'uso

Vediamo ora come si possa procedere a descrivere i *requisiti* di un software in forma
di diagramma UML dei casi d'uso. Consideriamo la seguente *specifica* del comportamento
di una parte di un software gestionale.

{{<example title="software gestionale">}}
**Gestione dell'anagrafica fornitori** Il software deve permettere di: consultare,
modificare e stampare una schermata (eventualmente composta di più pagine) che
contenga l'elenco dei fornitori (ordinabile secondo l'ordine alfabetico) di modo
che per ogni fornitore siano mostrate le informazioni di: ragione sociale, indirizzo
legale, sito web del fornitore. L'azienda prevede, inoltre, di impiegare *stagisti* in
alternanza scuola-lavori i quali possono visualizzare l'anagrafica fornitori, ma
non possono in alcun modo modificarla.
{{</example>}}

{{<include "img/uml_usecase_fornitori.html">}}

