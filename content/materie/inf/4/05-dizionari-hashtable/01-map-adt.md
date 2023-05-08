---
title: "La struttura dati mappa"
running_title: "ADT Mappa"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/maps
weight: 100
summary: "Questa lezione presenta la struttura dati astratta (ADT) mappa discutendo differenze e analogie con gli array. Successivamente viene presentato il concetto di dizionario come un particolare tipo di mappa."
---

## Perché una nuova struttura dati
Con [array e liste]({{<ref "03-array-liste">}}) si memorizzano dati in forma lineare, gli array, inoltre, permettono l'accesso ai dati usando *indici*, diciamo che gli array *associano dati a numeri (indici)*.

```java
int n = 100;
String[] names = new String[n];
names[0] = "Alice";
names[1] = "Bob";
// ...
names[42] = "Alice";
// ...
```

Nell'array `names`, la stringa `Alice` è *associata* alle posizioni `0` e `42`, mentre la stringa `Bob` è *associata* alla posizione `1` (anche le rimanenti posizioni saranno associate a qualche valore, che potrebbe anche essere il valore `null`). Vediamo che lo stesso *valore* (`Alice`) può essere associato a più indici (`0` e `42`), tuttavia, per ogni indice esiste un solo valore associato (`0 -> Alice`, `1 -> Bob`, ...).

Supponiamo ora di dover gestire un'*anagrafica* (una raccolta di informazioni personali: nome, cognome, indirizzo, ...) e di voler accedere alle informazioni su `Alice`. Usando l'array `names` dobbiamo individuare in che posizione/i compare tale nome.

```java
for (int i = 0; i < names.length; i++) {
    if (names[i].compareTo("Alice") == 0) {
        System.out.println(i);
    } 
}
```

Nella realtà la situazione è più complessa, avendo definito un oggetto `Person` con i metodi `getId` e `getName` si può utilizzare un array di `Person`.

```java
Person[] people = new Person[10];
people[0] = new Person("001", "Alice", "Smith", 30);
people[1] = new Person("002", "Bob", "Green", 48);
people[2] = new Person("003", "Carol", "McDough", 19);
// ...
```

Ad esempio, per accedere alle informazioni della person con identificavo `002` dobbiamo cercare nell'array `people` tale elemento.

```java
for (int i = 0; i < people.length; i++) {
    if (people[i].getId().compareTo("002") == 0) {
        System.out.println(people[i]);
        break;
    }
}
```

Sarebbe più comodo poter indicare direttamente l'identificativo in fase di accesso.

```java
System.out.println(people["002"]);
```

Java non prevede tale sintassi, ma classi che prevedono metodi con utilizzo simile, queste classi implementano l'interfaccia [Map][1]. Nel prossimo paragrafo, vedremo come definire una versione semplificata di tale interfaccia, più in generale discuteremo la struttura dati astratta *mappa*.

## Map ADT
Vediamo ora come definire una [struttura dati astratta]({{< ref "02-adt.md" >}}) che permette l'accesso alle informazione utilizzando una **chiave** (**key**) per identificare un corrispondente **valore** (**value**), tale struttura viene chiamata **mappa** (**map**).

{{<def title="Mappa">}}
Una **mappa** è una struttura che permette di memorizzare informazioni sotto forma di *coppie* `(chiave,valore)`. La chiave rappresenta un *identificativo* all'interno della mappa. Se una data chiave è presente nella mappa, allora ad essa è associato un *valore* che può essere qualsiasi tipo di dato.
{{</def>}}

{{<important>}}
Il temine *mappa* è frequentemente utilizzato, ma non è l'unico, altri termini che si possono incontrare sono *dizionario* (*dictionary*), *associative array* o *hash table*. In queste lezioni utilizzeremo e definiremo ognuno di questi termini in modo che sia chiaro cosa indicano.
{{</important>}}

{{<column/two-cols wl=6 wr=6 content="left" embed="img/map-example.html">}}
Sostanzialmente, una mappa crea una *funzione* tra le chiavi ed i valori, fornendo ad una mappa una chiave, essa risponde restituendo il valore che è associate alla chiave data, oppure indicando che non esiste alcun elemento con tale chiave.

La figura a fianco mostra una schema di una mappa per memorizzare chiavi di tipo stringa e valori di tipo persona. La mappa deve avere un modo per tenere traccia delle chiavi (*keys*) attraverso le quali si deve poter accedere ai corrispondenti valori (*values*). Il modo in cui queste parti vengono memorizzati dipende dall'implementazione specifica.

Nell'esempio vediamo che la chiave `001` è associata ad un "oggetto" che ha `Alice` e `30` come valori di `name` e `age`, rispettivamente. Allo stesso modo altri valori sono associati alla chiave `002`. In questo specifico esempio le chiavi sono di tipo stringa, per quanto riguarda i valori sono di tipo `Person`.
{{</column/two-cols>}}

{{<observe>}}
Un array è in effetti un tipo speciale di mappa in cui le chiavi sono gli interi comprese tra `0` e `n-1` (se l'array contiene `n` posizioni). Ad esempio l'array
```java
String[] names = {"Alice", "Bob", "Carol", "David"};
```
contiene il dato `Alice` associato alla chiave `0`, il dato `Bob` associato alla chiave `1` e così via.
{{</observe>}}

Vediamo ora un'interfaccia Java che permette di definire le operazioni fondamentali di una mappa, l'interfaccia utilizza il meccanismo dei *generics* di Java (vedi riquadro sotto).

```java
public interface IMap<K,V> {
    void add(K key, V value);
    V remove(K key);
    V get(K key);
    K[] keys();
    V[] values();
    int size();
    boolean isEmpty();
}
```

{{<attention>}}
L'interfaccia `IMap` utilizza i *generics* che permettono di specificare il *tipo* al momento in cui la classe viene istanziata anziché al momento della definizione della classe/interfaccia stessa.
Un esempio di istanziazione dell'interfaccia sopra è dato nel seguente codice.

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

I tipi specificati dentro le parentesi angolari `< >` **devono essere tipi riferimento** e **non possono essere tipi fondamentali come `int` o `double`**. Questo perché sfrutta il fatto che ogni tipo riferimento è sottoclasse di `Object`, cosa che non vale per i tipi fondamentali (`int`, `double`, `boolean`, ...).
{{</attention>}}

Il nome delle operazioni indica in modo diretto come operano sulla struttura dati.
* `add` aggiunge un coppia `(key, value)` alla mappa
* `remove` rimuove la coppia `(key, value)` dalla mappa
* `get` restituisce, se presente, il `value` associata alla `key` data
* `keys` restituisce la lista di tutte le chiavi
* `values` restituisce la lista di tutti i valori
* `size` restituisce il numero di coppie memorizzate nella mappa
* `isEmpty` restituisce `true` se la mappa è vuota (non contiene alcuna coppia)

## Dizionari
Con il termine *dizionario* (*dictionary*) si indica solitamente una mappa in cui il tipo della chiave è una stringa, di norma anche il valore è una string. Il nome deriva proprio dal dizionario fisico in cui si ricerca un termine (una stringa) per ottenere la corrispondente definizione (un'altra stringa).

Utilizzando l'interfaccia `IMap` sopra, un dizionario si ottiene utilizzando i tipi `String` sia per la chiave che per il valore.

```java
IMap<String, String> myDict = new Map<String, String>();
myDict.add("Dictionary", "A book containing definitions.\nA type of map data structure.");
```

Nel frammento di codice Java riportato sopra, si suppone che esista una classe concreta `Map` che implementa l'interfaccia `IMap`, mantenendo i tipi generics

```java
public class Map<K,V> implements IMapGenerics<K,V> {
    /* ... */
}
```

## Riferimenti
* [L'interfaccia `Map` di Java (Oracle Docs.)][1]

[1]: https://docs.oracle.com/javase/8/docs/api/java/util/Map.html