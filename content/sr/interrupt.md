---
title: Interrupt della CPU
layout: page
materia: sr
align: justify
usemathjax: true
---

Spesso è necessario che la CPU *interrompa* il proprio [ciclo fetch-and-execute](cpu.html) per
svolgere istruzione che non fanno parte del programma in esecuzione. Ad esempio, la CPU
deve continuare ad elaborare l'input dalla tastiera anche mentre sta, ad esempio, mostrando
un video.

Il meccanismo per la gestione di *eventi* da parte della CPU prende il nome di
**gestione degli interrupt**. In questa pagina ci occuperemo principalmente degli
interrupt che sono generati da qualche hardware. I processori moderni permettono di
eseguire istruzioni speciali che generano interrupt, queste istruzioni sono fondamentali
per la gestioni dei moderni sistemi operativi. Tuttavia, non ci occuperemo qui di
questo tipo di interrupt.

## Come funzionano gli interrupt
Per iniziare, è necessario comprendere come vengono gestiti gli interrupt dall'hardware.
Nelle moderne architetture un circuito apposito chiamato **Programmable Interrupt Controller (PIC)**
(che potrebbe anche essere nello stesso *chip* del processore) si occupa di aiutare la CPU
nella gestione degli interrupt. 

{% include_relative img/interrupt_hardware.html %}

Aiutandoci con la figura sopra vediamo cosa accade quando viene attivata la linea di
interrupt, ad esempio \\(I_0\\) da parte dell'hardware associato.

1. La linea di interrupt sul PIC viene attivata in corrispondenza dell'hardware che ne fa
la richiesta (ad esempio l'hardware collegato alla linea \\(I_0\\)).
2. Il PIC comunica alla CPU, attraverso la linea ``Interrupt REQ``, che c'è stata una
richiesta di interrupt.
3. La CPU, se non ha *mascherato* gli interrupt, termina le operazioni non interrompibili
e comunica al PIC, attraverso la linea ``Acknowledge``, che è pronta a gestire l'interrupt.
4. Il PIC comunica, attraverso la linea ``Interrupt NUM``, un numero (chiamato anche
*interrupt vector*) che identifica l'interrupt che è avvenuto (ad esempio il numero 0).
5. La CPU, utilizzando il numero di interrupt, avvia una procedura (*subroutine*) speciale
chiamata **Interrupt Service Routine (ISR)* che si occuperà di gestire l'interrupt.

## La Interrupt Service Routine (ISR)
Una **Interrupt Service Routine (ISR)** (chiamata anche *interrupt handler*) è a tutti gli
effetti una subroutine assembly che si occupa di gestire uno specifico interrupt. Per ogni
tipo di interrupt che il processore può ricevere deve esistere una ISR che lo gestisce.
Inoltre il processore deve sapere dove si trova l'inizio tale routine (in pratica deve
sapere che indirizzo mettere nel *Program Counter* per far avviare la routine). Solitamente
gli indirizzi di inizio delle varie ISR sono scritti in una tabella in posizione nota della
memoria. Ad esempio si potrebbe stabilire alla parola di memoria di indirizzo \\(n\\) si
trovi l'indirizzo di inizio della ISR per gestire l'interrupt \\(I_n\\).

### Esempio: interrupt ed esecuzione dell'ISR

## Mascherare gli interrupt
A volte la CPU deve *ignorare* gli interrupt per completare operazioni cruciali (ad
esempio operazioni del sistema operativo). Durante l'esecuzioni di queste operazioni
*non interrompibili*, la CPU attiva un segnale di **mascheramento delle interruzioni**
che significa che le richieste di interrupt vengono ignorate. Tale segnale può
essere gestito dalla CPU stessa oppure può essere demandato al PIC (al quale la CPU
dovrà comunicare quando attivarlo e quando disattivarlo).

Mascherare gli interrupt, tuttavia, può essere un problema, infatti gli interrupt sono
un meccanismo fondamentale per il computer moderni. Alcune delle conseguenze del
mascheramento degli interrupt sono:
* impossibilità del sistema operativo di intervenire (ad esempio per bloccare un
processo che non risponde),
* impossibilità di ricevere input (ad esempio nessuna risposta dalla tastiera),
* impossibilità di aggiornare output (ad esempio *freeze* dello schermo),
in taluni casi questo può addirittura portare al completo blocco del sistema. Infatti
se un programma di blocca mentre l'esecuzione della CPU avviene con gli interrupt
mascherati, nemmeno il sistema operativo sarà in grado di "recuperare" il controllo
della CPU per "sbloccarla". Sarà quindi necessario un *reset hardware* della macchine
(che potrebbe, tra le altre cose, danneggiare alcuni file).

### Interrupt innestati
È naturale chiedersi se durante l'esecuzione di una ISR, la CPU debba o meno mascherare
gli interrupt. Se questo accade, allora non si possono verificare interrupt innestate
cioè l'esecuzione di una ISR non può essere interrotta per eseguire un'altra ISR. In
alcuni casi, tuttavia, è possibile che una ISR possa essere interrotta, se questo accade
viene usato un meccanismo di gestione delle subroutine simile a quello descritto in
[questa pagina](/content/sr/subroutine.md).

Va infine sottolineato che uno dei problemi delle ISR innestate è l'efficienza nella
loro esecuzione. Come già detto sopra l'esecuzione delle ISR è "tempo perso" per il
programma in esecuzione (es. da parte dell'utente). Avere più ISR innestate rende tale
problema ancora più grave perché tutte le ISR devono terminare prima che il 
*programma utente* possa terminare.

## Efficienza e *interrupt storm*
Da quanto visto [sopra](#come-funzionano-gli-interrupt), le ISR sono delle subroutine che
vengono eseguite dalla CPU la quale interrompe momentaneamente l'esecuzione del programma.
Proprio per questo motivo è importante che le ISR siano *veloci* e terminino il prima
possibile, infatti ogni ritardo di una ISR è un ritardo nell'esecuzione del programma.

Quando le ISR sono molto frequenti il sistema può rallentarsi di molto. Questo rallentamento
si può misurare in termini di **efficienza** nell'utilizzo del processore.

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-text"></i> Definizione: Efficienza</h5>
Chiamiamo **efficienza** \\(E\\) del processore la *frazione* (o percentuale) di "istruzione di
programma" rispetto a tutte le istruzioni eseguite

$$ E = \frac{IstruzioniProgrmma}{TotaleIstruzioni} 
= \frac{IstruzioniProgramma}{IstruzioneProgramma + IstruzioniISR} $$

$$ E\% = E \times 100 $$
</div>

Per fare un esempio di efficienza, se durante l'esecuzione di un programma di 1000
istruzioni si eseguono 200 istruzioni di ISR l'efficienza sarà

$$ E = \frac{1000}{1000+200} = \frac{1000}{1200} = 0,8333 $$

corrispondente ad una efficienza percentuale

$$ E\% = 83\% $$

Questo significa che l'83% del tempo, il processore sarà impegnato ad eseguire istruzioni
di programma mentre per il 17% eseguirà istruzioni di di ISR.

Un **interrupt storm** è una situazione in cui il processore viene *tempestato* di interrupt
al punto che la maggior parte del tempo lo spende ad eseguire ISR. Se nell'esempio sopra
la stessa ISR di 200 istruzioni deve essere eseguita 100 volte, (totale 20000 istruzioni)
l'efficienza diventa

$$ E = \frac{1000}{1000 + 20000} = \frac{1000}{21000} = 0,05 $$

quindi solo il 5% del tempo viene speso sul programma il restante 95% vengono eseguite
istruzioni delle ISR. Chiaramente in questa situazione il programma subirebbe dei rallentamenti
inaccettabili per l'utente.

<div class="alert alert-success" markdown="1">
<h5 class="no_toc"><i class="bi bi-lightbulb"></i> Rifletti</h5>

Come spiegato in [questa pagina](/content/sr/io.html), un utilizzo degli interrupt è per
gestire l'I/O. Con l'aumento del numero di dispositivi di I/O, tuttavia, è possibile che
centinaia di interrupt siano richiesti ogni secondo. Si pensi infatti a tutte le richieste
che potrebbero provenire da

* dischi rigidi e SSD
* schede di rete
* dispositivi USB (tastiera, mouse, pendrive, ...)
* GPU
* ...

Per evitare che un'*interrupt storm* si scateni sui processori moderni, molti dispositivi
di I/O vengono gestite in modi diversi dagli interrupt.
</div>
