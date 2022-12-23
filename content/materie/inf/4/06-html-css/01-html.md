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
Un documento HTML è costruito componendo dei "blocchi" chiamati **tag**, sono
disponibili diversi tipi di tag ognuno dei quali indica una specifica parte del
document.

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


## Struttura di un documento HTML5

## Proprietà dei *tag*

### Identificativo `id`

### Classe `class`