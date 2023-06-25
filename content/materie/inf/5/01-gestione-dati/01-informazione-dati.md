---
title: Informazione e dati
type: lecture
weight: 100
summary: "In questa lezione capiremo cosa sono i dati e cosa si intende per informazione. Questo
aspetto va necessariamente approfondito per gestire al meglio i dati in modo da mantenere l'informazione
che è di interesse."
---

## Cosa sono i dati
Oggi si utilizza il termine **dati** (in inglese *data*, parola plurale) per indicare tutto ciò che viene elaborato dai sistemi informatici, tali dati vengono elaborati per aiutare persone e/o società a prendere decisioni. Ad esempio dati sulla temperatura atmosferica permettono di produrre previsioni atmosferiche, aggiustare la temperatura di casa, decidere se irrigare un campo. Indipendentemente dal suo utilizzo, il dato (in inglese il singolare di *data* è *datum* che però non viene mai utilizzato) rimane lo stesso, ad esempio 26°C (o 299,15 K).

{{<def>}}
Un **dato** è un "fatto", ovvero una *misurazione* di una quantità che può essere fisica
(come temperatura, distanza, peso, ...) o non fisica (commento, una nota musicale, un pixel, ...).
{{</def>}}

{{<example>}}
Vediamo alcuni esempi di dati, indicando quali quantità descrivono.
* Temperatura atmosferica in una data località, la quantità (fisica) misurata è proprio la temperatura ad esempio attraverso *termometri intelligenti* oppure sensori collegati a dispositivi (esempio Arduino, Raspberry). 
[Esempio  JSON temperatura Venezia](https://dati.venezia.it/sites/default/files/dataset/opendata/temparia.json)

* Valore di mercato del *bitcoin*, la quantità (non fisica) misurata è il prezzo (in dollari) di un bitcoin. [Esempio JSON valore bitcoin](https://api.coindesk.com/v1/bpi/currentprice.json)

* Commenti ad un post su Instagram, la quantità (non fisica) misurata è il *testo* che uno specifico utente ha voluto associare ad un post.

* Reazione ad un posto du Facebook, la quantità (non fisica) misurata è il tipo di "emozione" che un dato post suscita in un dato utente.

* Battito cardiaco, la quantità (fisica) misurata è la frequenza con cui il cuore compie il proprio ciclo. Può essere misurato mediante sensori montati su smartwatch o mediante
appositi elettrodi collegati al corpo.[Documentazione API Fitbit](https://dev.fitbit.com/build/reference/device-api/heart-rate/)
{{</example>}}

{{<exercise title="I dati della quotidianità">}}
Nelle prossime 24 ore registra i dati che incontri nelle attività di tutti i giorni, puoi usare una App oppure un taccuino. Oltre al dato (il numero, il fatto, la frase, ...) registra anche il luogo dove l'hai rilevato (ad esempio quale app) e se si tratta o meno di un dato personale. Per dato personale si intende un dato che ti riguarda direttamente, esempio di dati personali sono: la tua email, la tua data di nascita, la tua canzone preferita, ...

Vediamo un esempio

```
App Instagram:  Storia del mio viaggio in Spagna,     Dato personale
App Instagram:  Storia del mio compagno in palestra,  Dato personale altrui
App Amazon:     Recensione Scarpe,                    Dato personale altrui
Fermata tram:   orario del T1,                        Dato non personale.
```
{{</exercise>}}

## Informazione
{{<column/two-cols wl=8 wr=4 content="left" embed="img/shannon.html">}}
L'informatica è la scienza dell'*elaborazione automatica dell'informazione* (come il termine stesso indica), quindi ha senso chiedersi *cosa è l'informazione*. A questa domanda ha fornito una risposta il matematico e ingegnere statunitense [Claude Shannon](https://en.wikipedia.org/wiki/Claude_Shannon) (fot a destra, Fonte Wikipedia) quando nel 1949 ha pubblicato *The mathematical theory of communication*, un trattato in cui egli fornisce una definizione matematica del concetto di informazione.

L'idea di Shannon è abbastanza semplice, ma ha rivoluzionato lo studio dell'*ingegneria dell'informazione* in quanto si poteva trattare matematicamente tale concetto. In pratica l'informazione è qualcosa che ci elimina incertezza, ad esempio non sappiamo la temperatura esterna quindi siamo *incerti* sul suo valore (saranno 21 °C o 21,3 °C). Una volta che abbiamo il *dato* "Temperatura Esterna", allora l'informazione che questo ci porta elimina l'incertezza. Sappiamo che di tutti i valori possibili, quello che ci è stato fornito dal sensore è quello misurato gli altri non sono più possibili valori. L'aspetto geniale della teoria di Shannon è che si può misurare la *quantità di informazione* che un dato fornisce, in pratica se eravamo incerti su tanti valori, allora l'informazione fornita dal valore specifico è alta, se invece eravamo incerti su pochi valori, allora l'informazione fornita è poca.
{{</column/two-cols>}}

### Entropia
Alla base della teoria sull'informazione di Shannon c'è il concetto matematico di **entropia**, questo concetto viene applicato ad una *distribuzione di probabilità*, per semplicità parleremo qui di distribuzioni discrete, ma la teoria di Shannon si applica anche alle variabili aleatori continue.

Come è noto la distribuzione discreta più semplice è quella che comprende due esiti possibili, solitamente si fa riferimento ad una *moneta a due facce*, una faccia marcata con il simbolo `Testa`, l'altra marcata con il simbolo `Croce`. Il caso che viene subito in mente è quello di una moneta non truccata (*unbiased*) in cui la probabilità che esca `Testa` è uguale alla probabilità che esca `Croce`, \\(p_{Testa} = p_{Croce} = 1/2\\) (queste due probabilità, ovviamente, sono entrambe \\(1/2\\))

Quando gli *eventi* sono più di due, anziché indicare dei nomi si possono numerare, perciò se abbiamo 5 eventi possiamo indicare con \\(p_1,p_2,\ldots p_5 \\) le loro rispettive probabilità. Ad esempio un dado a sei facce che non sia truccato avremo 6 probabilità (una per faccia) \\(p_1, \ldots p_6\\) e tutte avranno lo stesso valore \\(p_i=1/6\\).

Prima di osservare un evento aleatorio (es. prima di scoprire la faccia che è uscita dopo il lancio della moneta), abbiamo incertezza su quello che potrebbe essere l'*esito*, quando ci viene comunicato tale esito, allora acquisiamo dell'informazione, quanta? Shannon sostiene che se osserviamo l'esito \\(i\\) che ha probabilità \\(p_i\\), allora l'informazione che abbiamo da questa osservazione è

$$ \textrm{Informazione} = - \log_2{p_i} $$

Come tutte le grandezze, anche l'informazione deve avere un'*unità di misura*, con la formula che abbiamo appena visto, l'unità di misura dell'informazione è il **bit**.

Una volta definito questo concetto di informazione, ci si può chiedere quale è l'informazione media che ottengo da un esperimento aleatorio, questa quantità si chiama **entropia** (*entropy*) ed ha un ruolo fondamentale nell'ingegneria dell'informazione. L'entropia, generalmente indicata con \\(H\\) per una variabile aleatoria con \\(n\\) possibili esiti e con probabilità \\(p_1,p_2,\ldots,p_n\\) si ottiene nel seguente modo

$$ H = -(p_1\log_2{p_1} + p_2\log_2{p_2} \ldots + p_n \log_2{p_n})= - \sum_{i=1}^{n}{p_i \log_2{p_i}} $$

Si vede proprio che l'entropia \\(H\\) è il *valore atteso* dell'informazione rispetto alla distribuzione di probabilità \\(p_1,p_2,\ldots,p_n\\).

{{<attention>}}
Quando si deve calcolare l'entropia secondo la formula sopra, si deve stare attenti ai casi in cui \\(p_i=1\\) in quanto il logaritmo di zero non è definito. Unicamente per il calcolo di tale quantità, si stabilisce che 
$$ 0\log_2{0} = 0 $$
{{</attention>}}

{{<example>}}
Vediamo alcuni esempi di calcolo dell'entropia per variabili aleatorie semplici.
* Moneta non truccata: \\(n=2\\) (`Testa` e `Croce`), \\(p_1=p_2=1/2\\)
$$ H = -\left(\frac{1}{2}\log_2{\frac{1}{2}} +\frac{1}{2}\log_2{\frac{1}{2}} \right) = -\left(-\frac{1}{2}-\frac{1}{2}\right) = 1 \ bit$$
* Dado con 6 facce non truccato: \\(n=6\\), \\(p_i=1/6\\) (nella moneta avevamo due termini uguali qui ne avremo 6)
$$ H = -6\left(\frac{1}{6}\log_2{\frac{1}{6}}\right) = -\log_2{\frac{1}{6}} = 2,585 \ bit$$
* Moneta truccata con probabilità di testa pari a \\(p_1=2/3\\) e probabilità di croce pari a \\(p_2=1/3\\)
$$ H = -\left(\frac{2}{3}\log_2{\frac{2}{3}} +\frac{1}{3}\log_2{\frac{1}{3}} \right) = 0,918 \ bit$$

{{</example>}}

## Dati e computer
Il concetto di informazione descritto sopra è un concetto *astratto* nel senso che non descrive nulla di "fisico". Di fatto l'informazione non è una cosa fisica, tuttavia viene mantenuta (scritta e letta) in **supporti fisici**. Per esempio i giornali cartacei sono dei supporti fisici per le notizie del giorno, mentre altri supporti quali i vinili contengono informazione sonora.

In un computer moderno, il supporto fisico può essere di vario tipo (ad esempio transistor o
supporti magnetizzati). Quello che permette l'utilizzo di supporti diversi è il fatto che questi
devono "solamente" memorizzate **bit** (valori binari `0` o `1`, `Alto` o `Basso`, `Positivo` o
`Negativo`, ...). D'altra parte un'informazione che si voglia memorizzare in un computer, deve
poter essere tradotta in una sequenza di bit altrimenti non si possono usare i supporti di
memorizzazione presenti in un computer. La **digitalizzazione** è l'operazione che porta in
*formato digitale* (cioè in numeri, *digit*, che poi possiamo tradurre in *binary digit*) l'informazione.

Riassumendo:
* I computer sono in grado di elaborare **bit** utilizzando diversi **supporti fisici**;
* L'informazione deve essere **digitalizzata** affinché sia possibile elaborarla con un PC;

### Esempi di *digitalizzazione*
Vediamo alcuni esempi di digitalizzazione di informazione.

**Testo**
Il testo in una lingua naturale (es. italiano, inglese, giapponese, ...) può essere visto come
una sequenza di *carattere* uno dopo l'altro. Ad esempio, la parola `casa` è composta dai
caratteri `c`, `a`, `s`, `a`; la parola `home` dai caratteri `h`, `o`, `m`, `e` e la parola
`家` (casa in giapponese, secondo Google traduttore) dall'unico ideogramma `家`.

Anche all'interno di un computer un testo è rappresentato con una sequenza di caratteri solo
che ogni carattere è a sua volta rappresentato da una sequenza di bit secondo una specifica
**codifica**. Le due codifiche più utilizzate oggi sono [ASCII](https://en.wikipedia.org/wiki/ASCII)
 (7 o 8 bit se si usa *extended ASCII*) e [Unicode](https://en.wikipedia.org/wiki/Unicode) (che contiene ASCII). Ad esempio il 
 carattere `c` (minuscolo) in ASCII è rappresentato dagli 8 bit `01100011`, allo stesso modo
 altri caratteri hanno una *codifica* in bit e la parola `casa` è codificata dai
 seguenti `32` bit (`8` bit per ognuno dei caratteri) 

`01100011 01100001 01110011 01100001`

La codifica Unicode, che contiene la codifica ASCII, rappresenta i caratteri con un numero di
bit variabile (a differenza di ASCII che usa sempre 8 bit) è può rappresentare milioni di
caratteri (ASCII invece ne rappresenta solo 256) permettendo di avere tutti gli alfabeti del
mondo (latino, arabo, cinese, giapponese, ...) e molto altro. Il codice Unicode per l'ideogramma
giapponese `家` è `5BB6` esadecimale che corrisponde ai seguenti bit

`0101 1011 1011 0110`

{{<attention>}}
È importante sapere quale codifica si stia utilizzando, infatti i 16 bit che indicano l'ideogramma
`家` secondo la codifica Unicode diventerebbero i due caratteri `[` e `¶` se interpretati secondo
la codifica ASCII (consulta [questa pagina](https://www.ascii-code.com/) per vedere la traduzione).
{{</attention>}}


**Immagine**
Per rappresentare un'immagine si usano i cosiddetti *pixel*, piccoli punti (in realtà
quadrati microscopici) colorati. Ad esempio un'immagine con 50 Megapixel, è composta
di circa 50 milioni di puntini colorati. Organizzando questi punti in *righe* e *colonne*
si ottiene un'immagine digitale. 

Per rappresentare sotto forma di bit un'immagine basta rappresentare "uno dopo l'altro" i
pixel. Ad esempio partendo dalla prima riga, poi la seconda e così via, si "elencano" i
pixel (primo pixel della prima riga, secondo pixel della seconda riga, ...). Rimane quindi
il problema di rappresentare con dei bit il *colore* di un pixel. Lo standard di rappresentazione
dei colori è tramite la terna **RGB** (sigla che indica **R**ed, **G**reen, **B**lue)
dando un'*intensità* per ognuno di dei tre colori fondamentali: rosso, verde e blu. Tale intensità
viene rappresentata tramite numeri da 0 (assenza completa del color) a 255 (saturazione massima
del colore). Dal momento che per rappresentare numeri da 0 a 255 servono 8 bit, ogni
terna RGB viene rappresentato da 3 gruppi di 8 bit per un totale di 24 bit. 

{{<example>}}
Il rosso più luminoso è rappresentato da i valori `(255,0,0)` in decimale che diventano

    11111111 00000000 00000000

in binario. Il bianco è rappresentato dalla massima presenza di tutti i colori

    11111111 11111111 11111111

mentre il nero dall'assenza di qualsiasi colore

    00000000 00000000 00000000

{{</example>}}

Un'immagine quindi è composta da tanti gruppi di 24 bit quanti sono i pixel dell'immagine
stessa (ad esempio 24 milioni di bit per immagini ad 1 Megapixel). Questa rappresentazione
viene chiamata *raster* perché descrive esattamente i pixel dell'immagine (ad esempio i
formati `bmp` e `tiff` sono formati raster). Spesso, per evitare eccessivo utilizzo di spazio
e/o *banda*, le immagini vengono memorizzate e scambiate in formato *lossy* (cioè con
perdita di informazione). Ad esempio il formato `jpeg` è un formato lossy molto diffuso che
*comprime* le informazione a scapito della qualità.

## Sistema informativo
Il **sistema informativo aziendale** è l'insieme di tutti gli elementi informatici e non che permettono di gestire l'informazione (i dati) all'interno di un'azienda. 

Parte del sistema informativo è il *sistema informatico* che comprende.
* I server in cui risiedono i dati e i software necessari alla lora gestione.
* I software necessari alla gestione dei dati.
* L'infrastruttura di rete che permette di accedere ai dati.
* Sistemi hardware e/o software per la messa in sicurezza e la preservazione dei dati.

### Server
Il sistema informativo comprende diversi *server* cioè macchine con adeguati hardware e software per ospitare i dati aziendali. Tali server devono essere opportunamente montati in modo da garantire:
* *affidabilità* in termini di velocità di accesso all'informazione e in termini di memorizzazione (i dati non devono essere persi).
* *sicurezza* in modo che i dati non possano essere visti da chi non è autorizzato oppure che non possano essere soggetti di attacchi (ad esempio *ransomware*).

### Software per gestione e DBMS
Per gestire dati, anche di piccole dimensioni, è opportuno utilizzare software adeguati e progettati proprio per tale scopo. Nella pressoché totalità delle situazioni, la gestione dei dati prevede l'utilizzo di uno o più *database* (*base di dati*). La gestione dei database è un campo estremamente importante dell'informatica e i software progettati per tale scopo sono chiamati **Database Management Systems (DBMS)**.

### Rete e sicurezza
Oggi tutti i dati sono *in linea* (*online*) cioè sono accessibili da postazioni diverse da quelle in cui essi sono "fisicamente" memorizzati. Inoltre, è normale che diversi utenti accedano contemporaneamente ai dati (sia per leggere sia per scrivere). Di conseguenza un software (esempio DBMS) di gestione dei dati è in esecuzione su server che sono connessi alla rete aziendale o addirittura alla rete pubblica Internet. Per garantire che i dati rimangano accessibili solo da utenti autorizzati, l'intera infrastruttura di rete e tutto il software utilizzato devono essere opportunamente gestiti.

## Domande e Esercizi

### Domande
* Osserva una "pagina" del tuo social media preferito. Quali sono, secondo te, i *dati* che devono essere mantenuti da chi gestisce il social media? (Esempi: foto profilo, post, ...) Per ognuno di questi indica il *dominio* più appropriato.

### Esercizi
* Utilizzando un linguaggio di programmazione a scelta, scrivi un programma che memorizza *dati* relativi ad un profilo social (utilizza le risposte alla domanda precedente). Predisponi un programma di test che crei diversi profili (ad esempio 5 profili distinti) e che mostri i dati a video.

* Con i *dati* memorizzati al punto precedente, scrivi un programma che legge e scrive su file una *sequenza* di tali dati. 
