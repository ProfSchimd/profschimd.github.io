---
title: Mezzi fisici
weight: 10
summary: "Descrizione dei principali mezzi fisici utilizzati oggi e confronto tra di essi."
---

{{<column/two-cols wl=4 wr=8 content="right" embed="img/phy-cables.html">}}
Il **livello fisico** (*physical layer*) è il primo livello (dal basso) nell'architettura ISO/OSI. Il suo ruolo principale è quello di **trasmettere bit su un mezzo fisico**. I mezzi fisici utilizzati oggi sono

* *Rame*, ad esempio Ethernet o servizi DSL.
* *Fibra di vetro*, ad esempio FTTH (*Fiber-To-The-Home*).
* *Etere*, ad esempio reti WiFi o reti cellulari.

Per spedire bit sul mezzo fisico, l'**interfaccia di rete** (*Network Interface Card - NIC*) deve svolgere due compiti

* Codificare i *bit* e/o i *simboli* e
Trasformare i bit/simboli codificati in *segnali* (elettrici, luminosi o elettromagnetici, in base al mezzo).
{{</column/two-cols>}}

## Rame
Nei cavi di **rame**, le informazioni vengono trasmesse da *segnali elettrici*, normalmente sotto forma di *differenza di potenziale* (*tensione*), misurata ai capi di due fili. L'informazione viene solitamente codificata in bit sulla base della tensione misurata. Ad esempio, una tensione di +1 V indica un bit 1, mentre una tensione di -1 V indica un bit 0. A differenza rete elettrica  (es. i 230 V presenti nelle prese di casa), le *reti dati* richiedono un maggiore **frequenza** di cambio dei valori della tensione. Ad esempio per trasmettere 10 Megabit al secondo serviranno almeno 10 milioni di cambi di tensione al secondo. Usando la tensione della rete elettrica potremmo spedire circa 50 bit al secondo (la frequenza della tensione di rete è, infatti, 50 Hz). Il fatto che nelle linee dati i segnali abbiano una frequenza molto elevata richiede che i corrispondenti cavi vengano costruiti in modo da garantire un'elevata qualità del segnale. Per questo motivo non è possibile usare i normali cavi di per connessioni di rete estremamente veloci (con opportune tecnologie è comunque possibile usare la rete elettrica di casa per trasmettere dati).

I cavi di rame sono la soluzione più utilizzati nelle *reti locali cablate*. Lo standard più diffuso di reti cablate è lo standard IEEE 802.3 più comunemente noto come Ethernet. Nelle prime versioni, **Ethernet** utilizzati **cavi coassiali** (*coaxial cable*) per la connessione; questa tecnologia permetteva di connettere più interfacce ad un unico bus utilizzo degli adattatori chiamati *transceiver*. In un secondo momento, lo standard Ethernet è stato aggiornato con cavi di rame (tipicamente coppie di cavi intrecciati, *doppini*) che offrono migliori prestazioni; inoltre è sempre meno comune l'utilizzo di bus condivisi in favore della cosiddetta **switching ethernet** basati su dispositivi di "commutazione" (switch) dei dati. Più di recente, Ethernet è stato ulteriormente arricchito con protocolli di accesso al mezzo per connessioni in fibra ottica; questi offrono elevate prestazioni, ma necessitano di speciali switch ancora costosi.

I cavi di rame sono molto diffusi anche nelle connessioni ad Internet per l'utenza domestica. Questo dipende dal fatto che è possibile utilizzare il **doppino telefonico di rame** utilizzato per la rete telefonica fissa per trasferire dati. Tuttavia è sempre più diffuso l'utilizzo di collegamenti ad Internet mediante *fibra ottica* anche per le utenze domestiche (Fiber-To-The-Home - FTTH).

## Fibra ottica
Nei cavi in **fibra ottica**, le informazioni vengono trasmesse da segnali luminosi. Il caso più semplice si ha quando la presenza di un segnale luminoso indica un bit 1, mentre l'assenza rappresenta un bit 0 (nella pratica si usano tecniche di *modulazione* più sofisticate). La trasmissione su cavi in fibra è più veloce rispetto alla trasmissione si cavi di rame in quanto il segnale la luce viaggia più veloce della carica elettrica, riesce a percorrere più spazio prima di attenuarsi troppo ed è meno soggetta ad interferenze elettromagnetiche.

Recentemente le connessioni in fibra ottica sono diventate di uso comune sia nelle reti locali (es. Ethernet 100BASE-FX) sia sulle linee di connessione ad Internet fornite da *Internet Service Provider ISP* (sia nel mercato casalingo che in quello business).

## Etere
Nelle trasmissione su mezzo **etere** (aria), chiamate anche *wireless*), le informazioni vengono trasmesse mediante *variazioni di campi elettromagnetici*. Il modo in cui questo avviene risulta complesso e non possibile dare direttamente una indicazione di come bit 0 e bit 1 vengono rappresentati. Le tecnologie wireless stanno diventando sempre più importanti in quanto permettono una più facile realizzazione (es. non bisogna stendere cavi) e permettono ai dispositivi connessi alla rete di muoversi liberamente entro un range che, nel caso delle reti cellulari, può essere anche di diversi chilometri.

## Caratteristiche del mezzo

### Larghezza di banda (bandwidth)

### Latenza (latency)

### Throughput


