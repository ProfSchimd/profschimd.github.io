---
title: "Behavioral Patterns"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/design-patterns
weight: 30
---

## Iterator
L'**iterator** pattern prevede che si realizzi un meccanismo per accedere, in modo
sequenziale, agli elementi di una *collezione*, senza che i dettagli circ la
memorizzazione di tali elementi siano noti (o debbano servire per l'accesso).

Ad oggi un meccanismo basato su iterator è presente in pressoché tutti i linguaggi,
spesso realizzati da funzioni o classi di libreria. Prima di passare all'implementazione
di un iterator, vediamo come utilizzarne uno già presente nella libreria Java.

In Java, [`Iterator`](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html) è un'interfaccia con i seguenti metodi (sono presenti anche altri
metodi *opzionali* non discussi qui).

```java
public interface Iterator<E> {
    boolean hasNext();
    E next();
}
```

La notazione `Iterator<E>` indica che `E` è una qualche classe da specificare nel
momento di istanziazione dell'oggetto. Ad esempio `Iterator<String>` è un `Iterator`
su oggetti di tipo `String`, si noti come il metodo `next()` restituisce `E`, nel
nostro esempio il metodo restituirebbe `String`.

L'utilizzo di tale interfaccia è semplice

```java
public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<String>();
        names.add("Alice");
        names.add("Bob");
        names.add("Carol");
        names.add("David");

        Iterator<String> it = names.iterator();
        while(it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

Il codice sopra utilizza il metodo `iterator` della classe `ArrayList` per ottenere
un'iterator sugli elementi memorizzati nella lista. In Java un oggetto può implementare
la classe `Iterable<E>` contiene il seguente metodo

```java
Iterator<E> iterator();
```

una volta che una classe implementa talle interfaccia, si può usare il *foreach* di Java,
in questo modo il codice sopra può essere modificato nel seguente

```java
public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<String>();
        names.add("Alice");
        names.add("Bob");
        names.add("Carol");
        names.add("David");

        for(String s : names) {
            System.out.println(s);
        }
    }
}
```

Il risultato è lo stesso, ma ora non è necessario utilizzare esplicitamente una
variabile di tipo `iterator`, il costrutto `for(... : ...)` presente in Java si
occupa di tutto.

{{<observe>}}
Nell'esempio sopra si è utilizzata la classe `ArrayList` di Java, ma questo non
rappresenta un vincolo, una qualsiasi classe che implementi l'interfaccia `Iterable`
si utilizza allo stesso modo. In questo modo si riesce a *disaccopiare* i dettagli
di memorizzazione degli elementi dalla lora scansione sequenziale, questo è uno dei
più grandi vantaggi dell'iterator pattern.
{{</observe>}}

### Creazione di un iterator in Java
Le interfacce `Iterator` e `Iterable` possono essere anche utilizzate per creare
delle classi *iterabili* mediante utilizzo di un *iterator* custom. Il seguente
codice mostra un esempio di una classe `Stack` che implementa l'interfaccia
`Iterable` (definendo `Object` come contenuto della classe anziché il *generic*
`E`) e che utilizza una classe interna `StackIterator` la quale implementa
l'interfaccia `Iterator`.

```java {linenos=table}
import java.util.Iterator;

public class Stack implements Iterable<Object> {
    public class StackIterator implements Iterator<Object> {
        private Stack stack;
        private int i;
        public StackIterator(Stack stack) {
            this.stack = stack;
            i = stack.top;
        }
        @Override
        public boolean hasNext() {
            return i>0;
        }
        @Override
        public Object next() {
            return (i>0) ? stack.content[--i] : null;
        }
    }
    private static int ARRAY_SIZE = 65536;
    private Object[] content;
    private int top;
    public Stack() {
        content = new Object[ARRAY_SIZE];
        top = 0;
    }
    public void push(Object o) {
        content[top++] = o;
    }
    public Object pop() {
        return content[top--];
    }
    public int size() {
        return top;
    }
    public boolean isEmpty() {
        return (size() == 0);
    }
    public Iterator<Object> iterator() {
        return new StackIterator(this);
    }
    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.push("Alice");
        stack.push("Bob");
        stack.push("Carol");
        stack.push("David");
        for (Object object : stack) {
            System.out.println(object);
        }
    }
}
```

L'implementazione di `StackIterator` si limita a memorizzare un riferimento allo
`Stack` su cui iterare ed un indice `i` con cui tenere traccia del punti a cui
l'iterator è arrivato.

{{<important>}}
Il codice sopra è stato creato a scopo didattico, **normalmente non è possibile
iterare su uno stack senza svuotarlo**, in questo caso per scopi puramente didattici
è stato creato un iterator che passa in rassegna il contenuto dello stack senza
eseguire nessuna operazione `push`.
{{</important>}}

{{<attention>}}
La classe `StackIterator` mostrata sopra accede direttamente all'array `content`
che è un campo privato della classe `Stack`. Questo modo di accedere agli elementi,
pur essendo efficace (e molto usato) presenta un problema, cosa succede se durante
l'utilizzo di uno `StackIterator` l'oggetto `Stack` a cui questo si riferisce viene
modificato (ad esempio mediante un `pop`)? In questo caso non è più possibile
garantire il corretto comportamento dell'iterator, ci sono due modi per affrontare
questo aspetto:

* ignorare questo problema nel qual caso l'utilizzo di un iterator dopo aver modificato
la struttura a cui fa riferimento porta ad un *comportamento imprevedibile*;
* *invalidare* l'iterator esplicitamente in modo da "impedire" (segnalando, ad esempio
con un eccezione, che l'iterator è in uno stato `INVALID`).

Spesso si sceglie di ignorare il problema in quanto l'implementazione del
meccanismo di "invalidazione" di un iterator risulta troppo complesso. In generale
**è buona norma non modificare una struttura mentre si itera su quella** oppure
**smettere di iterare quando si esegue una modifica**.
{{</attention>}}

## Observer
Il pattern **observer** definisce una dipendenza *uno-a-molti* tra un oggetto che
cambia proprio stato ed altri oggetti che reagiscono automaticamente a tale
cambiamento.

Il pattern prevede che vi siano due parti di codice (ad esempio due classi):
* un *subject* il quale è il "soggetto" del cambiamento di stato ed
* uno o più *observer* i quali "osservano" il cambiamento di stato del *subject*
reagendo a tali cambiamenti, se necessario.

Una classica applicazione del pattern observer è nelle interfacce grafiche (GUI)
dove gli elementi visualizzati a schermo dipendono dallo stato interno (ad
esempio di una classe) al cambiare del quale, anche gli elementi devono cambiare
e devono, quindi, essere ridisegnati (*re-rendered*).

### Realizzazione in Java dell'*observer* pattern 
Il linguaggio Java offriva, fino alla versione 8, la classe
[`Observable`](https://docs.oracle.com/javase/8/docs/api/java/util/Observable.html)
e l'interfaccia [`Observer`](https://docs.oracle.com/javase/8/docs/api/java/util/Observer.html)
per l'implementazione, rispettivamente, del *subject* e dell'*observer*, dalla
versione 9 queste sono state *deprecate* perché considerate poco flessibili.

Vediamo una semplice implementazione Java del pattern *observer* utilizzando
una classe per il *subject* ed una classe per l'*observer*, ognuna delle classi
implementerà un'interfaccia apposita. Per rendere la descrizione più concreta,
affronteremo il problema utilizzando un esempio.

Consideriamo la lista delle *notifiche* di un sistema, ad esempio di uno smartphone,
ogni qualvolta un'applicazione inserisce una nuova notifica, il sistema deve
reagire inserendo un nuovo elemento grafico all'interfaccia di visualizzazione
delle notifiche. In questo caso il *subject* è una classe `NotificationList` che
mantiene uno stato interno (ad esempio una lista di notifiche) e l'*observer* e
la classe `NotificationManager` del sistema operativo.

Le due interfacce per *subject* e *observer* sono le seguenti.

```java
public interface ISubject {
    public void addObserver(IObserver observer);
    public void removeObserver(IObserver observer);
}
public interface IObserver {
    public void updateFrom(ISubject subject);    
}
```

L'interfaccia `ISubject` permette di aggiungere e rimuovere observer, l'interfaccia
`IObserver` contiene un singolo metodo che un `ISubject` chiama ogni volta che
deve notificare un cambiamento nel proprio stato interno.

La classe `NotificationList` che implementa l'interfaccia `ISubject` ha la seguente
implementazione

```java
import java.util.ArrayList;

public class NotificationList implements ISubject {
    private ArrayList<IObserver> observers;
    private Object state;
    @Override
    public void addObserver(IObserver observer) {
        observers.add(observer);        
    }
    @Override
    public void removeObserver(IObserver observer) {
        observers.remove(observer);
    }
    private void notifyObservers() {
        for(IObserver observer : observers) {
            observer.updateFrom(this);
        }
    }
    public void setState(Object newState) {
        state = newState;
        notifyObservers();
    }
    public Object getState() {
        return state;
    }
```

La classe `NotificationManager` che implementa l'interfaccia `IObserver`
ha la seguente implementazione.

```java
public class NotificationManager implements IObserver {
    @Override
    public void updateFrom(ISubject subject) {
        // Code to change based on the updated state
    }

}
```

