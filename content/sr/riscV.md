---
title: Assembly RISC-V
layout: page
materia: sr
align: justify
---

## Basi del linguaggio assembly RISC-V

<div class="row">
<div class="col-4" markdown="1">
![Immagine di un processore RISC-V](img/riscv_processore.jpeg)
</div>
<div class="col-8" markdown="1">
RISC-V è un linguaggio **assembly di tipo RISC** ed è basato sul principio che *tutte le istruzioni hanno la stessa dimensione*: 32 o 64 bit. Questo vincolo su RISC-V rende la progettazione del circuito di decode per RISC-V più semplice rispetto ad altri linguaggi in cui ci possono istruzioni di diversa dimensione (ad esempio l'assembly x86).

Altra caratteristica di RISC-V è il fatto che l'**architettura è ti tipo load-store** che significa che gli operandi devono tutti trovarsi nei registri prima si possano fare operazioni aritmetico-logiche su di essi. Anche in questo caso la progettazione del circuito interno della CPU ne risulta molto semplificato.
</div>
</div>

## Formato delle istruzioni
Il formato delle istruzioni RISC-V a32 bit comprende diverse modi di rappresentare le istruzioni utilizzando i 32 bit. Ci limitiamo qui a vedere i principali formati che sono 6.
1. **R**egistry
2. **I**mmediate
3. **U**pper Immediate
4. **S**tore
5. **B**ranch
6. **J**ump
Nella figura seguente possiamo vedere come ogni singolo di questi formati suddivida i 32 bit in modo che siano indicati:
* ``opcode``: indica di che istruzione si tratta
* ``funct3`` e ``funct``: ulteriori indicazione sul tipo di istruzione
* ``rd``: registro di destinazione per i risultati
* ``rs1`` e ``rs2``: registri per gli operandi
* ``imm``: operandi immediati, vale a dire valori numerici costanti.

![Schema di formato delle istruzioni RISC-V](img/formato_istruzioni_riscv.png)

## Istruzioni RISC-V
Le operazioni basilari presenti nel <a src="https://www.cs.cornell.edu/courses/cs3410/2019sp/riscv/interpreter/" target="_blank">simulatore RISC-V</a> online sono le seguenti:
Arithmetics: ``ADD``, ``ADDI``, ``SUB``
Logical: ``AND``, ``ANDI``, ``OR``, ``ORI``, ``XOR``, ``XORI``
Sets: ``SLT``, ``SLTI``, ``SLTU``, ``SLTIU``
Shifts: ``SRA``, ``SRAI``, ``SRL``, ``SRLI``, ``SLL``, ``SLLI``
Memory: ``LW``, ``SW``, ``LB``, ``SB``
PC: ``LUI``, ``AUIPC``
Jumps: ``JAL``, ``JALR``
Branches: ``BEQ``, ``BNE``, ``BLT``, ``BGE``, ``BLTU``, ``BGEU``
È importante sapere che queste **non sono tutte le operazioni del linguaggio RISC-V**.

<h6 class="no_toc">Un programma RISC-V</h6>
Il seguente programma calcola la somma 1 + 2 + 3 + ... + 7 e mette il risultato nella cella di memoria di indirizzo 0.

    ADDI x11, x0, 0
    ADDI x10, x0, 7
    .loop:
    ADD x11, x11, x10
    ADDI x10, x10, -1
    BNE x10, x0, .loop
    SW x11, 0(zero)

Vediamo cosa fa ogni singola istruzione del programma.

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-pencil-square"></i> Esercizio</h5>
Scrivere un programma che fa la somma dei primi n numeri leggendo n dalla cella 0 della memoria e che mette il risultato nella cella 1 della memoria.
</div>

### Istruzioni aritmetico-logiche
Le istruzioni aritmetico-logiche che consideriamo sono le seguenti.
* Addizione ``ADD`` e sottrazione ``SUB``
* Operazioni logiche ``AND``, ``OR`` e ``XOR``
* Shift aritmetico ``SRA``, shift logico sinistro ``SLL`` e shift logico destro ``SRL``

Ognuna di queste istruzione ha lo stesso formato (*R-type instructions*)

    OPER rd, rs1, rs2

* ``OPER`` è il codice dell'operazione (es. ``ADD``, ``AND``, ...);
* ``rd`` è il registro di destinazione, cioè il registro nel quale verrà scritto il risultato finale;
* ``rs1`` e ``rs2`` sono i registri sorgente dai quali vengono presi gli *operandi*.

Per ognuna delle operazioni aritmetico-logiche sopra elencate, esiste una versione *immediate* che, anziché avere il secondo registro sorgente ``rs2``, ha un valore numerico costante a 12 bit.

### Istruzioni Load e Store
Ogni programma utilizza la memoria RAM per depositare i risultati calcolati, per leggere input e per scrivere output, è quindi fondamentale che un linguaggio assembly contenga istruzione per la lettura e la scrittura della memoria. In RISC-V queste di istruzioni vengono dette **load** e **store**.

#### Indirizzamento della memoria

Le istruzioni load e store necessitano di una regola per indicare quale cella di memoria deve essere letta o scritta. La prima cosa che viene in mente è usare istruzioni in cui l'indirizzo viene dato direttamente come numero (es. ``1234`` per indicare la cella di memoria di indirizzo ``1234``). Istruzioni di questo tipo, però, permettono di indicare un numero di celle di memoria che è limitato dal numero di bit che si possono usare nell'istruzione per l'*immediate*. Ad esempio in una *I-instruction *in cui l'immediate è di 12 bit, si possono solo indicare solo le celle con indirizzo tra 0 e 4095, questo permetterebbe di scrivere programmi che usano al massimo 4 KByte di memoria dati, piuttosto limitato per qualsiasi programma oggi giorno.
Per poter usare più di 4096 celle di memoria, RISC-V utilizza la tecnica del <strong class="text-danger">registro base</strong>. In pratica l'indirizzo viene dato indicando un **indirizzo di base** su un registro e un **offset** numerico. Per esempio si può indicare un offset di 430 rispetto al registro base ``x11``. Se in ``x11``, per esempio, c'è il numero 8500, allora andremmo in questo modo ad utilizzare la cella 8500 + 430 = 8930. Come si vede è possibile in questo modo utilizzare memoria molto grandi, basta impostare il valore del registro base.

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-code"></i> Esempio</h5>

    ADDI x10, x0, 1
    SLLI x10, x10, 20
    ADDI x11, x0, 123
    SB x11, 2(x10)

Le prime due istruzioni fanno si che in x10 finisca il numero ``2^20 = 0x100000``, la terza istruzione mette il numero ``123`` (decimale) in x11 ed infine la quarta istruzione carica il contenuto di ``x11`` (che è ``123``) nella cella di indirizzo ``2 + x10``, siccome x10 contiene il numero ``0x100000`` (esadecimale), la cella che verrà scritta è quella di indirizzo ``0x100002`` (esadecimale). Siamo quindi riusciti a scrivere in una cella il cui indirizzo (circa un milione) è molto più grande del più grande immediate (circa ``4000``), questo non sarebbe stato possibile senza la tecnica del registro base.
</div>

### Istruzioni di branch e di salto
Non si potrebbero scrivere programmi interessanti in qualsiasi linguaggio di programmazione senza istruzioni di condizione come l'istruzione if o cicli come while. Lo stesso vale per programmi in linguaggio assembly in cui condizioni e cicli si fanno utilizzando istruzioni di salto. Queste istruzioni permettono di "saltare" ad una qualsiasi istruzione purché questa si possa identificare, per fare questo di usano delle etichette associate a quelle istruzioni che si vogliono raggiungere a seguito di un salto. Le etichette non sono altro che dei nomi che vengono date alle istruzioni, in pratica questi nomi indicano il numero dell'istruzione (indirizzo di memoria dove l'istruzione si trova), ovviamente le etichette sono più facili da ricordare dei numeri o degli indirizzi di memoria.

Le operazioni più importanti di salto sono quelle di salto condizionato cioè di salto nel caso in cui si verifica una certa condizione, in RISC-V queste istruzioni vengono anche chiamate istruzioni di branch. Tutti gli assembly contengono anche istruzioni si salto non condizionato che in RISC-V vengono chiamate jump.

Le istruzioni si salto condizionato in RISC-V sono
* ``BEQ`` **B**ranch in **EQ**ual
* ``BNE`` **B**ranch if **N**ot **E**qual
* ``BLT`` **B**ranch if **L**ess **T**han
* ``BGE`` **B**ranch if **G**reater than or **E**qual
* ``BLTU`` **B**ranch if **L**ess **T**han **U**nsigned
* ``BGEU`` **B**ranch if **G**reater than or **E**qual **U**nsigned

### Esempio

<div class="row">
<div class="col-6" markdown="1">
{% include_relative img/riscv_branch_example.html %}
</div>
<div class="col-6" markdown="1">
</div>
</div>