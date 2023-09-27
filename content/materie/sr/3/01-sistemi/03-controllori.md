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
Con il termine *architettura* si indica il modo in cui i componenti di un sistema sono organizzati e connessi tra di loro. I microcontrollori sono sistemi di elaborazione con un'architettura specifica e diversa dall'architettura dei sistemi a microprocessore.

### CPU (Unità di Elaborazione Centralizzata)

La CPU è il cuore di un microcontrollore e gestisce tutte le operazioni di calcolo. È responsabile dell'esecuzione delle istruzioni del programma, del controllo dei registri e dell'interfacciamento con le altre unità.

### Memoria

I microcontrollori hanno diverse tipologie di memoria, tra cui:

- **Memoria Flash**: Utilizzata per memorizzare il codice del programma.
- **RAM (Random Access Memory)**: Utilizzata per memorizzare dati temporanei e variabili.
- **EEPROM (Electrically Erasable Programmable Read-Only Memory)**: Utilizzata per memorizzare dati non volatili, come le impostazioni di configurazione.

### Periferiche di Input/Output (I/O)

I microcontrollori sono progettati per interagire con il mondo esterno. Le periferiche di I/O consentono di connettersi a sensori, attuatori e altri dispositivi. Queste periferiche possono includere porte GPIO (General-Purpose Input/Output), convertitori analogico-digitali (ADC) e digitali-analogici (DAC).

### Timer e Contatori

I timer e i contatori sono utilizzati per generare segnali temporizzati e contare eventi. Sono importanti per il controllo di periodi di tempo, come la gestione di ritardi e timeout.

### Bus di Sistema

Il bus di sistema è un sistema di collegamento che consente la comunicazione tra le varie unità all'interno del microcontrollore. Questo collegamento è fondamentale per il corretto funzionamento del dispositivo.

## Differenze principali con i Microprocessori

Una delle differenze principali tra i microcontrollori e i microprocessori è l'ambito delle applicazioni:

- **Microcontrollori**: Sono progettati per applicazioni specifiche e contengono tutto ciò che è necessario per eseguire una determinata funzione o controllo. Sono comunemente utilizzati in sistemi embedded, come elettrodomestici, automobili, dispositivi medici e molto altro.

- **Microprocessori**: Sono progettati per applicazioni generali e richiedono componenti esterni, come RAM e ROM, per funzionare correttamente. Sono tipicamente utilizzati in computer desktop, laptop e server.

Inoltre, i microcontrollori tendono ad avere requisiti energetici più bassi rispetto ai microprocessori, rendendoli adatti per applicazioni alimentate a batteria. Inoltre, spesso sono più economici e disponibili in una vasta gamma di opzioni per soddisfare le esigenze specifiche di un'applicazione.

Nella prossima lezione, approfondiremo ulteriormente l'architettura dei microcontrollori e esploreremo alcune delle loro applicazioni più comuni.
