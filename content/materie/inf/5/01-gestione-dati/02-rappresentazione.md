---
title: Rappresentazione dei dati
type: lecture
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/5/INF.5.01/01.GestioneDati
weight: 200
---

## Rappresentare i dati
### Tipi e domini
Alla fine della [lezione su "Informazione e Dati"]({{<ref "01-informazione-dati.md" >}}) si è visto che i sistemi di calcolo utilizzano *sequenze di bit* per memorizzare dati (numero, testo, immagine, ...). Per decidere se mostrare un testo o un'immagine, un sistema deve conoscere il **tipo** di dato, in questo modo è possibile interpretare la sequenza di bit. Un tipico esempio di assegnazione del tipo di dato è l'*estensione di un file*, il file `bach.jpeg` probabilmente conterrà una foto del famoso compositore tedesco, mentre il file `bach.mp3` probabilmente conterrà una sua opera musicale.

{{<exercise>}}
Procedi con il seguente esperimento:
* prendi un'immagine dal tuo laptop (supponiamo `IMG20210903.jpeg`) e creane una copia;
* cambia l'estensione del file di copia, ad esempio rinominandolo `IMG20210903.mp3`;
* infine prova ad aprire il file rinominato (es. doppio click); 

Cosa succede? Perché?
{{</exercise>}}

{{<def>}}
Il **tipo** di un dato indica come interpretare la sequenza di bit che rappresenta quel dato. Esempi di tipi sono: numeri interi, numeri con virgola, stringhe, immagini jpeg, ... Normalmente ad un tipo è associato anche il numero di bit che compongono i valori. Ad esempio il tipo `int` dei linguaggi di programmazione è normalmente associato a 32 bit, mentre i `double` a 64.
{{</def>}}

Il tipo ci dice cosa significa ciascuna sequenze di bit, ma non ci dice quali sono le sequenze di bit valide,  questo non è un problema quando tutte le sequenze sono valide (ad esempio negli interi senza segno a `8` bit le \\(2^8=256\\) combinazioni sono i numeri da `0` a `255`). In certi casi solo alcune combinazioni di bit sono possibili, ad esempio la valutazione Amazon può essere data da 1 a 5 stelle. L'insieme dei valori ammissibili per un dato tipo si dice **dominio**. Come visto sopra non sempre il dominio comprende tutti le possibili combinazioni di bit.

{{<def>}}
Il **dominio** è l'insieme dei possibili valori che un dato può assumere. Ad esempio un intero può essere solo positivo, una stringa può essere fatta solo di lettere e numeri.
{{</def>}}

Vediamo ora alcuni esempi per chiarire i concetti di *tipo* e *dominio*.

{{<example title="Tipi dati nei linguaggi di programmazione">}}
Consideriamo il linguaggio Java in cui la sintassi impone la dichiarazione esplicita dei tipi di ogni variabile. Consideriamo il seguente frammento di codice Java

```java
int a = 123;
boolean b = false;
char c = 'Z';
double d = 3.1415;
String e = "Hello!";
```

come si vede nel linguaggio Java è necessario indicare il tipo di una variabile, questo determina quanti bit saranno usati per quel tipo (32 per `int`, 8 ber `boolean`, 64 per `double`, ...) e di conseguenza il dominio che è sempre rappresentato da tutte le possibili combinazioni di bit. 
{{</example>}}

{{<example title="Tipi in SQL">}}
Nelle future lezioni affronteremo in dettaglio il linguaggio SQL per la creazione e l'interrogazione di database relazionali. SQL prevede una sintassi per la definizione di *tipi* e *domini*, vediamo alcuni esempi.

**Interi**
```sql
age INT NOT NULL CHECK age>=18
```

L'esempio mostra come si dichiara un *attributo* di nome `age` che sia di *tipo* intero, il *dominio* **non** comprende il valore `NULL` e non può avere valori minori di `18`.

**Stringhe**
```sql
first_name VARCHAR(100)
```

L'esempio mostra come si dichiara un *attributo* di nome `first_name` che può essere una stringa di caratteri la cui lunghezza massima è `100`. Per come funziona il linguaggio SQL, tale stringa può anche avere il valore `NULL`.
{{</example>}}

#### Atomicità
Ad esclusione dei tipi di dato più semplici (numeri, caratteri, booleani, ...), un *valore* è solitamente rappresentato da una sequenza di (sotto) dati. Il classico esempio è il tipo dato indirizzo, esso tipicamente è una stringa del tipo `Via Roma 12/4`. Tuttavia all'interno di tali stringa ci sono "pezzi" di informazione:
* `Via Roma` rappresentate il nome (`Roma`) e la denominazione `Via` dell'indirizzo;
* `12` rappresenta il numero civico dell'indirizzo e
* `/4` rappresenta l'interno (numero di appartamento) dell'indirizzo.

Dal momento che il valore `Via Roma 12/4` si può ulteriormente scomporre in pezzi di informazione che da soli hanno un significato, il valore si dice che *non è atomico*.

Prendiamo ora l'esempio del numero telefonico `333-11223344`, anche se esiste una suddivisione del valore in *prefisso* `333` e in *suffisso* `11223344`, tipicamente diciamo che il valore è *atomico* in quanto le due parti individuate non hanno un significato intrinseco, detto in altre parole, prese singolarmente queste due parti non danno alcuna informazione.

{{<def title="Valore atomico">}}
Un *valore* si dice **atomico** se non è ulteriormente suddivisibile in parti che abbiamo un significato nella realtà di interesse. Un tipo di dati è atomico se ogni valore del suo dominio è atomico.
{{</def>}}

{{<attention>}}
Il concetto di valore atomico non è universale e dipende dal *contesto* in cui esso viene utilizzato. Riprendendo l'esempio dell'indirizzo `Via Roma 12/4`, i singoli valori (`Via Roma`, `12` e `/4`) possono aver significato presi singolarmente, ad esempio in un ufficio postale che deve recapitare la corrispondenza. Tuttavia lo stesso valore può essere considerato atomico, ad esempio nel database dei dipendenti di un azienda, l'indirizzo di un dipendente è l'intera stringa, che non ha senso spezzare in parti più piccole. Quindi **è fondamentale valutare l'atomicità di un valore/attributo caso per caso, sulla base della realtà di interesse**.
{{</attention>}}

### Record

{{<def>}}
Un **record** è un sequenza di \\(n\\) **valori**, ciascun valore rappresenta una misurazione associata al **campo** del record, ogni campo è caratterizzato da un nome e da un dominio. 
{{</def>}}

{{<example>}}
Possiamo definire il record `Persona` come composto di 3 campi `(Nome, Cognome, Età)` , i primi due dal dominio delle stringhe, il terzo dal dominio degli interi non negativi. Un possibile valore del record è la tripla `(Alice, Smith, 38)`. 
{{</example>}}

Anche se i record sono, di fatto, un insieme di singoli dati, il fatto che siano raggruppati insieme indica che questi dati sono collegati tra loro. Ad esempio `(Alice, Smith, 38)` indica tre dati che sono relativi alla stessa persona, ha perciò senso unirli in un un'unica entità composta, un *record* per l'appunto.

{{<observe>}}
Il concetto di record ricorda il concetto di *classe* dei linguaggi di programmazione ad oggetti. In effetti le classi nascono dall'esigenza di associare in un unico contenitori sia i dati (come fa un record) sia le operazioni su di essi (cosa il record **non** prevede).
{{</observe>}}

## Insieme di dati: *dataset*

{{<def>}}
Un **dataset** è un *insieme di record* dove ogni record è composto da uno o più campi. Normalmente i dataset possiedono una certa regolarità nel senso che ogni record contiene gli stessi campi, tuttavia possono esserci dataset con record a "campi variabili".
{{</def>}}

Spesso i dataset sono rappresentati mediante tabelle, ogni riga rappresenta un record ed ogni colonna un campo.

### Rappresentazione *intensionale* ed *estensionale*

Consideriamo ora la seguente definizione per un record di tipo persona.

```
Record PERSONA
  Identificativo: Intero positivo
  Nome: String
  Cognome: Stringa
  Nascita: Data
```

Immaginiamo di avere un dataset con i seguenti record conformi alla descrizione appena data.

```
    (1, Alan, Turing, 23/06/1912)
    (2, Claude, Shannon, 30/04/1916)
    (3, Friedrich, Gauss, 30/04/1777)
    (4, Albert, Einstein, 14/03/1879)
    (5, Giorgio, Parisi, 04/08/1948)
```

Le due descrizione appena fornite vengono a volte indicate secondo la tipologia di descrizione che danno del dataset.

{{<def>}}
Si chiama **schema** o **rappresentazione intensionale** di un dataset la *descrizione* dei record che lo compongono. Per descrizione in questo caso si intende l'indicazione del nome, del tipo, del dominio, ... dei campi.
{{</def>}}

{{<def>}}
Si chiama **stato** o **rappresentazione estensionale** di un dataset la *enumerazione* di tutti i record che la compongono.
{{</def>}}

Nell'esempio sopra, quindi, chiamiamo rappresentazione intensionale (o schema) la definizione dei vari campi, mentre l'elenco dei record (`Turing`, `Shannon`, ...) lo chiamiamo stato o rappresentazione estensionale.

{{<observe>}}
Quando si utilizza un dataset, spesso si assume che la sua rappresentazione intensionale non cambi o cambi molto di raro. Al contrario, un dataset che viene continuamente aggiornato avrà la sua rappresentazione estensionale modificata di continuo.
{{</observe>}}


### Vincoli

#### Vincoli di dominio


