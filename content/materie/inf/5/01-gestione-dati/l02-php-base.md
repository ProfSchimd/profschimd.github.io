---
title: "Laboratorio 2: Basi di PHP e parsing JSON"
running_title: PHP Base
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/5/INF.5.01/L01.PHPBase
weight: 2000
summary: "In questo laboratorio si imparerà la sintassi base del linguaggio PHP ed il suo utilizzo per il parsing di file JSON."
---

## Cos'è PHP
PHP (acronimo ricorsivo *PHP: Hypertext Preprocessor*) è un linguaggio di scripting *server-side* progettato per essere inserito (*embedded*) all'interno di codice HTML.

- **Server-side** eseguito lato server (a differenza di Javascript eseguito lato client).
- **Embedded** il codice PHP è scritto "in mezzo" al codice HTML

```phtml
<!DOCTYPE html>
    <html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <?php echo("Hi, I'm a PHP script!"); ?>
    </body>
</html>
```

Il funzionamento di PHP è molto semplice ed è riassunto nello schema sotto.

{{<include "img/php_to_html.html">}}

1. Il codice PHP scritto dallo sviluppatore viene processato da un web server, ad esempio Apache.
2. Il web server esegue le istruzioni PHP e produce un file HTML **senza più codice PHP**.
3. Il codice HTML risultante viene spedito al client come un normale file `.html`.

Prima di passare alla sintassi PHP, vediamo alcuni vantaggi di utilizzare un linguaggio di scripting server-side.
- Il codice in esecuzione sul server ha accesso alle risorse che sono memorizzati sul server. Inoltre il codice può modificare tali risorse.
- Il codice è eseguito in un ambiente controllato (il server) ed è quindi meno esposto a vulnerabilità (sebbene non ne sia completamente esente).
- Non c'è bisogno di particolare software lato client in quanto questo riceve solo HTML.
- Operazioni che richiedono molte risorse possono essere fatte dal server anziché dal client che, solitamente, non ha hardware particolarmente performante.

{{<important>}}
Sebbene nato come scripting per HTML, PHP può essere usato per qualsiasi tipo di file. Il seguente esempio mostra come inserire codice PHP all'interno di un file JSON.

```phtml
<?php header('Content-type: application/json'); ?>
{
	"name": <?php echo('"My name"'); ?>
}
```

La prima riga

```php
<?php header('Content-type: application/json'); ?>
```

indica che il `body` della [risposta HTTP]({{< ref "http.md#la-risposta-http" >}}) conterrà un file JSON anziché un file HTML.

All'interno del file JSON (*inline*) viene inserito il codice PHP per generare contenuto dinamicamente. Va tuttavia notato che **questo utilizzo di PHP è poco frequente** poiché esistono modi migliori per generare file JSON dinamicamente.

{{</important>}}

## Sintassi base PHP
Il codice PHP generalmente si scrive all'interno di file `.php` i quali contengono normale codice HTML "interrotto" da frammenti di codice PHP. Il motore PHP (as esempio Apache), fa il *parsing* del codice e si attiva quando incontra codice PHP che deve essere segnalato. Per inserire codice PHP in HTML si utilizzano i tag `<?php` e `?>` per aprire e chiudere, rispettivamente, un frammento PHP.

```phtml
<p>
    Codice <code>HTML</code> <br>
    <?php echo("Codice <code>PHP</code>"); ?>
</p>
```

Il codice sorgente HTML ottenuto dal browser non contiene alcuna traccia del codice PHP e dei tag di apertura e chiusura.

```html
<p>
    Codice <code>HTML</code> <br>
    Codice <code>PHP</code>
</p>
```

### Istruzioni e commenti
Le istruzioni PHP sono {{<mark>}}separate{{</mark>}} da un punto e virgola `;`, dimenticarlo è un errore che provoca l'interruzione del parsing e l'output di una pagina di errore.

{{<attention>}}
Il punto e virgola **separa** istruzione e **non le termina**, questi significa che:
- una singola istruzione (non essendo da separare) può non avere il `;` finale,
- l'ultima istruzione può non avere il `;` finale.

Tuttavia è consigliabile **usare sempre il `;`, anche quando non sarebbe strettamente necessario**, in questo modo si evitano errori soprattutto se si aggiungono istruzioni e/o si spostano/copiano parti di istruzioni.
{{</attention>}}

Ci sono due tipi di commenti in PHP (stile Java e C++):
- commenti su singola riga: iniziano con `//` o `#` (*script style*) e terminano alla fine della riga,
- commenti su blocco: iniziano con `/*` e terminano con `*/`

```phtml
<?php
echo("Segue un commento su riga <br>"); // Commento su riga
echo("Altro commento su riga, usando # <br>"); # Commento su riga stile script
echo("Segue un commento su più righe <br>"); /* Il commento può iniziare a metà riga
e prosegue fino ad incontrare il PRIMO terminatore */
?>
```

Essendo parte del codice PHP **i commenti non vengono scritti nell'HTML restituito al browser** e non saranno quindi visibili lato client.

### Variabili e Tipi
Le variabili PHP si indicano utilizzando il simbolo del dollaro `$` seguito dal nome della variabile che è *case-sensitive* (distingue maiuscole e minuscole).

```phtml
<?php
$var = 'Alice';
$Var = 'Bob';
echo("$var, $Var");      // outputs "Alice, Bob"
?>
```

Lo *scope* di una variabile è la parte di codice in cui quella variabile è visibile ed utilizzabile. Le variabili dichiarate come sopra hanno come scope il blocco in cui sono state dichiarate (ad esempio una funzione o un ciclo).

Esiste uno scope speciale chiamato `global` che è accessibile ovunque, finiscono in questo scope tutte le variabili dichiarate fuori da qualsiasi blocco. Per utilizzare variabili in questo scope ci sono due modi:
- dichiarare `global` la variabile al momento dell utilizzo oppure
- utilizzare l'array `$GLOBALS`.

Il seguente esempio mostra i due modi. Le due funzioni eseguono esattamente le stesse operazioni (i due output sono diversi perché `$b` cambia tra la prima e la seconda chiamata). 
```phtml
<?php
// variabili fuori da qualsiasi blocco -> globali
$a = 1;
$b = 2;

function Sum1()
{
    global $a, $b;
    $b = $a + $b;
}

function Sum2()
{
    $GLOBALS['b'] = $GLOBALS['a'] + $GLOBALS['b'];
} 

Sum1(); // 
echo $b; // stampa 3
echo "<br>";
Sum2(); 
echo $b; // stampa 4
?>
```

PHP prevede un terzo tipo di scope chiamato *superglobals* che consiste in variabili globali per le quali non è necessario usare la parola chiave `global`. La variabile `$GLOBALS` usata nell'esempio precedente è una variabile superglobal.

PHP mette a disposizione diverse [variabili superglobals](https://www.php.net/manual/en/language.variables.superglobals.php).
- `$GLOBALS`
- `$_SERVER`
- `$_GET`
- `$_POST`
- `$_FILES`
- `$_COOKIE`
- `$_SESSION`
- `$_REQUEST`
- `$_ENV`

In PHP ogni espressione deve avere uno dei seguenti tipi
- null
- bool
- int
- float (floating-point number)
- string
- array
- object
- callable
- resource

```phtml
<?php
$a_bool = true;   // a bool
$a_str  = "foo";  // a string
$a_str2 = 'foo';  // a string
$an_int = 12;     // an int
echo(get_debug_type($a_bool), "\n");
echo(get_debug_type($a_str), "\n");
?>
```

### `print` e `echo`

### Funzioni

## Processing di file JSON in PHP

## Riferimenti

* [PHP a simple tutorial][1]

[1]: https://www.php.net/manual/en/tutorial.php