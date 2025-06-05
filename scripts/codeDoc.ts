import { getCodeMD, getESMPath, saveMD, ignoredPatterns } from "codools";

// Resolve project root (one level up from this script)
const projectRoot = getESMPath(import.meta, "..");

// Generate Markdown and write to docs/code.md
const markdown = getCodeMD(projectRoot, {
    ignorePatterns: [...ignoredPatterns, ".next"]
});
saveMD(getESMPath(import.meta, "../docs/code.md"), markdown);
