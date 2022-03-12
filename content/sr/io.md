---
title: Gestione dell'I/O
layout: page
materia: sr
align: justify
---

Per completare la descrizione del funzionamento delle [architetture di von Neumann](/content/sr/sisema_elaborazione.html),
è necessario parlare della gestione dell'**input** e e dell'**output**, comunemente indicato **I/O**.

Numero e tipo di dispositivi di I/O oggi utilizzati è estremamente elevato; alcuni comuni esempi sono:

* Dischi rigidi o memoria SSD
* GPU
* Tastiera, Mouse, Trackpad, Touchscreen, ...
* Schermo/i
* Memorie esterne (USB Pendrive, SD cards, ...)
* Dispositivi di rete (WiFi, Bluetooth, cellulare, ...)
* Stampanti, Scanner, ...
* ...

Secondo l'architettura di von Neumann, tutti i dispositivi di I/O
sono connessi al *bus di sistema*; solitamente questo collegamento
avviene mediante un **controller** che si occupa di gestire il bus
e i vari dispositivi connessi (es. controller USB).

La figura sotto mostra che in un'architettura moderna esistono diversi
tipi di dispositivi di I/O e, di conseguenza, diversi ti di *controller*.
Spesso questi controller corrispondono ad una o più porte fisiche presenti
sulla scheda madre (PCIe, SATA, USB, ...)

{% include_relative img/bus_io_devices.html %}

La lista di dispositivi presentata sopra, seppure incompleta, mostra
la necessità di un meccanismo di *identificazione dei dispositivi di
I/O*, questo meccanismo avviene attraverso il concetto di **porta di
I/O**.  Ogni porta è numerata 0,1,2,... e per accedere ad un
dispositivo, è necessario conoscere la porta alla quale è connesso
(a volte chiamata anche *indirizzo di I/O*).

## I/O mediante interrupt
Durante la propria esecuzione la CPU può essere interrotta mediante un meccanismo noto com
[*interrupt*](/content/sr/interrupt.html). Questi interrupt vengono spesso usati dal sistema
operativo per permettere a tutti i processi di andare a turno in esecuzione, ma è possibile
usarlo anche per la gestione dell'hardware. L'idea è molto semplice: quando un hardware (ad
esempio la tastiera) ha ricevuto dell'input e vuole *notificare* la CPU di questo, genera un
interrupt che avvisa la CPU dell'avvenuto *evento hardware*.

### Funzionamento dell'I/O mediante interrupt
Vediamo schematicamente come avvengono input e output utilizzando il meccanismo di
interrupt.

Input
1. Il dispositivo di input ha un nuovo dato da far arrivare alla CPU
2. Il dispositivo deposita il dato in un proprio registro d'appoggio
3. Il dispositivo attiva la linea ``IRQ`` (Interrupt ReQuest) ed attende l'ok dell CPU
4. Ricevuto l'ok, il dispositivo invia sul bus dati il contenuto del registro d'appoggio
5. La CPU copia in un proprio registro d'appoggio il contenuto del bus dati
6. Appena possibile, il contenuto del registro d'appoggio viene elaborato dalla CPU

Output
1. La CPU ha un nuovo dato da inviare al dispositivo di output
2. La CPU deposita il dato una un proprio registro d'appoggio
3. La CPU attiva la linea ``IRQ`` (Interrupt ReQuest) ed attende l'ok del dispositivo
4. Ricevuto l'ok, la CPU invia sul bus dati il contenuto del registro d'appoggio
5. Il dispositivo copia in un proprio registro d'appoggio il contenuto del bus dati
6. Appena possibile, il contenuto del registro d'appoggio viene *emesso* in output


## I/O mappato in memoria
L'I/O mediante interrupt ha un principale svantaggio: ogni volta che un qualsiasi hardware
ha dei dati pronti, interrompe la CPU. Si capisce che ben presto la CPU si troverà interrotta
costantemente e sarà costretta a spendere la maggior parte del suo tempo a gestire questi
interrupt. Di conseguenza di programmi che necessitano della CPU saranno rallentati e le
performance dell'intero sistema caleranno drasticamente.

Per evitare questo problema si può essere un meccanismo di I/O basato sulla mappatura in
memoria dell'I/O: *memory mapped I/O*. L'idea è molto semplice e consiste nel trasferire
in memoria l'input proveniente dal dispositivo o l'output diretto ad un dispositivo ad un
indirizzo di memoria specifico. In questo modo non è il più il processore che si occupa
dell'I/O bensì un **I/O controller** al quale, tuttavia, deve essere concesso di scrivere
in memoria, ad esempio avendo accesso al *bus di sistema*.

### Funzionamento dell'I/O mappato in memoria

Input
1. Il dispositivo di input ha nuovi dati in ingresso
2. Il dispositivo richiede l'accesso al bus
3. Il *bus arbiter* consente al dispositivo di utilizzare il bus
4. Il dispositivo, attraverso il bus, memorizza in una zona prestabilita della memoria i dati
5. Il dispositivo *notifica* la CPU che ci sono nuovi dati di input in memoria
6. La CPU preleva i nuovi dati

Output
1. La CPU deve scrivere dei dati sul dispositivo di output
2. La CPU richiede l'accesso al bus
3. Il *bus arbiter* consente alla CPU di utilizzare il bus
4. La CPU, attraverso il bus, memorizza in una zona prestabilita della memoria i dati
5. La CPU *notifica* il dispositivo che ci sono nuovi dati di output in memoria
6. Il dispositivo manda in output i dati

Questo tipo di I/O si definisce *mappato in memoria* proprio perché i dati (di input o
di output) passano attraverso la memoria prima essere letti dalla CPU o scritti in output.
Alcuni dei vantaggi dell'I/O mappato in memoria sono
* La CPU può continuare a fare le proprie operazione anche durante l'input o l'output da e
verso il dispositivo. Questo è importante perché la CPU può essere milioni di volte più
veloce del dispositivo (ad esempio un disco rigido).
* La CPU può generare dati di output più veloce di quanto non sia in grado di scriverli il
dispositivo di output. I dati che sono stati generati dalla CPU, ma non ancora scritti
(proprio perché il dispositivo è lento) possono rimanere temporaneamente nella memoria.
* Il Bus può essere utilizzato in modo più efficiente, ad esempio quando la CPU non ne
ha bisogno per accedere alla memoria, i dispositivi di I/O possono usarlo per le operazioni
di input e output.
* Se per qualche motivo il dispositivo di I/O è occupato con altre operazioni (esempio
altre operazioni di I/O), la CPU non deve aspettare che questo si liberi per poi leggere
o scrivere i dati (questo è vero soprattutto per le operazioni di scrittura).

### Confronto tra Interrupt e DMA

Nell'immagine sotto vediamo uno schema per meglio capire come il meccanismo di DMA utilizza
meglio la CPU rispetto all'I/O basato su interrupt. Nello schema si vedono le quattro
componenti principali dei sistema di von Neumann (CPU, memoria, bus e I/O) ed il loro
utilizzo (blu sta facendo lavoro, rosso sta aspettando senza fare nulla).

{% include_relative img/io_interrupt_vs_dma.html %}

In alto vediamo il caso di I/O con interrupt durante il quale la CPU viene interrotta per
portare a termine l'operazione di I/O. Durante questa operazione (che **non** passa
attraverso la memoria, che infatti è in attesa) la CPU non può fare nulla se non mandare
informazioni all'I/O mediante il bus.

La parte inferiore dello schema mostra la stessa operazione con il sistema di DMA.
Inizialmente la CPU deposita in memoria i dati da mandare in output. Durante questa
operazione la CPU non può fare altro, ma questo tempo di *idle* è molto più corto del
caso precedente poiché scrivere sulla memoria è molto più veloce che scrivere su un
dispositivo di output. Non appena questa operazione termina, la CPU può subito riprendere
il *fetch-and-execute* "normale" mentre sarà il dispositivo di I/O che preleverà i dati
dalla memoria senza rallentare le operazioni della CPU.

Tra le due situazioni, la grossa differenza sta nel "segmento rosso" della CPU (tempo in
cui la CPU non può fare nulla, se non aspettare che termini le operazioni sul bus). Nel
caso di DMA si noti come questo segmento sia più piccolo indicando che la CPU spende più
tempo a fare "operazioni utili" aumentando l'efficienza del suo utilizzo.

### Arbitraggio del bus di sistema
Dato che CPU e I/O controller usano lo stesso bus, è necessario un meccanismo di
sincronizzazione, detto **arbitraggio**. Lo scopo è di evitare che CPU e I/O
utilizzino il bus contemporaneamente, se ciò accadesse i due interferirebbero 
e nessuno riuscirebbe ad effettuare una comunicazione sul bus.

I metodi di sincronizzazione del bus possono essere suddivisi in due categorie:

1. **bus sincrono** (*synchronous bus*) in cui gli accessi sono eseguite
seguendo gli *eventi* scanditi da un [clock](clock.html) e
2. **bus asincrono** (*asynchronous bus*) in cui gli accessi avvengono mediante
sincronizzazioni che non coinvolgono alcun clock.

Inoltre è possibile suddividere i metodi di sincronizzazione in due altre
categorie.

1. **arbitraggio centralizzato** in cui un hardware apposito (solitamente nel
*chipset* della scheda madre) si occupa di coordinare l'accesso al bus dei vari
dispositivi connessi.
2. **arbitraggio distribuito** in cui i vari dispositivi connessi al bus si
"auto-coordinano" per accedere a turno al bus.

#### Esempio di arbitraggio: *daisy chain*
Ci sono diverse tecniche di arbitraggio del bus delle quali ne vediamo una semplice
nota come *daisy chain*. In questa tecnica tutti i dispositivi (*controller*) che
possono accedere al bus possono usarlo "a turno". In altre parole se i controller
connessi al bus sono numerati da ``0`` a ``n-1``, ci sarà uno *slot* di tempo in cui
il dispositivo ``0`` può accedere al bus, poi il dispositivo ``1``, poi ``2`` e così
fino a ``n-1`` dopo il quale il turno passa nuovamente a ``0``.

Questa tecnica molto semplice, tuttavia presenta diversi problemi. Uno è quello che
la CPU che accederà spesso al bus rischia di dover aspettare che finisca un intero
giro prima di poter accedervi. Un secondo problema è che il tempo viene allocato ad
ogni singolo controller anche se questo non ha niente da fare con il bus. In questo
caso sarebbe potuto essere più conveniente lasciare il turno ad altri dispositivi che
effettivamente necessitano del bus.

## Gestione dell'I/O nelle architetture moderne
L'architettura di von Neumann, proposta agli albori dell'informatica, è un
valido strumento didattico, ma è oggi superata da architetture più *moderne*.
Facendo riferimento alla figura sotto (fonte Wikipedia), discutiamo ora in
breve il funzionamento basata sulla presenza di un **chipset** (parte
installato nella scheda madre e parte nel processore) che si occupa di gestire
l'accesso ai vari bus presenti in un'architettura moderna.

<div class="row">
<div class="col-6" markdown="1">
![North e south bridge](https://upload.wikimedia.org/wikipedia/commons/b/bd/Motherboard_diagram.svg)
</div>
<div class="col-6" markdown="1">

La prima fondamentale differenza tra l'architettura della figura a fianco e
l'architettura di von Neumann è la presenza di più di un bus e di due componenti
(oltre alla CPU) che sono a loro volta connessi a vari bus. Questi due componenti sono:
* **Northbridge** collegato al **Front Side Bus (FSB)** utilizzato per connettere
la CPU con memoria centrale e con i dispositivi ad alta velocità collegati al *bus
PCI Express (PCIe)*.
* **Southbridge** collegato al Northbridge mediante l'**Internal Bus (IB)** e dal quale
si diramano diversi altri bus:
    * *PCI Bus* al quale sono collegate le varie periferiche di espansione
    * *Low Pin Count (LPC) Bus* a cui sono collegati dispositivi relativamente lenti:
    tastiera PS/2, Bios ROM, floppy disk, ...
    * *Serial ATA (SATA) Bus* a cui sono collegati dischi e SSD
    * USB, Rete, ...

La presenza di una divisione tra il FSB, direttamente collegato alla CPU e i bus a più
bassa velocità aveva, agli inizi degli anni 2000, permesso di rendere molto più efficiente
la gestione dell'I/O. Con il tempo, tuttavia, anche i dispositivi a "bassa velocità" hanno
iniziato ad essere sempre più efficiente (si pensi, ad esempio, al passaggio da disco rigido
ad SSD) e un chip esterno (il northbridge) non è più stato in grado di gestire in modo
efficiente le comunicazioni tra alcuni dispositivi e la CPU. Per questo motivo le funzioni
del northbridge sono state spostate nello stesso chip della CPU grazie anche all'aumento del
numero di transistor che possono essere inseriti in un singolo chip. Oggi, quindi, la divisione
tra northbridge e southbridge è più logica che fisica anche se il southbridge rimane un chip
distinto dalla CPU (cosa non vera per il northbridge). In ogni caso è rimasta la separazione
tra il front side bus a cui la CPU è direttamente collegata e l'internal bus a cui sono
collegati i dispositivi di I/O più lenti.
</div>
</div>