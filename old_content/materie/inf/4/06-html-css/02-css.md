---
title: CSS
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/html-css
weight: 20
summary: "I CSS (Cascading Style Sheet) contengono lo stile da applicare ai vari elementi di una pagina HTML. Questa lezione introduce i concetti base sui CSS (selettori, regole, proprietà, ...)."
---

Un documento HTML descrive il contenuto della pagina, ma non il suo formato.
Quando il browser riceve un documento HTML da un server, per visualizzarlo procede
con il *rendering* utilizzando delle regole ben precise. Ad esempio un elemento
`h1` viene visualizzato in grassetto con un font grande, mentre un'ancora `a`,
solitamente, viene visualizzato come un testo (blu o viola) sottolineato.

Lo *stile* che il browser impone ad un documento HTML può essere modificato
utilizzando i *Cascading Style Sheet (CSS)* (in italiano, *fogli di stile*). Un
CSS è composta da una lista di *regole*, ogni regola indica uno o più elementi
e le proprietà da impostare per tali elementi. Ad esempio una regola può prescrivere
che tutti gli elementi `h1` utilizzino un font di `32pt` e colore rosso, un'altra
regola può cambiare una specifica ancora da sottolineato a non e così via.

Per inserire un CSS in un documento sono possibile diverse vie, le due più comuni
sono:
* aggiungere le regole all'interno di un tag `<style>...</style>` nel documento,
* includere un file con `<link href="style.css" rel="stylesheet">` nell'`head`
del documento.

Infine è possibile cambiare lo stile programmaticamente utilizzando codice
Javascript, questo caso lo tratteremo nelle lezioni dedicate a Javascript.

## Formato delle regole
In CSS ogni regola ha il seguente formato
```css
selector {
    prop1: value1;
    prop2: value2;
    /* ... */
}
```

* `selector` è un [selettore](#selettori) che permettono di indicare quali elementi
saranno soggetti alla regola, ad esempio `h1` indica tutti gli elementi con questo tag;
* `prop` è il nome di una proprietà, ad esempio `color` rappresenta il colore del testo;
* `value` è il valore che la regola assegna alla proprietà dichiarata, ad esempio `red`
indica il colore rosse (uguale a `#F00` o `#FF0000`).

Se, ad esempio, vogliamo cambiare la dimensione ed il colore di tutti gli elementi `h1`,
possiamo usare la seguente regola

```css
h1 {
    font-size: 32pt;
    color: red;
}
```

## Selettori
Come visto [sopra](#formato-delle-regole), una regola inizia sempre indicando
uno (o più) **selettori**, un selettore indica quali elementi saranno soggetti
alla regola. Esistono diversi tipi di selettori, i più importanti sono:
* **type** selector: seleziona un elemento, ad esempio `h1`, `a`, `input`, ...;
* **class** selector: seleziona tutti gli elementi che hanno un certo valore della
proprietà `class`;
* **id** selector: seleziona l'elemento con un dato valore della proprietà `id`;.       

Per una lista completa dei selettori disponibili si può consultare [questa guida][3].

Il seguente frammento CSS contiene tre regole, una per il tipo `a`, una la class
`link` ed un'altra per l'id `content`. Da notare che nel selettore il nome della
classe è preceduto da un punto `.` ed il nome dell'id è preceduto da un cancelletto
`#`.
```css
a {
    text-decoration: none;
    color: green;
}
.link {
    color: magenta;
    font-weight: 800;
}
#content {
    background-color: #FFC;
}
```

CSS mette a disposizioni altri tipi di selettori (consultare i [riferimenti](#riferimenti))
per una lista completa) alcuni dei quali sono frequentemente usati. Un esempio è il
selettore `selettore:hover` che si riferisce allo stato di *hovering* (passaggio son il
mouse) degli elementi indicati dal selettore. Ad esempio il codice sotto rende grassetto
il testo di ogni elemento con classe `emphasis` quando si passa sopra con il mouse.
```css
.emphasis:hover {
    font-weight: 800;
}
```

Un utilizzo molto comune di `hover` è sottolineare un link quando si passa con il mouse
(ovviamente lo stile di `a` deve essere `text-decoration: none` per poter vedere la
differenza).

```css
a:hover {
    text-decoration: underline;
    cursor: pointer;
}
```

la seconda regola: `cursor: pointer` cambia il cursore del mouse quando si passa
sopra ad un link.

### Combinare selettori
È possibile rendere il CSS più compatto utilizzando la stessa lista di regole per
diversi selettori, sarà sufficiente elencare i selettori separandoli da una virgola.
```css
a:hover, .link:hover {
    text-decoration: underline;
    cursor: pointer;
}
```

Inoltre è possibile combinare più selettori per indicare situazioni più specifiche.
* **Discendente** `sel1 sel2` applica la regola a tutti gli elementi `sel2` che si
trovano dentro `sel1` (a qualsiasi livello).
* **Figlio** `sel1 > sel2` applica la regola a tutti gli elementi `sel2` che sono
figli *diretti* (non nipoti, pronipoti, ...) di `sel1`.

{{<attention>}}
È facile confondere la lista di selettori separati dalla virgola che indica *applica
a tutti* con la combinazione di due selettori separati da spazi che indica *applica
al secondo se è all'interno del primo*.
{{</attention>}}


## Proprietà
La lista di proprietà disponibili in CSS è estremamente vasta, nei [riferimenti](#riferimenti)
si possono trovare diverse risorse dove reperire informazioni su proprietà, qui
di seguito ne vediamo solo alcune tra le più importanti.

Proprietà per la gestione dei font
* `color`: imposta il colore di *foreground*, tipicamente del testo
* `background-color`: imposta il colore di *background*
* `font-family`: imposta il tipo di font
* `font-size`: imposta la dimensione del font
* `font-weight`: imposta la "grossezza" del font

Proprietà per la gestione del *box model*
* `padding`: aggiunge spazio intorno al testo, ma dentro l'elemento
* `margin`: aggiunge spazio intorno all'elemento, ma fuori da esso
* `border`: gestisce il bordo (colore, stile, distanza), da usare con cautela in
quanto ha un comportamento particolare.

Altre proprietà usate di frequente
* `text-decoration`: gestisce l'abbellimento del testo
* `height` e `width`: altezza e larghezza di alcuni elementi (es. immagini, div, ...)

## Esempi

{{<attention>}}
Esistono centinaia di proprietà e centinaia di selettori, qui possiamo solo vedere
un **piccolissimo numero di esempi CSS**, i link riportati nei [riferimenti](#riferimenti)
sono un punto di partenza per esplorare altri esempi.
{{</attention>}}

### Applicare una regola a tutto il documento
Spesso si vogliono applicare alcune regole all'intero documento HTML, ad esempio
il font da utilizzare, spesso, è lo stesso ovunque, oppure il colore di sfondo
deve essere uguale per tutti gli elementi. Ci sono due possibilità "ovvie" utilizzando
un *type selector*: `html` e `body`, il primo si applica all'intero documento
(chiamato anche *root selector*), il secondo si applica solo al `body`. In HTML
sappiamo che sono ciò che è presente nel body viene mostrato nella pagina, perciò
i due selettori hanno lo stesso effetto.

Il seguente codice imposta un font tipo Times New Roman, uno sfondo uniforme ed un
colore di testo grigio scuro.
```css
html {
    font-family: 'Times New Roman', Times, serif;
    background-color: antiquewhite;
    color: #333;
}
```

### Titolo centrato con bordo
In questo esempio creiamo un titolo centrato con un bordo grigio ed
aggiungiamo un po' di spaziatura (margine e padding) per renderlo migliore
il layout.

```css
h1 {
    margin: 10px 50px;
    border: 1px solid gray;
    padding: 10px;
    text-align: center;
}
```

### Menù di navigazione (*navigation bar*)
Un utilizzo importante e frequente degli stili CSS riguarda la creazione del tipico
menù in una pagina HTML. In [questo tutorial](https://www.w3schools.com/css/css_navbar.asp)
viene spiegato passo-passo la creazione di una *navigation bar*, quin vediamo solo
un breve riassunto (è).

Prima di discutere le varie regole CSS, riportiamo codice HTML con il CSS nel tag `style`.
Si noti come il menù venga descritto utilizzando un `ul`, essendo ogni item del menù un
`li`. Anche se non indicato nel codice sotto, è comune inserire il menù all'interno di 
un elemento `nav`.

```html
<!DOCTYPE html>
<html>
<head>
<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04AA6D;
}
</style>
</head>
<body>

<ul>
  <li><a href="#home">Home</a></li>
  <li><a href="#news">News</a></li>
  <li><a href="#contact">Contact</a></li>
  <li style="float:right"><a class="active" href="#about">About</a></li>
</ul>

</body>
</html>
```

Per prima cosa si applica lo stile ad `ul`
```css
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
```

oltre allo sfondo, padding e margine, questo stile elimina i punti dall'elenco
(ricordiamo che `ul` di norma crea un elenco puntato) ed utilizza `overflow: hidden`
che è necessario altrimenti gli elementi `li` sarebbero "invisibili".

Per quanto riguarda `li` e gli `a` in essi contenuti

```css
li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
```

notiamo che vi sono diverse proprietà di *layout*: `float: left` e `display: block`
(maggiori dettagli in [questa lezione]({{< ref "03-css-layout.md" >}})).

Infine per le proprietà `hover` abbiamo la seguente regola

```css
li a:hover:not(.active) {
  background-color: #111;
}
```

che, apparentemente strana, si applica agli elementi `a` all'interno di `li` quando
il mouse è `hover`, ma la classe non è `active`.

## Riferimenti

* [MDN "CSS Basics"][1]
* [W3School CSS Tutorial][2]
* [Code Pen: snippet HTML, CSS e Javascript][10]

[1]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
[2]: https://www.w3schools.com/css/ 
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors

[10]: https://codepen.io/
