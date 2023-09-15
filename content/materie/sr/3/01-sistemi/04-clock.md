---
title: Clock
type: lecture
weight: 400
---
Il clock è un segnale periodico utilizzato per *temporizzare* dei circuiti elettronici. Ricordiamo che un **segnale** è una *quantità fisica che varia nel tempo*. Solitamente nei circuiti elettronici il clock viene realizzato mediante una tensione di corrente che varia nel tempo. Un segnale periodico è un segnale che si ripete uguale indefinitamente. La parte del segnale di clock che viene ripetuta si chiama **ciclo di clock**, la durata della parte ripetuta si chiama **periodo**.

{{<include "img/clock_def.html">}}

La figura mostra un esempio di clock mediante un'onda quadra (si noti la forma "quadrata" del segnale). Essendo un segnale periodico, il clock si ripete ad intervalli regolari che chiamiamo periodi. La durata del periodo è solitamente espressa in secondi. Nei clock ad onda quadra il passaggio dalla tensione bassa alla tensione alta viene chiamato **fronte di salita** (*rising edge*) mentre il passaggio dalla tensione alta alla tensione bassa viene detto **fronte di discesa** (*falling edge*).

### Periodo e Frequenza
Come visto sopra, il periodo è il tempo tra l'inizio di due **cicli** consecutivi. Ad esempio un periodo di 0.1 secondi [s] (cioè 100 millisecondi [ms]) significa che il clock è un segnale che si ripete identicamente ogni 0.1 s, un altro modo di dirlo è che 10 volte al secondo il clock si ripete. Questa è la **frequenza** con cui il clock si ripete e si misura in *Hertz* [Hz]. La relazione tra periodo e frequenza è una relazione inversa.

$$ Frequenza = \frac{1}{Periodo} $$

Nel nostro esempio il clock ha un frequenza di 10 Hz perché si ripete 10 volte al secondo. Se invece si vuole ottenere il periodo di un segnale (es. un clock) avendo la frequenza, la relazione rimane inversa e si può ottenere dalla seguente formula.


$$ Periodo = \frac{1}{Frequenza} $$

Ad esempio un clock con una frequenza di 3 GHz (3 miliardi di Hz), il periodo è

$$ \frac{1}{3000000000} = 0.0000000000333 = 0.333 ns$$

### Temporizzazione mediante clock
Il segnale di clock serve a **dare il tempo** ad un circuito elettronico (ad esempio alla RAM, alla CPU, ...). La *temporizzazione* del circuito è necessaria in quanto serve che ogni parte del circuito misuri un segnale (ad esempio un bit su una linea del bus) in momenti ben precisi (ad esempio, per evitare di misurare il valore "vecchio" di un bit). Per capire il funzionamento del clock come temporizzatore, vediamo un esempio con un segnale.

{{<include "img/clock_examples.html">}}

Nella figura a sopra si vedono tre esempi ognuna con due clock diversi. Il segnale è lo stesso in tutti e tre gli esempi.
* Nel primo caso, il Clock 2 ha periodo doppio (quindi metà frequenza) rispetto al Clock 1. Per questo motivo vediamo che la sequenza di bit ricostruita contiene il doppio (circa) del numero di bit. Infatti utilizzando il Clock 1 si ricostruisce ``00111101100`` mentre utilizzando Clock 2 si ricostruisce ``011010``.
* Nel secondo caso i due clock hanno la stessa frequenza, ma sono sfasati, infatti le "salite" del prima sono allineate alle discese del secondo. Le due sequenze ricostruite sono: ``00111100100`` e ``0110100010``. Come si vede le due sequenze sono diverse.
* Infine nel terzo esempio sono indicate le frecce nel clock. Le frecce indicano il fronte del clock su cui misurare il segnale. Nel caso del fronte di discesa (come in Clock 1), il segnale va misurato quando il clock scende cioè passa da alto a basso. In questo caso i bit calcolati sono ``01101000101``. Nel caso del fronte di salita (come nel Clock 2) , il segnale va misurato quando il clock sale, cioè passa da basso ad alto. In questo caso i bit calcolati sono ``00111101100``.


