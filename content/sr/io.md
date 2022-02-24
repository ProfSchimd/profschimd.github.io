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

Questa lista, seppure incompleta, mostra la necessità di un meccanismo
di *identificazione dei dispositivi di I/O*, questo meccanismo avviene
attraverso il concetto di **porta di I/O**.  Ogni porta è numerate
0,1,2,... e per accedere ad un dispositivo, è necessario conoscere la
porta alla quale è connesso (a volte chiamata anche *indirizzo di
I/O*).

## I/O mediante interrupt
Durante la propria esecuzione la CPU può essere interrotta mediante un meccanismo noto com
[*interrupt*](/content/sr/interrupt.html). Questi interrupt vengono spesso usati dal sistema
operativo per permettere a tutti i processi di andare a turno in esecuzione, ma è possibile
usarlo anche per la gestione dell'hardware. L'idea è molto semplice: quando un hardware (ad
esempio la tastiera) ha ricevuto dell'input e vuole *notificare* la CPU di questo, genera un
interrupt che avvisa la CPU dell'avvenuto *evento hardware*.

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

### Arbitraggio del bus di sistema
Con l'I/O mappato in memoria, il bus dati è usato sia dalla CPU per accedere alla memoria sia
dall'hardware per trasferire dati alla memoria. Il fatto che CPU e I/O controller possano
usare lo stesso bus determina la necessità un meccanismo di sincronizzazione detto **arbitraggio**
del bus. In pratica si deve assolutamente evitare che CPU e I/O controller utilizzino
contemporaneamente il bus, se ciò accadesse, i due interferirebbero l'uno con l'altro e né CPU
né I/O controller riuscirebbero ad utilizzare il bus.