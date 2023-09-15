---
title: Incapsulamento
type: lecture
weight: 400
---

Una delle operazione più importanti nelle reti è quella di incapsulamento, questa operazione
è l'analogo dell'imbustare nel caso della posta tradizionale. Quando si deve spedire una
lettera o un documento, normalmente si inserisce tale documento in una busta la quale viene
poi chiusa e sulla quale vengono scritti le informazioni utili per la consegna della busta.
Queste informazioni non sono il contenuto del messaggio (cioè il documento da spedire), ma
sono fondamentali per la corretta consegna della busta. Nella posta tradizionale, queste
informazioni comprendono almeno il *destinatario* della busta, spesso anche il *mittente*
(utilizzato dalle poste nel caso di mancato recapito) e altre informazioni (es. il francobollo
ed il timbro postale).

Allo stesso modo, i protocolli di rete prendono le informazioni (*messaggio*) che si vuole
spedire e lo "imbustano" (**incapsulano**) all'interno di un *pacchetto* aggiungendo le
informazioni necessarie alla rete per consegnare il pacchetto alla destinazione. Come per la
posta tradizionale, anche nel caso dei protocolli di rete, l'informazione che viene aggiunta
per permettere la consegna comprende:

* un qualche modo di *identificare il destinatario* del pacchetto, si parla di **indirizzo**
del destinatario (simile all'indirizzo di posta nelle lettere);
* un qualche modo di *identificare il mittente* del pacchetto (**indirizzo**) che di norma
è lo stesso meccanismo di identificazione del destinatario;
* altra informazione che permette ai dispositivi di rete di gestire correttamente il pacchetto.

{{<def title="Incapsulamento">}}
L'**incapsulamento** è il processo di avviene quando il pacchetto di un livello superiore
(chiamato anche *PDU: Protocol Data Unit*) viene affiancato ad un *header* (intestazione)
che contiene le informazioni relative al livello corrente.
{{</def>}}

## Confronto con la posta ordinaria
{{<include "img/packet-vs-mail.html">}}
