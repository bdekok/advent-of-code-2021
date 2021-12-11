import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { getDepthIncrease, getDepthIncreaseSlidingScale } from './getDepthIncrease.ts'

const dayOneFilePath = resolve("day1","input", "depths.txt");

async function getDayOneFileValues(): Promise<number[]> {
    const fileText = await Deno.readTextFile(dayOneFilePath);
    return fileText.split(/\n/).map(value => parseInt(value))
}

export async function getDayOneResults(): Promise<Result>  {
    const dayOneValues = await getDayOneFileValues()
    const exerciseOne = getDepthIncrease(dayOneValues)
    const exerciseTwo = getDepthIncreaseSlidingScale(dayOneValues)
    return  {exerciseOne, exerciseTwo} 
}
