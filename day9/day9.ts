import { resolve } from "../depts.ts"
import { Result } from "../main.ts";
import { getSmokePointsRiskLevel, getSmokePointsRiskLevelZoned } from "./getSmokePointsRiskLevel.ts";

const file = resolve("day9","input", "input.txt");

async function getHeightMap(): Promise<number[][]> {
    const fileText = await Deno.readTextFile(file);
    return fileText.split(/\n/).map(string => string.split('').map(stringNumber => parseInt(stringNumber)))
}

export async function getDayNineResults(): Promise<Result> {
    const heightMap = await getHeightMap()
    const exerciseOne = getSmokePointsRiskLevel(heightMap)
    const exerciseTwo = getSmokePointsRiskLevelZoned(heightMap)

    return { exerciseOne, exerciseTwo }
}

