---
title: Firewall
type: lecture
weight: 20
---


## Cos'è un firewall
Un aspetto importante delle reti è che tutto ciò che accade passa attraverso lo
*scambio di pacchetti*. Ad esempio, una connessione ad un server HTTP avviene
mediante l'incapsulamento di pacchetti TCP in pacchetti IP; i router di Internet
comunicano utilizzando specifici pacchetti ed anche **gli attacchi da parte di
malintenzionati viaggiano su pacchetti** (ad eccezione degli attacchi mediante
*malware* installati con altri mezzi, ad esempio, chiavette USB). Questo sottolinea
l'importanza di avere un controllo sui pacchetti, al fine di garantire che tutto
ciò che entra ed esce dalla rete non sia dannoso e non comporti conseguenze
negative.

{{<def>}}
Un **firewall** è un dispositivo (hardware o software) che monitora il traffico di
la rete per garantire che i pacchetti in transito non siano dannosi, eventualmente
bloccando il traffico potenzialmente pericoloso.
{{</def>}}


{{<column/two-cols wr=4 wl=8 content="left" embed="img/gateway_firewall.html">}}
Come si vede nell'immagine a destra (fonte [Wikipedia](https://it.wikipedia.org/wiki/Firewall)),
il firewall viene posizionato in modo che possa intercettare **tutto** il traffico
che entra ed esce dalla rete locale (LAN). Qualsiasi altro posizionamento non
sarebbe efficace in quanto percorsi in grado di aggirare il firewall, rappresenterebbero
*vulnerabilità* della rete, permettendo il transito di traffico non controllato
e potenzialmente dannoso.

Dal momento che un firewall deve monitorare *tutto* il traffico, deve possedere
hardware in grado di analizzare enormi quantità di pacchetti in poco tempo per
decidere velocemente se bloccare o meno un pacchetto, un dispositivo non
adeguatamente dimensionato dal punto di vista hardware introdurrebbe ritardi
inaccettabili nelle comunicazioni di rete.

Per gestire questa enorme quantità di lavoro, il firewall viene impostato utilizzando
delle **regole** semplici che siano in accordo con la **politica** aziendale in
termini di sicurezza e di uso della rete.
{{</column/two-cols>}}

### Tipi di firewall

* Packet filtering
* Stateful firewall
* Application gateway
* NAT firewall
* Next generation firewall

A next-generation firewall (NGFW) is a part of the third generation of firewall technology, combining a traditional firewall with other network device filtering functions, such as an application firewall using in-line deep packet inspection (DPI), an intrusion prevention system (IPS).
NGFWs include the typical functions of traditional firewalls such as packet filtering,[3] network- and port-address translation (NAT), stateful inspection, and virtual private network (VPN) support. The goal of next-generation firewalls is to include more layers of the OSI model, improving filtering of network traffic that is dependent on the packet contents.

## Regole e politiche
Il firewall decide di bloccare o meno un pacchetto attraverso delle **regole**
che descrivono:
* la tipologia ed il contenuto del pacchetto,
* la direzione di attraversamento del pacchetto e
* l'azione da intraprendere.

L'*amministratore di rete* imposta le regole di un firewall, ma quali specifiche
regole impostare dipende dalla **politica** dell'organizzazione. Ad esempio,
i pacchetti da a verso i *social media* (es. Facebook e Instagram), possono essere
bloccati o permessi, probabilmente sarebbero bloccati in una scuola o in un azienda,
a meno che non si tratti di una divisione aziendale che si occupa di *social media
management*.

Le politiche possono essere anche complesse, ad esempio un'azienda potrebbe
concedere ai dipendenti di accedere ai social media durante la pausa pranzo,
la politica diventa, quindi, "Niente social media, tranne dalle 12:00 alle 14:00",
in questo caso le regole da impostare sul firewall saranno più complesse rispetto
alla politica "Blocca tutti i Social Media".

{{<exercise>}}
Immagina di essere il responsabile della gestione della rete in un'azienda di
automobili. La rete interna interna è divisa in due grosse sotto-reti: "Rete
produzione" e "Rete uffici", vuoi evitare che i dispositivi connessi alla prima
rete ricevano pacchetti da Internet, ma allo stesso tempo devono poter comunicare
con un server interno il quale è connesso ad Internet. Descrivi a parole le
politiche e le regole che imposteresti sul firewall aziendale.
{{</exercise>}}

## Funzionamento di un firewall
Il firewall funziona analizzando il traffico di rete in entrata ed uscita e
decidendo se bloccarlo o consentirlo sulla base delle regole di sicurezza
impostate dall'amministratore di rete.

### Regole e ordine di match
Iniziamo dando una definizione formale dei concetti di *regola* e *match*.

{{<def title="Regole e Match">}}
Una **regola** è una descrizione delle *caratteristiche* di un pacchetto, se un
pacchetto soddisfa a tale descrizione si dice che la regola è un **match** per
quel pacchetto.
{{</def>}}

Le caratteristiche menzionate nella definizione sopra, sono principalmente le seguenti:
* *direzione*: *inbound* (in ingresso) e *outbound* (in uscita);
* *protocolli*: individuato dal tipo di pacchetto (TCP, UDP, ICMP, ...);
* *porta*: secondo quanto presente nell'header TCP o UDP.

Tuttavia, in casi più complessi come nei [firewall stateful](#firewall-stateless-e-stateful),
la lista di caratteristiche di un pacchetto può essere più complessa (ad esempio,
un pacchette può essere caratterizzato dall'appartenenza ad una specifica connessione
TCP).

{{<def title="Inbound e Outbound">}}
I pacchetti **inbound** (in ingresso) sono pacchetti di dati che vengono inviati
alla rete interna da fuori (ad esempio, da Internet). I pacchetti **outbound**
(in uscita), sono i pacchetti dati che vengono inviati dalla rete interna verso
l'esterno.
{{</def>}}

{{<example>}}
Consideriamo un server HTTP all'interno di una rete locale (LAN) separata da
Internet (WAN) mediante un firewall. Consideriamo una richiesta per il server
proveniente da Internet. 

Il pacchetto di richiesta, che attraversa il firewall `WAN -> LAN` sarà un
pacchetto *inbound* (in ingresso). La successiva risposta, che attraversa il
firewall `LAN -> WAN`, sarà un pacchetto *outbound* (in uscita).

Se il server HTTP necessitasse, ad esempio, di contattare un server esterno
(ad esempio per scaricare gli aggiornamenti di sistema), genererebbe dei
pacchetti *outbound* le cui risposte sarebbero pacchetti *inbound*.
{{</example>}}

In pratica un firewall *stateless* (ved [sotto](#firewall-stateless-e-stateful))
si limita a considerare un pacchetto alla volta e confrontarlo con tutte le regole
che sono state impostate. Le regole vengono valutate in un ordine specifico, in
genere l'ordine in cui sono state inserite. Tuttavia, è importante notare che
se una regola blocca il traffico, il firewall non continuerà a controllare le
regole successive.

{{<important>}}
Quanto detto sopra significa che le regole di più restrittive devono essere
posizionate in cima alla lista di regole in modo che vengano valutate prima
delle regole meno restrittive. In questo modo, se una regola restrittiva blocca
il traffico, non viene eseguito il controllo di altre regole meno restrittive.
{{</important>}}

Un firewall deve avere sempre una **regola di default** che definisce cosa fare
del traffico di rete (pacchetti) che non corrisponde a nessuna regole configurate.
La regola di default, di norma blocca tutto il traffico, di conseguenza è normale
che un firewall **blocchi tutto il traffico a meno che non sia esplicitamente
consentito da una regola**.

#### Codice Python per un firewall
Una versione Python estremamente semplificata
di tale operazione è fornita in seguito.

```python
def process_packet(packet):
    for rule in rules:
        if check_rule(packet, rule):
            return True
    return False
```

Ovviamente la funzione `check_rule` si occupa di decidere se il pacchetto soddisfa
ad una certa regola.

Dal codice sopra, si capisce che questo ipotetico firewall permette il passaggio
del pacchetto se esiste una regola tale che `check_rule` restituisce `True`, ma
lo blocca in caso contrario. Questo comportamento realizza la regola di default
per bloccare il traffico così come discusso sopra.

Per completezza, vediamo un esempio di implementazione Python per la funzione
`check_rule`.

```python
def check_rule(packet, rule):
    if packet["type"] != rule["type"]:
        return False
    if packet["protocol"] != rule["protocol"]:
        return False
    if "port" in rule and packet["port"] != rule["port"]:
        return False
    return rule["allowed"]
```

Da notare che la funzione restituisce `False` se il pacchetto non soddisfa ad
almeno uni dei campi impostati nella regola (`type`, `protocol` e `port`), ma
la decisione di accettare il pacchetto o meno, dipende dal valore del campo
`allowed`.

Riassumendo possiamo dire che:
* il firewall confronta ogni pacchetto con le regole in esso memorizzate,
* se una regola pertinente viene individuata, la si applica
* quando nessuna regola viene individuata, il firewall applica una **regola
di default** che, tipicamente, scarta il pacchetto.

{{<important>}}
In genere, la regola di default viene impostata per bloccare tutto il traffico di rete che non corrisponde a nessuna delle regole di sicurezza configurate. In questo modo, se un amministratore di rete dimentica di configurare una regola di sicurezza per un particolare tipo di traffico, il traffico viene bloccato dal firewall invece di essere consentito a passare senza controllo.
{{</important>}}

### Firewall *stateless* e *stateful*
Un firewall **stateless** analizza ogni pacchetto di dati in modo indipendente, senza tener conto del contesto del pacchetto o della sua relazione con i pacchetti precedenti. Il firewall stateless utilizza regole di sicurezza per determinare se un pacchetto di dati deve essere bloccato o consentito.

Un firewall **stateful**, d'altra parte, tiene traccia dello stato delle connessioni di rete e utilizza questa informazione per prendere decisioni sulle richieste di connessione. Ad esempio, se un pacchetto di dati fa parte di una connessione di rete attiva e autorizzata, il firewall stateful consentirà il pacchetto di dati a passare.

## Esercizi

{{<exercise>}}
Scrivi un programma Java che implementa un firewall per filtrare il traffico HTTP
sia *inbound* che *outbound*. In particolare, il firewall deve bloccare le
richieste che contengono parole chiave come "hacker" o "attacco". Il programma
deve precedere una regola di default che blocchi tutti i pacchetti in ingresso,
a meno che non siano autorizzati da una delle regole definite esplicitamente.

Come punto di partenza si usi la seguente classe `Rule` per memorizzare una regola.

```java
public class Rule {
    private String direction; // inbound, outbound
    private boolean action; // true -> allow, false -> drop
    private String ip;
    private int port;
    // Costruttore/i, getter e setter qui sotto
    // ...
}
```
{{</exercise>}}

## Riferimenti

* [Firewall (Wikipedia EN)][1]
* [Stateful firewall (Wikipedia EN)][2]
* [Application firewall (Wikipedia EN)][4]
* [Next Generation firewall (Wikipedia EN)][3]

[1]: https://en.wikipedia.org/wiki/Firewall_(computing)
[2]: https://en.wikipedia.org/wiki/Stateful_firewall
[3]: https://en.wikipedia.org/wiki/Next-generation_firewall
[4]: https://en.wikipedia.org/wiki/Application_firewall
