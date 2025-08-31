---
title: "Laboratorio: livelli di rete e programmazione"
running_title: "Lab 1: Livelli di rete"
weight: 1000
---

Uno dei vantaggi dei vantaggi di un'[architettura di rete stratificata][1] è la **modularità** che ne deriva. Infatti,
ogni livello può essere realizzato com un modulo a sé, l'importante è che si realizzino i corretti *Service Access
Point* (SAP). Per comprendere meglio questo aspetto, in questo laboratorio si procede alla stesura di una piccola
architettura di rete basata su due soli livelli. Negli esempi verrà utilizzato il linguaggio Python, ma è possibile,
ma qualsiasi linguaggio ad alto livello può essere utilizzato, va tenuto in considerazione, tuttavia, che ogni
linguaggio presenta nei modi specifici per realizzare alcuni concetti della programmazione (esempio: interfacce,
classi astratte, protocolli, ...).

## Architettura a due livelli

1. Livello **fisico** (`PHY`),
2. Livello **collegamento** (`DL`).

[1]: {{< ref "02-architettura-rete" >}}