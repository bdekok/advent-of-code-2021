import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { getSyntaxScore } from "./getSyntaxScore.ts";

const file = resolve("day10","input", "syntax.txt");

async function getFile(): Promise<string[]> {
    const fileText = await Deno.readTextFile(file);
    return fileText.split(/\n/)
}

export async function getDayTenResults(): Promise<Result> {
    const syntaxLines = await getFile()
    const exerciseOne = getSyntaxScore(syntaxLines)

    return { exerciseOne }
}

