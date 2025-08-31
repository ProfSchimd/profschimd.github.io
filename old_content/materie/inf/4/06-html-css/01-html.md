---
title: HTML
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/html-css
weight: 10
summary: "HTML (HyperText Markup Language) è diventato uno standard per la definizione di documenti con contenuti multimediali. L'attuale versione HTML5, insieme a CSS e Javascript, permette la realizzazione di vere e proprie web application in esecuzione sul browser."
---

HTML (*HyperText Markup Language*) è uno standard per la definizione di documenti,
tali documenti possono contenere testo, elementi multimediali (immagini, video,
audio, ...), collegamenti ipertestuali (meglio nodi come *link*) ed altri elementi
interattivi.

HTML è un linguaggio di *markup* che definisce quali sono le parti del documento,
ma **non definisce lo stile del documento**. Per definire lo stile di un documento
HTML, si usano in [CSS]({{< ref "02-css.md" >}}) che sono oggetto di una lezione
successiva.

Essendo un linguaggio di markup, HTML **non è** un linguaggio *WYSIWYG* (*What You
See Is What You Get*), il *rendering* del markup HTML in una pagina (eventualmente
comprensiva degli stili CSS) deve essere effettuata da un apposito software che
chiamiamo *browser*.

Qui sotto vediamo il confronto tra il *markup HTML* (sinistra) visualizzato in un
editor di testo e la corrispondente pagina HTML (destra) visualizzata in un browser.

{{<column/columns>}}
{{<column/col>}}
{{<include "img/hello-html-code.html">}}
{{</column/col>}}
{{<column/col>}}
{{<include "img/hello-html.html">}}
{{</column/col>}}
{{</column/columns>}}


## I *tag* HTML
Un documento HTML è costruito componendo dei "blocchi" chiamati **tag** (o *elementi*),
sono disponibili diversi tipi di tag ognuno dei quali indica una specifica parte
del document.

{{<def>}}
Un **tag** è una porzione di documento che inizia con il *tag di apertura*
```html
<tagname>
```
alcuni tag possono testo e/o altri tag e terminare con il *tag di chiusura*
```html
</tagname>
```
{{</def>}}

Un documento HTML contiene sempre un tag di nome `html` che racchiude l'intero
documento. All'interno del tag `html` sono presenti i due tag `head` e `body`,
il primo contiene informazioni sull'*header* del documento il secondo contiene
il *corpo* del documento.

{{<example>}}
Il seguente documento HTML contiene i tag `html`, `head` e `body` nonché il tag
`title` usato all'interno di `head` per indicare il titolo del documento (che
tipicamente compare nella barra del titolo del browser) e il tag `h1` che
rappresenta un *heading* (cioè un'intestazione) di primo livello.
```html
<!DOCTYPE html>
<title>Hello HTML</title>
<body>
    <h1>Hello HTML!</h1>
</body>
</html>
```
{{</example>}}

{{<observe>}}
Nell'esempio sopra, il tag `html` contiene la dichiarazione `!DOCTYPE` che indica
che il *tipo* di documento è HTML. La presenza di questa dichiarazione rende un
documento HTML un valido documento XML (eXtensible Markup Language), in pratica
la presenza di questa dichiarazione non ha nessun effetto sul documento HTML e
sul suo *rendering* da parte del browser.
{{</observe>}}


## Struttura di un documento HTML
Come abbiamo visto sopra, un documento HTML contiene due parti principali:
* *header* (*intestazione*) contenuto all'interno del tag `head` e
* *body* (*corpo*) contenuto all'interno del tag `body`.
Queste due sezioni si trovano all'interno del tag `html` che racchiude l'intero
document.

```html
<!DOCTYPE html>
<head>
    <!-- header -->
</head>
<body>
    <!-- body -->
</body>
</html>
```

{{<observe>}}
Il tag speciale con apertura `<!--` e chiusura `-->` può essere utilizzato per
racchiudere dei *commenti* che sono blocchi di testo che il browser non considera
quando fa il rendering della pagina (come i commenti in un linguaggio di
programmazione che non vengono considerati dal compilatore/interprete).
{{</observe>}}

### Principali tag
Vediamo qui una lista **non esaustiva** ti tag HTML, esistono un centinaio di tag
e non è possibile elencarli tutti qui, una lista è disponibile sul sito del
[w3school](https://www.w3schools.com/tags/default.asp).

#### Tag dell'header
* `meta` indica informazioni sul documento: autore, codifica, ...
* `link` usato per includere una risorsa esterna
* `script` usato per codice, tipicamente Javascript

#### Tag del body

Block tag
* `h1`, `h2`, ..., `h6` blocco titoli (*heading*) di vari livello 
* `div` blocco generico, utilizzato principalmente per suddividere il documento
in parti
* `p` paragrafo, può contenere testo e altri tag inline
* `ul` crea una lista ordinata (*ordered list*)
* `ol` crea una lista non ordinata (*unordered list*)
* `img` include in immagine utilizzando un URL utilizzando la proprietà `src`
* `video` include un video utilizzando un URL
* `audio` include un audio utilizzando un URL

Inline tag
* `a` crea un collegamento ipertestuale (*link*) indicando un URL utilizzando la proprietà `href`
* `span` identifica una porzione di testo, normalmente utilizzato per indicare
lo stile parte di un testo
* `em` enfatizza un testo (tipicamente in *italics*)
* `strong` evidenzia un testo (tipicamente in **bold**)
* `b` rende un testo **bold**
* `i` rende un testo *italics*
* `u` rende un testo <u>sottolineato</u>
* `input` indica un elemento di input form (text area, button, ...)

Tabelle
* `table` indica la tabella
* `tr` indica la riga di una tabelle
* `th` indica una cella di intestazione della tabella
* `td` indica una cella della tabella

### Tag semantici
I tag semantici sono dei tag che non hanno un impatto sul layout e sul rendering
del documento, ma servono ad indicare il significato (*semantica*) del contenuto.

* `header` parte di *intestazione* del documento, da non confondere con `head`
il cui contenuto non viene visualizzato nel browser
* `nav` parte di *navigazione*, normalmente contiene i link, i menù, ...
* `main` parte *principale* del documento
* `side` parte *secondaria* del documento
* `footer` parte a *pié di pagina*

### Esempio: post in un blog
Per vedere in azione la maggior parte dei tag descritto sopra, vediamo un esempio
di documento HTML per un ipotetico blog tecnologico. In questo post recensiremo il
nuovo *uPhone 42* ultimo ritrovato della tecnologia.

Il [codice completo][2] dell'esempio è disponibile nel [repository][5]
che accompagna la presente lezione. Di seguito andremo ad analizzare le varie
parti che compongono tale codice.

Iniziamo con l'header della pagina contenuto nel tag `head`

```html
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <title>Recensione del nuovo uPhone | Cool Guy blog</title>
</head>
```

Vediamo ora le varie parti del `body` cominciando dal titolo inserito in un
elemento `header` e dall'indice inserito in un elemento `nav`.

```html
<header>
    <h1>È arrivato il nuovo uPhone 42</h1>
    <h3>Si tratta dello smartphone definitivo</h3>
    <hr>
</header>
<nav>
    <ul>
        <li><a href="#spec">Specifiche</a></li>
        <li><a href="#pro">Pro</a></li>
        <li><a href="#contro">Contro</a></li>
        <li><a href="#giudizio">Il nostro giudizio</a></li>
    </ul>
</nav>
```

All'interno dell'`header` abbiamo tre elementi: titolo `h1`, sottotitolo `h3` e
un linea orizzontale `hr`. All'interno del `nav` abbiamo una lista non ordinata
in cui ogni elemento `<li>...</li>` contiene il link alla sezione del documento
corrispondente. Ad esempio il secondo link con testo `Pro` sarà "ancorato"
all'elemento html con `id` uguale a `#pro` (più dettagli su `id` [sotto](#identificativo-id)).

Successivamente troviamo una sezione `main` all'interno della quale troviamo un
tag `div` il cui contenuto comprende diversi paragrafi `p`. Nei vari paragrafi
si può vedere l'utilizzo di alcuni dei più comuni tag di formattazione `em`,
`strong`, `i`, `u`, ...

```html
<main>
    <div>
        <p> ... </p>
        ...
    </div>
</main>
```

Tra i vari tag presenti troviamo il tag `img` per includere immagini

```html
<img src="...">
```

si noti come la [proprietà](#proprietà-dei-tag) `src` indichi l'URL dell'immagine
da inserire nel documento.

Un'altro tag importante che si trova nell'esempio è `table` utilizzato per includere
una tabella.
```html
<table>
    <tr>
        <th></th>
        <th>Processore</th>
        <th>RAM</th>
        <th>Schermo</th>
        <th>Prezzo lancio (minimo)</th>
    </tr>
    <tr>
        <th>uPhone 42</th>
        <td>Intel 8086 16Mhz</td>
        <td>64k</td>
        <td>King Kong Glass</td>
        <td>999€</td>
    </tr>
    ...
</table>
```

Una tabella HTML viene definita per righe, il contenuto di ogni riga va inserito
all'interno del tag `tr` (*table row*) definendo il contenuto di ogni cella in un
tag `td` o `th` se si tratta di una cella di intestazione.

L'ultima parte del documento di esempio contiene il *footer* (intestazione a piè
di pagina) all'interno del tag `footer`. In questo esempio troviamo un linea
orizzontale `hr`, e un elemento `div` contenente le informazioni da visualizzare
nel footer.

```html
<footer>
    <hr>
    <div>
        Copyright 2022 - 2023<br>
        <a href="mailto:me@coolguy.com">Cool Guy</a>
    </div>
</footer>
```

## Proprietà dei *tag*
Le **proprietà** dei tag sono delle informazioni che vengono associate ad uno
specifico tag. Ogni proprietà ha un *nome* ed un *valore*, sia nome che valore
sono delle stringhe che il browser interpreta durante il rendering del documento.

Le proprietà si indicano insieme all'apertura del tag utilizzando la sintassi
```html
<tag nome="valore">...</tag>
```

Il seguente esempio mostra l'utilizzo delle proprietà in alcuni casi comuni.

```html
<a href="https:///www.google.it">Cerca</a>
<img src="/logo.png" >
<div id="content">
    <!-- Content -->
</div>
```

* La proprietà `href` di `a` indica l'URL del link.
* La proprietà `src` di `img` indica l'URL dell'immagine da inserire.
* La proprietà `id` indica un identificativo dell'elemento.

### Identificativo `id`
All'interno di un documento HTML è possibile definire un identificativo univoco
associato ad un elemento. Tale identificativo, la cui presenza è facoltativa,
si indica utilizzando la proprietà `id` dell'elemento. L'esempio sotto mostra
come definire un identificativo (in breve `id`) per un ancora `a` un `div` e una
porzione di testo `span`.

```html
<a id="clickme">Clicca qui</a>
<div id="content">
    <!-- Content here -->
    <span id="name">John Smith<span> was standing still ...
</div>
```

{{<attention>}}
Il fatto che gli `id` siano univoci all'interno di un documento HTML non viene
esplicitamente imposto dal browser, ma deve essere il programmatore a garantire
che tale proprietà sia vera.

In altre parole, il browser effettua comunque il rendering di una pagine anche
se sono presenti più tag con lo stesso `id`. Tipicamente l'utilizzo di `id`
duplicati porta ad un non corretto rendering a ad un funzionamento anomalo del
codice di scripting. Per questo motivo è sempre importante che il programmatore
garantisca che gli `id` assegnati ai vari tag siano univoci.
{{</attention>}}

### Classe `class`
Mentre `id` definisce univocamente un elemento all'interno di un documento HTML,
è possibile definire una *classe* di elementi utilizzando la proprietà `class`.
Vedremo che in [CSS]({{< ref "02-css.md" >}}) l'utilizzo delle classi (come anche
l'utilizzo di `id`) rappresenta uno strumento fondamentale per definire lo stile
di un documento.

L'esempio seguente attribuisce la classe a diverse elementi.

```html
<div id="content" class="color-dark">
    <a class="button color-blue">Click here to start</a>
    <a class="button color-dark">Help</a>
</div>
<div class="color-dark">
</div>
```

Si noti che
* La stessa classe può essere attribuita ad elementi diversi, ad esempio la classe
`color-dark` è stata assegnata ad entrambe i `div`.
* Un elemento può avere più classi i due link `a` hanno due classi `button` e `color-*`,
questo secondo diverso nei vari link.
* Id e classe possono entrambi essere definiti, ad esempio il primo `div` definisce sia
`id` (in questo caso `content`) sia `class` (in questo casa `color-dark`).

### Altre proprietà

Discutiamo qui altre proprietà spesso presenti nei documenti HTML
* `style` indica lo stile dell'elemento, questa proprietà non dovrebbe essere
utilizzata se non in casi estremi. Lo stile degli elementi è meglio definirlo
mediante i [fogli di stile (CSS)]({{< ref "02-css.md" >}}).
* `role` indica il *ruolo* dell'elemento, si tratta di una proprietà semantica
utilizzata, soprattutto, per migliorare l'*accessibilità* del documento.
* `href` e `src` indicano l'URL della risorsa corrispondente, `href` si usa per
indicare il link nei tag `a`, mentre `src` si usa per indicare l'URL della risorsa
da inserire (nei tag `img`, `video`, `audio` ed altri).

## Link utili e materiale di studio

* [Tutorial W3School][1]
* [Materiale MDN][3] vedere i [Beginner's tutorials][4]
* [Repository per la lezione][5]


[1]: https://www.w3schools.com/html/
[2]: https://github.com/ProfSchimd/teaching-material/blob/main/inf/html-css/example-post-noprop.html
[3]: https://developer.mozilla.org/en-US/docs/Web/HTML
[4]: https://developer.mozilla.org/en-US/docs/Learn/HTML
[5]: https://github.com/ProfSchimd/teaching-material/blob/main/inf/html-css/