---
title: Central Processing Unit (CPU)
running_title: CPU
type: lecture
weight: 200
summary: "La CPU è il centro operativo di un sistema di elaborazione dati, essa permette di fare operazioni semplici, ma in modo veloce. Capire come funziona la CPU è fondamentale per scrivere programmi che siano efficienti."
---

## Central Processing Unit (CPU)
La **CPU** (**Central Processing Unit** - *unità centrale di elaborazione*) rappresenta il "cervello" di un calcolatore ed esegue le **istruzioni** che compongono un *programma*. Tali istruzioni sono molto semplice: somma due numeri, memorizza un numero in memoria, leggi un carattere dalla tastiera, ... 

L'insieme delle istruzioni che una CPU è in grado di eseguire si chiama **Instruction Set Architecture ISA** e dipende dal modo in cui la CPU è organizzata internamente. Ad esempio, se una CPU non ha un circuito per dividere due numeri, la CPU non sarà in grado di fare le divisioni in un'unica operazione. Sarà quindi necessario scrivere una sequenza di istruzioni (un *algoritmo*) per la divisione utilizzando solo operazioni di cui la CPU dispone.

Anche se CPU diverse (es. Intel vs AMD) hanno modi diversi di eseguire le istruzioni, tutte le CPU contengono tre componenti fondamentali:
1. Una spazio di memorizzazione rappresentato da una serie di registri (**register file**);
2. Una serie di componenti che fungono da controllo (**control**) della CPU;
3. Un componente per operazioni aritmetiche e logiche (**Arithmetic Logic Unit, ALU**).

Il controllo della CPU comanda tutti i circuiti interni affinché venga eseguita l'istruzione corrente, fanno parte del controllo:
* Un registro chiamato **Program Counter** (**PC**) che contiene *l'indirizzo di memoria delle prossima istruzione che la CPU deve eseguire*'
* Un registro chiamato **Instruction Register** (**IR**) che contiene l'istruzione da eseguire;
* Un circuito di decodifica (**decode**) che configura i circuiti per l'esecuzione dell'istruzione presente nell'IR;
* Altri registri e circuiti per [accedere alla memoria]({{<ref "01-ram" >}}) e all'I/O.

Nella figura sotto, si vede uno schema semplificato di CPU contenente contenente le varie parti descritte sopra.
{{<include "img/cpu_schema.html" >}}

## Ciclo di funzionamento della CPU
Durante tutto il suo funzionamento, la CPU esegue continuamente il ciclo di **fetch-and-execute** (*recupera ed esegui*). Questo ciclo prevede le seguenti operazioni
1. Recupera (*fetch*) il codice della prossima istruzione da eseguire
2. Decodifica (*decode*) il codice recuperato per determinare quale operazione eseguire
3. Recupera gli operandi (*operand fetch*) se questi sono indispensabili per eseguire l'istruzione
4. Esegue (*execute*) l'istruzione decodificata nel passaggio 2
5. Scrive (*write*) il risultato dell'operazione se richiesto dall'istruzione

Vediamo ora in dettaglio come queste operazioni vengono eseguite da una CPU utilizzando le componenti descritte nella figura sopra. Negli esempi utilizzati per descrivere queste operazione si userà l'istruzione assembly
    add R1, [0x3D]
che significa *somma il valore nel registro R1 con il valore nella cella di memoria di indirizzo 0x3D e metti il risultato di questa somma nel registro R1*.

### Fetch dell'istruzione
Le istruzioni che la CPU esegue si trovano tutte nella memoria centrale (la RAM), la CPU deve recuperarle prima di poterle eseguire. Per fare questo, la CPU utilizza due registri importanti: il **Program Counter, PC**  (*contatore di programma*) e l'**Instruction Register** (*registro delle istruzioni*). Inoltre, dovendo accedere alla memoria, la CPU utilizza anche i registri ``MAR`` ed ``MDR`` il cui funzionamento è spiegato in [questa pagina](ram.html).
Il *fetch* delle istruzioni si compone delle seguenti fasi.
1. Il valore che è nel ``PC`` viene copiato nel ``MAR`` e si attiva la linea Read del bus di controllo.
2. Il valore che la RAM legge finisce nel bus dati prima e nell'``MDR`` poi.
3. Il valore dell'``MDR`` viene copiato nell'``IR``.
4. Il valore del PC viene incrementato di uno in modo che sia pronto per la prossima istruzione.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/cpu_fetch_esempio.html">}}
#### Esempio di fetch
Il ``PC`` contiene l'indirizzo ``OxA1`` (esadecimale) e questo viene portato alla RAM attraverso il ``MAR`` ed il bus indirizzi (passo 1 del *fetch*). La RAM recupera il valore (in questo caso ``0x04``) che viene copiato nell'``MDR`` (passo 2 del *fetch*). A questo punto il valore dal ``MDR`` viene copiato nell'IR (passo 3 del *fetch*) ed il PC viene incrementato di 1 (passo 4 del *fetch*) diventando così ``0xA2``.
{{</column/two-cols>}}

### Decodifica dell'istruzione
Dal momento che una CPU può eseguire diversi tipi di istruzione (somma, sottrazione, ...), è necessaria che la CPU sia in grado di "decidere" quale operazione eseguire in base all'informazione che è stata recuperata dalla RAM durante la precedente fase di *fetch*. 
La decodifica delle istruzioni si compone delle seguenti fasi.
1. Il valore dell'IR viene elaborato dal circuito di decodifica.
2. Il circuito di decodifica decide, guardando l'istruzione, quale operazione eseguire.
3. Se necessario, attiva i circuiti per il recupero degli operandi dalla memoria.
4. Se necessario, attiva i registri coinvolti nell'istruzione.
5. Se necessario, attiva i circuiti della ALU per eseguire l'operazione richiesta dall'istruzione.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/cpu_decode_esempio.html">}}
#### Esempio di decodifica
Il circuito di Decode riceve l'istruzione dall'``IR`` (passo 1 del *decode*) e lo traduce in un'istruzione (passo 2 del *decode*). Nell'esempio a sinistra l'istruzione dice di aggiungere (``add``) al valore del registro ``R1`` il valore della cella di memoria di indirizzo ``0x3D`` (nella pratica il codice per una tale istruzione sarebbe molto più lungo di 0x04). Dovendo recuperare dati dalla memoria, viene messo nel ``MAR`` l'indirizzo ``0x3D`` ed attivata la linea Read del bus di controllo (passo 3 del *decode*). Sempre vedendo l'istruzione, la CPU sa che deve portare verso la ALU (dove verrà fatta l'addizione) il valore che è memorizzato nel registro ``R1`` (passo 4 del *decode*) ed infine attiva il circuito dell'ALU che fa l'addizione (passo 5 del *decode*). A questo punto manca il valore proveniente dalla memoria che però viene recuperato nella successiva fase di *fetch degli operandi*.
{{</column/two-cols>}}

### Fetch degli operandi
Molte istruzioni hanno bisogno di **operandi** di input, ad esempio per sommare due numeri abbiamo bisogno proprio di questi numeri da sommare (gli *addendi*). Questi operandi possono trovarsi sui registri, ma è anche possibile che si debba andarli a prendere nella memoria centrale. Questa operazione (che non è sempre necessaria) prende il nome di *fetch degli operandi* ed avviene utilizzando i meccanismi di accesso alla RAM ed i registri ``MAR`` e ``MDR``. È importante notare che questa operazione potrebbe non essere necessaria, ad esempio quando gli operandi si trovano già nei registri non serve andarli a prendere dalla RAM.
Il *fetch* degli operandi si compone delle seguenti fasi.
1. L'indirizzo da dove prendere il primo operando viene messo nel ``MAR``.
2. La linea ``Read`` del bus controllo viene attivata.
3. Si attende che l'operando arrivi dalla RAM al'``MDR``.
4. Il valore del ``MDR`` viene copiato nel registro di destinazione.
Se un secondo operando va recuperato dalla memoria, si eseguono di nuovo le operazioni da 1.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/cpu_operands_esempio.html">}}
#### Esempio di operand fetch
Nel MAR viene messo l'indirizzo della cella di memoria da cui va prelevato l'operando (passo 1 dell'*operand fetch*), nell'esempio a sinistra questo è l'indirizzo ``0x3D``, contemporaneamente si attiva la linea Read (pass 2 dell'*operand fetch*) del bus di controllo. Dopo le [operazioni di accesso alla RAM](ram.html), nell'MDR (attraverso il bus dati), si trova il valore che è presente nella cella di memoria selezionata (passo 3 dell'*operand fetch*). Nell'esempio, questo valore è ``0x5E``. Molto spesso (ma dipende dal processore specifico), prima che il valore possa andare all'ALU deve essere copiato in un registro. Nell'esempio si indica il registro ``RT`` (T sta per temporaneo) come il registro dove l'operando viene depositato prima di andare all'ALU (passo 4 dell'*operand fetch*). A questo punto tutti gli operandi sono pronti e la CPU può procedere con l'execute dell'istruzione (passo 5 dell'*operand fetch*).
{{</column/two-cols>}}

### Esecuzione dell'istruzione
Una volta che la CPU ha decodificato l'istruzione presa dalla memoria, il suo compito è quello di eseguirla. Ad esempio, se si tratta di un'istruzione di somma, la CPU utilizzerà il suo circuito di somma. I circuiti per eseguire le operazioni aritmetiche (somma, sottrazione, ...) e logiche (and, or, ...) si trovano nel blocco **ALU** (*Arithmetic Logic Unit*) della CPU. È importante notare che questa operazione potrebbe non essere richiesta, ad esempio le istruzioni che copiano dalla memoria ai registri o viceversa, non hanno bisogno di utilizzare la ALU.

L'esecuzione dell'istruzione si compone dei seguenti passi.
1. Per operazioni che utilizzando l'ALU si attende che il risultato sia pronto.
2. Una volta che il risultato viene calcolato, esso viene scritto nel registro scelto dall'istruzione (alcuni processori usano sempre lo stesso registro per il risultato, questo viene chiamato *registro accumulatore*).
3. Per operazione lettura e scrittura l'esecuzione non fa nessuna operazione (la lettura avviene con il fetch degli operandi, la scrittura avviene nell'ultima fase)
4. Per operazioni di **salto** l'esecuzione cambia il valore del program counter.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/cpu_execute_esempio.html">}}
#### Esempio di execute
Nell'esempio a sinistra, la fase di *execute* dell'istruzione è la semplice somma degli operandi che viene eseguita dall'ALU (passo 1 dell'*execute*). Una volta eseguita tale somma il risultato viene depositato nel registro di destinazione (passo 2 dell'*execute*) che nell'esempio è il registro ``R1``. In alcuni processori, il risultato viene sempre messo su un registro prestabilito che viene chiamato *registro accumulatore*.
{{</column/two-cols>}}

### Scrittura del risultato
Alcune operazioni, specialmente quelle eseguite dalla ALU, producono un risultato. Ad esempio la somma di due numeri è il risultato dell'operazione di somma. L'ALU termina sempre le proprie operazioni mettono in un registro della CPU il risultato che ha calcolato, ma in certi casi l'istruzione prevede che questo risultato sia memorizzato in una quelle cella della memoria RAM. In questa fase, la CPU utilizza i registri ``MAR`` e ``MDR`` per spostare il risultato dal registro dove lo ha messo la ALU alla cella di memoria desiderata. È importante notare che questa operazione può non essere richiesta se, ad esempio, non si vuole che il risultato venga messo nella RAM.

La scrittura del risultato si compone delle seguente fasi.
1. Se il risultato deve essere scritto in memoria, l'indirizzo della RAM viene scritto nel ``MAR``.
2. Il risultato (che è stato messo in un registro alla fine dell'*execute*) viene messo nell'``MDR``.
3. Si attiva la linea ``Write`` del bus controllo.

{{<column/two-cols wl="6" wr="6" content="left" embed="img/cpu_write_esempio.html">}}
#### Esempio di scrittura del risultato
Alcune operazioni richiedono che il valore presente in un registro venga memorizzato nella RAM. Per prima cosa il circuito di decodifica imposta nel ``MAR`` l'indirizzo della cella di memoria dove scrivere il risultato (passo 1 della fase di scrittura). Poi il valore da scrivere viene copiato dal registro in cui si trova (``R1`` nell'esempio) all'``MDR`` (passo 2 della fase di scrittura). Solo dopo queste operazioni si attiva la linea ``Write`` del bus di controllo (passo 3 della fase di scrittura).
{{</column/two-cols>}}