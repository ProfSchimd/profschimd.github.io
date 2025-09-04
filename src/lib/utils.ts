import path from "path";

export function getLocalContentDirectory() {
    return path.join(process.cwd(), "content/")
}