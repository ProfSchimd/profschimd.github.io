---
title: Programmazione asincrona
layout: page
materia: tpsit
align: justify
---

## Programmazione sequenziale
Normalmente siamo abituati a pensare ad un programma come ad una **sequenza di istruzione**, questo è in effetti quello che accade all'interno di un core della CPU che esegue continuamente il [ciclo di fetch-and-execute](/content/sr/cpu.html). Per questo motivo si parla anche di **programmazione sequenziale** nel qual caso il compito del programmatore è trovare la giusta sequenza di istruzione (siano esse istruzioni Java, C++, assembly, ...).

<div class="row">
<div class="col-8" markdown="1">

Tuttavia, se si pensa a come oggi usiamo i nostri dispositivi (smartphone, laptop, PC, ...), ci si accorge subito che non si tratta di un un "uso sequenziale". Siamo ormai abituati ad interagire con il dispositivo e ad aspettarci che reagisca al nostro input (tap, click, swipe, ...). In pratica un dispositivo moderno è un oggetto in grado di reagire ad **eventi** che si verificano quali:

* tap di un icona,
* click di un bottone con il tasto destro del mouse,
* inserimento di un carattere dalla tastiera,
* gesture di "scuotimento" del dispositivo,
* ...

in questo scenario è normale domandarsi se esista qualcosa di meglio della programmazione sequenziale per gestire tutti questi input.

</div>
<div class="col-4" markdown="1">

![Immagine smartphone](img/iphone.jpeg)
</div>
</div>

## Programmazione ad eventi


