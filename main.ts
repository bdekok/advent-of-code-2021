import { getDayOneResults } from './day1/day1.ts'
import { getDayTwoResults } from './day2/day2.ts'
import { getDayThreeResults } from "./day3/day3.ts";

const [
    dayOneResults, 
    dayTwoResults,
    dayThreeResults
] = await Promise.all([
    getDayOneResults(),
    getDayTwoResults(),
    getDayThreeResults()
])

const results = {
    dayOneResults, 
    dayTwoResults,
    dayThreeResults
}

console.log(JSON.stringify(results, null, 2))