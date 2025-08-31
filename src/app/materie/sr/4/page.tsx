import { Module } from "@/app/types";
import { modules } from "./modules";
import Link from "next/link";
import { Elements, Titles } from "@/app/styles";

interface ModuleCardProps {
    module: Module;
}

const ModuleCard = ({ module }: ModuleCardProps) => {
    const lectures = module.lectures.sort((a, b) => a.weight - b.weight);
    return (
        <div>
            <p className={`${Titles.PAGE_TITLE} font-thin`}>
                <Link className={`${Elements.LINK}`} href={module.slug}>{module.title}</Link>
            </p>
            <p className="mb-2">{`${module.id} - ${module.name}`}</p>
            <p className="text-xl">Lezioni del modulo</p>
            <div className="pb-2 my-4 border-b-1 border-gray-500">
                {lectures.map((lecture, i) => (
                    <div key={i} className="flex items-center gap-3 m-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white text-sm font-medium">
                            {i + 1}
                        </span>
                        <span>{lecture.title}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

const SRFourth = () => {
    return (
        <div>
            {modules.mods.map((module) => (
                <ModuleCard key={module.id} module={module} />
            ))}
        </div>
    );
};

export default SRFourth;