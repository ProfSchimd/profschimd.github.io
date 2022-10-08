---
title: Operazione di manipolazione dei dati
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/datastructure/operations
weight: 10
---

Le **strutture dati** sono dei modi (*strutture*) di organizzare l'informazione (*dati*)
all'interno della memoria di un calcolatore. Sappiamo che la memoria di lavoro della CPU
(RAM e cache) è fondamentalmente un *array*, cioè una struttura di memorizzazione lineare. 

Nella pratica l'elaborazione dell'informazione richiede metodi più sofisticati
per la gestione dei dati; le strutture dati permettono una gestione *efficiente*
dell'informazione sulla memoria.

## Operazione di manipolazione
Esistono tre tipologie di operazioni sulle stretture dati
* Inserimento (*insertion*): l'informazione viene aggiunta alla struttura dati;
* Ricerca e accesso (*search* e *access*): l'informazione viene cercata ed eventualmente utilizzata;
* Eliminazione (*deletion*): l'informazione viene eliminata dalla struttura dati.

Il seguente esempio mostra un tipico esempio di *requisiti software* in cui due
aspetti diversi necessitano di strutture dati diverse. Questo si rende necessario in quanto
le varie strutture dati sono efficienti nel fare alcune operazione, ma lo sono di meno nel
farne altre. Purtroppo non è stata ancora scoperta la struttura dati universale che sia
efficiente nel fare tutto (di fatto tale struttura non può esistere con le attuali
tecnologie).

{{<example title="Sito di e-commerce">}}
In un sito di *e-commerce* vengono gestiti gli ordini dei clienti i quali possono scegliere
di inserire in un *carrello* (*basket*) virtuale, dei prodotti (*item*) che sono disponibili
in un *catalogo*. Un catalogo può contenere milioni (es. Amazon) di prodotti, mentre il
carrello solitamente contiene alcune unità (massimo qualche decina) di prodotti.

**Catalogo** Il catalogo necessita di una struttura dati che sia in grado di fornire, in
modo veloce, la ricerca di prodotti ed eventualmente l'accesso ai prodotti (ad esempio per
vedere quante unità di un dato prodotto sono disponibili).

**Carrello** Il carrello necessita di una struttura dati che sia in grado di fornire, in
modo veloce, l'inserimento e la cancellazione di prodotti.

Poiché le necessità di accesso ai dati del catalogo e del carrello sono differenti, è 
comprensibile che per una implementazione efficiente, il software utilizzi due tipo di
strutture dati diverse: una più veloce a cercare, l'altra più veloce ad inserire e
cancellare.
{{</example>}}

Vediamo ora in dettaglio le varie operazioni di manipolazione delle strutture dati.

### Inserimento
L'*inserimento* è l'operazione tramite la quale un elemento viene aggiunto ad
una struttura. L'inserimento può essere ulteriormente specificato in termini
di posizione:

* inserimento in posizione `i`, se previsto dalla struttura dati;
* inserimento dopo/prima l'elemento un altro elemento;
* inserimenti all'inizio/fine;
* ...

Le varie strutture dati si differenziano anche rispetto a quali tipi di inserimento
sono efficienti e quali lo sono meno.

### Ricerca e accesso
Operazioni fondamentali in una struttura data sono la *ricerca* e l'*accesso*, queste
due operazioni permettono di individuare, leggere e modificare l'informazione memorizzata
in una struttura dati.

L'accesso ai dati può essere

* *casuale* (*random*): è possibile accedere direttamente a qualsiasi elemento (ad esempio
utilizzando un *indice* o una *chiave*);
* *sequenziale*: è possibile accedere agli elementi scorrendoli in un qualche ordine;
* limitato ad alcuni elementi quali il primo o l'ultimo inserito;
* ...

#### Modifica
La *modifica* di un elemento spesso può essere effettuata direttamente tramite il *riferimento*
ottenuto tramite l'operazione di accesso. Questo è il caso che si presenta nella maggior parte
dei linguaggi (Java, Python, C++, C#, Javascript, ...) in cui l'accesso restituisce una *reference*
(chiamato a volte *puntatore*) che dà accesso diretto all'oggetto che si può eventualmente
modificare senza alterare la sua "posizione" all'interno della struttura dati.

### Cancellazione
L'operazione di *cancellazione* è spesso disponibile nelle strutture dati, questa
operazione elimina dalla struttura un elemento. Una volta eliminato l'elemento, esso
non potrà più essere ricercato nè acceduto. È tuttavia possibile re-inserire un
elemento che è stato precedentemente eliminato.

Come per l'inserimento, la cancellazione può avvenire:

* in un punto *casuale* della struttura (indicizzato da un *indice* o da una *chiave*);
* nel primo o nell'ultimo elemento inserito;
* ...

{{<example title="struttura vettore">}}
In questo esempio indichiamo le operazioni con le seguenti sigle:

* Inserimento di `x`: `INS(x)`
* Ricerca di `x`: `FIND(x)`
* Accesso ad `i`: `GET(i)`
* Cancellazione di `x`: `DEL(x)`

Utilizziamo una struttura dati *indicizzata*, ovvero i cui elementi li immaginiamo
posizionati in un certo ordine: primo (indice `0`), secondo (indice `1`), ..., 
ultimo (indice `n-1`).

Immaginiamo di inserire i numeri da 1 a 10 facendo le operazioni: `INS(1)`, `INS(2)`,
...; al termine ci troveremo una struttura che conterrà, ovviamente, i seguenti elementi

    1 2 3 4 5 6 7 8 9 10

**Attenzione** in questo caso abbiamo ipotizzato che `INS(x)`, senza la
posizione in cui inserire, significhi *inserire alla fine*. Altre struttura dati
potrebbero permettere l'inserimento in una specifica posizione, ad esempio `INS(0, 1234)`
inserisce nella prima posizione (indice `0` l'elemento `1234`).

A questo punto cerchiamo gli elementi `4` e `12`:

* la `FIND(4)` produrrà un esito positivo indicando, per esempio la sua posizione, in
questo caso la posizione è `3`;
* la `FIND(12)` produrrà un esito negativo (l'elemento non è presente), ad esempio dando
un valore `null` o posizione `-1`.

Se volessimo accedere all'elemento di contenuto `4` che sappiamo essere all'indice `3`
dovremmo quindi eseguire `GET(3)` che restituisce l'elemento `3`.

Successivamente eseguiamo `DEL(2)`, `DEL(4)` e `DEL(8)`, il risultato sarà una struttura
con il seguente contenuto

    1 3 5 6 7 9


{{</example>}}

## Iterazione
Spesso è possibile scorrere tutti gli elementi presenti in una struttura dati, in questi
casi si usa il concetto di *iterator* il quale permette di scandire gli elementi memorizzati.
Ogni struttura dati può prevedere il proprio iterator anche sulla base delle operazioni che
possono essere efficienti sulla struttura. 

Possiamo identificare diversi modi di iterare su una struttura:
* *iterator sequenziale* in cui gli elementi sono acceduti uno dopo l'altro
* *iterator inverso* in cui gli elementi sono acceduti in ordine inverso rispetto a quello
sequenziale
* *graph/tree iterator* utilizzati nei grafi e negli alberi che possono essere di vario tipo
(*breadth-first*, *depth-first*, ...)
* ...

In alcuni casi (ad esempio [code e pile]({{<ref 03-queue-and-stack.md>}})) può non essere
possibile iterare su tutti gli elementi.