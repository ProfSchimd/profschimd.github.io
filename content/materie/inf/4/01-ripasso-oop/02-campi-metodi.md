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

## Campi e metodi `static`

## Accedere a campi e metodi (Java)
Fin'ora abbiamo visto come definire campi e metodi di istanza e di classe (questi
ultimi con `static`). Vediamo ora come utilizzare campi e metodi di una classe
nel linguaggio Java.
