---
title: Diagramma della classi UML
running_title: "Diagrammi delle classi"
type: lecture
weight: 100
---

## Cose'è il diagramma delle classi
Il **diagramma delle classi**
UML serve a descrivere le classi di un
progetto e la relazione tra di esse (es. ereditarietà). Il diagramma
delle classi risulta molto comodo quando il progetto contiene molte
(10 o più) classi per cui il codice è costituito da centinaia di
righe. In questo caso avere un diagramma delle classi. Il diagramma
delle classi contiene tutte le informazioni riguardanti gli attributi
(`public`, `private` e `protected`) e tutti i metodi (public private e
protected) di una classe.

### Esempio: la classe Java `PCB`

{{<column/two-cols wr=6 wl=6 content="left" embed="img/uml_pcb_class.html">}}
A destra si vede il diagramma delle classe PCB (*Process Control
Block*). Il diagramma contiene tre parti. 
1. *Nome* della classe (in alto), ``PCB`` nell'esempio
2. *Attributi* della classe (al centro), nell'esempio vediamo 5 attributi: ``processId``, ``processName``, ... 
3. *Metodi* della classe (in basso), nell'esempio ``PCB(...)``, ``getPID()``, ... Per ogni metodo vengono anche indicati nome e tipo delle variabili.
{{</column/two-cols>}}

## Tipi di attributi e metodi
Il diagramma delle classi UML dà la possibilità di indicare
1. Il tipo di ogni attributo. Ad esempio `+process : int`
2. Il tipo ritornato da un metodo. Ad esempio `+getPID() : int`
3. Il tipo di tutti i parametri di un metodo (se presenti). Ad esempio `+setProgramCounter(pc : int)`

## Accessibilità dei membri
Il diagramma delle classi UML permette di indicare per attributi e metodi il livello di accessibilità (scope). Come Java, UML prevede quattro livelli di accesso ai dati.
* public `+`
* private `-`
* protected `#`
* package `~`