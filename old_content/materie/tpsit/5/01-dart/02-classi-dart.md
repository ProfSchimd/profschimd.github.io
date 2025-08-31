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
Ogni classe Dart ha esattamente un costruttore senza name (*unnamed constructor*),
il costruttore senza nome è un metodo il cui nome è quello della classe

{{<highlight dart>}}
class Persona {
  Person() {
    // body of the named constructor
  }
}
{{</highlight>}}

Il costruttore viene invocato quando si istanzia una variabile

{{<highlight dart>}}
Person bob = Person();
{{</highlight>}}

Dart non supporta l'*overloading* di funzioni e metodi (non possono esistere funzioni
o metodi con lo stesso nome e con una diversa lista dei parametri). Questa regola
vale anche per il costruttore, di conseguenza può esistere un solo costruttore senza
nome. Per avere diversi costruttori, in Dart si usa il concetto di *costruttore con
nome*.

#### Costruttore con nomi (*named*)
Un costruttore con nome è un costruttore a cui viene associato un nome

{{<highlight dart>}}
class Person {
  Person.johnSmith() {
    // body of the constructor named johnSmith
  }
}
{{</highlight>}}

l'invocazione del costruttore con nome avviene durante l'istanziazione di una variabile

{{<highlight dart>}}
Person john = Person.johnSmith();
{{</highlight>}}

Ovviamente è possibile avere diversi costruttore con nomi diversi, ma non due o più
costruttori con lo stesso nome

{{<highlight dart>}}
class Person {
  Person.johnSmith() { } // Ok
  Person.aliceBrown() { } // Ok
  Person.johnSmith() { } // Errore
}
{{</highlight>}}

#### Costruttori costanti (*const*)

#### Costruttori generativi (*factory*)

#### Inizializzazione delle variabili d'istanza
Dart impone di inizializzazione tutte le variabili di istanza (campi) che non sono
nullable (alle variabili nullable viene assegnato il valore di default `null`, se non
inizializzate). Questa inizializzazione deve avvenire **prima di eseguire il corpo del
costruttore**, per fare questo si usa una *lista di inizializzazione* (*initializing
list*) la cui sintassi ricorda quella del linguaggio C++.

{{<highlight dart>}}
class Person {
  String firsName;
  String secondName;
  Person(String firstName, String secondName) : firstName = firstNane, secondName = secondName {
    // corpo del costruttore
  }
}
{{</highlight>}}

Notiamo che:
* l'*initializing list* avviene prima dell'esecuzione del corpo;
* ci possono essere diverse inizializzazioni `sinistro = destro` separate da virgola (no punto e virgola);
* in `sinistro = destro` **non si può usare `this`** in `destro`;
* usare `this` in `sinistro` è superfluo e quindi è suggerito che venga omesso;

Spesso succede che il costruttore di una classe sia vuoto, non dovendo inizializzare i campi
già inizializzati con l'initializing list. In questo caso (corpo vuoto) Dart prevede una
sintassi particolare che sostituisce il corpo vuoto `{}` con un punto e virgola `;` (per
facilità di lettura, nell'esempio sotto l'initializing list è stata indentata su più righe).

{{<highlight dart>}}
class Person {
  String firsName;
  String secondName;
  Person(String firstName, String secondName) : 
    firstName = firstNane,
    secondName = secondName;
}
{{</highlight>}}

Per rendere ancora più compatta la sintassi di un costruttore che esegui solamente
l'inizializzazione dei campi, Dart prevede la possibilità di usare *initializing
formal parameters*, ovvero i parametri formali del costruttore non hanno un nome,
ma vengono usati per inizializzare i campi.

{{<highlight dart>}}
class Person {
  String firsName;
  String secondName;
  Person(this.firstName, this.secondName);
}
{{</highlight>}}

Il codice va letto nel seguente modo *usa il primo parametro del costruttore
senza nome per inizializzare la variabile di istanza `firstName` ed usa il secondo
parametro del costruttore per inizializzare la variabile di istanza `secondName`*.

### Visibilità
Dart non prevede le parole chiavi `public` e `private` come molti linguaggi ad oggetti, per
creare un membro la cui visibilità sia limitata si deve dare al membro un nome che inizi con
un underscore `_`. Tuttavia la visibilità così ottenuta, non è l'equivalente di `private`,
ma è un limite imposto a livello di *libreria* (qualcosa simile alla visibilità `package` in
Java), per questo motivo la visibilità implicata da `_` viene detta *library private*. 

{{<highlight dart>}}
class Person {
  // the following is 'library private'
  String _birthDate; 
}
{{</highlight>}}

Ai fini pratici, la visibilità library private viene usata raramente e solo per quei campi
e metodo di "appoggio", il motivo di questo è che una variabile di istanza dichiarata non
private (senza underscore) *genera implicitamente un getter ed un setter* che possono essere
ridefiniti secondo necessità. In altre parole, le variabili non private sono in realtà delle
*proprietà* e, di conseguenza, il private è riservato ai campi che non sono proprietà che
sono usati meno spesso.

## Proprietà

## Link utili

* [A tour of the Dart language][1]

[1]: https://dart.dev/guides/language/language-tour