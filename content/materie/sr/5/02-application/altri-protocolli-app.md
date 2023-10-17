---
title: Altri protocolli di livello applicativo
type: lecture
running_title: Altri protocolli
summary: "Oltre ai protocolli più noti e trattati in dettaglio in altre lezioni, il livello applicativo ospita diversi altri protocolli che meritano di essere menzionati e discussi. In questa lezione affronteremo brevemente i protocolli DHCP, Telnet e Websocket."
weight: 600
---

## Dynamic Host Configuration Protocol (DHCP)
Il protocollo DHCP (**D**ynamic **H**ost **C**onfiguration **P**rotocol), permette a degli host connessi ad una rete locale (LAN) di ottenere la configurazione necessaria. Tale configurazione comprende:
* Indirizzo IP
* Maschera di rete
* Default gateway
* Server DNS


### Configurazione DHCP in Router con Cisco IOS

Supponiamo di aver configurato un router con due interfacce sulle seguenti reti
* LAN1: `192.168.1.0/24`
* LAN2: `192.168.2.0/24`

Una volta configurate correttamente le due interfacce, si può procedere all'attivazione del servizio DHCP su ognuna delle rete. In questo caso supporremo che il *default gateway* abbia l'indirizzo IP `192.168.x.254` dove `x` sarà `1` o `2` in nelle due reti. Supporremo inoltre che il server DNS utilizzato per configurare i dispositivi sia `192.168.2.100` (normalmente questo sarebbe un server DNS pubblico, ad esempio quello di Google all'indirizzo `8.8.8.8`).
```
ip dhcp pool LAN1
network 192.168.1.0 255.255.255.0
default-router 192.168.1.254
dns-server 192.168.2.100

exit
ip dhcp pool LAN2
network 192.168.2.0 255.255.255.0
default-router 192.168.2.254
dns-server 192.168.2.100

exit
ip dhcp excluded-address 192.168.2.100
```

Vediamo cosa configurano i singoli comandi sopra.
1. `ip dhcp pool LAN1` crea un *pool* di indirizzi con il nome indicato, in questo caso `LAN1`.
2. `network 192.168.1.0 255.255.255.0` assegna gli indirizzi nel range `1` `254` alla rete.
3. `default-router 192.168.1.254` imposta l'indirizzo del *default gateway* per la rete.
4. `dns-server 192.168.2.100` imposta l'indirizzo del DNS.
5. `ip dhcp excluded-address 192.168.2.100`

```
ipconfig /release
ipconfig /renew
```

## Telnet

## Websocket
