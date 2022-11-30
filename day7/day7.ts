import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getLowestCrabSubMovement, getLowestCrabSubMovementRTFM } from "./getLowestCrabSubMovement.ts";

const daySevenCrabs = resolve("day7","input", "crabsubs.txt");

async function getCrabPositionsFromFile(): Promise<number[]> {
    const fileText = await Deno.readTextFile(daySevenCrabs);
    return fileText.split(',').map(stringNumber => parseInt(stringNumber))
}

export async function getDaySevenResults(): Promise<Result> {
    const crabsubs = await getCrabPositionsFromFile()
    const exerciseOne = getLowestCrabSubMovement(crabsubs)
    const exerciseTwo = getLowestCrabSubMovementRTFM(crabsubs)

    return {exerciseOne, exerciseTwo}
}

