import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { getPowerRate } from "./getBinaryDiagnostics.ts";

const dayThreeFilePath = resolve("day3","input", "diagnostics.txt");

async function getDayThreeFileValues(): Promise<string[]> {
    const fileText = await Deno.readTextFile(dayThreeFilePath);
    return fileText.split(/\n/)
}

export async function getDayThreeResults() {
    const dayThreeValues = await getDayThreeFileValues()
    const exerciseOne = getPowerRate(dayThreeValues)
    return {exerciseOne}
}

