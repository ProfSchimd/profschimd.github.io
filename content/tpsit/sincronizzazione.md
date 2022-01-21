---
title: Sincronizzazione
layout: page
materia: tpsit
align: justify
---
## Cos'è la sincronizzazione

Vari tipi di problemi hanno soluzioni le cui operazioni devono essere fatte in un ordine ben preciso. Ad esempio, quando si cucina una pizza, si deve *aspettare* che il forno sia caldo prima che si possa inserire la pizza cruda. Inoltre, gli ingredienti devono essere messi *prima* di infornare la pizza altrimenti questi non si cuociono. 

Anche nei problemi informatici è spesso necessario che le operazioni si svolgano in una sequenza ben precisa, questa sequenza di operazione prende il nome di *algoritmo*. Ma cosa succede quando le operazioni sono svolte contemporaneamente, ad esempio quando due thread eseguono su due core diversi? Se alcune operazioni in un thread devono essere eseguite *dopo* che alcune operazioni del secondo thread sono state eseguite, allora i due thread devono **sincronizzarsi**. Se riprendiamo l'esempio della pizza, è possibile che, per velocizzare il servizio, un ristornate abbia due persone che lavorano al banco delle pizze: uno guarnisce, l'altro inforna. Ovviamente vogliamo che chi inforna lo faccia solo dopo che la pizza è guarnita. In questo la sincronizzazione avviene tra le due persone. Probabilmente la persona che guarnisce comunica a quella che inforna quali pizze sono pronte per il essere cucinate.

<div class="row">
<div class="col-4">
<svg style="float: left; margin: 30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="322px" height="221px" viewBox="-0.5 -0.5 322 221"><defs/><g><rect x="40" y="0" width="100" height="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><path d="M 90 40 L 90 220" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="all"/><g fill="#000000" font-family="Helvetica" text-anchor="middle" font-size="12px"><text x="89.5" y="24.5">:Guarnire</text></g><rect x="85" y="70" width="10" height="50" fill="#ffffff" stroke="#000000" pointer-events="all"/><path d="M 14 70 L 76.88 70" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><ellipse cx="10" cy="70" rx="4" ry="4" fill="#000000" stroke="#000000" pointer-events="all"/><path d="M 83.88 70 L 76.88 73.5 L 76.88 66.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g fill="#000000" font-family="Helvetica" text-anchor="middle" font-size="11px"><rect fill="#ffffff" stroke="none" x="18" y="55" width="61" height="14" stroke-width="0"/><text x="47.15" y="64.5">ordine pizza</text></g><rect x="85" y="170" width="10" height="30" fill="#ffffff" stroke="#000000" pointer-events="all"/><rect x="220" y="0" width="100" height="40" fill="#ffffff" stroke="#000000" pointer-events="all"/><path d="M 270 40 L 270 220" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="all"/><g fill="#000000" font-family="Helvetica" text-anchor="middle" font-size="12px"><text x="269.5" y="24.5">:Infornare</text></g><rect x="265" y="120" width="10" height="50" fill="#ffffff" stroke="#000000" pointer-events="all"/><path d="M 95 120 L 256.88 120" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="stroke"/><path d="M 263.88 120 L 256.88 123.5 L 256.88 116.5 Z" fill="#000000" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g fill="#000000" font-family="Helvetica" text-anchor="middle" font-size="11px"><rect fill="#ffffff" stroke="none" x="137" y="105" width="88" height="14" stroke-width="0"/><text x="179.79" y="114.5">pronta per il forno</text></g><path d="M 270.23 169.7 L 92.94 169.26" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-dasharray="3 3" pointer-events="stroke"/><path d="M 100.83 164.78 L 91.82 169.25 L 100.81 173.78" fill="none" stroke="#000000" stroke-miterlimit="10" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-end; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 166px; margin-left: 180px;"><div style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; background-color: rgb(255, 255, 255); white-space: nowrap;">pizza cotta</div></div></div></foreignObject><text x="180" y="166" fill="#000000" font-family="Helvetica" font-size="11px" text-anchor="middle">pizza cotta</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://www.diagrams.net/doc/faq/svg-export-text-problems" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Viewer does not support full SVG 1.1</text></a></switch></svg>
</div>
<div class="col-8">
Nella figura a sinistra si vede il <b>diagramma di sequenza</b> (*sequence diagram*) per le operazioni di farcitura e cottura di una pizza. Le operazioni iniziano con la guarnizione degli ingredienti dopo che arriva l'ordine. Al termine di una prima farcitura, la pizza e pronta per il forno e viene quindi "passata" alla fase di cottura dalla quale esce una volta cotta per una seconda farcitura con gli ingredienti da mettere "a fine cottura".
</div>
</div>

<div class="card bg-light mb-3">
  <div class="card-header">Esercizio</div>
  <div class="card-body">
    <p class="card-text">Quali operazioni operazioni compi durante la tua giornata che richiedono una sincronizzazione con altre persone? Fai il sequence diagram per una o più di queste.
    </p>
  </div>
</div>

Ci si potrebbe chiedere se la sincronizzazione tra thread sia veramente necessaria, in effetti è possibile che alcuni problemi si possano risolvere utilizzando thread che non devono mai sincronizzarsi. Tuttavia, è più comune che un programma multithreading necessiti di sincronizzazione tra i suoi thread. Normalmente la sincronizzazione serve per evitare che il programma si comporti in modo anomalo. Ad esempio, se un thread si occupa di scaricare i fotogrammi di un video ed un altro thread si occupa di mostrare il video, il secondo thread dovrà attendere l'arrivo dei fotogrammi prima di metterli in sequenza per formare il video. In pratica la sincronizzazione è necessaria quando una operazione OP1 di un thread TA può essere eseguita solo dopo che l'operazione OP2 del thread TB è stata eseguita. Dal momento che quando TA e TB sono eseguiti su due core diversi non siamo sicuri che OP1 avvenga dopo OP1, è necessario sincronizzare TA e TB in modo esplicito.

<div class="card bg-light mb-3">
  <div class="card-header">Definizione: <strong>Sincronizzazione di thread</strong></div>
  <div class="card-body">
    <p class="card-text">La <strong>sincronizzazione</strong> tra thread è un qualsiasi meccanismo che permette di eseguire in un ordine prestabilito istruzioni che sono eseguite da thread diversi.  
    </p>
  </div>
</div>

## Thread join

Un meccanismo di sincronizzazione tra thread usato di frequente è chiamato **join** (unire), l'idea è che i due flussi di istruzioni dei due thread coinvolti nel join si devono "unire" in un unico flusso. Detto in modo più semplice, un thread fa il *join* su un altro thread quando vuole aspettare la sua fine prima di proseguire. Supponiamo quindi che ci siano due thread A e B e che il thread A ad un certo possa continuare solo quando il thread B ha terminato le sue operazioni. Per *sincronizzare il thread A sulla "fine" del thread B si usa il join di A su B*.

Ovviamente è possibile che un thread voglia fare il join su più di un altro thread. In questo caso basta fare il join su ognuno e si ottiene questo effetto. Ad esempio, se il thread A vuole attendere la fine dei thread B,C e D, dovrà semplicemente fare il join su B, C e D. Non appena tutti saranno terminati, allora il thread A potrà riprendere l'esecuzione.

Una caratteristica importante delle librerie di thread (es. Java o p_thread) è che il join può avvenire in qualsiasi momento *sia che il thread sia ancora in esecuzione sia che sia già terminato*. Ad esempio se A vuole fare il join su B, ma prima esegue altre operazioni che, nel frattempo, fanno terminare B, allora A potrà ancora fare il join su B ed "istantaneamente" verrà riattivato in quanto B ha già concluso la sua esecuzione.

Un caso molto frequente in cui il join è utilizzato è per evitare che il thread principale (es. il main di Java) termini prima che tutti gli altri thread siano terminati. Per fare questo il main thread deve fare il join su tutti i thread di cui deve aspettare la fine. Se così non è, il main potrebbe terminare prima degli altri thread ed il processo potrebbe essere terminato prima che tutti i suoi thread concludano quello che stanno facendo. Questo può essere una cosa voluta, ma il più delle volte non è così ed è sempre bene fare il join su tutti i thread prima che il programma (quindi il processo) termini.

### *Sequence diagram* per il join di due thread

<div class="row">
<div class="col-4">
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2021-11-03T16:17:24.966Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36\&quot; etag=\&quot;7MQ56-paNJG-M4OJyBW0\&quot; version=\&quot;15.6.8\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;kgpKYQtTHZ0yAKxKKP6v\&quot; name=\&quot;Page-1\&quot;&gt;5VltU6MwEP41/VgmEGjLR1tfbm50dM67Uz/GEgtnSjCk2vrrL0B4S2hLa/E6Hs447CZZwj777C5pD07mywuGIv+Kepj0LOAte/C0Z1nOEIj/iWKVKSAYZYoZC7xMZZaK2+AdS6VcN1sEHo5rEzmlhAdRXTmlYYinvKZDjNG3+rQnSupPjdAMa4rbKSK69i7wuJ9pRw4o9d9wMPPzJ5tAjsxRPlkqYh959K2igmc9OGGU8uxuvpxgkvgu90u27nzNaLExhkPeZgEMF+PzJXOnq0sQhdd3Py100ZdWXhFZyBfuwZM5CkK5Z77KHSG2HyW3izm5DJ4wCUIhjSPMgjnmmIkRItU3pW4sYOHCWjpupjIhKIqDx9QsEBqGpwsWB6/4B44z9FMtXYQe9qRUuC4VOKPPBRiJUd0T+WthxvGyopKeucBUbJCtxBQ5moepjFJbim8l5AWwfgVuayCVSIbZrLBcIiFuJBg7AGPpwKiIRDQIefpcZ9xzThU0KOM+ndEQkSoeH/Trxhhq7WzbqTl72ORs3dejrlwNNVfHHDGecriBCMl7BiJBnJBgFgrVI+WczlMHilUnSc5J3C/MCR0OvVzzSOj0OZ8mE93o0CAI2zO8aZ4MI+zV0p4OFcMEccHKekJtcL1cepMEYwlxH4JGjHMLMV2wKZaLFPyKXbSCNIxc//Lh0un//vXy/jqZfkfDxrT2VdljjtrRxzoAfby3e/JCbx+vzlZh3L++v2FPbn+k+foPTWgDuM8w8sSN7vy1HGriy2Y342XA75N7AwyGUn5IZhujAZTy6VIuT4VVRaigW7E/oYSydKdwnP6JkSdRyZr0jXxqi/vBeefYhlu9BvVYcd368LAVK7WnQGEHwpppCwAjf1puLktGhyB5Y+A5R0Nyjbz7499M8oK9n0Dyxt02+BqeZAQ3/7NW0XKOrVccHA0Rtka9s6u31WrXkgid+VqvdnmzWJQ7nRC7lDvhP7a6z0tUIjx8MLSzrL69J9zaOw4aa93Ba5hgWDPmn9Q86t8DAqbNAPt8TiQMbbCmERZDYw/FfsovMxuufBTUuVfGhOEMq2HRBwYQ3pKass1JpVVVUhudvG0SFq28TcraJte1d26b9o+9gR57mzr6rmMPgnpyt4C7X4ukniiYrhLEHTdHjQc7WQTr1eHoC/aWBmtLCVHyyacW7EZwjudwZ4tj14dW64IN2xVslR4H8/X6050v8X0K0qvdd+hO/cDBU6upHAmZ6oFe29Rqq6lVNdRxah1qEaUeePyjDrCTw4tu6qyp9ngq/1vXWXeLoY6Dwd7WLOrJ5bOaxSLjFCFkALNQ7NcsAqg2i4M9m8VdM9WmQlrtHtcfFXXQLNqGIzNweilHYg4wTLsybO8X4qalHOppjzlQxAux/Dkym17+pgvP/gI=&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
</div>

<div class="col-8" markdown="1">

Nella figura a sinistra vediamo il *sequence diagram* per un programma che genera due thread, li fa partire e poi si metta in attesa (<i>join</i>) prima dell'uno , poi dell'altro (frecce grigie).

Come si vede, non appena il main avvia (<i>start</i>) i thread, questi iniziano ad effettuare le loro operazioni, al termine delle quali (es. fine del metodo run in Java), comunicano alla libreria di gestione dei thread che hanno concluso l'esecuzione. Se qualche altro thread (il main è eseguito in un thread) si era messo in attesa (es. con la chiamata <code>join()</code> in Java), questo viene risvegliato e può proseguire. 

Nell'esempio dopo il primo risveglio del main (indicato dalla freccia <i>end thread 1</i>), il main esegui il <i>join</i> sul secondo thread e verrà quindi risvegliato quando questo avrà terminato (indicato dalla freccia <i>end thread 2</i>).

In <a href="https://github.com/ProfSchimd/4id_2021_2022/blob/master/thread/join/MainClass.java" target="_blank">questo file</a> si può vedere un semplice esempio in Java che realizza proprio l'esempio mostrato in figura.

</div>
</div>

## Race condition

Il join di due o più thread non è l'unico caso di sincronizzazione, in realtà è molto più frequente che due o più thread si sincronizzino senza dover necessariamente *unirsi* in un unico thread (*to join* per l'appunto). Se torniamo all'esempio della pizza, è normale pensare (come si vede nel diagramma di sequenza sopra) che per informare si aspetti che la prima farcitura sia completata ed allo stesso che per la seconda farcitura si aspetti che la pizza sia stata tolta dal forno. Se, ad esempio, la seconda farcitura venisse fatta prima che la pizza sia tolta dal forno, gli ingredienti finirebbero sul piatto o sul piano di lavoro. In altre parole, **è importante l'ordine con cui le operazioni vengono eseguite perché un ordine sbagliato produce un risultato finale sbagliato** (ad esempio gli ingredienti sul piano di lavoro e non sulla pizza. Questa situazione in cui l'esito dipende dall'ordine di arrivo delle operazioni viene chiamata <strong class="text-danger">race condition</strong>.


<div class="card bg-light mb-3">
  <div class="card-header">Definizione: <strong>Race condition</strong></div>
  <div class="card-body">
    <p class="card-text">Una <strong>race condition</strong> si verifica quando l'ordine in cui le operazioni vengono eseguite è importante affinché il risultato finale sia quello che ci si aspetta. 
    </p>
  </div>
</div>


### Esempio di race condition (data race)

<div class="row">
<div class="col-4">
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2021-12-14T22:06:48.603Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36\&quot; etag=\&quot;v3TQKtmoNS0LDYQJ3NrF\&quot; version=\&quot;15.9.6\&quot; type=\&quot;google\&quot;&gt;&lt;diagram id=\&quot;kgpKYQtTHZ0yAKxKKP6v\&quot; name=\&quot;Page-1\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
</div>

<div class="col-8" markdown="1">
Nella figura a sinistra vediamo un esempio di *race condition* su lettura/scrittura della variabile x, essendo una race condition sulla condivisione di dati, viene anche detta *data race*.

Nel primo caso (figura in alto) il Thread1 legge, aggiorna e scrive il valore di x prima che il Thread2 legga a sua volta la variabile x. In questo caso il risultato finale è x = 2 in quanto
1. prima x = 0 viene incrementato di 1 da Thread1
2. poi x = 1 viene raddoppiato da Thread2.

Nel secondo caso (figura in basso), le operazioni tra Thread1 e Thread2 sono *intervallate* (*interleaved*), cosa che accade spesso nel multithreading. Anziché x=2 come nel caso precedente, alla fine x=0. Infatti
1. contemporaneamente Thread1 e Thread2 leggono x=0
2. contemporaneamenteThread1 e Thread2 aggiornano x (x=1 per Thread1 e x=0 per Thread2)
3. Thread1 e Thread2 scrivono uno dopo l'altro il valore (diverso) di x.
Il valore finale di x sarà dato dal thread che scrive per ultimo (nell'esempio Thread2).
</div>
</div>