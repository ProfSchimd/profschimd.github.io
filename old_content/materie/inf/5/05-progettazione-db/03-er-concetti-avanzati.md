---
title: "Diagramma ER: concetti avanzati"
running_title: ER Advanced
type: lecture
weight: 300
summary: "In questa lezione vedremo alcuni costrutti del diagramma ER che vengono utilizzati meno di frequente, ma che permettono di esprimere la realtà di interesse in modo più completo ed efficace. Si discuteranno i concetti di: relazionare ternaria, entità deboli e specializzazioni."
---

## Relazioni ternarie
Fin'ora abbiamo visto unicamente *relazioni binarie*, cioè relazioni con due entità partecipanti, in certi casi il **grado** di una relazione (numero di entità partecipanti) è maggiore di due. In particolare accade spesso di incontrare relazioni che vengono più facilmente espresse coinvolgendo tre entità.

{{<column/two-cols wr=5 wl=7 content="left" embed="img/er-ternary-relationship.html">}}
Consideriamo ad esempio la relazione ternaria `Insegna` illustrata a fianco a cui partecipano le tre entità `Insegnante`, `Classe` e `Materia`. Questa relazione descrive il fatto che insegnanti possono insegnare a diverse classi e materie diverse, perciò è necessario considerare la relazione ternaria per intero essendo importante sapere *un dato insegnante che materia/e insegna in una classe specifica*.

Una difficoltà che spesso si incontra nelle relazioni ternarie è la corretta assegnazione dei vincoli di cardinalità. Nell'esempio vediamo indicate `N`, `M` e `K` ad indicare che le tre entità partecipano con più istanze alla relazione, ma è anche possibile che vi siano entità che partecipano con cardinalità `1` in relazioni ternarie.
{{</column/two-cols>}}

Individuare le cardinalità è semplice, basta isolare ogni entità e confrontarla con l'insieme delle altre due. Ad esempio, nella relazione `Insegna` abbiamo da individuare tre cardinalità.
* Per `Insegnante` dobbiamo rispondere alla seguente domanda: *una certa materia in una data classe, quanti insegnanti può avere?* Nel caso in cui la risposta sia *più di un insegnante,* indichiamo sul lato `Insegnante` della relazione `Insegna` `N` ad indicare questo fatto.
* Per `Materia` dobbiamo rispondere alla seguente domanda: *un certo insegnante in una data classe quante materie può insegnare?* Nel caso in cui la risposta sia *più di una materia,* indichiamo sul lato `Materia` della relazione `Insegna` `M` (per distinguerlo da `N`) ad indicare questo fatto.
* Infine, per `Classe` dobbiamo rispondere alla seguente domanda *Un dato insegnante in quante classi può insegnare una certa materia?* Nel caso in cui la risposta sia *più di una classe*, indichiamo sul lato `Classe` della relazione `Insegna` `K` (per distinguerlo da `N` e `M`) ad indicare questo fatto.

## Entità deboli
Un'**entità debole** è un'entità che non possiede una chiave primaria, essa può esistere unicamente attraverso una relazione con un'altra entità **forte** dalla quale "eredita" la chiave in modo da costruire una chiave propria aggiungendo altre "sottochiavi". La relazione che lega un'entità debole alla sua entità forte viene detta *relazione identificante*, tale relazione deve sempre esistere (non può esistere un'entità debole senza che essa sia collegata ad una forte) e la partecipazione a tale relazione dell'entità debole deve essere totale. Nel diagramma ER, le entità deboli sono indicate con un doppio bordo, come anche le corrispondenti relazioni identificanti.

{{<column/two-cols wr=5 wl=7 content="left" embed="img/er-weak-entity.html">}}
Nell'esempio a fianco, si considera l'entità debole `Giustificazione` che può avere informazioni quali `giorno`, `motivazione` ed altre, ma che non può essere identificata solo combinando la chiave parziale `Giorno` (sottolineata in tratteggio) con la chiave dell'entità forte (`Studente` con chiave `codice`). Il collegamento di `Giustificazione` con `Studente` avviene mediante la relazione identificante `Presenta`.
{{</column/two-cols>}}

{{<observe>}}
Un'entità debole è diversa dall'entità forte che la identifica, la `Giustificazione` dell'esempio sopra, **non** è lo `Studente`. Per identificare una relazione gerarchica, cioè due entità in cui una è una specificazione di un'altra si usa il concetto di [specializzazione](#specializzazione) discusso nel prossimo paragrafo.
{{</observe>}}

## Specializzazione
In certi casi può essere utile inserire nella schema concettuale un'indicazioni del fatto che alcune entità **specializzano** una specifica entità. Ad esempio ci possono essere insegnanti di laboratorio ed insegnanti di teoria.

{{<column/two-cols wr=5 wl=7 content="left" embed="img/er-specialization.html">}}
Per indicare una specializzazione si crea un collegamento tra l'entità generica e tutte le sue specializzazione. Questo collegamento (vedi figura a fianco) passa attraverso un nodo (il cerchio con `d` nella figura) che definisce se gli insiemi di specializzazione sono tra loro *disgiunti* (`d` nel nodo) o *sovrapposto* (`o` di *overlapping* nel nodo). Inoltre il collegamento ha una direzione dall'entità generica a quelle specializzate indicato da una freccia curvata a metà dell'arco tra il nodo e l'entità specializzata (vedi figura a fianco).
{{</column/two-cols>}}

La specifica delle entità specializzanti descritta sopra fa parte di un insieme di costrutti noti come EER (*Extended ER*) e non è tanto utilizzata quanto le altre notazioni descritte in questa e nelle precedenti lezioni. Inoltre, l'utilizzo della specializzazione può rendere più difficoltosa la traduzione dello schema concettuale in uno schema logico relazionale. Per questo motivo è sempre meglio utilizzare con molta parsimonia questo tipo di descrizione che, pur essendo comodo per rappresentare alcuni aspetti della realtà di interesse, possono poi rivelarsi un problema in una fase successiva della progettazione.
