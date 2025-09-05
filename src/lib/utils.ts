import path from "path";
import fs from "fs";
import matter from "gray-matter";

export function getLocalContentDirectory() {
    return path.join(process.cwd(), "content/")
}

export function parseLocalMdx(mdxPath: string) {
    mdxPath = path.join(getLocalContentDirectory(), mdxPath)
    try {
        const fileContents = fs.readFileSync(mdxPath);
        const { data, content } = matter(fileContents);
        return {
            frontMatter: data,
            content: content,
        }
    } catch {
        return null;
    }
}

export async function parseRemoteMarkdown(mdUrl: string) {
    try {
        const response = await fetch(mdUrl);
        if (!response.ok) {
            return null;
        }
        const rawContent = await response.text();
        const {data, content} = matter(rawContent);
        return {
            frontMatter: data,
            content: content,
        }
    } catch {
        return null;
    }
}
