---
title: "Gerarchie di classi"
type: lecture
weight: 30
repo: https://github.com/ProfSchimd/teaching-material/tree/main/inf/oop
summary: "Le gerarchie di classi permettono di creare classi che possono cambiare ed adattare il loro comportamento secondo le esigenze."
---

## Classi derivate
Una classe descrive il comportamento di un oggetto, tipicamente come una rappresentazione di
qualcosa che esiste nel mondo reale. Ad esempio la classe `Persona` contiene informazioni su
`nome`, `cognome`, ... insieme alle operazioni (*metodi*) che la classe persona è in grado
di eseguire, ad esempio `introduce()`.

Spesso gli oggetti del mondo reale che si rappresentano cone le classi possono essere di *tipo*
diverso. Ad esempio una persona può essere uno studente, un professore, un medico o molto altro.
Si potrebbe pensare che per ogni tipo, si debba usare una classe diversa, oppure che si possa
distinguere il tipo utilizzando un campo che distingue i diversi tipi. Queste soluzioni, tuttavia,
presentano aspetti positivi e aspetti negativi. Nella programmazione ad oggetti, esiste un
meccanismo, chiamato *ereditarietà* che permette di realizzare questo tipo di *sottoclassi* in
modo da ridurre i problemi delle altre soluzioni.

Il concetto di **classe derivata** o **sottoclasse** rappresenta uno degli strumenti più utili
e importanti della programmazione ad oggetti. Con la *derivazione* è possibile aggiungere
funzionalità ad una classe esistente creando una classe che ne *specializza* un'altra.

### Visibilità `protected`

## Catena di costruzione su gerarchia

## *Casting* attraverso le classi della gerarchia

## Interfacce