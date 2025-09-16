---
title: Cosa sono le strutture dati
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/operations
---

La memoria principale (RAM) è una **struttura lineare** che memorizza *parole* (normalmente composte di 32 o 64 bit) *indicizzate* con la loro posizione (che chiamiamo **indice**). Linguaggi di programmazione come Java e C++ prevedono una *struttura*, comunemente chiamata **array**, che permette di accedere agli elementi utilizzando il loro indice.

```java
int[] a = new int[10];
System.out.println("First element: " + a[0]);
System.out.println("Last element:  " + a[a.length-1]);
```

Per creare un array, il compilatore/interprete utilizza una zona *contigua* di memoria abbastanza grande da poter contenere il numero di elementi richiesto (per questo è sempre necessario indicare la dimensione dell’array da creare).

L’array è un tipo di **struttura dati** che permette le seguenti **operazioni**

- Creazione (**Create**) della struttura con un numero *prefissato* di *slot* (spazi).
- Accesso in *lettura* (**Read**) allo slot con indice `i`.
- Accesso in *scrittura* (**Write**) allo slot con indice `i`.

```java
int[] a = new int[10]; // Create an array with 10 slots
a[0] = -1; // Write the vlue -1 at position 0
System.out.println("First element: " + a[0]); // Read the value at position 0
```

Queste operazioni che sono disponibili sulla struttura dati li chiamiamo **primitive** di acesso alla struttura dati. 

> [!warning]Osserva
> L’array **non** prevede le seguenti primitive:
>
> - Inserimento (**Insert)** di un nuovo elemento
> - Cancellazione (**Delete**) di un elemento dell’array
> - Scorrere (**Scan**) gli elementi presenti nell’array
> - Ricerca (**Search**) di un element all’interno dell’array
>
>Per realizzare queste operazioni è necessario scrivere degli *algoritmi* che utilizzando le primitive dell’array per ottenere l’effetto desiderato.



Siamo ora pronti per fornire una definizione di struttura dati

> [!note]Definizione
> Una **struttura dati** è un *costrutto* che permette la manipolazione di dati secondo delle **primitive** di accesso.
