import { resolve } from "https://deno.land/std@0.117.0/path/mod.ts";
import { Result } from "../main.ts";
import { Coordinate, getOverlappingCoordinatesCount } from "./getOverlappingCoordinates.ts";

const dayFiveCoordinates = resolve("day5","input", "coordinates.txt");


async function getCoordinatesFromFile(): Promise<Coordinate[]> {
    const fileText = await Deno.readTextFile(dayFiveCoordinates);
    const rows =  fileText.split(/\n/).map(row => row.split('->'))

    const coordinates: Coordinate[] = []
    for (const row of rows) {
        const trimSplitAndParseNumber = (value:string):number[] => {
            return value.trim().split(',').map(value => parseInt(value))
        }
        const from = trimSplitAndParseNumber(row[0])
        const to = trimSplitAndParseNumber(row[1])
        coordinates.push({
            from, to
        })
    }
    return coordinates
}




export async function getDayFiveResults(): Promise<Result> {
    const coordinates = await getCoordinatesFromFile()
    const exerciseOne = getOverlappingCoordinatesCount(coordinates)
    const exerciseTwo = getOverlappingCoordinatesCount(coordinates, true)

    return {exerciseOne, exerciseTwo}
}

