---
title: Automi
weight: 200
type: lecture
summary: "Il più semplice sistema di elaborazione è l'automa il quale riceve simboli in ingresso e cambia stato in risposta."
---

## Automa a stati finiti
Un sistema di calcolo produce *output* a partire da *input*, i sistemi più semplici sono quelli che *calcolano semplici funzioni*. 

```
Input: 2
Output: 4

Input: 4
Output: 8

Input: 1,8
Output: 3,6
```

In questo esempio abbiamo la funzione \\(2x\\), ma la funzione non deve essere matematica


```
Input: Hello
Output: olleH

Input: World!
Output: !dlroW

Input: 98
Output: 89

Input: madam
Output: madam
```

In questo secondo esempio la funzione è la *string reverse* in cui un testo viene rovesciato (un testo può anche essere costituito da simboli numerici come nel caso di `98`).

Sebbene questi sistemi producano input a partire da output, mancano di un elemento che è tipico della maggior parte dei sistemi: lo **stato**.

### Stato

Uno **stato** è una "memoria" interna del sistema che può essere utilizzato per avere output diversi anche a fronte dello stesso input.

```
Stato: 0
Input: 3
Output: 3

Stato: 3
Input: 3
Output: 6

Stato: 6
Input: 2
Output: 8

Stato 8:
```

In questo esempio lo stato è composto da un valore numerico interno, il sistema aggiunge l'input allo stato e produce come output il valore dello stato stesso. In questo esempio, lo stato può essere uno qualsiasi degli infiniti numeri naturali.

La tecnologia non ci permette di creare sistemi che possano avere un numero infinito di possibile stati poiché questo richiede una memoria infinita, che si può fare solo con un numero infinito di componenti (costruite un circuito con un numero infinito di cavi...). Per questo motivo, i sistemi che siamo in grado di costruire sono **sistemi a stati finiti** cioè sistemi in cui il numero di possibili stati è finito (non infinito).

### Transizione
In ogni momento un sistema a stati finiti può trovarsi in uno solo stato, tale stato può cambiare in seguito ad un input, chiamiamo **transizione di stato** il passaggio del sistema da uno stato ad un altro.

## Esempio: semaforo
