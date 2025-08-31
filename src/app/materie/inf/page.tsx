import { Titles } from "@/app/styles";
import CardGrid from "@/components/Cards";
import { PiNumberSquareFourBold, PiNumberSquareThreeBold, PiNumberSquareFiveBold } from "react-icons/pi";

const years = [
  {
    id: "3",
    title: "Terzo Anno",
    description: "Fondamenti di programmazione.",
    icon: PiNumberSquareThreeBold,
    slug: "/materie/inf/3/",
  },
  {
    id: "4",
    title: "Quarto Anno",
    description: "Programmazione web: frontend.",
    icon: PiNumberSquareFourBold,
    slug: "/materie/inf/4/"
  },
  {
    id: "5",
    title: "Quinto Anno",
    description: "Programmazione web: backend. Progettazione database",
    icon: PiNumberSquareFiveBold,
    slug: "/materie/inf/5/"
  },
]

const InfPage = () => {
    return(
        <div>
            <h1 className={`${Titles.PAGE_TITLE}`}>Informatica</h1>
            <CardGrid cards={years} vertical={true} link={true} />
        </div>
    )
} 

export default InfPage;