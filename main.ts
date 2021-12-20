import { getDayOneResults } from './day1/day1.ts'
import { getDayTenResults } from "./day10/day10.ts";
import { getDayTwoResults } from './day2/day2.ts'
import { getDayThreeResults } from "./day3/day3.ts";
import { getDayFourResults } from "./day4/day4.ts";
import { getDayFiveResults } from "./day5/day5.ts";
import { getDaySixResults } from "./day6/day6.ts";
import { getDaySevenResults } from "./day7/day7.ts";
import { getDayNineResults } from "./day9/day9.ts";


export interface Result {
    exerciseOne: number,
    exerciseTwo?: number
}
function printResults(result: Result) {
    console.log(JSON.stringify(result, null, 2))
}

async function getDayResults() {
    const day = prompt("Please put in the day of the month you want the answer to:");
    switch(day) { 
        case "1": 
            return printResults(await getDayOneResults())
        case "2":
            return printResults(await getDayTwoResults())
        case "3":
            return printResults(await getDayThreeResults())
        case "4":
            return printResults(await getDayFourResults())
        case "5":
            return printResults(await getDayFiveResults())
        case "6":
            return printResults(await getDaySixResults())
        case "7":
            return printResults(await getDaySevenResults())
        case "9":
            return printResults(await getDayNineResults())
        case "10":
            return printResults(await getDayTenResults())
        default:
            return console.log("We don't know the question, but 42 is the answer")
    }
}

getDayResults()
