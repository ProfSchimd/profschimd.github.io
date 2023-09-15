---
title: Load and Store
type: lecture
weight: 200
summary: "In questa lezione vengono discusse le operazioni load e store presenti in RISC-V."
---

## Leggere e scrivere la RAM
Un programma non potrebbe fare molto senza utilizzare la memoria RAM per tanti motivi: 

* le *istruzioni* sono nella RAM;
* i *dati* sono nella RAM;
* i *risultati* vengono scritti nella RAM;
* ... 

Serve quindi un modo per poter **leggere** e **scrivere** dalla RAM. Le istruzioni assembly che fanno queste operazioni sono

* `LOAD` (`LD`) legge dati dalla RAM e li scrivi nei registri
* `STORE` (`ST`) scrive dati nella RAM prendendoli dai registri

### Architetture Load-Store
Alcune architetture di processori vengono dette **Load-Store** perché non permettono solo questo tipo di operazioni con la RAM. In queste architetture, quindi, la ALU può fare operazioni **solo sui registri**. Di conseguenza prima di poter fare operazioni aritmetico-logiche (es. sommare due numeri) tutti gli *operandi* devono essere messi nei registri (se già non lo sono) utilizzando operazioni `LOAD`. Allo stesso modo il risultato dell'ALU viene messo in un registro, se il risultato va memorizzato nella RAM, serve un'operazione di `STORE`.

**Somma in RISC-V (architettura load-store)**

```nasm
lw   a0, 0(x0)
lw   a1, 4(x0)
add  a0, a0, a1
sw   a0, 8(x0)
```

**Somma in x86 (architettura non load-store)**

```nasm
mov  eax, dword ptr [0]
add  eax, dword ptr [4]
mov  dword ptr [8], eax
```

* [Load-Store su Wikipedia](https://en.wikipedia.org/wiki/Load%E2%80%93store_architecture)

## Indirizzamento della RAM
Quando si legge o scrive dalla RAM è necessario avere un modo per indicare l'indirizzo della cella di memoria da leggere o scrivere, il modo in cui si indica la cella di memoria viene detto **indirizzamento della memoria** (*memory addressing*).

Si potrebbe pensare di usare i numeri "fissi" delle celle, ma questa soluzione presenta molti problemi:

* non è detto che istruzioni e dati vengano sempre messo nelle stesse celle della memoria;
* il programmatore deve ricordarsi di tutti gli indirizzi in cui sono i dati;
* ...

L'indirizzamento che utilizza il numero della cella di memoria viene detto **indirizzamento assoluto** (*absolute addressing*) ed è usato molto raramente per i motivi spiegati sopra.

* Indirizzamento immediato (*immediate addressing*)
* Indirizzamento con registro (*register addressing*)
* Indirizzamento indiretto (*indirect addressing*)
* Indirizzamento con registro base (*base register addressing*)

I vari modi di indirizzamento non sono sempre possibili in tutte le architetture. Solitamente le architetture RISC hanno meno tipi di indirizzamento, mentre le architetture CISC ne hanno un numero elevato.

### Link per approfondimenti
* [Metodi di indirizzamento](https://it.wikipedia.org/wiki/Metodo_di_indirizzamento)
* [Address mode](https://en.wikipedia.org/wiki/Addressing_mode)
* [Intel 8086 Addressing](https://www.ic.unicamp.br/~celio/mc404s2-03/addr_modes/intel_addr.html)


## Esempi
Le slide sotto mostrano un esempio di esecuzione di un'istruzione di Load cioè di copia di valori dalla memoria ai registri. È importante notare che nell'esempio **non viene descritta la fase di fetch dell'istruzione** in quanto si parte dalla situazione in cui l'istruzione è già arrivata dall'`IR` al circuito di *decode*. 

<div style="text-align: center">
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSQaXNvxFIINORnjBqQxMDzGZGtn7zw1o9LVM_M_Yk0jtFXVaqyHLlu9FkHvOlVhB3Y_1DRqrpSTJ7V/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>