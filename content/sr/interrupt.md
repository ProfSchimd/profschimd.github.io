---
title: Interrupt della CPU
layout: page
materia: sr
align: justify
---

Spesso è necessario che la CPU *interrompa* il proprio [ciclo fetch-and-execute](cpu.html) per
svolgere delle operazioni diverse dall'esecuzione dell'attuale programma. Ad esempio, la CPU
deve continuare ad elaborare l'input dalla tastiera anche mentre sta, ad esempio, mostrando
un video.

Il meccanismo esistente per la gestione di *eventi* da parte della CPU prende il nome di
**gestione degli interrupt**.
