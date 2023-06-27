---
title: Rappresentazione dei dati
type: lecture
weight: 200
---

## Rappresentare i dati

### Tipi e domini

{{<def>}}
Il **tipo** di un dato indica come interpretare la sequenza di bit che rappresenta quel dato. Esempi di tipi sono: numeri interi, numeri con virgola, stringhe, immagini jpeg, ...
{{</def>}}

{{<def>}}
Il **dominio** è l'insieme dei possibili valori che un dato può assumere. Ad esempio un intero può essere solo positivo, una stringa può essere fatta solo di lettere e numeri.
{{</def>}}

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


