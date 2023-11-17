---
title: Random Access Memory (RAM)
running_title: RAM
type: lecture
weight: 100
summary: "La RAM è una della memoria di un sistema di elaborazione, il suo funzionamento è strettamente collegato al funzionamento della CPU e per questo va compreso a fondo."
---

## Come è fatta la RAM
La memoria RAM si può pensare come una lunga lista di **celle di memoria** (*memory cells*) a volte chiamate anche **posizioni di memoria** (*memory positions*) ognuna contenente un byte (8 bit). Ad esempio un computer con 8 GigaByte di RAM avrà 8,589,934,596 (circa 8 miliardi) *celle* di memoria, ognuna contenente un byte cioè 8 bit (per un totale di 68,719,476,736 di bit, circa 68,7 miliardi di bit).

{{<attention>}}
In informatica **Giga** significa \\( 2^{20} \\) (2 alla 20) e non \\( 10^9 \\) (10 alla 9) come, ad esempio, in fisica 3 GHz = 3,000,000,000 Hz). Per meglio indicare questa differenza, nelle sigle si usa spesso kiB, MiB, GiB, ... per indicare le potenze di 2 (\\(2^{10}, 2^{20}, 2^{30}, \ldots \\)) e si lasciano i simboli standard kB MB, GB, ... per le potenze di 10 (\\(10^3, 10^6, 10^9, \ldots\\))
{{</attention>}}

{{<column/two-cols wr=6 wl=6 content="right" embed="img/ram_funzionamento.html">}}
La lista di celle è **indirizzate** (*addressed*) da 0 alla dimensione della RAM meno uno, per esempio con due celle gli indirizzi sono `0` e `1` con quattro  `0`, `1`, `2`, `3` e così via.

Nella figura a sinistra vediamo lo schema di una memoria con `M` byte per cui le celle sono `0,1,2,3,...,1023,1024,...,M-2,M-1`. Possiamo inoltre vedere che ad ogni cella corrispondono 8 bit che nella figura sono indicati `0,1,..,7` (in informatica si parte sempre da 0!).

Per memorizzare più di un byte è necessario usare più di una cella di memoria. Nella figura si vede come 2 o 4 celle sono utilizzate per memorizzare 16 o 32 bit rispettivamente. Con ancora più celle si possono tenere numeri (dati) con un numero ancora maggiore di bit (es. 64, 128, ...).

{{</column/two-cols>}}

### Little and Big endian
Utilizzare più celle di memoria pone il problema di come suddividere i gruppi di 8 bit nelle celle. Prendiamo, ad esempio il numero 2021 la cui rappresentazione binaria è `11111100101`. Visto che servono più di 8 bit (11 per la precisione), dobbiamo usare due celle e quindi rappresentare 2021 con la sequenza di bit `0000011111100101`. Una cella conterrà la *parte alta* `00000111` e un'altra cella la *parte bassa* 11100101 del numero. Nella figura si vede come la parte alta sia nella cella con indirizzo 1 e la parte bassa nella cella con indirizzo 0. Quindi in questo caso abbiamo i bit finali (`11100101`) prima di quelli iniziali (`00000111`) e si dice che il numero è memorizzato in **little endian**. In caso i bit iniziali vengano prima di quelli finali, parliamo di **big endian**.


## Accesso della CPU alla RAM
Nell'[architettura di von Neumann]({{<ref "01-sistema-elaborazione.md#architettura-di-von-neumann" >}}), la *CPU è collegata alla RAM tramite il bus si sistema*. Sopra abbiamo visto come è fatta la RAM, ora vogliamo capire come fa la CPU a accede (legge e scrive) i dati nella RAM.

{{<column/two-cols wr=6 wl=6 content="right" embed="img/comunicazione_ram_cpu.html">}}
L'immagine di fianco mostra lo schema di funzionamento della memoria e come la CPU richiede il contenuto di una cella di memoria. (**Attenzione** in questo disegno all'interno delle celle è indicato l'indirizzo *non* il contenuto delle celle)

1. Per prima cosa la CPU scrive nel suo registro *Memory Address Register* (`MAR`) l'indirizzo della cella di cui vuole il contenuto.
2. Il `MAR` è collegato al bus di sistema e manda così l'indirizzo alla RAM.
3. Un circuito di decodifica (*demultiplexer*) della RAM attiva la linea corrispondente alla cella scelta
4. Attivando la cella, la RAM trasferisce il contenuto della stessa cella sul bus di sistema.
5. Una volta presente sul bus di sistema, il dato richiesto alla RAM viene memorizzato sul nella CPU su un apposito registro chiamato *Memory Data Register* (`MDR`).

{{</column/two-cols>}}

### Indirizzi fisici ed indirizzi logici
Il funzionamento descritto sopra è una semplificazione di quello che accade in un sistema moderno. Il fatto è che, affinché tutto funzioni, la CPU deve conoscere l'esatto **indirizzo fisico** dei dati da leggere/scrivere. Tuttavia, quando un programma viene caricato in memoria dal sistema operativo non può essere messo sempre allo stesso indirizzo (perché potrebbe essere occupato da un altro programma in esecuzione), quindi l'indirizzo fisico che "conosce" il programma non è quello in cui si trovano i dati.

Per ovviare a questo problema gli indirizzi utilizzati dal programma si chiamano **indirizzi logici** e vengono tradotti in indirizzi fisici da una parte della CPU nota come *Memory Management Unit (MMU)*. 
1. Quando un programma viene caricato la MMU registra l'indirizzo fisico in cui il programma è caricato.
2. Prima di passare sul `MAR` un indirizzo logico viene elaborato dalla MMU che lo converte in indirizzo fisico.
3. A questo punto si può eseguire la procedura di accesso alla RAM descritta sopra.