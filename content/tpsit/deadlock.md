---
title: Deadlock
layout: page
materia: tpsit
align: justify
---

La [*sincronizzazione*](/content/tpsit/sincronizzazione.html) è una tecnica che permette
di fissare l'ordine di esecuzione di thread. Con la sincronizzazione è possibile, quindi,
imporre delle regole del tipo *il thread A deve finire prima del thread B* oppure *il
thread C deve partire quando i thread D, E ed F sono terminati*. Di conseguenza le tecniche
di sincronizzazione sono molto utili e vengono spesso usate nella *programmazione concorrente.
Tuttavia l'utilizzo della sincronizzazione può avere anche effetti negativi, a volte "gravi",
come quello del **deadlock** che discutiamo qui sotto.

Per capire meglio cosa succede durante un *deadlock*, consideriamo una situazione di
"deadlock" al di fuori dell'ambito informatico. Prendiamo tre classi: terza, quarta e quinta
B, queste classi hanno gli stessi insegnanti di italiano, di inglese e di matematica. Secondo
il regolamento d'istituto, al cambio dell'ora l'insegnante può lasciare la classe solo dopo
che è arrivato l'insegnante dell'ora successiva (esclusa l'ultima ora). Supponiamo che alla
fine della seconda ora:

* l'insegnante di italiano attende quello di inglese in terza,
* l'insegnante di matematica attende quello di italiano in quinta e
* l'insegnante di inglese attende quello di matematica in quarta.

Cosa succede in questa situazione?

{% include_relative img/thread_scheduling.html %}

È evidente che in questa situazione si ha uno **stallo**
infatti:

* l'insegnante di italiano non si sposta fino a che non arriva quello di inglese 
* il quale non si sposta (e non sbloccherà quello di italiano) finché non arriva quello di
matematica
* il quale non si sposta (e non sbloccherà quello di inglese) finché non arriva quello di
italiano che non arriverà mai in quanto bloccato in attesa.

## Deadlock nei thread
