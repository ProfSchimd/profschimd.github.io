---
title: Cosa vuol dire progettare una rete
type: lecture
weight: 10
summary: "Prima di cimentarsi con la progettazione di una rete, è necessario
capire cosa significa progettare una rete. Questa lezione fornisce una breve
introduzione e panoramica dei problemi relativi alla progettazioni di reti."
---

Progettare una rete è un'operazione estremamente complessa che spesso coinvolge
molte persone e figure professionali adeguatamente formate. Questa lezione mostra
brevemente quali sono i vari aspetti della progettazione alcuni dei quali sono
discussi più in dettaglio nelle successive lezioni.

## Requisiti
La corretta progettazione di una rete si ottiene quando la rete funziona senza
interruzione e senza malfunzionamenti. Per ottenere questo è necessario conoscere
i **requisiti** della rete i quali descrivono in dettaglio cosa significa che la
rete sta funzionando correttamente. Per questo motivo è fondamentale eseguire
l'*analisi dei requisiti* di una rete prima di passare alla sua progettazione.
L'analisi dei requisiti è una fase estremamente importante che coinvolge diverse
figure tra cui gli utenti e i progettisti. 

Durante l'analisi dei requisiti molti aspetti della rete vanno stabiliti, vediamone
alcuni di seguito.
* *Dispositivi*: quali tipi e quanti dispositivi dovranno connettersi alla rete
indicando in che modo (cavo o wireless) e in che posizione.
* *Servizi*: quali servizi deve offrire la rete in termini di configurazione,
risorse condivise, connettività, ...
* *Dislocazione fisica* 

## In breve..

* **Requisiti**: come verrà usata la rete e che servizi deve offrire.
    * **Dispositivi e servizi**: quanti dispositivi e come saranno collegati, quali servizi deve offrire la rete.
    * **Dislocazione fisica**: quale è l'ambiente in cui la rete viene realizzata.
    * **Costi**: quali sono i vincoli di *budget* nella creazione e nella gestione della rete.
* **Progettazione fisica**: definisce come gli apparati e i cablaggi vengono fisicamente realizzati.
    * **Topologia**: come i collegamenti della rete sono organizzata.
    * **Dispositivi**: quali dispositivi di rete servono e quali dispositivi potranno connettersi.
    * **Cablaggio**: come vengono connessi i dispositivi tra di loro e come vengono stesi i cavi per la connessione.
* **Progettazione logica**: come suddivido la rete in maniera *logica*.
    * **VLAN**: come impostare gli switch per realizzare la rete logica.
    * **Indirizzamento e Subnetting**: come assegno gli indirizzi IP ai vari dispositivi.
    * **Routing**: come realizzo il routing all'interno della rete (se più router sono presenti).
* **Applicazioni di rete**: quali servizi applicativi deve fornire la rete.
    * **Gestione della rete**: DHCP, DNS, ...
    * **Servizi di rete**: web, mail, ftp, ...
    * **Sicurezza nelle reti**: come gestire la sicurezza della rete.
        * **DeMilitarized Zone (DMZ)**: meccanismo per proteggere la parti sensibili della rete mantenendo accessibili quelle che devono essere esposte all'esterno.
        * **Multi-tier architecture**: tipica architettura utilizzata per le applicazioni web.
        * **Firewall**: meccanismo che permette di gestire gli accessi alla rete.
* **Manutenzione** della rete: come mantenere il corretto funzionamento della rete.
    * **Collaudo della rete**: dimostrare che la rete installata funziona secondo quanto progettato.
    * **Gestione della sicurezza**: mantenere la rete in sicurezza durante l'intera vita.
    * **Quality of Service**: garantire che le applicazioni di rete funzionino nel modo adeguato.
    * **Fault tolerance**: garantire il funzionamento della rete anche in caso di guasti.