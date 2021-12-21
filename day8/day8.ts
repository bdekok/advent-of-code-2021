import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { getOutput, getSimpleOutputDigitsCount } from "./getSegmentDisplay.ts";

const file = resolve("day8","input", "faultySegmentDisplay.txt");

async function getFile(): Promise<string[]> {
    const fileText = await Deno.readTextFile(file);
    return fileText.split(/\n/)
}

export async function getDayEightResults(): Promise<Result> {
    const syntaxLines = await getFile()
    const exerciseOne = getSimpleOutputDigitsCount(syntaxLines)
    const exerciseTwo = getOutput(syntaxLines)

    return { exerciseOne, exerciseTwo }
}

