export interface LectureSource {
  url: string;
  type: "local" | "remote";
}

export interface Lecture {
  id: string;
  weight: number;
  title: string;
  type: "lecture";
  source: LectureSource;
}

export interface Module {
  id: string;
  name: string;
  title: string;
  slug: string;
  front_page: string;
  lectures: Lecture[];
}

export interface Subject {
  subject: string;
  short: string;
  year: number;
  mods: Module[];
}
