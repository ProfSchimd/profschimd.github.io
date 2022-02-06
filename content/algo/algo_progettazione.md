---
title: Progettare un algoritmo
layout: page
materia: algo
align: justify
---

## Cosa vuol dire progettare un algoritmo

Si usa spesso l'analogia tra un *algoritmo* a una *ricetta* di cucina,
ma le ricette di un cuoco che ai fornelli di un ristornate stellato
sono improvvisate? Certamente no, la quantità di ogni singolo ingrediente,
i tempi di cottura e come disporre sul piatto il cibo, sono ben studiate
per rendere il piatto un capolavoro.

Allo stesso modo un algoritmo non è un'"improvvisazione", ma il risultato
di un lavoro di <strong class="text-danger">progettazione</strong> che
il programmatore deve fare prima di mettersi alla "cucina" del progetto
software su cui lavora.

### Da dove si parte?

Progettare un algoritmo può sembrare una cosa difficile e che richiede
molti di anni esperienza. Sicuramente, per progettare un ottimo algoritmo
serve molto studio ed anni di esperienza pratica. Ma come una ricetta culinaria
semplice è alla portata di tutti (e può essere anche buona), così progettare
semplici algoritmi non richiede una preparazione di anni, bastano le basi
della programmazione ed un po' di *logica*. Per cominciare riprendiamo qui
una definizione di *algoritmo* così da meglio capire cosa ci viene chiesto
quando dobbiamo scriverne uno.

<div class="card bg-light mb-3">
  <div class="card-header">Definizione: <strong>Algoritmo</strong></div>
  <div class="card-body" markdown="1">
Un <strong class="text-danger">algoritmo</strong> è una sequenza **finita**
di **istruzioni** che elabora un **input** per produrre uno specifico **output**.
  </div>
</div>

Notiamo due dei termini evidenziati: **input** e **output** e chiediamoci se
*abbiamo capito quali sono gli input e quali gli output dell'algoritmo*. Per
fare un esempio, se dobbiamo calcolare la somma di ``n`` numeri, l'input daranno
gli ``n`` numeri ``x1, x2, ..., xn`` l'output sarà la loro somma
``x1+x2+...+xn``. Quando poi si parla di uno specifico linguaggio di programmazione,
bisogna specificare input e output ancora meglio. Ad esempio, in Java i numeri
di input potrebbero essere in un array ``x`` e la somma diventa  ``x[0]+x[1]+...+x[n-1]``
che diventa l'output il quale potrebbe essere un'istruzione ``return`` oppure
un output su console con ``System.out.println(...)``.

### Scrittura dell'algoritmo

Se riguardiamo la definizione sopra, ci sono altre due parole evidenziate:
**finita** e **istruzioni**. Mentre per finita si intende che le istruzioni devono
essere *non infinite* (cosa che sarebbe, comunque, difficile da scrivere),
dalle *istruzioni* che si possono utilizzare dipende anche come è fatto l'algoritmo.
Per fare un esempio un algoritmo in Java non è uguale ad un algoritmo in Python o
in linguaggio assembly.

Proprio per la differenza tra linguaggi, spesso si pensa ad algoritmo in modo
che non dipende dal linguaggio. Esistono dei modi di esprimere un algoritmo che
assomigliano ad un linguaggio di programmazione, ma che non lo sono proprio,
questi si chiamano **pseudo-codice**. Esistono poi altri modi che sono molto
diversi da un programma, come ad esempio i *flow chart*. Molto spesso però
conviene usare qualcosa di ancora più semplice, la lingua parlata. In questi
casi è importante che comunque le istruzioni siano date come una sequenza
(finita) di passi elementari, esattamente come si fa per una ricetta di cucina.
Per la somma di ``n`` numeri questa descrizione "in lingua" dell'algoritmo
è mostrata nell'immagine sotto che evidenzia anche l'input e l'output. La
figura mostra in forma di *diagramma a blocchi* il comportamento
dell'algoritmo somma: a sinistra abbiamo l'input che "entra" nel blocco
``SOMMA`` dal quale esce a destra l'output.

{% include_relative img/algo_somma_box.html %}

## Studiare un algoritmo

Spesso, per capire un algoritmo conviene pensarlo come una **scatola nera**
(*black box*) dentro la quale non possiamo guardare, ma dobbiamo accontentarci di
vedere che output produce quando noi forniamo un certo input. Ad esempio, supponiamo
di avere un programma che prende numeri interi in ingresso e che stampi a video un
altro numero intero. Come facciamo a capire *che relazione c'è tra quello che c'è in
ingresso e quello che viene stampato?* Diciamo che proviamo vari casi ed otteniamo
quanto segue

      Input -> Output
      1     -> 1
      2     -> 4
      3     -> 9
      -3    -> 9
      0     -> 0
      100   -> 10000

cosa sta calcolando il nostro programma *black box*?

<div class="alert alert-danger" markdown="1">
<strong><i class="bi bi-exclamation-triangle"></i> Attenzione</strong><br />
In questo caso il termine *scatola nera* non c'entra con i dispositivi di bordo presenti,
ad esempio, negli aerei. Quando parliamo di un algoritmo come di una scatola nera, intendiamo
che non possiamo "aprire" e vedere come è fatto dentro. In questo senso la scatola è opaca
(scura, nera) e non ci permette di "sbirciare" all'interno.
</div>

## Le quattro fasi di Polya

### Comprendere il problema

### Pianificare la soluzione

### Portare a termine il piano

### Controllare il risultato

## Riferimenti

* George Pólya, *How to solve it* (Penguin, 1990)
