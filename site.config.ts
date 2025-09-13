import { FaNetworkWired, FaJava} from "react-icons/fa6";
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
                            // {
                            //     id: "L02",
                            //     weight: 20,
                            //     title: "Il linguaggio Javascript",
                            //     type: "lecture",
                            //     source: {
                            //         url: "https://raw.githubusercontent.com/ProfSchimd/teaching-material/refs/heads/main/inf/javascript/JS.01_JSLanguage/JS.01.L01_HelloJS/README.md",
                            //         type: "remote"
                            //     }
                            // }
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
                mods: []
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
