---
title: La comunicazione
type: lecture
weight: 100
summary: "Una rete serve principalmente a comunicare, per comprendere meglio il concetto di rete, quindi, questa lezione introduce i concetti importanti di una comunicazione: mittente, ricevente, canale, errore, ..."
---

Per capire bene come funziona una rete, bisogna prima capire *a cosa serve* una rete.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/alice_bob.html">}}
Nella comunicazione rappresentato in figura, due persone vogliono scambiarsi dell'informazione: Alice vuole l'ultima versione del documento su cui Bob sta lavorando. Bob è in *smart working* per la pandemia e manderà ad Alice una copia elettronica del documento richiesto. Notiamo che quando Alice chiede via email il documento a Bob, *Alice spedisce e Bob riceve*. Quando Bob manda il documento ad Alice, invece, Bob spedisce ed Alice riceve. Questo esempio, quindi, coinvolge *due diverse comunicazioni*.

Per comunicare Alice e Bob useranno la rete Internet che è il **mezzo di comunicazione** scelto dai due. Se Bob non fosse stato in smart working, Alice avrebbe potuto chiedere a voce il documento a Bob. In questo caso il mezzo di comunicazione sarebbe stato quello orale (anziché Internet per spedire l'email). Bob avrebbe potuto mandare il documento in formato elettronico usando Internet come mezzo di comunicazione, oppure stamparne una copia fisica e consegnarla ad Alice, usando la carta e l'inchiostro come mezzo do comunicazione.
{{</column/two-cols>}}

## Cos'è una comunicazione
{{<def>}}
Una **comunicazione** è uno *scambio di informazioni* tra due entità, un **mittente** che *trasmette* l'informazione ed un **ricevente** che *riceve* l'informazione. Il mezzo (ad esempio Internet) con cui l'informazione viene trasmessa si chiama **canale (o mezzo) di comunicazione (o trasmissione)**.
{{</def>}}

## Studiare le reti
Lo studio delle reti ha come scopo comprendere, configurare e gestire le reti in modo che mittente e ricevente possano comunicare senza problemi. Infatti durante una comunicazione si possono verificare problemi legati ad **errori** di trasmissione, questi problemi possono essere la perdita di informazione o la modifica dell'informazione stessa.

## La rete Internet
Per poter comunicare a *livello globale*, serve molto più che un semplice cavo di rame come nei "vecchi" sistemi telefonici. Quello che serve **è un complessa sistema di hardware e software che colleghi tra loro dispositivi diversi che possono anche trovarsi in posti distanti**. Il sistema che oggi si usa per le comunicazioni si chiama **{{<colored "danger" "Internet">}}** (con la 'I' maiuscola!) ed è basato su [architetture di rete]({{<ref "02-architettura-rete.md">}}) e [protocolli di rete]({{<ref "03-protocolli.md">}}) che sono il tema principale della materia Sistemi e Reti (specialmente durante il quarto e quinto anno).

## Domande e Esercizi

### Domande
* A cosa serve la comunicazione?
* Che cosa serve affinché avvenga una comunicazione?

### Esercizi

* Prepara un documento in cui spieghi le regole secondo le quali deve avvenire una comunicazione tra persone durante una riunione di persona.
* Fai lo stesso esercizio del punto precedente immaginando che la riunione avvenga in teleconferenza.
