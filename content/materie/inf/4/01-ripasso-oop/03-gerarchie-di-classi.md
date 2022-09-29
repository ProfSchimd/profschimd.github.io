---
title: "Gerarchie di classi"
type: lecture
weight: 30
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/oop
summary: "Le gerarchie di classi permettono di creare classi che possono cambiare ed adattare il loro comportamento secondo le esigenze."
---

## Classi derivate
Una classe descrive il comportamento di un oggetto, tipicamente come una rappresentazione di
qualcosa che esiste nel mondo reale. Ad esempio la classe `Persona` contiene informazioni su
`nome`, `cognome`, ... insieme alle operazioni (*metodi*) che la classe persona è in grado
di eseguire, ad esempio `introduce()`.

Spesso gli oggetti del mondo reale che si rappresentano cone le classi possono essere di *tipo*
diverso. Ad esempio una persona può essere uno studente, un professore, un medico o molto altro.
Si potrebbe pensare che per ogni tipo, si debba usare una classe diversa, oppure che si possa
distinguere il tipo utilizzando un campo che distingue i diversi tipi. Queste soluzioni, tuttavia,
presentano aspetti positivi e aspetti negativi. Nella programmazione ad oggetti, esiste un
meccanismo, chiamato *ereditarietà* che permette di realizzare questo tipo di *sottoclassi* in
modo da ridurre i problemi delle altre soluzioni.

Il concetto di **classe derivata** o **sottoclasse** rappresenta uno degli strumenti più utili
e importanti della programmazione ad oggetti. Con la *derivazione* è possibile aggiungere
funzionalità ad una classe esistente creando una classe che ne *specializza* un'altra.

### Derivazione di classi in Java
In Java la parola chiave per creare una sotto classe è `extends` e si usa dopo il nome della
sottoclasse indicando la classe da cui derivare

{{<highlight java>}}
public class Studente extends Persona {
    // ...
}
{{</highlight>}}
Una classe può essere derivata quante volte si vuole

{{<highlight Java>}}
public class Professore extends Persona {
    // ...
}
{{</highlight>}}
Java **non permette l'ereditarietà multipla**, cioè più *superclassi*

{{<highlight java>}}
/* Errore: java non permette ereditarietà multipla */
public class Professore extends Persona, Dipendente {
}
{{</highlight>}}

{{<attention>}}
In java si possono creare classi senza indicare la superclasse

{{<highlight java>}}
public class Persona {
    // ...
}
{{</highlight>}}

Tuttavia in questo caso è implicita la derivazione da `Object`. In altre parole
il codice sopra è equivalente al seguente

{{<highlight java>}}
public class Persona extends Object {
    // ...
}
{{</highlight>}}
{{</attention>}}

### La **gerarchia** di classi
Il meccanismo di definizione di sottoclassi (chiamato anche *derivazione*) genera una
relazione tra le varie classi coinvolte. Questa relazione viene spesso definita
*gerarchia di classi* perché si presenta come una struttura gerarchica ben definita,
simile all'organigramma di un azienda o alla catena di comando di un'organizzazione
(es. un corpo militare). 

{{<column/two-cols wr="6" wl="6" content="right" embed="img/gerarchia.html">}}
A sinistra si vede il [*diagramma UML delle classi*]() di una semplice gerarchia
di classi alla cui *radice* troviamo la classe `Persona`. Per comodità di rappresentazione,
la figura mostro solo alcuni campi delle classi che, ovviamente, avranno anche dei
metodi (getter, setter, costruttori, ...).

La relazione di sottoclasse viene indicata in UML da una freccia (triangolo vuoto) che
parte dalla sottoclasse e va verso la sua superclasse. Ad esempio dalla classe `Dipendente`
parte una freccia verso la classe `Persona` ad indicare che `Dipendente` è sottoclasse di
`Persona`.

Come si vede una *gerarchia di classi* può avere diversi *livelli*, ad esempio la classe
`Professore` è sottoclasse *diretta* della classe `Dipendente` ed è sottoclasse *indiretta*
della classe `Persona`.
{{</column/two-cols>}}

Nei casi in cui l'ereditarietà sia *singola*, cioè ogni classe può avere al massima una
sola superclasse, la gerarchia di classi prende spesso la forma di un *albero* (in senso
informatico, nel qual caso gli alberi sono "sotto-sopra"). Nell'esempio sopra, la *radice*
dell'albero è la classe `Persona`, le *foglie* dell'albero sono le classi `Studente`,
`Professore` e `ATA`.

#### Il metodo `toString` in Java
Il fatto che in Java la gerarchia di classi abbia come unico inizio la classe `Object`,
permette di utilizzare, in ogni classe, i metodi che sono definiti nella stessa classe
`Object`. Tra gli altri metodi c'è il metodo

{{<highlight java>}}
public String toString() { ... }
{{</highlight>}}

che restituisce una `String` che "descrive" l'oggetto. Questo metodo viene usato dal
metodo `println` usato per stampare a video. In altre parole data una referenza `p`
ad un oggetto di una qualsiasi classe, le due istruzioni sotto sono equivalenti

{{<highlight java>}}
System.out.println(p);
System.out.println(p.toString());
{{</highlight>}}

### Visibilità `protected`
In certe situazioni può essere utile avere un campo o un metodo non visibili al di
fuori della classe (come se fossero `private`), ma visibili nelle sottoclassi (come
se fossero `public`). In queste situazioni è possibile utilizzare il modificatore di
visibilità `protected`.

{{<highlight java>}}
public class Prodotto {
    protected int id;
    // ...
}

public class Servizio extends Prodotto {
    // ...
    @Override
    public int toString() {
        // Ok perché id è dichiarato 'protected' in Prodotto
        return "Servizio: " + id;
    }
}

public class Main {
    public static void main(String[] args) {
        Servizio s = new Servizio();
        // Errore, questa classe non è sottoclasse di Prodotto
        // e id non è 'public', quindi non posso accedervi direttamente
        System.out.println(s.id);
    }
}
{{</highlight>}}

Nell'esempio sopra vediamo come il campo `id` della classe `Prodotto` sia stato
dichiarato `protected`. Così facendo, la classe `Servizio` che estende `Prodotto`
può accedere al campo `id` (in questo caso all'interno del metodo `toString`).
Al contrario, la classe `Main` non è sottoclasse di `Prodotto` quindi **non**
può accedere al campo `id` (potrebbe se questo fosse `public`).

## Catena di costruzione su gerarchia
La struttura gerarchica di classi, sottoclassi, sottoclassi di sottoclassi, ...
determina una relazione tra le classi stesse. In particolare è utile pensare alla
relazione **is a** (*è una*) in riferimento al rapporto tra classe e sottoclassi.
Più nello specifico se `B` è sottoclasse di `A`, allora `B` **is a** `A`, ad
esempio ogni `Studente` è una `Persona` e ogni `Professore` è anche una `Persona`.
Il contrario non è sempre vero **alcune** `Persona` sono `Studente`, ma non tutte;
allo stesso modo `Studente` **non è** `Professore` (e viceversa).

Questo aspetto si riflette anche nel modo in cui le istanze vengono costruite, infatti
se ogni `Studente` è anche una `Persona` ne deve avere tutti i campi e i metodi,
perciò quando ci riferiamo a `Studente` diamo per scontato che campi quali `firstName`
e `birthDate` siano già definiti. Per questo motivo quando si istanzia una classe
**vengono chiamati tutti i costruttori di tutte le classi della gerarchia, dalla
più generica, alla più specifica**. In Java l'istanziazione di un oggetto della classe
`Studente` darebbe luogo alla seguente *catena di chiamate a costruttori*.

1. Per primo viene chiamato il costruttore di `Object` in quanto in Java questa
è sempre la classe base di tutte.

2. Successivamente viene chiamato il costruttore di `Persona` che, se non ha un
`extends` esplicito, sarà sottoclasse di `Object`.

3. Infine viene chiamato il costruttore di `Studente` che è sottoclasse diretta
di `Persona`.

A titolo di esempio si provi il seguente codice (opportunamente divisa in 3 file come indicato)
{{<highlight java>}}
// file: Persona.java
public class Persona {
    public Persona() {
        System.out.println("Costruttore: Persona");
    }
}
// file: Studente.java
public class Studente extends Persona {
    public Studente() {
        System.out.println("Costruttore: Studente");
    }
}
// file Main.java
public class Main {
    public static void main(String[] args) {
        Studente s = new Studente();
    }
}
/*
Output del programma:

Costruttore: Persona
Costruttore: Studente
*/
{{</highlight>}}


## *Casting* attraverso le classi della gerarchia
Sempre in virtù della relazione **is a**, i vari linguaggi orientati agli
oggetti permettono di convertire (*casting*) un tipo in un altro purché
il primo sia in relazione **is a** con il secondo. Ad esempio è sempre
possibile convertire uno `Studente` in una `Persona`, in Java questa conversione
avviene in maniera *implicita*

{{<highlight java>}}
Studente s = new Studente(); // Creo un'istanza di Studente
Persona p = s; // Nessun errore, cast implicito
{{</highlight>}}

Ovviamente il tentativo di convertire un tipo generico, ad esempio `Persona`, in
un tipo più specifico, ad esempio `Studente`, non va a buon fine.

{{<highlight java>}}
// Creo Studente e subito faccio cast implicito
Persona p = new Studente(); 
Studente s = p; // Errore, cast implicito non possibile
{{</highlight>}}

D'altro canto, se questo cast non fosse segnalato come errore si potrebbero fare
delle operazioni senza significato come nel seguente frammento di codice.

{{<highlight java>}}
// Creo Studente e subito faccio cast esplicito
Persona p = new Studente(); 
Professore s = p; // non ha senso!
{{</highlight>}}

In certi casi, tuttavia, può essere utile la conversione da tipo generale a tipo
specifico; Java permette di fare questa conversione purché venga resa *esplicita*.

{{<highlight java>}}
Persona p = new Studente(); 
Studente s = (Studente)p; // Ok, cast esplicito
{{</highlight>}}

Bisogna stare attenti tuttavia che questo cast esplicito può fallire in fase di
esecuzione (in *runtime*) in quanto non è sempre possibile.

{{<highlight java>}}
// Creo Studente e subito faccio cast esplicito
Persona p = new Studente(); 
Professore s = (Studente)p; // compila, ma genera un'eccezione in fase di esecuzione
{{</highlight>}}

### L'operatore Java `instanceof`
Il linguaggio Java (come altri) permette di verificare in fase di esecuzione, se una
referenza è una *istanza* di una classe specificata. Questo permette di evitare le
eccezioni dovute ad un erroneo utilizzo del cast esplicito visto sopra. L'operatore
`instanceof` permette questo test ad accetta una referenza a sinistra ed il nome di una
classe a destra

{{<highlight java>}}
Persona p = new Studente();
System.out.println((p instanceof Persona)); // true
System.out.println((p instanceof Studente)); // true
System.out.println((p instanceof Professore)); // false
System.out.println((p instanceof Object)); // True qualsiasi classe sia p
{{</highlight>}}

Si noti come `instanceof` esegue un test su tutta la gerarchia, infatti viene valutato
`true` un'istanza di `Studente` sia nel test con `Studente` sia nel test con `Persona`.

Vale la pena dire che `instanceof` ha un comportamento non sempre intuitivo, infatti
tutte e tre i test nel codice seguente danno esito `true`.

{{<highlight java>}}
public static void main(String[] args) {       
    System.out.println(args instanceof String[]); // true (ovvio)
    System.out.println(args instanceof Object); // true (sospettoso)
    System.out.println(args instanceof Object[]); // true (i can see that!)
}
{{</highlight>}}
