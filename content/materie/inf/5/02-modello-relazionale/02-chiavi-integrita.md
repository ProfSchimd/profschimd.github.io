---
title: Chiavi e Integrità
type: lecture
weight: 200
summary: "In questa lezione si introducono i concetti di chiave primaria e di chiave esterna discutendo i corrispondenti vincoli di chiave e di integrità referenziale."
---

## Chiave primaria

Nella [lezione precedente]({{<ref "01-relazioni-tuple.md">}}) è stato definito il concetto di *relazione* richiedendo che ogni tupla della relazione sia identificabile nel senso che non ci possono essere due tuple identiche (ricordiamo che nella definizione una relazione è un *insieme di tuple*).

Detto in altre parole se si prende una relazione deve esistere un sottoinsieme di attributi (che potrebbe anche essere il sottoinsieme di tutti gli attributi) tale che non esistono due tuple con gli stessi identici valori per tutti gli attributi di questo sottoinsieme. Chiamiamo un qualsiasi sottoinsieme con questa caratteristica una **superchiave** (**superkey**) per la relazione.

Per meglio comprendere il concetto si superchiave consideriamo la seguente relazione `Studente`.
{{<table>}}
| Nome     | Cognome | DataDiNascita |
|----------|---------|---------------|
| Raimondo | Bianchi | 1946-01-01    |
| Edoardo  | Conte   | 1923-08-19    |
| Mario    | Bianchi | 1964-05-10    |
| Alice    | Rossi   | 1999-02-20    |
| Mario    | Rossi   | 1975-10-31    |
| Barbara  | Verdi   | 1982-04-01    |
| Carlo    | Rossi   | 1975-10-31    |
{{</table>}}

Si può vedere subito che nessuno dei tre attributo preso da solo è una superchiave, infatti ogni colonne contiene almeno due valori uguali. Si vede anche che il sottoinsieme di attributi `(Nome, Cognome)` rappresenta una superchiave poiché non esiste alcuna tupla con stesso nome e cognome.
Si nota inoltre che la coppia di attributi `(Cognome, DataDiNascita)` contiene due tuple con gli stessi valori e quindi non è una superchiave. Vale la pena notare che, essendo le tuple di una relazione uniche (altrimenti non si può nemmeno chiamare relazione), l'insieme di tutti gli attributi di una relazione è sempre una superchiave.

{{<def title="Superchiave">}}
Una superchiave per la relazione \\(R\\) è un sottoinsieme di attributi tale che non esistono due tuple \\(t_1\\) e \\(t_1\\) in \\(R\\) con lo stesso valore per tutti questi attributi.
{{</def>}}

{{<def title="Chiave candidata">}}
Una chiave candidata per una relazione \\(R\\) è una superchiave in cui togliendo un qualsiasi attributo si perde la proprietà di superchive.
{{</def>}}

{{<def title="Chiave primaria">}}
La **chiave primaria** per una relazione \\(R\\) è una sua *chiave candidata* che viene scelta per fungere da identificativo. La scelta può essere fatta per vari motivi, ad esempio la superchiave ha un solo attributo, oppure la superchiave è "facile da cercare".
{{</def>}}

{{<important>}}
Quando si seleziona la chiave primaria non bisogna mai limitarsi a guardare le tuple presenti, ma si deve sempre pensare alla realtà che si intende rappresentare. Ad esempio, anche se nel nostro esempio `(Nome, Cognome)` è univoco, non si può affermare che in una scuola non ci saranno mai studenti con lo stesso nome e cognome. La scelta della chiave primaria, quindi, deve tenere conto di quali sono gli attributi che possono rappresentare un elemento di unicità. Nel caso dei cittadini residenti in Italia, il *codice fiscale* è un sequenza di lettere e numeri che deve essere unica per tutte le persone ed è spesso usato come chiave primaria in una anagrafica.
{{</important>}}

## Chiave esterna

### Integrità referenziale


Possiamo quindi dare la seguente definizione di *chiave esterna* nella quale viene indicato anche il vincolo di integrità referenziale come parte del requisito di uno stato valido della base di dati.

{{<def title="Chiave esterna">}}
Una **chiave esterna** della relazione \\(R\\) è un sottoinsieme di attributi di \\(R\\) che è chiave primaria di una relazione \\(Q\\) (non è necessario che \\(R\\) e \\(Q\\) siano relazioni diverse). Affinché gli attributi di \\(R\\) siano una valida chiave esterna deve essere vero che:
* i valori ammessi siano dello stesso tipo dei corrispondenti attributi chiave di \\(Q\\),
* per ogni stato valido di del database una tupla di \\(Q\\) deve contenere chiavi esterne di \\(Q\\) i cui valori sono presenti in \\(R\\), chiamiamo questo **vincolo di integrità referenziale**.
{{</def>}}



