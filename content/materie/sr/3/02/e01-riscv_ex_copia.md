---
title: "Esercizio RISC-V: Copia di array"
type: lecture
summary: "Soluzione passo-passo di un esercizio RISC-V sulla copia di array"
weight: 905
---

## Domanda
Scrivere un programma RISC-V per copiare un array (sorgente) presente in memoria in un altro array (destinazione) sempre in memoria. Nel risolvere l'esercizio si tenga conto delle seguenti cose:
* all'indirizzo `0` di memoria si trova l'indirizzo di **inizio dell'array sorgente**,
* all'indirizzo `4` di memoria si trova il **numero di parole dell'array sorgente**,
* all'indirizzo `8` di memoria si trova l'**indirizzo di inizio dell'array destinazione**.

### Strategia risolutiva
La strategia per risolvere il problema è semplice: utilizzando due puntatore, uno per il vettore sorgente e uno per il vettore destinazione, si
eseguirà un ciclo tante volte quanto indicato in `MEM[4]` ed ogni esecuzione del ciclo copierà un elemento dall'array sorgente all'array
destinazione.

Vediamo più in dettaglio di che registri abbiamo bisogno per adottare la strategia risolutiva appena descritta.
* 2 registri per i puntatori a due vettori: `x10` e `x11`
* 1 registro per il numero di parole da copiare: `x12`
* 1 registro per l'indice del ciclo: `x13`
* 1 registro di supporto per fare la copia (ricordiamo che non è possibile fare copia da memoria a memoria): `x14`

### Soluzione
Qui sotto presentiamo il codice RISC-V della soluzione seguendo la strategia appena illustrata. 

{{<column/columns>}}
{{<column/col>}}

```nasm
LW x10, 0(x0) 
LW x11, 8(x0)
LW x12, 4(x0)
ADDI x13, x0, 0
.loop:
LW x14, 0(x10)
SW x14, 0(x11)
ADDI x10, x10, 4
ADDI x11, x11, 4
ADDI x13, x13, 1
BLT x13, x12, .loop
```
{{</column/col>}}
{{<column/col>}}
Cerchiamo di capire meglio il codice a fianco
* Inizialmente i dati del problema vengono caricati dalla memoria nei registri adibiti (linee 1 - 3). In questo caso
i dati sono: il puntatore al vettore sorgente (`x10`), il puntatore al vettore destinazione (`x11`) e il numero
di parole da copiare (`x12`).
* Successivamente, viene eseguito il ciclo del programma inizializzando il contatore (registro `x13`) ed
eseguendo le varie istruzioni del corpo (linee 6 - 9) prima di incrementare il contatore (linea 10) ed eseguire
il salto (linea 11) nel caso `x13 < x12` (cioè l'indice di ciclo minore del numero di elementi da copiare)
* Il corpo del ciclo semplicemente copia da memoria al registro di appoggio `x14` (linea 6) e dal registro
di appoggio alla memoria (linea 7). Sempre all'interno del ciclo i puntatori ai vettori sorgente e destinazione
vengono incrementati (linee 8 - 9) per prepararsi alla prossima esecuzione del ciclo. 
{{</column/col>}}
{{</column/columns>}}

### Soluzione con inizializzazione della memoria
Per verificare il funzionamento del programma sopra è necessario confermare che effettivamente la copia dell'array
venga eseguita. Anche se un solo esempio non sarà sufficiente, vederlo in esecuzione in almeno un caso può essere
utile anche a trovare *bug* del codice. Purtroppo gli interpreti e simulatori non permettono di inizializzare la
memoria ed è quindi necessario procedere ad un'inizializzazione "manuale" utilizzando per l'appunto del codice RISC-V.
Il codice sotto mostra nella seconda metà (linee 19 - 29) lo stesso programma discusso sopra, mentre nella parte
precedente (linee 1 - 29) del codice RISC che inizializza la memoria come segue
* `20`, `4` e `40` nelle parole `0`, `4` e `8`. Questi sono puntatore sorgente, numero parole copiate e
puntatore destinazione, rispettivamente
*  `1`, `2`, `4`, `8` e `16` nelle 5 parole a partire dall'indirizzo `20`.
Con questa inizializzazione il programma dovrebbe scrivere nelle 4 parole a partire dall'indirizzo `40` i valore
`1`, `2`, `4` e `8` (si noti come `16` sia escluso perché sono 4 le parole da copiare).

```nasm
.init:
ADD x15, x0, x0
ADDI x16, x0, 5
ADDI x17, x0, 20
ADDI x18, x0, 1
.riempi:
SW x18, 0(x17)
SLLI x18, x18, 1
ADDI x17, x17, 4
ADDI x15, x15, 1
BLT x15, x16, .riempi
ADDI x16, x0, 4
SW x16, 4(x0)
ADDI x16, x0, 20
SW x16, 0(x0)
ADDI x16, x0, 40
SW x16, 8(x0)
.esercizio:
LW x10, 0(x0)
LW x11, 8(x0)
LW x12, 4(x0)
ADDI x13, x0, 0
.loop:
LW x14, 0(x10)
SW x14, 0(x11)
ADDI x10, x10, 4
ADDI x11, x11, 4
ADDI x13, x13, 1
BLT x13, x12, .loop
```


