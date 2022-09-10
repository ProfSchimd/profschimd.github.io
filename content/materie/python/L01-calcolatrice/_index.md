---
title: "Laboratorio 1: Calcolatrice"
weight: 1001
type: lecture
summary: "Esercitazione sulle basi del linguaggio Python. Durante il laboratorio si svilupperà una semplice calcolatrice da riga di comando in grado di effettuare le operazioni di base e di memorizzare il risultato per poterlo riutilizzare come variabile."
---

## Esercizio 1: input interattivo (facile)
Creare l'applicazione Python ``pyCalc`` che permetta di fare le operazioni base:
* Addizione (simbolo `+`)
* Sottrazione (simbolo `-`)
* Moltiplicazione (simbolo `*`)
* Divisione (simbolo `\`)
prendendo l'input dalla console.

1. All'utente deve essere richiesta l'operazione da eseguire.
2. Dopo aver ricevuto e riconosciuto il simbolo dell'operazione (gestendo eventuali
simboli *non riconosciuti*) all'utente viene chiesto
    * primo operando
    * secondo operando
3. dopo la lettura degli operandi (gestendo operandi *non validi*) il programma
stampa a video il risultato dell'operazione e si mette in attesa di una nuova
operazione.

### Esempio

    Inserire operazione: -
    Operazione 'sottrazione'
      Primo operando: 4
      Secondo operando 2
    Risultato 
      ans = 2

    Inserire operazione: 

## Esercizio 2: memoria (facile)
Modificare il programma dell'esercizio precedente perché permetta di usare come
operando il valore ``ans`` *memorizzato* dalla precedente operazione. Il programma
deve correttamente gestire:
* il caso in cui non ci sia un valore ``ans`` precedentemente memorizzato (segnalando
un errore),
* il caso in ``ans`` possa essere: il primo il secondo o tutti e due gli operandi.

### Esempio (continua da sopra)

    ...
    Risultato 
     ans = 2

    Inserire operazione: *
     Primo operando: ans
     Secondo operando: 8
    Risultato
     ans = 16

    Inserire operazione:

## Esercizio 3: *parsing* dell'input (difficile)

