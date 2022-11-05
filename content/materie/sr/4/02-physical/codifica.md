---
title: Codifica
weight: 20
type: lecture
---

Avendo stabilito il *mezzo di comunicazione* è necessario che i dispositivi di
trasmissione e ricezione si "accordino" su come misurare l'informazione (i bit)
sul mezzo di trasmissione. Ad esempio, se sul cavo di rame si pattuisce che una
tensione di +5V indichi un bit 1 mentre una tensione di 0V indichi un bit 0,
rimane il problema di decidere "quando" misurare la tensione per rilevare i bit.

Ad esempio consideriamo il seguente segnale dati.

{{<include "img/codifica_bit.html">}}

Può sembrare naturale associare a questo segnale  la sequenza di bit `010110011`,
tuttavia la "corretta" sequenza di bit dipende da "quando" il segnale viene misurato
e quindi dal [**clock**]() che viene usato per la sua *temporizzazione*. Il seguente
esempio

{{<include "img/codifica_bit_clock.html">}}

Mentre il primo clock (secondo segnale in figura) porterebbe alla ricostruzione
sopra indicata (cioè `010110010`), il secondo clock darebbe come sequenza ``00100``).

## Codifiche
Risulta quindi chiara la necessità di mettersi d'accordo sul modo di *decodificare*
i bit a partire dal *segnale* presente sul mezzo di comunicazione.

### Non Return to Zero (NRZ)
Nella codifica *Non Return to Zero (NRZ)* il segnale viene letto ad intervalli
periodici sulla base di un [clock](). Tipicamente il segnale ha due valori di segno
opposto per i bit, ad esempio +5V per il bit `1` e -5V per il bit `0` Ad ogni lettura
il segnale codificato in NRZ rimane al livello corrispondente  senza mai ritornare
ad un livello di base (lo zero), da questo deriva il nome della codifica.

{{<include "img/codifica_nrz.html" >}}

### Non Return to Zero Inverted (NRZI)
Anche se il nome ricorda la codifica NRZ, in realtà *Non Return to Zero Inverted
(NRZI)* è molto diversa da NRZ. Nella codifica NRZI, infatti, è importante il fatto
che ci sia o meno una *transizione* da un livello ad un altro (ad esempio da +5V
a -5V). Più nello specifico NRZI misura il segnale utilizzando un clock e sceglie
il bit con la seconda regola:
* se il segnale è cambiato di valore rispetto alla misura precedente, allora il bit
è `1`,
* altrimenti (segnale uguale alla misura precedente) il bit è `0`.

{{<include "img/codifica_nrzi.html" >}}

### Manchester
Nella codifica Manchester, i valori `0` e `1` vengono associate alle *transizioni*
del segnale da un livello ad un altro. In pratica il segnale viene interpretato
nel seguente modo:
* il passaggio dal valore alto al valore basso viene associato al bit `1`,
* il passaggio dal valore basso al valore alto viene associato al bit `0`.

{{<include "img/codifica_manchester.html" >}}

<div class="text-danger">
ss
</div>