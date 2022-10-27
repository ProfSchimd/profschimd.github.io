---
title: Abstract Data Type (ADT)
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/
weight: 20
summary: "Questa lezione introduce e spiega il concetto di abstract data type (tipo dato astratto) fornendo esempi anche pratici nel linguaggio Java."
---

Parlando di [operazioni su strutture dati]({{< ref 01-operazione.md >}}) abbiamo visto
come le possibilità di "agire" siano molte. Per esempio, la sola operazione di
inserimento può essere essere interpretato in vario modo: inserimento all'inizio,
inserimento in una posizione precisa, ...

Dallo studio delle strutture dati, si capisce che non è possibile avere la massima
efficienza per tutte le operazioni possibili in un'unica struttura (si veda
[qui](https://github.com/ProfSchimd/teaching-material/blob/main/inf/datastructure/java_collections/ListVSArray.java) un esempio in Java).

Spesso, perciò, si definisce una *struttura dati astratta* in termini delle operazioni
che si possono fare su quella struttura. Ad esempio possono definire una struttura dati
*vettore* come una qualsiasi struttura dati che permetta l'accesso mediante indici
(come negli array).

{{<def title="Abstract Data Type (ADT)">}}
Una *abstract data type (ADT)* è la specificazione delle operazioni che possono essere eseguite
oltre che dei tipi di dati che possono essere manipolati. Le ADT sono solitamente associate a
costrutti astratti di un linguaggio di programmazione come, ad esempio, le interfacce Java.
{{</def>}}

La definizione sopra indica che normalmente si utilizza specifici costrutti dei linguaggi
di programmazione (ad esempio `interface` in Java) per specificare le strutture dati astratte.
A titolo esemplificativo, la seguente interfaccia Java permette di leggere (`get`) e
scriver (`set`) oggetti di tipo `String` utilizzando un indice `int` per specificare la
posizione, tale interfaccia è una minima rappresentazione dell'ADT *vettore* di cui abbiamo
fatto cenno sopra.

{{<highlight java>}}
interface VectorADT {
    String get(int i);
    void set(int i, String val);
}
{{</highlight>}}

{{<def title="Application Programming Interface (API)" >}}
La definizione in forma di costrutto di programmazione viene spessa chiamata *API*
(acronimo per *Application Programming Interface*). È importante tenere a mente che
il termine API indica più in generale la descrizione di una parte del codice in
termini di quali *input* e quali *output* sono ammessi ed in termini del comportamento
del software rispetto agli input forniti.
{{</def>}}

{{<exercise>}}
Definire una ADT per gestire un *carrello della spesa*, la definizione deve essere fatta in
due "fasi":
1. si definiscono le operazioni e i dati coinvolti in modo discorsivo;
2. si definisce la API utilizzando un linguaggio di programmazione a scelta.
{{</exercise>}}
