---
title: "Stateful widget"
type: lecture
weight: 20
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/flutter/02_stateful_widget
summary: "In questa lezione viene affrontato il tema degli stateful widget vale a dire quei widget che memorizzano uno stato dal quale dipende il rendering del widget stesso."
---

## Cosa sono gli *stateful* widget

Per motivi di efficienza, il *motore di rendering* di Flutter determina quali
widget necessitano di essere ridisegnati (*re-rendered*) e quali no, in questo
modo è possibile mantenere fluida e responsiva l'applicazione.

Per determinare se un widget necessita di essere ridisegnato è necessario sapere
se qualcosa è cambiato dall'ultimo rendering e se quel cambiamento influisce sul
widget. Ovviamente quei widget che non cambiano mai, non dovranno mai essere ridisegnati
e questo può accadere, ad esempio, quando un widget non ha uno stato interno, cioè
si tratta un *stateless widget*.

Per contro molti dei widget che vengono mostrati dall'applicazione possiedono uno
stato interno che cambia durante l'esecuzione dell'applicazione. Ad esempio una lista
di immagini può cambiare perché nuove immagini vengono caricati, oppure una lista
di messaggi può cambiare perché ne arrivano di nuovi. In Flutter dobbiamo esplicitamente
dichiarare quei widget che possiedono uno stato utilizzando gli *stateful widget*

In questa lezione capiremo:
* la differenza tra *stateful* e *stateless* widget,
* come realizzare semplici `StatefulWidget`.

In questa lezione utilizzeremo l'applicazione Flutter *clicker counter* che può essere
generata automaticamente usando una IDE (es. VS Code o FlutLab). Tale applicazione
contiene 
* un `StatelessWidget` che rappresenta la struttura *material design* dell'app,
* un `StatefulWidget` che rappresenta la parte non fissa dell'app.

{{<attention>}}
Non bisogna confondere un widget con i suoi *discendenti* (figli, nipoti, ...), infatti, mentre
il widget `MaterialApp` del nostro esempio è stateless, uno dei suoi discendenti
(quello che tiene il conto dei click) è un stateful widget. 

La progettazione Flutter permette al motore di rendering di ridisegnare solo quei
widget che cambiano. I widget che non sono da ridisegnare (ad esempio gli stateless)
non vengono ridisegnati anche se alcuni dei suoi discendenti saranno ridisegnati.
{{</attention>}}

{{<exercise>}}
Per meglio comprendere i concetti spiegati in questa lezione, si consiglia di procedere
con la realizzazione di un'applicazione diversa da quella qui presentata. Ad esempio è
possibile usare le API [Chuck Norris API](https://api.chucknorris.io/) per recuperare in
[maniera asincrona]({{< ref "l01-async-http.md" >}}) barzellette casuali a tema Chuck Norris.
{{</exercise>}}

## Creazione di uno *stateful widget*
Il tipico *workflow* per creare uno stateful widget prevede l'implementazione di due classi
1. una classe che estende `StatefulWidget`
2. una classe che estende `State<...>`.

Nell'esempio preso in considerazione queste due classi si chiamano `MyHomePage` e
`_MyHomePageState` rispettivamente. Va sottolineato che la scelta xi rendere la
seconda classe *library private* (con l'underscore iniziale) non è obbligata, ma
solo consigliata.

### La sottoclasse di `StatefulWidget`

La classe `MyHomePage` contiene semplicemente il titolo e il metodo `createState()`

```dart
class MyHomePage extends StatefulWidget {
  final String title;
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  @override
  _MyHomePageState createState() => _MyHomePageState();
}
```

### La sottoclasse di `State`
La [classe `State`][1] è
la classe Flutter che si occupa di gestire lo stato di un widget. Lo stato va gestito
nel senso che è necessario tenere traccia di eventuali suoi cambiamenti.

Per utilizzare la [class `State`][1], questa va estesa specializzandolo con il
`StatefulWidget` di cui rappresenta lo stato. All'interno della classe ottenuta
verranno, inoltre, memorizzate le variabili di classe che rappresentano lo stato.

Nel nostro esempio, la dichiarazione di questa classe sarà la seguente

```dart
class _MyHomePageState extends State<MyHomePage> {
    int _counter = 0;
    // ...
}
```
Si noti che nella dichiarazione della classe abbiamo aggiunto la variabile di istanza
`_counter` (rendendola *library private*) che sarà il nostro *stato* (il conteggio del
numero di volte che il pulsate è stato cliccato).

Tale dichiarazione, tuttavia, genera un errore di compilazione se non si provvede
ad implementare (`@override`) il metodo `build` che ha il compito di restituire un
`Widget` che verrà costruito sulla base dello stato interno.

```dart
class _MyHomePageState extends State<MyHomePage> {
    int _counter = 0;
    // ... 
    @override
    Widget build(BuildContext context) {
        // ...
    }
}
```

#### Aggiornamento dello stato
Per aggiornare lo stato in una classe che estende `State` **bisogna utilizzare il
metodo `setState` della classe `State` stessa**. La sintassi di `setState` prevede
che venga passato come parametro uan funzione che cambia lo stato (cioè l variabili
di istanza). Nel nostro esempio lo stato verrà cambiato ad ogni click e questo
cambiamento sarà un incremento `_counter++`. Il modo corretto per realizzare questo
incremento è attraverso il metodo `setState`, normalmente si usa un *metodo wrapper*
all'interno del quale si chiama `setState`.

```dart
class _MyHomePageState extends State<MyHomePage> {
    int _counter = 0;
    void _incrementCounter() {
        setState(() {
            _counter++;
        });
    }
    @override
    Widget build(BuildContext context) {
        // ...
    }
}
```

{{<attention>}}
È fondamentale che l'aggiornamento dello stato avvenga utilizzando il metodo
`setState`, infatti Flutter utilizza questo metodo per aggiornare l'interfaccia,
se necessario. 

In certi casi può accadere che l'interfaccia si aggiorni anche senza l'uso di
`setState`, se questo accade, tuttavia, è probabile che sia stato un qualche altro
evento a richiedere il ridisegno dell'interfaccia e che, per puro caso, si sia
osservato anche il refresh dello stato.
{{</attention>}}

La parte di `_MyHomePageState` che ci rimane da discutere è il corpo del metodo `build`
il quale contiene una sola istruzione `return` che restituisce il widget da visualizzare.
Questo widget interagisce con lo stato in due modi
1. accedendo alla variabile `_counter` per leggere lo stato e
2. invocando il metodo `_incrementCounter` per aggiornare lo stato.

Il rimanente codice crea un widget di tipo `Scaffold` che contiene il layout
dell'applicazione, il risultato è la seguente classe `_MyHomePageState`

{{<highlight dart "linenos=table">}}
class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title)),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:',),
            Text('$_counter',style: TextStyle(fontSize: 25),),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter, tooltip: 'Increment', child: Icon(Icons.add),
      ), 
    );
  }
}
{{</highlight>}}

Si noti l'utilizzo dello stato:
* alla riga `19` la variabile `_counter` viene usata all'interno di un `Text`,
* alla riga `24` il metodo `_incrementCounter` viene usato come *callback* un
`FloatingActionButton`.


## La parte *stateless* dell'applicazione

Sopra ci siamo occupati della creazione di uno `StatefulWidget` per mantenere
come stato il numero di volte che l'utente ha cliccato sul bottone. Nella versione
completa della App il *root widget* è di tipo stateless e si limita a creare tutto
il necessario per l'applicazione *material design* avente come contenuto il widget
stateful sopra discusso.

Di seguito il codice contenente il `main` e il root widget (stateless).
```dart
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Stateful Clicker Counter',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      // di seguito viene creata l'istanza dello stateful widget
      home: MyHomePage(title: 'Flutter Demo Clicker Counter Home Page'),
    );
  }
}
```

## Il ciclo di vita di uno `StatefulWidget`
Ogni widget possiede un *ciclo di vita* (*lifecycle*) che descrive in che stato
si trova il widget durante l'esecuzione della App. Vediamo brevemente il ciclo
di vita di un `StatefulWidget`.

{{<column/two-cols wr=6 wl=6 content="left" embed="img/stateful-lifecycle.html">}}
Di seguito vediamo quali metodi sono disponibili in un `StatefulWidget` e quando
questi vengono invocati, ognuno di questi metodi può essere ridefinito se
necessario (es. `initState()`)

* `createState()`: per prima cosa lo stato deve essere creato 
* `initState()`: dopo la creazione lo stato deve essere inizializzato
* `didUpdateWidget()`: c'è stato un update nell'interfaccia che necessita di un ridisegnare il widget
* `setState()`: lo stato viene esplicitamente cambiato per cui è necessario ridisegnare il widget.
* `build()`: il widget verrà ridisegnato, `build()` viene chiamato dopo `initState()`,
`setState()` e `didUpdateWidget()` 
{{</column/two-cols>}}

Esistono anche metodi che vengono invocati quando lo stato sta per essere eliminato
* `deactivate()`: il widget non è più visualizzato, ma potrebbe tornare visibile in futuro
* `dispose()`: il widget sta per essere distrutto definitivamente

Non sempre sempre serve ridefinire gli eventi sopra elencati, tuttavia in alcuni
casi questo potrebbe risultare necessario.
* `initState()` può risultare utile inizialmente, quando lo stato deve essere caricato
e/o impostato a qualche valore di default.
* `deactivate()` può essere usato quando sia necessario mettere in pausa qualche
operazione e/o salvare lo stato.
* `dispose()` può essere utilizzato quando vi sia qualche risorsa che deve essere
rilasciata prima che il widget venga definitivamente eliminato (lo stato andrebbe
salvato utilizzando l'evento `deactivate()`).

[1]: https://api.flutter.dev/flutter/widgets/State-class.html