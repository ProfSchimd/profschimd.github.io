---
title: Larghezza di banda e latenza
running_title: "Bande e latenza"
weight: 30
type: lecture
---

{{<think title="Dibattito in classe su...">}}
Cosa consideri quando decidi di utilizzare un tipo di connessione anziché un altro (ad esempio rete cablata anziché rete senza fili)?
{{</think>}}

Diversi *mezzi fisici* permettono **velocità** di trasferimento dei dati, ma cosa si intende con il termine velocità? Quando si parla di velocità si pensa al tempo che serve per trasferire qualche cosa, ma non a *quanto* si trasferisce. Nella trasmissione dati, quindi, dobbiamo sia considerare con che velocità riusciamo a trasmettere l'informazione sia quanta informazione riusciamo a trasmettere. 

Le due caratteristiche dei mezzi fisici che si legano a quantità e velocità sono la **larghezza di banda** (**bandwidth**) e la **latenza** (**latency**). Spesso si usa l'analogia tra trasmissione dati e trasporto di qualcosa di fisico, ad esempio dell'acqua all'interno di un tubo:
* Un tubo può portare tanta più acqua quanto più è largo, questa *portata* è l'analogo della *larghezza di banda*;
* Un tubo più lungo richiede più tempo ad essere percorso, questo *tempo di percorrenza* è l'analogo della *latenza*.

## Larghezza di banda (*bandwidth*)
La *larghezza di banda* indica la quantità di bit che possono attraversare il collegamento in un tempo prestabilito (ad esempio in un secondo). La banda si
misura quindi in *bit al secondo* `bps` (*bit per second*, attenzione alla `b` minuscola) e suoi multipli: kilobit al secondo `kbps` (\\(10^3\\) bps), megabit al secondo `Mbps` (\\(10^6\\) bps), gigabit al secondo `Gbps` (\\(10^9\\) bps). 

{{<important>}}
L'unità di misura `bps` è in realtà l'unità \\(bit/s\\) (*bit* diviso *secondi*), simile alla misura in \\(m/s\\) (o \\(Km/h\\)) per la velocità di cambiamento della posizione.
{{</important>}}

La larghezza di banda può essere vista come una misura della *portata* (in termini di bit),  *quanto "liquido" è in grado di portare il nostro tubo*.

La larghezza di banda, che indichiamo con \\(B\\) può essere utilizzata, ad esempio, per stimare il tempo necessario a trasferire una determinata quantità di bit. Supponiamo di dover spedire un pacchetto di dimensione \\( D \\) **misurata in bit**, allora il tempo *minimo* \\( t \\) necessario con una banda \\( B \\) sarà (indicando tra quadre le unità di misura)

$$ t [sec] = \frac{D [bit]}{B [bit/s]}$$

{{<attention>}}
Quando la dimensione *non è espressa in bit* (come spesso accade), prima di applicare la formula sopra, è necessario convertire la dimensione in bit. Normalmente si tratta di una conversione da *byte* (o multipli) in *bit*, nel qual caso la dimensione va moltiplicata per 8

$$ D [bit] = 8 \cdot D [byte] $$

Va inoltre ricordato che in informatica i multipli dei byte sono espressi come potenze di 2 anziché potenze di 10:
* \\( 1 Kb = 2^{10} \ byte = 1024 \ byte \\)
* \\( 1 Mb = 2^{20} \ byte = 1048576 \ byte \\)
* ...

Tuttavia ricordiamo che **la banda in bit al secondo usa le potenze di 10**.
{{</attention>}}

{{<example>}}
Su un collegamento a \\(1 Gbps\\) viene trasferito un file, quanto tempo è necessario?
* Se il file ha una dimensione di \\( 1 Kb \\)?
* Se il file ha una dimensione di \\( 100 Kb \\)?
{{</example>}}

## Latenza (*latency*)
La *latenza* indica il tempo necessario ad un bit ad attraversare il collegamento, questo tempo non è mai zero, quindi **non esiste comunicazione istantanea**, ma dipende dal mezzo fisico. Tuttavia, possiamo dire che *per ogni mezzo fisico* la velocità non potrà superare quella della luce pari a circa 300 mila chilometri al secondo.

{{<think title="Londra - New York">}}
Quanto è il minimo tempo necessario a trasferire un bit tra Londra e New York?
{{</think>}}

La latenza si può calcolare anche su percorso che può comprendere tanti collegamenti fisici e tanti *dispositivi intermedi* (switch, router, ...). In questo caso ci sono diversi fattori che possono far aumentare la latenza:
* numero e lunghezza dei vari collegamenti;
* traffico presente lungo il percorso;
* livello di *congestione* dei dispositivi intermedi;
* ...

### Round Trip Time (RTT)
Spesso è utile conoscere il tempo impiegato da un pacchetto per l'intero percorso di *andata e ritorno*, questo valore viene chiamata **Round Trip Time (RTT)**. 

Il valore del RTT è stimato dal programma `ping`, ad esempio eseguendo comando `ping google.com`:

```shell
64 bytes from 142.251.143.142: icmp_seq=0 ttl=114 time=28.905 ms
64 bytes from 142.251.143.142: icmp_seq=1 ttl=114 time=29.224 ms
64 bytes from 142.251.143.142: icmp_seq=2 ttl=114 time=33.102 ms
64 bytes from 142.251.143.142: icmp_seq=3 ttl=114 time=54.332 ms
```

vediamo i valori in *millisecondi* dell'RTT stimato per ognuno dei pacchetti spediti, come si vede è possibile avere valori anche molto diversi per lo stesso percorso. In questi casi può essere utile considerare un valore RTT pari alla media dei valori misurati con `ping`. 

{{<important>}}
Quando il valore della latenza non è disponibile, è possibile utilizzare il RTT immaginando che l'andata ed il ritorno richiedano (circa) lo stesso tempo, quindi

$$ \textrm{Latency} = \frac{\textrm{RTT}}{2} $$

Ovviamente si può usare la formula inversa nel caso sia disponibile la latenza, ma non il RTT

$$ \textrm{RTT} = 2 \cdot \textrm{Latency} $$
{{</important>}}

## Throughput
La [larghezza di banda]({{<ref "#larghezza-di-banda-bandwidth" >}}) rappresenta la quantità massima di bit trasferibili nell'unità di tempo, tuttavia il picco di prestazione non viene quasi mai raggiunto. 

Il numero **effettivo** di bit trasferiti nell'unità di tempo viene chiamato **throughput** \\( T \\) che può essere misurato sperimentalmente. Tuttavia, è bene osservare che il throughput non è invariato nel tempo, fattori quali traffico, congestion ed altri hanno un impatto su questa misura che, quindi, può variare anche a distanza di poco tempo. L'unica cosa certa è che *il throughput non può essere maggiore della banda*:

$$ T \leq B $$

## Calcolo di tempi di trasmissione
Avendo a disposizione i parametri (banda e latenza/RTT) di tutti i collegamenti in una rete, è possibile calcolare una *stima* del tempo di trasmissione di una data quantità di informazione. Va tuttavia indicato anche il *comportamento* dei dispositivi intermedi che potrebbero, per via del loro funzionamento, introdurre ulteriori elementi di ritardo e/o rallentamento della trasmissione.

### Tempo di trasmissione su singolo link
Su un link di banda \((B\\)) e latenza \\(L\\), un pacchetto di \\(D\\) bit richiede tempo di trasmissione:

$$ t = L + \frac{D}{B} $$

Ad esempio spedire \\(1500 Byte\\) su un link a \\(1 Mbps\\) con latenza \\(5 ms \\) richiede

$$ 5 [ms] + \frac{1500 \cdot 8 [bit]}{10^6 [bit/s]} = 17 [ms] $$

{{<attention>}}
Controllare sempre che le unità di misura siano coerenti, nell'esempio sopra è stata implicitamente fatta la trasformazione da \\(5 [ms]\\) a secondi (\\(0.005 [s]\\)), poi è stato sommato il risultato della frazione (ottenendo \\(0.017 [s]\\)) poi è stato fatta una nuova conversione in millisecondi ottenendo il risultato finale \\(17 [ms]\\).
{{</attention>}}

### Tempo di trasmissione con dispositivi intermedi
Quando nel percorso sono presenti dispositivi intermedi (quali switch e router), una stima dei tempi di trasmissione richiede di conoscere il comportamento di questi dispositivi. Normalmente i dispositivi intermedi utilizzano delle *code* di ingresso e uscita per ogni porta. I pacchetti si accodano in ingresso al dispositivo e vengono accodati in uscita. Ci sono due principali modi con cui i dispositivi "spostano" i pacchetti dalla coda di ingresso a quella di uscita.
* Modalità **store and forward**: il dispositivo riceve l'intero pacchetto e solo dopo che l'ha ricevuto per intero lo sposta nella coda di uscita.
* Modalità **cut through**: il dispositivo sposta il pacchetto mano a mano che lo riceve.

Mentre nel primo caso **prima che inizi la ritrasmissione è necessario attendere l'intero tempo di ricezione**, nel secondo caso il dispositivo intermedio può iniziare la ri-trasmissione (accodamento in uscita) non appena riceve il primo bit anche se ancora sta ricevendo l'intero pacchetto.

Negli esercizi che seguono faremo riferimento solo al modello *store and forward* poiché i calcoli sono più semplici e, nella pratica, la differenza di tempi è minima.

### Esercizio
Consideriamo la topologia di rete presentata nella figura sottostante e corredata dalle informazioni sui dati

{{<column/two-cols wl=4 wr=8 content="left" embed="img/exercise_band.html">}}
* Tutti i collegamento `PC <-> Switch` sono a \\( 100~Mbps \\) con latenza \\( 15~ms \\)
* I collegamenti wireless sono a \\( 50~Mbps \\) con latenza \\( 45~ms \\)
* I collegamento tra router e Switch e AP sono a \\( 10~Gbps \\) con latenza \\( 15~ms \\)
* I collegamenti `SER <-> Router` sono a \\( 1~Gbps \\) con latenza \\( 10~ms \\)
* Router, Access Point e switch sono *store and forward* (inoltrano dopo aver ricevuto l’intero pacchetto)
* Tutti i pacchetti hanno dimensione \\( 1500~byte \\) con header di \\( 40~byte \\).
{{</column/two-cols>}}

#### Domande
1. Quale è il Round Trip Time (RTT) tra `PC1` e `SER3` se sia messaggio che conferma sono inviati mediante pacchetti da 1500 Byte?
2. Quale è il Round Trip Time (RTT) tra `NB1` e `SER1` se sia messaggio che conferma sono inviati mediante pacchetti da 1500 Byte?
3. `PH1` deve trasferire 5840 Byte sul server `SER2`, quanti pacchetti deve spedire? `NB1` deve spedire 8760 Byte su `SER3`, quanti pacchetti deve spedire? `AP1` riceve contemporaneamente i pacchetti da `NB1` e `PH1` e li inoltra alternatamente (prima un pacchetto di `NB1` poi un pacchetto di `PH1` e così via) quanti pacchetti totali `AP1` inoltra verso `ROUTER1` e quanto tempo impiega complessivamente?  Giustifica tutte le risposte.
4. Oltre ai pacchetti della domanda precedente, `ROUTER1` riceve altri pacchetti da `SWITCH1` per complessivi (header e dati) 12000 Byte (tutti direzionati a `SER1`). Quanti pacchetti complessivamente riceve `ROUTER1`? Tenendo conto del fatto che `ROUTER1` è *store-and-forward* e che esso può trasmettere in uscita (cioè verso i server) non appena riceve completamente un pacchetto. Se tutti i pacchetti iniziano ad arrivare allo stesso momento, quanto impiega `ROUTER1` a consegnare il primo pacchetto a `SER1`, `SER2` e `SE3`? Quanto impiega a consegnare tutti i pacchetti a `SER1`, `SER2` e `SER3`?
