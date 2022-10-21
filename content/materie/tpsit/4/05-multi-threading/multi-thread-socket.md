---
title: Socket e multi-threading
---

Un utilizzo frequente dei thread è in combinazione con i socket. Si pensi ad un Web Server
che riceve migliaia o più di richieste di connessioni in contemporanea. Come è possibile
gestire tutte queste richieste in modo veloce?

Una possibilità è che il server utilizzi più thread per gestire le varie connessioni.
Bisogna però stare attenti che l'utilizzo di troppi thread può sovraccaricare il server
ottenendo l'effetto opposto a quello desiderato.

Per capire meglio questo problema vediamo un problema "classico" di programmazione con i
socket: *la creazione di un Echo Client e di un Echo Server*. Un Echo Server non fa altro
che rimandare al Client tutto quello che quest'ultimo spedisce (gli fa l'*eco*, *echo* in
inglese). Un Echo Client è semplicemente un programma che manda messaggi ad un server ed
aspetta la risposta di questo. Di seguito ci concentreremo sulla realizzazione di un Echo
Client ed un Echo Server in Java

## Echo Client

Il seguente codice crea un Echo Client che si connette e manda stringhe (linee) sulla
*porta TCP* ``23432`` (impostata mediante la variabile ``SERVER_LISTEN_PORT``).

{{<highlight java "linenos=table">}}
public class EchoClient {
    public static final int SERVER_LISTEN_PORT = 23432;
    public static void main(String[] args) {
        String hostName = "127.0.0.1"; // stesso host del client
        try {
            Socket client = new Socket(hostName, SERVER_LISTEN_PORT);
            InputStreamReader isr = new InputStreamReader(client.getInputStream());
            BufferedReader in = new BufferedReader(isr);
            PrintWriter out = new PrintWriter(client.getOutputStream(), true);
            Scanner scanner = new Scanner(System.in);
            while(true) {
                String line = scanner.nextLine();
                System.out.println("Spedisco: " + line);
                out.println(line);
                line = in.readLine();
                System.out.println("Ricevuto: " + line);
                if (line.equals("exit")) {
                    break;
                }
            }
            scanner.close();
            out.close();
            in.close();
            isr.close();
            client.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
{{</highlight>}}

Il codice del client è relativamente semplice.
1. Inizialmente, viene effettuata la connessione (``new Socket``) e vengono creati gli stream
da cui ricevere dal server (``BufferedReader in``) e su cui spedire al server ``PrintWriter out``.
Inoltre viene creato uno ``Scanner`` per la lettura da tastiera.
2. A questo punto si avvia un ciclo infinito (``while(true)``) che
    1. legge da tastiera e stampa a video quanto letto
    2. manda sulla connessione quanto letto e
    3. riceve da remoto stampando a schermo quanto ricevuto.
3. Il ciclo infinito termina quando a tastiera viene digitato ``exit``. Al termine del ciclo gli
stream e la connessione vengono chiusi prima che il programma termini.

Il programma sopra è corretto, ma non funziona se prima non viene
avviato un server che accetta connessioni TCP sulla porta indicata. Senza server, il client
genera un errore simile al seguente

    java.net.ConnectException: Connection refused
        at java.base/sun.nio.ch.Net.connect0(Native Method)
        at java.base/sun.nio.ch.Net.connect(Net.java:579)
        at java.base/sun.nio.ch.Net.connect(Net.java:568)
        at java.base/sun.nio.ch.NioSocketImpl.connect(NioSocketImpl.java:588)
        at java.base/java.net.SocksSocketImpl.connect(SocksSocketImpl.java:327)
        at java.base/java.net.Socket.connect(Socket.java:633)
        at java.base/java.net.Socket.connect(Socket.java:583)
        at java.base/java.net.Socket.<init>(Socket.java:507)
        at java.base/java.net.Socket.<init>(Socket.java:287)
        at EchoClient.main(EchoClient.java:12)

da dove si capisce che la connessione è stata rifiutata (``connection refused``). Il passo
successivo, quindi, è scrivere il programma Echo Server.

## Echo Server

Il codice di un server (*single thread*, cioè che utilizza solo il thread principale) è
presentato di seguito.

{{<highlight java "linenos=table">}}
public class SingleThreadSocket {
    public static final int SERVER_LISTEN_PORT = 23432;
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket(SERVER_LISTEN_PORT);
            Socket socket = server.accept();
            InputStreamReader isr = new InputStreamReader(socket.getInputStream());
            BufferedReader in = new BufferedReader(isr);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            String line;
            while((line = in.readLine()) != null) {
                System.out.println("Ricevuto: " + line);
                out.println(line);
                if (line.equals("exit")) {
                    break;
                }
            }
            out.close();
            in.close();
            isr.close();
            socket.close();
            server.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
{{</highlight>}}

Come si vede, il server è molto simile al client, la vera differenza è nelle righe
{{<highlight java "linenos=table">}}
ServerSocket server = new ServerSocket(SERVER_LISTEN_PORT);
Socket socket = server.accept();
{{</highlight>}}
permettono al server di *mettersi in ascolto* sulla porta indicata (la stessa del client)
e creare un ``Socket`` per le comunicazioni non appena il primo client apra una connessione
TCP su quella porta.

{{<exercise>}}
Per vedere cosa succede quando due client provano a connettersi allo stesso server:
1. compila avvia il server ``SingleThreadSocket.java``
2. compila il file ``EchoClient.java``
3. Avvia due istanze di EchoClient
Cosa succede se si prova a scrivere qualcosa sulla prima istanza EchoClient? Cosa succede
se si scrive sulla seconda istanza? Perché succede questo?
{{</exercise>}}

## Echo Server con multi-threading
Se si svolge l'esercizio alla fine del paragrafo precedente, si vede come la soluzione
fin qui proposta non permetta di connettere più client allo stesso server. Questo è
tipicamente un problema perché i server sono proprio pensati per gestire più client
contemporaneamente.

Il problema è che ogni nuovo client richiede che vengano propriamente gestiti gli
stream associati (``in`` e ``out``), ma questo è molto difficile con un solo thread.
La soluzione più logica, quindi, è quella di usare più thread, uno per ogni client
connesso (si veda il riquadro Attenzione alla fine del paragrafo).

Per realizzare questa soluzione dobbiamo come prima cosa creare un ``Thread`` che
si occupi di gestire la comunicazione con uno specifico client.

{{<highlight java "linenos=table">}}
public class SocketThread extends Thread {
    private Socket socket;
    private BufferedReader in;
    private PrintWriter out;
    public SocketThread(Socket socket) throws IOException {
        this.socket = socket;
        InputStreamReader isr = new InputStreamReader(socket.getInputStream());
        in = new BufferedReader(isr);
        out = new PrintWriter(socket.getOutputStream(), true);
    }
    @Override
    public void run() {
        try {
            String line;
            while ((line = in.readLine()) != null) {
                System.out.println("[R]: " + line);
                out.println(line);
                if (line.equals("exit")) {
                    break;
                }
            }
            out.close();
            in.close();
            socket.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
{{</highlight>}}

Si nota subito come il codice sia quasi tutto il codice del server single thread
però organizzato tra il costruttore ``SocketThread`` e il metodo ``run``. Proprio
per questo motivo il server ora è molto più semplice
{{<highlight java "linenos=table">}}
public class MultiThreadSocket {
    public static final int SERVER_LISTEN_PORT = 23432;
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket(SERVER_LISTEN_PORT);
            while(true) {
                Socket socket = server.accept();
                Thread t = new SocketThread(socket);
                t.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
{{</highlight>}}
L'unica cosa rimasta in questo codice è la parte di ascolto (``server.accept()``) di una
nuova connessione. Non appena se ne verifica una, l'oggetto di tipo ``Socket`` restituito
da ``accept()`` viene utilizzato per creare ed avviare un nuovo thread del tipo ``SocketThread``
sopra. Fatto questo, il thread principale del server si mette subito in attesa di nuove
connessione, mentre le comunicazioni con il client appena connesso vengono gestite dal
thread appena avviato.
​

{{<attention>}}
Avviare un thread per ogni connessione può sembrare la scelta più ovvia, ma se il server
deve gestire molte connessioni contemporaneamente (centinaia o migliaia), bisogna garantire
che non si generino troppi thread che causerebbero il sovraccarico del server, fino a
renderlo inutilizzabile.
{{</attention>}}

## Link utili
* [Codice su GitHub](https://github.com/ProfSchimd/4id_2021_2022/tree/master/thread/socket)
