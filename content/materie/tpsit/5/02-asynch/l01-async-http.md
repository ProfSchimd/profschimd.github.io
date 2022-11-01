---
title: "Laboratorio: richiesta HTTP con async"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/dart/async
weight: 100
summary: "Questo laboratorio presenta l'utilizzo della libreria dart per http combinandolo con la programmazione async e await. Questo approccio è alla base della maggior parte delle app che scaricano contenuti in maniera asincrona."
---

Un numero sempre maggiore di app sfrutta *servizi web* remoti per presentare all'utente
informazioni quali: testo, immagini video, ... Non solo le app dei social media (Instagram,
Tik Tok, Twitter, ...), ma anche molte altre app "informative" utilizzano il [protocollo HTTP]({{< ref http.md >}})
per scambiarsi informazioni. Di conseguenza sempre più linguaggi (oggi praticamente tutti)
prevedono appositi meccanismi (librerie, pacchetti, moduli, ...) per il recupero di informazioni
mediante richieste HTTP, dart non fa eccezione e a tal scopo mette a disposizione il
[pacchetto http](https://pub.dev/packages/http).

In questo laboratorio impareremo ad usare il meccanismo di [programmazione asincrona `async/await`]({{< ref 01-dart-async-await.md >}}) di
dart per recuperare dati attraverso richieste HTTP utilizzando il modulo `http.dart`.

## Import di `http.dart`

Come ogni pacchetto dart, il primo passo per l'utilizzo di un pacchetto è la sua dichiarazione
tra le *dependencies* nel file `pubspec.yaml`
```yaml
dependencies:
    # Requires most recent http package compatible with version 0.13.0
    http: ^0.13.0
```

Una volta inserito nel `pubspec` il pacchetto può essere importato nel file sorgente

```dart
import 'package:http/http.dart' as http;
```

## Creazione di un `Uri`

Per avviare una richiesta in `http.dart` si usa la funzione `get` la quale richiede
(a partire dalla versione `0.13`) come parametro un oggetto di tipo [Uri](https://api.dart.dev/stable/2.18.3/dart-core/Uri-class.html).
Tale oggetto può essere creato usando i costruttori con cone `Uri.http` o `Uri.https`,
questi costruttori possono essere utilizzati con 1, 2 o 3 parametri

```dart
Uri.http(
    String authority,
    [String unencodedPath,
    Map<String, dynamic>? queryParameters]
)
```

I tre parametri rappresentano:
1. l'*authority* cioè il sito da contattare, ad esempio `www.googleapis.com`;
2. il *path* per il servizio o la risorsa richiesta, ad esempio `/books/v1/volumes`;
3. l'insieme dei *parametri* (coppie chiave-valore) da usare per la query, ad esempio `{'q': '{http}'}`.

```dart
final url = Uri.https(
    'www.googleapis.com',
    '/books/v1/volumes',
    {'q': '{http}'},
);
```

{{<exercise>}}
Tramite il seguente link https://api.chucknorris.io/jokes/random
è possibile recuperare una barzelletta su Chuck Norris, crea un oggetto `Uri` che possa
utilizzato per una richiesta a questa API (nota che non ci sono parametri da passare).
{{</exercise>}}

## Richiesta: `http.get`

Dopo aver creato l'oggetto `Uri` per la richiesta HTTP, questo può essere utilizzato
per avviare una richiesta utilizzando la funzione **asincrona** `get`. Questa funzione
è asincrona e quindi restituisce un `Future<Response>`. Oltre all'`Uri` obbligatorio,
la funzione `get` ha un secondo parametro opzionale che è una `Map<String,String>` per
indicare gli [header della richiesta http]({{<ref "http.md#la-richiesta-http" >}}).

{{<attention>}}
La funzione `get` è una funzione *asincrona* che è meglio gestita con il meccanismo
`async/await`. Bisogna, tuttavia, ricordarsi che l'oggetto ritornato **non** è un
`Future` quando si utilizza `await`
```dart
final r = http.get(uri); // r è Future<Response>
print(r); // Instance of '_Future<Response>'

final r await http.get(uri); // r è Response
print(r); // Instance of 'Response'
```
{{</attention>}}

{{<exercise>}}
Utilizzando l'oggetto `Uri` definito nell'esercizio precedente, generare una richiesta
HTTP utilizzando la funzione `get` e memorizzare l'oggetto `Response` risultate in una
variabile.
{{</exercise>}}

## Gestione dello status code
Spesso una richiesta HTTP non va a buon fine, i motivi possono essere svariati (connessione,
richiesta malformata, mancanza di permessi, ...), per questo motivo il primo passo da
fare una volta ricevuto la risposta è controllare lo [status code]({{< ref "http.md#la-risposta-http" >}}) della richiesta. L'oggetto `Response` restituito da `get` permette il controllo tramite
la variabile di classe `statusCode`.

```dart
if (response.statusCode == 200) { // HTTP 200 -> Ok
    print('Request Ok');
} else {
    print('Request error, status: ${response.statusCode}');
}
```

{{<exercise>}}
Aggiungere al programma il controllo dello *status code* restituito da `get`, ricorda
che solo usando `await` si avrà accesso diretto alla variabile di tipo `Response`.
{{</exercise>}}

## Decodifica del file JSON
Il contenuto della risposta (nel caso di successo con status code `200`) è disponibile
nella variabile `body` della risposta
```dart
print(response.body);
```
Questo contenuto è spesso in [formato JSON](https://en.wikipedia.org/wiki/JSON), fortunatamente
Dart fornisce un modo veloce per convertire una stringa contenente un JSON in un oggetto di
tipo `Map<String,dynamic>`.

Innanzitutto dobbiamo importare il modulo `dart:convert`
```dart
import 'dart:convert' as convert;
```
a questo punto possiamo usare la funzione `jsonDecode` per decodificare una stringa in un JSON
```dart
final jsonResponse = convert.jsonDecode(response.body);
```
infine possiamo accedere alle parti del JSON utilizzando la struttura associativa `jsonResponse`
```dart
print(jsonResponse['key']);
```

{{<exercise>}}
In caso di successo, le API su Chuck Norris restituiscono un JSON contenente, tra gli altri campi,
una barzelletta, questa si trova nel campo `value` del JSON. Completare il programma scritto
finora affinché, in caso di successo della richiesta HTTP, stampi la barzelletta ricevuta.
{{</exercise>}}

