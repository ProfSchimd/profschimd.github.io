---
title: Protocollo HTTP
weight: 300
---

Il protocollo HTTP (**H**yper**T**ext **T**ransfer **P**rotocol) e la sua versione *sicura* HTTPS (HTTP **S**ecure) sono tra i più importanti protocolli di Internet.
Inizialmente sviluppato da Tim Berners-Lee al CERN, HTTP è stato ufficialmente definito nel 1996
([qui](https://www.w3.org/Protocols/HTTP/HTTP2.html) la versione del 1992)

Le versioni attualmente più diffuse sono:
* HTTP/1.1: RFC 9112
* HTTP/2: RFC 9113
* HTTP/3: RFC 9114

## Funzionamento
Il protocollo HTTP è un protocollo basato sul paradigma client/server ed utilizza il
protocollo TCP a livello di trasporto. A tale scopo sono riservate le porte 80 e 443
per server HTTP e HTTPS, rispettivamente (spesso viene anche usata la porta 8080).

Una comunicazione HTTP avviene secondo i seguenti passi:
1. il client stabilisce una connessione TCP con il server;
2. il client manda una *richiesta HTTP* al server;
3. il server processa la richiesta e prepara una risposta;
4. il server invia la risposta al client;
5. la connessione viene chiusa (salvo richiesta esplicita di mantenerla attiva).

### La richiesta HTTP

{{<column/two-cols wl=6 wr=6 content=left embed="img/http_request_mdn.html">}}
Ogni richiesta HTTP è formata da un *comando* e da un *header*, il comando a sua volta
contiene, solitamente, un **metodo** (*method*), un **path** e la **versione** del
protocollo. Il comando dell'esempio a destra:
* usa il metodo `GET`,
* chiede il path `/`
* utilizza la version `1.1` del protocollo `HTTP`.

Dopo il comando, la richiesta HTTP può contenere un header opzionale composta da una
lista di coppie chiave/valore (sia la chiave che il valore sono stringhe). Nell'esempio
a destra ci sono due coppie:
* chiave `Host` valore `developer.mozilla.org`,
* chiave `Accept-Language` valore `fr`.

La richiesta HTTP termina con due caratteri di fine righe (un fine riga è `CR+LF`: *carriage return*
più *line feed*).
{{</column/two-cols>}}

#### Comandi
Il comando spedito nella richiesta HTTP può essere uno tra quelli definiti nel corrispondente RFC
(la lista dei comandi disponibili può variare in base alla versione del protocollo). Il comando
è indicato con una stringa (solitamente maiuscola) all'inizio della richiesta, tra i comandi più
utilizzati ci sono:

* `GET` richiede una *risorsa* (es. file) al server, la risorsa, se presente, deve essere spedita al client senza alcun effetto sullo stato del server.
* `POST` simile a `GET` viene utilizzato per spedire informazione addizionale, il tipico uso è la
spedizione dei dati inseriti un u *form HTML*.
* `PUT` genera o aggiorna una risorsa presente nel server
* `DELETE` richiede l'eliminazione di una risorsa dal server.
* `HEAD` richiede informazioni su una risorsa, ma non la risorsa stessa, può essere utilizzato, ad
esempio, per sapere se un file (magari di dimensioni notevoli) è stato modificato e quindi necessita
di essere ri-scaricato.

### La riposta HTTP
{{<column/two-cols wl=6 wr=6 content="left" embed="img/http_reply_mdn.html">}}
Dopo aver decodificato (*parsing*) la richiesta ed eseguite le opportune operazioni
(ad esempio recuperato il file richiesto), il server costruisce una *riposta HTTP* che
spedisce al client utilizzando il flusso `Server -> Client` della connessione TCP.

La riposta ha un formato simile alla richiesta ed è composta di uno *stato* e da un
*header* opzionale. Lo stato contiene
* la **versione** (*version*) del protocollo HTTP utilizzata,
* uno **status code** che indica lo stato della richiesta (vedi [sotto]({{< ref "#status-code">}}))
{{</column/two-cols>}}

#### Status code 
Una volta ricevuta la richiesta nel formato descritto [sopra]({{< ref "#la-richiesta-http" >}}),
il server la elabora e agisce di conseguenza. Questa elaborazione può andare a buon fine, ma
può anche fallire per vari motivi, ad esempio:
* la risorsa richiesta può essere o meno disponibile;
* il client potrebbe non avere i permessi necessari ad accedere e/o modificare
* la richiesta potrebbe avere una sintassi non corretta;
* un errore può avvenire durante l'elaborazione nel server
* ...

Per indicare lo *stato* della richiesta, il server spedisce al client uno *status code*,
questi codici numerici sono composti di tre cifre decimali la prima delle quali la tipologia
di codice (alcuni codici importanti vengono riportati).
* `1XX` (informazioni) richiesta ricevuta ed ancora in fase di *processing*.
* `2XX` (successo) richiesta ricevuta ed accettata.
    * `200` Ok
    * `201` Created
* `3XX` (redirect) Serve un ulteriore passaggio da parte del client.
    * `301`: Moved Permanently
* `4XX` (client error) request con sintassi o non soddisfacibile.
    * `400`: Bad Request
    * `403`: Forbidden
    * `404`: Not Found
* `5XX` (server error) il server non può soddisfare la richiesta (che però è corretta)
    * `500` Internal Server Error
    * `503` Service Unavailable

## Link utili
* [HTTP (Wikipedia, EN)][1]
* [HTTP Overview (Mozilla MDN)][2]

[1]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview

