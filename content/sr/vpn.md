---
title: Virtual Private Network (VPN)
layout: page
materia: sr
align: justify
---

## Cos'è una VPN
Con la pandemia da SARS-Cov-2, ci si è resi conto dell'importanza dello *smart working* (o *lavoro agile*), molte istituzioni e aziende hanno potuto lavorare nonostante il *lockdown*. Uno dei problemi dello *smart working* è il collegamento attraverso una rete diversa da quella aziendale. Questo rende impossibile l'accesso alle risorse di rete che possono essere utilizzate solo nella **intranet**, cioè solo se connessi alla rete aziendale.

La soluzione è quella di creare una rete aziendale privata, tuttavia il problema diventerebbe avere un'infrastruttura di rete (cavi e/o access point wireless) priva; che, a meno di situazioni geograficamente concentrate (es. edificio o zona urbana), è impossibile.

Fortunatamente è possibile creare una rete privata *virtuale* utilizzando anche infrastruttura che non è di proprietà dell'istituzione (es. utilizzando la stessa fibra utilizzata anche degli *Internet Server Provider - ISP*), questo tipo di rete prende il nome di <strong class="text-danger">Virtual Private
Network (VPN)</strong>.

La tecnologia alla base delle VPN è **IPsec** che permette di scambiare pacchetti IP cifrati, in questo modo si ottiene un livello di sicurezza tale da consentire di includere nella rete privata anche *host* che non sono ad essa collegati. Si dice che la connessione *pubblica* (ad esempio attraverso il proprio ISP), viene usata come *tunnel* (si parla infatti di **tunnelling**) all'interno del quale passa il traffico della rete privata. Essendo questo tunnel protetto dalla cifratura offerta da IPsec, la connessione VPN viene considerata sicura e perciò si considera parte della rete privata.

<div class="alert alert-danger" markdown="1">
<strong><i class="bi bi-exclamation-triangle"></i> Attenzione</strong><br />

È importante sottolineare che l'utilizzo di IPsec è uno dei tanti metodi per creare una VPN. Sulla [pagina di Wikipedia][2] per la voce VPN, si trova una maggiore trattazione. Con un colpo d'occhio [questa immagine](https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/VPN_classification-en.svg/2560px-VPN_classification-en.svg.png) (dalla stessa pagine) mostra quanti tipi di VPN sono oggi disponibili.
</div>

### Tunnelling
Il concetto di **tunnelling** già menzionato sopra, rappresenta, semplicemente, l'idea di utilizzare un protocollo di rete (ad esempio IP) per trasportare pacchetti appartenenti ad un'altra rete. Ad esempio, la rete Internet viaggia su diverse reti: Ethernet, 802.11 (Wireless), cellulare, ... In questo caso i pacchetti IP sono *tunnelled* all'interno di frame Ethernet o 802.11.

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-lightbulb"></i> Rifletti: cos'è una rete?</h5>

Una rete è un insieme di **agenti** in grado di scambiarsi informazione (*comunicare*). Infatti si parla spesso di *rete di contatti* tra persone, i social media vengono anche chiamati *reti sociali*, non perché create connettendo in rete dei dispositivi, ma perché mettono in comunicazione (in società) delle persone.

L'idea, quindi, che una rete (es. di persone come Facebook) utilizzi un'altra rete (es. Internet) per comunicare, non è poi così strana. Potremmo dire che Facebook offre un servizio di "tunnelling" rispetto alle reti di persone, ovviamente in questo caso il tunnelling non sarebbe rispetto ad un protocollo, ma rispetto a qualcos'altro.
</div>

## IPsec
Per lo scambio sicuro di dati tra *host* il protocollo *Transport Layer Security* TLS permette di cifrare i dati spediti su una connessione TCP, tuttavia sia l'header TCP, sia l'header IP contenente il pacchetto TCP viaggiano in chiaro. D'altro canto, sarebbe impossibile instradare il pacchetto IP verso la destinazione se l'header IP non fosse accessibile (perché?).

Creare una rete privata, invece, significa nascondere tutti i dettagli della rete agli host che non vi sono connessi. Questi dettagli sono: indirizzi IP, server accessibili, messaggi scambiati, ... Evidentemente, per fare questo non è pensabile che header IP e TCP siano in chiaro. 

Il protocollo <strong class="text-danger">IPsec</strong> permette di cifrare pacchetti IP e, di conseguenza, cifrare anche il contenuto (*payload*) di tali pacchetti. Questo risolve il problema di nascondere i dettagli di una rete, ma come instradiamo questi pacchetti? Utilizziamo, **in chiaro** un protocollo che permetta il tunnelling come IP. Vale la pena ripetere: IPsec è un protocollo IP cifrato che utilizza IP in chiaro per fare tunnelling (cioè per essere consegnato a destinazione).

Per capire meglio come questo funziona vediamo un esempio pratico di un VPN tra nodi geograficamente distribuiti che utilizzano la rete pubblica Internet, ed in particolare IP, per fare tunnelling.
{% include_relative img/vpn_esempio.html %}
Nella figura sopra vediamo un classico scenario in cui un'azienda possiede una propria Intranet nella quale trovano posto sia server aziendali, sia workstation per i dipendenti. Supponiamo che **l'azienda non voglia esporre sulla rete pubblica i server**. Tuttavia, questi server sono indispensabili per le operazioni interne e devono essere accessibili anche da eventuali dipendenti che stanno lavorando dalla propria postazione di casa (es. in *smart working*). La soluzione è creare una VPN tra la intranet aziendale e le workstation "remote", in questo caso accadrebbe quanto segue.

1. La workstation di casa ottiene una **chiave** crittografica (es. installando una VPN) con la quale cifra pacchetti IP.
2. Per spedire questi pacchetti IP cifrati, la workstation utilizza la rete Internet pubblica mandando all'indirizzo pubblico del *gateway aziendale* il **pacchetto IP contenente il pacchetto IP cifrato**.
3. Il  *gateway aziendale* conosce la chiave condivisa ed estrae dal pacchetto IP in chiaro il suo contenuto decifrandolo.
4. Da questo momento in avanti, il pacchetto **IP intranet** può viaggiare (in chiaro) all'interno della rete aziendale, come se fosse stato generato dalla rete interna stessa.

<div class="alert alert-danger" markdown="1">
<strong><i class="bi bi-exclamation-triangle"></i> Attenzione</strong><br />

Affinché il meccanismo descritto sopra funzioni, il *gateway aziendali* dovrà operare da [NAT](/content/sr/nat.html) traducendo l'indirizzo IP pubblico della workstation remota in un indirizzo IP di intranet.
</div>



## Link
* [VPN su Wikipedia][2]
* [Tunnelling su Wikipedia][3]
* [IPsec su Wikipedia][1]

[1]: https://en.wikipedia.org/wiki/IPsec
[2]: https://en.wikipedia.org/wiki/Virtual_private_network
[3]: https://en.wikipedia.org/wiki/Tunneling_protocol