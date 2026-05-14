import fs from "fs";
import path from "path";

import { docsDir } from "./constants";

function readSortedMdFiles(langDir: string, subDir: string) {
    const absPath = path.resolve(docsDir, langDir, subDir);
    if (!fs.existsSync(absPath)) return [];

    return fs
        .readdirSync(absPath)
        .filter((fileName) => fileName.endsWith(".md"))
        .sort()
        .map((fileName) => {
            const fullPath = path.join(absPath, fileName);
            const content = fs.readFileSync(fullPath, "utf-8");

            const match = content.match(/^#\s+(.*)/m);
            const title = match ? match[1].trim() : fileName;

            const idMatch = fileName.match(/^(\d+\.\d+)-/);
            const id = idMatch ? idMatch[1] : fileName.replace(".md", "");

            return { title, id, fileName };
        });
}

export function getSidebar(langDir: string, subDir: string) {
    return readSortedMdFiles(langDir, subDir).map(({ title, id }) => ({
        text: title,
        link: `/${langDir}/${subDir}/${id}`,
    }));
}

export function getNavItems(langDir: string, subDir: string) {
    return readSortedMdFiles(langDir, subDir).map(({ title, id }) => ({
        text: title.replace(/<i[^>]*><\/i>\s*/g, ""),
        link: `/${langDir}/${subDir}/${id}`,
    }));
}

export function getNoticeItems() {
    const absPath = path.resolve(docsDir, "zh_cn", "notice");
    if (!fs.existsSync(absPath)) return [];
    return fs
        .readdirSync(absPath)
        .filter((fileName) => fileName.endsWith(".md"))
        .sort()
        .map((fileName) => {
            const rawName = fileName.replace(".md", "");
            const text = rawName.replace(/^\d+\.\d+-/, "");
            return {
                text,
                link: `#maaly-popup-${encodeURIComponent(rawName)}`,
            };
        });
}
