---
title: "Concetti base programmazione ad oggetti"
type: lecture
weight: 10
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/oop/bank
summary: "Riepilogo dei più importanti concetti della programmazione ad oggetti."
---

## Perché la programmazione ad oggetti
Lo scopo di un programma, molto spesso, è creare uno strumento che
descriva un qualche aspetto del mondo reale oppure di un mondo
virtuale.
{{<example>}}
Ad esempio, il software di una banca descrive i propri
clienti e i loro conto correnti, le filiali, i dipendenti (manager,
sportellisti, addetti all'ICT, ...). Come secondo esempio consideriamo
un gioco di ruolo crea un mondo virtuale composto da avatar, oggetti,
entità (nemici, agenti atmosferici, ...), regole e molti altri aspetti.
{{</example>}}
Trasformare questi aspetti del mondo (reale o virtuale) in codice è il
compito del programmatore, tale compito può essere reso più semplice e
naturale se si adotta un approccio di *programmazione orientata agli
oggetti* (che indicheremo con **OOP** dalla sigla inglese *Object
Oriented Programming*).

Immaginiamo un linguaggio di programmazione non ad oggetti che ci permetta
di usare solo variabili e funzioni (ad esempio il linguaggio C, anche se
oggi esistono versioni di C ad oggetti, oltre a C++). E prendiamo un semplice
esempio di un conto corrente bancario. Il conto corrente avrà associate
diverse proprietà, sicuramente un saldo che indichiamo con `amount` ed un
numero, che indicheremo con `number`. Se usassimo un linguaggio puramente
funzionale (senza oggetti) dovremmo creare delle funzioni `withdraw` per il
prelievo che prende (almeno) i due parametri `number` e `cash` per indicare
che vogliamo prelevare la quantità `cash` dal conto corrente di numero `number`.
La funzione, dovrà accedere ai dati relativi all'account `number`, controllare
la disponibilità per il prelievo ed infine effettuare l'operazione, se possibile.

{{<highlight c>}}
struct BanckAccount {
    int number;
    double amount;
};
// the next array is defined and created somewhere else
BankAccount accounts[TOTAL_ACCOUNT];
// withdraw operation returns 0 if ok, an error code otherwise
int withdraw(int acc_num, double cash) {
    if (accounts[acc_num].amount >= cash) {
        accounts[acc_num].amount -= cash;
        return 0;
    }
    return 1; // code for 'not enough money'
}
{{</highlight>}}

Sebbene il codice sopra non sembri particolarmente problematico notiamo che:
* l'array `accounts` deve essere definito e riempito "a parte" rispetto alle
funzioni che ne fanno uso;

* ogni funzione tipo `withdraw()` che deve *manipolare* gli elementi dell'array
deve sapere quale elemento accedere;

* in generale, non si capisce in modo chiaro che withdraw è un'operazione
strettamente legata ad un account (si potrebbe modificare la funzione accettare
come input una variabile `BankAccount`, ma anche in questo caso le due cose
sarebbero separate).

Nella programmazione ad oggetti le "entità" che popolano il programma sono
**oggetti in grado di mantenere un proprio stato interno e di eseguire ben
specifiche operazioni**. Nell'esempio del conto corrente bancario, l'oggetto
avrebbe un proprio *stato* determinato da `number` e `amount` e sarebbe in
grado di operare, ad esempio mediante un'operazione (chiamato anche *metodo*)
che cambia lo stato.

{{<highlight java>}}
public class BankAccount {
    private int number;
    private double amount;
    
    public boolean withdraw(double cash) {
        if (amount >= cash) {
            amount -= cash;
            return true;
        }
        return false;
    }
}
{{</highlight>}}

Vediamo cosa abbiamo "guadagnato" con la programmazione ad oggetti:
* quando creiamo un oggetto della classe `BankAccount`, tutti i suoi dati
vengono automaticamente associati a quell'istanza (vedi
[Classe e istanza]({{<ref "#classe-e-istanza">}}) più sotto);

* oltre ai dati anche le funzionalità (ad esempio `withdraw()`) vengono
automaticamente associate all'istanza;

* risulta evidente cosa sia un `BankAccount`, vale a dire l'insieme di
proprietà, detti **campi** e funzioni, detti **metodi** che descrivono
cosa è e come si comporta un `BankAccount`. Per individuare campi e metodi
di una classe, basta vedere cosa è compreso tra le graffe `{...}`
corrispondenti a `BankAccount`.

## Classe e oggetto
Spesso si tende a confondere i concetti di *classe* e *istanza*, questo non
solo è un errore, ma indica che i concetti della programmazione ad oggetti
non sono del tutto chiari. In una frase potremmo dire che **la classe è
la descrizione di come sono fatti e come si comportano gli oggetti che sono
istanza della classe**. Nell'esempio del conto corrente bancario la classe,
che si vede nel codice sopra, rappresenta la descrizione, nel nostro caso
questa descrizione ci dice che:
1. la classe si chiama `BankAccount` ed ha una visibilità `public`;
2. la classe contiene due *campi*: `number` (tipo `int`) e `amount` (tipo `double`)
entrambi con visibilità `private`;
3. la classe ha un *metodo* `withdraw` che restituisce un `boolean` e che accetta
un parametro di tipo `double` denominato `cash`.

La creazione di oggetti avviene mediante l'*istanziazione* della classe, questo
processo crea un oggetto o istanza di tipo indicato dalla classe che si istanzia
che, di conseguenza, ha tutte le caratteristiche (campi e metodi) di quella classe.
Il seguente codice istanzia due oggetti di tipo `BankAccount` sopra definito, i due
oggetti sono riferiti dalle variabile `account1` e `account2`. Per completezza
le due istruzione di istanziazione sono inserite in un metodo `main`.
{{<highlight java>}}
public static void main(String[] args) {
    BankAccount account1 = new BankAccount();
    BankAccount account2 = new BankAccount();
}
{{</highlight>}}

Gli **oggetti** `account1` e `account2` sono entrambe istanze della **stessa classe**
`BankAccount`. Per questo motivo si *comportano allo stesso* e *contengono lo stesso
tipo di dati* permettendo le *stesse operazioni*. Tuttavia `account1` e `account2` sono
oggetti (istanze) diversi della classe `BankAccount`. Dopo che sono state fatte delle
operazioni, il valore di `amount` sarà diverso nei due casi. Anche il valore di `number`
sarà, in una implementazione completa della classe `BankAccount`, diverso. Possiamo a
questo punto proporre una definizione per i concetti di classe e di oggetto.

{{<def title="Classe e Oggetto">}}
Una **classe** è la definizione dei *dati* e delle *operazioni* alla quale ogni *istanza*
della classe deve essere conforme. Un **oggetto** è un *istanza* di una data classe (a
volte chiamata *tipo*) che, di conseguenza, è conforme ai dati ed alle operazioni che sono
definite dalla classe stessa.
{{</def>}}

## Incapsulamento
Un concetto importante nella programmazione ad oggetti è quello di **incapsulamento**
(*encapsulation*) a volte chiamato *information hiding*. L'idea è che un oggetto dovrebbe
essere visto come una "scatola nera" che ha un certo comportamento. I dettagli su come
il programmatore ha deciso di implementare questo comportamento dovrebbero essere
nascosti. Un esempio nel caso della classe `BankAccount` è il numero identificativo.
Tale numero è solitamente un intero di 12 cifre con parecchi zeri iniziali, es. 
`000000001234`. Un programmatore potrebbe decidere di utilizzare il tipo `int` (come
nell'esempio sopra) sapendo però che in certi casi (ad esempio nella composizione
dell'IBAN), il numero di conto corrente deve contenere tutti gli zeri iniziali (cosa
che Java omette quando stampa il numero, nel nostro caso la stampa darebbe `1234`).
Per questo motivo, un altro programmatore potrebbe suggerire che è meglio usare una
stringa per il numero di conto corrente. Indipendentemente dalla scelta, il numero di
conto corrente deve permettere l'identificazione univoca all'interno del sistema
informatico della banca, sia che usi un `int`, sia che si usi una `String`. A meno che
non sia necessario fare operazioni tra numeri di conto corrente (cosa che non ha, in
generale, senso), la scelta del tipo non è importante e i dettagli di implementazione
possono rimanere nascosti.

Altro esempio potrebbe riguardare il metodo di memorizzazione della variabile `amount`.
Nel nostro caso abbiamo scelto un `double`, ma avremmo potuto scegliere un intero che
rappresenta i centesimi e poi convertirlo in numero con virgola.

{{<highlight java>}}
public class BankAccount {
    // ...
    private int amount;
    // ...
    public double getAmount() {
        return ((double)amount) / 100.0;
    }
}
{{</highlight>}}

Un programmatore che usa la classe `BankAccount` potrebbe pensare che nella classe
la variabile `amount` (di cui tipicamente lui non sa il nome) è definita come
`double` e non come `int`. Infatti tutto ciò che può utilizzare il programmatore
è il metodo **pubblico** `getAmount()` che restituisce un `double`. In altre parole
tutto sarebbe identico se la classe fosse definita come segue.

{{<highlight java>}}
public class BankAccount {
    // ...
    private double amount;
    // ...
    public double getAmount() {
        return amount;
    }
}
{{</highlight>}}

## Esercizi
{{<exercise>}}
Immagina un gioco online in cui, tra le altre cose, esiste un'entità player alla quale
è associata una classe `Player`.
1. Descrivi almeno 3 campi che la classe `Player` potrebbe contenere.
2. Descrivi almeno 2 metodi che la classe `Player` potrebbe contenere.
3. Realizza in Java (o in altri linguaggi OOP) la classe `Player` con i
campi e metodi descritti ai punti precedenti.
4. Crea almeno 3 istanze (oggetti) della classe `Player` creata al punto
precedente.
{{</exercise>}}