---
title: Factory Patterns
weight: 10
type: lecture
summary: "I factory patterns sono design patterns che vengono utilizzati per la creazione (factoring) di istanze tipicamente per astrarre l'accesso al costruttore."
repo: 
---

## Abstract Factory
Questo pattern prevede un meccanismo (ad esempio un metodo) che generi un insieme di classi
che sono tra loro interdipendenti, ma la cui classe concreta è nota solo in *runtime*.

L'esempio riportato anche da [E. Gamma][1] è quello dell'interfaccia grafica ed, in
particolare, dell'istanziazione dell'interfaccia in base, ad esempio, al sistema operativo
in cui l'applicazione è in esecuzione.

## Factory methods
Questo pattern prevede un metodo che viene utilizzato per istanziare un oggetto utilizzando
la sottoclasse opportuna in base al *runtime*.

Consideriamo il seguente esempio in linguaggio Java

{{<highlight java>}}
String[] types = {"student", "professor", "ATA", "student"};
Person[] persons = new Person[types.length];
for (int i = 0; i < persons.length; i++) {
    persons[i] = Person.createPersonFromString(types[i]);
}
{{</highlight>}}

il metodo statico `createPersonFromString` della classe `Person` è il nostro *factory method*.
La sua implementazione terrà conto dell'informazione ottenuta in *runtime* (in questo una stringa)
per decidere quale classe istanziare e ritornare, a patto che sia assegnabile ad un referenza di
tipo `Person` (mediante *cast implicito*). Una possibile implementazione del metodo è fornita qui
sotto.

{{<highlight java>}}
public static Person createPersonFromString(String type) {
    if (type.toLowerCase().equals("professor")) {
        return new Professor();
    }
    if (type.toLowerCase().equals("student")) {
        return new Student();
    }
    return new Person();
}
{{</highlight>}}

## Singleton
Questo pattern prevede che una classe possa avere al massimo un'istanza. Il tentativo di
successive istanziazioni, deve ritornare l'unica istanza disponibile (oppure generare un
errore, se appropriato).

[1]: https://www.amazon.it/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612/



