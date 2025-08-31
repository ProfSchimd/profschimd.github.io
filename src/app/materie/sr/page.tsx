import { Titles } from "@/app/styles";
import CardGrid from "@/components/Cards";
import { PiNumberSquareFourBold, PiNumberSquareThreeBold, PiNumberSquareFiveBold } from "react-icons/pi";

const years = [
  {
    id: "3",
    title: "Terzo Anno",
    description: "Sistemi di elaborazione e fondamenti di reti.",
    icon: PiNumberSquareThreeBold,
    slug: "/materie/sr/3/",
  },
  {
    id: "4",
    title: "Quarto Anno",
    description: "Modelli per reti e configurazione reti locali.",
    icon: PiNumberSquareFourBold,
    slug: "/materie/sr/4/"
  },
  {
    id: "5",
    title: "Quinto Anno",
    description: "Progettazione reti e sicurezza dei sistemi.",
    icon: PiNumberSquareFiveBold,
    slug: "/materie/sr/5/"
  },
]

const SRPage = () => {
    return(
        <div>
            <h1 className={`${Titles.PAGE_TITLE}`}>Sistemi e Reti</h1>
            <CardGrid cards={years} vertical={true} link={true} />
        </div>
    )
} 

export default SRPage;