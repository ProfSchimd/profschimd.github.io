---
title: Architettura a strati per le reti
weight: 20
---

## Modelli a strati
Una rete come **Internet** è un artificio umano estremamente complesso. Si [stima](https://techjury.net/blog/how-many-iot-devices-are-there/) che ci siano più di *20 miliardi* di dispositivi connessi alla rete (quanti dei vostri dispositivi - PC, smartphone, PS5, ... - sono connessi ad Internet?). 

{{<think>}}
Quanti e quali dispositivi sono connessi? Scrivi una risposta e solo dopo [clicca qui](https://drive.google.com/file/d/1hYZcGSvJinFby1Zbim6lS8mA3nOv6n_R/view) e rifletti sulla tua risposta. Aggiungeresti qualcosa alla lista dei tuoi dispositivi connessi?
{{</think>}}

Per gestire un sistema così complesso le reti moderne come Internet sono costruite basandosi su **architetture a strati** (*layered architecture*). Un'architettura di rete è l'insieme di tutte le componenti hardware e software che costituiscono la rete.
Il modello a strati viene di fatto utilizzato anche per spedire documenti fisici: [esempio](mail_encapsulation.html).

{{<column/two-cols wl=4 wr=8 content=right embed="img/livelli_sap.html">}}
In una architettura a strati ci sono vari **livello** (4 nell'esempio a sinistra). I livelli più alti (numero più grande) fanno richieste ai livelli più bassi seguendo la regola che il ``livello n`` fa richieste solo al ``livello n-1``. Ad esempio, il ``livello 3`` può solo richiedere **servizi** al ``livello 2``. Queste richieste vengono fatte attraverso dei **Service Access Point** (**SAP**).

L'idea fondamentale è che ogni livello si occupa di un specifico problema della trasmissione su rete. Ad esempio il ``livello 1`` (quello più in basso che non può usare i servizi di nessuno) di solito è quello che spedisce i bit sul mezzo fisico (es. il cavo di rame per le reti cablate o l'etere per le reti wireless). Di contro, il livello più alto è quello che si occupa di prendere in carico la richiesta dell'utente (ad esempio l'URL digitato dall'utente sulla barra degli indirizzi del browser). 
{{</column/two-cols>}}

### Modello ISO/OSI
{{<column/two-cols wl=4 wr=8 content=right embed="img/iso_osi.html">}}
L'ente internazionale di standardizzazione *International Organization for Standardization* (ISO) ha proposto un'architettura a strati chiama Open System Interconnection (OSI), da cui il nome **ISO/OSI**. Questo modello di architettura prevede 7 livelli.

1. Fisico (*physical*)
2. Collegamento (*data link*)
3. Rete (*network*)
4. Trasporto (*transport*)
5. Sessione (*session*)
6. Presentazione (*presentation*) 
7. Applicazione (*application*)

L'architettura ISO/OSI non è stata molto utilizzata principalmente perché l'architettura TCP/IP (vedi sotto) ha avuto maggior successo anche grazie al fatto che è l'architettura utilizzata dalla rete Internet.
{{</column/two-cols>}}

### Modello TCP/IP
{{<column/two-cols wl=4 wr=8 content=right embed="img/tcp_ip.html">}}
Anche la rete Internet utilizza un'architettura a strati chiamata **TCP/IP** o **Internet Suite Protocol**. Rispetto all'architettura ISO/OSI, questa contiene 4 livelli

1. Interfaccia di Rete (*network interface*)
2. Rete (*network*)
3. Trasporto (*transport*)
4. Applicazione (*application*)

Nella figura a sinistra si vede la corrispondenza tra i livelli ISO/OSI ed i livelli TCP/IP. Come si vede, due sono le differenze principali.

* Il livello applicazione di TCP/IP comprende tutti e tre i livelli più alto di ISO/OSI
* Il livello di interfaccia di rete di TCP/IP comprende i due livelli più bassi di ISO/OSI
{{</column/two-cols>}}