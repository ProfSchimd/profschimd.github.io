import CardGrid from "@/components/Cards";

import { Titles } from "../../styles";
import { getSubjectInfo, getSubjectParams, SubjectSlug } from "@/lib/slugHelpers";
import PageTitle from "@/components/Title";

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
            <PageTitle>{info.title}</PageTitle>
            {info.years ? <CardGrid cards={info.years} vertical={true} link={true} /> : <></>}
        </div>
    )
};

export default Page;