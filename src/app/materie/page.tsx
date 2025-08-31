import CardGrid from "@/components/Cards"
import { Subjects } from "../../../site.config"

const Materie = () => {
   return (
    <div>
        <CardGrid cards={Subjects} vertical={true} link={true} title="Materie" />
    </div>
   );
}

export default Materie;