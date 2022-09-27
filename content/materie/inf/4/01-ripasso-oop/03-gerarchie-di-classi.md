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

## *Casting* attraverso le classi della gerarchia



## Interfacce