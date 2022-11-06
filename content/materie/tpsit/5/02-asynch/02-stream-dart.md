---
title: "Dart stream"
weight: 20
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/dart/async
summary: "In questa lezione affrontiamo il concetto di stream in Dart. Gli stream sono dei generatori asincroni di eventi che vengono utilizzati in molte parti di un'applicazione Dart e Flutter."
---

In questa lezione impareremo:
1. cosa sono gli stream in Dart e come si utilizzano,
2. come creare uno stream con `async*` e
3. come creare stream a partire da altri stream.

## Cosa sono gli stream
In Dart con il termine **stream** ci si riferisce a dei *generatori di eventi
*asincroni*, si può pensare ad uno stream come ad una sequenza di `Future` (vedi
[lezioni su `async` e `await`]({{< ref "01-dart-async-await.md" >}})).

{{<attention>}}
In diversi linguaggi di programmazione (ad esempio Java e C++) il concetto di
*stream* viene utilizzato per indicare un flusso di dati. Anche in Dart gli
stream rappresentano un flusso di dati, ma questo flusso obbedisce alle regole
della programmazione asincrona.
{{</attention>}}

Nel resto della lezione vedremo, prima come si utilizza uno stream, poi come si
crea.

## Utilizzare stream
Per comprendere come utilizzare uno stream, consideriamo l'esempio proposta anche
nella [documentazione Dart sull'utilizzo degli stream][1].

```dart
Future<int> sumStream(Stream<int> stream) async {
  var sum = 0;
  await for (final value in stream) {
    sum += value;
  }
  return sum;
}
```

Avendo completato le [lezione su `async` e `await`]({{< ref "01-dart-async-await.md" >}}),
l'intera funzione `sumStream` dovrebbe essere chiara ad eccezione del costrutto `await for`.
Il miglior modo per capire il funzionamento di `await for` è di immaginarlo come un normale
*for each* nel quale ogni iterazione del ciclo è una chiamata asincrona con `await`.

Vediamo quindi cosa succede in dettaglio alla chiamata della funzione `sumStream` (si noti
come tale chiamata avviene mediante `await`, infatti `sumStream` è una funzione `async`).

```dart
void main() async {
    Stream<int> stream = // ...
    int sum = await sumStream(stream);
    print(sum);
}
```

1. Quando il `main` invoca la funzione asincrona `sumStream`, la funziona viene
eseguita normalmente fino alla riga contenente `await for`.
2. Quando viene incontrata l'istruzione `await for`, Dart inizia ad iterare
sull'oggetto `stream`, esattamente come un normale *for each*, la differenza è
che ogni volta che si assegna a `value` il prossimo valore, questo assegnamento
è come una chiamata asincrona a `stream`.
3. La chiamata `await for` "attiva" lo stream che inizia a generare eventi
asincroni (sulla base di come lo stream è stato creato, [vedi sotto]({{< ref "#creare-stream" >}}).
4. Ogni evento asincrono generato dallo stream mette in `await` la funzione `sumStream`
esattamente come se fosse una singola chiamata `await`.
5. Quando lo stream ha terminato di generare eventi, l'istruzione `await for`
termina esattamente come termina un *for each* quando tutti gli elementi dell'`Iterable`
sono stati considerati.

{{<important>}}
La funzione `sumStream` deve essere `async` per poter utilizzare `await for`
(esattamente come ogni funzione che usa `await` deve essere `async`). Essendo una
funzione `async`, quindi, `sumStream` restituisce un `Future` (in questo caso di
tipo `int`). Come visto nella [lezione `await` `async`]({{< ref "01-dart-async-await.md" >}}),
la chiamata ad una funzione `async` può o meno avvenire con `await`, ma nel caso
si ometta, la variabile restituita (immediatamente senza attendere la terminazione)
è di tipo `Future<int>` anziché di tipo `int`.
{{</important>}}

## Creare stream
Per creare uno stream ci sono 3 modi:
1. definire una funzione `async*`,
2. generare uno stream a partire da un altro stream e
3. usare la classe `StreamController`.

In questa lezione ci occupiamo solo dei primi due casi, per maggiori dettagli
anche sull'uso di `StreamController` si può consultare la [documentazione online
sulla creazione di stream][2].

### Creazione di uno stream con `async*`
Anche in questa parte della lezione utilizziamo lo stesso esempio della [guida online][2].

```dart
Stream<int> timedCounter(Duration interval, [int? maxCount]) async* {
  int i = 0;
  while (true) {
    await Future.delayed(interval);
    yield i++;
    if (i == maxCount) break;
  }
}
```

La funzione `timedCounter` sotto crea uno `Stream<int>` che conta fino a `maxCount-1`
(o all'infinito), il conteggio avviene ad intervalli regolari di durata `interval.

Come si nota, la funzione `timedCounter` utilizza due costrutti propri della programmazione
asincrona `await` e `yield`. L'uso di `await` in questo caso serve unicamente a far
trascorrere l'intervallo di tempo richiesto, infatti il risultato della
chiamata `Future.delayed` non viene mai utilizzato (tanto che non viene nemmeno
memorizzato).

L'utilizzo di `yield` necessita di una breve spiegazione, ogni volta che uno stream
deve *emettere* un nuovo valore, lo fa attraverso la parola chiave `yield`. Nell'esempio
sopra ogni secondo viene emesso il valore della variabile `i` che successivamente viene
incrementato (ricorda la semantica di `i++` e di `++i`).

{{<important>}}
La funzione `timedCounter` sopra è stata dichiarata *asincrona star* con la parola
chiave `async*`, questa significa che questa funzione restituisce uno `Stream` esattamente
come `async` (senza `*`) significa che la funzione restituisce un `Future`.
{{</important>}}


Per vedere un esempio di utilizzo di `timedCounter`, consideriamo il seguente
codice che stampa a video il conteggio dei secondi da `0` a `9`:

```dart
void main() async {
  Stream<int> stream = timedCounter(Duration(seconds: 1), 10);
  await for (final i in stream) {
    print('$i seconds');
  }
}
```

{{<exercise>}}
Spesso è utile avere un *countdown* cioè un conteggio dal valore iniziale a `0`,
scrivere una funzione `timedCountdown` con gli stessi parametri di `timedCounter`
che restituisca uno stream per il *countdown*.
{{</exercise>}}

### Creazione di uno stream a partire da un altro stream
Spesso si vuole generare uno stream a partire da un altro stream, ad esempio
uno stream che generare un evento ogni secondo lo vogliamo trasformare in uno
che genera un evento ogni 5 secondi, oppure da una sequenza di stringhe vogliamo
estrarre solo quelle che iniziano con una specifica parola.

Un modo ovvio per fare questa operazione di *trasformazione* è definendo una
funzione `async*` che prende lo stream originale come input e genera gli eventi
"trasformati".

```dart
Stream<int> squaredCounter(Stream<int> counter) async* {
  await for (final i in counter) {
    yield i*i;
  }
}
```

#### Metodi di `Stream`
Il secondo modo per "trasformare" uno stream in un altro è attraverso dei metodi
specifici forniti dalla [classe `Stream`][4]. La lista di questi metodi è troppo
lunga per essere discussa qui per esteso, ma possiamo vederne alcuni tra i più
comunemente utilizzati.

* `map`: converte ogni elemento dello stream originale in un nuovo evento
* `skip`: salta il numero di eventi indicato
* `take`: prende il numero di eventi indicato
* `where`: seleziona solo gli eventi con soddisfano la condizione data

Nell'esempio sotto vediamo l'utilizzo di questi metodi questi metodi
```dart
// map: trasforma 'i' in 'i*i'
Stream<int> stream = timedCounter(Duration(milliseconds: 200), 5);
Stream<int> transformed = stream.map((i) => i*i);
await for (final i in transformed) {
    print(i); // 0, 1, 4, 16
}
// take: prende i primi '3' elementi dello stream
stream = timedCounter(Duration(milliseconds: 200), 5);
transformed = stream.take(3);
await for (final i in transformed) {
    print(i); // 0, 1, 2
}

// skip: salta i primi '3' elemento dello stream
stream = timedCounter(Duration(milliseconds: 200), 5);
transformed = stream.skip(3);
await for (final i in transformed) {
    print(i); // 3, 4
}

// where: considera solo gli elementi pari (i%2 == 0) dello stream
stream = timedCounter(Duration(milliseconds: 200), 5);
transformed = stream.where((i) => (i % 2 == 0)); // numeri pari
await for (final i in transformed) {
    print(i); // 0, 2, 4
}
```

{{<attention>}}
Affinché uno stream possa generare eventi a partire da un stream di origine,
quest'ultimo deve essere utilizzabile nel senso che non deve essere terminato.
L'utilizzo di uno stream ormai concluso genera un errore con un messaggio
simile al seguente:

    Uncaught Error: Bad state: Stream has already been listened to.
{{</attention>}}

{{<attention>}}
L'utilizzo delle funzioni di trasformazione quali `map`, `where`, ...
"consumano" lo stream originale. Per questo motivo, dopo aver consumato lo
stream trasformato, anche lo stream originale sarà concluso e diventa un
errore usare `await for` su quello stream.

```dart
void main() async {
  Stream<int> stream = timedCounter(Duration(milliseconds: 200), 10);
  Stream<int> transformed = stream.map((i) => i*i);
  await for (final i in transformed) {
    print(i); // 0, 1, 4, 9, 16, ... 81
  }
  // Error: 'already listened'
  await for (final i in stream) {
    print(i);
  }
}
```
{{</attention>}}

#### Utilizzo di `forEach`
Nella classe `Stream` è disponibile il metodo `forEach` che restituisce un `Future`,
questo metodo può essere utilizzato al posto di `await for` per generare codice
più compatto (soprattutto se l'operazione da fare nel corpo del `for` è semplice
come un semplice `print(i)`). Ad esempio il codice sotto è equivalente all'utilizzo
di `where` visto sopra per stampare i soli numeri pari

```dart
Stream<int> stream = timedCounter(Duration(milliseconds: 200), 6);
stream.where((i) => (i % 2 == 0)).forEach(print);
```

Si noti che:
* si usa lo `Stream` restituito da `where` in modo implicito (senza assegnarlo) ad
una variabile,
* il metodo `forEach` accetta una funzione con un parametro che è l'evento emesso
dal stream, in questo esempio la funzione è `print`

## Link utili
* [Utilizzare stream (English)][1]
* [Creare stream (English)][2]
* [Introduzione stream nel "Dart Language Tour" (English)][3]

[1]: https://dart.dev/tutorials/language/streams
[2]: https://dart.dev/articles/libraries/creating-streams
[3]: https://dart.dev/guides/language/language-tour#handling-streams
[4]: https://api.dart.dev/stable/2.18.4/dart-async/Stream-class.html