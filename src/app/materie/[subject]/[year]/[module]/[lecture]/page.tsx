import { Lecture } from "@/app/types";
import { getLectureInfo, getLectureParams, LectureSlug } from "@/lib/slugHelpers";
import { parseLocalMdx, parseRemoteMarkdown } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Elements } from "@/app/styles";
import ContentError from "@/components/ContentError";
import Description from "@/components/Description";

export async function generateStaticParams() {
    return getLectureParams();
}

interface LocalLectureProps {
    lectureInfo: Lecture;
    slug: LectureSlug;
    contentCls: string;
}

const LectureRender = async ({lectureInfo, slug, contentCls=""} : LocalLectureProps) => {
    const mergedSlug = `${slug.subject}/${slug.year}/${slug.module}/${lectureInfo.source.url}`;
    const parsed = lectureInfo.source.type === "local" ? 
        parseLocalMdx(lectureInfo.source.url) :
        await parseRemoteMarkdown(lectureInfo.source.url);
    if (!parsed) {
        return <ContentError>{lectureInfo.source.url}</ContentError>;
    }
    return (
        <div>
            <h1>{lectureInfo.title}</h1>
            {parsed?.frontMatter.description ?
                <Description>{parsed?.frontMatter.description}</Description> :
                <></>}
            <div><Link className={`${Elements.LINK}`} href={`/materie/${slug.subject}/${slug.year}/${slug.module}`}>Back</Link></div>
            <div className={`${contentCls}`}>
                {parsed?.content ?<MDXRemote source={parsed?.content}/> : <></> }
            </div>
        </div>
    );
}

const LecturePage = async ({ params }: {
    params: Promise<LectureSlug>
}) => {
    const slug = await params;
    const lectureInfo = getLectureInfo(slug.subject, slug.year, slug.module, slug.lecture);
    
    if (!lectureInfo) {
        return <></>
    }
    
    return (
        <div className="max-w-3xl mx-auto">
            <LectureRender 
                lectureInfo={lectureInfo}
                slug={slug}
                contentCls="max-w-none prose dark:prose-invert prose-lg"
            />
        </div>
    )
}

export default LecturePage;