---
title: De-Militarized Zone (DMZ)
running_title: DMZ
type: lecture
weight: 50
summary: ""
draft: true
---

## Descrizione
Uno dei problemi che un amministratore di rete deve affrontare riguarda il
mentenimento di adeguati livelli di sicurezza pur consentendo al traffico esterno
di raggiungere la rete. Particolarmente cruciale è la gestione dei *server* da
esporre sulla rete pubblica senza per questo compromettere la sicurezza della
rete interna.

In computer security, a DMZ or demilitarized zone (sometimes referred to as a perimeter network or screened subnet) is a physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted, usually larger, network such as the Internet. T

## Implementazioni

### Firewall

### Router con ACL
Le *Accesso Control List (ACL)*, se opportunamente impostate, permettono di creare
DMZ.

{{<attention>}}
Ogni pacchetto viene confrontato con ogni regola **nell’ordine in cui le regole sono state inserite**. Se nessuna regola è applicabile al pacchetto, allora interviene la *regola di default* che prevede di **bloccare tutto il traffico**. Questo comportamento può confondere in quanto non si verifica in assenza di regole. Perciò può accadere che l’aggiunta di una regola abbia effetti su pacchetti che non ha nulla a che vedere con quella regola.
{{</attention>}}

#### Principali comandi Cisco IOS per ACL

Per vedere tutte le regole impostate
```
Router# show access-list
```

Per impostare una ACL *estesa*
```
access-list number deny|permit protocol source source-wildcard destination destination-wildcard
```
Dove 
* `number` rappresenta il numero (almeno 100 per ACL estese)
* `deny|permit` indica l'azione da applicare
* `protocol` indica su che protocolli applicare
* `source source-wildcard` indicano l'origine dei pacchetti
* `destination destination` indicano la destinazione dei pacchetti

Maggiori dettagli sulle ACL si trovano sul [sito di Cisco][3], alcuni esempi di
ACL usati di frequente si possono trovare [qui][2].


## Riferimenti

* [DMZ (Wikipedia EN)][1]
* [ACL comuni (Cisco)][2]
* [Cisco ACL][3]

{{<youtube dqlzQXo1wqo >}}

[1]: https://en.wikipedia.org/wiki/DMZ_(computing)
[2]: https://www.cisco.com/c/it_it/support/docs/ip/access-lists/26448-ACLsamples.html
[3]: https://www.cisco.com/c/en/us/support/docs/security/ios-firewall/23602-confaccesslists.html
