---
title: Implementazione di Web Service REST
weight: 200
type: lecture
---

## Definizione delle risorse
Il primo passo nella creazione di un web service è la definizione dei contenuti,
le *risorse* che il servizio fornirà ai suoi utenti. Questo aspetto caratterizza
il web service, ad esempio un servizio per fornire testo sarà diverso da un
servizio per fornire immagini o video. 

Ricordiamo che lo scambio di risorse avviene, tipicamente, utilizzando formati
standard quali XML e JSON. Inoltre per servizi REST, le risorse vengono
identificate mediante URL.

## Definizione delle API
Una volta definite le risorse che verranno scambiate utilizzando il Web Service,
è necessario definire le modalità con cui avverrà tale scambio. Queste modalità
comprendono sia l'architettura del web service, sia i *comandi*, il formato delle
richieste/risposte ed il contenuto di queste. 

Una volta definita l'architettura (ad esempio REST), si passa alla definizione
delle **API** (*Application Programming Interface*) che specificano le modalità
di interazione con il web service.

{{<example title="Carrello delle spesa">}}
Vediamo come gestire mediante un web service REST il carrello della spesa in un
sito di commercio elettronico.
* *Consulta carrello* rappresenta l'operazione di "visione" del contenuto del
carrello.
* *Aggiungi oggetto* permette di un aggiungere un *item* al carrello
* *Elimina oggetto* permette di eliminare un *item* dal carrello

Queste tre operazioni dovranno essere formalmente definite dalle API del nostro
web service. In altre parole dobbiamo prevedere un modo di interagire con il web
service per ognuna delle operazioni elencate.
{{</example>}}

### Richieste REST
Come visto nella [lezione introduttiva]({{<ref "01-web-service-intro.md">}}), in
un'architettura REST, le richieste avvengono utilizzando i comandi HTTP e le
risorse si identificano mediante URL. Le operazioni su risorse di un servizio
REST vengono spesso indicate con la sigla **CRUD** che indica le quattro
operazioni di seguito elencate.
* **Create** (Creare): consente di creare una nuova risorsa sul server utilizzando
il comando `POST` contenente i dati della nuova risorsa. 
* **Read** (Leggere): consente di recuperare una risorsa dal server REST utilizzando
il comando `GET` ed indicando la risorsa richiesta.
* **Update** (Aggiornare): consente di aggiornare una risorsa esistente sul server
utilizzando il comando `PUT` (o `PATCH`) ed indicando la risorsa da aggiornare.
* **Delete** (Eliminare): consente di eliminare una risorsa dal server utilizzando
il comando `DELETE` ed indicando la risorsa da eliminare.

In tutti i casi l'operazione deve indicare l'URL che identifica la risorsa, un URL
è tipicamente composto di tre parti
1. *authority* per identificare l'organizzazione di appartenenza, ad esempio
`api.zuccante.it`, in HTTP questa indica anche il nome del web server che ospita
il servizio;
2. *path* che identifica la risorsa all'interno del server, ad esempio `/studenti`
oppure `/personale/docenti`;
3. *query string* che tipicamente indica un filtraggio dei risultati, ad esempio
`?classe=1A`.

Vediamo alcuni esempi di URL e cosa potrebbero identificare.
* `api.zuccante.it/student?class=1A` restituisce la lista degli studenti della classe `1A`
* `restcountries.com/v3.1/name/italy` restituisce le informazione per la
nazione con `name` uguale a `italy`.
* `http://numbersapi.com/1337/trivia?random` restituisce un fatto (*trivia*) relativo al
numero `1337` (risultato casuale).

### Accesso ed autenticazione
Le API fornite da un web service possono essere o meno rese disponibili al pubblico,
è anche possibile che parte delle API siano pubbliche e parte siano accessibili
solo previa *autenticazione*.

I motivi per rendere private le API possono essere varie, le principali sono
* accesso a dati sensibili (ad esempio Registro Elettronico),
* scarsità di risorse hardware (ad esempio utilizzando *hosting* gratuito o con
pagamento a volume).

### API key
Spesso l'accesso alle API (quindi alle risorse), viene garantito solo se ogni
richiesta contiene una **API key**, un tale meccanismo può essere utilizzato
per vari scopi:
* rendere accessibile parte o tutte le risorse, solo dopo autenticazione,
* limitare il numero di accessi ad una risorsa (ad esempio solo 100 richieste
al giorno per gli account *free*),
* tracciare gli utenti e/o gli sviluppatori.

## Implementazione
L'implementazione di un Web Service avviene di norma utilizzando un linguaggio
di programmazione adatto allo sviluppo di *backend*. Normalmente vengono adottati
dei *framework* appositamente progettati per lo sviluppo di web service nel
linguaggio selezionato.

Vediamo quali sono i principali linguaggi e framework utilizzati per lo sviluppo
di web service.
* Javascript: Node, express, ...
* Python: Django, Flask, FastAPI, ...
* Java: Spring, ...
* PHP

### Deployment
Terminata l'implementazione ed il testing, il Web Service viene installato
(*deployed*) in un server di *produzione* per poter essere reso disponibile.

Un aspetto importante del deployment è la scelta del *web server*, scelte comuni
includono i seguenti software:
* [Node](https://nodejs.org/en/)
* [nginx](https://www.nginx.com/)
* [Apache](https://httpd.apache.org/)

{{<attention>}}
Spesso i framework di sviluppo includono un web server di sviluppo che viene
utilizzato durante la fase di realizzazione del web service. Questi server sono
molto veloci, ma **spesso non sono sufficientemente sicuri per essere utilizzati
in ambiente di produzione**.
{{</attention>}}

## Riepilogo
