---
title: Il mezzo fisico wireless
type: lecture
weight: 10
summary: "Questa lezione introduce brevemente il mezzo fisico wireless e le sue principali caratteristiche e problematiche."
---

Le reti wireless sono oggi presenti in numerose forme e tipologie. Sulla base del'*estensione geografica* della rete, si distinguono diversi tipi di reti wireless.
* **Wireless Personal Area Network (WPAN)** reti di estensione estremamente ridotta, attorno ai 10 metri, caratterizzata da dispositivi personali (smartphone, smartwatch, auricolari, ...) tipicamente connessi con tecnologie Bluetooth (IEEE 802.15) o simili.
* **Wireless Local Area Network (LAN)** reti estensione limitata, attorno ai 100 metri, caratterizzata da dispositivi appartenenti alla stessa organizzazione/azienda (o dispositivi di casa), tipicamente connessi con tecnologia WiFi (IEEE 802.11).
* **Wireless Metropolitan Area Network (WMAN)** reti di estensioni media, attorno ai 5 kilometri (l'area metropolitana di una città). È una tipologia raramente utilizzata che può essere realizzata con dei collegamenti (*ponti radio*) dedicati.
* **Wireless Wide Area Network (WWAN)** reti estese a livello globale, tipicamente realizzate con ponti radio dedicati.

## Il mezzo wireless
Il mezzo di comunicazione per le reti wireless è l'*etere*, l'aria. L'utilizzo di tale mezzo rappresenta un indiscutibile vantaggio (non serve cablare nulla), ma ha anche diversi problemi. 

Le problematiche relative al mezzo fisico si possono suddividere in due tipologie, la prima rappresenta problemi dovuto proprio alle caratteristiche del mezzo.
* **Mezzo condiviso** Tutti i dispositivi utilizzano lo stesso mezzo (l'aria) per trasmettere e ricevere, questo significa che devono coordinarsi per evitare che i dati trasmessi da un dispositivo distruggano o modifichino i dati trasmessi da un altro.
* **Interferenze** Oltre all'interferenza dovuto alla trasmissione di più dispositivi, abbiamo anche interferenza dovuta alla trasmissione di altri dispositivi su frequenze vicine a quella usata.

La seconda tipologia di problematiche relative ai dispositivi wireless è legata alla natura dei dispositivi stessi, piuttosto che alla natura del mezzo.
* **Mobilità** I dispositivi connessi alle reti wireless tipicamente si spostano generando un problema di persistenza della connessione. Ad esempio uno smartphone che si muove in un treno ad alta velocità cambierà abbastanza di frequente la stazione a cui è agganciato.
* **Consumo di energia** I dispositivi mobili sono alimentati da batteria che determina un limite all'energia disponibile. È importante che il consumo di energia delle antenne wireless sia tale da non impattare in modo eccessivo sul consumo di batteria.

## Trasmissione
Le trasmissioni wireless avvengono mediante *onde elettromagnetiche* che si propagano attraverso l'aria alla velocità della luce, n effetti la luce stessa è composta di onde elettromagnetiche. La differenza principale tra le varie onde è la loro **frequenza** che rappresenta il *numero di oscillazioni* al secondo. È importante sapere che la frequenza di un'onda è legata direttamente alla sua **energia**.

{{<include "img/spectrum-all.html">}}

L'immagine mostra lo **spettro** delle onde elettromagnetiche suddiviso in base alla loro frequenza, come si vede le frequenza della luce (chiamato lo spettro *visibile*) variano tra 10 THz cioè \\(10^{10}\\) Hz e 100 THz, cioè \\(10^{11}\\) Hz.

{{<important>}}
L'unità di misura della frequenza sono gli *hertz*, simbolo Hz. Un evento che si verifica una volta al secondo ha una frequenza di 1 Hz. Ad esempio un processore a 3 GHz è in grado di effettuare 3 miliardi di operazioni al secondo.
{{</important>}}

Dell'ampio spettro disponibile, solo una parte può essere utilizzata per le trasmissioni civili, in questa zona troviamo le *radio frequenze* che sono ulteriormente suddivise in **bande di frequenza** sulla base della loro frequenza, da *Very Low Frequency (VLF)* a *Extremely High Frequency (EHF)*. In questo spazio devono trovare posto tutte le trasmissione. 

{{<include "img/radio-frequency-spectrum.html">}}

L'immagine sopra mostra la suddivisione dello spettro delle radio frequenze in base alle tipiche trasmissione che avvengono sulla banda. 

Nella trasmissione numerica (trasmissione di numeri, esempio bit) esiste un'importante relazione tra frequenza e velocità di trasmissione, senza entrare troppo nei dettagli, si possono ottenere collegamenti wireless più veloci quando si utilizzano frequenze più alte. Tuttavia, come detto sopra, a maggiore frequenza corrisponde una maggiore richiesta di energia, che spesso non è giustificata dall'incremento di velocità.

Alla base della trasmissione wireless, esiste il concetto di *modulazione* che viene brevemente discusso nel prossimo paragrafo.

### Modulazione

## Problemi

* Mezzo condiviso
* 
