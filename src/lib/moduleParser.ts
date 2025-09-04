import fs from "fs";
import pathlib from "path";
import matter from "gray-matter";
import { getLocalContentDirectory } from "./utils";

export function parseLocalMdx(path: string) {
    path = pathlib.join(getLocalContentDirectory(), path)
    console.log(path);
    try {
        const fileContents = fs.readFileSync(path);
        const {data, content} = matter(fileContents);
        return {
            frontMatter: data,
            content: content,  
        }
    } catch {
        return null;
    }
}


// export function getPostBySlug(slug: string): BlogPost | null {
//   try {
//     const fullPath = path.join(contentDirectory, `${slug}.mdx`)
//     const fileContents = fs.readFileSync(fullPath, "utf8")
//     const { data, content } = matter(fileContents)

//     return createBlogPost(slug, data, content)
//   } catch {
//     return null
//   }
// }
