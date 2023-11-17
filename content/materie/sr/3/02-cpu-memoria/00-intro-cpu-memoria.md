---
title: "Calcolatori digitali: componenti base"
running_title: Componenti digitali
type: lecture
weight: 50
summary: "Prima di analizzare in dettaglio il funzionamento dei vari componenti di un calcolatore elettronico, è importante acquisire familiarità con alcuni concetti di base."
---

## Circuiti e porte logiche

All'intero di un calcolatore digitale si trovano componenti, tipicamente basati su *transistor* assemblati in modo da ottenere un *circuito logico*. Un circuito logico è composto da diverse *porte logiche* le quali possono essere di vario tipo.
* Porte `NOT` invertono il valore di ingresso.
* Porte `AND` eseguono l'and tra i valori di ingresso.
* Porte `OR` eseguono l'or tra i valori in ingresso.
* Porte `XOR` eseguono l'or esclusivo tra i valori di ingresso.

Porte e circuiti logici sono solitamente descritti da **tabelle di verità**, una tabella di verità ha una colonna per ogni input e output e tante righe quante sono le combinazioni possibili di input. Essendo gli input valori binari, se abbiamo \\( n \\) abbiamo \\( 2^n \\) righe.

L'immagine sotto mostra le principali porte logiche, il loro simbolo grafica e la tabella di verità della corrispondente funzione logica.

{{<include "img/porte-logiche.html">}}

Combinando opportunamente porte logiche è possibile creare qualsiasi *funzione logica* (o *funzione booleana*) cioè una funzione che ha input e output binari.

### Addizionatore
Come esempio di funzione booleana consideriamo un **assizionatore** (*adder*) a 4 bit. Cominciamo considerando la somma di due bit considerando anche il *riporto*, questo circuito logico si chiama **full adder** ed è il primo mattone per costruire un sommatore a più bit.

{{<column/columns>}}
{{<column/col>}}
A fianco vediamo la tabella di verità per la somma (`S`) binaria tra `A` e `B`, oltre al valore della somma (terza colonna `S`) abbiamo anche il valore del *riporto* (quarta colonna `C` - **C**arry)

Vediamo che quando gli input non sono tutte e due a 1, il valore del riporto è zero (la somma è 1 se almeno uno dei due numeri è 1). Il riporto vale 1 quando `A=B=1` nel qual caso la somma è zero.

Confrontando le colonne `S` e `C` con le funzioni logiche sopra vediamo che:
* la colonna `S` è uguale alla colonna risultato dell'`XOR`,
* la colonna `C` è uguale alla colonna risultato dell'`AND`.

È quindi possibile realizzare il circuito di *adder* (a volte chiamato anche *half adder*) utilizzando le porte `XOR` e `NOR` come nel circuito mostrato a fianco.

{{</column/col>}}
{{<column/col>}}
{{<table>}}
| A | B | S | C |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

{{</table>}}
{{<include "img/half-adder.html">}}
{{</column/col>}}
{{</column/columns>}}

{{<observe>}}
Le colonne `S` e `C` possono sembrare "strane", ma se consideriamo la somma tra numeri decimali si capisce meglio il significato. Prendiamo la somma di `3` e `1`, questo produce `4` con riporto `0`, la somma di `9` e `1` produce `0` con riporto `1` (il cui risultato è `10`).
{{</observe>}}

{{<column/two-cols wl=8 wr=4 embed="img/full-adder.html" content="left">}}
Il problema del circuito sommatore sopra è che non si può usare per sommare due cifre e il riporto, in questo caso avremmo tre input: due cifre e un riporto. Per eseguire questa operazione abbiamo quindi bisogno di un altro circuito che prende il nome di **full adder** è che è mostrato nella figura a fianco.
{{</column/two-cols>}}

{{<exercise>}}
Partendo dallo schema del *full adder* ricavare la tabella di verità avendo come input i due biti da sommare `A` e `B` e il riporto precedente `Cin` mentre come output la somma `S` e il riporto `Cout`.
{{</exercise>}}

## Memoria e registri

{{<column/two-cols wl=8 wr=4 content="left" embed="img/latch.html">}}
Senza andare in dettaglio, è possibile utilizzare porte logiche per creare *celle di memoria*, cioè dei circuiti che mantengono un bit memorizzato. Uno di questi circuiti viene chiamato **latch** ed è mostrato nella figura a fianco.

Senza spiegarne il funzionamento, notiamo che esistono dei *collegamenti di feedback* ciè che riportano l'uscita all'ingresso. Questi collegamenti sono quelli che permettono di mantenere il valore "memorizzato" (riprendendo l'uscita come ingresso).
{{</column/two-cols>}}

Il circuito latch mostrato sopra permette di memorizzare un singolo bit, ovviamente utilizzando un numero \\( b\\) (ad esempio \\(b=64 \\)) di questi circuiti, è possibile creare dei **registri** che sono delle piccole zone di memoria utilizzate all'interno della CPU, della memoria o di altri componenti di un sistema di elaborazione.

## Clock
Il clock (orologio) è un elemento fondamentale in un sistema digitale, esso permette di scandire il tempo in modo che le varie operazioni vengono eseguite in sequenza (una dopo l'altra) senza sovrapporsi. Una spiegazione più approfondita sul clock si trova in [questa lezione]({{<ref "04-clock.md" >}}).

## Riferimenti

* [Porte logiche interattive](https://www.101computing.net/logic-gates-studio/)
* [Porte logiche in Minecraft](https://www.youtube.com/watch?v=9EY_XoEImjM)

