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
  summary: string;
}

export interface Module {
  id: string;
  name: string;
  title: string;
  slug: string;
  front_page: string;
  lectures: Lecture[];
}

// export interface Year {
//   id: string,
//   title: string,
//   description: string,
//   icon: any,
//   slug: string,
//   mods: Module[]
// }

// export interface Subject {
//   id: string,
//   title: string,
//   description: string;
//   slug: string;
//   years: Year[];
//   mods: Module[];
//   icon: IconType;
// }
