import { Lecture } from "@/app/types";
import { getLectureInfo, getLectureParams, getModuleInfo, LectureSlug } from "@/lib/slugHelpers";
import { parseLocalMdx, parseRemoteMarkdown } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Content, Elements, Titles } from "@/app/styles";
import { TbArrowBack } from "react-icons/tb";
import ContentError from "@/components/ContentError";
import Description from "@/components/Description";
import { mdxOptions, useMDXComponents } from "@/mdx-components";
import PageTitle from "@/components/PageTitle";

export async function generateStaticParams() {
    return getLectureParams();
}

interface LocalLectureProps {
    lectureInfo: Lecture;
    slug: LectureSlug;
    contentCls: string;
}

const LectureRender = async ({ lectureInfo, slug, contentCls = "" }: LocalLectureProps) => {
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
            <PageTitle className={`${Titles.PAGE_TITLE} mt-2`}>{lectureInfo.title}</PageTitle>
            {parsed?.frontMatter.description ?
                <Description>{parsed?.frontMatter.description}</Description> :
                <></>}
            <div className="mb-4 pb-2 border-b border-gray-500">

            </div>
            <div className={`${contentCls} mb-4 pb-2 border-b border-gray-500`}>
                {parsed?.content ? <MDXRemote source={parsed?.content} components={useMDXComponents()} options={mdxOptions} /> : <></>}
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
                contentCls={`max-w-none ${Content.PROSE} ${Content.PROSE_PRE}`}
            />
        </div>
    )
}

export default LecturePage;