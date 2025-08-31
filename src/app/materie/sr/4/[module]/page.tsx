import { Module } from "@/app/types";
import { modules } from "../modules";

// put in types
interface ModuleProps {
    params: Promise<{
        module: string;
    }>
}

// we need to create utility functions that use input objects/jsons to extract
// information about modules and lecture. 
export async function generateStaticParams() {

    return modules.mods.map((module) => (
        { module: module.id }
    ));
}

function getModuleInfo(name: string) {
    return modules.mods.filter((m) => m.id === name)[0];
}

// Extract into components (to use in all modules)
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

const ModulePage = async ({ params }: ModuleProps) => {
    const { module } = await params;
    const moduleInfo = getModuleInfo(module);
    return (
        <div>
            {moduleInfo ? <ModuleIndex {...moduleInfo} /> : <ModuleNotFound module={module} />}
        </div>
    );
}

export default ModulePage;