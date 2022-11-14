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

La larghezza di banda può essere vista come una misura della *portata* (in
termini di bit) del collegamento. In un'analogia con la portata idraulica di un
tubo, la banda esprime *quanto liquido è in grado di portare*.

La larghezza di banda, che indichiamo con \\(B\\) può utilizzato, ad esempio, per
stimare il tempo necessario a trasferire una determinata quantità di bit.
Supponiamo di dover spedire un pacchetto di dimensione \\( D \\) **misurata
in bit**, allora il tempo *minimo* \\( t \\) necessario con una banda \\( B \\)
sarà (indicando tra quadre le unità di misura)

$$ t [sec] = \frac{D [bit]}{B [bit/sec]}$$

{{<attention>}}
Quando la dimensione *non è espressa in bit* (come spesso accade), prima di applicare
la formula sopra, è necessario convertire la dimensione in bit. Normalmente si tratta
di una conversione da *byte* (o multipli) in *bit*, nel qual caso la dimensione va
moltiplicata per 8

$$ D[bit] = 8 \cdot D[byte] $$

Va inoltre ricordato che in termini informatici i multipli sono espressi come
potenze di 2 anziché potenze di 10:
* \\( 1 Kb = 2^{10} \ byte = 1024 \ byte \\)
* \\( 1 Mb = 2^{20} \ byte = 1048576 \ byte \\)
* ...
{{</attention>}}

{{<example>}}
Su un collegamento a \\(1 Gbps\\) viene trasferito un file, quanto tempo è
necessario?
* Se il file ha una dimensione di \\( 1 Kb \\)?
* Se il file ha una dimensione di \\( 100 Kb \\)?
{{</example>}}

## Latenza (*latency*)
La *latenza* indica il tempo necessario ad un bit ad attraversare il collegamento,
questo tempo non è zero, quindi **non esiste comunicazione istantanea**, ma
dipende anche dalla velocità con cui l'informazione viaggia sul mezzo fisico
(velocità che non può essere mai maggiore di quella della luce circa 300 mila
chilometri al secondo).

La latenza si può calcolare anche su percorso che può comprendere tanti collegamenti
fisici e tanti dispositivi intermedi (access point, switch, router, ...). In questo
caso ci sono tanti fattori che aumentano la latenza:
* numero e lunghezza di tutti i collegamenti del percorso;
* traffico presente lungo il percorso;
* livello di *congestione* dei dispositivi intermedi;
* ...

### Round Trip Time (RTT)
Molte volte è necessario sapere il tempo impiegato da un bit per compiere un
intero percorso di *andata e ritorno* verso un dispositivo remoto, questo
valore viene chiamata *Round Trip Time (RTT)*. 

È possibile stimare il valore del RTT utilizzando programmi come `ping`, ad
esempio qui sotto vediamo l'esito del comando `ping google.com`:

```
64 bytes from 142.251.143.142: icmp_seq=0 ttl=114 time=28.905 ms
64 bytes from 142.251.143.142: icmp_seq=1 ttl=114 time=29.224 ms
64 bytes from 142.251.143.142: icmp_seq=2 ttl=114 time=33.102 ms
64 bytes from 142.251.143.142: icmp_seq=3 ttl=114 time=54.332 ms
```

In questo caso il valore RTT può essere ottenuto calcolando la media
dei valori forniti dal comando `ping`. 

{{<important>}}
Quando il valore della latenza non è disponibile, è possibile
utilizzare il RTT per la sua stima secondo la seguente formula

$$ \textrm{Latency} = \frac{\textrm{RTT}}{2} $$

Ovviamente si può usare la formula inversa nel caso sia disponibile
la latenza, ma non il RTT

$$ \textrm{RTT} = 2 \cdot \textrm{Latency} $$
{{</important>}}

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

### Esercizio su banda e latenza
Consideriamo la topologia di rete presentata nella figura sottostante e
corredata dalle informazioni sui dati

{{<column/two-cols wl=4 wr=8 content="left" embed="img/exercise_band.html">}}
* Tutti i collegamento `PC <-> Switch` sono a \\( 100~Mbps \\) con latenza \\( 15~ms \\)
* I collegamenti wireless sono a \\( 50~Mbps \\) con latenza \\( 45~ms \\)
* I collegamento tra router e Switch e AP sono a \\( 10~Gbps \\) con latenza \\( 15~ms \\)
* I collegamenti `SER <-> Router` sono a \\( 1~Gbps \\) con latenza \\( 10~ms \\)
* Router, Access Point e switch sono store and forward (inoltrano dopo aver ricevuto l’intero pacchetto)
* Tutti i pacchetti hanno dimensione \\( 1500~byte \\) con header di \\( 40~byte \\).
{{</column/two-cols>}}

1. Quale è il Round-Trip-Time (RTT) tra PC1 e SER3 se sia messaggio che conferma sono inviati mediante pacchetti da 1500 Byte? Giustifica la risposta
2. Quale è il Round-Trip-Time (RTT) tra NB1 e SER1 se sia messaggio che conferma sono inviati mediante pacchetti da 1500 Byte? Giustifica la risposta
3. PH1 deve trasferire 5840 Byte sul server SER2, quanti pacchetti deve spedire? NB1 deve spedire 8760 Byte su SER3, quanti pacchetti deve spedire? AP1 riceve contemporaneamente i pacchetti da NB1 e PH1 e li inoltra alternatamente (prima un pacchetto di NB1 poi un pacchetto di PH1 e così via) quanti pacchetti totali AP1 inoltra verso ROUTER1 e quanto tempo impiega complessivamente?  Giustifica tutte le risposte.
4. Oltre ai pacchetti della domanda precedente, ROUTER1 riceve altri pacchetti da SWITCH1 per complessivi (header e dati) 12000 Byte (tutti direzionati a SER1). Quanti pacchetti complessivamente riceve ROUTER1? Tenendo conto del fatto che ROUTER1 è store-and-forward e che esso può trasmettere in uscita (cioè verso i server) non appena riceve completamente un pacchetto. Se tutti i pacchetti iniziano ad arrivare allo stesso momento, quanto impiega ROUTER1 a consegnare il primo pacchetto a SER1, SER2 e SE3? Quanto impiega a consegnare tutti i pacchetti a SER1, SER2 e SER3?
