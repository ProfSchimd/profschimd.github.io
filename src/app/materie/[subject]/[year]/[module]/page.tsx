import { Module } from "@/app/types";
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
            <h1>{moduleInfo.title}</h1>
            {moduleInfo.lectures.sort((a, b) => a.weight - b.weight).map((lecture, i) => (
                <p key={lecture.id}>{i + 1} - {lecture.title}</p>
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