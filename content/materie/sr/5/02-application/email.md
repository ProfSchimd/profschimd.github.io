---
title: "Protocolli per la posta elettronica: SMTP, POP e IMAP"
running_title: "SMTP, POP, IMAP"
type: lecture
weight: 500
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
Il *Post Office Protocol (POP)* è utilizzato per recuperare da una casella di posta
i messaggi in essa contenuti. Attualmente la versione utilizzata è *POP3* definita
nell'[RFC 5024][4].

### Porte note POP3
Al protocollo POP3 sono riservate due *porte note*, la porta TCP numero `110` e la
porta TCP numero `995`. La seconda delle due porte note è riservata alla versione
*secure* del protocollo chiamata *POP3S* (simile ad [http]({{< ref "http.md" >}})).

### Funzionamento di POP3
Una volta stabilita la connessione TCP tra client (`C`) e server (`S`), i due
instaurano un "dialogo" attraverso comandi impartiti dal client a cui il server
risponde. I principali comandi POP3 sono i seguenti:
* `USER` il client si identifica presso il server (primo comando)
* `PASS` il client fornisce la propria password (secondo comando)
* `STAT` richiede il numero e la dimensione totale dei messaggi
* `LIST` restituisce la lista dei messaggi
* `RETR` restituisce il messaggio con indice indicato
* `DELE` elimina il messaggio con indice indicato
* `QUIT` chiude la connessione

Qui sotto vediamo un esempio di comunicazione tra client e server durante la quale
due messaggi vengono recuperate e cancellati (Fonte: [Wikipedia POP (EN)][3]).

```
C:    STAT
S:    +OK 2 320
C:    LIST
S:    +OK 2 messages (320 octets)
S:    1 120
S:    2 200
S:    .
C:    RETR 1
S:    +OK 120 octets
S:    <the POP3 server sends message 1>
S:    .
C:    DELE 1
S:    +OK message 1 deleted
C:    RETR 2
S:    +OK 200 octets
S:    <the POP3 server sends message 2>
S:    .
C:    DELE 2
S:    +OK message 2 deleted
C:    QUIT
S:    +OK dewey POP3 server signing off (maildrop empty)
```

{{<attention title="Limiti di POP3">}}
Il protocollo POP3 non prevede la differenziazione tra messaggi letti e messaggi
non letti, dal punto di vista di POP3 la casella di posta è una sequenza di messaggi
numerati `1,2,...`. 

Inoltre POP3 non prevede alcun tipo di organizzazione dei messaggi all'interno
della casella, non sono quindi previste cartelle, posta in arrivo, posta inviati
né altre modalità di organizzazione e classificazione dei messaggi.

Per questi motivi, la gestione di una casella di posta con accesso mediante POP3
risulta difficoltosa. Il protocollo [IMAP](#imap) è stato creato proprio per
sopperire a queste mancanze del protocollo POP3.
{{</attention>}}

## IMAP
Il protocollo *Internet Message Access Protocol (IMAP)* è utilizzato per recuperare
da una casella di posta i messaggi oltre che ad organizzarli nella stessa casella.
Il protocollo IMAP è definito nell'[RFC 9051][6] (attualmente la revisione 2 della
versione 4 del protocollo).

### Porte note IMAP
Al protocollo IMAP sono riservate due *porte note*, la porta TCP numero `143` e la
porta TCP numero `993`. La seconda delle due porte note è riservata alla versione
*secure* del protocollo chiamata *IMAPS* (simile a [POP](#pop)).

### Funzionamento di IMAP
Il funzionamento di IMAP assomiglia a quello di POP3, ma con l'importante differenza
rappresentata dal concetto di **cartella** o **mailbox**. Le cartelle sono dei modi
di organizzare logicamente i messaggi all'interno del server. È perciò possibile
tener traccia di varie cose non possibili in POP: messaggi non letti, messaggi archiviati,
cestino, ... Altra differenza importante è la possibilità di recuperare (`FETCH`)
solo i messaggi di una specifica cartella.

Di seguito presentiamo una breve lista dei principali comandi IMAP.
* `LOGIN` procede all'autenticazione presso il server
* `SELECT` seleziona una cartella
* `CREATE` crea una nuova cartella sul server
* `DELETE` elimina una cartella
* `LIST` restituisce l'elenco della cartella selezionata
* `CLOSE` chiude la cartella selezionata
* `FETCH` recupera i messaggi da una cartella
* `LOGOUT` chiude l'attuale sessione

```
S:   * OK IMAP4rev1 Service Ready
C:   a001 login mrc secret
S:   a001 OK LOGIN completed
C:   a002 select inbox
S:   * 18 EXISTS
S:   * FLAGS (\Answered \Flagged \Deleted \Seen \Draft)
S:   * 2 RECENT
S:   * OK [UNSEEN 17] Message 17 is the first unseen message
S:   * OK [UIDVALIDITY 3857529045] UIDs valid
S:   a002 OK [READ-WRITE] SELECT completed
C:   a003 fetch 12 full
S:   * 12 FETCH (FLAGS (\Seen) INTERNALDATE "17-Jul-1996 02:44:25 -0700"
      RFC822.SIZE 4286 ENVELOPE ("Wed, 17 Jul 1996 02:23:25 -0700 (PDT)"
      "IMAP4rev1 WG mtg summary and minutes"
      (("Terry Gray" NIL "gray" "cac.washington.edu"))
      (("Terry Gray" NIL "gray" "cac.washington.edu"))
      (("Terry Gray" NIL "gray" "cac.washington.edu"))
      ((NIL NIL "imap" "cac.washington.edu"))
      ((NIL NIL "minutes" "CNRI.Reston.VA.US")
      ("John Klensin" NIL "KLENSIN" "MIT.EDU")) NIL NIL
      "<B27397-0100000@cac.washington.edu>")
      BODY ("TEXT" "PLAIN" ("CHARSET" "US-ASCII") NIL NIL "7BIT" 3028
      92))
S:   a003 OK FETCH completed
C:   a004 fetch 12 body[header]
S:   * 12 FETCH (BODY[HEADER] {342}
S:   Date: Wed, 17 Jul 1996 02:23:25 -0700 (PDT)
S:   From: Terry Gray <gray@cac.washington.edu>
S:   Subject: IMAP4rev1 WG mtg summary and minutes
S:   To: imap@cac.washington.edu
S:   cc: minutes@CNRI.Reston.VA.US, John Klensin <KLENSIN@MIT.EDU>
S:   Message-Id: <B27397-0100000@cac.washington.edu>
S:   MIME-Version: 1.0
S:   Content-Type: TEXT/PLAIN; CHARSET=US-ASCII
S:
S:   )
S:   a004 OK FETCH completed
C    a005 store 12 +flags \deleted
S:   * 12 FETCH (FLAGS (\Seen \Deleted))
S:   a005 OK +FLAGS completed
C:   a006 logout
S:   * BYE IMAP4rev1 server terminating connection
S:   a006 OK LOGOUT completed
```

## Riferimenti
* [SMTP Wikipedia (EN)][2]
* [RFC 5321: Simple Mail Transfer Protocol][1]
* [POP Wikipedia (EN)][3]
* [RFC 5034: The Post Office Protocol (POP3)][4]
* [IMAP Wikipedia (EN)][5]
* [RFC 9051: Internet Message Access Protocol (IMAP) - Version 4rev2][6]

[1]: https://datatracker.ietf.org/doc/html/rfc5321
[2]: https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol
[3]: https://en.wikipedia.org/wiki/Post_Office_Protocol
[4]: https://datatracker.ietf.org/doc/html/rfc5034
[5]: https://en.wikipedia.org/wiki/Internet_Message_Access_Protocol
[6]: https://datatracker.ietf.org/doc/html/rfc9051
