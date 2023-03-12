---
title: "Laboratorio 2: Server REST"
weight: 2000
type: lecture
---

## Web Service in Javascript con NodeJS

## Web Service in Python con Flask

## Web Service in Dart
Un modo veloce per creare web service in Dart è utilizzando il
[pacchetto `shelf`](https://pub.dev/packages/shelf) che può essere incluso
aggiungendolo al `pubspec.yaml`:
```yaml
dev_dependencies:
  shelf: ^1.1.0
```

Una volta incluso `shelf`, per creare un web server sono sufficiente due semplici passi:
1. definire una funzione *handler* che riceve richieste ed elabora le risposte,
2. avviare un'istanza del server agganciata all'handler creato.

L'esempio sotto mostra un web server che restituisce il testo `Hello world!`
qualsiasi sia la richiesta HTTP ricevuta.

```dart
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

Response myHandler(Request request) {
  return Response.ok('Hello, world!');
}

void main() async {
    // substitute 0.0.0.0 with server IP and 8080 with server port
    var myServer = await shelf_io.serve(myHandler, '0.0.0.0', 8080);
    print('Server listening on port ${myServer.port}');
}
```

### JSON in Dart
Il codice sopra risponde sempre con la string *testo* `Hello world!`, tuttavia
un web service REST utilizza formati dati strutturati quali JSON. Vediamo come
usare la codifica JSON in Dart mediante le funzionalità messe a disposizione
dalla libreria standard del linguaggio.

```dart
import 'dart:convert';

Response myHandler(Request request) {
  return Response.ok(
    jsonEncode({
      'message': 'Hello world!'
    }), 
    headers: {
          'Content-type':'application/json'
        }
  );
}
```

Il codice sopra presente una versione modificata della funzione `myHandler` in cui:
* L'oggetto *response* restituito contiene il corpo (primo parametro) in formato JSON
creato utilizzando `jsonEncode` dal package `dart:convert`;
* L'*header* della risposta indica che il contenuto è di tipo `application/json`.

{{<important>}}
La funzione `jsonEncode` prende in input un oggetto Dart qualsiasi e lo converte
in una stringa che rappresenta l'oggetto in formato JSON. Nel caso in cui l'oggetto
non sia immediatamente convertibile in JSON, Dart utilizza dei convertitori di
default. È importante tenere a mente con tali convertitori potrebbero non essere
quello che il programmatore si aspetta ed è sempre bene accertarsi che la conversione
sia avvenuta nel modo desiderato.
{{</important>}}

