---
title: Dart async e await
type: lecture
weight: 10
summary: "Questa lezione introduce i costrutti async e await presenti in Dart per la programmazione asincrona."
---

## Programmazione asincrona
La *programmazione asincrona* è una tecnica di programmazione che permette di eseguire alcune
operazione in modo "scollegato" (asincrono, per l'appunto) rispetto al normale flusso delle
istruzioni (ad esempio, rispetto al `main`). La programmazione asincrona permette, quindi, di
eseguire alcune operazione (ad esempio quelle che richiedono più tempo) senza interrompere il
programma principale. Questa tecnica viene usata spesso nella programmazione di interfacce
grafiche in quanto alcune operazioni lunghe (ad esempio scaricare immagini, video, ...)
bloccherebbero l'interfaccia se non fossero eseguite in *background*. Utilizzando la programmazione
asincrona, queste operazioni vengono eseguite in modo asincrono rispetto alla gestione della
GUI lasciando questa pienamente funzionante e *responsiva*. 

La programmazione asincrona è possibile grazie ai *thread* che permettono l'esecuzione
parallela di flussi di codice diversi. Normalmente, tuttavia, in fase di programmazione
asincrona non viene direttamente gestito il *ciclo di vita* (creazione, avvio, fermata)
di un thread, bensì si utilizzando i costrutti del linguaggio o le API delle librerie
utilizzate.
Maggiori dettagli sulla programmazione asincrona, con esempi in Java, si possono trovare
in [questa lezione]({{< ref "programmazione_asincrona.md" >}}).

## La programmazione asincrona in Dart
Il linguaggio Dart comprende costrutti per la gestione della programmazione, i principali
sono `async` e `await` (con la variante `await for`) ai quali vanno aggiunti i `Future` e
gli `Stream`.

### `Future`
Un concetto fondamentale in Dart (e in generale nella programmazione asincrona) è quello di
*future* che è una "promessa di risultato in futuro". In pratica quando una funzione o un
metodo viene chiamato, ma ancora non ha il risultato pronto, può restituire un `Future`
(attenzione alla `F` maiuscola) per indicare che in futuro il risultato sarà disponibile.

In Dart la classe `Future` rappresenta una *computazione* ed assomiglia un po' al concetto
di *thread* ed alla classe `Thread` di Java, tuttavia ci sono delle differenze.

#### Creazione di un `Future`
Ci sono diversi [costruttori per la classe `Future`](https://api.dart.dev/be/175791/dart-async/Future-class.html#constructors),
i più importanti sono elencati qui sotto.
* `Future(<computation>)`: crea una computazione asincrona, il parametro può essere
una funziona o a sua volta un `Future`
* `Future.delayed(Duration d, <computation>)` crea una computazione asincrona con partenza ritardata
della durata `d`, il secondo parametro può essere una funziona o a sua volta un `Future`
* `Future.sync(<computation>)`: crea una computazione sincrona (eseguita immediatamente), il parametro può essere
una funziona o a sua volta un `Future`.

L'esempio seguente mostra l'utilizzo dei costruttori descritti sopra

{{<highlight dart>}}
main() {
  Future(() => print('Unnamed ctr.'));
  Future.delayed(
    const Duration(seconds: 2), 
    () => print('Delayed ctr. (2 sec)')
  );
  Future.sync(() => print('Sync ctr.'));
}
{{</highlight>}}

l'output prodotto sarà

    Sync ctr.
    Unnamed ctr.
    Delayed ctr. (2 sec)

notare come l'ultima riga corrisponda al secondo costruttore, questo, infatti ha un ritardi di 2 secondi 
nell'avvio, di conseguenza il suo output si trova dopo gli altri due computazioni (costruttori *unnamed*
e *sync*) che invece vengono avviati immediatamente dopo la creazione.

L'utilizzo fatto fin qui dei `Future` non assomiglia molto all'utilizzo di una funzione, infatti qualsiasi
valore ritornato non sarebbe utilizzabile (nell'esempio, tuttavia, non ci sono valori ritornati).
Consideriamo il seguente esempio

{{<highlight dart>}}
Future<String> someLongComputation() =>
  Future.delayed(
    const Duration(seconds: 3),
    () => 'Finally the DATA!'
);

main() {
  print(someLongComputation());
}
{{</highlight>}}

Vediamo insieme cosa accade:
* il `main` chiama la funzione `someLongComputation`,
* questa funzione restituisce un `Future` la cui computazione produce una stringa (`Finally the DATA!`),
* come si evince anche dalla firma della funzione, l'oggetto stampato sarà un'istanza di `Future`.

Le operazioni scritte sono abbastanza ovvie a chi ha esperienza con la programmazione, tuttavia nella
programmazione asincrona vorremmo avere un meccanismo che stampi, nell'esempio, la stringa ottenuta una
volta terminata la computazione del `Future`. Il modo per ottenere questo risultato in Dart è spiegato
nel prossimo paragrafo.

### `async` e `await`
Quando il risultato di una funzione è un `Future` spesso l'output che si vuole non l'oggetto `Future`
stesso, bensì il risultato della sua computazione. Nell'esempio sopra, il risultato è una stringa la
quale sarà disponibile dopo un po' di tempo (simulato con `Factory.delayed` nell'esempio), in altre
parole vorremmo che *il `main` attendesse il termine della computazione del `Future` por poi stampare
il risultato di questa stessa computazione*. In Dart qualche piccola modifica permette di ottenere tale
risultato

{{<highlight dart>}}
Future<String> someLongComputation() =>
  Future.delayed(
    const Duration(seconds: 3),
    () => 'Finally the DATA!'
);

main() async {
  print(await someLongComputation());
}
{{</highlight>}}

Il codice è identico al precedente ad eccezione del `main` dove notiamo
* l'utilizzo di `await` prima della chiamata alla funzione `someLongComputation`,
* l'utilizzo di `async` prima dell'inizio del corpo del `main`.

La prima modifica, l'uso di `await` comunica a Dart che la chiamata che segue è ad una funziona
asincrona (ritorna un `Future`) e che ciò che si vuole è aspettare il risultato. La seconda
modifica, l'uso di `async`, è necessario per comunicare a Dart che la funzione `main` utilizzerà
`await` (o `await for`) ed è perciò essa stessa una funzione asincrona.

{{<attention>}}
È molto facile dimenticarsi di dichiarare una funzione senza `async` e poi utilizzare `await` nel
corpo della funzione, in questo caso il compilatore Dart segnala un errore. Fortunatamente la
correzione di questo errore, l'aggiunga di `async`, è immediata.
{{</attention>}}

### Stream

# Link utili
* [Tour del linguaggio Dart (programmazione asincrona)][1]
* [Asynchronous programming Dart codelabs][2]

[1]: https://dart.dev/guides/language/language-tour#asynchrony-support
[2]: https://dart.dev/codelabs/async-await