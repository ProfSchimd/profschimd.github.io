---
title: Creational Patterns
weight: 10
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/design-patterns
summary: "I creational patterns sono design patterns che vengono utilizzati per la creazione (factoring) di istanze tipicamente per astrarre l'accesso al costruttore."
---

## Abstract Factory
Il pattern **abstract factory** prevede un meccanismo (ad esempio un metodo) che
generi un insieme di classi che sono tra loro interdipendenti, ma la cui classe
concreta è nota solo in *runtime*.

L'esempio riportato anche da [E. Gamma][1] è quello dell'interfaccia grafica ed, in
particolare, dell'istanziazione dell'interfaccia in base, ad esempio, al sistema operativo
in cui l'applicazione è in esecuzione. Nell'esempio sotto utilizziamo sempre il problema
di istanziazione di elementi dell'interfaccia grafica, ma risolviamo il problema
di istanziare un elemento chiaro di giorno ed uno scuro di notte.

{{<highlight java "linenos=table">}}
public class Main {
    public static Object[] createButtonAndText() {
        Object[] gui = new Object[2];
        if (LocalDateTime.now().getHour() > 17 || LocalDateTime.now().getHour() < 9) {
            gui[0] = new DarkButton();
            gui[1] = new DarkText();
        } else {
            gui[0] = new LightButton(); 
            gui[1] = new LightText();
        }
        return gui;
    }
    public static void main(String[] args) {
       Object[] gui = createButtonAndText(); // abstract factory method
       Button b = (Button)gui[0]; // DarkButton if night, LightButton otherwise
       Text t = (Text)gui[1]; // DarkText if night, LightText otherwise
    }
}
{{</highlight>}}

## Factory methods
Il **factory method** pattern prevede un metodo che viene utilizzato per istanziare un oggetto utilizzando
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
Il **singleton** pattern prevede che una classe possa avere al massimo un'istanza. Il tentativo di
successive istanziazioni, deve ritornare l'unica istanza disponibile (oppure generare un
errore, se appropriato).

L'implementazione in Java del pattern singleton richiede, per prima cosa, di impedire
l'utilizzo del costruttore della classe, in questo modo l'unico modo per ottenere
un'istanza è attraverso un [factory method](#factory-methods) che sarà in grado di
verificare che l'istanza creata sia unica.

```java
public class SimpleSingleton {
    private static SimpleSingleton instance = null;
    public static SimpleSingleton factoryMethod() {
        if (instance == null) {
            instance = new SimpleSingleton();
        }
        return instance;
    }
    private SimpleSingleton() { }
}
```

Oltre ad aver reso `private` l'unico costruttore, la classe implementa un metodo
`static` (perché `static`?) che restituisce un'istanza di `SimpleSingleton`. Il
metodo verifica se una istanza è già stata creata, nel qual caso la restituisce,
se l'istanza ancora non è stata creata la crea la prima volta e la assegna alla
variabile `private static` di nome `instance`.

{{<attention>}}
Affinché il codice funzioni, è necessario che `factoryMethod` sia un metodo della
classe `SimpleSingleton`, se così non fosse, infatti, tale metodo non potrebbe
accedere al costruttore `private` e di conseguenza non sarebbe in alcun modo
possibile istanziare la classe.
{{</attention>}}

Per verificare l'effettivo funzionamento del factory method possiamo invocarlo
due volte assegnando il risultato a due variabili diverse, in seguito confrontando
i riferimenti **utilizzando l'operatore `==`** potremmo verificare che i riferimenti
"puntino" allo stesso oggetto.

```java
public class SimpleSingletonMain {
    public static void main(String[] args) {
        // SimpleSingleton ss = new SimpleSingleton(); // Errore
        SimpleSingleton simple1 = SimpleSingleton.factoryMethod();
        SimpleSingleton simple2 = SimpleSingleton.factoryMethod();
        System.out.println(simple1 == simple2); // True if singleton
    }
}
```

## Builder
Il **builder** pattern si applica quando la costruzione di un oggetto risulta
complessa e di non facile scrittura utilizzando il solo costruttore della classe. 

Supponiamo di dover creare un personaggio in un gioco di ruolo, ogni personaggio
ha diversi caratteristiche: aspetto fisico, armamento, inventario, ... La creazione
di ognuna di queste caratteristiche può richiedere una notevole quantità di parametri.
Ad esempio per creare l'armamento del personaggio dovremmo poter specificare: arma,
elmo, corazza, scudo, ... A sua volta ognuna di queste caratteristiche può richiedere
una creazione complessa.

Vediamo in che modo si potrebbe scrivere in Java questa situazione, prima senza
utilizzare il *builder pattern*. La classe `Character` che rappresenta il nostro
personaggio potrebbe essere simile alla seguente
```java
public class Character {
    private String name;
    private int lifePoints;
    private String skill;
    private Weapon weapon;
    private Armor armor;

    public Character(String name, int lifePoints, String skill, Weapon weapon, Armor armor) {
        this.name = name;
        this.lifePoints = lifePoints;
        this.skill = skill;
        this.weapon = weapon;
        this.armor = armor;
    }
}
```

Per creare un oggetto il codice assomiglierà al seguente
```java
public class Main {
    public static void main(String[] args) {
        Character wizard = new Character(
            "Wizard Gandalf",
            100,
            "Magic",
            new Weapon(),
            new Armor()
        );
        System.out.println(wizard);
    }
}
```

Anche se non eccessivamente complicato in apparenza, questo codice è fortemente
incompleto, infatti crea un'arma ed un'armatura vuota, cosa che è raramente ciò
che si vuole fare. In altre parole, il codice reale sarebbe molto più complesso
di quello mostrato sopra.

Vediamo ora come il builder pattern risolve questo problema. Per prima cosa abbiamo
bisogno di una classe `CharacterBuilder` la quale conterrà i metodi necessari per
impostare i vari valori associati al personaggio.

```java
public class CharacterBuilder {
    private String name;
    private int lifePoints;
    // .. 
    public CharacterBuilder setName(String name) {
        this.name = name;
        return this;
    }
    public CharacterBuilder setLifePoints(int lifePoints) {
        this.lifePoints = lifePoints;
        return this;
    }
    // ...
    public Character build() {
        return new Character(name, lifePoints, skill, weapon, armor);
    }
}
```

Il codice riportato qui è parziale per questioni di spazio, ma sufficiente a
comprendere la logica della classe *builder*. Vediamo quindi quali sono le
caratteristiche di questa classe.
* Contiene tutti gli stessi campi che contiene la classe che si vuole costruire
(`Character` nell'esempio). Questi campi verranno utilizzati quando verrà
effettivamente istanziata la classe `Character`.
* Ogni campo ha un metodo `set` associato il quale metodo restituisce l'istanza
stessa del builder (i `return this;` presenti nei vari `set`); vedremo sotto
perché questo è comodo.
* Un metodo `build` restituisce l'oggetto che si vuole creare (`Character`) nel
nostro esempio occupandosi di invocare i metodi adeguati ad esempio il costruttore
(come nell'esempio sopra) oppure un [factory method](#factory-methods).

Vediamo ora come si utilizza la classe `CharacterFactory` per creare un oggetto
di tipo `Character`.

```java
public class Main {
    public static void main(String[] args) {
        CharacterBuilder builder = new CharacterBuilder();
        builder
            .setName("Warrior Aragorn")
            .setLifePoints(100)
            .setSkill("Sword");
        Character warrior = builder.build();
    }
}
```

Anche se il numero di righe è paragonabile (se non superiore) all'utilizzo diretto
del costruttore, l'utilizzo di un builder risulta preferibile per diversi motivi:
* il codice risulta più facile da gestire e da leggere;
* se si cambia la classe `Character` basta cambiare la classe `CharacterBuilder`;
* l'oggetto viene creato solo una volta dal metodo `build` che può verificare che
tutti i campi siano coerenti.

{{<observe>}}
Si potrebbe pensare che la creazione di una nuova classe `CharacterBuilder`
rappresenti uno "spreco" di codice in quanto i vari `set` potevano essere creati
nella classe `Character`. Tuttavia, come si vede dall'utilizzo sopra, il codice
per creare un personaggio utilizzando `CharacterBuilder` risulta molto più compatto
e più facile da comprendere.

Inoltre l'oggetto `Character` viene creato dalla chiamata a `build` che può verificare
che tutto sia corretto e che si possa procedere alla creazione di un `Character` valido.
Utilizzando metodi `set` nella classe `Character` sarebbe necessario, prima creare un
personaggio in modo "parziale" e solo dopo riempire le sue caratteristiche utilizzando
i vari metodi `set`.
{{</observe>}}

[1]: https://www.amazon.it/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612/



