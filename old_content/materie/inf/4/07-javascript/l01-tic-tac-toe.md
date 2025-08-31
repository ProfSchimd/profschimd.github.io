---
title: "Laboratorio 1: Tic Tac Toe (Tris) con Canvas HTML5"
type: lecture
weight: 1000
---

## Descrizione del laboratorio
In questo laboratorio verrà sviluppato il classico gioco *Tic Tac Toe* (in Italia
noto con il nome *Tris*). Il gioco verrà sviluppato nella sua interezza, partendo
dalla *rappresentazione in memoria* della scacchiera di gioco, fino alla realizzazione
dei controlli necessari a renderlo pienamente funzionante. La parte più significativa del
laboratorio è l'utilizzo dell'elemento `<canvas>` di HTML5 spiegato meglio nella
[lezione dedicata]({{< ref "03-canvas.md" >}}).

Il laboratorio è diviso in tre parti:
1. modello (*Model*),
2. interfaccia (*View*),
3. controllo (*Control*).

Ogni parte aggiunge funzionalità al gioco di modo che, alla fine delle tre
parti, si avrà un gioco pienamente funzionante.

{{<attention>}}
Questo laboratorio ha lo scopo di guidare lo studente nella scrittura, da zero, del
gioco Tic Tac Toe. Per questo motivo non è presente codice (se non in minima parte
e per indicare specifiche *feature* del linguaggio) e non vi è alcun repository
associato.

Per ottenere il massimo da questo laboratorio, **ogni studente dovrebbe sviluppare,
in piena autonomia, il gioco da zero**. Lo studente può chiedere aiuto al docente o
al tutor (se presente) i quali possono aiutare lo studente a pensare la soluzione.
{{</attention>}}

## 1 - Il modello (*model*)
In questa parte vedremo come rappresentare in memoria lo *stato* del gioco, cioè
la situazione sulla scacchiera di gioco. È importante capire che lo stato
è diverso (anche se fortemente collegato) da quello che viene visualizzato
dall'interfaccia (questo aspetto è più evidente in giochi più complessi dove non
tutto lo stato del gioco è mostrato sullo schermo).

### 1.1 - Rappresentazione della scacchiera
Il primo passo è individuare quali parti del gioco rappresentare e come rappresentarle.
Nel caso di Tic Tac Toe, lo *stato* è formato da:
* ogni singola cella della scacchiera \\(3 \times 3\\), cale a dire cosa c'è 
su ognuna delle 9 celle (`Vuoto`, `X` o `O`);
* un'indicazione del prossimo giocatore che ha il turno o, in alternativa, 
un'indicazione di "fine gioco" quando non sono possibili ulteriori mosse.

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
Toe a partire dalla [*rappresentazione della scacchiera*](#11---rappresentazione-della-scacchiera) che abbiamo sviluppato nella parte precedente. Lo
sviluppo dell'interfaccia avverrà in due parti
1. Disegno della [scacchiera](#21---la-scacchiera) vuota e dei controlli e
2. Disegno delle [mosse](#22---visualizzare-le-mosse) cioè dei simboli sulla scacchiera.

### 2.1 - La scacchiera

{{<column/two-cols wl=8 wr=4 content="left" embed="img/tic-tac-toe-grid.html">}}
Nel disegnare l'interfaccia iniziamo dalla *scacchiera* di gioco che nel caso di Tic
Tac Toe è una griglia \\(3 \times 3\\) inizialmente vuota.

La figura a destra mostra uno screenshot di tale griglia (senza particolare
attenzione alla bellezza della griglia stessa). Nell'esempio, la griglia occupa
l'intera area del canvas, ma spesso è necessario (o meglio esteticamente) lasciare
dello spazio attorno all'area di gioco. Tale spazio può essere utilizzato per
inserire informazioni sul gioco (punteggio, turno, tempo trascorso), controlli
(salva, abbandona, reset, ...) e molto altro.

In questo laboratorio i controlli e le altre informazioni (ad esempio il giocatore che deve
fare la prossima mossa) vengono indicati utilizzando elementi HTML esterni al canvas (ai
quali si accede usando i metodi di accesso al [DOM]() della pagina).
{{</column/two-cols>}}

{{<exercise title="Disegno della scacchiera">}}
Utilizzando i metodi per disegnare rettangoli su canvas, disegnare una griglia
\\(3 \times 3 \\) all'interno di un canvas. Inizialmente la griglia deve occupare l'intero
canvas, per ottenere questo effetto si può utilizzare uno dei due modi seguenti
per recuperare `height` e `width` del canvas.

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
situazione del gioco che è rappresentata dalla variabile usata nello stato. In
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

Anche se non è obbligatorio, conviene avere una funzione che sia in grado di
disegnare una `X` nella posizione centrale della casella ed una funzione
analoga per il disegno di una `O`.
{{</column/two-cols>}}

{{<exercise title="Disegno dei simboli da gioco">}}
Scrivere le due funzioni

```javascript
function drawCrossCenteredAt(...) { ... }
function drawCircleCenteredAt(...) { ... }
```
Che prendono un punto *centro* del `canvas` ed un *raggio* e disegnano il
simbolo centrato nel punto dato e con il raggio dato.
{{</exercise>}}

Disegnare la scacchiera (e gli altri elementi del gioco) è un operazione molto
frequenta che deve essere eseguita ogni volta che lo stato del gioco cambia.
Di conseguenza conviene una funzione che si occupa di fare quest e che può essere
invocata ogni qualvolta vi sia necessità di ridisegnare la scacchiera.

{{<exercise title="Funzione draw">}}
Creare una funzione `draw` che si occupa di:
* disegnare la scacchiera sulla base dei valori presenti nello stato, per fare
questo conviene usare le funzioni `drawCross...` e `drawCircle...` definite
nell'esercizio precedente;
* aggiornare eventuali messaggi (prossimo turno, vincitore, fine, ...).

Per controllare che la funzione esegua correttamente il suo compito, si può
cambiare "manualmente" lo stato del gioco e vedere se `draw` si comporta in modo
coerente con i nuovi valori.

{{</exercise>}}


## 3 - L'interazione (*control*)
In questo terzo passo ci occupiamo di realizzare la "logica" del gioco definendo
la parte del programma che abbiamo chiamato *control*. Dovremo occupaci dei
seguenti aspetti del gioco
* gestione del turno tra i giocatori;
* validazione delle mosse, impedendo mosse non valide;
* controllo della condizione di fine partita per vittoria di un giocatore o pareggio e
* reset del gioco per iniziare una nuova partita.

La prima cosa da fare, tuttavia, è gestire il mouse e gli eventi associati in
modo che il giocatore possa interagire con il canvas cliccando nella zona in cui
vuole inserire il proprio simbolo.

### 3.1 - Gestione del mouse
Come per altri controllo HTML, il canvas permette una gestione degli eventi che
esso genera. L'evento che ci interessa gestire è il *click* del mouse all'interno
del canvas, allo scopo si può registrare un *event listener* all'elemento `<canvas>`
indicando quale funzione si vuole agganciare.

{{<exercise title="Gestione del click su canvas">}}
Definire una funzione Javascript che accetta un unico parametro, supponiamo di
chiamare questa funzione `canvasOnclick` e che il il suo parametro abbia nome
`event`. Per "agganciare" la funzione definita all'evento generato dal browser,
utilizzare il seguente codice, subito dopo aver ottenuto l'elemento `<canvas>`
mediante `querySelector` (e `getElementById`).

```javascript
canvas.addEventListener('click', canvasOnClick, false);
```

All'interno della funzione scrivere il codice per stampare sulla console i valori
delle proprietà `offsetX` e `offsetY` del parametro (variabile `event` secondo i
nomi definiti sopra). Fatto questo, si dovrebbe vedere apparire sulla console le
coordinate \\(x\\) ed \\(y\\) del punto all'interno del canvas in cui il mouse è
stato cliccato.
{{</exercise>}}

Per il Tic Tac Toe più che la posizione all'interno del canvas, è importante
conoscere quale delle caselle è stata cliccata. Per fare questo si può calcolare,
sulla base del punto \\((x,y)\\), il numero di riga e di colonna della casella
corrispondente.

{{<exercise title="Calcolo casella selezionata">}}
Scrivere il codice Javascript che, data la dimensione della scacchiera (che potrebbe
non coincidere con la dimensione del canvas se si è aggiunto un bordo) ed un punto
di coordinate \\((x,y)\\) calcola il valore della riga (`0`, `1` o `2`) e della
colonna (`0`, `1` o `2`) in cui si verificato il `click`. È importante ricordarsi
di gestire anche il caso in cui il click sia avvenuto in una zona che non è parte
della scacchiera di gioco (nel caso di scacchiera con bordo).
{{</exercise>}}

### 3.2 - Il turno di gioco
Passando ora alla gestione del gioco, iniziamo con un meccanismo che tenga conto
di quale giocatore è il prossimo a fare la propria mossa. Anche se i giocatori
sono di norma identificati dai simboli `X` e `O`, spesso conviene usare un diverso
modo identificarli, ad esempio possiamo usare `1` per il giocatore `X` e `2` per
il giocatore `O`.

Con questa convenzione, possiamo usare un intero per tenere traccia del prossimo
giocatore in turno, la cosa importante è aggiornare ad ogni mossa **valida** il
turno in modo che sia sempre corretto.

{{<exercise title="Turno di gioco">}}
Realizzare all'interno della funzione di *callback* del click (sopra indicata con
`canvasOnclick`), il meccanismo di alternanza dei turni. Si tenga presente che
sarà necessario gestire le mosse non valide (ad esempio click in una cella già
occupata) che non fanno cambiare il prossimo giocatore.
{{</exercise>}}

Per rendere il gioco più usabile, è bene che vi sia un indicazione di quale
giocatore deve fara la prossima mossa. Questa indicazione deve essere visibile
e comprensibile (ad esempio non basta mettere un valore `1` o `2` in un punto
"a caso" dello schermo).

{{<exercise title="Indicazione turno">}}
Realizzare un meccanismo che mostri quale giocatore deve eseguire la prossima
mossa. Un possibile modo è attraverso un elemento HTML, ad esempio un `<p>`.

```html
<p id="turno">Il prossimo giocatore è X</p>
```

per modificare il contenuto di un elemento in Javascript, dopo aver ottenuto un
oggetto per quel elemento (usando `querySelector` o `getElementById`), si può
impostare la proprietà `textContent` ad esempio

```javascript
elementToUpdate.textContent = 'Prossimo giocatore: ...';
```

{{</exercise>}}

### 3.3 - Controllo delle mosse valide
Non tutti i click rappresentano delle mosse valide, nel caso di Tic Tac Toe, un
click in corrispondenza di una casella già occupata rappresenta una mossa non
valida. Quando un giocatore esegue una mossa non valida, il gioco deve ignorarla
mantenendo un'indicazione di quale giocatore deve eseguire la mossa. Si può anche
prevedere un meccanismo che segnali quando una mossa non è valida, in un gioco
semplice come Tic Tac Toe, questo meccanismo non è necessario.

### 3.4 - Controllo della condizione di fine partita
In Tic Tac Toe la partita termina in uno dei seguenti casi:
* un giocatore esegue *tris*, mettendo tre simboli di fila nella stessa colonna,
nella stessa riga o nella stessa diagonale;
* le caselle sono tutte riempite, in questo caso si verifica il pareggio se
nessun giocatore ha messo tre simboli in fila.

{{<exercise title="Controllo condizione di fine">}}
Dopo aver eseguito una mossa, lo stato del gioco cambia, questo cambiamento si
vede attraverso la variabile che memorizza lo stato della scacchiera.

Analizzare il contenuto della variabile e decidere quale delle seguenti condizioni
è vera:
* gioco vinto da uno dei due giocatori,
* gioco terminato in pareggio,
* gioco non vinto e non terminato (si continua a giocare).

Una volta verificato quale stato visualizzare un messaggio che indica una
delle condizioni. Si può essere lo stesso meccanismo usato per indicare il turno
(ad esempio indicando il vincitore o che la partita si è conclusa con un
pareggio).
{{</exercise>}}

### 3.5 - Reset del gioco
Una volta concluso il gioco, per iniziare una nuova partita è necessario "pulire"
la scacchiera e re-impostare tutti i valori.

Per fare questo si può usare un elemento HTML di tipo *bottone* dichiarato nel
seguente modo

{{<exercise title="Reset del gioco">}}

```html
<input id="reset" type="button" value="Reset">
```

Per eseguire del codice quando il bottone viene cliccato, come nel caso del
canvas, è necessario creare una funzione di *callback* (o *handler*), diciamo
la funzione `reset` che avrà un parametro (l'evento) e che si occuperà di
rimettere i valori iniziali in tutte le variabili, avendo anche cura di ridisegnare
la scacchiera (ora vuota).

```javascript
resetButton.addEventListener('click', reset, false); // ricorda qualcosa?
```

{{</exercise>}}

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
giocatore umano (e se facessimo giocare l'AI contro sè stessa?). L'AI potrebbe
anche essere istruita per essere a livelli: facile, medio, difficile,
impossibile, ...


