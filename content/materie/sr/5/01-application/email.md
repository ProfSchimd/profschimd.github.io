---
title: "Protocolli per la posta elettronica: SMTP, POP e IMAP"
running_title: "SMTP, POP, IMAP"
type: lecture
summary: "Uno degli strumenti più usati è la posta elettronica (email). I protocolli SMTP, POP e IMAP che permettono l'utilizzo di questo servizio sono l'argomento di questa lezione"
---

Per gestire i messaggi di posta elettronica (email), la suite TCP/IP prevede diversi
protocolli. Il protocollo [SMTP](#smtp) si utilizza per la *spedizione* di messaggi e
per lo scambio di messaggi tra server; i protocolli [POP](#pop) e [IMAP](#imap),
invece, si usano per la ricezione (*download*) dei messaggi da un server di posta
ad un *client*.

Il sistema di gestione delle email è basato sullo scambio di messaggi tra utenti, ogni
utente possiede un indirizzo email nella forma `nome@dominio`. La parte `dominio`
dell'indirizzo individua un server da contattare, mentre la parte di `nome` individua
una *casella di posta* (*inbox*) all'interno del server (ovviamente `dominio` o
`nome` potrebbero non esistere).

Lo scambio di messaggi avviene sia tra *client* e *server*, sia tra *server* e *server*,
il meccanismo è simile a quanto avviene in un sistema postale, la lettera viene
consegnata all'ufficio più vicino che la smista attraverso il sistema all'ufficio che
sta più vicino al destinatario per la consegna.

I protocolli per la gestione della posta sono di due tipi:
* protocollo SMTP per la consegna dei messaggi e
* protocolli POP e IMAP per la consultazione della propria casella di posta.

Nell'esempio che segue vediamo come una tipica comunicazione email viene gestita dal
sistema di client e server mail e quali dei protocolli sono coinvolti in ogni passo
della comunicazione.

{{<column/two-cols wl=6 wr=6 content="left" embed="img/mail_protocols.html">}}
Ad esempio se Alice vuole mandare una mail a Bob usando il suo *client di posta*
(ad esempio Thunderbird, Outlook, ...), il client creerà un pacchetto SMTP per il
messaggio e lo consegna al *mail server* impostato per l'account (esempio `mail.cisco.com`).

Successivamente il mail server utilizza il protocollo SMTP per consegnare alla sua controparte
(esempio `mail.nyu.edu`) il messaggio spedito da `alice@cisco.com` nella *casella* (*inbox*)
`bob@nyu.edu`.

Infine, quando Bob sincronizza il proprio client di posta con il server associato al
suo account (`mail.nyu.edu`), client e server dialogano mediante uno tra POP e IMAP.
{{</column/two-cols>}}

{{<important>}}
Se destinatario e mittente hanno lo stesso dominio (esempio entrambi `@cisco.com`), lo
stesso server che riceve, via SMTP il messaggio dal mittente lo memorizza nella casella
del destinatario per consegnarlo, via POP o IMAP, quando questo richiede l'accesso alla
propria casella.
{{</important>}}

{{<attention title="Client Web">}}
Oggi è sempre più diffuso l'utilizzo di *client web*, ad esempio accedendo da un browser
a `mail.google.com` si può accedere alla propria casella senza scaricare nulla sul proprio
dispositivo ed utilizzando un'interfaccia HTML mediante protocollo HTTP.

In questo caso, l'applicazione web per la gestione della casella
{{</attention>}}

## SMTP
Il protocollo *Simple Mail Transfer Protocol (SMTP)* è utilizzato per spedire un messaggio di posta
dal mittente alla casella del destinatario. Come visto sopra, ci sono due modi di utilizzo del
protocollo:
1. tra cliente e server per l'invio di un messaggio di posta;
2. tra server e server per lo scambio di messaggi di posta.

L'attuale specifica di SMTP è contenuta nell'[RFC 5321][1].

### Porte note SMTP

{{<column/two-cols wl=6 wr=6 content="left" embed="img/smtp_ports.html">}}
SMTP utilizza il protocollo `TCP` per il livello di trasporto, un server SMTP si trova in
attesa di connessioni sulla porta `25` per le comunicazioni da altri server e sulla porta
`587` (sempre TCP) per le comunicazioni da client.

È importante notare che il mail server `cisco.com`, quando consegna il messaggio al mail
server `nyu.edu` si comporta come un client, nel senso che è lui ad aprire la connessione
TCP. Per meglio distinguere il ruolo di un "agente" SMTP si indica con
* *Mail User Agent (MUA)* il client di posta (che usa la porta `587`)
* *Mail Transfer Agent (MUA)* il server di posta che consegna un messaggio (usando la porta `25`).

Nell'esempio sopra, il client di Alice è l'MUA, mentre il server mail `cisco.com` è l'MTA.
{{</column/two-cols>}}

### Funzionamento di SMTP
Dop aver aperto la connessione TCP alla porta corretta, il protocollo SMTP prevede una
sequenza di *comandi* per lo scambio di messaggi.

* `HELO` utilizzato dal client per "presentarsi" al server
* `MAIL FROM:` indica chi è il mittente del messaggio
* `RCPT TO:` indicati quali sono i destinatari del messaggio
* `DATA` indica il contenuto del messaggio (termina con una riga contenente il solo punto `.`)
* `QUIT` chiude la connessione

la sequenza `MAIL FROM:`, `RCTP TO:`, `DATA` può essere ripetuta se più messaggi
devono essere spediti dallo stesso client allo stesso server (a meno che non sia
stato spedito il comando `QUIT` che chiude la connessione).

Di seguito un esempio di conversazione tra un server `S` SMTP e un clinet
`C` SMTP (Fonte [SMTP su Wikipedia (EN)][2])
```
S: 220 smtp.example.com ESMTP Postfix
C: HELO relay.example.org
S: 250 Hello relay.example.org, I am glad to meet you
C: MAIL FROM:<bob@example.org>
S: 250 Ok
C: RCPT TO:<alice@example.com>
S: 250 Ok
C: RCPT TO:<theboss@example.com>
S: 250 Ok
C: DATA
S: 354 End data with <CR><LF>.<CR><LF>
C: From: "Bob Example" <bob@example.org>
C: To: "Alice Example" <alice@example.com>
C: Cc: theboss@example.com
C: Date: Tue, 15 Jan 2008 16:02:43 -0500
C: Subject: Test message
C:
C: Hello Alice.
C: This is a test message with 5 header fields and 4 lines in the message body.
C: Your friend,
C: Bob
C: .
S: 250 Ok: queued as 12345
C: QUIT
S: 221 Bye
{The server closes the connection}
```


## POP

## IMAP

## Riferimenti
* [SMTP Wikipedia (EN)][2]
* [RFC 5321: Simple Mail Transfer Protocol][1]

[1]: https://datatracker.ietf.org/doc/html/rfc5321
[2]: https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol
