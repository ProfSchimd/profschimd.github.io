import { Animations, Cards, Header, Titles } from "@/app/styles";
import { ConditionalLink, VerticalBanded } from "@/components/Cards";
import Description from "@/components/Description";
import IndexBandCard from "@/components/IndexBandCard";
import { getSubjectInfo, getYearInfo, getYearParams, YearSlug } from "@/lib/slugHelpers";
import Link from "next/link";

export async function generateStaticParams() {
    return getYearParams();
}

const SubjectYear = async ({ params }: {
    params: Promise<YearSlug>
}) => {
    const { subject, year } = await params;
    const subjectInfo = getSubjectInfo(subject);
    const yearInfo = getYearInfo(subject, year);
    return (
        <div>
            <div className={`${Titles.PAGE_TITLE}`}>{subjectInfo.title} - {yearInfo?.title}</div>
            <Description>{yearInfo?.description}</Description>
            <div>
                {yearInfo?.mods.map((m, i) => (
                    <ConditionalLink key={m.id} href={m.slug} condition={true}>
                        <div className={`${Cards.VERTICAL_CARDS_CONTAINER_CLS} ${Animations.ANIMATION_SCALE_AND_SHADOW_CLS}`}>
                            <VerticalBanded
                                left={
                                    <IndexBandCard>
                                        <div className="text-xs">Modulo</div>
                                        <div className="text-2xl py-1">{i + 1}</div>
                                        <div className="text-xs">{m.name}</div>
                                    </IndexBandCard>
                                }
                                leftCls={`w-20 ${Cards.CARD_LEFT_BAND_CLS}`}
                                rightCls="p-4"
                            >
                                <div className={Cards.CARD_RIGHT_TITLE_CLS}>{m.title}</div>
                                <div className={Cards.CARD_RIGHT_SUBTITLE_CLS}>{m.id}</div>
                            </VerticalBanded>
                        </div>
                    </ConditionalLink>
                ))}
            </div>
            <div className="flex items-center justify-center w-full p-4">
                <Link className={`${Header.NAV_LINK} font-thin`} href={subjectInfo.slug || "/"}>
                    Back to {subjectInfo.title}
                </Link>
            </div>
        </div>
    );
}

export default SubjectYear;