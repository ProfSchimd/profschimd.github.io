---
title: "Hello Flutter!"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/flutter/01_hello_flutter
summary: "Questa presentazione presenta il classico 'Hello World!' in Flutter"
---

## La struttura di un progetto Flutter
Cliccando sul pulsante in alto a destra, si può accedere al 
[repository](https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/flutter/01_hello_flutter)
contenente il codice *hello Flutter* esaminato in questa lezione. La cartella contiene diversi
file e sottocartelle, vediamo quelli più interessanti.
* Il file `pubspec.yaml` specifica tutti i parametri del progetto tra cui: nome, versione sdk,
dipendenza pacchetti, ...
* La directory `lib` contiene il codice dart e flutter, in questa directory lavoreremo nella
maggior parte di casi
* La directory `android` contiene file specifici per la versione Android della App, in questa
directory (precisamente nella sottodirectory `app/src/main`) si trova il file `AndroidManifest.xml`
che va modificato per garantire i corretti permessi.

Come è ormai consuetudine, iniziamo l'esplorazione di Flutter con il classico *Hello World!*.
Questa app può essere creata seguendo il codelab [Write your first Flutter app](https://docs.flutter.dev/get-started/codelab).

In questa lezione capiremo:
1. la struttura base di una applicazione Flutter;
2. il concetto di `StatelessWidget`.

## Punto di partenza: il `main`
Nel `main` di ogni applicazione flutter tutto ciò che va fatto è invocare la funzione
`runApp` passando come parametro un'istanza di una classe appropriata. Nel nostro
esempio, la classe è `MyApp` che estende `StatelessWidget`.

{{<highlight dart>}}
import 'package:flutter/material.dart';

void main() {
    runApp(MyApp());
}
{{</highlight>}}

Notiamo anche l'import del package `flutter/material.dart` che verrà utilizzato per
dare un aspetto [*material design*](https://m2.material.io/) alla App. Lo stesso
import, renderà disponibile la funzione `runApp` utilizzata nel `main`.

## Root Widget
Ogni applicazione Flutter è composta da **widget**, in effetti *tutto in Flutter è un widget*
(bottoni, testo, gesture, ...). Il widget principale (chiamato *root widget*) è quello che
viene passato alla funzione `runApp` nel `main`. 

Nel nostro esempio il root widget è ottenuto come istanza della classe `MyApp` che
estende `StatelessWidget`. Il costruttore senza nome utilizzato nell'esempio si limita ad
inizializzare la variabile d'istanza `key` della classe `StatelessWidget` con il valore
passato (o il default se nessun valore viene passato come nel `main` sopra).

{{<highlight dart>}}
class MyApp extends StatelessWidget {
    const MyApp({super.key});
    // ...
}
{{</highlight>}}

## Il metodo `build`
Ogni widget ha un metodo `build` che restituisce un oggetto di tipo `Widget` che rappresenta
la struttura da visualizzare. Nel root widget `MyApp` del nostro esempio, di questo metodo viene
fatto l'*override*.

{{<highlight dart>}}
Widget build(BuildContext context) {
    // ...
}
{{</highlight>}}

Il parametro `context` (della classe `BuildContext`) viene utilizzato dal widget per capire
il suo rapporto con altri widget, cioè il suo contesto ([Video esplicativo (in inglese)](https://youtu.be/rIaaH87z1-g)). 

Il metodo `build` è quindi responsabile della "costruzione" del widget, infatti nel nostro esempio
questo metodo restituisce un oggetto di tipo `MaterialApp`, in altre parole l'intera app
è una *material app*.

{{<highlight dart>}}
Widget build(BuildContext context) {
    return MaterialApp(
            // ...
        );
}
{{</highlight>}}

La classe `MaterialApp` ha un costruttore con decine di parametri nominali (vedi API
[qui](https://api.flutter.dev/flutter/material/MaterialApp-class.html)), nel nostro esempio
ne usiamo solo due:
* `title` (`String`) che rappresenta il titolo della nostra app, non visibile sullo schermo,
* `home` (`Widget`) che rappresenta il contenuto (ancora un `Widget`!) della app, cioè tutto ciò
che è visibile sullo schermo.

{{<highlight dart>}}
class MyApp extends StatelessWidget {
    const MyApp({super.key});

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Welcome to Flutter',
            home:  // ...
        );
    }
}
{{</highlight>}}

Infine, la parte visibile dello schermo viene creata utilizzando un oggetto `Scaffold` che
contiene un barra superiore (`AppBar`) ed un testo centrato (`Text` all'interno di un `Center`)

{{<highlight dart>}}
class MyApp extends StatelessWidget {
    const MyApp({super.key});

    @override
    Widget build(BuildContext context) {
        return MaterialApp(
            title: 'Hello Flutter',
            home: Scaffold(
                appBar: AppBar(
                    title: const Text('Welcome to Flutter'),
                ),
                body: const Center(
                    child: Text('Hello World'),
                ),
            ),
        );
    }
}
{{</highlight>}}

{{<observe>}}
Come detto sopra tutto in Flutter è un Widget, andando a vedere la documentazione ufficiale, infatti,
si vedrà come tutte le seguenti classi derivano (direttamente o indirettamente) da `Widget`:
`MaterialApp`, `Scaffold`, `AppBar`, `Center` e `Text`.

È interessante notare come alcuni di questi widget siano utilizzati per il *layout* (ad esempio `Scaffold` e
`Center`) ed altri siano utilizzati per disegnare elementi dell'interfaccia (ad esempio `AppBar` e `Text`).

Vedremo nelle prossime lezioni che anche gli oggetti per riconoscere le *gesture* (ad esempio lo scuotimento
del dispositivo), sono in realtà dei `Widget`.
{{</observe>}}

{{<important>}}
Il widget `MaterialApp` viene utilizzato specialmente nelle applicazioni Android, esiste anche il widget
`CupertinoApp` più specifico per le applicazioni iOS. È ovviamente possibile utilizzare i due widget
in modo che quando viene creato la app Android si usi l'uno e quando viene creata quelle iOS si usi
l'altro. Questo corso, tuttavia, non è sufficientemente avanzato da poter affrontare questa tematica che
può essere studiata nella [documentazione online di Flutter](https://flutter.dev/).
{{</important>}}


