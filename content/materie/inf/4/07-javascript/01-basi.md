---
title: Basi di Javascript
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/javascript/
weight: 10
summary: "In questa lezione presentiamo le basi del linguaggio Javascript. In
particolare si discute: variabili e tipi, gestione del flusso, array e oggetti"
---

## Variabili e tipi

Ci sono tre modi per dichiarare variabili in Javascript:
* `let` crea una variabile con scoping "standard" (cioè tipo Java);
* `var` crea una variabile con scoping "globale" (da evitare);
* `const` crea una costante con scoping" standard (simile a `let`).

```javascript
let x = 10;
var name ='John';
const z = 1.23;
let empty;
console.log(typeof x); // number
console.log(typeof name); // string
console.log(typeof z); // number
console.log(typeof empty); // undefined
```

Come può vedere dall'output, ogni variabile ha un tipo (che può essere `undefined`)
che viene determinato sulla base del valore che viene assegnato a quella variabile.

{{<important>}}
Per evitare problemi relativi allo *scoping*, allo *shadowing* all'*hoisting*,
conviene sempre usare `let` per la dichiarazione delle variabili.
{{</important>}}

{{<attention title="Strict mode">}}
Le versione più vecchie di Javascript, permettono la dichiarazione di variabili
senza parola chiave `let`, `var` o `const`.

```javascript
oneVar = 200;
```

Questo può portare a problemi e non è più sintatticamente corretto nelle versioni
recenti di Javascript. Per imporre ai browser di usare questa (ed altre) regola,
si usa la dichiarazione
```javascript
"use strict";
```
all'inizio dello script.
{{</attention>}}

### Tipi

In Javascript ci sono *tipi primitivi* e *tipi complessi*, la differenza principale
è che i tempi complessi sono *composti di più tipi primitivi*. Inoltre i tipi
primitivi sono **immutabili** (*immutable*), quindi non possono essere modificati.
I tipi primitivi sono:
* `string`
* `number`
* `bigint`
* `boolean`
* `undefined`
* `symbol`
* `null`

I tipo primitivi **non sono oggetti** e quindi **non hanno metodi**, tuttavia
il linguaggio Javascript utilizza implicitamente dei *wrapper* per cui si vedono
istruzioni come la seguente

```javascript
if ('Foo'.includes('F')) {
    console.log('Iniziale F');
}
```

dove `includes` non è un metodo di `string`, ma un metodo di una classe wrapper
`String` che Javascript invoca automaticamente. 

Come visto nell'esempio sopra, si può usare `typeof` per determinare il tipo di
una variabile.

```javascript
console.log(typeof 'Hello'); // string
console.log(typeof 101); // number
console.log(typeof ['a', 'b', 'c']); // object
console.log(typeof { a: "a", b: 10 }); // object
```

## Condizione
In Javascript è disponibile il costrutto `if...else` simile alla maggior parte
dei linguaggi di programmazione.

```javascript
const x = 12;
if (x > 0) {
    alert('positive');
}
```

Nella *condizione* si possono usare i *connettori logici*:
* And: `&&`
* Or: `||`
* Not: `!`

```javascript
if (x>=0 && x <10) {
    console.log('Digit');
}
```

Gli operatori di confronti sono quelli usuali: `<`, `>`, `>=`, `==`, `!=`, ...,
tuttavia alcuni confronti non sono coerenti con quanto ci si aspetta a causa
della conversione automatica che avviene tra i tipi.

```javascript
console.log(0 == '0'); // true
console.log(0 == false); // true
console.log(0 == 'false'); // false
console.log(0 == ''); // true
```

Per evitare questo comportamento si usano gli operatori `===` e `!==`

```javascript
console.log(0 === '0'); // false
console.log(0 !== '0'); // true
console.log(0 === false); // false
console.log(0 === 'false'); // false
console.log(0 === ''); // false
```

### Operatore ternario
Spesso è necessario determinare il valore di una variabile sulla base di una
condizione. Una possibilità è usare il meccanismo `if...else`

```javascript
let sign;
if (x>0) {
    sign = 'positive';
} else {
    sign = 'non-positive';
}
```

In questo caso si può utilizzare l'*operatore ternario* il cui nome indica che
è un operatore con 3 parti:
* condizione,
* valore dell'espressione se la condizione è vera e
* valore dell'espressione se la condizione è falsa.

```javascript
const sign = x>0 ? 'positive' : 'non-positive';
```

{{<observe>}}
Utilizzando l'operatore ternario è possibile rendere la variabile `sign`
dell'esempio sopra *costante*. Questo perché, a differenza del codice che usa
`if...else`, non è necessario dichiarare la variabile prima per poi utilizzarla
nei due rami.
{{</observe>}}

{{<important>}}
L'operatore ternario è un'**espressione** esattamente come `1+2`, di conseguenza
ha un valore e un tipo. Valore e tipo vengono determinati sulla base della
condizione e di conseguenza potrebbero non essere uguali indipendentemente dal
valore.

```javascript
let x = 10;
let a = x>0 ? 'p' : -1;
console.log(typeof a); // string
x = -2;
a = x>0 ? 'p' : -1;
console.log(typeof a); // number

```
{{</important>}}

## Cicli
Javascript prevede la maggior parte dei cicli presenti in altri linguaggi di
programmazione.

### `while`
Il ciclo prosegue fino a che una condizione rimane vera

```javascript
let count = 10;
while(count > 0) {
  console.log(count); // 10, 9, 8, ...
  count--; 
} 
```

### `for`
Il ciclo `for` composto di: inizializzazione, test ed incremento.

```javascript
for(let i = 0; i < 10; i++) {
  console.log(i+1); // 1, 2, 3, ...
}
```

### `for..of..`
Il ciclo *for each* che itera su tutti gli elementi di una collezione si ottiene
mediante il costrutto `for..on..`.

```javascript
const costs = ['0.99', '1.99', '99.99'];
for (let a of costs) {
    console.log(a);  // 0.99, 1.99, ...
}
```

### `for..in`
Javascript prevede anche un ciclo `for..in` che a differenza del `for..on` itera
rispetto a tutti gli *indici* anziché i valori. 
```javascript
const costs = ['0.99', '1.99', '99.99'];
for (let a in costs) {
    console.log(a);  // 0, 1, ...
}
```

L'indice, tuttavia, non sono sempre
indici numerici, nel caso di oggetti (`object`), l'indice è una stringa.

```javascript
const bands = {a:'Abba', b:'Beach Boys', c:'Camel'}
for (let a in bands) {
  console.log(a); // 'a', 'b', 'c'
}
for (let a in bands) {
  console.log(bands[a]); // 'Abba', 'Beach Boys', 'Camel'
}
```

{{<attention>}}
Il *for each* di Javascript si ottiene utilizzando il costrutto `for..on..` e
non il costrutto `for..in..`. Spesso si può essere confusi in quanto nella maggior
parte dei linguaggi nei quali il `for..in..` corrisponde a `for..on..` di Javascript.
{{</attention>}}



