---
title: Le classi nel linguaggio Dart
weight: 20
type: lecture
summary: "Questa lezione introduce la sintassi per usare e creare classi in Dart. Particolare spazio è dedicato ai costruttore che in Dart hanno una forma ed una sintassi non usuale."
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/dart/basics
---

## Utilizzo delle classi in Dart
Per creare un'istanza di una classe, ad esempio `Person`, si usa l'operatore di assegnamento
usando a destra dell'uguale la chiamata al *costruttore* opzionalmente preceduta da `new`.
Dal momento che `new` è opzionale, il compilatore potrebbe segnalare un warning (ad esempio
[Dartpad](https://dartpad.dev)).

{{<highlight dart>}}
Person bob = Person("Bob", "Kennedy");
var alice = Person("Alice", "Brown");
Person john = new Person("John", "Smith");
{{</highlight>}}

Si noti, inoltre l'utilizzo di `var` per lasciare che sia il compilatore a determinare il tipo
della variabile (in questo caso `Person`).

Ovviamente è anche possibile creare riferimenti che siano nullable

{{<highlight dart>}}
Person? bob = Person("Bob", "Kennedy");
{{</highlight>}}

{{<attention>}}
Come in Java, anche in Dart tutte le classi sono sottoclassi dirette o indirette di `Object`. L'unica
eccezione è la classe `Null` che, come visto nell'[introduzione a Dart]({{< ref "01-basi-dart.md#tipo-null">}}),
è il tipo che indica il valore `null`.
{{</attention>}}

L'accesso ai membri (campi e metodi) di una classe, avviene con la "usuale" sintassi basato
sull'operatore `.` (*dot*).

{{<highlight dart>}}
print(bob.firstName); /* Bob */
print(john.secondName); /* Smith */
print(alice.toString()); /* Instance of 'Person' */
{{</highlight>}}

## Definizione di classi in Dart
In Dart una classe viene definita con la parola chiave `class` seguita
dal nome della classe e dal *corpo* racchiuso tra grafe

{{<highlight dart>}}
class Person {
  // corpo della classe
}
{{</highlight>}}

Il corpo può contenere:
* variabili, chiamati in questo caso *campi* della classi e
* funzioni, chiamate in questo caso *metodi* della classe.

{{<highlight dart>}}
class Person {
  String firstName;
  String secondName;

  String introduce() {
    return 'Hello I\'m $firstName $secondName!';
  }
}
{{</highlight>}}

### Costruttori
Il *costruttore* di una classe è un metodo particolare che ha il compito di
inizializzare tutti i campi della classe. In Dart ci sono diversi tipi di
costruttori:

* *unnamed*
* *named*
* costanti
* factory.

Inoltre Dart prevede una sintassi semplificata per operazioni che vengono
svolte spesso nei costruttori.

{{<attention title="costruttore e non-nullable">}}
Le variabili *non-nullable* devono essere inizializzate anche se sono campi di
una classe, il modo più comune di inizializzarle è nel costruttore. Dal momento
che Dart non possiede un valore di default delle variabili non-nullable, spesso
è necessario creare almeno un costruttore per tale operazione. Questa soluzione
è sicuramente preferibile rispetto a quella che dichiara variabili nullable,
questo infatti andrebbe sempre evitato a meno che non sia strettamente necessario.
{{</attention>}}

#### Costruttore senza nome (*unnamed*)
Ogni classe Dart ha esattamente un costruttore senza name (*unnamed constructor*)

#### Costruttore con nomi (*named*)

#### Costruttori costanti (*const*)

#### Costruttori generativi (*factory*)

### Visibilità
Dart non prevede le parole chiavi `public` e `private` come molti linguaggi ad oggetti, per
creare un membro la cui visibilità sia limitata alla classe stessa si deve dare al membro
un nome che inizi con un underscore `_`.

{{<highlight dart>}}
class Person {
  // the following is 'private'
  String _birthDate; 
}
{{</highlight>}}

## Link utili

* [A tour of the Dart language][1]

[1]: https://dart.dev/guides/language/language-tour