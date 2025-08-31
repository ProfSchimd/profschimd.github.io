---
title: Primi passi con Python
summary: "Primissimi programmi/script Python: dal classico Hello World!, all'utilizzo delle liste Python e della list comprehension."
type: "lecture"
number: 2
weight: 20
repo: "https://github.com/ProfSchimd/python/tree/main/01_python_primi_passi"
quiz_page: "quiz"
---

## Hello World!
Python può essere utilizzato anche come *linguaggio di scripting*, questo implica che
il ``main`` è implicito nella prima riga del file che viene eseguito. Per vedere
questo basta scrivere un file ``hello.py`` inserendo la seguente riga
{{<highlight python>}}
print("Hello World!")
{{</highlight>}}
ed eseguire l'interprete python su tale file

    python hello.py

il risultato dovrebbe essere proprio la stampa della famigerata stringa ``Hello World!``

### Buona pratica: il ``main``
Anche se Python non prevede esplicitamente un ``main``, è sempre buona norma (per evitare
futuri mal di testa), organizzare il codice in modo che si rispecchi la classica esecuzione
con un ``main``. Per fare questo si può usare la variabile ``__name__`` (inizio e fine con
un doppio underscore ``_``) che contiene il *nome* dell'esecuzione (``__main__`` quando si
esegue l'interprete con il comando mostrato sopra, altro valore comune è ``__test__``).

{{<highlight python "linenos=table">}}
def main():
    print("Hello World!")

if __name__ == "__main__":
    main()
{{</highlight>}}

Da notare che
* il file viene ancora eseguito come uno script cioè partendo dalla prima riga,
* essendo la prima riga un ``def`` viene quindi definita una procedura dal nome
``main``
* successivamente viene eseguito l'``if`` della riga 4 che confronta il valore
della variabile ``__name__`` con la stringa (*literal*) ``__main__``,
* se questo confronto dà esito positivo, viene invocata la funzione ``main``.

#### Dove sono i miei ``args``?!
Abbiamo visto come un vero ``main`` in Python non esista, ma allora come si
possono recuperare i parametri della riga di comando? Ad esempio il comando

    python hello_args.py Mario Rossi 34

ha tre parametri: ``Mario``, ``Rossi`` e ``34``. Per accedere a questi
parametri, bisogna utilizzare la variabile ``argv`` (*arguments vector*)
presente nel **modulo**``sys`` della libreria standard di Python che,
tuttavia, importato con l'istruzione ``import``. Copiano in un file
con il nome ``hello_args.py`` il seguente codice

{{<highlight python "linenos=table">}}
import sys

def main():
    print(sys.argv)

if __name__ == "__main__":
    main()
{{</highlight>}}

ed eseguendo l'istruzione sopra, verrà prodotto in output qualcosa simile
alla seguente riga

    ['hello_args.py', 'Mario', 'Rossi', '34']

che indica una **lista** (lo riconosciamo dalle parantesi quadre ``[ ]``)
che contiene
1. nella prima posizione (indice ``0``) il nome del programma (script) eseguito,
2. nelle rimanenti posizioni gli argomenti passati alla linea di comando.

{{<observe>}}
Come tutti i linguaggi di programmazione, anche Python ha i **commenti**. Un commento
inizia con il carattere *sharp* ``#`` (cancelletto) e termina con la fine della riga.
Non è prevista una sintassi apposita per i *blocchi di commento*, bisogna quindi
utilizzare un ``#`` ad ogni inizio di riga di commento.
{{</observe>}}

## Variabili
Una differenza di Python con linguaggi come Java e C++ è che le variabili
vengono dichiarate senza tipo

{{<highlight python>}}
a = 10 # intero
b = 3.14 # float
c = "hello" # stringa
cc = 'world!' # stringa
{{</highlight>}}
Questo, tuttavia, non vuol dire che Python non sia un linguaggio tipizzato.
Ad esempio, le seguenti istruzioni (successivamente a quelle sopra), falliscono
generando l'errore riportato sotto.
{{<highlight python>}}
d = a - 1 # Ok
e = c + a # Errore
{{</highlight>}}

    Traceback (most recent call last):
    File "vars.py", line 5, in <module>
        e = c + a
    TypeError: can only concatenate str (not "int") to str

Giustamente, Python si lamenta che (secondo lui) non ha senso
*concatenare* (operatore ``+`` su stringhe) una stringa e un intero.
Il modo giusto per ottenere l'effetto di creare la string ``hello10``
è convertire prima l'intero ``a`` in stringa, questo è possibile
utilizzando la funzione *built-in* ``str``
{{<highlight python>}}
e = c + str(a) # Ok
print(e)
{{</highlight>}}

Oltre a ``str`` sono disponibili altre funzioni per le conversioni "basilari":
* ``int(x)`` converte l'argomento ``x`` in intero,
* ``float(x)`` converte l'argomento ``x`` in numero decimale (*floating point*).

{{<exercise>}}
Scrivere un programma che calcola la media di 3 numero forniti dalla riga di comando
(per accedere agli elementi di una lista, si usa la notazione indice ``v[i]`` con indice
che prende i valori ``0,1,2,...``).
{{</exercise>}}

### Operatori
Python possiede tutti gli operatori aritmetici e logici che sono presenti nei linguaggi
di programmazione. Qui presentiamo solo i più importanti di questi operatori, una lista
più esauriente si può trovare a [questa pagina](https://www.w3schools.com/python/python_operators.asp).

{{<table>}}
| Operatore | Nome             | Esempio       |
|-----------|------------------|---------------|
|  ``+ ``   | Addizione        | 1 + 3 = 5     |
|  ``-``    | Sottrazione      | 3.5 - 2 = 1.5 |
|  ``*``    | Moltiplicazione  | 4 * 4 = 16    |
|  ``/``    | Divisione	       | 5 / 10 = 0.5  |	
|  ``%``    | Resto	           | 4 % 3 = 1	   |
|  ``**``   | Potenza	       | 2 ** 3 = 8	   |
|  ``//``   | Divisione intera | 5 // 2 = 1    |
{{</table>}}

{{<exercise>}}
Scrivere un programma che faccia la *divisione euclidea* di un intero ``n`` per un
intero ``m`` fornendo un intero ``q`` (*quoziente*) e un intero ``r`` (*resto*) tali
che
\\[ n = mq + r \\]
i valori di input ``n`` ed ``m`` vanno presi dalla riga di comando mentre i valori
di output ``q`` ed ``r`` vanno stampati sulla console.
{{</exercise>}}

## Funzioni
È sempre buona norma dividere il codice in *blocchi* ognuno dei quali si occupa di risolvere un
problema ben specifico. Il modo più semplice di dividere in blocchi è utilizzando le **funzioni**
o *subroutine* (un altro modo è utilizzando la programmazione ad oggetti che tratteremo in una
lezione futura).

In Python una funzione si dichiara utilizzando la parola chiave ``def``, seguita dalla **firma**
della funzione:
* nome della funzione e
* lista dei parametri.

{{<highlight python>}}
def nomeFunzione(parametro1, parametro2, ...):
    istruzione1
    istruzione2
    # ...
    return valoreDaRestituire
{{</highlight>}}

In Python il tipo ritornato da una funzione ed il tipo dei parametri non sono
obbligatori (nelle prime versioni di Python non erano previste, ma più di recente è stata
introdotta la possibilità di indicare i tipo). Ad esempio la funzione ``somma`` del codice
sotto, avrà risultati diverso in base ai parametri forniti

{{<highlight python "linenos=table">}}
def somma(a, b):
    return a + b

def main():
    print(somma(1,2))
    print(somma("1", "2"))

if __name__ == "__main__":
    main()
{{</highlight>}}

### Valori di ritorno
Per ritornare un valore da una funzione in Python si usa l'istruzione ``return``. Nell'esempio
visto sopra, la funziona ``somma`` restituisce il risultato dell'operazione ``a + b``. L'istruzione
``return`` fa anche terminare l'esecuzione della funzione ovunque questa si trovi

Le funzioni Python ritornano sempre un valore, quando questo non è esplicitato dal
programmatore, questo valore è ``None``.

{{<highlight python "linenos=table">}}
def noneReturn():
    pass

a = noneReturn()
print(a)
{{</highlight>}}

In questo esempio si vede anche come creare un blocco che non ha alcuna istruzione (in questo caso
si tratta di un blocco funzione, ma lo stesso si può fare con blocchi cicli e classi).

#### Ritornare più valori
Altra caratteristica interessante di Python, è la possibilità che una funziona restituisca più di un
valore
{{<highlight python "linenos=table">}}
def minmax(a, b):
    return min(a,b), max(a,b)

def main():
    print(minmax(3,1))
    
if __name__ == "__main__":
    main()
{{</highlight>}}

Nell'esempio sopra, la funzione ``minmax`` restituisce due valori: il minimo ed il massimo dei due
parametri passati in ingresso.

{{<observe>}}
Nell'esempio di codice ``minmax`` si può vedere l'utilizzo di due altre funzioni standard di Python:
``min`` restituisce il minimo tra **2 o più valori** e ``max`` restituisce il massimo tra **2 o più
valori**.  
{{</observe>}}

{{<exercise>}}
Ri-scrivere il codice per la *divisione euclidea* (vedi sopra) utilizzando una funzione che
prende in input ``n`` ed ``m`` e che restituisce i valori ``q`` e ``r``.
{{</exercise>}}

{{<exercise title="Equazione di secondo grado">}}
Scrivere una funzione Python ``secondoGrado`` che calcola le soluzioni dell'equazione

$$ ax^2 + bx + c = 0 $$

quando \\(a\\), \\(b\\) e \\(c\\) sono input della funzione e le due soluzioni \\(x_1\\) e \\(x_2\\)
sono output. Per calcolare \\(\sqrt{x}\\) si può usare la funzione ``sqrt(x)`` attraverso il pacchetto
``math`` che va importato
{{<highlight python>}}
import math
...
def secondoGrado(a, b, c):
    ...
    # mette in 'r' la radice quadrata di 'discriminante'
    r = math.sqrt(discriminate) 
    ...
{{</highlight>}}
{{</exercise>}}

In Python è possibile catturare valori di ritorno multipli sia utilizzando le *tuple*, sia utilizzando
le variabili. Ad esempio per mettere minimo e massimo in due variabile usando la nostra funzione ``minmax``
possiamo usare il seguente codice
{{<highlight python "linenos=table">}}
minimo, massimo = minmax(3, 1)
print(minimo) # stampa 1
print(massimo) # stampa 3
{{</highlight>}}

{{<attention>}}
Quando si usano funzioni con più valori ritornati bisogna fare attenzione a cosa viene *catturato*.
{{<highlight python>}}
v = minmax(2, -1)
print(v) # stampa (-1, 2) -> tupla
v, w = minmax(2, -1)
print(v) # stampa -1 -> intero
{{</highlight>}}
A sinistra dell'uguale ci può essere 

* una sola variabile questa variabile sarà una tupla se la funzione restituisce più di un valore
* un numero variabili **uguale** al numero di variabili restituite dalla funzione

In tutti gli altri casi l'interprete Python darà un messaggio d'errore simile al seguente

    Traceback (most recent call last):
    File "<pyshell>", line 1, in <module>
    ValueError: too many values to unpack (expected 2)

{{</attention>}}

### Parametri opzionali e parametri con nome (*named parameters*)
Come la maggior parte dei linguaggi, anche Python permette l'utilizzo di *valori di default* per i
parametri di una funzioni. I valori di default sono quelli che il parametro ha quando nulla viene
indicato nella chiamata.

{{<highlight python "linenos=table">}}
def saluta(nome="anonimo", cognome=""):
    print("Hello " + nome + " " + cognome + "!")

saluta() # 'Hello anonimo!'
saluta("Mario") # 'Hello Mario!'
saluta("Mario", "Rossi") # 'Hello Mario Rossi!'
{{</highlight>}}

In questo semplice esempio la funziona ``saluta`` ha due parametri (``nome`` e ``cognome``) che
hanno un valore di default.

* Quando nessun valore viene passato, i due valori di default vengono utilizzati (sia per ``nome``
che per ``cognome``).
* Quando un valore viene passato, solo il secondo viene inizializzato con il valore di default.
* Infine, quando due valori vengono passati, nessun valore di default viene utilizzato.

Si vede come sia impossibile in questo modo avere un valore assegnato al secondo parametro
(``cognome``), ma il valore di default per il primo parametro (``nome``). Per fare questo si
può usare il nome del parametro nella chiamata
{{<highlight python>}}
saluta(cognome="ignoto") # 'Hello anonimo ignoto!'
{{</highlight>}}

I nomi dei parametri si possono anche usare per indicare il valore da dare ai vari parametri
senza necessariamente mantenere l'ordine con cui sono stati dichiari
{{<highlight python>}}
saluta(cognome="Verdi", nome="Andrea") # 'Hello Andrea Verdi!'
{{</highlight>}}
Si veda come nell'esempio sopra, prima viene assegnato il valore al parametro ``cognome``
(che compare secondo nella lista) e poi al parametro ``nome`` (che compare primo
nella lista).

## Input
Chiedere l'input da tastiera in Python è molto semplice, basta usare la funzione ``input`` la quale
si metterà in attesa di un input dalla tastiera
{{<highlight python "linenos=table">}}
nome = input()
  Mario
print(nome) # stampa 'Mario'
{{</highlight>}}
È possibile indicare una stringa come parametri di ``input`` per aiutare a comprendere l'input richiesto
{{<highlight python "linenos=table">}}
nome = input("Nome: ")
  Nome: Fabio
print(nome) # stampa 'Fabio'
{{</highlight>}}

{{<exercise>}}
Scrivere una funzione Python senza parametri che richieda di inserire in input nome e cognome
e che restituisca le due stringhe (prima cognome e poi nome).
{{</exercise>}}

## Condizione ``if``, ``else`` e ``elif``
{{<highlight python "linenos=table">}}
def stampaNumero(numero, base=10):
    if(base == 16):
        print("{0:x}".format(numero))
    elif(base == 8):
        print("{0:o}".format(numero))
    elif(base == 2):
        print("{0:b}".format(numero))
    else:
        print("{0}".format(numero))
{{</highlight>}}

## Cicli

### Ciclo ``while``
In Python è presente il ciclo ``while`` che esegue un gruppo di operazione fino a che
una certa condizione è vera. La sintassi generica del ciclo ``while`` è la seguente
{{<highlight python "lineos=table">}}
while condizione:
    # operazioni
    # ...
# prima istruzione dopo il ciclo
{{</highlight>}}

Si noti come le istruzioni del ciclo iniziano con una indentazione (riga 2 sopra)
e terminano quando questa indentazione "rientra" (riga 4 sopra).

Ad esempio per stampare il *countdown* di capodanno da ``10`` a ``0`` si può il seguente
ciclo ``while``.
{{<highlight python "linenos=table">}}
i = 10
while i>0:
    print(i, "...")
    i -= 1 # Senza il programma non termina!
print("...Buon 1991")
{{</highlight>}}

Un esempio più complicato permette di continuare a leggere l'input da tastiera fino a che non viene
immesso il carattere ``q`` o ``Q``, possiamo usare il seguente ciclo ``while``.

{{<highlight python "linenos=table">}}
lettura = ""
while (lettura != "q" and lettura != "Q"):
    lettura = input("Carattere (q per uscire): ")
{{</highlight>}}

La condizione controllo che contemporaneamente (operatore logico ``and``):
1. la variabile ``lettura`` **non** sia uguale alla stringa ``"q"`` **e**
2. la variabile ``lettura`` **non** sia uguale alla string ``"Q"`` (notare maiuscolo).

Se una delle condizione (o entrambe) **non** sono vere, allora la condizione del
``while`` non è più vera ed il ciclo termina.

### Ciclo ``for``
Oltre al ciclo ``while``, Python prevede un solo altro tipo di ciclo, il ciclo ``for``.
Il ``for`` di Python è di tipo *for each* cioè itera ogni elemento di un un oggetto che,
ovviamente, deve essere *iterabile*. Un esempio di oggetto iterabile sono le liste
{{<highlight python>}}
lista = [0,1,2,3,4,5,6,7,8,9]
{{</highlight>}}

La sintassi del ``for`` è la seguente
{{<highlight python>}}
for variabile in iterabile:
    # operazioni
    # ...
# prima istruzione dopo il ciclo
{{</highlight>}}

Esattamente come nel ciclo ``while``, l'indentazione del codice è usata per le operazioni
all'interno del ciclo.

{{<example>}}
Stampare il numero \\(x^2\\) (\\(x\\) al quadrato) per ogni intero \\(x\\) tra 1 e 9
{{<highlight python "linenos=table">}}
lista = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for x in lista:
    print(x*x) # si può anche scrivere x**2
{{</highlight>}}
{{</example>}}

#### La funzione ``range``
Dichiarare esplicitamente gli elementi su cui iterare è, ovviamente, poco pratico e a volte
impossibile. Per generare numeri interi in un certo *range* (intervallo) si può usare la
funzione *built-in* (cioè che fa parte del linguaggio Python) ``range``. Questa funzione
accetta uno, due o tre parametri e restituisce in oggetto iterabile. Vediamo in generale
l'utilizzo di ``range``.

{{<highlight python "linenos=table">}}
# Un parametro 'n' -> 0, 1, 2, ..., n-1
for i in range(10):
    print(i) # 0,1,2,...,9
# Due parametri 'm' e 'n' -> m, m+1, m+2, ..., n-1
for i in range(5,10):
    print(i) # 5,6,..,9
# Tre parametri 'm', 'n' e 'k' -> m, m+k, m+k+k, ...
for i in range(0, 100, 10):
    print(i) # 0,10,20,...,90
{{</highlight>}}



