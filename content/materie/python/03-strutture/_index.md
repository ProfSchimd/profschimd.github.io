---
title: Liste, Tuple e Dizionari
summary: "Questa lezione presenta le principali strutture dati messe a disposizione nativamente dal linguaggio Python: list, tuple e dizionari."
type: "lecture"
number: 3
weight: 30
---

## Liste

Le liste sono la struttura dati più utilizzata in Python che, infatti, non
prevede una struttura simile agli *array* Java e C/C++. Normalmente, tutto
quello che si fa con gli array, in Python lo si fa con le liste che in aggiunta
offrono delle funzionalità avanzate rispetto agli array.

### Creare liste
Ci sono diversi modi per creare liste in Python i principali sono:
* creare una lista "esplicitamente" (*literal*),
* convertire un altro "oggetto" in una lista
* usare la *[list comprehension]({{<ref "#list-comprehension" >}})*

{{<highlight python "linenos=table">}}
# literal
lista1 = [1, 2, 3]
listaVuota = []
listaZeri = [0]*5 # [0, 0, 0, 0, 0]
listaZeriUni = [0,1]*2 # [0, 1, 0, 1]
tantiZeri = listaZeri*10
# conversione
listaNumeri = list(range(100)) # da 0 a 99
altraLista = list(listaNumeri) # copia la lista!
stessaLista = listaNumeri # copia il riferimento!
# list comprehension
ulterioreLista = [i for i in range(100)] # da 0 a 99
{{</highlight>}}

Notiamo alcune cose importanti dagli esempi sopra.
* Una *lista vuota* si indica con `[]`.
* L'operatore di moltiplicazione `*` si può usare per creare tante copie di una lista.
* L'assegnamento crea una **copia del riferimento**
{{<highlight python>}}
lista1 = [1, 2, 3]
lista2 = lista1
print(lista1)
print(lista2)
lista1[0] = 0 # cambia lista1 in [0, 2, 3] ma...
print(lista1)
print(lista2)
{{</highlight>}}
* Per creare una copia di una lista (non del riferimento) si usa la funzione `list`.

### Indicizzazione di una lista
Per accedere agli elementi di un lista si usa l'operatore `[ ]` (parantesi quadre), all'interno
delle quadre si possono usare diversi valori:
* indice singolo: `lista[0]`, `lista[i]`; notare che **gli indici iniziano da `0`**;
* indice di partenza e di fine `lista[inizio:fine]` (`0` come inizio e `n` come fine si possono omettere): 
{{<highlight python>}}
lista = list(range(10)) # [0, 1, ..., 9]
print(lista[0:3]) # elementi dalla posizione 0 (inclusa) alla 3 (esclusa) [0, 1, 2]
print(lista[:3]) # lo stesso (quando l'inizio è 0 si può omettere)
print(lista[2:4]) # elementi dalla posizione 2 (inclusa) alla 4 (esclusa) [2, 3]
print(lista[3::]) # elementi dalla posizione 3 alla fine [3, 4, 5, ..., 9]
print(lista[:]) # stampa tutta la lista (anche lista[::])
{{</highlight>}}
* indice **stride**: inizio, fine e passo `lista[inizio:fine:passo]`
{{<highlight python>}}
lista = list(range(10)) # [0, 1, ..., 9]
print(lista[0:5:2]) # da posizione 0 a 5 (esclusa) a salti di due [0, 2, 4]
print(lista[::3]) # tutta la lista a salti di 3 [0, 3, 6, 9]
{{</highlight>}}
* indici negativi: ultimo elemento ha indice `-1`: lista[-1]`
{{<highlight python>}}
print(lista[-1]) # 9 (no lista, ma numero!)
print(lista[-3:-1]) # Attenzione! [7, 8] non [8, 9] e non [7, 8, 9]
print(lista[-3::]) # Ultimi tre elementi [7, 8, 9]
{{</highlight>}}

### List comprehension
Python offre un metodo estremamente flessibile per creare liste he viene chiamato **list comprehension**.
La list comprehension è un modo comodo e soprattutto di creare liste utilizzando dei cicli.
Partiamo da un esempio che **non** usa la list comprehension. Vogliamo creare una lista che contiene
tutti i numeri \\(x^2\\) per ogni \\(x\\) intero positivo tra 1 e 9 dispari, cioè vogliamo la seguente
lista

    [1, 9, 25, 49, 81]

usando un ciclo `for`, la funzione `range` ed il metodo `append` delle liste, potremmo scrivere qualcosa del genere
{{<highlight python "linenos=table">}}
lista = []
for i in range(10):
    if (i % 2 == 1):
        lista.append(i*i)
print(lista) # [1, 9, 25, 49, 81]
{{</highlight>}}
Usando la list comprehension tutto si può ridurre ad una sola riga
{{<highlight python>}}
lista = [i*i for i in range(10) if i % 2 == 1]
{{</highlight>}}
Cerchiamo di capire dall'esempio come funziona la lista comprehension
* l'istruzione è un *assegnamento*, cioè qualcosa viene messo nella variabile `lista`;
* ciò che viene messo nella variabile `lista` è in effetti una lista in quanto è racchiuso tra quadra `[ ... ]`;
* ogni elemento della lista sarà il risultato dell'operazione `i*i`, infatti abbiamo `[i*i ...]`
* la variabile `i` viene definito attraverso una specie di ciclo `for` che fa variare `i` in `range(10)` per
cui abbiamo `[i*i for i in range(10) ...];
* infine abbiamo anche una condizione che deve essere vera se vogliamo che il corrispondente `i` venga considerato,
la condizione è che il resto della divisione per due (`i%2`) sia `1`, questo determina l'istruzione finale
`[i*i for i in range(10) if i % 2 == 1]`

Nella list comprehension può anche non esserci la condizione finale `if ...`, ad esempio se vogliamo tutti i quadrati
dei numeri da `0` a `9` possiamo la stessa list comprehension senza il controllo:
{{<highlight python>}}
lista = [i*i for i in range(10)]
{{</highlight>}}

## Tuple
Le **tuple** sono simili alle liste 

## Dizionari

### Iterare su dizionari

## Conversioni utili

### Da stringa a lista
La funzione ``split`` delle stringhe permette di dividere le parti (*token*) di una stringa
mettendo ogni parte in una lista

{{<highlight python>}}
record = "Mario Rossi Roma"
lista = record.split() 
print(lista) # ["Mario", "Rossi", "Roma"]
{{</highlight>}}

L'esempio mostra la divisione in base agli spazi, ma è possibile usare qualsiasi stringa come
divisione
{{<highlight python>}}
record = "Mari,Rossi,Roma"
lista = record.split(",") 
print(lista) # ["Mario", "Rossi", "Roma"]
{{</highlight>}}
{{<highlight python>}}
record = "Mario - Rossi - Roma"
lista = record.split(" - ") 
print(lista) # ["Mario", "Rossi", "Roma"]
{{</highlight>}}

### Da lista a stringa
Sempre usando le funzioni messe a disposizione per le stringhe si può eseguire l'operazione inversa
di quanto visto sopra: unire gli elementi di una lista separandoli con una stringa arbitraria.
In questo caso si usa la funzione ``join``.
{{<highlight python>}}
lista = ["Andrea", "Fumagalli", "Milano"]
stringa = " ".join(lista)
print(stringa) # "Andrea Fumagalli Milano" 
{{</highlight>}}
{{<highlight python>}}
lista = ["Andrea", "Fumagalli", "Milano"]
stringa = ", ".join(lista)
print(stringa) # "Andrea, Fumagalli, Milano" 
{{</highlight>}}

{{<attention>}}
Per usare la funzione ``join``, è necessario che tutti gli elementi della lista data in input
siano stringhe. In caso è possibile usare la *list comprehension* per convertire tutti gli
elementi in stringa
{{<highlight python>}}
lista = ["Andrea", "Verdi", 45]
", ".join([str(item) for item in lista])
{{</highlight>}}
{{</attention>}}

## Link utili

* [Strutture dati Python (in inglese)][1]

[1]: https://docs.python.org/3/tutorial/datastructures.html