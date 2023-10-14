---
title: Domain Name System (DNS)
running_title: DNS
type: lecture
weight: 200
summary: "Per associare agli indirizzi IP dei nomi (esempio google.com) è necessario un apposito servizio che viene chiamato di risoluzione dei nomi. Questa lezione spiega brevemente il funzionamento di questo servizio mostrando il formato dei messaggi DNS."
---

## Funzionamento Domain Name System

## Messaggi DNS
I messaggi DNS possono essere di due tipi *query* (richiesta) e *reply* (risposta), i
l [formato dei messaggi DNS][1] è lo stesso per i due tipi ed è composto da un header
e da quattro sezioni:
1. *question*
2. *answer*
3. *authority*
4. *additional*

### Header DNS
L'header dei messaggi DNS è composto da 16 bit (2 byte) con il seguente significato
* `QR` (1 bit) tipo di messaggio: *query* (`QR=0`) o *reply* (`QR=1`)
* `OPCODE` (4 bit)	tipo di operazione: *query* (`OPCODE=0`), *inverse query* (inverse query, `OPCODE=1`), or *status* (server status request, `OPCODE=2`)
* `AA` (1 bit) indica se il DNS server è autoritativo per il nome richiesto
* `TC` (1 bit) *TrunCation*
* `RD` (1 bit) *Recursion Desired*
* `RA` (1 bit) *Recursion Available*
* `Z` (3 bit) riservato ad usi futuri (`Z=0`)
* `RCODE` (4 bit) codice di risposta: *no error* (`RCODE=0`), *format error* (`RCODE=1`), *server fail* (`RCODE=2`), *nonexistent domain* (`RCODE=3`)

### Body DNS
Come detto sopra il corpo del messaggio DNS è composto di quattro parti, la prima
(*question*) ha un formato diverso dalle altre tre.
#### DNS Question
Un messaggio DND di tipo *question* contiene uno (o più di uno,in casi rari) *resource
record* con tre campi:
* `NAME` (dimensione variabile): nome della richiesta
* `TYPE` (2 byte): tipo di `RR`
* `CLASS` (2 byte): classe (solitamente `IN` per `IN`ternet)

#### DNS Record
Le parti del messaggio DNS *answer*, *authority* e *additional* sono composte di 
*resource record* `RR`, ogni record ha tre campi:
* `NAME` (dimensione variabile): nome della richiesta
* `TYPE` (2 byte): tipo di `RR`
* `CLASS` (2 byte): classe (solitamente `IN` per `IN`ternet)
* `TTL` (4 byte): *Time To Live* in secondi del `RR`
* `RDLENGTH` (2 byte): linghezza del campo `RDATA`
* `RDATA` (dimensione `RDLENGTH` byte): altre informazioni sul record

[1]: https://en.wikipedia.org/wiki/Domain_Name_System#DNS_message_format