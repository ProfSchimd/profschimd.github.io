---
title: Informazione e dati
type: lecture
weight: 100
summary: "In questa lezione capiremo cosa sono i dati e cosa si intende per informazione. Questo
aspetto va necessariamente approfondito per gestire al meglio i dati in modo da mantenere l'informazione
che è di interesse."
---

## Cosa sono i dati
Oggi si utilizza il termine **dati** (in inglese *data*, parola plurale) per indicare tutto ciò che viene elaborato dai sistemi informatici.  dati vengono elaborati al fine di essere utili a persone e/o società.  Ad esempio i dati sulla temperatura atmosferica vengono elaborati per vari scopi tra cui produrre previsioni atmosferiche, aggiustare la temperatura dell'acqua in casa, decidere se o meno irrigare un campo e molti altri scopi. Indipendentemente dall'utilizzo che se ne fa, il dato (in inglese il singolare di *data* è *datum* che però non viene mai utilizzato) è sempre lo stesso, ad esempio 26°C (o 299,15 K).

{{<def>}}
Un **dato** è un "fatto", ovvero una *misurazione* di una quantità che può essere fisica
(come temperatura, distanza, peso, ...) o non fisica (commento, una nota musicale, un pixel, ...).
{{</def>}}

{{<example>}}
Vediamo alcuni esempi di dati indicando quali sono le quantità che essi descrivono.
* Temperatura atmosferica in una data località, la quantità (fisica) misurata è proprio la temperatura
ad esempio attraverso *termometri intelligenti* oppure sensori collegati a dispositivi online (esempio
Arduino, Raspberry). 
[Esempio  JSON temperatura Venezia](https://dati.venezia.it/sites/default/files/dataset/opendata/temparia.json)

* Valore di mercato del bitcoin, la quantità (non fisica) misurata è il prezzo (solitamente in dollar) di un
bitcoin. [Esempio JSON valore bitcoin](https://api.coindesk.com/v1/bpi/currentprice.json)

* Commenti ad un post su Instagram, la quantità (non fisica) misurata è il *testo* che uno specifico utente
ha voluto associare ad un post.

* Reazione ad un posto du Facebook, la quantità (non fisica) misurata è il tipo di "emozione" che un dato
post suscita in un dato utente.

* Battito cardiaco, la quantità (fisica) misurata è la frequenza con cui il cuore compie il proprio ciclo
di "pompaggio". Ad esempio, può essere misurata mediante un sensore montato su uno smartwatch oppure mediante
appositi elettrodi collegato al corpo della persona di cui si vuole misurare il battito. [Documentazione API Fitbit](https://dev.fitbit.com/build/reference/device-api/heart-rate/)
{{</example>}}

{{<exercise title="I dati della quotidianità">}}
Nelle prossime 24 ore registra tutti i dati che incontri nelle attività di tutti i giorni. Puoi usare una App oppure un taccuino. Oltre al dato (il numero, il fatto, la frase, ...) registra anche il luogo dove l'hai rilevato (ad esempio quale app) e se si tratta o meno di un dato personale. Per dato personale si intende un dato che ti riguarda direttamente, esempio di dati personali sono: la tua email, la tua data di nascita, la tua canzone preferita, ...

Vediamo un esempio

```
App Instagram:  Storia del mio viaggio in Spagna,     Dato personale
App Instagram:  Storia del mio compagno in palestra,  Dato personale altrui
App Amazon:     Recensione Scarpe,                    Dato personale altrui
Fermata tram:   orario del T1,                        Dato non personale.
```
{{</exercise>}}

## Informazione
Il concetto di informazione si differenzia da quello di dato in quanto l'informazione
deve essere "posseduta" per potersi definire tale. Per fare un esempio, consideriamo
l'informazione *temperatura a Venezia in questo istante*.

### Entropia

$$ H = - \sum_{i=1}^{n}{p_i \log_2{p_i}} $$

{{<attention>}}
Quando si deve calcolare l'entropia secondo la formula sopra, si deve stare attenti ai casi in cui \\(p_i=1\\) in quanto il logaritmo di zero non è definito. Unicamente per il calcolo di tale quantità, si stabilisce che 
$$ 0\log_2{0} = 0 $$
{{</attention>}}

## Dati e computer
Il concetto di informazione descritto sopra è un concetto *astratto* nel senso che non descrive
nulla di "fisico". Di fatto l'informazione non è una cosa fisica, tuttavia viene mantenuta (scritta
e letta) in **supporti fisici**. Per esempio i giornali cartacei sono dei supporti fisici per
le notizie del giorno, mentre altri supporti quali i vinili contengono informazione sonora.

In un computer moderno, il supporto fisico può essere di vario tipo (ad esempio transistor o
supporti magnetizzati). Quello che permette l'utilizzo di supporti diversi è il fatto che questi
devono "solamente" memorizzate **bit** (valori binari `0` o `1`, `Alto` o `Basso`, `Positivo` o
`Negativo`, ...). D'altra parte un'informazione che si voglia memorizzare in un computer, deve
poter essere tradotta in una sequenza di bit altrimenti non si possono usare i supporti di
memorizzazione presenti in un computer. La **digitalizzazione** è l'operazione che porta in
*formato digitale* (cioè in numeri, *digit*, che poi possiamo tradurre in bit) l'informazione.

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


**Suono**

**Video**


## Domande e Esercizi

### Domande
* Osserva una "pagina" del tuo social media preferito. Quali sono, secondo te, i *dati* che
devono essere mantenuti da chi gestisce il social media? (Esempi: foto profilo, post, ...)
Per ognuno di questi indica il *dominio* più appropriato, ad esempio scegli un linguaggio
di programmazione e decidi il *tipo* da utilizzare.

### Esercizi
* Utilizzando un linguaggio di programmazione a scelta, scrivere un programma che memorizzi
i *dati* relativi ad un profilo social (si possono utilizzare le risposte alle domande sopra).
Predisporre un programma di test che crei diversi profili (ad esempio 5 profili distinti).

* Per i *dati* memorizzati al punto precedente, scrivere un programma che legga e scriva su file
una *lista* di tali dati. In altre parole, scrivere e leggere da file i dati di più profili
(ad esempio 5 profili). Predisporre un programma che verifichi che il codice sia funzionante e
che lettura e scrittura funzionino (ad esempio scrivendo prima e leggendo poi).
