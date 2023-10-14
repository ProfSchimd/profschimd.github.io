---
title: Virtual Private Network (VPN)
running_title: VPN
type: lecture
weight: 40
---

## Cos'è una VPN
Con la pandemia da SARS-Cov-2, ci si è resi conto dell'importanza dello *smart working* (*lavoro agile*), molte istituzioni e aziende hanno potuto lavorare nonostante il *lockdown*. Uno dei problemi dello *smart working* è l'utilizzo di connessioni diverse da quelle aziendali. Questo può rendere inaccessibili alcune risorse utilizzabili solo all'interno della **intranet** aziendale. In altre parole, risorse accessibili solo se direttamente connessi alla *rete privata* aziendale, non sono disponibili se connessi alla *rete pubblica* Internet e questo può essere un ostacolo, ad esempio, nello smart working.

È possibile creare una rete privata *virtuale* utilizzando anche infrastruttura che non è di proprietà dell'istituzione (es. utilizzando la stessa fibra utilizzata anche degli *Internet Server Provider - ISP*), questo tipo di rete prende il nome di **Virtual Private Network (VPN)**.

La tecnologia alla base delle VPN è **IPsec** che permette di scambiare pacchetti IP cifrati, in questo modo si ottiene un livello di sicurezza tale da consentire di includere nella rete privata anche *host* che non sono ad essa collegati. Si dice che la connessione *pubblica* (ad esempio attraverso il proprio ISP), viene usata come *tunnel* (si parla infatti di **tunnelling**) all'interno del quale transita il traffico della rete privata. Essendo questo tunnel protetto dalla cifratura offerta da IPsec, la connessione VPN viene considerata sicura e parte della rete privata.

{{<attention>}}
È importante sottolineare che l'utilizzo di IPsec è uno dei tanti metodi per creare una VPN. Sulla 
 pagina di Wikipedia per la voce [VPN](https://en.wikipedia.org/wiki/Virtual_private_network), si trova una maggiore trattazione. Con un colpo d'occhio [questa immagine](https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/VPN_classification-en.svg/2560px-VPN_classification-en.svg.png) (tratta dalla stessa pagine) mostra diversi tipi di VPN sono oggi disponibili.
{{</attention>}}

### Tunnelling
Il **tunnelling** prevede l'utilizzo una rete (ad esempio Internet) per trasportare pacchetti appartenenti ad un'altra rete (ad esempio la rete aziendale private). Si utilizzano i servizi e i protocolli di una rete per creare un *tunnel* che metta in collegamento du dispositivi appartenenti ad una stessa rete, ma che non sono fisicamente collegati.

{{<column/two-cols wr=6 wl=6 content="left" embed="img/ip-tunnel.html">}}
L'immagine a fianco schematizza il tunnelling attraverso una rete pubblica, i dispositivi delle due reti coinvolte (*home network* e *company network* nell'esempio) comunicano utilizzando i servizi della rete pubblica (ad esempio il protocollo IP su Internet).

Se la comunicazione è opportunamente gestita (ad esempio cifrata), si viene a creare un *tunnel* che collega le due reti, questo tunnel può essere visto come un collegamento virtuale tra due dispositivi della stessa rete. In questo caso il laptop all'interno della rete di casa ottiene un accesso alla rete aziendale mediante il tunnel stesso, questo collegamento virtuale permette al laptop ed al server di comunicare come se si trovassero nella stessa rete privata. Essendo la rete privata creata utilizzando anche collegamenti virtuale (il tunnel), diciamo che i dispositivi si trovano sulla stessa rete privata virtuale (una VPN).
{{</column/two-cols>}}

Per ottenere il tunnelling, quindi, dobbiamo utilizzare una comunicazione tra host in grado di rendere leggibile il contenuto solo ai dispositivi coinvolti nella comunicazione (oppure ai soli dispositivi nella VPN), uno dei meccanismi per ottenere quest è [IPsec](#ipsec) discusso qui sotto.

## IPsec
Il protocollo *Transport Layer Security* TLS permette di cifrare i dati spediti attraverso una connessione TCP, tuttavia sia l'header TCP, sia l'header IP vengono spediti in chiaro. D'altro canto, l'instradamento del pacchetto IP se il suo header fosse cifrato. In una rete privata vogliamo nascondere informazioni sulla rete stessa, tipicamente indirizzi IP, server accessibili, messaggi scambiati, ed altre informazioni simili.

Il protocolli che compongono il sistema **IPsec** (RFC 4301, 4302 e 4303) permettono di cifrare pacchetti IP e, di conseguenza, cifrare anche il contenuto (*payload*) di tali pacchetti. Questo risolve il problema di nascondere i dettagli di una rete, ma come instradiamo questi pacchetti? Utilizziamo, **in chiaro** un protocollo che permetta il tunnelling come IP. Vale la pena ripetere: IPsec è un protocollo IP cifrato che utilizza IP in chiaro per fare tunnelling (cioè per essere consegnato a destinazione).

Per capire meglio come questo funziona vediamo un esempio pratico di un VPN tra nodi geograficamente distribuiti che utilizzano la rete pubblica Internet, ed in particolare IP, per fare tunnelling.

{{<include "img/vpn-esempio.html">}}

Nella figura sopra vediamo un classico scenario in cui un'azienda possiede una propria Intranet nella quale trovano posto sia server aziendali, sia workstation per i dipendenti. Supponiamo che **l'azienda non voglia esporre sulla rete pubblica i server**. Tuttavia, questi server sono indispensabili per le operazioni interne e devono essere accessibili anche da eventuali dipendenti che stanno lavorando dalla propria postazione di casa (es. in *smart working*). La soluzione è creare una VPN tra la intranet aziendale e le workstation "remote", in questo caso accadrebbe quanto segue.

1. La workstation di casa ottiene una **chiave** crittografica (es. installando una VPN) con la quale cifra pacchetti IP.
2. Per spedire questi pacchetti IP cifrati, la workstation utilizza la rete Internet pubblica mandando all'indirizzo pubblico del *gateway aziendale* il **pacchetto IP contenente il pacchetto IP cifrato**.
3. Il  *gateway aziendale* conosce la chiave condivisa ed estrae dal pacchetto IP in chiaro il suo contenuto decifrandolo.
4. Da questo momento in avanti, il pacchetto **IP intranet** può viaggiare (in chiaro) all'interno della rete aziendale, come se fosse stato generato dalla rete interna stessa.

{{<attention>}}
Affinché il meccanismo descritto sopra funzioni, il *gateway aziendali* dovrà operare da [NAT]({{<ref "03-nat.md">}}) traducendo l'indirizzo IP pubblico della workstation remota in un indirizzo IP di intranet.
{{</attention>}}

## I protocolli di IPsec
IPsec non è un protocollo, bensì una collezione di protocolli che sono utilizzati per effettuare operazioni sicure quali, ad esempio, il tunnelling a richiesto da una VPN. I due principali protocolli sono [*Authentication Header (AH)*](#authentication-header-ah) e [Encapsulation Security Payload (ESP)](#encapsulating-security-payload-esp), insieme questi due protocolli permettono di realizzare i requisiti di confidenzialità, integrità e autenticazione (CIA).

### Authentication Header (AH)
IP **Authentication Header (AH)** ([RFC 4302][4]) è progettato per fornire:
* *autenticazione* dei pacchetti IP;
* *integrità*.

### Encapsulating Security Payload (ESP)
IP **Encapsulating Security Payload (ESP)** ([RFC 4303][5]) è progettato per fornire
* *confidenzialità* utilizzando cifratura su pacchetti IP;
* *integrità* utilizzando meccanismi basati su funzioni hash;
* *autenticazione della sorgente* di un pacchetto IP;
* altri meccanismi di sicurezza.

### Modalità di funzionamento
I protocolli AH ed ESP possono operare in due modalità:
* *transport mode* e, as well as in a network 
* *tunneling mode*.


#### Modalità Transport
Il *payload* del pacchetto IP viene cifrato e/o autenticato, mentre l'header no.
In altre parole, i meccanismi di sicurezza sono messi in atto solo sui dati del
*livello di trasporto*.


#### Modalità Tunnel
L'intero pacchetto IP (header e payload) vine cifrato e/o autenticato, tale
pacchetto viene poi inserito come payload di un secondo pacchetto IP il cui header
deve essere visibile ai router per le operazioni di instradamento.

La modalità tunnel è quella tipicamente usata per creare una VPN, i pacchetti IP
della rete privata (virtuale) sono a loro volta incapsulati in pacchetti IP
pubblici. In questo caso **IP è tunneled su IP**.

## Link
* [VPN (Wikipedia EN)][2]
* [Tunnelling (Wikipedia EN)][3]
* [IPsec (Wikipedia EN)][1]
* [RFC 4302][4]
* [RFC 4303][5]

[1]: https://en.wikipedia.org/wiki/IPsec
[2]: https://en.wikipedia.org/wiki/Virtual_private_network
[3]: https://en.wikipedia.org/wiki/Tunneling_protocol
[4]: https://www.rfc-editor.org/rfc/rfc4302
[5]: https://www.rfc-editor.org/rfc/rfc4303