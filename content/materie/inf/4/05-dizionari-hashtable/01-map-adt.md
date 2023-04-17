---
title: "La struttura dati mappa"
running_title: "ADT Mappa"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/maps
weight: 100
summary: "In questa lezione si presenta il concetto di mappa inteso come struttura dati astratta (ADT). Vengono sottolineata differenze ed analogie con la struttura di tipo array, infine viene discusso il concetto di dizionario che rappresenta un particolare tipo di mappa."
---



## Il concetto di mappa
Le strutture [array e liste]({{<ref "03-array-liste">}}) permettono di memorizzare dati in forma lineare, gli array, inoltre, permettono di accedere ai dati con *indici*. In un certo senso possiamo dire che gli array *associano dei dati ai numeri (gli indici)*.

```java
int n = 100;
String[] names = new String[n];
names[0] = "Alice";
names[1] = "Bob";
// ...
names[42] = "Alice";
// ...
```

Nell'esempio sopra, l'array `names` contiene `Alice` in posizione `0`, `Bob` in posizione `1` e così via. Possiamo dire che `Alice` è associato al numero `0` e che `Bob` è associato al numero `1`. Sempre sulla base del codice presente, possiamo anche dire che `Alice` è associato sia al numero `0` che al numero `42` (e magari ad altri che non vediamo). Quindi lo stesso *valore* (`Alice`) può essere associato a più indici (`0` e `42`), ma per ogni indice esiste un solo valore (`0 -> Alice`, `1 -> Bob`, ...)

Supponiamo ora di voler gestire il codice per un'*anagrafica* (una raccolta di informazioni anagrafiche tipo nome, cognome, indirizzo, ...) e di voler accedere alle informazioni su `Alice`. L'unico modo per fare questo utilizzando l'array `names` sopra definito è scandirlo dall'inizio alla fine e tenere traccia di tutte le posizioni in cui `Alice` compare.

```java
for (int i = 0; i < names.length; i++) {
    if (names[i].compareTo("Alice") == 0) {
        System.out.println(i);
    } 
}
```

In un'anagrafica reale ci aspettiamo una situazione più complessa, ad esempio si potrebbe definire un oggetto `Person`

```java
class Person {
    private String firstName;
    private String lastName;
    private String id;
    private int age;
    // Needed methods
    // ... 
}
```

a questo punto per gestire tutte le persone si può utilizzare un array di oggetti di tipo `Person`

```java
Person[] people = new Person[10];
people[0] = new Person("001", "Alice", "Smith", 30);
people[1] = new Person("002", "Bob", "Green", 48);
people[2] = new Person("003", "Carol", "McDough", 19);
// ...
```

Come facciamo ad accedere alle informazioni di `Alice`? Come facciamo ad accedere alle informazioni relative alla person con identificavo `002`? L'unica risposta a questa domanda è scandire l'array `people` e cercare la posizione che contiene l'oggetto cercato

```java
String idToSearch = "002";
for (int i = 0; i < people.length; i++) {
    if (people[i].getId().compareTo(idToSearch) == 0) {
        System.out.println(people[i]);
        break;
    }
}
```

Sarebbe stato molto più comodo utilizzare un'istruzione come la seguente (che non rappresenta un istruzione valida in Java, mentre lo è in altri linguaggi come Javascript e Python).

```java
System.out.println(people["002"]);
```

Anche se Java non supporta la sintassi sopra mostrata, sono disponibili classi che permettono di usare metodi in modo simile. Queste classi implementano l'interfaccia [Map][1] di Java, nel prossimo paragrafo
vedremo come si potrebbe definire una versione semplificata di tale interfaccia e discuteremo più in generale la struttura dati astratta *mappa*.

## Map ADT
Vediamo ora come definire una [struttura dati astratta]({{< ref "02-adt.md" >}}) che permette l'accesso alle informazione utilizzando una **chiave** (**key**) per identificare un corrispondente **valore** (**value**), tale struttura viene chiamata **mappa** (**map**).

{{<important>}}
Il temine *mappa* è frequentemente utilizzato, ma non è l'unico, altri termini che si possono incontrare sono *dizionario (*dictionary*), *associative array* o *hash table*. In queste lezioni utilizzeremo e definiremo ognuno di questi termini in modo che sia chiaro cosa indicano.
{{</important>}}

```java
public interface IMap<K,V> {
    void add(K key, V value);
    V remove(K key);
    V get(K key);
    K[] keys();
    V[] values();
}
```

{{<attention>}}
The interface `IMap` above, uses *generics*, which gives the possibility of
defining a type which is not specified when the interface/class is created,
rather when the class is used.

For example the following code defines a specific map that has strings keys
and integers as values.

```java
IMap<String, Integer> myMap = ... 
```

I *generics* sono alla base delle classi contenitori offerte dalla libreria Java.
Ad esempio per creare un `ArrayList` di stringhe si usa il seguente codice:

```java
ArrayList<String> names = new ArrayList<String>();
```

In maniera simile possiamo creare un `ArrayList` di interi si crea con il seguente
codice:

```java
ArrayList<Integer> ages = new ArrayList<Integer>();
```

È importante sapere che i tipi specificati dentro le parentesi angolari `< >` devono essere tipi riferimento e **non possono essere tipi fondamentali come `int` o `double`**. Questo è dovuto al modo in cui Java implementa i generics. In pratica, Java sfrutta il fatto che ogni tipo è sottoclasse di `Object`, cosa che non è vera per `int`, `double`, `boolean`, ...
{{</attention>}}

### Strutture dati associative

## Dizionari

## Riferimenti
* [L'interfaccia `Map` di Java (Oracle Docs.)][1]

[1]: https://docs.oracle.com/javase/8/docs/api/java/util/Map.html