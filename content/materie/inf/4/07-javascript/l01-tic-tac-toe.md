---
title: "Laboratorio 1: Tic Tac Toe (Tris) con Canvas HTML5"
type: lecture
weight: 1000
---

## Descrizione del laboratorio
In questo laboratorio verrà sviluppato il classico gioco *Tic Tac Toe* (in Italia
meglio noto come *Tris*). Il gioco verrà sviluppato nella sua interezza a partire
dalla rappresentazione in memoria della scacchiera di gioco, fino alla realizzazione
dei controlli per renderlo pienamente funzionante. La parte più importante del
laboratorio è l'utilizzo dell'elemento `<canvas>` di HTML5 spiegato meglio nella
[lezione dedicata]().

Il laboratorio è diviso in tre parti principali:
1. modello (*Model*),
2. interfaccia (*View*),
3. controllo (*Control*).

Ogni parte aggiunge una funzionalità al gioco di modo che, alla fine delle tre
parti, si avrà un gioco pienamente funzionante.

{{<attention>}}
Questo laboratorio ha lo scopo di guidare lo studente nella scrittura da zero del
gioco Tic Tac Toe. Per questo motivo non è presente codice (se non in minima parte
e per indicare specifiche *feature* del linguaggio) e non vi è alcun repository
associato.

Per ottenere il massimo da questo laboratorio, **ogni studente dovrebbe sviluppare,
in piena autonomia, il gioco da zero**. Lo studente può chiedere aiuto al docente o
al tutor (se presente) i quali possono aiutare lo studente a pensare la soluzione,
in ogni caso i
{{</attention>}}

## 1 - Il modello (*model*)
In questa parte vedremo come rappresentare in memoria lo *stato* del gioco, cioè
la situazione sulla scacchiera di gioco. È importante capire che questo aspetto
è diverso (anche se fortemente collegato) da quello che viene visualizzato
dall'interfaccia (questo aspetto è più evidente in giochi più complessi dove non
tutto lo stato del gioco è mostrato sullo schermo).

### 1.1 - Rappresentazione della scacchiera
Il primo passo è individuare cosa e come rappresentare del gioco. Nel caso di Tic
Tac Toe, lo stato è formato da:
* ogni singola cella della scacchiera \\(3 \times 3\\), cioè cosa c'è (`Vuoto`, `X` o `O`)
su ognuna delle 9 celle e
* il turno del prossimo giocatore o lo stato di fine del gioco.

{{<exercise title="Stato del gioco" >}}
Creare un oggetto `State` che contenga due variabili: una per lo stato della
scacchiera ed uno per indicare il turno (prossimo giocatore).

**Suggerimento** per indicare lo stato della scacchiera si può usare una
struttura bidimensionale indicando per ogni posizione un intero che rappresenta
lo stato (ad esempio: `0->Vuoto`, `1->X`, `2->O`).
{{</exercise>}}

## 2 - L'interfaccia (*view*)
L'interfaccia rappresenta ciò che l'utente vede e ciò con cui l'utente interagisce
(scacchiera, bottoni, informazioni, ...), per questo motivo il ruolo dell'interfaccia
in gioco è fondamentale.

In questa seconda parte del laboratorio costruiremo l'interfaccia del gioco Tic Tac
Toe a partire dal *modello dati* che abbiamo sviluppato nella parte precedente. Lo
sviluppo dell'interfaccia avverrà in due parti
1. Disegno della [scacchiera](#21---la-scacchiera) vuota e dei controlli ad un valore di *default* e
2. Disegno delle [mosse](#22---visualizzare-le-mosse) intese come simboli eventualmente presenti sulla scacchiera.

### 2.1 - La scacchiera

{{<column/two-cols wl=8 wr=4 content="left" embed="img/tic-tac-toe-grid.html">}}
Nel disegnare l'interfaccia iniziamo dalla *scacchiera* di gioco che nel caso di Tic
Tac Toe è una griglia \\(3 \times 3\\) inizialmente vuota.

Nella figura a destra vediamo uno screenshot di una griglia di base (senza particolare
attenzione alla bellezza della griglia stessa). In questo esempio, la griglia occupa
l'intera area del canvas, ma spesso può essere necessario lasciare dello spazio attorno
all'area principale per inserire varie informazioni come controlli, punteggio, ...

In questo laboratorio controlli ed altre informazioni (ad esempio il giocatore che deve
fare la prossima mossa) vengono indicati utilizzando elementi HTML esterni al canvas.
{{</column/two-cols>}}

{{<exercise>}}
Utilizzare i metodi per disegnare rettangoli su un canvas per disegnare una griglia
\\(3 \times 3 \\) al suo interno. Inizialmente la griglia deve occupare l'intero
canvas, per farlo utilizzare uno dei due modi seguenti per recuperare `height` e
`width` del canvas.

*Modo 1:* proprietà dell'elemento `<canvas>`
{{<highlight javascript>}}
const canvas = document.querySelector('#canvas');
const width = canvas.width;
const height = canvas.height;
{{</highlight>}}

*Modo 2:* usare l'oggetto *context* e le sue proprietà `offsetX` e `offsetY`
{{<highlight javascript>}}
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const width = ctx.offsetY;
const height = ctx.offsetX;
{{</highlight>}}
{{</exercise>}}

{{<exercise title="Scacchiera con sfondo">}}
Una versione più bella della scacchiera si può ottenere utilizzando uno sfondo
(ad esempio un'immagine) del canvas (in alternativa si può usare *un gradiente*)
e lasciando un margine tra il bordo del canvas e la scacchiera.
1. Disegnare uno sfondo (immagine o gradiente) sull'intero canvas
2. Disegnare la scacchiera lasciando un margine tra questa e i bordi del canvas, il
margine può essere dato in termini assoluti (ad esempio 10 px) oppure in termini
relativi (ad esempio il 5% della larghezza e dell'altezza).
{{</exercise>}}

### 2.2 - Visualizzare le mosse

{{<column/two-cols wl=8 wr=4 content="left" embed="img/tic-tac-toe-game.html">}}
Il passo successivo è riportare sull'interfaccia (sulla scacchiera disegnata) la
situazione del gioco che è rappresentata dalla variabile usata nel modello. In
altra parole dobbiamo riempire le caselle (o lasciarle vuote) sulla base del valore
che vediamo nella variabile di stato.

Supponiamo di avere la variabile `board` che è un array bidimensionale \\(3 \times 3\\),
se abbiamo usato il valore `1` per il giocatore `X`, il valore `2` per il giocatore `O`
e il valore `0` per la casella vuota, allora l'immagine a destra sarà la rappresentazione
del seguente stato
```
2 0 1
1 2 0
0 0 1
```

Anche se non è obbligatorio, conviene avere una funzione che si in grado di
disegnare una `X` nella posizione centrale della casella ed una funzione
analoga per il disegno di una `O`.
{{</column/two-cols>}}

{{<exercise>}}
Scrivere le due funzioni

```javascript
function drawCrossCenteredAt(...) { ... }
function drawCircleCenteredAt(...) { ... }
```
Che prendono un punto *centro* del `canvas` ed un *raggio* e disegnano il
simbolo centrato nel punto dato e con il raggio dato.
{{</exercise>}}


## 3 - L'interazione (*control*)

### 3.1 - Il turno di gioco

### 3.2 - Controllo delle mosse valide

### 3.3 - Controllo della condizione di fine partita

### 3.4 - Reset del gioco

## 4 - Tic Tac Toe PRO
Il gioco del Tic Tac Toe è molto semplice e magari noioso per qualcuno, perché
non renderlo più interessante con una versione *Pro* con nuove feature, ecco
alcune idee.

### 4.1 - Più di 3...
Il classico Tic Tac Toe si gioca su una scacchiera \\(3 \times 3\\), ma nulla vieta
di far diventare la scacchiera \\(4 \times 4, 5 \times 5, \ldots \\), insomma
la versione Pro potrebbe contenere uno slider (elemento [HTML Range](https://www.w3schools.com/tags/att_input_type_range.asp))
per selezionare la dimensione della scacchiera (ad esempio da \\(3 \times 3\\) a
\\( 8 \times 8 \\)) in questo modo il gioco sarà molto più accattivante e meno
noioso!

### 4.2 - Simbolo, colore e nome
Anche l'occhio vuole la sua parte, perché non dare ai giocatori di scegliersi
un simbolo di gioco (non solo X e O) ed un colore? Fatto questo perché non dare
anche l'opportunità di avere un nome anziché `Player 1` e `Player 2`? Attenzione
però, che non ci possono essere giocatori con lo stesso simbolo e colore e nemmeno
due giocatori con lo stesso nome!

### 4.3 - Classifica e torneo
Non sarebbe bello organizzare un bel torneo di Tic Tac Toe PRO? Si potrebbe
aggiungere una classifica delle partite (\\(+3\\) per la vittoria \\(+1\\) per
il pareggio e \\(0\\) per la sconfitta). Si può anche prevedere un *torneo ad
eliminazione* (scontro diretto o alla meglio delle 5?) che preveda
gironi, ottavi, quarti, ..., 

### 4.4 - Meglio si soli che mal accompagnati...
A volte non c'è nessuno che ci sfidi a Tic Tac Toe, se solo ci fosse un'AI
che ci sfida! Si potrebbe pensare di creare un semplice AI che ci sfidi il
giocatore umano (e se facessimo giocare l'AI contro sè stessa?)

