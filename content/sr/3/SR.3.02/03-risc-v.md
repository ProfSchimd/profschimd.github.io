---
title: Assembly RISC-V
---

## Basi del linguaggio assembly RISC-V

RISC-V è un linguaggio **assembly di tipo RISC** in cui *tutte le istruzioni hanno la stessa dimensione* (32 o 64 bit). Questo rende la progettazione del circuito di decode più semplice rispetto ad ISA con istruzioni di dimensione variabile (ad esempio l'assembly x86).

> [!warning]- Attenzione
>
> Le ISA con istruzioni a *lunghezza variabile* normalmente hanno istruzione con lunghezza multipla della parola di memoria. Ad esempio in un'architettura a 64 bit, ci possono istruzioni di 64 o 128 bit, non istruzioni di 96 bit.

Altra caratteristica importante di RISC-V è che s tratta di un'architettura **load-store**, ciò significa che gli operandi devono essere nei registri della CPU prima di eseguire operazioni aritmetico-logiche. Anche in questo caso la progettazione dei circuiti interno della CPU è semplificata.

Possiamo individuare tre tipologie di istruzioni RISC-V:
- istruzioni **aritmetico-logiche**,
- istruzioni di **movimento dati** e
- istruzioni di **controllo del flusso**.

Le istruzioni aritmetico logiche sono normalmente presenti in due versioni. Ad esempio la somma tra due registri `add` e la somma tra un registro ed un valore **immediate** `addi`. In RISC-V un valore *immediate* è un valore esplicito (in linguaggi come Java si parla di *literal*) come il numero `123` oppure la stringa `"Hello"`. Questi sono valori che il programmatore scrive in modo diretto, senza usare *variabili* o registri.

```riscv
add a0 a1 a2 # Add a1 and a2 put result in a0
addi a0 a1 42 # Add a1 and 42 put result in a0
```

> [!warning] Istruzioni e alias
>
> Certe istruzioni presenti nell'assembly RISC-V, sono in realtà degli *alias* (altro nome) di istruzioni. Ad esempio, caricare in un registro il valore $x$ è possibile con l'istruzione `li` (*load immediate*) che però è un alias per l'istruzione `addi` (*add immediate*) che un registro con un *immediate*

> [!error] 32 vs 64 bit
>
> RISC-V esiste sia a 32 sia a 64 bit, questa lezione tratta alcune istruzioni RISC-V a 32 bit.

## I registri in RISC-V
L'architettura RISC-V prevede 32 registri `x0`, `x1`, ..., `x31`. Ciascun registro ha un *alias* che meglio ne descrive l'utilizzo.
- `x0` alias `zero` contiene sempre il valore `0`.
- `x1` alias `ra` contiene il **r**eturn **a**ddress per le chiamate a subroutine.
- `x2`, `x3` e `x4` alias `sp`, `gp` e `tp` sono **p**untatori particolari
- da `x5` a `x7` alias `t0`, ...,`t2` e da `x28` a `x31` alias `t3`, ..., `t6` sono registri per valori temporanei.
- `x8`, `x9` alias `s0`, `s1` e da `x18` a `x27` alias `s2`, ..., `s11` sono **s**aved registers.
- da `x10` a `x17` alias `a0`, ..., `a7` registri per funzioni e operandi.

## Istruzioni aritmetico-logiche
Le istruzioni aritmetico-logiche che consideriamo sono le seguenti.
* Addizione `add`, sottrazione `sub` e moltiplicazione `mul`
* Operazioni logiche `and`, `or` e `xor`
* Shift aritmetico `sra`, shift logico sinistro `sll` e shift logico destro `srl`

Il formato generale per le istruzioni con operandi nei registri (*R-type*) è

```riscv
oper rd rs1 rs2
```

* `oper` è il codice dell'operazione (es. `add`, `and`, ...);
* `rd` è il registro di destinazione, cioè il registro nel quale verrà scritto il risultato finale;
* `rs1` e `rs2` sono i registri sorgente dai quali vengono presi gli *operandi*.

Tutte le operazioni aritmetico-logiche sopra eccetto `mul`, hanno anche la versione *immediate* dove il secondo registro sorgente `rs2` va sostituito con una costante a 12 bit (tra -2048 e 2047).

### Esempi
* Sommare i valori in `x10` e in `x11` mettendo il risultato in `x12`
  ```riscv
  add x12 x10 x11
  ```
* Mettere il valore `42` nel registro `x15` (aggiunge `x0=0` a `42` e mettere il risultato in `x15`)
  ```riscv
  addi x15 x0 42
  ```
* Fare la differenza tra `x10-x9` mettendo il risultato in `x10`
  ```riscv
  sub x10 x10 x9
  ```
* Calcolare il resto della divisione per due di `x2` mettendo il risultato in `x3` (tale resto è proprio il valore del *bit meno significativo*)
  ```riscv
  andi x3, x2, 1
  ```
* Moltiplicare per `4` il valore di `x22` e mettere il risultato in `x30` (per moltiplicare per 4 basta *shiftare* a sinistra il valore di un due bit)
  ```riscv
  slli x30, x22, 2
  ```

## Istruzioni di spostamento dati
Gli operandi sui quali eseguire operazioni possono trovarsi in memoria, su altri registri oppure possono essere valori numerici constanti (*immediate*). Per poter avere nei registri e/o nella memoria i valori richiesti dal programma, è necessario "spostare" informazione tra i registri e tri i registri e la memoria.

### Istruzioni su registri
Per inserire valori nei registri direttamente o da altri registri possiamo usare *load immediate* `li` e *move* `mv`.

Load immediate accetta un registro ed un valore immediate che verrà memorizzato nel registro.
```riscv
li a0 42 # Memorizza 42 in a0
li a1 -3 # Memorizza -3 in a1
```

Move permette di *copiare* un valore da un registro ad un altro.
```riscv
mv a1 a0 # Copia il valore di a0 in a1
```

> [!note] Spostare vs Copiare   
>
> L'istruzione move non sposta il valore da un registro ad un altro, ma *crea una copia*. In generale le istruzioni assembly non fanno operazioni inutili. Spostare un valore da `rs` a `rd` richiederebbe di "svuotare" (mettere a zero) `rs`. Questa operazione richiede del tempo che può essere risparmiato dal momento che nella maggior parte dei casi svuotare `rs` non è necessario.

> [!warning] Istruzioni alias
>
> Sia l'istruzione `li` che l'istruzione `mv` sono *alias* di una specifiche istruzioni `add`. Infatti load immediate è una somma immediate con zero e move è una somma con zero. 
> ```riscv
> li a0 7
> # Equivalente a 
> addi a0 zero 7
> ```
> ```riscv
> mv a0 a1
> # Equivalente a
> add a0 a1 zero
> ```

L'esempio che segue mette in `a0` il valore 42 e lo copia anche in `a2` e `a5`
```riscv
li a0 42
mv a2 a0
mv a5 a2
```

### Istruzioni di load e store
Dato il ridotto numero di registri, ogni programma necessita della memoria RAM per depositare (anche temporaneamente) i risultati di alcune operazioni oltre che per leggere input e per scrivere output. In RISC-V le istruzioni di accesso alla memoria vengono dette:
- **load** per *caricare* dalla memoria e
- **store** per *immagazzinare* nella memoria.

La sintassi di queste istruzioni prevede due versioni: una per spostare da e per la memoria byte, l'altra per spostare parole (*word*).
Esistono, quindi, quattro tipi di istruzioni di accesso alla memoria: due di caricamento dalla memoria ad un registro `rd`

```riscv
lb rd MEM
lw rd MEM
```

e due per il salvataggi in memoria del contenuto del registro `rd`

```riscv
sb rd MEM
sw rd MEM
```

Le due versioni `b` e `w` si usano per *byte* e *word*, rispettivamente. Il primo parametro`rd` indica il registro da cui prendere (per store) o su cui mettere (per load) il contenuto della memoria, all'indirizzo `MEM`. In RISC-V gli indirizzi di memoria si indicano usando un **indirizzamento con registro base**.

### Indirizzamento con registro base

Nelle istruzioni load e store dobbiamo indicare la cella di memoria da cui leggere o scrivere. Si potrebbe pensare che la cosa ovvia sia usare *indirizzi assoluti*, ad esempio `1234`. In questo modo, tuttavia, possiamo indicare un numero limitato di celle, il limite dipende dal numero di bit usato per l'*immediate*. Ad esempio in una *I-instruction* in cui l'immediate è di 12 bit, si possono solo indicare solo le celle con indirizzo tra 0 e 4095. Questo permette di scrivere  solo programmi con 4 KByte memoria dati.

Per usare più di 4096 celle, RISC-V utilizza l'indirizzamento con **registro base**. L'indirizzo viene calcolato sommando un **indirizzo di base**, presente in un registro, ed un **offset** dato ome immediate. Per esempio possiamo indicare un offset di `430` rispetto al registro base `a0`. Se in `a0`, per esempio, c'è il numero `8500`, allora accediamo alla cella 8500 + 430 = 8930. Questo esempio mostra che è possibile utilizzare memoria più grande di 4 KByte, basta impostare il valore del registro base.

> [!example] Esempio
> ```riscv
> li a0 1
> slli a0, a0, 20 # Questo è 2^20, circa un milione
> li a1 123
> sb a1 2(a0)
> ```
>
> Le prime due istruzioni fanno si che in `a0` finisca il numero `2^20 = 0x100000`, la terza istruzione mette il numero `123` (decimale) in `a1` ed infine la quarta istruzione carica il contenuto di `a1` (che è `123`) nella cella di indirizzo `2 + a0`, siccome `a0` contiene il numero `0x100000` (esadecimale), la cella che verrà scritta è quella di indirizzo `0x100002` (esadecimale). Siamo quindi riusciti a scrivere in una cella il cui indirizzo (circa un milione) è molto più grande del più grande immediate (circa `4000`), questo non sarebbe stato possibile senza la tecnica del registro base.

### Esempi di load e store
Caricare in `a0` il contenuto del *byte* memoria all'indirizzo `128`
  ```riscv
  lb a0 128(zero)
  ```

Caricare in `a0` il contenuto della *parola* di memoria all'indirizzo `128`
  ```riscv
  lw a0 128(zero)
  ```

Salvare nella parola di memoria all'indirizzo `80` il valore `17` (utilizzando il registro `s4`)
  ```riscv
  li s4 17
  sw s4 80(zero)
  ```

Salvare nel byte di memoria all'indirizzo contenuto in `a0` il valore contenuto nel registro `a5`
  ```riscv
  sb a5 0(a0)
  ```

> [!error] Attenzione al programma
>
> Nell'architettura di von Neumann, programma e dati sono nella stessa memoria. È normale utilizzare la *parte bassa* della memoria (a partire dall'indirizzo `0`) per il programma. Per questo motivo la prima parte della memoria contiene le istruzioni. Se utilizziamo questa zona per scrivere i nostri dati andiamo ad eliminare il programma dalla memoria e questo può facilmente creare problemi e comportamenti inattesi.

## Istruzioni di branch e di salto
Non si potrebbero scrivere programmi interessanti in qualsiasi linguaggio di programmazione senza istruzioni di condizione come l'istruzione if o cicli come while. Lo stesso vale per programmi in linguaggio assembly in cui condizioni e cicli si fanno utilizzando istruzioni di salto. Queste istruzioni permettono di "saltare" ad una qualsiasi istruzione purché questa si possa identificare, per fare questo di usano delle etichette associate a quelle istruzioni che si vogliono raggiungere a seguito di un salto. Le etichette non sono altro che dei nomi che vengono date alle istruzioni, in pratica questi nomi indicano il numero dell'istruzione (indirizzo di memoria dove l'istruzione si trova). Ovviamente le etichette sono più facili da ricordare dei numeri o degli indirizzi di memoria.

Le operazioni più importanti di salto sono quelle di salto condizionato cioè di salto nel caso in cui si verifica una certa condizione, in RISC-V queste istruzioni vengono chiamate *branch*. Tutti gli assembly contengono anche istruzioni si salto non condizionato che in RISC-V vengono chiamate jump.

Le istruzioni si salto condizionato in RISC-V sono
* `beq` **B**ranch in **EQ**ual
* `bne` **B**ranch if **N**ot **E**qual
* `blt` **B**ranch if **L**ess **T**han
* `bge` **B**ranch if **G**reater than or **E**qual
* `bltu` **B**ranch if **L**ess **T**han **U**nsigned
* `bgeu` **B**ranch if **G**reater than or **E**qual **U**nsigned

La sintassi di queste istruzione è la seguente
```riscv
bxx r1 r1 label
```

dove `bxx` rappresenta l'istruzione di branch, `r1` e `r2` sono registri e `label` è un etichetta. Per assegnare un'etichetta ad una istruzione si usa la sintassi
```riscv
label: li a0 11
```

### Esempi

Saltare all'etichetta `fine` se il valore del registro `a1` è nullo
```riscv
beq a1 x0 fine
```

Saltare all'etichetta `inizio` se il valore del registro `a1` è non nullo
```riscv
bne a1 zero inizio
```

Saltare all'etichetta `fine` se il valore del registro `a1` è negativo
```riscv
blt a1 zero fine
```

Saltare all'etichetta `loop` se il valore del registro `a1` è positivo (si usa l'idea
che `a1>0` è equivalente a `0<a1` in modo da usare `blt`)
```riscv
blt zero a1 loop
```

Saltare all'etichetta `fine` se il valore del registro `a1` è negativo o nullo (anche
qui usiamo il fatto che `a1<=0` equivale a `0>=a1`)
```riscv
bge zero a1 fine
```

### Istruzioni di salto incondizionato
È possibile saltare ad un'etichetta senza che debba verificarsi una condizione. Questo permette di interrompere il flusso lineare di istruzioni.
```riscv
j label
```

Una seconda istruzione di salto incondizionato è `jal`, *jump and link*. Questa viene usata per eseguire *chiamate a subroutine*, a differenza di `j` l'indirizzo dell'istruzione successiva a `jal` viene salvato nel registro `x1` alias `ra` (*return address*)
```riscv
jal label
```

### Chiamate a sistema
Un altro tipo di salto incondizionato è l'istruzione `ecall` (*external call*) che invoca il sistema operativo per eseguire delle operazioni. Il tipo di operazione da eseguire è indicato in forma di codice nel registro `a7`.

```riscv
# Stampa su console l'intero presente in a0
li a7 1
li a0 42
ecall
```

## Link

* [Ripes: Programma di simulazione di un CPU RISC-V](https://github.com/mortbopet/Ripes)
* [Interprete RISC-V](https://www.cs.cornell.edu/courses/cs3410/2019sp/riscv/interpreter/)
* [Altro simulatore RISC-V](https://www.kvakil.me/venus/)

