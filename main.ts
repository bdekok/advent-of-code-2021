import { getDayOneResults } from './day1/day1.ts'
import { getDayTwoResults } from './day2/day2.ts'

const [
    dayOneResults, 
    dayTwoResults
] = await Promise.all([
    getDayOneResults(),
    getDayTwoResults()
])

const results = {dayOneResults, dayTwoResults}

console.log(JSON.stringify(results, null, 2))