import { Lecture, Module } from "@/app/types";
import { Subjects } from "../../site.config";

// interfaces
export interface SubjectSlug {
    subject: string;
}

export interface YearSlug {
    subject: string;
    year: string;
}

export interface ModuleSlug {
    subject: string;
    year: string;
    module: string;
}


export interface LectureSlug {
    subject: string;
    year: string;
    module: string;
    lecture: string;
}


// subjects
export function getSubjects() {
    return Subjects;
}

export function getSubjectParams(): SubjectSlug[] {
    return getSubjects().map(s => ({ subject: s.id }));
}

export function getSubjectInfo(subject: string) {
    return getSubjects().filter(s => s.id === subject)[0] || undefined;
}

// years
export function getYearParams(): YearSlug[] {
    const subjects = getSubjectParams();
    const yearParams: YearSlug[] = [];
    subjects.forEach((subjectSlug) => {
        const subjectInfo = getSubjectInfo(subjectSlug.subject);
        subjectInfo.years?.forEach((info) => {
            yearParams.push({
                subject: subjectSlug.subject,
                year: info.id,
            });
        });
    });
    return yearParams;
}

export function getYearInfo(subject: string, year: string) {
    const subInfo = getSubjects().filter(s => s.id === subject);
    if (!subInfo || subInfo.length > 1) {
        return undefined;
    }
    const yearInfo = subInfo[0].years?.filter(y => y.id === year);
    if (!yearInfo || yearInfo.length > 1) {
        return undefined;
    }
    return yearInfo[0];
}

// modules
export function getModuleParams(): ModuleSlug[] {
    const years = getYearParams();
    const moduleParams: ModuleSlug[] = [];
    years.forEach((yearSlug) => {
        const yearInfo = getYearInfo(yearSlug.subject, yearSlug.year);
        yearInfo?.mods.forEach((module) => {
            moduleParams.push({
                module: module.id,
                ...yearSlug
            })
        });
    });
    return moduleParams;
}
export function getModuleInfo(subject: string, year: string, module: string): Module | undefined {
    const subjectInfo = Subjects.filter(s => s.id === subject)[0];
    if (!subjectInfo) {
        return undefined;
    }
    const yearInfo = subjectInfo.years?.filter(y => y.id === year)[0];
    if (!yearInfo) {
        return undefined;
    }

    return yearInfo.mods?.filter(m => m.id === module)[0] as Module;
}

// lectures
export function getLectureParams(): LectureSlug[] {
    const moduleParams = getModuleParams();
    const lectureParams: LectureSlug[] = [];
    moduleParams.forEach((moduleSlug) => {
        const moduleInfo = getModuleInfo(moduleSlug.subject, moduleSlug.year, moduleSlug.module);
        moduleInfo?.lectures.forEach((lecture) => {
            lectureParams.push({
                lecture: lecture.id,
                ...moduleSlug,
            });
        });
    });
    return lectureParams;
}
export function getLectureInfo(subject: string, year: string, module: string, lecture: string): Lecture | undefined {
    const mod = getModuleInfo(subject, year, module);
    const lec = mod?.lectures.filter((l) => l.id === lecture);
    if (!lec) {
        return undefined;
    }
    return lec[0] || undefined;
}

export function getLecturesForModule(subject: string, year: string, module: string) {
    const mod = getModuleInfo(subject, year, module);
    if (!mod) {
        return [];
    }
    return mod.lectures;
}
