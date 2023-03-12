---
title: Concetti base sui Web service
weight: 100
type: lecture
---

## Introduzione ai Web Service
Un **Web Service** è un metodo di comunicazione tra applicazioni distribuite
su diverse piattaforme e sistemi operativi tramite il protocollo [HTTP]({{< ref "http.md" >}})
(Hypertext Transfer Protocol). Questo metodo è stato introdotto per superare le
limitazioni dei tradizionali metodi di comunicazione, come i file di scambio e
i messaggi in formato testo, che spesso non permettono una comunicazione efficiente
e sicura tra applicazioni.

{{<def>}}
Un **Web Service** è un sistema software che permette a diverse applicazioni di comunicare tra loro e scambiarsi informazioni in rete, solitamente utilizzando protocolli standard, tipicamente [HTTP]({{< ref "http.md" >}}), basati su XML o JSON.
{{</def>}}

Un Web Service è un'applicazione che espone una o più funzionalità attraverso
un'*interfaccia* (API) basata su JSON (JavaScript Object Notation) o XML
(Extensible Markup Language)e che può essere invocata attraverso il Web. In
questo modo, le applicazioni client possono accedere alle funzionalità del
Web Service in modo semplice, indipendente dalla piattaforma e dal sistema operativo.

I Web Service possono essere suddivisi in tre categorie *architetture*:
* [REST](#rest) (*Representational State Transfer*): è un'architettura basata sul
protocollo [HTTP]({{<ref "http.md">}}) ed in particolari sui 
[comandi HTTP]({{< ref "http.md#comandi" >}}) (`GET`, `POST`, ...).
* [SOAP](#soap) (*Simple Object Access Protocol*): è un protocollo basato su XML che
prevede una struttura formale del messaggio e la definizione dei metodi e degli
oggetti utilizzati nella comunicazione.
* XML-RPC (*Remote Procedure Call*): è un protocollo che utilizza una struttura di
messaggi in formato XML per l'invocazione di funzioni remote.

Oggi il più diffuso ed utilizzato di queste tipologie di web service è il tipo REST.

{{<important title="REST vs RESTful">}}
Mentre REST indica l'architettura software (come è fatto il sistema: server,
client, database, ...), il termine *RESTful* si riferisce all'implementazione
del servizio web basato sui principi REST. Quindi un servizio web RESTful 
rispetta l'architettura REST e ne è una realizzazione specifica.
{{</important>}}

## Architettura dei Web Service
Un'architettura tipica di un web service si basa sull'utilizzo del protocollo
HTTP per la comunicazione tra il client e il server. Come in HTML, ogni risorsa
è identificata da un **URI** (*Uniform Resource Identifier*) e può essere manipolata
mediante operazioni CRUD (Create, Read, Update, Delete).

### REST
Un'architettura **REST** (*Representational State Transfer*) utilizza *URL* (*Uniform
Resource Locator*) come identificatori delle risorse ed usa i metodi HTTP (`GET`, `PUT`
...) per interagire con tali risorse. Ad esempio, il metodo `GET` com un URL specifico, 
permette di ottenere la risorsa indicata, mentre il comando `DELETE` può essere usato
per cancellare una risorsa. La risposta ad una richiesta verso un server REST viene
veicolata all'interno del *body* del pacchetto [HTTP]({{<ref "http.md" >}}), il formato
può essere qualsiasi, ma due opzioni sono utilizzate in pratica:
* [JSON (JavaScript Object Notation)]({{<ref "02-array-oggetti.md#json" >}}) e
* XML (eXtensible Markup Language).

Nella maggior parte dei casi, tuttavia, si predilige il formato JSON (più "leggero" e,
quindi, più adatto al trasferimento su rete)

I servizi REST sono anche caratterizzati dalla loro architettura *stateless*,
il che significa che il server non mantiene uno *stato* della conversazione tra
client e server. Di conseguenza, ogni richiesta del client deve contenere tutte
le informazioni necessarie per elaborare la risposta. In altre parole, ogni
richiesta viene elaborata in modo indipendente, semplificando la progettazione
di servizi REST.

Infine, i servizi REST possono sfruttare le funzionalità di caching HTTP per
migliorare le prestazioni e ridurre il traffico di rete. I client possono quindi
memorizzare in cache le risposte alle richieste più frequenti, riducendo il numero
di richieste effettivamente inviate al server.

### SOAP
L'architettura [SOAP][3] si basa sullo scambio di messaggi attraverso XML
utilizzando il protocollo HTTP, in pratica i comandi/messaggi sono inseriti in
un file XML che viene inserito in una richiesta/risposta HTTP.

All'interno del documento XML scambiato sono presenti i seguenti elementi:
* **Envelope**: identifica il documento come messaggio XML.
* **Header**: contiene l'*intestazione* del messaggio.
* **Body**: contiene il *corpo* (richiesta e risposta) del messaggio.
* **Fault**: contiene informazioni su eventuali errori avvenuti durante la
comunicazione.

I Web Server basati su architetture SOAP sono sempre meno comuni in favore di
quelli basati su architetture REST che risultano più semplici. Ad esempio, mentre
le richieste REST sono codificate nell'URL della richiesta HTTP, in SOAP le
richieste avvengono mediante messaggi codificati in XML all'interno di una
richiesta HTTP.

## Esempio di Web Service
Supponiamo di avere un web service che fornisce informazioni sulle previsioni
meteo per una determinata città. Il client invia una richiesta HTTP `GET` al
server, specificando l'URI della risorsa che rappresenta le informazioni meteo
per la città desiderata.

```http
GET /weather/city/Milan HTTP/1.1
Host: api.weather.com
```

Il server riceve la richiesta HTTP che contiene:
* l'URL `/weather/city/Milan HTTP/1.1`
* il comando `GET`

Dopo aver elaborato la richiesta, il server restituisce una risposta HTTP con lo stato
(ad esempio `200 OK`) i dati, generalmente in formato JSON (o XML, più di raro).

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "city": "Milan",
  "temperature": 15,
  "humidity": 65,
  "wind_speed": 12
}

```

## Domande ed Esercizi

### Domande
* Qual è la definizione di Web Service?
* Quali sono le tre categorie di architetture di Web Service e in cosa differiscono?
* Quali sono le caratteristiche dell'architettura REST dei Web Service?

### Esercizi
* Utilizzando uno dei servizi elencati nell'attività
[Laboratorio 1: Client REST]({{<ref "l01-web-service-client.md#web-service-pubblici">}})
individuare almeno due diversi URL per ottenere risorse dal servizio. 
* Cercare un servizio REST pubblico che permetta di indicare il formato delle
risorse ricevuto (JSON, XML, ...). Ci si può aiutare consultando la lista di API
presente su [questo repository GitHub](https://github.com/public-apis/public-apis).


## Riferimenti

* [Web Service (Wikipedia EN)][1]
* [SOAP (Wikipedia EN)][2]
* [REST (Wikipedia EN)][3]
* [RESTful API][4]

[1]: https://en.wikipedia.org/wiki/Web_service
[2]: https://en.wikipedia.org/wiki/SOAP
[3]: https://en.wikipedia.org/wiki/Representational_state_transfer
[4]: https://restfulapi.net/

