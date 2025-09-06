import { Lecture } from "@/app/types";
import { getLectureInfo, getLectureParams, getModuleInfo, LectureSlug } from "@/lib/slugHelpers";
import { parseLocalMdx, parseRemoteMarkdown } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Elements, Header, Titles } from "@/app/styles";
import Button from "@/components/Button";
import { TbArrowBack } from "react-icons/tb";
import ContentError from "@/components/ContentError";
import Description from "@/components/Description";
import { useMDXComponents } from "@/mdx-components";

export async function generateStaticParams() {
    return getLectureParams();
}

interface LocalLectureProps {
    lectureInfo: Lecture;
    slug: LectureSlug;
    contentCls: string;
}

const LectureRender = async ({ lectureInfo, slug, contentCls = "" }: LocalLectureProps) => {
    const mergedSlug = `${slug.subject}/${slug.year}/${slug.module}/${lectureInfo.source.url}`;
    const moduleInfo = getModuleInfo(slug.subject, slug.year, slug.module);
    const parsed = lectureInfo.source.type === "local" ?
        parseLocalMdx(lectureInfo.source.url) :
        await parseRemoteMarkdown(lectureInfo.source.url);
    if (!parsed) {
        return <ContentError>{lectureInfo.source.url}</ContentError>;
    }
    return (

        <div className="flex-col">
            <Link className={`${Elements.LINK}`} href={`/materie/${slug.subject}/${slug.year}/${slug.module}`}>
                    <TbArrowBack className="mr-1 inline" /> {moduleInfo?.title}
                </Link>
            <h1 className={`${Titles.PAGE_TITLE} mt-2`}>{lectureInfo.title}</h1>
            {parsed?.frontMatter.description ?
                <Description>{parsed?.frontMatter.description}</Description> :
                <></>}
            <div className="mb-4 pb-2 border-b border-gray-500">
                
            </div>
            <div className={`${contentCls} mb-4 pb-2 border-b border-gray-500`}>
                {parsed?.content ? <MDXRemote source={parsed?.content}  components={useMDXComponents()}/> : <></>}
            </div>

            {/* TODO  */}

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