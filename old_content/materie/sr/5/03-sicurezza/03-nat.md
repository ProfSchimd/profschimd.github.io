---
title: Network Address Translation (NAT)
running_title: NAT
type: lecture
weight: 30
---

## Cos'è un NAT
NAT è una sigla che significa **Network Address Translation**, la stessa sigla
indica cosa fa un dispositivo NAT: *traduce indirizzi*. Più precisamente, si
dovrebbe dire che un NAT *sostituisce* indirizzi in quanto esso cambia,
all'interno di un  pacchetto IP (*datagramma*), un indirizzo con un altro.


## Utilizzi del NAT
Ci sono due principali utilizzi dei dispositivi NAT uno per offrire un meccanismo
di sicurezza, ad esempio *NAT firewall* l'altro per permettere a più dispositivi
di condividere un *unico indirizzo IP pubblico* (ad esempio, nelle reti domestiche).

### Sicurezza della rete
Sappiamo che uno dei più importanti problemi nella gestione delle reti è la **sicurezza**, questo richiede di mantenere i dispositivi ed i servizi della rete al sicuro da attacchi esterni. Affinché un malintenzionato possa lanciare un attacco alla rete, questo deve conoscere come è fatta la rete: quali sono gli host, quali sono i loro indirizzi, che porte sono aperte, ... 

Un primo passo (importante, ma non sufficiente) verso la messa in sicurezza di una rete è nascondere quante più informazioni possibili. Un dispositivo NAT permette di fare questo in quanto i pacchetti che passano da un NAT non l'indirizzo IP originale, ma quello sostituito dal NAT.

### Utilizzo di un unico indirizzo IP
Prima dell'introduzione di IPv6, Internet era unicamente basata su IPv4 che
prevede 32 bit per gli indirizzi di rete permettendo circa 4 miliardi di reti
uniche. Con la popolazione mondiale che supera gli 8 miliardi, il numero di
dispositivi connessi ha abbondantemente oltrepassato la quantità di indirizzi
IPv4. Se oggi possiamo connettere computer, tablet, smartphone, televisori,
frigoriferi, ed altro, è grazie a NAT (IPv6 prevede 128 bit per gli indirizzi,
NAT potrebbe non essere più necessario a questo specifico scopo).

In pratica, ad ogni dispositivo viene assegnato un indirizzo IP locale, ad esempio
`192.168.1.100`, questo **non essendo un indirizzo pubblico**, non permette al
dispositivo di accedere alla rete Internet pubblica. All'interno della rete locale
il *default gateway* riceve tutto il traffico destinato all'esterno della rete,
per inoltrarlo, sostituisce l'indirizzo IP locale (`192.168.1.100` nell'esempio)
con l'unico indirizzo IP pubblico (ad esempio `1.2.3.4`). Questa operazione di
traduzione è eseguita dal NAT. 

## Funzionamento del NAT

{{<column/two-cols wr=6 wl=6 content="right" embed="img/nat_funzionamento.html">}}
Come si vede nell'immagine a sinistra (fonte Wikipedia), l'operazione di un NAT è molto semplice. Quando il Router riceve un pacchetto dall'host 10.0.0.1, prima di mandarlo al Server 200.100.10.1, cambia l'indirizzo IP sorgente in 150.150.0.1 (l'indirizzo IP pubblico del router). 
Nel verso opposto, quando il router riceve un pacchetto dal server 200.100.10.1, sapendo che l'host 10.0.0.1 stava comunicando con tale server, sostituisce l'indirizzo IP pubblico 150.150.10.1 della destinazione con l'indirizzo dell'host 10.0.0.1 e inoltra il pacchetto così modificato verso la sua destinazione.
Cosa succede, tuttavia, se due host diversi, diciamo 10.0.0.1 e 10.0.0.2, della rete privata vogliono comunicare con lo stesso server 200.100.10.1? In questo caso si verifica un problema perché il router, quando riceve un pacchetto dal server, non saprà a chi mandarlo (cioè che IP sostituire al posto di 150.150.0.1).
{{</column/two-cols>}}

### Nat mediante *Port Forwarding*


{{<column/two-cols wl=6 wr=6 content="left" embed="img/nat_port_forwarding.html">}}
Nell'immagine a destra (fonte Wikipedia) si può vedere il funzionamento di un NAT in modalità port forwarding (a volte si usa la sigla NAPT per questi dispositivi). L'idea è che per distinguere le connessioni che arrivano dalla rete locale (chiamata inside realm nell'immagine), il dispositivo NAT utilizza le proprie porte di uscita per le connessioni. In altre parole un NAT di questo tipo non solo cambia l'indirizzo IP da quello privato a quello pubblico, ma cambia anche la porta della sorgente utilizzandone una che esso ha libera (NATP: Network Address/Port Translation). In questo modo si risolve il problema dell'identificare le connessioni verso lo stesso server effettuate da più host della rete privata. Infatti il NAT utilizzerà l'IP del server e la porta per capire a quello host della rete privata dovrà inviare il pacchetto.
{{</column/two-cols>}}