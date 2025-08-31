import { FaNetworkWired, FaShieldVirus, FaJava, FaMobile, FaGavel, FaChartGantt, FaRobot } from "react-icons/fa6";

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
        id: "1",
        title: "Informatica",
        description: "Programmazione nativa e web, sia frontend che backend con progettazione Database.",
        slug: "/materie/inf",
        icon: FaJava,
    },
    {
        id: "2",
        title: "Sistemi e Reti",
        description: "Sistemi embedded per l'Internet of Things. Reti e progettazione con particolare riferimento alla cybersecurity",
        slug: "/materie/sr",
        icon: FaNetworkWired,
    },
    {
        id: "3",
        title: "TPSIT",
        description: "Progettazione di sistemi informatici, programmazione concorrente e asincrona. Sviluppo di applicazioni mobile",
        icon: FaMobile,
    },

    {
        id: "4",
        title: "GPOI",
        description: "Gestione progetto e Organizzazione di impresa.",
        icon: FaChartGantt,
    },
    {
        id: "5",
        title: "Educazione Civica",
        description: "Cittadinanza digitale. Aspetti etici della tecnologia.",
        icon: FaGavel,
    },
    {
        id: "6",
        title: "Cybersecurity",
        description: "Protezione di dati e di sistemi informatici. Attività di simulazione capture the flag.",
        icon: FaShieldVirus,
    },
    {
        id: "7",
        title: "AI e Data Science",
        description: "Scienza dei dati e sistemi di intelligenza artificiale. Analisi dei dati e creazioni di chatbot",
        icon: FaRobot
    },
];
