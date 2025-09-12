import CardGrid from "@/components/Cards";

import { getSubjectInfo, getSubjectParams, SubjectSlug } from "@/lib/slugHelpers";
import PageTitle from "@/components/PageTitle";
import Description from "@/components/Description";

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
            {info.description ? <Description>{info.description}</Description> : <></>}
            {info.years ? <CardGrid cards={info.years} vertical={true} link={true} /> : <></>}
        </div>
    )
};

export default Page;