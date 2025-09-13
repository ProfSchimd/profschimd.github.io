import { Animations, Cards } from "@/app/styles";
import Button from "@/components/Button";
import { ConditionalLink, VerticalBanded } from "@/components/Cards";
import Description from "@/components/Description";
import IndexBandCard from "@/components/IndexBandCard";
import PageTitle from "@/components/PageTitle";
import { getSubjectInfo, getYearInfo, getYearParams, YearSlug } from "@/lib/slugHelpers";

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
            <PageTitle>{subjectInfo.title} - {yearInfo?.title}</PageTitle>
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
                <Button href={subjectInfo.slug || "/"}>
                    Back to {subjectInfo.title}
                </Button>
            </div>
        </div>
    );
}

export default SubjectYear;