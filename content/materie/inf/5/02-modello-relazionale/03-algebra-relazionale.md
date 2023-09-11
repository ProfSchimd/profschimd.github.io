---
title: Algebra relazionale
type: lecture
weight: 300
summary: "In questa lezione viene discussa l'algebra relazionale che rappresenta l'insieme degli strumenti matematici utili ad operare su relazioni. Questa lezione descrive argomenti avanzati che possono anche essere omessi, ma che sono un utile introduzione verso il linguaggio SQL."
---

L'algebra relazionale è una teoria matematica basata sulla *teoria degli insieme* che permette di eseguire operazioni su relazioni. In questa lezione daremo solo brevi cenni di algebra relazionale che tuttavia sono fondamentali per una buona comprensione del linguaggio SQL il quale può essere vista come un'implementazione "pratica" dell'algebra relazionale.

L'algebra relazionale definisce *operazioni* che si applicano a *relazione*, considereremo due tipologie di operazioni:
* [operazioni unarie](#operazioni-unarie) in cui una sola relazione è coinvolta e 
* [operazioni binarie](#operazioni-binarie) in cui due relazioni sono coinvolte.

Il risultato di un'operazione nell'algebra relazionale è sempre una relazione.

Durante questa lezione utilizzeremo le seguenti tabelle d'esempio.
{{<column/columns>}}
{{<column/col>}}
#### Relazione `Studente`
{{<table>}}
| Nome     | Cognome  | Data Di Nascita | IdClasse |
|----------|----------|-----------------|----------|
| Raimondo | Bianchi  | 2004-01-01      | 7        |
| Edoardo  | Conte    | 2004-08-19      | 7        |
| Mario    | Bianchi  | 2008-05-10      | 2        |
| Alice    | Rossi    | 2003-02-20      | 10       |
| Mario    | Rossi    | 2007-10-31      | 2        |
| Barbara  | Verdi    | 2007-04-01      | 2        |
| Carlo    | Rossi    | 2006-10-31      | 5        |
| Davide   | Visconti | 2004-06-22      | 7        |
| Michela  | Sciascia | 2006-02-22      | 12       |
{{</table>}}
{{</column/col>}}
{{<column/col>}}
#### Relazione `Classe`
{{<table>}}
| Id  | Classe | Aula |
|-----|--------|------|
| 2   | 1A     | 2    |
| 3   | 2A     | 5    |
| 5   | 3A     | 3    |
| 7   | 5B     | 4    |
| 10  | 5A     | 9    |
| 12  | 4A     | 1    |
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

## Operazioni unarie
Ci occupiamo ora delle due principali operazioni unarie dell'algebra booleana: la [selezione](#operazione-di-selezione) e la [proiezione](#operazione-di-proiezione).

### Operazione di Selezione
L'operazione di **selezione** (**select**) permette di selezionare un sottoinsieme di tuple (righe) da un relazione indicando una *condizione di selezione*. Indichiamo la selezione con la lettera greca \\(\sigma\\) (sigma minuscolo) mettendo a pedice la condizione.

$$ \sigma_{cond}(R) $$

Ad esempio, volendo selezionare nella relazione `Studente` solo gli studenti della classe con `IdClasse=7` eseguiremo la seguente selezione

$$ \sigma_{\mathsf{IdClasse=7}}(\mathsf{Studente}) $$

Il risultato, nella nostra relazione d'esempio, sarà il seguente.

{{<table>}}
| Nome     | Cognome | Data Di Nascita | IdClasse |
|----------|----------|-----------------|----------|
| Raimondo | Bianchi  | 2004-01-01      | 7        |
| Edoardo  | Conte    | 2004-08-19      | 7        |
| Davide   | Visconti | 2004-06-22      | 7        |
{{</table>}}

### Operazione di Proiezione
L'operazione di **proiezione** (**projection**) permette di selezionare un sottoinsieme di attributi (colonne) da una relazione indicando il nome degli attributi da selezionare. Indichiamo la proiezione con la lettera greca ((\\pi\)) (pi greco) mettendo a pedice la lista degli attributi da proiettare.

$$ \pi_{att1,att1,\ldots}(R) $$

Ad esempio, volendo proiettare la relazione classe sui solo attributi `Classe` e `Aula`, scriveremo la seguente operazione

$$ \pi_{\mathsf{Classe,Aula}}(\mathsf{Classe}) $$

il cui risultato sarà il seguente.

{{<table>}}
| Classe | Aula |
|--------|------|
| 1A     | 2    |
| 2A     | 5    |
| 3A     | 3    |
| 5B     | 4    |
| 5A     | 9    |
| 4A     | 1    |
{{</table>}}

----

Ovviamente è possibile combinare selezione e proiezione, di fatto questa è l'operazione che viene spesso eseguita. Ad esempio per avere nome e cognome (senza data di nascita) di tutti gli studenti della classe `5B` (il cui `Id` è `7`) possiamo combinare selezione e proiezione nel seguente modo.

$$ \pi_{\mathsf{Nome,Cognome}}(\sigma_{\mathsf{IdClasse=7}}(\mathsf{Studente})) $$

{{<attention>}}
L'ordine con cui si eseguono le operazione è importante. Nell'esempio sopra se facciamo prima l'operazione di proiezione

$$ R = \pi_{\mathsf{Nome,Cognome}}(\mathsf{Studente}) $$

eliminiamo la colonna `IdClasse` (perché non fa parte degli attributi proiettati) e l'operazione di selezione

$$ \sigma_{\mathsf{IdClasse=7}}(R) $$

non a più senso in quanto la relazione \\(R\\) non contiene nessun attributo `IdClasse`.
{{</attention>}}

Tratteremo SQL in altri moduli, tuttavia è interessante vedere come il linguaggio SQL sia una realizzazione dell'algebra relazionale. Come primo esempio consideriamo le operazioni di selezione e proiezione viste sopra in cui ci interessava vedere nome e cognome degli studente con `IdClasse=7`, ecco la *query* SQL per ottenere tale risultato.

```sql
SELECT Nome, Cognome
FROM Studente
WHERE IdClasse = 7
```

Nella parte `SELECT` vediamo gli attributi da proiettare, `FROM` indica la relazione da cui prendere gli attributi ed infine `WHERE` opera la selezione delle tuple sulla base del valore di `IdClasse`. 

## Operazioni binarie
Vediamo ora le operazioni binarie di tipo insiemistico [unione](#unione), [intersezione](#intersezione) e [differenza](#differenza) che pur esistendo nell'algebra relazionale sono raramente utilizzate (anche se risultano fondamentali in alcune query particolarmente complesse). Dedicheremo una sezione a parte all'operazione di [join](#operazione-di-join) che rappresenta una strumento fondamentale per operare con le relazionali.

### Unione
L'unione è l'operazione che prende due relazioni con gli stessi attributi e crea una relazione che è formata da tutte le tuple di una e dell'altra relazione. L'operazione di intersezione si indica con il simbolo \\(\cup\\)

$$ Q = R \cup S $$ 

Ad esempio l'unione delle seguenti tabelle

{{<column/columns>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | Data Di Nascita | IdClasse |
|----------|----------|-----------------|----------|
| Raimondo | Bianchi  | 2004-01-01      | 7        |
| Edoardo  | Conte    | 2004-08-19      | 7        |
| Davide   | Visconti | 2004-06-22      | 7        |
{{</table>}}
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | Data Di Nascita | IdClasse |
|----------|----------|-----------------|----------|
| Mario    | Bianchi  | 2008-05-10      | 2        |
| Mario    | Rossi    | 2007-10-31      | 2        |
| Barbara  | Verdi    | 2007-04-01      | 2        |
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

produrrà come risultato la seguente tabella.

{{<table>}}
| Nome     | Cognome  | Data Di Nascita | IdClasse |
|----------|----------|-----------------|----------|
| Raimondo | Bianchi  | 2004-01-01      | 7        |
| Edoardo  | Conte    | 2004-08-19      | 7        |
| Davide   | Visconti | 2004-06-22      | 7        |
| Mario    | Bianchi  | 2008-05-10      | 2        |
| Mario    | Rossi    | 2007-10-31      | 2        |
| Barbara  | Verdi    | 2007-04-01      | 2        |
{{</table>}}

### Intersezione
L'unione è l'operazione che prende due relazioni con gli stessi attributi e crea una relazione che è formata da tutte le tuple che sono su *entrambe* le relazioni. L'operazione di intersezione si indica con il simbolo \\(\cap\\)

$$ Q = R \cap S $$ 

Nell'esempio sotto l'intersezione delle due relazioni a sinistra produce la relazione di destra. 

{{<column/columns>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Raimondo | Bianchi  |
| Mario    | Rossi    | 
| Barbara  | Verdi    | 
| Carlo    | Rossi    | 
| Davide   | Visconti | 
| Michela  | Sciascia | 
{{</table>}}
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Raimondo | Bianchi  |
| Edoardo  | Conte    | 
| Mario    | Bianchi  | 
| Carlo    | Rossi    | 
| Michela  | Sciascia | 
{{</table>}}
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Raimondo | Bianchi  | 
| Carlo    | Rossi    | 
| Michela  | Sciascia | 
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

### Differenza
La differenza è l'operazione che prende due relazioni con gli stessi attributi e crea una relazione che è formata da tutte le tuple presenti in una relazione, ma non nell'altra. L'operazione di intersezione si indica con il simbolo \\(\setminus\\) (a volte con il simbolo \\(-\\) come la differenza numerica)

$$ Q = R \setminus S $$ 

{{<column/columns>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Raimondo | Bianchi  |
| Mario    | Rossi    | 
| Barbara  | Verdi    | 
| Carlo    | Rossi    | 
| Davide   | Visconti | 
| Michela  | Sciascia | 
{{</table>}}
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Raimondo | Bianchi  |
| Edoardo  | Conte    | 
| Mario    | Bianchi  | 
| Carlo    | Rossi    | 
| Michela  | Sciascia | 
{{</table>}}
{{</column/col>}}
{{<column/col>}}
{{<table>}}
| Nome     | Cognome  | 
|----------|----------|
| Mario    | Rossi    | 
| Barbara  | Verdi    | 
| Davide   | Visconti | 
{{</table>}}
{{</column/col>}}
{{</column/columns>}}

{{<attention>}}
La differenza insiemistica (come quella tra numeri) **non è commutativa**, per esercizio si svolga l'esempio precedente invertendo le due relazioni, ovvero togliendo dalla seconda quello che è presente nella prima.
{{</attention>}}

## Operazione di Join
L'operazione di join è lo strumento fondamentale per operare tra relazioni che sono tra loro collegati mediante [chiavi esterne]({{<ref "02-chiavi-integrita.md#chiave-esterna">}}). Nella sua versione più semplice, l'operazione di join prende due relazioni e ne crea una le cui tuple si ottengono concatenando tuple con lo stesso valore per gli attributi di collegamento. Nell'algebra relazionale, l'operazione di join si indica con il simbolo \\(\bowtie\\) indicando come pedice gli attributi di collegamento.

$$ R \bowtie_{\mathsf{Att1=Att2}} S $$

Ad esempio per creare la relazione di join tra `Studente` e `Classe` utilizzando gli attributi `Studente.IdClasse` e `Classe.Id` come collegamento indicheremo

$$ \mathsf{Studente} \bowtie_{\mathsf{IdClasse=Id}} \mathsf{Classe} $$

Il risultato sarà la seguente relazione

{{<table>}}
| Nome     | Cognome  | Data Di Nascita | IdClasse | Id  | Classe | Aula |
|----------|----------|-----------------|----------|-----|--------|------|
| Raimondo | Bianchi  | 2004-01-01      | 7        | 7   | 5B     | 4    |
| Edoardo  | Conte    | 2004-08-19      | 7        | 7   | 5B     | 4    |
| Mario    | Bianchi  | 2008-05-10      | 2        | 7   | 5B     | 4    |
| Alice    | Rossi    | 2003-02-20      | 10       | 10  | 5A     | 9    |
| Mario    | Rossi    | 2007-10-31      | 2        | 2   | 1A     | 2    |
| Barbara  | Verdi    | 2007-04-01      | 2        | 2   | 1A     | 2    |
| Carlo    | Rossi    | 2006-10-31      | 5        | 5   | 3A     | 3    |
| Davide   | Visconti | 2004-06-22      | 7        | 7   | 5B     | 4    |
| Michela  | Sciascia | 2006-02-22      | 12       | 12  | 4A     | 1    |
{{</table>}}

Una volta ottenuta tale tabella è possibile usare le operazioni di selezione e proiezione. Ad esempio volendo conoscere, *nome*, *cognome* e *classe* degli studenti con data di nascita precedente al 2008 possiamo fare la seguente sequenza di operazioni relazionali:
1. Creiamo la relazione di join
    $$ \mathsf{JoinRel} = \mathsf{Studente} \bowtie_{\mathsf{IdClasse=Id}} \mathsf{Classe} $$
2. Selezioniamo in base all'anno di nascita
    $$ \mathsf{SelectedRel} = \sigma_{\mathsf{DataDiNascita<2008}}(\mathsf{JoinRel}) $$
3. Proiettiamo sugli attributi che ci interessano
    $$ \mathsf{Result} = \pi_{\mathsf{Nome,Cognome,Classe}}(\mathsf{SelectedRel}) $$

Il risultato finale sarà

{{<table>}}
| Nome     | Cognome  | Classe |
|----------|----------|--------|
| Raimondo | Bianchi  | 5B     |
| Edoardo  | Conte    | 5B     |
| Alice    | Rossi    | 5A     |
| Mario    | Rossi    | 1A     |
| Barbara  | Verdi    | 1A     |
| Carlo    | Rossi    | 3A     |
| Davide   | Visconti | 5B     |
| Michela  | Sciascia | 4A     |
{{</table>}}
