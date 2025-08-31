import CardGrid from "@/components/Cards";
import { metadata } from "./layout";
import { Titles } from "./styles";
import { Subjects } from "../../site.config";

export default function Home() {
  return (
    <div>
      <h1 className={`${Titles.HOME} font-thin`}>{`${metadata.title}`}</h1>
      <CardGrid cards={Subjects} link={true} title="Materie" />
    </div>
  );
}


