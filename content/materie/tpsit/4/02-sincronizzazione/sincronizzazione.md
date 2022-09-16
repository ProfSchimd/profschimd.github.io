---
title: Sincronizzazione
weight: 10
---
## Cos'è la sincronizzazione

Vari tipi di problemi hanno soluzioni le cui operazioni devono essere fatte in un ordine ben preciso. Ad esempio, quando si cucina una pizza, si deve *aspettare* che il forno sia caldo prima che si possa inserire la pizza cruda. Inoltre, gli ingredienti devono essere messi *prima* di infornare la pizza altrimenti questi non si cuociono. 

Anche nei problemi informatici è spesso necessario che le operazioni si svolgano in una sequenza ben precisa, questa sequenza di operazione prende il nome di *algoritmo*. Ma cosa succede quando le operazioni sono svolte contemporaneamente, ad esempio quando due thread eseguono su due core diversi? Se alcune operazioni in un thread devono essere eseguite *dopo* che alcune operazioni del secondo thread sono state eseguite, allora i due thread devono **sincronizzarsi**. Se riprendiamo l'esempio della pizza, è possibile che, per velocizzare il servizio, un ristornate abbia due persone che lavorano al banco delle pizze: uno guarnisce, l'altro inforna. Ovviamente vogliamo che chi inforna lo faccia solo dopo che la pizza è guarnita. In questo la sincronizzazione avviene tra le due persone. Probabilmente la persona che guarnisce comunica a quella che inforna quali pizze sono pronte per il essere cucinate.


{{<column/two-cols wl="6" wr="6" content="right" embed="img/sequence_diagram_pizza.html">}}
Nella figura a sinistra si vede il <b>diagramma di sequenza</b> (*sequence diagram*) per le operazioni di farcitura e cottura di una pizza. Le operazioni iniziano con la guarnizione degli ingredienti dopo che arriva l'ordine. Al termine di una prima farcitura, la pizza e pronta per il forno e viene quindi "passata" alla fase di cottura dalla quale esce una volta cotta per una seconda farcitura con gli ingredienti da mettere "a fine cottura".
{{</column/two-cols>}}

{{<exercise>}}
Quali operazioni operazioni compi durante la tua giornata che richiedono una sincronizzazione con altre persone? Fai il sequence diagram per una o più di queste.
{{</exercise>}}

Ci si potrebbe chiedere se la sincronizzazione tra thread sia veramente necessaria, in effetti è possibile che alcuni problemi si possano risolvere utilizzando thread che non devono mai sincronizzarsi. Tuttavia, è più comune che un programma multithreading necessiti di sincronizzazione tra i suoi thread. Normalmente la sincronizzazione serve per evitare che il programma si comporti in modo anomalo. Ad esempio, se un thread si occupa di scaricare i fotogrammi di un video ed un altro thread si occupa di mostrare il video, il secondo thread dovrà attendere l'arrivo dei fotogrammi prima di metterli in sequenza per formare il video. In pratica la sincronizzazione è necessaria quando una operazione OP1 di un thread TA può essere eseguita solo dopo che l'operazione OP2 del thread TB è stata eseguita. Dal momento che quando TA e TB sono eseguiti su due core diversi non siamo sicuri che OP1 avvenga dopo OP1, è necessario sincronizzare TA e TB in modo esplicito.

{{<def title="Sincronizzazione di thread">}}
La **sincronizzazione** tra thread è un qualsiasi meccanismo che permette di eseguire in un ordine prestabilito istruzioni che sono eseguite da thread diversi.  
{{</def>}}

## Thread join

Un meccanismo di sincronizzazione tra thread usato di frequente è chiamato **join** (unire), l'idea è che i due flussi di istruzioni dei due thread coinvolti nel join si devono "unire" in un unico flusso. Detto in modo più semplice, un thread fa il *join* su un altro thread quando vuole aspettare la sua fine prima di proseguire. Supponiamo quindi che ci siano due thread A e B e che il thread A ad un certo possa continuare solo quando il thread B ha terminato le sue operazioni. Per *sincronizzare il thread A sulla "fine" del thread B si usa il join di A su B*.

Ovviamente è possibile che un thread voglia fare il join su più di un altro thread. In questo caso basta fare il join su ognuno e si ottiene questo effetto. Ad esempio, se il thread A vuole attendere la fine dei thread B,C e D, dovrà semplicemente fare il join su B, C e D. Non appena tutti saranno terminati, allora il thread A potrà riprendere l'esecuzione.

Una caratteristica importante delle librerie di thread (es. Java o p_thread) è che il join può avvenire in qualsiasi momento *sia che il thread sia ancora in esecuzione sia che sia già terminato*. Ad esempio se A vuole fare il join su B, ma prima esegue altre operazioni che, nel frattempo, fanno terminare B, allora A potrà ancora fare il join su B ed "istantaneamente" verrà riattivato in quanto B ha già concluso la sua esecuzione.

Un caso molto frequente in cui il join è utilizzato è per evitare che il thread principale (es. il main di Java) termini prima che tutti gli altri thread siano terminati. Per fare questo il main thread deve fare il join su tutti i thread di cui deve aspettare la fine. Se così non è, il main potrebbe terminare prima degli altri thread ed il processo potrebbe essere terminato prima che tutti i suoi thread concludano quello che stanno facendo. Questo può essere una cosa voluta, ma il più delle volte non è così ed è sempre bene fare il join su tutti i thread prima che il programma (quindi il processo) termini.

### *Sequence diagram* per il join di due thread

{{<column/two-cols wl="6" wr="6" content="right" embed="img/sequence_diagram_join.html">}}
Nella figura a sinistra vediamo il *sequence diagram* per un programma che genera due thread, li fa partire e poi si metta in attesa (*join*) prima dell'uno , poi dell'altro (frecce grigie).

Come si vede, non appena il main avvia (*start*) i thread, questi iniziano ad effettuare le loro operazioni, al termine delle quali (es. fine del metodo run in Java), comunicano alla libreria di gestione dei thread che hanno concluso l'esecuzione. Se qualche altro thread (il main è eseguito in un thread) si era messo in attesa (es. con la chiamata `join()` in Java), questo viene risvegliato e può proseguire. 

Nell'esempio dopo il primo risveglio del main (indicato dalla freccia *end thread 1*), il main esegui il *join* sul secondo thread e verrà quindi risvegliato quando questo avrà terminato (indicato dalla freccia *end thread 2*).

In [questo file](https://github.com/ProfSchimd/4id_2021_2022/blob/master/thread/join/MainClass.java) si può vedere un semplice esempio in Java che realizza proprio l'esempio mostrato in figura.
{{</column/two-cols>}}

## Race condition

Il join di due o più thread non è l'unico caso di sincronizzazione, in realtà è molto più frequente che due o più thread si sincronizzino senza dover necessariamente *unirsi* in un unico thread (*to join* per l'appunto). Se torniamo all'esempio della pizza, è normale pensare (come si vede nel diagramma di sequenza sopra) che per informare si aspetti che la prima farcitura sia completata ed allo stesso che per la seconda farcitura si aspetti che la pizza sia stata tolta dal forno. Se, ad esempio, la seconda farcitura venisse fatta prima che la pizza sia tolta dal forno, gli ingredienti finirebbero sul piatto o sul piano di lavoro. In altre parole, **è importante l'ordine con cui le operazioni vengono eseguite perché un ordine sbagliato produce un risultato finale sbagliato** (ad esempio gli ingredienti sul piano di lavoro e non sulla pizza. Questa situazione in cui l'esito dipende dall'ordine di arrivo delle operazioni viene chiamata **race condition**.


{{<def title="Race condition">}}
Una **race condition** si verifica quando l'ordine in cui le operazioni vengono eseguite è importante affinché il risultato finale sia quello che ci si aspetta. 
{{</def>}}


### Esempio di race condition (data race)

{{<column/two-cols wl="6" wr="6" content="right" embed="img/sequence_diagram_data_race.html">}}
Nella figura a sinistra vediamo un esempio di *race condition* su lettura/scrittura della variabile x, essendo una race condition sulla condivisione di dati, viene anche detta *data race*.

Nel primo caso (figura in alto) il Thread1 legge, aggiorna e scrive il valore di x prima che il Thread2 legga a sua volta la variabile x. In questo caso il risultato finale è x = 2 in quanto
1. prima x = 0 viene incrementato di 1 da Thread1
2. poi x = 1 viene raddoppiato da Thread2.

Nel secondo caso (figura in basso), le operazioni tra Thread1 e Thread2 sono *intervallate* (*interleaved*), cosa che accade spesso nel multithreading. Anziché x=2 come nel caso precedente, alla fine x=0. Infatti
1. contemporaneamente Thread1 e Thread2 leggono x=0
2. contemporaneamenteThread1 e Thread2 aggiornano x (x=1 per Thread1 e x=0 per Thread2)
3. Thread1 e Thread2 scrivono uno dopo l'altro il valore (diverso) di x.
Il valore finale di x sarà dato dal thread che scrive per ultimo (nell'esempio Thread2).
{{</column/two-cols>}}
