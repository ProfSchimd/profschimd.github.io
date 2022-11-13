---
title: "Utilizzo base di Navigator"
type: lecture
weight: 30
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/flutter/03_navigator_basic
summary: "In questa lezione viene introdotta la classe Navigator per la creazione di app multi-pagina."
---

Pressoché tutte le app significative contengono informazione suddivisa in più
*pagine*. In Flutter, le pagine vengono gestite utilizzando lo *stack delle
pagine* e le *route* mediante metodi della classe [`Navigator`][1]

In questa lezione impareremo:
* cambio di pagina mediante lo *stack delle pagine*;
* cosa è una *route*;

Per fare questo svilupperemo una applicazione *static* (senza accesso a servizi esterni)
per la visualizzazione del livello della marea nella laguna di Venezia (open data
disponibile [qui][2]). [Questo repository](https://github.com/ProfSchimd/cz-marea)
contiene la versione completa della app comprensiva di accesso agli open data in tempo
reale.

## Navigazione mediante lo stack delle pagine
La navigazione tra varie pagine di un'applicazione può avvenire in modo *gerarchico*
cioè secondo una successione di pagine. Ad esempio, una prima pagina mostra la lista
di *punti di interesse* mentre una seconda pagina con il dettaglio si attiva quando
un elemento della lista viene selezionato.

In Flutter una sequenza gerarchia di pagine è gestita mediante uno [*stack*]({{< ref "01-queue-and-stack.md#stack-pila" >}}) nel quale vengono aggiunte (`push`) e tolte
(`pop`) le pagine. Essendo lo stack una politica *Last In First Out*, non è possibile
con questo metodo saltare da una pagina all'altra (per fare questo si usa il concetto
di [route](#navigazione-mediante-routes)).

### Struttura una App multi-pagina
Per realizzare la navigazione mediante stack sono necessari i seguenti passaggi:

1. definire la pagina principale (*home*);
2. definire le pagina successive: secondaria, terziaria, ... (fino al livello desiderato);
3. realizzare il meccanismo di passaggio da una pagina alla successiva.

#### Definizione pagina principale
In questa lezione ci concentriamo su una app a due livelli, il primo gestisce lo stato
ed è quindi un `StatefulWidget` il secondo semplicemente visualizza i dati di dettaglio
ed è qui di un `StatelessWidget`.

{{<attention>}}
La scelta di avere un solo livello *stateful* è principalmente dovuta alla
semplificazione della discussione. Nella pratica, è frequente avere app che
**mantengono ed aggiornano lo stato a tutti i livelli**.
{{</attention>}}

Come in tutte le applicazioni Flutter fin qui viste, utilizzeremo
il widget `MaterialApp` al quale assegneremo come `home` la pagina *home*.

```dart
class AppMarea extends StatelessWidget {
  final String appTitle = 'CZ Marea Venezia';
  const AppMarea({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const SensorListPage(),
    );
  }
}
```

La prima pagina è un [stateful widget]({{< ref "02-stateful-widget.md" >}})

```dart
class SensorListPage extends StatefulWidget {
  const SensorListPage({super.key});
  @override
  _SensorListState createState() => _SensorListState();
}
```

Per quanto riguarda lo stato avremo una lista di stringhe (con le varie stazioni
di misura della marea) organizzate con una
[`ListView`](https://api.flutter.dev/flutter/widgets/ListView-class.html).

```dart
class _SensorListState extends State<SensorListPage> {
  final _sensors = [
    'Punta Salute Canal Grande',
    'Burano',
    // ...
  ]
  void _tapped(BuildContext context, int index) {
    // ... 
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Marea a Venezia')),
      body: ListView.builder(
        itemCount: _sensors.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(_sensors[index]),
            onTap: () => _tapped(context, index),
          );
        },
      ),
    );
  }
```

Oltre a creare e popolare la `ListView` nel `build`, questo codice aggiunge
all'evento `onTap` di ogni entry della lista (`ListTile`) il *callback*
`_tapped` con parametri:
* l'indice (`index`) nella lista (cosa è stato selezionato) e
* il contesto (`context`) necessario per la transizione.

Il passaggio di pagina avviene proprio all'interno del metodo `_tapped` che
discutiamo [sotto](#passaggio-di-pagina).

#### Definizione della pagina secondaria
La gestione dello stack delle pagine avviene in modo pressoché automatico e di
conseguenza la pagina secondaria (il dettaglio della stazione di misura) non
necessita di particolare gestione.

```dart
class DetailPage extends StatelessWidget {
  const DetailPage({super.key, required this.station});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(station),
        ),
        body: Center(
          // ... 
        ));
  }
}
```

È importante sottolineare che nel codice omesso per il metodo `build` non ci sono
istruzioni relative alla navigazione. In altre parole la classe `DetailPage` può
essere anche utilizzata come `home` di una qualsiasi applicazione senza alcun
cambiamento.

{{<observe>}}
Nella versione online della App, il metodo `build` della classe `DetailPage`
contiene il codice necessario a visualizzare un *effetto onda* mediante il
pacchetto [`wave`](https://pub.dev/packages/wave).
{{</observe>}}

#### Passaggio di pagina
Veniamo finalmente, al passaggio di pagina la cui realizzazione avviene sfruttando
i metodi della classe [`Navigator`][1]. Come già detto sopra la "magia" avviene
all'interno del metodo `_tapped` della classe `_SensorListState`.

```dart
void _tapped(BuildContext context, int index) {
    Navigator.of(context).push(MaterialPageRoute(
        builder: (context) => DetailPage(station: _sensors[index]))
    );
}
```

Pur trattandosi di una sola istruzione, c'è molto da discutere, vediamo quindi in
dettaglio cosa fa questo metodo.
* L'istruzione è una chiamata al metodo `push` sull'istanza restituita dal metodo
`of` della classe `Navigator` (si noti che `of` è un metodo *statico* della classe).
* Il metodo `of` restituisce un oggetto di tipo [`NavigatorState`](https://api.flutter.dev/flutter/widgets/NavigatorState-class.html) il quale ha diversi metodi tra cui il metodo `push`
che accetta un parametro di tipo [`Route`](https://api.flutter.dev/flutter/widgets/Route-class.html).
* Al metodo `push` viene passata un'istanza della classe `MaterialPageRoute` la quale
ha il compito di gestire in modo appropriato (ad esempio differenziando Android e iOS)
la transizione da una pagina alla successiva.
* La pagina verso cui `MaterialPageRoute` si sposta viene creata invocando il `builder`
che deve essere passato al costruttore. Nell'esempio sopra il `builder` è semplicemente
una funzione che restituisce un'istanza della pagina secondaria.

{{<attention>}}
Uno dei parametri di `_tapped` è il *contesto*, cioè un'istanza di `BuildContext`,
mentre fin'ora avevamo visto questo parametro nei vari metodi `build`, ma senza
usarlo, ora è fondamentale che il cambio di pagina avvenga nel *contesto adeguato*.
Nel nostro esempio, il *contesto* vine utilizzato per:
* individuare il corretto *stack delle pagine* e per
* individuare il *tema* corretto dell'applicazione.
{{</attention>}}

{{<important>}}
Nella nostra App a due livelli c'è bisogno di scambiare dati tra il primo livello
ed il secondo. Nell'esempio presentato sopra, si è scelto di effettuare questo passaggio
nel modo più diretto e semplice vale a dire passando al costruttore di `DetailPage` le
informazioni necessarie per la corretta visualizzazione della pagina.

È possibile usare il parametro `settings` del costruttore di `MaterialPageRoute`
per passare oggetti come *argomenti* tra una pagina ed un'altra. Per una guida su
questo operazione si può consultare [questa guida ufficiale](https://docs.flutter.dev/cookbook/navigation/passing-data#alternatively-pass-the-arguments-using-routesettings).
{{</important>}}

## Navigazione mediante *routes*

[1]: https://api.flutter.dev/flutter/widgets/Navigator-class.html
[2]: https://dati.venezia.it/sites/default/files/dataset/opendata/livello.json
