---
title: "Structural Patterns"
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/tpsit/design-patterns
weight: 20
---

## Adapter
Il pattern **Adapter** prevede che una classe o interfaccia venga utilizzata per
*adattare* due interfacce "incompatibili". Un caso molto comune di utilizzo
dell'adapter è quando si decide (o si deve) utilizzare una classe di "libreria"
la cui interfaccia non è compatibile con il codice già scritto.

Supponiamo che un software gestionale acceda ai dati mediante un *database* e che
per fare questo usi una libreria con i seguenti metodi

```java
public class DatabaseAccess {
    public Record[] query(String sqlQuery);
}
```

il codice *client* potrebbe utilizzare un'istanza di questa classe nel
seguente modo

```java
// ...
String dbAddress = "db.domain.org";
DatabaseAccess db = connect(dbAddress);
String sql = "SELECT * from PRODUCTS WHERE price < 100;";
for (Record r : db.query(sql)) {
    System.out.println(r);
}
// ...
```

Ad un certo punto potrebbe essere necessario cambiare la libreria di accesso al
database la quale potrebbe avere un'interfaccia un po' diversa, ad esempio

```java
// ...
public class NewDatabaseAccess {
    public void submit(String sqlQuery);
    public List<Record> exec() throws DBError;
}
```

Ovviamente per adattare il codice alla nuova classe si può procedere a cambiare
tutti i punti in cui si accede al database, in alternativa, tuttavia si può
creare una classe `DatabaseAccess` con lo stesso nome della libreria originale e
con la stessa interfaccia. La differenza è che l'implementazione sarà "custom"
e si occuperà di accedere alla nuova libreria.

```java
// Questa è una classe "custom"
public class DatabaseAccess {
    private NewDatabaseAccess db;
    // ...
    public Record[] query(String sqlQuery) {
        List<Record> results = null;
        db.submit(sqlQuery);
        try {
            results = db.exec();
        } catch(DBError r) {
            // ...
        }
        if (results != null) {
            Record[] out = new Record[results.size()];
            results.toArray(out);
            return out;
        }
        return null;
    }
}
```

Una volta creato questo metodo `query()`, l'intero codice client può continuare
a funzionare senza che vi sia necessità di cambiare una sola riga, semplicemente
la classe `DatabaseAccess` ora fa riferimento alla nostra classe custom che,
internamente, utilizza la "nuova" classe `NewDatabaseAccess`.

La classe `DatabaseAccess` così creata viene classe **adapter** perché funge da
"adattatore" tra il codice client e la nuova classe `NewDatabaseAccess`, un altro
nome dell'adapter è **wrapper** in quanto la classe "avvolge" al suo interno i
dettagli della nuova classe.

## Facade
Il pattern **facade** prevede la creazione di un'interfaccia unica componendo
diverse interfacce di un sistema complesso. In questo caso non bisogna intendere
il termine *interfaccia* come un `interface` Java, bensì nel senso di una API
(*Application Programming Interface*).

Supponiamo, ad esempio, di progettare un gioco in cui un personaggio virtuale
interagisce con gli elementi del mondo virtuale in cui si muove. Questi elementi
possono essere diversi: la mappa, altri giocatori, l'inventario, ... Dal punto
di vista della classe `Player`, quindi, potrebbe essere necessario interagire con
altre classi: `Map`, `Player` (altri giocatori), `Inventory`, ... In questo caso
può risultare più comodo avere un interfaccia `World` che permette l'interazione
con un i vari altri oggetti attraverso un'unica *facciata*.

Nell'esempio che segue vediamo una classe `World` offre metodi per l'interazione
con varie parti del gioco. L'interazione (ad esempio `fight`) può coinvolgere
diversi aspetti e diverse altre classi, dal punto di vista del codice client,
questa complessità non è visibile poiché nascosta dalla classe `World` che è, in
questo esempio, la classe *facade* (facciata).

```java
public class World {
    private Player[] players;
    private Map map;

    public void fight(Player attack, Player defense) {
        // Perform a fight between two players
    }
    public void discoverMap(int x, int y) {
        // Discover some new parts of the world
    }

    // ...
}
```

## Proxy
Il **proxy** pattern prevede una classe che possa fungere da "segnaposto" per
un'altra classe. Questo può essere utile, ad esempio, per creare la classe da
sostituire c'è bisogno di tanto tempo oppure di informazione non ancora
disponibile.

Nelle interfacce grafiche, ad esempio, l'operazione di caricamento delle risorse
(da remoto o da file) può richiedere del tempo, durante questo periodo l'interfaccia
potrebbe essere inutilizzabile o non completa poiché in attesa della risorsa
mancante. Anziché bloccare l'esecuzione fino al completamento della richiesta onerosa,
si può utilizzare una classe proxy, veloce di istanziare, che prenda il posto della
classe la cui istanaziazione non è ancora terminata.

The following code shows a `ProxyResource` class and a `TimeConsumiResource` class
both extending the same `Resource` class. In the constructor of `ProxyResource` a
download is started for the *original* resource, while it downloads, the instance
of `ProxyResource` is served. Whenever the original resource is ready, it is used
when needed.

```java
public class ProxyResource extends Resource {
    private Resource res;
    private TimeConsumingResource original;

    public ProxyResource(String url) {
        original = new TimeConsumingResource(url);
        res = this;
    }
    Resource get() {
        if (original.isReady()) {
            res = original;
        }
        return res;
    }
}

public class TimeConsumingResource extends Resource {
    public TimeConsumingResource(String url) {
        // starti downloading  resource
    }

    public boolean isReady() {
        return false;
    }
}
```

