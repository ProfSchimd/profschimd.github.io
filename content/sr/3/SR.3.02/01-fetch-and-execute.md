---
title: Fetch and Execute
weight: 100
---

## Central Processing Unit (CPU)
La **CPU** (**Central Processing Unit** - *unità centrale di elaborazione*) rappresenta il "cervello" di un calcolatore ed esegue le **istruzioni** che compongono un *programma*. Tali istruzioni sono molto semplici ad esempio: 
* somma due numeri,
* salva un numero in memoria,
* leggi un carattere dalla tastiera.

L'insieme delle istruzioni che una CPU è in grado di eseguire si chiama **Instruction Set Architecture ISA** (ISA) (*repertorio di istruzioni*), tale insieme dipende dal come la CPU è organizzata internamente (**micro-architettura**). Ad esempio, se una CPU non ha un circuito per dividere due numeri, la CPU non ci sarà l'istruzione di divisione. In questo caso si dovrà scrivere una sequenza di istruzioni (un *algoritmo*) per fare la divisione usando solo operazioni presenti nell'ISA.

Anche se CPU diverse (es. Intel vs Apple Silicon) hanno micro-architetture diverse, tutte contengono tre componenti fondamentali:
1. Una spazio di memoria interno composto da **registri** (**register file**);
2. Una sparte che opera il **controllo** (**control**) della CPU;
3. Un componente per operazioni aritmetiche e logiche (**Arithmetic Logic Unit, ALU**).

Il controllo della CPU comanda tutti i circuiti interni per eseguire l'*istruzione corrente*. Il controllo comprende:
* un registro chiamato **Program Counter** (**PC**) che contiene *l'indirizzo di memoria delle prossima istruzione che la CPU deve eseguire*;
* un registro chiamato **Instruction Register** (**IR**) che contiene l'istruzione da *decodificare*;
* Un circuito di decodifica (**decode**) che configura i circuiti per l'esecuzione dell'istruzione presente nell'IR;
* Altri registri e circuiti per accedere alla memoria e all'I/O.

![Schema dell'organizzazione interna di una CPU single core](/img/sr/sr-cpu-internal.svg)

## Ciclo di funzionamento della CPU
Durante il suo funzionamento, la CPU esegue continuamente il ciclo di **fetch-and-execute** (*recupera ed esegui*). Questo ciclo prevede le seguenti operazioni
1. Recupera (*fetch*) il codice della prossima istruzione da eseguire
2. Decodifica (*decode*) il codice recuperato per determinare quale operazione eseguire
3. Recupera gli operandi (*operand fetch*) se questi sono necessari per l'esecuzione dell'istruzione
4. Esegue (*execute*) l'istruzione decodificata nel passaggio 2
5. Scrive (*write*) il risultato dell'operazione se richiesto dall'istruzione

Possiamo rappresentare questo ciclo di funzionamento utilizzando un *automa a stati finiti* dove ciascuno stato rappresenta una delle fasi di esecuzioni dell'istruzione. Una *transizione* da uno stato ad un altro esiste se, durante l'esecuzione, si passa direttamente da una fase ad un altra.

![Schema del controllo finito della CPU](/img/sr/sr-cpu-finite-control.svg)

Nello schema è stato evidenziato in blu lo stat *instruction fetch* che rappresenta l'inizio dell'esecuzione di una istruzione.
> [!tip] Osserva
>
> Lo schema sopra permette che un'istruzione possa essere eseguita anche saltando la fase *operand fetch* e/o saltando la fase *write*. Notiamo anche che le fasi *instruction fetch*, *decode* e *execute* non possono essere saltate.


Vediamo più in dettaglio come la CPU esegue il *fetch-and-execute* attivando opportunamente i componenti che sono stati descritti sopra. Negli esempi si userà istruzione assembly 
```asm
add R1, [0x3D] # Somma a R1 il valore in MEM[0x3D] scrivendo il risultato in R1
```
presa da un'ISA inventata che svolge la seguente operazione:

> somma il valore nel registro `R1` al valore nella cella di memoria di indirizzo `0x3D` e metti il risultato di questa somma nel registro `R1`.

> [!warning] Attenzione
>
> Ricordiamo che `0x3D` è un numero *esadecimale* corrispondete al numero decimale `61`. Il prefisso `0x` si usa in molti linguaggio per indicare un numeri esadecimali (*hex*). Ad esempio 
> ```java
> int a = 100;
> int b = 0x100;
> System.out.println(a + " " + b); // stampa "100 256"
> ```

### Fetch dell'istruzione
Per eseguire le istruzioni, la CPU esegue le deve prima recuperare della memoria centrale (la RAM) dove si trovano. Per fare questo, la CPU utilizza due registri:
* il **Program Counter, PC**  (*contatore di programma*) e
* l'**Instruction Register** (*registro di istruzione*).

Inoltre, dovendo accedere alla memoria, la CPU utilizza anche i registri `MAR` ed `MDR` che servono per la comunicazione con la memoria.

Il *fetch* delle istruzioni si compone delle seguenti fasi.
1. Il valore che è nel `PC` viene copiato nel `MAR` e si attiva la linea `Read` del bus controllo.
2. Il valore richiesto passa dalla RAM legge al bus dati e poi nel `MDR`.
3. Il valore nel `MDR` viene copiato nell'`IR`.
4. Il valore del PC viene incrementato in modo che sia pronto per la prossima istruzione (per ISA a 64 bit l'incremento è di 8).

> [!note] Parola di memoria e program counter
>
> Tra le altre cose, la *parola di memoria* indica di quanto deve essere incrementato il `PC`. Dal momento che questo registro indica il *byte* della memoria dove inizia la prossima istruzione da eseguire, per aggiornarlo alla prossima istruzione dobbiamo incrementarlo di tanti bye quanto è grande un'istruzione. Dal momento che un'istruzione è grande quanto la parola di memoria, il `PC` viene incrementato di tanti byte quanto è grande la parola di memoria. Per un'architettura a 64 bit la parola di memoria è di 8 byte, per un'architettura a 32 bit la parola di memoria è di 4 byte.

#### Esempio di fetch
Il `PC` contiene l'indirizzo `OxA0` che arriva alla RAM attraverso il `MAR` ed il bus indirizzi (passo 1 del *fetch*). La RAM recupera il valore (in questo caso `0x04`) che viene copiato nel `MDR` (passo 2 del *fetch*). A questo punto il valore dal `MDR` viene copiato nell'IR (passo 3 del *fetch*) ed il PC viene incrementato (di 4 nella figura) per il *fetch* della prossima istruzione (passo 4 del *fetch*).

![La fase di fetch durante l'esecuzione di un'istruzione.](/img/sr/sr-cpu-internal-fetch.svg)

### Decodifica dell'istruzione
Dal momento che una CPU può eseguire diversi tipi di istruzione (somma, sottrazione, ...), è necessario "decidere" quale operazione eseguire in base all'istruzione recuperata nel *fetch*. 
La **decodifica** delle istruzioni si compone delle seguenti fasi.
1. Il valore presente nell'`IR` viene elaborato dal circuito di decodifica.
2. Il circuito di decodifica identifica l'operazione da eseguire.
3. Se necessario, attiva i circuiti per il recupero degli operandi dalla memoria.
4. Se necessario, attiva i registri (dal *register file*) coinvolti nell'istruzione.
5. Se necessario, attiva i circuiti della ALU per eseguire l'operazione *codificata* nell'istruzione.

#### Esempio di decodifica
Il circuito di Decode riceve l'istruzione dall'`IR` (passo 1 del *decode*) e lo traduce in un'istruzione (passo 2 del *decode*). Nell'esempio sotto l'istruzione aggiunge (`add`) al valore DI `R1` il valore della cella di memoria di indirizzo `0x3D` (nella pratica il codice per una tale istruzione sarebbe molto più lungo di 0x04). Dovendo recuperare *operandi* dalla memoria, viene messo nel `MAR` l'indirizzo `0x3D` ed attivata la linea `Read` del bus controllo (passo 3 del *decode*). Sempre vedendo l'istruzione, la CPU sa che deve portare verso la ALU (dove verrà fatta l'addizione) il valore presente nel registro `R1` (passo 4 del *decode*); infine la CPU attiva il circuito dell'ALU per l'addizione (passo 5 del *decode*). A questo punto manca il valore proveniente dalla memoria che però viene recuperato nella successiva fase di *fetch degli operandi*.

![La fase di decode durante l'esecuzione di un'istruzione.](/img/sr/sr-cpu-internal-decode.svg)

### Fetch degli operandi
Molte istruzioni hanno bisogno di **operandi** di input, ad esempio per sommare due numeri abbiamo bisogno proprio di questi numeri da sommare (gli *addendi*). Questi operandi possono trovarsi nei registri oppure nella memoria. L'operazione (che non è sempre necessaria) di recupero degli operandi dalla memoria, prende il nome di *fetch degli operandi* ed avviene utilizzando i meccanismi di accesso alla RAM ed i registri `MAR` e `MDR`. È importante notare che questa operazione potrebbe non essere necessaria, ad esempio quando gli operandi si trovano già nei registri non serve andarli a prendere dalla RAM.
Il *fetch* degli operandi si compone delle seguenti fasi (le prime due fasi sono già state svolte durante il decode).
1. L'indirizzo da dove prendere il primo operando viene messo nel `MAR`.
2. Viene attivata la linea `Read` del bus controllo.
3. Si attende che il dato arrivi al'`MDR`.
4. Il valore nel `MDR` viene copiato nel registro di destinazione o all'ingresso della ALU.

Se un secondo operando va recuperato dalla memoria, si eseguono di nuovo le operazioni da 1.

#### Esempio di operand fetch
Nel `MAR` viene scritto l'indirizzo della cella di memoria da cui va prelevato l'operando (passo 1 dell'*operand fetch*), nell'esempio sotto questo è `0x3D`, contemporaneamente si attiva la linea `Read` (passo 2 dell'*operand fetch*) del bus controllo. Dopo le operazioni di accesso alla RAM, nell'MDR (attraverso il bus dati), si trova il valore che è presente nella cella di memoria selezionata (passo 3 dell'*operand fetch*). Nell'esempio, questo valore è `0x5E`. Spesso, prima che il valore possa andare all'ALU, deve essere copiato in un registro. Nell'esempio si indica il registro `RT` (registro temporaneo) come il registro dove l'operando viene depositato prima di andare all'ALU (passo 4 dell'*operand fetch*). A questo punto tutti gli operandi sono pronti e la CPU può procedere con l'*execute* dell'istruzione.

![La fase di fetch operandi durante l'esecuzione di un'istruzione.](/img/sr/sr-cpu-internal-operands.svg)

### Esecuzione dell'istruzione
Una volta che la CPU ha decodificato l'istruzione presa dalla memoria, il suo compito è quello di eseguirla. Ad esempio, se si tratta di un'istruzione di somma, la CPU utilizzerà il suo circuito di somma. I circuiti per eseguire le operazioni aritmetiche (somma, sottrazione, ...) e logiche (and, or, ...) si trovano nel blocco **ALU** (*Arithmetic Logic Unit*) della CPU. Notiamo che alcune operazione potrebbero non richiedere l'utilizzo della ALU, ad esempio le istruzioni che copiano dalla memoria ai registri o viceversa.

L'esecuzione dell'istruzione si compone dei seguenti passi.
1. Per istruzioni che usano la ALU, si attende che il risultato sia calcolato.
2. Una volta pronto, il risultato viene scritto nel registro indicato dall'istruzione (alcune CPU usano un *registro di default* chiamato *registro accumulatore*).
3. Per operazione di lettura e scrittura dalla memoria, l'esecuzione non fa nessuna operazione (la lettura avviene con il *fetch* degli operandi, la scrittura avviene nell'ultima fase).
4. Per operazioni di **salto** l'esecuzione cambia il valore del program counter.


#### Esempio di execute
Nell'esempio sotto, la fase di *execute* esegue la somma degli operandi (passo 1 dell'*execute*). Il risultato viene depositato nel registro di destinazione (passo 2 dell'*execute*) che nell'esempio è il registro `R1`. In alcuni processori, il risultato viene sempre messo su un registro prestabilito che viene chiamato *registro accumulatore*.

![La fase di execute durante l'esecuzione di un'istruzione.](/img/sr/sr-cpu-internal-execute.svg)

### Scrittura del risultato
Per le operazioni che producono un risultato, ad esempio la somma di due numeri, potrebbe essere necessaria la scrittura in RAM, questo avviene nella fase di *write*. In questa fase, la CPU utilizza i registri `MAR` e `MDR` per spostare il risultato dal registro dove lo ha messo la ALU alla memoria. Questa operazione potrebbe non essere necessario, ad esempio se si sommano due registri mettendo il risultato ancora nei registri.

La scrittura del risultato si compone delle seguente fasi.
1. Se il risultato deve essere scritto in memoria, l'indirizzo della RAM viene scritto nel `MAR`.
2. Il risultato (scritto in un registro nella fase di *execute*) viene messo nel `MDR`.
3. Si attiva la linea `Write` del bus controllo.

#### Esempio di scrittura del risultato
Alcune operazioni richiedono che il valore presente in un registro venga memorizzato nella RAM. Per prima cosa il circuito di decodifica imposta nel `MAR` l'indirizzo della cella di memoria dove scrivere il risultato (passo 1 della fase di scrittura). Poi il valore da scrivere viene copiato dal registro in cui si trova (`R1` nell'esempio) all'`MDR` (passo 2 della fase di scrittura). Solo dopo queste operazioni, si attiva la linea `Write` del bus di controllo (passo 3 della fase di scrittura).

![La fase di write durante l'esecuzione di un'istruzione.](/img/sr/sr-cpu-internal-write.svg)
