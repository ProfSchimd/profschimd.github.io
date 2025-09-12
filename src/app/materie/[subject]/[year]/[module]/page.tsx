import { Animations, Cards } from "@/app/styles";
import { Module } from "@/app/types";
import { ConditionalLink, VerticalBanded } from "@/components/Cards";
import IndexBandCard from "@/components/IndexBandCard";
import PageTitle from "@/components/Title";
import { getModuleInfo, getModuleParams, ModuleSlug } from "@/lib/slugHelpers";


export async function generateStaticParams() {
    return getModuleParams();
}

// TODO: Extract into components (to use in all modules)
function ModuleNotFound({ module }: { module: string }) {
    return (
        <p>{module} Not found</p>
    )
}

function ModuleIndex(moduleInfo: Module) {
    return (
        <div>
            <PageTitle>{moduleInfo.title}</PageTitle>
            {moduleInfo.lectures.sort((a, b) => a.weight - b.weight).map((lecture, i) => (
                <ConditionalLink key={lecture.id} href={`${moduleInfo.slug}/${lecture.id}`} condition={true}>
                        <div className={`${Cards.VERTICAL_CARDS_CONTAINER_CLS} ${Animations.ANIMATION_SCALE_AND_SHADOW_CLS}`}>
                            <VerticalBanded
                                left={
                                    <IndexBandCard>
                                        <div className="text-xs">Lezione</div>
                                        <div className="text-2xl py-1">{i + 1}</div>
                                        <div className="text-xs">{lecture.id}</div>
                                    </IndexBandCard>
                                }
                                leftCls={`w-20 ${Cards.CARD_LEFT_BAND_CLS}`}
                                rightCls="p-4"
                            >
                                <div className={Cards.CARD_RIGHT_TITLE_CLS}>{lecture.title}</div>
                                <div className={Cards.CARD_RIGHT_SUBTITLE_CLS}>{lecture.id}</div>
                            </VerticalBanded>
                        </div>
                    </ConditionalLink>
            ))}
        </div>
    );
}

const ModulePage = async ({ params }: {
    params: Promise<ModuleSlug>
}) => {
    const { subject, year, module } = await params;
    const moduleInfo = getModuleInfo(subject, year, module);
    return (
        <div>
            {moduleInfo ? <ModuleIndex {...moduleInfo} /> : <ModuleNotFound module={module} />}
        </div>
    );
}

export default ModulePage;