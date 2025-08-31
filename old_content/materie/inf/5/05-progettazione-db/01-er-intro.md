---
title: "Introduzione al Diagramma Entità Relazione (ER)"
running_title: ER Introduzione
type: lecture
weight: 100
summary: "Uno dei strumenti più utilizzati in fase di progettazione concettuale è il diagramma Entità-Relazione (ER). In questa lezione vediamo le basi di tale formalismo grafico."
---

Questa lezione introduce il **Diagramma Entità-Relazione (ER)** per la *progettazione concettuale di un database* utilizzando un semplice esempio di *analisi dei requisiti*. Verranno discussi i concetti di [entità](#entità-e-attributi) e [relazione](#relazione)che saranno approfonditi in lezioni successive.

{{<example title="Estratto di analisi dei requisiti">}}
Si deve creare un *registro elettronico* per la gestione delle classi all'interno di una scuola superiore. Ogni classe è composta di studenti i quali sono identificati per mezzo del loro codice fiscale. Ogni classe ha un nome (ad esempio `1A`) suddiviso in sezione e livello. Oltre al codice fiscale, agli studenti sono associati nome, cognome, data di nascita, indirizzo di casa e numero di telefono dello studente (opzionale).
{{</example>}}

## Entità e attributi
La progettazione concettuale individua i *concetti* della realtà di interesse da rappresentare nel database. Nel diagramma ER questi concetti diventano **entità** e **relazioni**. Le entità si individuano identificando gli oggetti (non necessariamente fisici) che vanno descritti nel database.

Nel nostro esempio possiamo individuare i seguenti elementi da inserire nel database:
* `classe` è l'entità che rappresenta un insieme di studenti, a tale entità è anche associato un `nome`,
* `studente` è l'entità che rappresenta gli *studenti* della scuola, dai requisiti si legge che si identifica mediante il `codice fiscale` e che va mantenuta un'anagrafica con diversi dati riguardanti lo studente.

Un ulteriore concetto da considerare è quello di *appartenenza* di uno studente ad una classe che, tuttavia, esprime una *relazione* tra le due *entità* `classe` e `studente`.

{{<column/two-cols wr=4 wl=8 content="left" embed="img/er-entita-classe-studente.html">}}
Nell'immagine a fianco vediamo la rappresentazione grafica delle due entità `classe` e `studente`.

* Ogni entità di un diagramma ER è rappresentata mediante un rettangolo contenente il nome dell'entità.
* Un entità può avere degli attributi che descrivono l'entità e che sono rappresentati da ovali connessi all'entità.
* Uno più attributi che identificano l'entità (una *chiave primaria*) possono essere indicati sottolineandone il nome.

Vale la pena notare che gli attributi non contengono alcuna indicazione sul tipo o sul dominio, semplicemente si ne indica il nome e l'entità a cui l'attributo è collegato. Inoltre gli attributi non hanno un ordine particolare e si debbono quindi considerare un *insieme*, questa è una differenza con il modello logico relazionale nel quale una tabella possiede degli attributi che hanno un ordine specifico.
{{</column/two-cols>}}

{{<observe>}}
Nell'identificare le entità in un'analisi dei requisiti si può ricorrere a qualche trucchetto.
* Di norma, le entità si esprimono come sostantivi (meglio al singolare): *classe*, *studente*, *voto*, ... Spesso i verbi hanno un ruolo di collegamento tra entità e sono meglio descritti come [relazioni](#relazione) in un diagramma ER.
* Gli elementi che sono ulteriormente caratterizzati da dettagli (attributi) sono candidati ad essere entità. Ad esempio allo studente si sono associati nome, cognome, ... 
{{</observe>}}

### Attributi composti

{{<column/two-cols wr=4 wl=8 content="left" embed="img/er-attributi-composti.html">}}
A fianco vediamo lo schema ER dell'entità `classe` modificato per tener conto del fatto che l'attributo `nome` è in realtà composto da `sezione` e `livello`. Come si vede dallo schema, le parti che compongono l'attributo composto vengono descritte come un attributo ciascuno che tuttavia sono connessi all'attributo composto anziché all'entità (o alla relazione) che li contiene.
{{</column/two-cols>}}

{{<attention>}}
Nel [modello relazionale]({{<ref "02-modello-relazionale" >}}) gli attributi devono essere attributi atomici e non composti. Nella progettazione concettuale, quindi nello schema ER, questo non è necessario. Se un attributo è composto, come `nome` per la tabella `classe`, va rappresentato come tale. Nella fase di traduzione da modello concettuale a modello logico relazionale si dovrà provvedere a rendere atomici gli attributi composti.
{{</attention>}}

## Relazione
In una realtà di interesse le entità non sono elementi isolati, ma sono tra lore collegate da **relazioni**. Nella progettazione concettuale si devono individuare e rendere esplicite le relazioni significative per il database. Nel diagramma ER una relazione si indica con un rombo collegato a due o più relazioni (tipicamente due o tre, mai di più).

{{<column/two-cols wr=5 wl=7 content="left" embed="img/er-relazione-esempio.html">}}
La figura a fianco mostra la relazione `comprende` che mette in collegamento le entità `classe` e `studente` dalle quali sono stati tolti gli attributi per rendere l'immagine più chiara e leggibile.
{{</column/two-cols>}}

{{<attention>}}
Nel ricercare entità e relazioni dello schema concettuale va sempre tenuto presente che:
* le entità non sono **mai collegate direttamente**, ma tramite relazioni;
* le **relazioni non sono mai collegate** tra di loro;
* Mentre possono esistere entità non collegate a relazioni, **non si possono avere relazioni collegate a nessuna o a solo una entità** (cosa metterebbe in relazione in questo caso?).
{{</attention>}}

{{<observe>}}
Nell'identificare le relazione aiuta a ricercare i *verbi* che collegano due o più entità già individuate. Ad esempio nel testo sopra si legge *Ogni classe è composta di studenti ...* in cui le due entità `classe` e `studente` sono legate (messe in relazione) dal verbo *è composta*.
{{</observe>}}

### Attributi di una relazione

{{<column/two-cols wl=7 wr=5 content="left" embed="img/er-relazione-attributo.html">}}
A fianco vediamo la stessa relazione `composta` in cui è stato aggiunto un attributo che indica la *data di iscrizione* di uno studente alla classe. Come si vede l'attributo, indicato con un ovale come tutti gli attributi, è collegato alla relazione simile a quanto accade con gli attributi di entità.
{{</column/two-cols>}}

Ovviamente gli attributi di una relazione possono essere composti, la descrizione è simile a quanto descritto [sopra](#attributi-composti) per gli attributi composti di un'entità.