---
title: Larghezza di banda e latenza
running_title: "Bande e latenza"
weight: 30
type: lecture
---

I mezzi fisici si caratterizzano, tra le altre cose, anche per la velocità con
cui permettono il trasferimento dei dati. Il termine velocità come per la auto
non ha molto senso nella trasmissione dati poiché conta anche la quantità di
informazione (*bit*) trasferita. 

Due caratteristiche importanti dei mezzi fisici sono la *larghezza di banda*
(**bandwidth**) e la *latenza* (**latency**). Nella analogia spesso usata di
un tubo d'acqua, banda e latenza hanno la seguente interpretazione.
* Un tubo può portare tanta più acqua quanto più è largo, questa *portata*
è l'analogo della *larghezza di banda*.
* Un tubo d'acqua più è lungo più tempo richiede ad essere percorso (immaginando
di percorrerlo alla massima velocità possibile), questo *tempo di percorrenza*
è l'analogo della *latenza*. Vediamo ora più in dettaglio questi concetti e come
si misurano e utilizzano.

## Larghezza di banda (*bandwidth*)
La *larghezza di banda* indica la quantità di bit che possono attraversare il
collegamento in un tempo prestabilito (ad esempio in un secondo). La banda si
misura in *bit al secondo* `bps` (*bit per second*) e suoi multipli: kilobit
al secondo `kbps`, megabit al secondo `Mbps`, gigabit al secondo `Gbps` e così
via.

## Latenza (*latency*)

## Throughput
La [larghezza di banda]({{<ref "#larghezza-di-banda-bandwidth" >}}) rappresenta
la quantità massima di bit trasferibili nell'unità di tempo, tuttavia il picco
di prestazione non quasi mai raggiunto. 

Il numero di bit che *veramente* attraversa un segmento della rete nell'unità
di tempo viene detto *throughput* \\(T)\\ e può solo essere misurato. L'unica
cosa sicuramente vera è che *il throughput non può essere maggiore della banda*:

$$ T \leq B $$

Altro non si può dire dal punto di vista teorico, ma deve essere misurato sul
campo.
