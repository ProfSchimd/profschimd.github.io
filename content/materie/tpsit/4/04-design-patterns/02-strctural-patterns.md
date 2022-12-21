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

## Composite
Compose objects into tree structures to represent part-whole hierarchies. Com- posite lets clients treat individual objects and compositions of objects uniformly.

## Facade
Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.

## Proxy
Provide a surrogate or placeholder for another object to control access to it.

