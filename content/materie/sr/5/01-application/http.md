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

Dopo il comando, la richiesta HTTP può contenere un header composta da una
lista di coppie chiave/valore (sia la chiave che il valore sono stringhe). Nell'esempio
a destra ci sono due coppie:
* chiave `Host` valore `developer.mozilla.org`,
* chiave `Accept-Language` valore `fr`.

La richiesta HTTP termina con due caratteri di fine righe (un fine riga è `CR+LF`: *carriage return*
più *line feed*).
{{</column/two-cols>}}

{{<attention>}}
Nella versione 1.1 di HTTP, l'header deve contenere l'indicazione dell'`Host` che indica
indirizzo (e porta opzionalmente) del server. In caso di mancato inserimento di questo
campo nell'header, la richiesta può essere rifiutata con un messaggio simile al seguente

    HTTP/1.1 400 Bad Request: missing required Host header
    Content-Type: text/plain; charset=utf-8
    Connection: close

    400 Bad Request: missing required Host header

{{</attention>}}

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

## Sessione HTTP
Il protocollo HTTP è un protocollo *stateless* nel senso che due connessione tra gli
stessi client e server, non viene ricordata dal server. Nel caso di *autenticazione*
(operazione estremamente frequente nel Web di oggi), ogni nuova richiesta (esempio
ogni nuova pagina) finirebbe con il richiedere le credenziali di accesso, cosa che
renderebbe inutilizzabile un sito.

Per ovviare a questo problema, le applicazioni web, che utilizzano quasi esclusivamente
il protocollo HTTP, utilizzano un meccanismo di *sessione*, solitamente basato su
token memorizzati nella cache le browser mediante i cosiddetti **cookies**.

### Cookies
I **cookie** sono dei dati che vengono spediti da un server mediante il protocollo HTTP
e che vengono salvati dal client. Una volta memorizzati (ad esempio nel *browser*) ogni
volta che una richiesta viene spedita al server che ha creato il cookie, il client aggiunge
i dati alla richiesta HTTP. In questo modo il server può *tracciare* le richieste
provenienti da uno stesso client, cosa che non sarebbe possibile utilizzando HTTP senza
i cookie.

#### Scambio di cookie
I cookie vengono gestiti mediante l'header dei messaggi HTTP:
* in una *risposta* dal server, si usa la chiave `Set-Cookie: DATA` per impostare (salvare)
un cookie nel client;
* in una *richiesta* dal client, si usa la chiave `Cookie: DATA` per spedire al
server un cookie salvato.

I cookie sono stringhe contenenti delle coppie `nome=valore`, ad esempio il server
potrebbe inviare una risposta del tipo

    HTTP/2.0 200 OK
    Content-Type: text/html
    Set-Cookie: yummy_cookie=choco
    Set-Cookie: tasty_cookie=strawberry

con la quale chiede al cliente di memorizzare due cookie: `yummy_cookie` con valore `choco`
e `tasty_cookie` con valore `strawberry`.

Ogni successiva richiesta al server da parte del client conterrà i cookie nell'header
della richiesta, ad esempio i due cookie sopra impostati saranno rispediti con una
richiesta HTTP simile alla seguente

    GET /sample_page.html HTTP/2.0
    Host: www.example.org
    Cookie: yummy_cookie=choco; tasty_cookie=strawberry

dove il campo `Host:` dell'header sarà quello associato al server che ha precedentemente
spedito i cookie.

#### Durata dei cookie
La durata in un cookie può essere di due tipi
* *session cookie* (cookie di sessione) che vengono eliminati alla chiusura del browser e
* *permanent cookie* (cookie permanenti) che rimangono impostati anche dopo la chiusura del
browser, questi cookie, tuttavia, hanno una *data di scadenza* (*expire date*) che viene
impostata dal server quando viene spedito il cookie.

Per indicare la scadenza di un cookie, si imposta `Expire=SCADENZA` dopo il valore del cookie,
ad esempio

    Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;

È possibile cancellare un cookie indicando una scadenza nel passato, in questo modo il client
considererà il cookie scaduto e, di conseguenza, lo eliminerà dalla propria memoria.

{{<attention>}}
Per indicare un cookie di sessione, il server invia il cookie **senza indicare la scadenza**,
se un cookie viene spedito con una scadenza, allora il cookie viene gestito dal client come
un cookie permanente.
{{</attention>}}

#### Cookie e sicurezza
Oltre ad `Expire` ci sono altri valori che possono essere impostati su un cookie, molti di
questi hanno a che fare con la sicurezza.
* `SameSite` (possibili valori: `Strict`, `Lax` e `None`) indica se il client accetta cookie
provenienti solo dall'host verso cui ha indirizzato la richiesta oppure se accetta anche i
*cookie di terze parti* (*third parties cookie*).
* `HttpOnly` impedisce l'accesso al cookie mediante Javascript, in questo modo gli script
(anche di malintenzionati) non possono accedere ai cookie.
* `Secure` impone che il cookie venga trasmesso utilizzando una connessione sicura mediante
HTTPS.

{{<observe>}}
I cookie possono contenere informazioni sensibili e sono quindi soggetti ai vari regolamenti
di protezione dei dati come, ad esempio, il [GDPR europeo](https://gdpr.eu/cookies).
{{</observe>}}

## Link utili
* [HTTP (Wikipedia, EN)][1]
* [HTTP Overview (Mozilla MDN)][2]
* [Cookie (Wikipedia, EN)][3]
* [Using HTTP Cookies (Mozilla MDN)][4]

[1]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
[3]: https://en.wikipedia.org/wiki/HTTP_cookie
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

