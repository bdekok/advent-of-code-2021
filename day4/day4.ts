import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getFirstWinningChartInformation, getLastWinningChartInformation } from "./getBingo.ts";

const dayFourBingoChartFilePath = resolve("day4","input", "bingoCharts.txt");
const dayFourDrawnNumbersFilePath = resolve("day4","input", "drawnNumbers.txt");

async function getBingoChartsFromFile(): Promise<number[][][]> {
    const fileText = await Deno.readTextFile(dayFourBingoChartFilePath);
    return fileText.split(/\n\n/)
            .map(chart => chart.split(/\n/)
                .map(row => 
                    row.trim()
                        .split(/\s+/)
                        .map(stringNumber => parseInt(stringNumber))
                    )
                )
}

async function getDrawnNumbersFromFile(): Promise<number[]> {
    const fileText = await Deno.readTextFile(dayFourDrawnNumbersFilePath);
    return fileText.split(',').map(stringNumber => parseInt(stringNumber))
}

export async function getDayFourResults(): Promise<Result> {
    const bingoChartValues = await getBingoChartsFromFile()
    const drawnNumbers = await getDrawnNumbersFromFile()
    const exerciseOne = getFirstWinningChartInformation(drawnNumbers, bingoChartValues).score
    const exerciseTwo = getLastWinningChartInformation(drawnNumbers, bingoChartValues).score

    return {exerciseOne, exerciseTwo}
}

