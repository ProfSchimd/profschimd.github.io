---
title: "Campi e metodi di un oggetto"
type: lecture
weight: 20
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/oop
summary: "I mattoni costituenti delle classi sono i campi (le variabili) e i metodi (le funzioni)."
---

Abbiamo visto che una classe definisce *dati* e *operazioni* degli oggetti che
sono istanze di quella classe. In Java e in molti altri linguaggi ad oggetti,
i dati sono le variabili che sono definite dalla classe e vengono chiamati
**campi** (*field*) e le operazioni sono i **metodi** (*method*) definiti nella
classe.

In questa lezione consideriamo l'esempio della classe `Persona` che può essere
usata, ad esempio, in un'anagrafica clienti e nel registro elettronico di una
scuola. Più nello specifico ci limitiamo a descrivere le seguenti caratteristiche
di una persona:
* nome e cognome,
* data di nascita,
* codice identificativo.

## Campi
I campi sono delle variabili associate all'oggetto, ciò significa che ogni istanza
di una classe avrà le proprie variabili. In Java per definire i campi bisogna
indicare il tipo ed il nome della variabile. Opzionale, ma **fortemente raccomandato**
è la *visibilità* della variabile. 

Vediamo il codice Java per definire i campi per la classe `Persona` così come descritto
sopra.

{{<highlight java>}}
public class Persona {
    private int id;
    private String firstName;
    private String secondName;
    private Date birthDate;
}
{{</highlight>}}

{{<attention title="Visibilità dei campi">}}
Anche se i campi può essere qualsiasi tra `private`, `protected` e `public`, è
**rarissimo** avere campi che siano `public`. Per accedere ai campi è molto più
comune (e consigliato) utilizzare dei metodi appositi chiamati *getter* e *setter*.
In questo caso il campo prende anche il nome di **proprietà** (*property*).
{{</attention>}}

## Metodi
I *metodi* sono le operazioni che un oggetto è in grado di eseguire, le istruzioni
e gli algoritmi nei linguaggi orientati agli oggetti sono realizzati mediante metodi.
Spesso i metodi servono unicamente ad accedere in lettura e/o in scrittura ai campi
di una classe, questi metodi si chiamano *getter* per accedere in lettura e
*setter* per accedere in scrittura. La necessità di "nascondere" i campi ed aggiungere
dei metodi per accedervi ha un duplice scopo:
* nasconde i dettagli sui campi,
* prevenire utilizzi indiscriminati implementando nei getter e nei setter dei controlli
sui valori che si possono impostare o, ad esempio, su chi sta cercando di accedere ai
dati.

Vediamo come esempio due getter ed un setter per la classe `Persona` i cui campi sono
stati definiti sopra.
{{<highlight java>}}
public class Persona {
    // ...
    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
}
{{</highlight>}}
In questo esempio vediamo il getter per il campo `id` e getter e setter per il campo
`firstName`. Il fatto che non ci sia un setter peer il campo `id` significa che esso
è accessibile in *sola lettura* cioè il suo valore può essere letto, ma mai modificato
(scritto). Campi (o proprietà) in sola lettura sono spesso utilizzati, in questo caso
si presuppone che `id` non sia mai modificato e quindi non vi sia bisogno di un setter,
ma quando viene assegnato il valore a questo campo?

### Costruttore
Esiste un metodo particolare che viene detto **costruttore** e che, come dice il nome,
ha il compito di "costruire" l'oggetto. In realtà il compito del costruttore è quello
di *riempire* i campi ed effettuare le inizializzazioni necessarie (es. apertura di
file e/o di connessioni). In Java il costruttore è un metodo **senza tipo di di ritorno**

{{<attention>}}
La sintassi del costruttore prevede che **non** venga indicato nulla come tipo di
ritorno. Questo è diverso da indicare un tipo di ritorno `void` che indica un metodo
(non costruttore) che non ritorna nulla.

{{<highlight java>}}
// costruttore: no tipo di ritorno
public Persona(...) { ... }
// metodo: ritorna 'void'
public void doSomething(...) { ... }
// Errore: non si può avere 'void' nel costruttore
public void Persona(...) { ... } 
{{</highlight>}}
{{</attention>}}

## Accedere a campi e metodi (Java)
Fin'ora abbiamo visto come definire campi e metodi, vediamo ora come utilizzare
campi e metodi nel linguaggio Java. Per campi e metodi di istanze (quelli visti
fin'ora), l'accesso ad un campo o ad un metodo avviene utilizzando l'operatore
`.` (*dot* o *punto*) su un'istanza dell classe.

{{<highlight java>}}
Persona p = new Persona(123);
p.getId(); // Operatore '.' per accedere al metodo 'getId'
String name = p.firstName; // operatore '.' per accedere al campo 'firstName'
{{</highlight>}}

Ovviamente, affinché l'operatore `.` possa essere utilizzato, deve essere
possibile accedere al campo o al metodo, in caso contrario viene generato un
errore di compilazione che ci comunica che il campo/metodo richiesto non è
accessibile.

### Visibilità
Un aspetto fondamentale della programmazione ad oggetti è l'*incapsulamento* secondo
cui i dettagli di come sono internamente fatti gli oggetti devono essere nascosti a
chi la classe la usa. Ad esempio, un'anagrafica di persone potrebbe memorizzare le
istanze di `Persona` in un array o in un'altra struttura, magari piè efficiente. Chi
utilizza la classe `Anagrafica`, d'altro canto, utilizzerà dei metodi per accedere ai
dati **indipendentemente da come questi sono gestiti**.

Per garantire l'incapsulamento è possibile i **modificatori di visibilità** associati
a campi e metodi. In Java esistono quattro modificatori: `private`, `protected`, `package`
e `public`. Dettagli su `protected` sono descritti [qui]({{<ref 03-gerarchie-di-classi.md>}})
mentre qui ci occupiamo di `private` e `public` (`package` è usato raramente e non lo
trattiamo).

#### Visibilità `private`
Quando un campo o un metodo viene definito `private`, possono accedervi solo metodi che
sono definiti nella stessa classe

{{<highlight java>}}
public class Persona {
    private String firstName;
    public void printName() {
        System.out.println("Nome: " + firstName); // Ok
    }
}
public class Main {
    public static void main(String[] args) {
        Persona p = new Persona(...);    
       System.out.println("Nome: " + p.firstName); // Errore
    }
}
{{</highlight>}}

#### Visibilità `public`
Quando un campo o un metodo è definito `public` è accessibile da tutto il codice
{{<highlight java>}}
public class Persona {
    public String firstName;
    public void printName() {
        System.out.println("Nome: " + firstName); // Ok
    }
}
public class Main {
    public static void main(String[] args) {
        Persona p = new Persona(...);    
       System.out.println("Nome: " + p.firstName); // Ok
    }
}
{{</highlight>}}

Ovviamente l'utilizzo di `public` per i campi è problematico perché non è conforme
al concetto di *incapsulamento*. Di norma, quindi, i campi sono resi `public` sono
in casi **rarissimi** che devono essere ben motivati (un commento che ne spiega il
motivo è, praticamente, obbligatorio).


## Campi e metodi `static`
Abbiamo visto sopra che i campi sono variabili associati ad ogni singola istanza
di una classe, diciamo per questo che sono *variabili (campi) di istanza*. Questa
significa che istanze diverse possono avere valori diverse, Ad esempio una istanza
`p` della classe Persona potrebbe avere `firstName = "Dave"`, un'altra potrebbe
avere valore `firstName = "Betty"`.

In certi casi può essere utile assegnare una variabile *all'intera classe*, ad esempio
una variabile `numeroPersone` che conta il numero complessivo di persone registrate
nel sistema. Si potrebbe pensare di usare un campo `private int count`, tuttavia
questa crea diversi problemi, vediamone alcuni.
* In memoria ogni istanza avrà una propria variabile, se ci sono un milione di
istanze, ci saranno un milione di variabili tutte, presumibilmente, con lo stesso
valore.
* Quando il valore di `count` cambia questo deve essere cambiato in tutte le istanze,
se ci sono un milione di istanze, questo significa aggiornare un milione di variabili.
L'alternativa è avere alcune variabili aggiornate ed altre no, soluzione come porterà
inevitabilmente a dei problemi.

La soluzione a questo problema è l'utilizzo di **variabili di classe** che in Java si
identificano mettendo la parola chiave `static` tra il modificatore di accesso ed il
tipo di dato ritornato.

{{<highlight java>}}
public class Persona {
    // ...
    public static int count = 0;
    // ...
}
{{</highlight>}}

In Java le variabili di classe si accedono utilizzando il nome della classe anziché
il nome del riferimento all'istanza.

{{<highlight java>}}
public class Persona {
    private int id;
    public static int count = 0;
    public Persona(int id) {
        this.id = id;
        Persona.count++;
    }
}

public class Main {
    public static void main(String[] args) {
        Persona p = new Persona(123);
        System.out.println("Ci sono: " + Persona.count + " persone nel sistema.");
    }
}
{{</highlight>}}

Come le variabili di classi, esistono anche i **metodi di classe**, questi hanno accesso
unicamente alle variabili di classe e non a quelle di istanza. In Java i metodi di
classe si indicano con la parola chiave `static` tra il modificatore di accesso ed il
tipo di dato ritornato. Ovviamente, i metodi `static` di una classe possono accedere
variabili `static` anche se queste sono `private` o `protected`.

{{<highlight java>}}
public class Persona {
    private static int count = 0;
    public static void eliminaEntry(Persona p) {
        // operazioni cancellazione entry 'p'
        Persona.count--; // Ok anche se private
    }
}
{{</highlight>}}