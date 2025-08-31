import { Subject } from "@/app/types"
export const modules: Subject = {
    subject: "Sistemi e Reti",
    short: "SR",
    year: 4,
    mods: [ // sort id and slug thing
        {
            id: "SR.4.01",
            name: "Physical",
            title: "Livello Fisico",
            slug: "/materie/sr/4/SR.4.01",
            front_page: "README.md",
            lectures: [

            ]
        },
        {
            id: "SR.4.02",
            name: "Data Link",
            title: "Livello di Collegamento",
            slug: "/materie/sr/4/SR.4.02",
            front_page: "README.md",
            lectures: [

            ]
        },
        {
            id: "SR.4.03",
            name: "Network",
            title: "Livello di Rete",
            slug: "/materie/sr/4/SR.4.03",
            front_page: "README.md",
            lectures: [{
                id: "L01",
                weight: 10,
                title: "Ruoli del livello di Rete",
                type: "lecture",
                source: {
                    url: "L01_NetRole.md", // or "https://www. ... ",
                    type: "local" // or "remote"
                }
            },
            {
                id: "L02",
                weight: 20,
                title: "Protocolli del livello di Rete",
                type: "lecture",
                source: {
                    url: "https://www. ... /ip.md",
                    type: "remote"
                }
            }]
        }]
}