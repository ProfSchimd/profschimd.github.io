---
title: Basi del linguaggio Dart
weight: 10
type: lecture
summary: "Questa lezione introduce i principali costrutti del linguaggio Dart con particolare riferimento agli aspetti che differiscono in maniera sostanziale dagli altri linguaggi quali Java, C, Python, ..."
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/dart/basics
---

## Variabili
Dart è un linguaggio tipizzato quindi tutte le variabili devono essere inizializzate con un tipo
specifico al momento della loro inizializzazione. Questo tipo può essere esplicito

{{<highlight dart>}}
int aNumber = 42;
print(aNumber.runtimeType); /* int */
{{</highlight>}}

o implicito

{{<highlight dart>}}
var aNumber = 42;
print(aNumber.runtimeType); /* int */
{{</highlight>}}

### Tipo `Null`

È possibile usare `var` senza inizializzazione, il tipo associato è `Null` che in Dart
è un tipo (non un valore come, ad esempio in Java) che ha un solo possibile valore: `null`.

{{<highlight dart>}}
var aVariable;
print(aVariable); /* null */
print(aVariable.runtimeType); /* Null */
{{</highlight>}}

{{<attention>}}
In Dart bisogna fare attenzione alla differenza tra `Null` (`N` maiuscola) che si riferisce al
*tipo* e a `null` (`n` minuscola) che si riferisce al `valore`.
{{</attention>}}

### Inizializzazione
Dart non permette l'uso di variabili non-nullable che non siano inizializzate, le variabili
nullable non sono esplicitamente inizializzate viene assegnato `null`.

{{<highlight dart>}}
int aVar;
print(aVar); /* Errore */
int? bVar;
print(bVar); /* Ok, output is 'null' */
int cVar;
cVar = 10;
print(cVar); /* Ok, assegnamento prima dell'uso */
{{</highlight>}}

In certi casi può accadere che l'inizializzazione avvenga, ma che il compilatore non se ne
"accorga" e che insista con un errore di inizializzazione. Per aggirare questo problema, si
può usare la parola chiave `late` prima della dichiarazione che comunica al compilatore che
la variabile verrà inizializzata prima di essere utilizzata.

{{<highlight dart>}}
late int aVar;
/* some code with assignment to aVar */
print(aVar); /* Ok unless the compiler is sure aVar is not assigned */
{{</highlight>}}

## Null safety
Dart scoraggia l'utilizzo del tipo `Null` attraverso un meccanismo di *null safety*. I tipo in
Dart sono tutti oggetti (a differenza, ad esempio, di Java dove ci sono oggetti e tipi fondamentali),
ma se non esplicitamente dichiarati **nullable** le variabili **non** possono avere il valore
`null`.

{{<highlight dart>}}
int nonNullableVar = null; /* Error, non-nullable variable*/
int? nullableVar = null; /* Ok, nullable variable */
{{</highlight>}}

Nell'esempio sopra `nonNullableVar` è un intero che **non può avere il valore `null`** mentre
`nullableVar` dichiarato `int?` (attenzione al `?`) può assumere il valore `null`.

Ovviamente, la *null safety* vale per ogni tipo presente in Dart: ad esempio `int`, `double` e `String`
sono null-safe, mentre `int?`, `double?` e `String?` sono le corrispondenti versione non null-safe.

{{<exercise>}}
Creare variabili di tipo `int`, `double` e `String`, sia nullable sia non-nullable; considerando
due variabili `a` e `b` di **tipo diverso**, entrambe nullable e con valore `null`, cosa produce
la seguente istruzione?

{{<highlight dart>}}
print(a == b); /* ??? */
{{</highlight>}}

{{</exercise>}}

## Tipi di variabili *built-in*
In Dart ci sono diversi tipi già definiti (detti *built-in*) i più importanti sono i seguenti:

* numeri: `int` e `double`;
* stringhe: `String`
* booleani: `bool`
* contenitori: `List`, `Set` e `Map`
* classe base: `Object`
* tipo nullo: `Null`
* programmazione asincrona: `Future`, `Stream`
* altri: `Runes`, `Symbols`, `Enum`, `Iterable`, `Never`

Per maggiori informazione si può riferimento alla [guida introduttiva a Dart][1]

## Funzioni
La sintassi Dart per le funzioni è simile a quella di altri linguaggi tipo C e Python (Java
ha solo il concetto di metodo e non quello di funzione che non sia metodo).

{{<highlight dart>}}
double sum(double a, double b) {
  return a + b;
}
{{</highlight>}}


{{<attention>}}
Dart è un linguaggio ad oggetti ed anche le funzioni sono oggetti, in particolare il loro tipo è
`Function`. Questo fatto ha implicazioni:
* le funzioni possono essere assegnate a variabili;
* le funzioni possono essere argomenti di altre funzioni;
* due funzioni possono essere confrontate.
{{</attention>}}

### Parametri
In Dart è possibile passare parametri *posizionali* (*positional*) o parametri *nominali*
(*named*). La sintassi per i parametri posizionali è quella usuale, mentre i parametri
nominali si racchiudono in parentesi graffe. Di norma i parametri nominali sono facoltativi,
ma possono essere resi obbligatori con la parola chiave `required`.

{{<highlight dart>}}
// positional + named arguments
double logF(double x, {double base = e}) {
  return log(x)/log(base);
}
// required named
double foo({required double x}) {
  return x;
}
{{</highlight>}}

Per indicare i parametri nominali la sintassi prevede l'utilizzo di `{nome: attuale}` ad
indicare che al parametro con nome `nome` andrà assegnato il valore della variabile
`attuale`.

{{<highlight dart>}}
print(logF(4, base: 2));
print(foo(x: 1.11));
{{</highlight>}}

### Arrow functions
Quando l'unica istruzione di una funzione è una **singola espressione**, si può utilizzare
la notazione *arrow function* per cui

{{<highlight dart>}}
double product(double a, double b) {
  return a * b;
}
{{</highlight>}}

può essere compattamente scritta come

{{<highlight dart>}}
double product(a, b) => a*b;
{{</highlight>}}

## Link utili

* [A tour of the Dart language][1]

[1]: https://dart.dev/guides/language/language-tour