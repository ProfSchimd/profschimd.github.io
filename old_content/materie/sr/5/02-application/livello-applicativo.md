---
title: Caratteristiche del livello applicativo
type: lecture
weight: 100
summary: "In questa lezione vediamo le principali caratteristiche del livello mettendolo in relazione con il sottostante livello di trasporto."
---

Il **livello applicativo** (*application layer*) è l'ultimo (settimo) livello dell'[architettura ISO/OSI]({{< ref "02-architettura-rete.md">}}). Il suo ruolo è quello di fornire i *servizi* necessari alla realizzazione di un'applicazione di rete quali posta, World Wide Web, streaming e molte altro.

La quantità di protocolli del livello applicativo è vastissima ed è praticamente impossibile discuterli tutti. Alcuni di questi protocolli, tuttavia, ricoprono un ruolo fondamentale nell'utilizzo di Internet ed è quindi importante conoscerne i dettagli. In particolare, sono di fondamentale importanza i seguenti protocolli del livello applicativo.

* DNS (*Domain Name Server*) permette di **tradurre nomi in indirizzi** (es. tradurre google.it  in `216.58.206.67`).
* HTTP (*HyperText Transfer Protocol*) rappresenta il protocollo alla base del **World Wide Web (WWW)**, ma è in protocollo attraverso il quale molte App (es. Facebook, Instagram, Gmail, ...) accedono ai dati in rete.
* SMTP (*Simple Mail Transfer Protocol*), POP (*Post Office Protocol*) e IMAP (*Internet Message Access Protocol*) sono i protocolli che permettono l **scambio di email**.
* FTP (*File Transfer Protocol*) rappresenta uno dei protocolli più usati per **trasferire file**.

## La scelta del protocollo di trasporto
Ogni protocollo del livello applicativo TCP/IP *utilizza i servizi del livello di trasporto* per comunicare con la sua "controparte" remota (es. client/server). Come sappiamo, in TCP/IP esistono due protocolli del livello di trasporto TCP e UDP. La scelta di quale tra questi due protocolli scegliere dipende dal tipo di applicazione che si sta progettando. Ad esempio un'applicazione basata su client e server che si scambiano dati attraverso HTTP, utilizzerà TCP, mentre un client che voglia risolvere un nome utilizzando un server DNS lo deve fare attraverso il protocollo di trasporto UDP.

### Porte del livello di trasporto
Ricordiamo che ogni host della rete si comporta come un "condominio" nel quale si trovano diversi "appartamenti" (fuori di metafora, ogni appartamento è un processo in esecuzione sull'host). Quando si deve contattare uno di questi appartamenti (ad esempio l'appartamento "HTTP" del condominio "google.it") è necessario conoscerne il numero. È importante sottolineare che ogni host ha due tipi di appartamenti TCP e UDP, quindi per identificare esattamente quale appartamento bisogna indicare tipo (es. TCP) e numero (es. 80). Ovviamente, ogni condominio ha il proprio indirizzo che, nella nostra metafora, è l'indirizzo IP (es. `216.58.206.67`).

### Alcune porte riservate
{{<column/two-cols wl=6 wr=6 embed="img/porte_note.html" content="right">}}
Proprio perché è necessario conoscere la porta per poter contattare un processo remoto, ogni protocollo di livello applicativo è associato ad una **porta riservata** che è buona norma non occupare con altri tipi di servizi. 

Nella figura accanto si vedono alcuni esempi di porte riservate. Ad esempio il servizio DNS di traduzione dei nomi è solitamente assegnato alla porta 53 UDP mentre il servizio HTTP alla porta 80 TCP. La lista completa delle porte riservate è mantenuta da **IANA** (*Internet Assigned Numbers Authority*) e si può consultare a [questa pagina](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml).

È importante, tuttavia, sottolineare che l'utilizzo di porte note per servizi diversi da quelli "ben noti" non dà luogo ad alcun tipo di errore da parte del sistema operativo (men che meno da parte del compilatore).
{{</column/two-cols>}}


## Link utili

### RFC's

* [RFC 1035 "Domain Name Server"](https://datatracker.ietf.org/doc/html/rfc1035)
* [RFC 7549 "Hypertext Transfer Protocol Version 2"](https://datatracker.ietf.org/doc/html/rfc7549)
* [RFC 5321 "Simple Mail Transfer Protocol"](https://datatracker.ietf.org/doc/html/rfc5321)
* [RFC 1939 "Post Office Protocol - Version 3"](https://datatracker.ietf.org/doc/html/rfc1939)
* [RFC 3501 "Internet Message Access Protocol - Version 4rev1"](https://datatracker.ietf.org/doc/html/rfc3501)
* [RFC 959 "File Transfer Protocol"](https://datatracker.ietf.org/doc/html/rfc959)