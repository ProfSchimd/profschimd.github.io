---
title: Sicurezza nei Web Service
weight: 300
type: lecture
summary: "Questa lezione tratta la sicurezza nei web service affrontando il problema dell'autenticazione e delle minacce alla sicurezza di un web service."
---

## Meccanismi di autenticazione
Oggigiorno i *web service* sono utilizzati sia per fornire l'accesso a risorse
*pubbliche*, sia per l'accesso a risorse *private*. Nel secondo caso, il
meccanismo di *autenticazione* deve garantire un adeguato livello si sicurezza.



### Utente e password
Quando un client richiede l'accesso a un web service protetto da autenticazione, il server risponde con una challenge, ovvero una stringa casuale. Il client deve quindi calcolare l'hash della password concatenata alla challenge utilizzando un algoritmo di hashing, ad esempio MD5 o SHA-1. L'hash calcolato viene inviato insieme all'username nel campo Authorization della richiesta HTTP, utilizzando lo schema Basic Authentication. Il server verifica l'username e l'hash, e se corretti permette l'accesso alle risorse protette.

### Token di accesso
{{<column/two-cols wr=4 wl=8 content="left" embed="img/web-server-token.html">}}
L'autenticazione mediante *token* o *API key* prevede che il client invii una
stringa chiamata token per poter accedere ai servizi. Normalmente, il token viene
generato dal server previa l'autenticazione con altri meccanismi quali, ad esempio,
[utente e password](#utente-e-password). Il token inviato al client, verrà usato
ad ogni successiva richiesta verso server. 

Il token può essere creato utilizzando diversi algoritmi di crittografia e spesso
ha una scadenza. In caso di scadenza, l'utente dovrà ottenere un nuovo token per
accedere nuovamente ai servizi del web service.

Facendo riferimento alla figura a fianco, vediamo i passi che coinvolgono una
sessione protetta mediante *token*.

1. Inizialmente il client spedisce al server le proprie credenziali (*username* e
*password*).
2. Il server verifica, consultando un database, che le credenziali siano valide
e genera il token.
3. Il token generato viene anche associato all'utenza appena autenticata inserendolo
nel database (questa servirà per le prossime richieste).
4. Il server risponde al cliente inviando il token.

Successivamente (parte bassa della figura) la comunicazione tra cliente e server
avviene servendosi del token.
1. Il client manda, con ogni richiesta, il token che ha precedentemente ottenuto dal
server.
2. Il server verifica la validità del token (questo può richiedere un accesso al
database).
3. In caso di token valido, il server risponde al cliente fornendo la risorsa richiesta.
{{</column/two-cols>}}

### OAuth 2.0
L'autenticazione tramite [OAuth 2.0][1] è un meccanismo di autorizzazione delegata.
In pratica, l'utente concede l'autorizzazione ad un'applicazione di terze parti
per accedere alle proprie risorse, senza dover condividere le credenziali di accesso.

Bisogna fare attenzione al fatto che in questo caso il web service è l'applicazione
di terze parti che richiede risorse ad un server di *autorizzazione* (ad esempio
Google o Facebook). L'utente deve, quindi, autenticarsi preso tale server (ad
esempio Google), il quale fornirà al web service un *token* che indica:
1. che l'utente è autenticato presso il server di autorizzazione (es. Google)
2. la app terza (il web server) può accedere alle risorse (a ad un parte di esse)
presente nel server di autorizzazione.

Le risorse che vengono richieste dal server di autorizzazione possono essere diverse,
tipicamente queste comprendono: email, nome e cognome. Nel caso di servizi come
Google, mediante OAuth 2.0 si può ottenere l'accesso alle cartelle di Google Drive,
nel caso di Facebook, si può ottenere l'accesso ai contatti, ...
 
{{<column/two-cols wl=6 wr=6 content="left" embed="img/web-service-oauth.html">}}
Riferendoci alla figura a fianco, vediamo in dettaglio i passaggi coinvolti in
un'autenticazione mediante OAuth.

1. L'applicazione di terze parti (il web service) richiede all'utente di accedere
al server di autorizzazione.
2. L'utente garantisce l'autorizzazione fornendo le proprie credenziali di accesso.
3. Una volta che l'autorizzazione è stata fornita al server terzo, questo la comunica
al server di autorizzazione. 
4. Il server di autorizzazione, verificati i permessi, restituisce al server terzo
un *token* di accesso.
5. Tale token viene utilizzato dal server terzo per accedere ad eventuali risorse
(esempio email).
{{</column/two-cols>}}


## Sicurezza per i Web Service
Oltre all'autenticazione, che permette un accesso *selettivo* alle risorse del
web service, è necessario prevedere meccanismi di *sicurezza* che rendano sicuro
l'accesso. Questi sono, tipicamente, i meccanismi utilizzati per rendere sicure
connessioni di altri tipi. I principali metodi sono elencati di seguito.

* **Crittografia** La crittografia permette di proteggere i dati scambiati tra il
client e il server utilizzando algoritmi crittografici per oscurare le informazioni
sensibili prima di trasmetterle. Le tecniche crittografiche sono alla base
dei metodi di protezione HTTPS e dei certificati SSL/TLS.
* **HTTPS** L'utilizzo del protocollo HTTPS prevede una connessione *cifrata*
tra client e server. Ciò garantisce l'integrità dei dati scambiati, evitando
che la comunicazione essere intercettate da "attori" non autorizzate.
* **Certificati SSL/TLS** L'utilizzo di certificati SSL/TLS consiste
nell'implementazione di un protocollo crittografico che garantisce l'integrità,
la riservatezza e l'autenticità dei dati scambiati tra client e server.
In particolare, i certificati SSL/TLS permettono di autenticare il server,
proteggere la comunicazione mediante cifratura dei dati e garantire l'affidabilità della connessione.

### Protezione da attacchi comuni
Infine va tenuta in considerazione la possibilità (ad oggi si doverebbe dire la
certezza) che il sistema possa essere bersaglio di *attacchi informatici*. Gli
attacchi possono essere di vario tipo e con scopi diversi, alcuni si limitano a
rendere il servizio indisponibile (attacchi *Denial of Service*, DoS), altri mirano
ad ottenere informazioni riservati (ad esempio password o risorse private).
Di seguito presentiamo un elenco non esaustivo dei principali attacchi.

* **SQL Injection**: un attaccante cerca di inserire del codice SQL dannoso in
un'applicazione web, al fine di manipolare la sua logica e accedere o modificare
dati presenti nel database. Questo può avvenire quando un'applicazione web non
gestisce correttamente l'input dell'utente, consentendo agli attaccanti di inserire
codice malevolo tramite campi di input come moduli web o parametri URL.
* **Cross-Site Scripting (XSS)** sfrutta la vulnerabilità di un'applicazione web
consentendo ad un attaccante di inserire script malevoli all'interno di pagine
visualizzate da altri utenti. L'attacco avviene generalmente attraverso l'inserimento
di codice JavaScript in input che verrà eseguito dal browser degli utenti. 
* **Cross-Site Request Forgery (CSRF)**: un attaccante convince l'utente ad eseguire
un'azione su un sito web deciso dall'attaccante, per fare questo utilizza la sessione
autenticata dell'utente, ad esempio usando un link malevolo. Questa tecnica permette
all'attaccante di eseguire operazioni non autorizzate a nome dell'utente, ad esempio
effettuare un trasferimento di denaro o modificare le credenziali di accesso
dell'account. Per prevenire questi attacchi, è necessario utilizzare token di
sicurezza e verificare sempre l'origine delle richieste.

### Cross Origin Resource Sharing (CORS)
Un modo per evitare alcuni degli attacchi e degli utilizzi malevoli dei web service
prevede l'utilizzo del meccanismo di *Cross Origin Resource Sharing (CORS)*.

CORS è un meccanismo di sicurezza implementato nei browser che permette ad un
server di consentire l'accesso alle risorse in risposta alle richieste provenienti
da un'*origine specifica*. In pratica, CORS impedisce a un'applicazione web di
accedere alle risorse di un'origine diversa senza autorizzazione esplicita.

{{<column/two-cols wl=4 wr=8 content="left" embed="img/web-service-cors.html" >}}

Nell'esempio a fianco, un'applicazione web che esegue JavaScript nel browser di
un utente fa una richiesta HTTP a un server che ha abilitato CORS. Il browser 
esegue una pre-richiesta (*preflight*) `OPTIONS` per verificare se possiede
l'autorizzazione sul server. In caso affermativo, il browser esegue la "vera"
richiesta a cui il server risponderà "positivamente". Al contrario, se dalla
pre-richiesta viene negata l'autorizzazione, il browser non procede con la
vera e propria richiesta.

{{</column/two-cols>}}







## References
* [OAuth (Wikipedia EN)][1]

[1]: https://en.wikipedia.org/wiki/OAuth
[2]: https://openid.net/
