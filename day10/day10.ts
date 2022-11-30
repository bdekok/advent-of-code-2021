import { resolve } from "../depts.ts"
import { Result } from "../main.ts";
import { getSyntaxScoreBreakingSigns, getSyntaxScoreUnclosedLines } from "./getSyntaxScore.ts";

const file = resolve("day10","input", "syntax.txt");

async function getFile(): Promise<string[]> {
    const fileText = await Deno.readTextFile(file);
    return fileText.split(/\n/)
}

export async function getDayTenResults(): Promise<Result> {
    const syntaxLines = await getFile()
    const exerciseOne = getSyntaxScoreBreakingSigns(syntaxLines)
    const exerciseTwo = getSyntaxScoreUnclosedLines(syntaxLines)

    return { exerciseOne, exerciseTwo }
}

