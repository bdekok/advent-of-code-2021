import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { getFishCount } from "./getFishCount.ts";

const daySixFish = resolve("day6","input", "fish.txt");

async function getInitialFishFromFile(): Promise<number[]> {
    const fileText = await Deno.readTextFile(daySixFish);
    return fileText.split(',').map(stringNumber => parseInt(stringNumber))
}

export async function getDaySixResults(): Promise<Result> {
    const fish = await getInitialFishFromFile()
    const exerciseOne = getFishCount(fish, 80)
    const exerciseTwo = getFishCount(fish, 256)
    
    return {exerciseOne, exerciseTwo}
}

