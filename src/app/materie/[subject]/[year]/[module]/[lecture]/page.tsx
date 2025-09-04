import { getLectureInfo, getLectureParams, LectureSlug } from "@/lib/slugHelpers";

export async function generateStaticParams() {
    return getLectureParams();
}

const LecturePage = async ({ params }: {
    params: Promise<LectureSlug>
}) => {
    const { subject, year, module, lecture } = await params;
    const lectureInfo = getLectureInfo(subject, year, module, lecture);
    return (
        <div>
            <p>{lectureInfo?.id}</p>
        </div>
    )
}

export default LecturePage;