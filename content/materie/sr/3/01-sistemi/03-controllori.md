---
title: Micro controllori
weight: 300
type: lecture
summary: "Un sistema importante."
---

## Cos'è un Microcontrollore
{{<column/two-cols wr=4 wl=8 content="left" embed="img/img-atmega.html">}}
Un microcontrollore è un sistema di calcolo realizzato su un singolo chip, i microcontrollori vengono progettati per eseguire specifiche attività e funzioni, ma, a differenza degli [automi]({{<ref "02-automi.md" >}}), sono programmabili.

In un microcontrollore l'unità di elaborazione, la memoria e l'I/O (*Input/Output*) sono tutti integrati in un unico chip. I microcontrollori sono ideali per applicazioni embedded, in cui è richiesto il controllo di dispositivi o di semplici sistemi, talvolta in *real-time*. Un esempio di un sistema embedded à l'Arduino che utilizza il microcontrollore ATMega328 (immagine a fianco).

Di norma un microcontrollore ha un costo molto inferiore rispetto ad un microprocessore (pochi dollari per un microcontrollore e centinaia di dollari per un microprocessore). Questo permette di inserire un livello di automatismo anche su dispositivi di basso costo (ad esempio un termostato o una lampada intelligente).
{{</column/two-cols>}}

## Architettura dei Microcontrollori
Con il termine *architettura* si indica il modo in cui i componenti di un sistema sono organizzati e connessi tra di loro. I microcontrollori sono sistemi di elaborazione con un'architettura specifica e diversa dall'architettura dei sistemi a microprocessore. Infatti i microcontrollori contengono tutti i componenti dell'architettura in un unico *chip* (circuito integrato) e non sono per questo espandibili.

Vediamo più in dettaglio i componenti di un microcontrollore evidenziadone le principali differenze con i microprocessori. 

### CPU (Unità di Elaborazione Centralizzata)

La CPU (*Central Processing Unit*) è il cuore di un microcontrollore e gestisce tutte le operazioni di calcolo quali ad esempio somme, confronti e salti condizionati. È responsabile dell'esecuzione delle istruzioni del programma, del controllo dei registri e dell'interfacciamento con le altre unità. Rispetto alla CPU presente nei microprocessori, le CPU dei microcontrollori sono:
* più lente in termini di *numero di operazioni al secondo* (chiamato anche *clock*);
* meno ricche di *istruzioni macchina*;
* meno capienti in termini di memoria (registri e cache).

### Memoria

I microcontrollori hanno diverse tipologie di memoria, tra cui:

- **Memoria Flash**: Utilizzata per memorizzare il codice del programma, rimane anche dopo che viene tolta l'alimentazione.
- **RAM (Random Access Memory)**: Utilizzata per memorizzare dati temporanei e variabili durante l'esecuzione del programma.
- **EEPROM (Electrically Erasable Programmable Read-Only Memory)**: Utilizzata per memorizzare dati non volatili, come le impostazioni di configurazione.

Caratteristica fondamentale dei microcontrollori è che tutte queste memorie si trovano nello stesso chip della CPU. Infatti la caratteristica di *sistema embedded* (tutto in un unico chip) è uno dei punti di forza dei microcontrollori.

{{<column/two-cols wr=4 wl=8 content="left" embed="img/arduino-uno.html">}}
Per meglio comprendere la differenza tra microcontrollori e microprocessori, vediamo nella tabella sotto un confronto indicativo (i numeri possono variare sulla base del chip specifico) tra due microcontrollori (ATMega328 montato su Arduino, a destra, e ESP32) e un microprocessore (Intel i7 di undicesima generazione). Il confronto è fatto in termini di *frequenza di clock*, *dimensione della parola macchina* e *memoria statica (SRAM)*.

{{<table>}}
|            | ATMega328 |  ESP32  | i7 11700k |
|------------|-----------|---------|-----------|
| **Clock**  |  16 MHz   | 240 MHz |  3.6 GHz  |
| **Parola** |   8 bit   |  32 bit |  64 bit   |
| **SRAM**   |   2 KB    |  520 KB |  16 MB    |
{{</table>}}

{{</column/two-cols>}}

### Periferiche di Input/Output (I/O)

I microcontrollori sono progettati per interagire con il mondo esterno tipicamente con *sensori* ed *attuatori* ai quali è direttamente collegato. Questi collegamenti sono normalmente realizzati attraverso  **porte GPIO** (*General-Purpose Input/Output*), convertitori analogico-digitali (ADC) e digitali-analogici (DAC). 

## Differenze principali con i Microprocessori

Una delle differenze principali tra i microcontrollori e i microprocessori è l'ambito delle applicazioni:

- **Microcontrollori**: Sono progettati per applicazioni specifiche e contengono tutto ciò che è necessario per eseguire una determinata funzione o controllo. Sono comunemente utilizzati in sistemi embedded, come elettrodomestici, automobili, dispositivi medici e molto altro.

- **Microprocessori**: Sono progettati per applicazioni generali e richiedono componenti esterni, come RAM e ROM, per funzionare correttamente. Sono tipicamente utilizzati in computer desktop, laptop e server.

Inoltre, i microcontrollori tendono ad avere requisiti energetici più bassi rispetto ai microprocessori, rendendoli adatti per applicazioni alimentate a batteria. Inoltre, spesso sono più economici e disponibili in una vasta gamma di opzioni per soddisfare le esigenze specifiche di un'applicazione.

Data la relativa semplicità, i microcontrollori non hanno bisogno di un *sistema operativo* per la loro gestione. Infatti il loro funzionamento è tipicamente determinato da un singolo programma che viene eseguito in *loop* per tutto il tempo in cui il microcontrollore è in funzione.
