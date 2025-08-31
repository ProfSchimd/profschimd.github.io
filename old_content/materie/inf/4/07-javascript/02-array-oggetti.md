---
title: Array e Oggetti in Javascript
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/javascript/lang
weight: 200
summary: "In questa lezione si presentano due tipi di dato molto utilizzati in
Javascript gli array e gli object."
---

## Array
In Javascript gli array sono una struttura dati in grado di memorizzare una
sequenza di oggetti per essere indicizzati secondo la loro posizione. Il modo più
"diretto" per creare un array è attraverso la definizione di un *array literal*
quale `[1,2,3]` che definisce un array di tre numeri. È possibile interrogare un
array circa la sua *lunghezza* (*length*) mediante l'apposita proprietà `length`.

```javascript
const array = [1, 2, 3];
console.log(array); // Array(3) [ 1, 2, 3, ]
console.log(array.length); // 3
console.log(typeof array); // object
```

{{<observe>}}
Come si vede eseguendo il codice sopra, il tipo di un array è `object`. In Javascript
tutti i tipo non primitivi sono *object* ed anche gli array rientrano in questo
caso.
{{</observe>}}

A differenza di altri linguaggi (ad esempio Java), in Javascript gli array non
sono vincolati ad avere tutti elementi dello stesso tipo (qualcosa di simile si
ha nelle liste Python). Il seguente codice crea un array con sette elementi di
tipo diverso.

```javascript
const misc = [0, '0', 'Zero', false, undefined, [], [0]]
console.log(misc); // number, string string, ...
```

### Indicizzazione di array

Un array può essere *indicizzato* per riferirsi ai suoi elementi, l'operatore di
indicizzazione è `[ ]` all'interno del quale va indicato la posizione (partendo
da `0`).

```javascript
const array = [1, 2, 3];
console.log(`Pos 0 -> ${array[0]}`); // Pos 0 -> 1
console.log(`Pos 1 -> ${array[1]}`); // Pos 1 -> 2
console.log(`Pos 2 -> ${array[2]}`); // Pos 2 -> 3
console.log(`Pos 3 -> ${array[3]}`); // Pos 3 -> undefined
```

{{<attention>}}
Il tentativo di accede ad un elemento al di fuori di un array restituisce come
esito `undefined`. Anche se questo comportamento può sembrare utile e migliore
rispetto ad un errore (ad esempio `IndexOutOfBoundException` in Java), il suo uso
è sconsigliato.

Uno (tra i tanti) svantaggi di utilizzare questa possibilità è che quando si
ottiene `undefined` non è chiaro se esso risulti dall'accesso di un elemento fuori
dal range dell'array oppure se risulti dall'accesso di un elemento all'interno
dell'array il cui valore è `undefined`

```javascript
const a = [undefined];
console.log(a[0]); // undefined
console.log(a[1]); // undefined
```
{{</attention>}}

### Scandire gli elementi di un array
Cone visto nella [lezione sulle basi di Javascript]({{< ref "01-basi.md" >}}),
ci sono diversi modi per eseguire cicli, vediamo come si applicano di tre tipi
di ciclo for alla *scansione* degli elementi di un array.

```javascript
const names = ['Alice', 'Bob', 'Carol', 'Dave', 'Emily'];
console.log('\nfor(... ; ... ; ...)');
for(let i = 0; i < names.length; i++) {
    console.log(names[i]);
}
console.log('\nfor(... of ...)');
for(let name of names) {
    console.log(name);
}
console.log('\nfor(... in ...)');
for (let i in names) {
    console.log(names[i]);
}
```

Tutti e tre i cicli `for` nel codice sopra producono l'elenco dei nomi come
memorizzati nell'array, tuttavia funzionano in modo diverso.
* Il `for(..;..;..)` utilizza un indice esplicito `i` che viene incrementato
e confrontato con `length` per determinare le terminazione del ciclo.
* Il `for(..of..)` utilizza il *for each* per accedere sequenzialmente al
*valore* contenuto in ogni posizione dell'array.
* Il `for(..in..)` scandisce sequenzialmente la *posizione* di ogni singolo
elemento dell'array.

### Funzioni utili di `Array`
Gli array sono oggetti sui quali si possono effettuare diverse operazioni, in
gergo Javascript si parla di *prototype* (la versione delle classi prima che le
classi fosse inserite nel linguaggio). Spesso un buon programmatore si distingue
perché conosce l'operazione migliore da utilizzare, fortunatamente online si
possono trovare diversi siti contenenti la lista (le API) per gli `Array` (vedi,
ad esempio, il sito [MDN Array][1]). Di seguito vediamo solo alcune delle funzioni
più utilizzate

#### `at`
{{<column/two-cols wl=8 wr=4 content="left" embed="img/array-indexing.html">}}
Restituisce l'elemento di indice dato, a differenza dell'operatore di indicizzazione
`[]`, accetta anche indici negativi che si utilizzano per l'indicizzazione al
contrario.

```javascript
const array = [1, 2, 3]
console.log(array.at(0)); // 1
console.log(array.at(-1)); // 3
```

{{</column/two-cols>}}

Come per l'operatore `[]`, anche la funzione `at` restituisce `undefined` quando
si cerca di accedere ad elementi fuori dal range dell'array (anche in negativo).

#### `indexOf`
Restituisce l'indice dell'elemento dato se esiste, altrimenti restituisce `-1`.
Se l'elemento cercato è presente in più posizioni restituisce la prima posizione
in viene trovato
```javascript
const array = [1, 2, 3, 1, 4];
console.log(array.indexOf(1)); // 0
console.log(array.indexOf(4)); // 4
console.log(array.indexOf(5)); // -1
```

#### `push` e `pop`
La funzione `push` aggiunge in coda all'array l'elemento dato, la funzione `pop`
elimina e restituisce l'ultimo elemento dell'array. Se si esegue `pop` su un
array vuoto, viene restituito `undefined`.

```javascript
const array = [1];
array.push(2);
array.push(3);
console.log(array); // [1, 2, 3]
const removed = array.pop(); 
console.log(removed); // 3
```

{{<attention>}}
Nel codice precedente, la variabile `array` è stata dichiarata `const`, ma le
operazioni `push` e `pop` hanno modificato il contenuto dell'array senza generare
alcun tipo di errore.

Questo è corretto in quanto `array` è un **riferimento** è la dichiarazione `const`
si riferisce al riferimento non al contenuto al quale `array` si riferisce.
{{</attention>}}

{{<observe>}}
Attraverso le operazioni `push` e `pop` si può realizzare uno [stack]({{< ref "01-queue-and-stack.md##stack-pila" >}}) utilizzando gli array Javascript.
{{</observe>}}

#### `slice`
Restituisce un nuovo array contenente la porzione di array originale indicata
dai parametri. La funzione `slice` accetta 0, 1 o 2 parametri:
* con 0 parametri restituisce l'intero array
* con un parametro restituisce l'array dalla posizione indicata alla fine
* con due parametri restituisce l'array dalla posizione indicata nel prima
parametro fino alla posizione precedente quella indicata dal secondo parametro.

Inoltre i parametri possono essere negativi per indicizzare le posizione partendo
dalla fine.

```javascript
const array = [0, 1, 2, 3, 4, 5, 6];
console.log(array.slice()); // [0, 1,2,...,6]
console.log(array.slice(1,3)); // [1,2]
console.log(array.slice(4)); // [4,5,6]
console.log(array.slice(-2)); // [5,6]
console.log(array.slice(-3,6)); // [4,5]
```

#### `filter`
Le funzioni `filter` e [`map`](#map) sono due funzioni più complicate rispetto
alle altre perché *hanno una funzione come parametro*. La funzione `filter` crea
un nuovo array nel quale vengono inseriti gli elementi dell'array originale che
passano un test, gli altri vengono *filtrati* e non finiscono nell'array nuovo.

Ad esempio, per creare un array con i soli numeri pari di un array dato, dobbiamo
filtrare in base al resto per la divisione con 2 `x % 2 === 0`, utilizzando la
funzione `filter` il codice per creare tale array diventa semplice.

```javascript
const array = [1, 2, 3, 4, 5, 6, 7];
const even = array.filter(x => x%2 === 0);
console.log(even); // [2, 4, 6];
```

#### `map`
La funzione `map` restituisce un nuovo array con la stessa dimensione della'array
originale, ogni elemento del nuovo array viene ottenuto utilizzando un elemento
dell'array originale come input della funzione passata come parametro di `map`,
l'output di tale funzione vine utilizzato per riempire l'array restituito da `map`.

Il seguente esempio crea un vettore i cui elementi sono ottenuti elevando alla
seconda potenza gli elementi dell'array originale. Il codice utilizza una
[arrow function]({{< ref "01-basi.md##arrow-function" >}}) per il calcolo del
quadrato di un numero.

```javascript
const array = [1,2,3,4,5,6];
const squared = array.map(x => x*x);
console.log(squared); //[1,4,9,...,36]
```

#### `join`
La funzione `join` restituisce una stringa ottenuta concatenando, uno dopo l'altro,
gli elementi dell'array. Oltre a concatenarli, gli elementi possono essere divisi
da una stringa di separazione, tale stringa di separazione va passata come parametro
alla funzione `join`.

```javascript
const array = [1, 2, 3, 4, 5, 6];
console.log(array.join(',')); // 1,2,3,...,6
console.log(array.join()); // 123456
console.log(array.join(' -> ')); // 1 -> 2 -> 3 ...
```

{{<observe>}}
La funzione `join` esegue l'operazione inversa della funzione `split` per le
stringhe la quale suddivide una string una base ad una stringa di separazione e
mette le varie parti suddivise in un array.

```javascript
const array = [1, 2, 3];
const joined = array.join(','); // joined = '1,2,3'
const split = joined.split(','); // split = ['1', '2', '3']
```

È importante notare che il risultato di `split` nell'esempio è un array di stringhe
e non un array di numeri.
{{</observe>}}

## Oggetti
Uno dei tipi di dato più utilizzato in Javascript è il tipo `Object`, il motivo
di questo successo è l'enorme flessibilità con cui si definiscono e si utilizzano
gli oggetti in Javascript. Un secondo aspetto estremamente importante degli object
è la loro rappresentazione mediante il formato [*JavaScript Object Notation (JSON)*][3]
che è oggigiorno il formato di riferimento per lo scambio di dati in Server REST.
Alla [fine](#json) di questa sezione ci occuperemo del formato JSON, prima vediamo
di comprendere cosa sono, come si definiscono e come si utilizzano gli oggetti in
Javascript.

{{<important>}}
Quando si parla di `Object` in Javascript si può essere indotti a pensare alle
classi `Object` presenti in vari linguaggi OOP come Java, C#, Dart, ... Anche se
ci sono molte similarità tra questi concetti, gli oggetti Javascript sono molto
diversi dagli oggetti di altri linguaggi OOP ed è spesso meglio limitari al
minimo il confronto con gli altri linguaggi.
{{</important>}}

### Definizione di un oggetto
In Javascript il modo più diretto per definire un oggetto è attraverso
l'inizializzazione dello stesso.

```javascript
const obj = {
    name: "Alice",
    age: 42,
    greet() {
        return `Hi I'm ${name}`;
    }
}

console.log(obj.greet()); // !! "Hi I'm " !!
```

{{<attention title="Funzioni, non metodi" >}}
Il meccanismo di associazione di una funzione ad un `object` non è lo stesso del
meccanismo di definizione dei metodi delle classi. Come si vede dall'esempio
sopra `greet` **non è un metodo** dell'oggetto `obj`,di conseguenza non ha accesso
alla proprietà `name`. Inoltre non esiste alcun riferimento all'oggetto tipo `this`
o `self` che si possa utilizzare allo scopo.  Bisogna quindi ricordarsi che **le
funzioni definite negli oggetto non sono metodi**.
{{</attention>}}

### Iterare sulle proprietà di un `Object`
In certi casi è utile accedere sequenzialmente a tutte le proprietà di un oggetto,
per fare questo si possono usare il costrutto `for..in..` che ci restituisce le
*chiavi*.

```javascript
for (p in obj) {
    console.log(`${p} -> ${obj[p]}`);
}
```

### JSON
Il formato [*JavaScript Object Notation(JSON)*][3] (pronunciato *geison* o *geson*),
si utilizza per *serializzare* (trasformare in testo) oggetti Javascript (come il
nome stesso indica). Un tipico file JSON è formato da coppie *chiave-valore* dove
la chiave è una stringa. Il formato JSON prevede anche l'indicazioni di array,
cerchiamo di capirlo attraverso degli esempi pratici.

```json
{
    "name": "Alice",
    "age": 42
}
```

Il JSON sopra contiene un solo oggetto le cui proprietà sono racchiuse tra graffe
e sono:
* una stringa con chiave `name` e valore `Alice`,
* un numero con chiave `age` e valore 42.

```json
{
    "name": "Alice",
    "age": 42,
    "phone": [
        "+1 123 456 7899",
        "+1 555 112 2330"
    ]
}
```

in questo secondo esempio allo stesso oggetto è stata aggiunta una terza
proprietà con chiave `phone` il cui valore è un array, in questo caso l'array
contiene due stringhe (due distinti numeri di telefono).

```json
[
    {
        "name": "Alice",
        "age": 42
    },
    {
        "name": "Bob",
        "age": 58,
        "address": {
            "name": "Main Street",
            "number": 12,
            "zip": 12312,
            "state": "CA"
        }
    }
]
```

Questo ulteriore esempio mostra due cose:
* il JSON ora è un array contenente due oggetto (si noti le quadre `[]` all'inizio
e alla fine del file);
* all'interno del secondo oggetto è stato definito un ulteriore oggetto il quale
corrisponde alla chiave `address`.

#### Conversione JSON e `Object`
L'utilizzo del formato JSON in Javascript richiede la conversione dal formato
all'oggetto e viceversa. Sono disponibili due funzioni apposite per questo scopo.
* `JSON.parse()` converte un JSON in un oggetto
* `JSON.stringify()` converte un oggetto in un JSON

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[3]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON