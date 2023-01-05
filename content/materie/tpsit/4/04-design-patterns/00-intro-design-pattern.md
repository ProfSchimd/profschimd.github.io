---
title: Introduzione ai Design Pattern
running_title: Introduzione
type: lecture
weight: 1
summary: "In questa lezione si presentano i design pattern che vengono affrontati in questo modulo. Pur non rappresentando una lista esaustiva, i pattern qui menzionati (trattati in dettaglio nelle seguenti lezioni) coprono un significativo numero di situazioni di progettazione software."
---

Per comodità di trattazione, dividiamo i pattern in due categorie
* pattern di *programmazione* e
* pattern *architetturali*.

Questa suddivisione si basa sull'idea che, mentre i pattern di programmazione
forniscono principi sullo sviluppo del software inteso come stesura del codice,
i pattern architetturali forniscono dei principi su come il software va
strutturato (più che come va scritto il codice). Volendo fare un parallelo con
la progettazione di un automobile, mentre i pattern di programmazione indicano
come risolvere i problemi di assemblaggio dei vari pezzi, i pattern architetturali
indicando come è meglio disporre le varie parti dell'auto in modo che l'assemblaggio
sia più agevole.

## Pattern di programmazione: *The Gang of Four*

{{<include "img/gamma-patterns.html">}}

### Creational pattern

* [**Abstract Factory**]({{< ref "01-creational-patterns.md#abstract-factory" >}}):
prevede un meccanismo (ad esempio un metodo) che generi un insieme di classi che
sono tra loro interdipendenti, ma la cui classe concreta è nota solo in *runtime*.
* [**Builder**]({{< ref "01-creational-patterns.md#builder" >}}): separa la
costruzione di un oggetto complesso dalla sua rappresentazione.
* [**Factory Method**]({{< ref "01-creational-patterns.md#factory-methods" >}}):
prevede un metodo che viene utilizzato per istanziare un oggetto utilizzando la
sottoclasse opportuna in base al *runtime*.
* **Prototype**: prevede che vi sia un'istanza *prototipo* dalla quale creare
nuove oggetti. 
* [**Singleton**]({{< ref "01-creational-patterns.md#singleton" >}}): prevede che
 una classe possa avere al massimo un'istanza.

### Structural pattern
* [**Adapter**]({{< ref "02-structural-patterns.md#adapter" >}}): prevede che una
classe o un'interfaccia venga utilizzata per *adattare* due classi o interfacce
"incompatibili".
* **Bridge**: rende un concetto astratto (ad esempio una classe) indipendente
dalla sua realizzazione concreta in modo che questi possano variare separatamente.
* [**Composite**]({{< ref "02-structural-patterns.md#composite" >}}): compone
oggetti utilizzato una struttura gerarchica in modo che possano essere utilizzati
in modo uniforme.
* **Decorator**: aggiunge ad un oggetto funzionalità in maniera *dinamica* e non
durante la fase di stesura e compilazione del codice.
* [**Facade**]({{< ref "02-structural-patterns.md#facade" >}}): crea un'interfaccia
unica componendo diverse interfacce.
* **Flyweight**: Condivide l'implementazione di funzionalità tra diversi oggetti.
* [**Proxy**]({{< ref "02-structural-patterns.md#proxy" >}}): Prevede una classe
che si "interpone" tra due classi.

### Behavioral pattern
* **Chain of Responsibility**: definisce in maniera chiara chi è responsabile di
gestire un "messaggio" (ad esempio un comando).
* **Command**: incapsula una richiesta all'interno di un oggetto.
* **Interpreter**: prevede un meccanismo di traduzione per uno specifico linguaggio.
* [**Iterator**]({{< ref "03-behavioral-patterns.md#iterator" >}}): prevede un
metodo per accedere, in modo sequenziali, agli elementi di una collezione, senza
conoscere i dettagli di memorizzazione di tali elementi.
* **Mediator**: prevede un oggetto che incapsula il comportamento di un altro
oggetto permettendo di variare le varie parti in modo indipendente.
* **Memento**: pur mantenendo l'incapsulamento, cattura lo stato interno di un
oggetto per il suo salvataggio e successivo ripristino.
* [**Observer**]({{< ref "03-behavioral-patterns.md#observer" >}}): definisce una
dipendenza uno-a-molti tra un oggetto che cambia stato e più altri oggetti che
reagiscono automaticamente a questo cambio di stato.
* **State**: permette ad un oggetto di cambiare il proprio comportamento in base
al proprio stato interno (come se cambiasse classe).
* **Strategy**: definisce ed incapsula diversi algoritmi per risolvere lo stesso
problema permettendone l'uso in modo intercambiabile.
* **Template Method**: definisce lo "scheletro" di un algoritmo lasciando alle
sottoclassi l'intera realizzazione dell'algoritmo.
* **Visitor**: prevede un'operazione che verrà eseguita sui vari elementi di una
struttura.

## Pattern architetturali

### Model-View-Control (MVC)

### Model-View-Viewmodel (MVVM)

### Client-Server