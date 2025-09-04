import CardGrid from "@/components/Cards";
import { Titles } from "../../styles";
import { getSubjectInfo, getSubjectParams, SubjectSlug } from "@/lib/slugHelpers";

export async function generateStaticParams() {
    return getSubjectParams();
}

interface PagePros {
    params: Promise<SubjectSlug>
}

const Page = async ({ params }: PagePros) => {
    const { subject } = await params;
    const info = getSubjectInfo(subject);
    
    return (
        <div>
            <h1 className={`${Titles.PAGE_TITLE}`}>{info.title}</h1>
            {info.years ? <CardGrid cards={info.years} vertical={true} link={true} /> : <></>}
        </div>
    )
};

export default Page;