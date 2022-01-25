---
title: Funzionamento della RAM
layout: page
materia: sr
align: justify
---

## Come è fatta la RAM

<div class="row">
<div class="col-6">
{% include_relative img/ram_funzionamento.html %}
</div>
<div class="col-6" markdown="1">

La memoria RAM si può pensare come una lunga lista di bytes. Ad esempio un computer con 8 GigaByte di RAM avrà 8,589,934,596 (circa 8 miliardi) celle di memoria, ognuna contenente un byte cioè 8 bit (ricordate che in informatica Giga significa 2 alla 20 e non 10 all 9 come, ad esempio in fisica 3 GHz = 3,000,000,000 Hz). Le celle vengono **indirizzate** da 0 alla dimensione della RAM meno uno (infatti se ci sono due celle esse saranno "0" e "1" con quattro avremo "0", "1", "2" e "3" e così via).
Nella figura a sinistra vediamo lo schema di una memoria con M byte per cui le celle sono 0,1,2,3,...,1023,1024,...,M-2,M-1. Possiamo inoltre vedere che ad ogni cella corrispondono 8 bit che nella figura sono indicati 0,1,..,7 (in informatica si parte sempre da 0!).
Se dobbiamo memorizzare  informazione più grande di un byte, allora dobbiamo usare più celle di memoria. Nella figura si vede come 2 o 4 celle sono utilizzate per memorizzare 16 o 32 bit rispettivamente. Con ancora più celle si possono tenere numeri (dati) con un numero ancora maggiore di bit (es. 64, 128, ...). Utilizzare più celle di memoria pone il problema di come suddividere i gruppi di 8 bit nelle celle. Prendiamo, ad esempio il numero 2021 la cui rappresentazione binaria è ``11111100101``. Visto che servono più di 8 bit (11 per la precisione), dobbiamo usare due celle e quindi rappresentare 2021 con la sequenza di bit ``0000011111100101``. Una cella conterrà la *parte alta* ``00000111`` e un'altra cella la *parte bassa* 11100101 del numero. Nella figura si vede come la parte alta sia nella cella con indirizzo 1 e la parte bassa nella cella con indirizzo 0. Quindi in questo caso abbiamo i bit finali (``11100101``) prima di quelli iniziali (``00000111``) e si dice che il numero è memorizzato in **little endian**. In caso i bit iniziali vengano prima di quelli finali, parliamo di **big endian**.
</div>
</div>

## Accesso della CPU alla RAM
Come sappiamo nell'architettura di von Neumann, la *CPU è collegata alla RAM tramite il bus si sistema*. Abbiamo visto come è fatta la RAM, ma dobbiamo ancora capire come fa la CPU ad accedere ai dati memorizzati nella RAM.

<div class="row">
<div class="col-6">
{% include_relative img/comunicazione_ram_cpu.html %}
</div>
<div class="col-6">

L'immagine di fianco mostra lo schema di funzionamento della memoria e come la CPU richiede il contenuto di una cella di memoria (**Attenzione** in questo disegno all'interno delle celle è indicato l'indirizzo *non* il contenuto delle celle)
1. Per prima cosa la CPU scrive nel suo registro *Memory Address Register* (``MAR``) l'indirizzo della cella di cui vuole il contenuto.
2. Il ``MAR`` è collegato al bus di sistema e manda così l'indirizzo alla RAM.
3. Un circuito di decodifica (*demultiplexer*) della RAM attiva la linea corrispondente alla cella scelta
4. Attivando la cella, la RAM trasferisce il contenuto della stessa cella sul bus di sistema.
5. Una volta presente sul bus di sistema, il dato richiesto alla RAM viene memorizzato sul nella CPU su un apposito registro chiamato *Memory Data Register* (``MDR``).
</div>
</div>