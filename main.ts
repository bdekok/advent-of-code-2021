import { getDayOneResults } from './day1/day1.ts'
import { getDayTwoResults } from './day2/day2.ts'
import { getDayThreeResults } from "./day3/day3.ts";
import { getDayFourResults } from "./day4/day4.ts";
import { getDayFiveResults } from "./day5/day5.ts";


export interface Result {
    exerciseOne: number | object,
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
        default:
            return console.log("We don't know the question, but 42 is the answer")
    }
}

getDayResults()
