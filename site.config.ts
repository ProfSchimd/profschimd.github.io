import { FaNetworkWired, FaJava } from "react-icons/fa6";
// import { FaNetworkWired, FaShieldVirus, FaJava, FaMobile, FaGavel, FaChartGantt, FaRobot } from "react-icons/fa6";
import { PiNumberSquareFiveBold, PiNumberSquareFourBold, PiNumberSquareThreeBold } from "react-icons/pi";

export const Author = "Prof. Schimd";

export const Social = {
    Github: "ProfSchimd",
    Bluesky: "profschimd.bsky.social",
    Linkedin: null,
    Email: null,
    Youtube: null,
    StackOverflow: "18081937",
};

export const Subjects = [
    {
        id: "inf",
        title: "Informatica",
        description: "Programmazione nativa e web, sia frontend che backend con progettazione Database.",
        slug: "/materie/inf",
        icon: FaJava,
        years: [
            // {
            //     id: "3",
            //     title: "Terzo Anno",
            //     description: "Programmazione nativa, paradigma di programmazione ad oggetti.",
            //     icon: PiNumberSquareThreeBold,
            //     slug: "/materie/inf/3/",
            //     mods: []
            // },
            {
                id: "4",
                title: "Quarto Anno",
                description: "Strutture dati lineari (lista, coda, stack, ...) e non lineari (grafi e alberi). Programmazione web frontend con HTML, CSS e Javascript.",
                icon: PiNumberSquareFourBold,
                slug: "/materie/inf/4/",
                mods: [
                    {
                        id: "INF.4.01",
                        name: "Hello JS",
                        title: "Introduzione a Javascript",
                        slug: "/materie/inf/4/INF.4.01",
                        front_page: "README.md",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Web application",
                                type: "lecture",
                                source: {
                                    url: "/web/WEB.00/0-web-application.mdx",
                                    type: "local"
                                },
                                summary: "Una web application è un applicazione che sfrutta le tecnologie web: HTTP, HTML, CSS e Javascript.",
                            },
                        ]
                    },
                    {
                        id: "INF.4.02",
                        name: "Data",
                        title: "Strutture dati",
                        slug: "/materie/inf/4/INF.4.02",
                        front_page: "README.md",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Cosa sono le strutture dati",
                                type: "lecture",
                                source: {
                                    url: "/inf/4/02-strutture-dati/01-strutture-operazioni.md",
                                    type: "local"
                                },
                                summary: "Le strutture dati sono dei costrutti che permettono di organizzare l'informazione all'interno di un calcolatore.",
                            },
                            {
                                id: "L02",
                                weight: 20,
                                title: "Liste concatenate",
                                type: "lecture",
                                source: {
                                    url: "/inf/4/02-strutture-dati/02-lista-concatenata.mdx",
                                    type: "local"
                                },
                                summary: "Questa lezione affronta le strutture dati di tipo lista, sia singolarmente che doppiamente concatenate.",
                            },
                            {
                                id: "L03",
                                weight: 30,
                                title: "Alberi",
                                type: "lecture",
                                source: {
                                    url: "/inf/4/02-strutture-dati/03-alberi.mdx",
                                    type: "local"
                                },
                                summary: "Le strutture dati ad albero rappresentano un valido strumento per rappresentare informazione gerarchica. Gli alberi sono usati spesso per operazioni di ricerca in quanto permettono di strutturare l'informazione in modo da agevolare la ricerca.",
                            },
                            {
                                id: "L04",
                                weight: 40,
                                title: "Grafi",
                                type: "lecture",
                                source: {
                                    url: "/inf/4/02-strutture-dati/04-grafi.mdx",
                                    type: "local"
                                },
                                summary: "Il caso più generale di strutture dati con nodi sono i grafi. Un grafo è una struttura dati che permette di rappresentare una relazione arbitraria tra nodi.",
                            },
                        ]
                    }
                ]
            },
            // {
            //     id: "5",
            //     title: "Quinto Anno",
            //     description: "Progettazione di database e sviluppo backend.",
            //     icon: PiNumberSquareFiveBold,
            //     slug: "/materie/inf/5/",
            //     mods: []
            // },
        ]
    },
    {
        id: "sr",
        title: "Sistemi e Reti",
        description: "Sistemi embedded per l'Internet of Things. Reti e progettazione con particolare riferimento alla cybersecurity",
        slug: "/materie/sr",
        icon: FaNetworkWired,
        years: [
            {
                id: "3",
                title: "Terzo Anno",
                description: "Sistemi di elaborazione e fondamenti di reti.",
                icon: PiNumberSquareThreeBold,
                slug: "/materie/sr/3/",
                mods: [
                    {
                        id: "SR.3.01",
                        name: "Sistemi",
                        title: "Sistemi di Elaborazione",
                        slug: "/materie/sr/3/SR.3.01",
                        front_page: "README.md",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Sistemi di Elaborazione",
                                type: "lecture",
                                source: {
                                    url: "/sr/3/01-sistemi/01-sistema-elaborazione.md",
                                    type: "local" // or "remote"
                                },
                                summary: "I sistemi di elaborazione sono quei dispositivi che sono in grado di elaborare dati. Spesso questi possono essere programmati per fare delle specifiche elaborazioni.",
                            },
                            {
                                id: "L02",
                                weight: 20,
                                title: "Automi",
                                type: "lecture",
                                source: {
                                    url: "/sr/3/01-sistemi/02-automi.md",
                                    type: "local" // or "remote"
                                },
                                summary: "Il più semplice sistema di elaborazione è l'automa il quale riceve simboli in ingresso e cambia stato in risposta a tali ingressi. Questa lezione spiega brevemente cosa sono e come si comportano gli automi mostrando il semaforo stradale come esempio di automa.",
                            },
                        ]
                    },
                    {
                        id: "SR.3.02",
                        name: "CPU",
                        title: "Funzionamento di CPU e Memoria",
                        slug: "/materie/sr/3/SR.3.02",
                        front_page: "README.md",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Fetch and Execute",
                                type: "lecture",
                                source: {
                                    url: "/sr/3/SR.3.02/01-fetch-and-execute.md",
                                    type: "local" // or "remote"
                                },
                                summary: "La CPU è il centro operativo di un sistema di elaborazione dati, essa permette di fare operazioni semplici, ma in modo veloce.",
                            },
                            {
                                id: "L02",
                                weight: 20,
                                title: "Accesso alla RAM",
                                type: "lecture",
                                source: {
                                    url: "/sr/3/SR.3.02/02-memoria.md",
                                    type: "local" // or "remote"
                                },
                                summary: "La RAM è una della memoria di un sistema di elaborazione, il suo funzionamento è strettamente collegato al funzionamento della CPU e per questo va compreso a fondo.",
                            },
                            {
                                id: "L03",
                                weight: 30,
                                title: "Assembly RISC-V",
                                type: "lecture",
                                source: {
                                    url: "/sr/3/SR.3.02/03-risc-v.md",
                                    type: "local" // or "remote"
                                },
                                summary: "Questa lezione introduce il linguaggio assembly RISC-V presentando l'architettura generale RISC-V e le principali istruzioni.",
                            }
                        ]
                    }
                ]

            },
            {
                id: "4",
                title: "Quarto Anno",
                description: "Modelli per reti e configurazione reti locali.",
                icon: PiNumberSquareFourBold,
                slug: "/materie/sr/4/",
                mods: [ // sort id and slug thing
                    {
                        id: "SR.4.01",
                        name: "Models",
                        title: "Modelli di rete",
                        slug: "/materie/sr/4/SR.4.01",
                        front_page: "",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Modelli di riferimento",
                                type: "lecture",
                                source: {
                                    url: "/sr/4/SR.4.01/01-modelli-rete.mdx",
                                    type: "local"
                                }
                            }
                        ]
                    }
                    // {
                    //     id: "SR.4.01",
                    //     name: "Physical",
                    //     title: "Livello Fisico",
                    //     slug: "/materie/sr/4/SR.4.01",
                    //     front_page: "README.md",
                    //     lectures: [

                    //     ]
                    // },
                    // {
                    //     id: "SR.4.02",
                    //     name: "Data Link",
                    //     title: "Livello di Collegamento",
                    //     slug: "/materie/sr/4/SR.4.02",
                    //     front_page: "README.md",
                    //     lectures: [

                    //     ]
                    // },
                    // {
                    //     id: "SR.4.03",
                    //     name: "Network",
                    //     title: "Livello di Rete",
                    //     slug: "/materie/sr/4/SR.4.03",
                    //     front_page: "README.md",
                    //     lectures: [{
                    //         id: "L01",
                    //         weight: 10,
                    //         title: "Ruoli del livello di Rete",
                    //         type: "lecture",
                    //         source: {
                    //             url: "L01_NetRole.md", // or "https://www. ... ",
                    //             type: "local" // or "remote"
                    //         }
                    //     },
                    //     {
                    //         id: "L02",
                    //         weight: 20,
                    //         title: "Protocolli del livello di Rete",
                    //         type: "lecture",
                    //         source: {
                    //             url: "https://www. ... /ip.md",
                    //             type: "remote"
                    //         }
                    //     }]
                    // }
                ]
            },
            {
                id: "5",
                title: "Quinto Anno",
                description: "Progettazione reti e sicurezza dei sistemi.",
                icon: PiNumberSquareFiveBold,
                slug: "/materie/sr/5/",
                mods: [
                    {
                        id: "SR.5.02",
                        name: "Application",
                        title: "Livello Applicativo",
                        slug: "/materie/sr/5/SR.5.02",
                        front_page: "",
                        lectures: [
                            {
                                id: "L01",
                                weight: 10,
                                title: "Protocollo HTTP",
                                type: "lecture",
                                source: {
                                    url: "/sr/5/SR.5.02/01-http.mdx",
                                    type: "local"
                                }
                            }
                        ]
                    }
                ]
            },
        ]
    },
    // {
    //     id: "tpsit",
    //     title: "TPSIT",
    //     description: "Progettazione di sistemi informatici, programmazione concorrente e asincrona. Sviluppo di applicazioni mobile",
    //     icon: FaMobile,
    // },

    // {
    //     id: "gpoi",
    //     title: "GPOI",
    //     description: "Gestione progetto e Organizzazione di impresa.",
    //     slug: "/materie/gpoi",
    //     icon: FaChartGantt,
    //     years: [{
    //         id: "5",
    //         title: "Quinto Anno",
    //         description: "Project management e principi di macroeconomia.",
    //         icon: FaChartGantt,
    //         slug: "/materie/gpoi/5/",
    //         mods: []
    //     }]
    // },
    // {
    //     id: "ec",
    //     title: "Educazione Civica",
    //     description: "Cittadinanza digitale. Aspetti etici della tecnologia.",
    //     icon: FaGavel,
    // },
    // {
    //     id: "cyber",
    //     title: "Cybersecurity",
    //     description: "Protezione di dati e di sistemi informatici. Attività di simulazione capture the flag.",
    //     icon: FaShieldVirus,
    // },
    // {
    //     id: "ai",
    //     title: "AI e Data Science",
    //     description: "Scienza dei dati e sistemi di intelligenza artificiale. Analisi dei dati e creazioni di chatbot",
    //     icon: FaRobot
    // },
];
