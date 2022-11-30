import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getLiveSupportRate, getPowerRate } from "./getBinaryDiagnostics.ts";

const dayThreeFilePath = resolve("day3","input", "diagnostics.txt");

async function getDayThreeFileValues(): Promise<string[]> {
    const fileText = await Deno.readTextFile(dayThreeFilePath);
    return fileText.split(/\n/)
}

export async function getDayThreeResults(): Promise<Result> {
    const dayThreeValues = await getDayThreeFileValues()
    const exerciseOne = getPowerRate(dayThreeValues)
    const exerciseTwo = getLiveSupportRate(dayThreeValues)
    return {exerciseOne, exerciseTwo}
}

