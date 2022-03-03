---
title: Sezione critica
layout: page
materia: tpsit
align: justify
---

## Il problema della sezione critica
Un sistema *multithread* può presentare **problemi di sincronizzazione dovuti all'utilizzo da parte di due o più thread della stessa risorsa**. Questa risorsa può essere un file e perfino una variabile (ricordiamo che i thread di un processo lavorano su uno spazio di memoria condiviso, quindi possono usare variabili condivise). Un esempio di questi problemi di sincronizzazione si ha in caso di *race condition* (come descritto [qui](sincronizzazione.html)).

Un modo per risolvere alcuni problemi di sincronizzazione è utilizzare il concetto di **regione critica** (*critical section*) con la quale si garantisce che al massimo in thread stia eseguendo operazioni "critiche" (ad esempio, l'aggiornamento del valore di una variabile condivisa).
<!-- 
<div class="card bg-light mb-3">
  <div class="card-header">Definizione: <strong>Regione Critica</strong></div>
  <div class="card-body">
    <p class="card-text">La <strong>regione critica</strong> di un thread è una parte di codice di esecuzione del thread che può essere eseguita solo se nessun altro thread sta eseguendo la propria regione critica.
    </p>
  </div>
</div> -->

<div class="alert alert-primary" markdown="1">
<h5 class="no_toc"><i class="bi bi-journal-text"></i> Definizione: <strong>Regione Critica</strong></h5>
La <strong>regione critica</strong> di un thread è una parte di codice di esecuzione del thread che può essere eseguita solo se nessun altro thread sta eseguendo la propria regione critica.
</div>


La regola fondamentale della regione critica è che **o nessun thread sta eseguendo la propria regione critica oppure un solo thread sta eseguendo la propria regione critica**. 

Va inoltre osservato che *ogni thread ha la propria regione critica* e cioè il codice che è parte della regione critica di un thread può essere diverso dal codice delle regioni critiche degli altri thread. Anche se questo è vero, deve comunque essere garantito che non più di un thread stia eseguendo la propria regione critica.

### Gestione della sezione critica

Evidentemente, non possono essere i thread ad "auto-gestirsi" le regioni critiche, ma deve essere il sistema operativo o la libreria di gestione dei thread che si occupa di gestire l'accesso alle regioni critiche dei thread garantendo che non ce ne sia mai più di una in esecuzione.
Qualunque sia la soluzione per risolvere il problema della regione critica, questa dovrà garantire che tutti i thread, prima o poi, possano entrare ed eseguire la propria regione critica. Per ottenere questo è necessario che il meccanismo di gestione abbia le tre seguenti caratteristiche.

1. **Mutua esclusione** (*mutual exclusion*) cioè che se un thread è nella propria sezione critica, nessun altro thread può eseguire la propria sezione critica.
2. Se un thread a richiesto l'accesso alla sezione critica c'è un **numero massimo** di volte in cui altri thread potranno farlo prima di lui.
3. Se non ci sono thread in regione critica, ma ce ne sono che hanno richiesto di entrarvi, in un **tempo limitato** uno dei thread in attesa può entrare nella zona critica.

## Sezione critica in Java ``synchronized``
Il sistema di gestione dei thread di Java mette a disposizione un meccanismo di accesso alla regione critica. L'unica cosa che il programmatore deve fare è indicare a Java quale codice deve fare parte della regione critica, questo avviene utilizzando la parola chiave ``synchronized``.

{%- highlight java -%}
public synchronized void incrementaContatore() {
    this.contatore++;
}
{%- endhighlight -%}

In questo caso siamo sicuri che un solo thread per volta può eseguire l'operazione di incremento. Ovviamente perché questo sia vero è necessario che il programmatore si preoccupi non incrementare contatore in altri metodi che non siano ``synchronized``.


