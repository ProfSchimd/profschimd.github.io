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
Abbiamo visto [sopra](#atomicità) come i dati presenti in un sistema debbano essere considerati *atomici* cioè indivisibili, tuttavia la realtà è composta di *entità composite* (cioè divisibili). Per questo motivo è frequente raggruppare diversi dati atomici tra loro collegati in un unico "contenitore". Chi ha esperienza di programmazione ad oggetti, ad esempio, conosce il concetto di classe che rappresenta un esempio di tale contenitore (le classi, oltre ai dati, hanno anche delle operazioni).

Nell'ambito della gestione di dati ci si riferisce ad una collezione di dati atomici tra loro collegati con il nome di *record*. Questo termine ha origine storiche quando questi dati venivano memorizzati su nastri magnetici "un record dopo l'altro".

{{<def>}}
Un **record** è un sequenza di \\(n\\) **valori** atomici tra di loro collegati, ciascun valore rappresenta una misurazione associata al **campo** del record, ogni campo è caratterizzato da un nome e da un dominio. 
{{</def>}}

{{<example>}}
Possiamo definire il record `Persona` come composto di 3 campi `(Nome, Cognome, Età)` , i primi due dal dominio delle stringhe, il terzo dal dominio degli interi non negativi. Un possibile valore del record è la tripla `(Alice, Smith, 38)`. 
{{</example>}}

Anche se i record sono, di fatto, un insieme di singoli dati, il fatto che siano raggruppati insieme indica che questi dati sono collegati tra loro. Ad esempio `(Alice, Smith, 38)` indica tre dati che sono relativi alla stessa persona, ha perciò senso unirli in un un'unica entità composta, un *record* per l'appunto.

{{<observe>}}
Il concetto di record ricorda il concetto di *classe* dei linguaggi di programmazione ad oggetti. In effetti le classi nascono dall'esigenza di associare in un unico contenitori sia i dati (come fa un record) sia le operazioni su di essi (cosa il record **non** prevede).
{{</observe>}}

## Collezioni di dati: *dataset* e *database*

### Dataset
Abbiamo visto che dati atomici correlati sono raggruppati in record, i record correlati sono a loro volta sono raggruppati in *dataset*. Normalmente un dataset contiene record omogenei, cioè composti tutti dagli stessi *campi*. Inoltre i record all'interno di un dataset formano un insieme che ha senso raggruppare per poterli elaborare. 

{{<def>}}
Un **dataset** è un *insieme di record* dove ogni record è composto da uno o più *campi*. Normalmente i dataset possiedono una certa regolarità nel senso che ogni record contiene gli stessi campi, tuttavia possono esserci dataset con record a "campi variabili".
{{</def>}}

{{<example>}}
Gli studenti di una scuola possono essere tutti memorizzati in un dataset composto di tanti record quanti sono gli studenti iscritti. Ogni record conterrà informazioni sullo studente quali: `CodiceFiscale`, `Nome`, `Cognome`, `DataNascita`, ...

Trattandosi di un dataset di studenti, non ha senso inserire anche i record corrispondenti agli insegnanti della stessa scuola i quali potrebbero essere raggruppati in un altro dataset.

Ovviamente, nel caso lo scopo del dataset sia effettuare degli studi su tutte le persone che frequentano la scuola (studenti, insegnanti, collaboratori, ...), può avere senso inserire tutti i record in un unico dataset oppure eseguire il *merge* dei due dataset in un uno unico.
{{</example>}}

Spesso i dataset sono rappresentati mediante tabelle, ogni riga rappresenta un record ed ogni colonna un campo.

### Database
L'argomento principale del quinto anno di informatica sono i **database** (le *basi di dati*), essi sono strumenti per la memorizzazione di dati che, rispetto ai dataset, offrono maggiore flessibilità nella gestione. In questa lezione non andremo a vedere in dettaglio il funzionamento di un database, anche perché vi sono molte tipologie di database. Ciò che caratterizza un database è la necessità di appoggiarsi ad uno strumento dedicato alla sua gestione: un **Database Management System (DBMS)**. La necessità di utilizzare un tool dedicato, quindi, suggerisce che i dati siano memorizzati e gestiti in modo più complesso rispetto ad un dataset che, solitamente, è memorizzato in un unico file (esempio `JSON` o `csv`) e consultabile con programmi "generici" (esempio editor di testo o fogli di calcolo).

{{<def>}}
Un **database** è una collezione di dati memorizzata, gestita ed accessibile attraverso un *Database Management System (DBMS)* che è un sistema software appositamente progettato e realizzato per gestire database.
{{</def>}}

Semplificando un po', possiamo affermare che la differenza tra dataset e database risiede nella gestione dei dati memorizzato. Nel caso di un database, è necessario utilizzare un software apposito (un DBMS), nel caso dei dataset può bastare un software generico (es. foglio di calcolo, editor di testi, ...).

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
Il mondo reale è caratterizzato da condizioni che sono più o meno naturali, ad esempio nessuna persona può essere più alta di 3 metri, oppure nessuna persona può avere tre genitori oppure nessun versamento di denaro su un conto può essere fatto senza il prelievo da un altro conto.

Quando si gestiscono dati è bene riconoscere quali *vincoli* del mondo reale devono essere presenti anche nei dati memorizzati. Ad esempio se si inserisce un'altezza superiore ai 3 metri si dovrebbe ricevere un errore e non dovrebbe essere possibile registrare un pagamento che non ha un accredito corrispondente.

{{<def>}}
Un **vincolo** è una condizione che viene imposta su un insieme di dati. Ogni *istanza* presente nel dataset o nella base di dati, deve *soddisfare* il vincolo. Quelle istanze con non soddisfano la condizione si dice che *violano* il vincolo e non dovrebbero essere presente tra i dati gestiti.
{{</def>}}

#### Vincoli di dominio
I vincoli di dominio sono quelle condizioni che vengono imposte dal dominio associato ad un dato. Ad esempio, se il dominio è quelli degli interi positivi il vincolo di dominio corrispondente sarà \\(x \geq 0\\).

#### Altri vincoli
Nell'elencare alcuni esempi di condizioni sopra abbiamo menzionato vincoli che non sono solo numerici. Nelle lezioni seguenti studieremo molti tipi di vincoli e quindi rimandiamo la discussione a lezioni più specifiche.

## Esercizi

{{<exercise title="Anagrafica Clienti">}}
Un'*anagrafica* è la parte di un *sistema informativo* che contiene informazioni circa persone o società coinvolte nel business dell'azienda. Consideriamo un sito di *commercio elettronico* che vende prodotti a clienti privati (non partite IVA).

1. Individuare il *tipo* ed il *dominio* dei seguenti campi.
   * Email e password
   * Nome e Cognome
   * Data di nascita
   * Indirizzo di consegna
   * Carta di credito (titolare, numero, scadenza, CVV)
   * Data di iscrizione
   * Data di ultimo accesso
2. Una volta risolto il punto precedente, dare una descrizione *intensionale* del record `Cliente`  fornire almeno 4 esempi in una rappresentazione *estensionale*.
3. Per ogni campo individuato al punti 1. determinare il *tipo* (es. stringa, intero) ed il *dominio* (es. 10 caratteri alfanumerici, intero non negativo, ...). Le istanze di esempio create al punto 2. soddisfano tutti i vincoli?
4. Usando strumenti di AI quali ChatGPT, crea altre istanze (almeno 20 in totale) e memorizza il *dataset* così ottenuto in un file `csv`.
5. Utilizza un linguaggio di programmazione a scelta (PHP, Java, Javascript, Python, ...) per leggere il file `csv` creato al punto precedente e ordinare i record in base a vari criteri (cognome, data di nascita, data ultimo accesso, ...)
{{</exercise>}}

{{<exercise title="Catalogo prodotti">}}
In questo esercizio verrà creato un *dataset* per la gestione del catalogo prodotti di un sito di commercio elettronico.
1. Definire il record `Prodotto`, per ognuno dei campi elencati indicare *tipo* e *dominio* (il primo campo è dato come esempio).
   * Codice univoco prodotto: di tipo `string` costituito da `20` caratteri alfanumerici che non può mi essere vuoto.
   * Nome
   * Descrizione breve
   * Descrizione estesa
   * Prezzo unitario
   * Sconto percentuale applicato
   * Quantità in magazzino
   * Nome del fornitore
   * Collocazione in magazzino
2. Una volta risolto il punto precedente, dare una descrizione *intensionale* del record `Clienti`  fornire almeno 20 esempi in una rappresentazione *estensionale* è possibile usare tool automatici come ChatGPT, ma va garantito che tutti i vincoli di dominio definiti al punto precedente siano rispettati. Salvare il dataset così ottenuto in formato `csv`.
3. Utilizzando un linguaggio di programmazione a scelta (PHP, Java, Javascript, Python, ...), creare un programma che mostri le seguenti informazioni:
   * Lista dei prodotti ordinati per Nome
   * Lista dei prodotti in sconto
   * Lista dei prodotti non presenti in magazzino
{{</exercise>}}

{{<exercise title="Carrello virtuale">}}
**Attenzione** per eseguire il presente esercizio è necessario aver svolto entrambe gli esercizi precedenti ed avere i due file `csv` corrispondenti. In questo esercizio verrà creato il *carrello virtuale* per i clienti di un sito di commercio elettronico.
1. Definire il record `Item` che rappresenta un prodotto inserito nel carrello
   * Codice prodotto
   * Quantità inserita
   * Data inserimento
2. Definire il record `Carrello` che contiene
   * L'identificativo (email) del cliente a cui il carrello è associato
   * Una lista di `Item`
 3. Creare due file `csv` uno per i record `Item` e uno per i record `Carrello` riempiendoli in modo che ci siano almeno `3` carrelli con almeno `3` item ciascuno (è possibile usare ChatGPT purché il risultato finale sia sensato e non violi alcun vincolo). I prodotti e i clienti devono essere presi dai file ottenuti negli esercizi precedenti.
 4. Utilizzando un linguaggio di programmazione a scelta (PHP, Java, Javascript, Python, ...), caricare tutti i file e scrivere il codice per visualizzare le seguenti informazioni
    * La lista dei carrelli con: email cliente, indirizzo spedizione e totale costo
    * La lista dei prodotti del carrello di valore massimo e l'email del cliente associato.
{{</exercise>}}





