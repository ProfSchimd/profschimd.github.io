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

#### Parametri di ingresso
Una subroutine può o meno avere dei *parametri d'ingresso* cioè delle
variabili il cui valore non si conosce nel momento in cui si scrive il
programma, ma che sono importanti per l'esecuzione della subroutine.
Ovviamente possono esistere subroutine senza o con più di un
parametro d'ingresso.

#### Parametri di uscita
Una subroutine può o meno avere dei *parametri d'uscita* cioè delle
variabili il cui valore viene riempito dalla subroutine stessa e poi
usato da chi ha fatto uso della subroutine. Come i parametri d'ingresso,
anche i parametri di uscita possono essere assenti o più di uno. Questo
ultimo caso (più parametri di uscita) è molto raro probabilmente perché
sono pochi i linguaggi che permettono di restituire più una variabile.

#### Passaggio di parametri
La presenza di parametri d'ingresso e/o di uscita è così frequente nella
pratica che esistono dei registri della CPU dedicati (vedi sotto "Stack
Pointer") e delle istruzione apposite (``CALL`` e ``RET``).


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
su questa parte.

Anche se lo stack prevede uno spazio di memoria abbastanza ampio, questo spazio
non è sempre occupato del tutto. Al contrario è bene che lo stack abbia sempre
dello spazio a disposizione per nuove variabili e/o nuove chiamata a subroutine.
Quando lo stack si riempie (**stack overflow**) il programma, normalmente, si
interrompe bruscamente con un messaggio di errore.

In pratica succede una cosa molto semplice: *ogni parametro di ingresso e di
uscita viene aggiunto allo stack*. In questo modo nel codice della subroutine
si può accedere ai parametri accedendo allo stack e così si possono scrivere i
risultati (parametri di uscita) sempre accedendo allo stack. 

## Gestione delle subroutine nella CPU
Adesso che abbiamo visto cos'è lo stack, possiamo vedere come la CPU
utilizzo lo stack e dei registri speciali per eseguire le chiamate a
subroutine e per il passaggio di parametri.

### Stack Pointer (SP)