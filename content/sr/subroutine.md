---
title: Subroutine e gestione dello stack
layout: page
materia: sr
usemathjax: true
align: justify
---

## Le subroutine
Spesso un programma deve eseguire la stessa sequenza di istruzioni
più volte. Oltre ai **loop**, che eseguono un gruppo di istruzioni più volte
*consecutivamente*, le **subroutine** permettono di eseguire lo stesso gruppo
di istruzioni più volte, *anche non consecutivamente*.

Un esempio di subroutine è la sequenza di istruzioni per calcolare la
*radice quadrata* di un numero \\(x\\). Ogni volta che serva calcolare
\\(\sqrt{x}\\), si può utilizzare lo stesso "gruppo" di istruzioni,
senza dover ogni volta riscriverle. Ad esempio in Java questo si può
ottenere con il metodo statico ``sqrt`` della classe ``Math``
{% highlight java %}
double y = Math.sqrt(x);
{% endhighlight %}

Quando serve utilizzare una subroutine che è già stata
scritta, si dice che si esegue una **chiamata alla subroutine**.
Questo modo di dire suggerisce una "richiesta di aiuto" per
funzioni speciali, ad esempio calcolare \\(\sqrt{x}\\).

<div class="ml-3 row">
<div class="col-6" markdown="1">
{% include_relative img/loop_vs_subroutine.html %}
</div>
<div class="col-6" markdown="1">

L'immagine a fianco mostra la differenza di esecuzione tra un loop (parte
sinistra dell'immagine) e una subroutine (parte destra dell'immagine),
le frecce indicano i "salti" di istruzioni. Nel caso di un loop il
salto ha la funzione di riportare all'inizio del ciclo il *program counter*,
mentre nel caso di una subroutine si vede come la sequenza viene
momentaneamente interrotta per chiamare (``CALL``) una subroutine la quale
ritornerà (``RET``) il controllo al punto dopo la chiamata; anche in
questo caso si tratta di modifiche al program counter.
</div>
</div>

Il concetto di subroutine è strettamente legato ai concetti di
procedura e funzione nei linguaggi procedurali (ad esempio C e Python) ed al
concetto di metodo nei linguaggi ad oggetto (ad esempio Java e Python).
Infatti il *compilatore* (che traduce il codice
in linguaggio macchina), trasforma ogni procedura ed ogni metodo
in una chiamata a subroutine.

### I parametri delle subroutine
Nell'esempio della radice quadrata, il numero \\(x\\) rappresenta l'*input*
alla subroutine che calcola \\(\sqrt{x}\\), si parla anche di **parametro**
d'ingresso alla subroutine. Anche il risultato della subroutine (cioè il
numero che rappresenta \\(\sqrt{x}\\)) è un parametro della subroutine, in
particolare un parametro di uscita.

Una subroutine può o meno avere dei **parametri d'ingresso** cioè delle
variabili il cui valore non si conosce nel momento in cui si scrive il
programma, ma che sono importanti per l'esecuzione della subroutine.
Ovviamente possono esistere subroutine senza o con più di un
parametro d'ingresso.

Una subroutine può o meno avere dei **parametri d'uscita** cioè delle
variabili il cui valore viene riempito dalla subroutine stessa e poi
usato da chi ha fatto uso della subroutine. Come i parametri d'ingresso,
anche i parametri di uscita possono essere assenti o più di uno. Questo
ultimo caso (più parametri di uscita) è molto raro probabilmente perché
sono pochi i linguaggi che permettono di restituire più una variabile.

#### Passaggio di parametri
La presenza di parametri d'ingresso e/o di uscita è così frequente nella
pratica che esistono dei registri della CPU dedicati (vedi sotto "Stack
Pointer") e delle istruzione apposite (``CALL`` e ``RET``). In pratica
i parametri vengono scritti in un'apposita zona della memoria, chiamata
*stack* (vedi [sotto](lo-stack-di-programma)).


## Lo stack di programma
Ogni programma ha una zona di memoria che gli viene riservata (*allocata*)
e nella quale si trovano tutte le informazioni per l'esecuzione
(maggiori informazioni in  [questa pagina](/content/tpsit/processi.html#lo-spazio-di-memoria-di-un-processo)).
Questa zona è suddivisa in quattro parti:

1. *Text* contenente le istruzioni del programma,
2. *Data* contenente le variabili globali (ad esempio ``static`` di Java),
3. *Stack* contenente le variabili locali (ad esempio parametri dei metodi) e
4. *Dynamic* contenente le variabili dinamiche (ad esempio ``new`` di Java).

Lo **stack** (*pila*) è la zona della memoria di programma che viene utilizzato
per il passaggio di parametri ad una subroutine, per questo motivo ci concentriamo
su questa parte. Stack e memoria dinamica (*dynamic*) sono le parti di un programma
che vengono riempite con le variabili create durante l'esecuzione del programma
stesso; per questo motivo possono aumentare o diminuire di dimensione. Si può
pensare a queste due parti come associate ai due estremi una parte della memoria,
mano a mano che si riempono, queste due parti si avvicinano sempre di più, anche
se non si sovrappongono mai (altrimenti la memoria a disposizione del programma
si esaurisce). Tuttavia, proprio per questo motivo, lo stack viene solitamente
riempito percorrendo la memoria da indirizzi alti ad indirizzi bassi. Ad esempio
un byte sullo stack potrebbe avere indirizzo di memoria ``0x51``, il successivo
``0x50``, quello successivo ``0x4F``, e così via.
Quando lo stack si riempie (**stack overflow**) il programma, normalmente, si
interrompe bruscamente con un messaggio di errore.

In pratica succede una cosa molto semplice: *ogni parametro di ingresso e di
uscita viene aggiunto allo stack*. In questo modo nel codice della subroutine
si può accedere ai parametri accedendo allo stack e così si possono scrivere i
risultati (parametri di uscita) sempre accedendo allo stack. 

## Gestione delle subroutine nella CPU
Adesso che abbiamo visto cos'è lo stack, possiamo vedere come la CPU
utilizzo lo stack e dei registri speciali per eseguire le chiamate a
subroutine e per il passaggio di parametri. Di seguito vedremo come la
CPU gestisce lo stack mediante un apposito registro e come le chiamate
a subroutine ed i passaggi di parametri avvengono utilizzando lo stack.

### Stack Pointer (SP)
Per meglio gestire lo stack, ogni CPU possiede un registro speciale chiamato
**stack pointer** (``SP``) nel quale si tiene traccia della *cima* dello stack
(la prima zona "libera").

<div class="ml-3 row">
<div class="col-6" markdown="1">
{% include_relative img/stack_pointer.html %}
</div>
<div class="col-6" markdown="1">

Nell'immagine a sinistra si può vedere un momento intermedio durante l'esecuzione
di un programma. Lo ``SP`` sta puntando al byte ``122``, i puntini nei byte con
valori maggiori indicano che quella parte di memoria contiene delle variabili
(sullo stack), mentre la parte corrispondente ai byte minori di ``122`` è *libera*.
La freccia indica che lo memoria dello stack si riempie dagli indirizzi "alti" agli
indirizzi "bassi" (come discusso sopra).
</div>
</div>

### Chiamata a subroutine
I linguaggi assembly prevedono istruzioni particolari per la chiamata a subroutine,
normalmente queste istruzioni fanno alcune operazioni per preparare i registri
all'esecuzione della subroutine.

Istruzione ``CALL``
* Salva il valore attuale del *program counter* prima del salto. In questo modo, alla
fine della subroutine, sarà possibile tornare "dove si era rimasti" (prima del salto).
* Salva il valore dello stack pointer. In questo modo la subroutine può modificare
lo stack pointer creando variabili o facendo a sua volte chiamate a subroutine.
* Prepara nello stack i parametri della subroutine. In questo modo i *parametri formali*
vengono riempiti con i valori dei *parametri attuali*.

Istruzione ``RET``
* Ripristina il vecchio valore dello stack pointer. In questo modo sarà possibile
riprendere l'esecuzione con lo stack come era prima della chiamata.
* Scrive i risultati (parametri di uscita) in modo che siano a disposizione dopo
che si ritorna all'esecuzione precedente.
* Ripristina il valore del *program counter* così il prossimo ciclo [fetch-and-execute](cpu.html)
recupera l'istruzione corretta (prima delle chiamata a subroutine).

Tutte le operazioni sopra coinvolgono lo stack e sono mostrate con un esempio nella figura
qui sotto.

{% include_relative img/subroutine_vs_stack.html %}

Nella precedente figura vediamo tre diversi "momenti" dell'esecuzione della
subroutine ``SQRT(x)`` per il calcolo di \\(\sqrt{x}\\). In questa figura la
memoria è divisa in *parole* perciò gli indirizzi sono tutti multipli di 4.
1. *Prima della chiamata* lo stack è riempito fino alla parola ``132``. Lo 
stack pointer ``SP`` indica la prima parola di memoria che libera cioè la 
``128``.

2. Durante l'esecuzione della subroutine (dopo l'istruzione ``CALL``), nelle
tre parole libere troviamo
    1. il valore del program counter ``PC`` prima della ``CALL``
    2. il valore dello stack pointer ``SP`` prima della ``CALL`` (``128`` nel nostro esempio)
    3. il parametro ``x`` della routine

3. Terminata l'esecuzione della subroutine (dopo l'istruzione ``RET``), la situazione
ritorna quella presente prima dell'esecuzione di ``CALL`` con la differenza che da
qualche parte (all'indirizzo ``128`` puntato dallo ``SP`` nel nostro esempio) si
trova il risultato \\(\sqrt{x}\\) della subroutine. Va tenuto presente che nell'esempio
la parola ``128`` è considerata libera poiché ``SP`` indica sempre una parola libera.
Il programmatore che volesse usare questo valore, deve prima portarlo in un registro
o in un'altra zona di memoria (alcuni linguaggi usano dei registri prestabiliti
per il risultato di una subroutine).

## Esempio di subroutine 

Consideriamo ora un esempio di subroutine che, in Java, corrispondente ad un metodo con
la seguente *firma*.

{% highlight java %}
public int trova(int[] v, int k) 
{% endhighlight %}

Questo metodo restituisce un ``int`` che rappresenta l'indice della posizione di ``k``
nell'array ``v``. Se in ``v`` non esiste una posizione con il valore ``k``, il metodo
restituisce ``-1``.

Notiamo che

* Il metodo ha due parametri di ingresso
    1. il **riferimento** all'array ``v``
    2. il numero ``k`` da cercare
* Il metodo restituisce un singolo valore di tipo ``int``

Supponiamo, inoltre, che il metodo ``trova`` utilizzi una sola variabile locale,
 che chiamiamo ``y``, di tipo ``int`` dichiarata con una riga di codice simile
 a quella sotto

{% highlight java %}
int y = -1; // inizializzo la posizione
{% endhighlight %}

I cambiamenti subiti dallo stack durante l'esecuzione del metodo ``trova``, sono
mostrati nell'immagine qui sotto

{% include_relative img/local_variable_vs_stack.html %}

A differenza dell'immagine più in alto, notiamo che quando la variabile ``y`` viene
dichiarata, questa viene posizionata sullo stack mentre ``SP`` viene ulteriormente
decrementato come conseguenza.

