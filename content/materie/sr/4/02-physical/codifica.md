---
title: Codifica
weight: 20
---

Avendo stabilito il *mezzo di comunicazione* è necessario che i dispositivi di trasmissione e ricezione si "accordino" su come misurare l'informazione (i bit) sul mezzo di trasmissione. Ad esempio, se sul cavo di rame si pattuisce che una tensione di +5V indichi un bit 1 mentre una tensione di 0V indichi un bit 0, rimane il problema di decidere "quando" misurare la tensione per rilevare i bit.

Ad esempio consideriamo il seguente segnale dati.

{{<include "img/codifica_bit.html">}}

Può sembrare naturale associare a questo segnale  la sequenza di bit `010110011`, tuttavia la "corretta" sequenza di bit dipende da "quando" il segnale viene misurato e quindi dal [**clock**]() che viene usato per la sua *temporizzazione*. Il seguente esempio

{{<include "img/codifica_bit_clock.html">}}

Mentre il primo clock (secondo segnale in figura) porterebbe alla ricostruzione sopra indicata (cioè `010110010`), il secondo clock darebbe come sequenza ``00100``).

