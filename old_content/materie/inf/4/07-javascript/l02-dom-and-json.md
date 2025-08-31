---
title: "Laboratorio 2: Utilizzo di un JSON per creare un DOM"
type: lecture
weight: 2000
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/javascript/json-dom
summary: "In questo laboratorio si utilizzano le primitive asincrone di Javascript per recuperare un file JSON il cui contenuto verrà utilizzato per popolare dinamicamente il DOM di un documento HTML."
---

## Struttura del JSON
Ricordiamo che un JSON è una rappresentazione *strutturata* di dati, in questo
laboratorio utilizzeremo un file JSON sintetico un cui estratto è riportato di
seguito (l'intero file si può trovare nel repository online)

```json
{
    "products": [
        {
            "name": "Smartphone Samsung Galaxy S21",
            "description": "Smartphone Samsung Galaxy S21 5G 128GB Phantom Gray",
            "price": 999.99,
            "stock": 10,
            "pictures": [
                "./images/samsung_galaxy_s21_1.jpg",
                "./images/samsung_galaxy_s21_2.jpg",
            ]
        },
        {
            "name": "Laptop Dell XPS 13",
            "description": "Laptop Dell XPS 13 9310 13.4-inch FHD+ Touch Laptop",
            "price": 1399.99,
            "stock": 5,
            "pictures": [
                "./images/dell_xps_13_1.jpg",
                "./images/dell_xps_13_2.jpg",
                "./images/dell_xps_13_3.jpg",
                "./images/dell_xps_13_4.jpg"
            ]
        },
    ]
}
```

## Recuperare file con `fetch`
Vediamo ora come recuperare un file JSON mediante Javascript, tale file può
trovarsi ad un URL qualsiasi, tuttavia è necessario che il server che ospita tale
file abiliti il meccanismo di *Cross-Origin Resource Sharing (CORS)* altrimenti
la richiesta verrà bloccata.

```javascript
jsonUrl = 'https://...'; 
fetch(jsonUrl)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
```

Vale la pena notare che:
* il metodo `then` accetta come parametro una funzione, nell'esempio si sono
usate *arrow function*, ma questo non è il solo modo;
* è stata utilizzata una sequenza di chiamate `.then`  `.catch` per gestire
l'intera catena di operazione: scarica JSON, elabora JSON cattura eventuali
errori.

### `Promise`

Il codice sopra mostra l'utilizzo della *funzione asincrona* `fetch` che permette
di fare una richiesta HTTP senza bloccare il normale flusso (per eseguire  la
richiesta viene creato un [thread]({{< ref "processi-e-thread.md" >}}) apposito).

La funzione `fetch` restituisce un oggetto di tipo [`Promise`][1] che rappresenta
una "promessa" di terminazione di una sequenza di istruzioni che produce
un risultato o un errore. Quando la promise
termina, la funzione che gli viene agganciata mediante il metodo `then` viene
eseguita. Il parametro passato a questa funzione (chiamato `res` nell'esempio
sopra) rappresenta l'esito della richiesta.

Nell'esempio sopra è stato utilizzato il metodo `json()` della classe `Response`
(che è la classe della risposta ad un fetch). La caratteristica interessante di
tale metodo è che anche esso restituisce un `Promise` ed è quindi possibile
creare una *catena* di *promises* utilizzando una seconda volta `then`, in questo
secondo utilizzo il parametro è l'oggetto JSON decodificato che è ora disponibile
per essere processato (nell'esempio se esegue una semplice stampa sulla console).

### Gestione degli errori con `Promise`
È sempre buona norma gestire eventuali situazioni di errori, normalmente si
notifica l'utente che qualcosa è andato storno e si mostra una pagine contenente
tale comunicazione (con eventuali azioni che l'utente può intraprendere).

Quando si utilizzano i `Promise`, gli errori possono verificarsi in maniera
asincrona, ad esempio la richiesta per il JSON fa in *timeout* (magari il link
inserito non è corretto). Per gestire situazioni di errori, si usa l metodo
`catch` alla fine della catena di promise. Questo metodo richiede una funzione
come parametro alla quale verrà passato l'errore (nell'esempio sopra l'errore
viene stampato sulla console).

{{<exercise>}}
Creare un progetto con un file HTML, un file CSS ad esso collegato ed un file
contenente il codice Javascript. Dopo aver collegato il file Javascript al file
HTML indicare nel body la funzione che rappresenterà il *main* dello script

```html
<body onload="main()">
<!-- Qui l'HTML statico -->
</body>
```

Infine realizzare la funzione `main` nel file di script
```javascript
function main() {
    // codice
}
```
{{</exercise>}}

{{<observe>}}
L'utilizzo della proprietà `onload` di `<body>` così come suggerito nell'esercizio
precedente permette di eseguire del codice Javascript **avendo garanzia che l'intero
DOM sia stato costruito**. In questo modo è possibile accedere agli elementi del DOM
senza incorrere nella possibilità che questi non sia ancora del tutto inizializzati.
{{</observe>}}

## Interfaccia Javascript per il DOM
Il *DOM (Document Object Model)* rappresenta il documento HTML nella memoria del
browser e viene usato da questo per il *rendering* della pagina e per applicare
gli stili ai vari elementi.

Quando un documento HTML viene caricato dal browser (ad esempio accedendo ad un
sito web), esso genera il DOM a partire dal documento. Ovviamente, è possibile
per il browser aggiungere, modificare ed eliminare elementi dal DOM presente in
memoria. Queste operazioni possono essere invocate dal programmatore utilizzando
i metodi Javascript appropriati che sono accessibili tramite l'oggetto `document`.

### Accesso al DOM
Cominciamo con il vedere in che modo è possibile recuperare un elemento presente
nel DOM. Il primo insieme di metodi che vediamo permette di accedere agli elementi
già presenti nel DOM. Per identificare un elemento, si usano i *selettori CSS*,
esattamente nello stesso modo in cui li si usano per applicare gli stili. Ad
esempio l'elemento con id `content` sarà accessibile con il selettore `#content`,
gli elementi con classe `warning` saranno accessibili mediante il selettore
`.warning`.

Per la discussione che segue, faremo riferimento al seguente documento HTML

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
    <title>JSON e DOM</title>
</head>
<body onload="main()">
    <div id="header">
        <h1>Laboratorio 2: JSON e DOM</h1>
        <h2 class="subtitle'">Utilizzo di un JSON per creare un DOM</h2>
    </div>
    <div id="content">
        <!-- Content here -->
    </div>
    <div id="footer">
        <p>This is the footer</p>
    </div>
</body>
</html>
```

#### I metodi `querySelector` e `querySelectorAll`
Il modo più diretto per accedere ad un elemento del DOM è utilizzare uno dei due
metodi [`querySelector`][2] o [`querySelectorAll`][3]. Il primo restituisce sempre un solo
elemento, il secondo restituisce sempre un `Array` (che può contenere uno o più
elementi, ma può anche essere vuoto). Sia `querySelector` che `querySelectorAll`
richiedono un parametro che rappresenta il selettore CSS da utilizzare nella
selezione, vediamo qualche esempio.

```javascript
// element (not necessarily a div) with id content
const contentElement = document.querySelector('#content');
console.log(contentElement); 
// >> <div id="content">

// get the first h2 having the class subtitle
const subtitleH2 = document.querySelector('h2.subtitle');
console.log(subtitleH2);
// >> <h2 class="subtitle">

// get all elements of type div
const allDiv = document.querySelectorAll('div');
console.log(allDiv);
// >> NodeList(3) [ div#header, ... ]
```

#### Altri metodi di accesso
I metodi `querySelector` e `querySelectorAll` sono stati introdotti relativamente
di recente, per questo spesso si trovano (e si usano) metodi diversi.

* [`getElementById(id)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById): restituisce l'elemento con `id` dato
* [`getElementByTagName(tagName)`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName): restituisce una collezione di elementi HTML con il tag dato
* [`getElementByClassName(names)`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName): restituisce un array con tutti gli elementi che hanno le classi date

### Manipolazione del DOM
Oltre ad "interrogare" il DOM via Javascript, possiamo anche modificare il DOM
inserendo e/o cancellando elementi. **Ricordiamo che il DOM è una struttura ad
albero** per questo motivi, i metodi utilizzati utilizzano la terminologia
tipica degli alberi (*child*, *sibling*, *parent*, ...).

#### Creazione di elementi
Gli elementi all'interno del DOM sono rappresentati come oggetti Javascript,
questi oggetti vanno creati prima di poterli inserire nel DOM stesso. Per questo
scopo, l'interfaccia Javascript al DOM fornisce il metodo [`createElement`][4].
Il metodo `createElement` richiede che il nome del tag da creare venga indicato,
nell'esempio sotto, un elemento di tipo `div` viene create ed assegnato alla
constante `newDiv`

```javascript
const newDiv = document.createElement('div');
```

{{<attention>}}
La creazione di un elemento con `createElement` **non inserisce l'elemento
appena creato nel DOM**.
{{</attention>}}

#### Aggiungere elementi al DOM
Una volta creato un elemento, il suo inserimento all'interno del DOM richiede
che si identifichi di preciso in che punto dell'albero inserire l'elemento.
Ricordiamo che in un albero ogni elemento (nodo) è figlio di un altro nodo, a
meno che non si tratti della radice. In un documento HTML la radice del DOM
è l'elemento relativo al tag `<html>` e di norma viene gestito dal browser.
Di conseguenza, per inserire un nuovo elemento dobbiamo identificare il
genitore (*parent*) di cui il nuovo elemento sarà un figlio (*child*). Per lo
scopo si possono usare i metodi di [accesso al DOM](#accesso-al-dom).

Una volta ottenuto l'elemento genitore, possiamo usare il metodo `append`
per aggiungere il nuovo elemento come figlio. Il codice di esempio sotto
inserisce un nuovo `<div>` come figlio dell'elemento di id `content`.

```javascript
document.querySelector('#content').append(createItemDiv());
```

Il metodo `append` può essere usato anche per aggiungere del testo
semplice (senza HTML). Ad esempio il codice seguente crea un tag
`<h1>` contenente il testo `Titolo in h1`.

```javascript
const titleElement = document.createElement('h1').append('Titolo in h1');
```

{{<exercise>}}
Utilizzando l'array di elementi contenuto nel JSON scaricato, creare per ognuno
di questi elementi un `<div>` contenente un elemento `<h4>` con il contenuto
dell'elemento `name` nel JSON. Il risultato deve essere equivalente al
seguente HTML
```html
<div id="content">
    <div>
        <h4>Smartphone Samsung Galaxy S21</h4>
    </div>
    <div>
        <h4>Laptop Dell XPS 13</h4>
    </div>
</div>
```
{{</exercise>}}


### Gestione dello stile via Javascript
Per aggiungere uno stile utilizzando Javascript si può utilizzare la proprietà
`classList` che offre i metodi `add` e `remove` per aggiungere o rimuovere
classi. Ad esempio, il codice sotto aggiunge la classe `with-border` ad un
 `div` appena creato.

 ```javascript
 const newDiv = document.createElement('div');
 newDiv.classList.add('with-border');
 ```

 ## Interazione
 All'interno di una pagina Web spesso è possibile interagire con gli elementi
 per modificare il contenuto visualizzato o per altri scopi. Ad esempio in un
 sito di commercio elettronico, è auspicabile la possibilità di *filtrare* i
 contenuti o ri-ordinare secondo qualche criterio di interesse. Un altro esempio
 in ambito *e-commerce* è la gestione del *carrello*, un sito deve permettere
 l'aggiunta e la rimozione di oggetti (*item*) dal carrello in modo semplice
 ed intuitivo.

 ### Gestione eventi
 Dal punto di vista dello sviluppatore, ogni interazione tra utente e documento
 genera un *evento*. Un evento viene gestito e segnalato dal browser, è possibile
 "agganciare" il nostro codice in modo che venga *notificato* quando un evento
 si verifica. Una funzione che deve essere eseguita quando una evento accade viene
 definita **event listener**.

 In Javascript è possibile aggiungere uno o più event listener ad ogni elemento
 del DOM utilizzando il metodo `addEventListener`, l'esempio che segue mostra come
 aggiungere un event listener all'evento `click` dell'elemento di id `clickme`

 ```javascript
 const clickMe = document.querySelector('clickme');
 clickMe.addEventListener('click', () => console.log('clicked!!'));
 ```

 Il metodo `addEventListener` prende due parametri:

* **type**: indica il tipo di evento che si vuole gestire, come `click` per un click del mouse;
* **listener**: indica la funzione che deve essere eseguita quando si verifica l'evento specificato,
nell'esempio sopra questa funzione è una *arrow function*. 

### Implementazione dell'*event listener*
L'*event listener* che viene invocato ogni volta che si verifica un evento deve
contenere la logica necessaria a realizzare il comportamento desiderato. Ad
esempio, in un sito di *e-commerce* il click su `Add to cart` aggiunge l'elemento
corrispondente al carrello.

 ## Riassunto metodi manipolazione DOM

* [`querySelector`][2]
* [`querySelectorAll`][3]
* [`createElement`][4]
* [`append`][5]
* [`classList`][6]


## Riferimenti
* [MDN Guida DOM (EN)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
* [W3School DOM Tutorial()](https://www.w3schools.com/js/js_htmldom.asp)
* [MDN Guida eventi (EN)](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Element/append
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
