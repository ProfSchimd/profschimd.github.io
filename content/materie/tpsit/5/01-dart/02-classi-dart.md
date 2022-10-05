---
title: Le classi nel linguaggio Dart
weight: 20
type: lecture
summary: "Questa lezione introduce la sintassi per usare e creare classi in Dart. Particolare spazio è dedicato ai costruttore che in Dart hanno una forma ed una sintassi non usuale."
---

## Utilizzo delle classi in Dart

## Definizione di classi in Dart

### Costruttori

{{<highlight dart>}}
class Person {
  String firstName;
  String secondName;
  // Usual constructor syntax
  Persona(List<String> list) {
    firstName = list[0];
    secondName = list[1];
  }
  // Initializing format of constructor
  Person(this.firstName, this.secondName);
  // Named constructor with pre-body initialization
  Person.johnSmith() : firstName = 'John', secondName = 'Smith';
}
{{</highlight>}}

## Link utili

* [A tour of the Dart language][1]

[1]: https://dart.dev/guides/language/language-tour