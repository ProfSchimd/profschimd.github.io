---
title: Condizioni e salti
weight: 30
summary: "Una fondamentale caratteristica dei programmi è quella di poter operare scelte sulla base di condizioni. Le istruzioni che operano tali scelte chiamate istruzione di salto o istruzioni di controllo del flusso."
type: lecture
---

## Condizioni: `if-then-else`

### Attenzione al codice replicato
Le condizioni `if` sono indispensabili per eseguire codice diverso in base
a delle *condizioni* quale, ad esempio, il valore di una variabile. Perciò
si può scrivere a schermo una frase al singolare

    È rimasto un solo posto, affrettati a prenotare!

in caso in cui, ad esempio su un volo, sia rimasto l'ultimo posto disponibile
mentre si usano frasi diverse in situazioni diverse.

Un bravo programmatore deve identificare *tutte e sole* quelle istruzioni
che cambiano sulla base della condizione. Contemporaneamente, le abilità di un
programmatore si misurano anche sul riconoscere quali altre istruzioni, invece,
non sono diverse in base alla condizione. Infatti queste dovrebbero essere
scritti fuori dai *blocchi condizionali* per evitare di **replicare codice**.

Ad esempio, se dopo aver mostrato il messaggio con i posti disponibili, si
vuole mostrare un *banner* pubblicitario uguale in tutti i casi, le istruzioni
per fare questo possono essere scritte una volta sola e non per ogni condizione.

#### Esempio in Python
Vediamo un semplice esempio del caso appena descritto utilizzando il
linguaggio Python (che è molto più "leggibile" di altri linguaggi, come
Java).

```python
if (posti == 1):
    print("È rimasto un solo posto, affrettati a prenotare!")
    mostra_banner()
elif(posti > 1 and a < posti):
    print(f"sono rimasti solo {posti} posti, non perdere l'occasione!")
    mostra_banner()
else:
    print("Ci sono ancora posti disponibili, fa l'affare del giorno!")
    mostra_banner()
```

Confrontiamo con

```python
if (posti == 1):
    print("È rimasto un solo posto, affrettati a prenotare!")
elif(posti > 1 and posti < 5):
    print(f"sono rimasti solo {posti} posti, non perdere l'occasione!")
else:
    print("Ci sono ancora posti disponibili, fa l'affare del giorno!")
mostra_banner()
```

Quale soluzione delle due proposte sopra è migliore? Perché?

L'unica differenza tra le due versione è la chiamata alla funzione
`mostra_banner()`, mentre sopra viene fatto all'interno di ogni blocco
condizione (`if`, `elif` e `else`), sotto viene fatto una volta solo.
Questo esempio è semplice, ma se si immagina che anziché `mostra_banner()`,
ci fossero decine o centinaia di righe, allora si capisce subito che la
seconda versione fa risparmiare molte righe di codice che sarebbero tra
loro uguali.

