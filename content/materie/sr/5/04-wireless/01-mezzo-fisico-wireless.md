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

Nella trasmissione wireless (e non solo) si usano spesso segnali sinusoidali, vediamo quindi alcune importanti caratteristiche facendo riferimento alla seguente immagine che rappresenta un'*onda sinusoidale*.

{{<include "img/sine-wave.html">}}

Ricordiamo che seno e coseno sono funzioni *periodiche*, cioè si ripetono in maniera identica, ad intervalli regolari. Il *periodo* è il tempo che intercorre tra l'inizio di due parti identiche e adiacenti di un segnale periodico. Il periodo, che si misura in secondi, si indica solitamente con \\( T \\), nel caso di seno e coseno, il periodo è \\( 2\pi \\) (un angolo giro, in quanto il *raggio vettore* compie un intero giro). Nell'ambito dell'elettromagnetismo, il periodo di un'onda viene chiamato *lunghezza d'onda* (*wavelength*).

Una visione diversa delle funzione periodiche, si concentra sul *numero di eventi al secondo*, cioè quanto volte un'onda periodica completa un *ciclo*? Questa quantità prende il nome di *frequenza* (*frequency*) e viene spesso indicata con \\( f \\) (da non confondere con una funzione generica \\(f(x)\\)). La relazione tra frequenza periodo è molto semplice, l'una è l'inversa dell'altra.

$$ f = \frac{1}{T} \qquad T = \frac{1}{f} $$

Una funzione sinusoidale che ha periodo \\( 2\pi \\), quindi, ha frequenza \\(1/2\pi \approx 0,318\\) Hz (il simbolo \\(\approx\\) indica *approssimativamente uguale a*).

Oltre al concetto di periodo e frequenza, un'onda possiede un'*ampiezza* (*amplitude*) che indica la distanza tra picco (*crest*) e riferimento (asse del tempo). Si noti che il valore assoluto dell'ampiezza è uguale sia che si misuri rispetto alle creste, sia che si misuri rispetto alle *valli* (*trough*).

Un ulteriore caratteristica importante di un'onda è la *fase* (*phase*) che rappresenta lo spostamento "orizzontale" (rispetto all'asse del tempo) dell'onda. Ovviamente tale spostamento va misurato in funzione di una qualche onda di riferimento (ad esempio l'onda \\(\sin(t)\\) che assume il valore zero all'origine e che è mostrata nella figura sopra).

{{< include "img/wave-phases.svg" >}}

Alla base della trasmissione wireless, esiste il concetto di *modulazione* che viene trattato nel prossimo paragrafo.

### Modulazione
Sull'etere è possibile trasmettere *onde elettromagnetiche* che sono *segnali sinusoidali*, come possiamo quindi trasmettere informazione? Per rispondere a questa domanda bisogna prima fornire alcune definizioni preliminari.

{{<def title="Segnale">}}
Un segnale è una *funzione* la cui variabile indipendente (che solitamente indicheremmo con \\(x\\)) è il *tempo* (motivo per cui si indica spesso con \\(t\\)). Ad esempio la funzione \\( \sin{(t)} \\) rappresenta un segnale *sinusoidale* come anche la funzione \\( \cos(t) \\).
{{</def>}}

Mentre la variabile indipendente di un segnale è il tempo, la variabile dipendente, normalmente, è una grandezza fisica ad esempio una *tensione*, una *corrente*, una *temperatura* e così via. Nel caso della della propagazione via etere non è facile comprendere quale sia questa unità in fisica in quanto sono coinvolti fenomeni quantistici, si può genericamente dire che la grandezza in gioco è un *disturbo del campo elettromagnetico*.

Come visto sopra un'onda può essere modificata in una o più delle sue proprietà fondamentali: ampiezza, frequenza e fase; ognuna di queste modifiche sta alla base di specifiche tecniche di *modulazione*.

{{<def title="Portante">}}
La *portante* (*carrier*) è un'onda sinusoidale, tipicamente ad *alta frequenza*, che subisce delle modifiche (viene modulata) con lo scopo di trasmettere l'informazione contenuta in un segnale dati.
{{</def>}}

È ora possibile dare una definizione formale di modulazione.

{{<def title="Modulazione">}}
La *modulazione* (*modulation*) è il processo attraverso il quale la *portante* viene modificata in modo che possa trasmettere l'informazione presente nel segnale dati. In base alle caratteristiche modificate, si identificano diversi tipi di modulazione.
{{</def>}}

Vediamo alcuni dettagli matematici sulla modulazione, partendo da un'onda sinusoidale in cui abbiamo esplicitato i parametri (ampiezza, frequenza e fase) che possono essere modificati

$$ A\sin(ft+\phi) $$

Usando valori specifici per l'ampiezza \\(A\\), la frequenza \\(f\\) e la fase \\(\phi\\), si possono ottenere diverse onde sinusoidali. **La modifica opportuna di uno o più di questi parametri rappresenta proprio il processo di modulazione.**

#### Modulazioni analogiche

Supponiamo di avere un segnale nel tempo \\(s(t)\\), ad esempio una registrazione vocale, se ora utilizziamo l'ampiezza per modulare la portante otteniamo il seguente segnale

$$ s(t)\sin(ft+\phi) $$

dove si è sostituito \\(s(t)\\) ad \\(A\\). Impostando gli altri parametri (frequenza e fase) a dei valori costanti, ad esempio \\(f=10\\) e \\(\phi=0\\), si ha il segnale *modulato*

$$ s(t)\sin(10t) $$

questo tipo di modulazione prende il nome di *modulazione d'ampiezza* (*amplitude modulation, AM*).

In modo analogo si possono definire la *modulazione in frequenza* (*frequency modulation, FM*) e la *modulazione di fase* (*phase modulation, PM*). In tutti questi casi il segnale modulante \\(s(t)\\) è di tipo *analogico*, cioè è una funzione che può assumere valori reali.

#### Modulazioni numeriche

Supponiamo ora di voler trasmettere una sequenza di bit, che indichiamo sempre con un segnale nel tempo \\(s(t)\\) che questa volta non può avere tutti i possibili valori reali, ma solo due possibili valori (ad esempio +5V e -5V). Se l'obiettivo è sempre la modulazione di una portante del tipo

$$ A\sin(ft+\phi) $$

dobbiamo creare un modo per trasformare la portante in modo da distinguere la trasmissione del bit `1` e la trasmissione del bit `0`. Nel caso della modulazione d'ampiezza possiamo scegliere due valori per \\(A\\), ad esempio \\(A_1=2\\) e \\(A_0=0.5\\), quando vogliamo trasmettere il bit `0` trasmettiamo la seguente portante modulata

$$ A_0\sin(t) = \frac{1}{2}\sin(t) $$

mentre quando vogliamo trasmettere il bit `1` trasmettiamo la seguente portante modulata

$$ A_1\sin(t) = 2\sin(t) $$

La modulazione così prodotta prende il nome di *amplitude-shift keying (ASK)* ed è solo una delle possibili modulazioni numeriche.

{{<observe>}}
Nell'esempio sopra abbiamo visto come si possano utilizzare due ampiezze, \\(A_0\\) e \\(A_1\\) per individuare due *simboli* (bit nel nostro esempio) diversi. È anche possibile utilizzare più di due ampiezze, ad esempio quattro, per identificare più di due simboli (ad esempio `00`, `01`, `10` e `11`).
{{</observe>}}

Utilizzando lo stesso principio della modulazione ASK è possibile definire
* modulazione *frequency-shift keying (FSK)* in cui il parametro \\(f\\) è scelto tra un insieme di \\(M\\) valori;
* modulazione *phase-shift keying (PSK)* in cui il parametro \\(\phi\\) è scelto tra un insieme di \\(M\\) valori.

Ulteriori modulazioni numeriche si possono ottenere utilizzando ASK, FSK e PSK in combinazione. In particolare ASK e PSK combinato prendono il nome di *Quadrature Amplitude Modulation (QAM)* che rappresenta una tecnica molto utilizzata anche nelle reti WiFi 802.11.

## Problemi

* Mezzo condiviso
* 
