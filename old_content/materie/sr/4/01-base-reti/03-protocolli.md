---
title: Protocolli di rete
running_title: Protocolli
type: lecture
weight: 300
---

{{<def title="Protocollo">}}
Un **protocollo di rete** è un *insieme di regole* che determinano il modo in cui avviene una
*comunicazione* tra due software. I protocolli sono usati da software che si posizionano allo
stesso livello del modello di riferimento.
{{</def>}}

La definizione appena data presenta diversi aspetti da capire.
* **Insieme di regole** proprio come nella comunicazione tra persone, è necessario che si
stabiliscano delle regole perché questa comunicazione possa avvenire. Le regole si stabiliscono
per garantire diversi *requisiti*
    * due persone devono in una lingua comprensibile ad entrambi;
    * se "distanti" le due persone devono utilizzare opportuni mezzi;
    * due persone non dovrebbero parlare contemporaneamente;
    * se la conversazione è riservata e remota, bisogna essere sicuri dell'identità interlocutore
* **Comunicazione** come visto sopra, lo scopo è, solitamente quello di effettuare una comunicazione,
vale a dire uno *scambio di informazioni*.
* **Livello del modello** nelle reti informatiche, le comunicazioni avvengono in modo che solo
gli stessi livelli possano comunicare *direttamente*. Questo viene effettuato principalmente per
garantire un "isolamento" dei vari livelli.

Per meglio capire il concetto di protocollo, vediamo alcuni esempi prese dalla comunicazione tra
persone.

{{<example title="Che ore sono?">}}
Supponiamo di trovarci per strada, con il telefono scarico e senza orologio ed avere
bisogno di conoscere l'ora. Quello che succederebbe sarà, più o meno la seguente cosa
1. si individua una persona disposta a rispondere (magari non al telefono, perché?);
2. si attira l'attenzione *Scusi?* e si aspetta una risposta (se non parla italiano?);
3. quando la persona mostra di essere disponibile si formula la richiesta *Che ore sono?*;
4. in attesa di risposta si lascia che la persona comunichi la risposta.
{{</example>}}

{{<example tile="Scambio di email">}}
*Alice* e *Bob* vogliono scambiarsi delle informazioni riservate per il loro progetto
segreto. Utilizzano la mail per scambiarsi domande e idee sul progetto. 
1. Alice manda la sua idea a Bob 

    ``Ciao Bob, 
    ho pensato che potremmo inventare una macchina del tempo che ne dici?
    Alice``

2. Bob riceve la mail e risponde con quello che ne pensa. Nel frattempo Alice non
manda continuamente una mail (o un messaggio) chiedendo a Bob se ha letto la sua
idea.
{{</example>}}