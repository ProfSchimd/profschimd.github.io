---
title: "Laboratorio 1: esplorazione dataset su file"
running_title: "Lab 1: file dataset"
summary: "In questo laboratorio verrà analizzato un dataset memorizzato su file in formato JSON o CSV."
type: lecture
weight: 1000
---

## Introduzione
In questo laboratorio, avrai l'opportunità di familiarizzare con i dataset musicali che contengono informazioni su artisti, album e brani. Questi dataset sono disponibili in formato JSON o CSV. Lo scopo è quello di comprendere le opportunità e le difficoltà legate alla gestione dei dati utilizzando supporti di memorizzazione "standard" quali, appunto, file strutturati (JSON e CSV nel caso specifico).

Per affrontare al meglio questo laboratorio, è bene ripassare i seguenti concetti importanti presentati nelle lezioni precedenti.

* **Campi**: I campi rappresentano le diverse informazioni o attributi che compongono un record. Ogni campo ha un nome e un tipo di dati associato (dominio).
* **Record**: Un record rappresenta un'istanza o una riga di dati nel dataset. Contiene valori per ciascuno dei campi definiti.
* **Query**: Una query è una richiesta per estrarre specifiche informazioni dal dataset. Durante il laboratorio, si eseguiranno eseguiremo semplici query utilizzando un linguaggio di programmazione.

Vale la pena anche ricordare concetti legati ai *file strutturati*.
* **CSV**: Il formato CSV (*Comma-Separated Values*) è un modo comune per rappresentare dati tabulari utilizzando una sequenza di valori separati da virgole. Ogni riga del file corrisponde a un *record* e i *campi* sono separati da virgole.
* **JSON**: Il formato JSON (JavaScript Object Notation) è un formato di dati leggibile dagli umani che utilizza una sintassi di oggetti e array per rappresentare i dati. I dati sono organizzati in coppie chiave-valore.


## Descrizione del Dataset
Il dataset musicale è composto da tre entità principali: Artista, Album e Brano. Ogni entità è memorizzata in un file separato, che può essere in formato JSON o CSV. Il dataset fornisce le seguenti informazioni per ogni entità:

* **Artista**: Contiene informazioni sugli artisti, inclusi il loro ID univoco, nome e sito web.
* **Album**: Memorizza i dettagli degli album, come l'ID dell'album, nome, ID dell'artista (riferito all'artista che ha creato l'album) e l'URL della copertina dell'album.
- **Brano**: Contiene informazioni sui brani, inclusi l'ID del brano, l'ID dell'album (indicante l'album a cui il brano appartiene), nome, durata e URL del brano.

## Istruzioni per l'Assegnazione
1. Familiarizzati con la struttura e il contenuto dei file di dataset forniti (in formato JSON o CSV).
2. Aggiungi ulteriori contenuti ai file del dataset. Sentiti libero di creare nuovi artisti, album e brani, assicurandoti di mantenere la coerenza del dataset.
3. Esegui semplici interrogazioni sul dataset utilizzando un linguaggio di programmazione a tua scelta (escludendo SQL). Puoi recuperare informazioni specifiche sugli artisti, album o brani, o creare interrogazioni personalizzate per estrarre dati rilevanti.

## Linee guida per la consegna
* Prepara una relazione che documenti le tue osservazioni, modifiche e le interrogazioni che hai eseguito.
* Invia la relazione insieme a eventuali file aggiuntivi creati durante l'assegnazione.

## Risorse aggiuntive
Se hai bisogno di assistenza o hai domande, consulta la documentazione fornita nella directory del dataset musicale.

Buona esplorazione!
