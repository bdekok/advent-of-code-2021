import { getSubmarineLocation, getSubmarineLocationWithAim, mapMovementStringsToMovements, Movement } from "./getSubmarineLocation.ts";
import { Result } from "../main.ts";
import { resolve } from "../depts.ts";

const dayTwoFilePath = resolve("day2","input", "movements.txt");

async function getDayTwoFileValues(): Promise<string[]> {
    const fileText = await Deno.readTextFile(dayTwoFilePath);
    return fileText.split(/\n/)
}

function getExerciseOneResults(movements: Movement[]) {
    const {horizontal, depth} = getSubmarineLocation(movements)
    return horizontal * depth
}
function getExerciseTwoResults(movements: Movement[]) {
    const {horizontal, depth} = getSubmarineLocationWithAim(movements)
    return horizontal * depth
}

export async function getDayTwoResults(): Promise<Result>  {
    const dayTwoValues = await getDayTwoFileValues()
    const movements = mapMovementStringsToMovements(dayTwoValues)
    const exerciseOne = getExerciseOneResults(movements)
    const exerciseTwo = getExerciseTwoResults(movements)
    return {exerciseOne, exerciseTwo}
}

