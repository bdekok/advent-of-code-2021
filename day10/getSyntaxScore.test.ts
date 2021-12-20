import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getSyntaxScoreBreakingSigns, getSyntaxScoreUnclosedLines } from "./getSyntaxScore.ts";

const testData = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]"
]

Deno.test("Gives the correct score for breaking signs", () => {
    assertEquals(getSyntaxScoreBreakingSigns(testData), 26397)
})
Deno.test("Gives the correct score for breaking signs", () => {
    assertEquals(getSyntaxScoreUnclosedLines(testData), 288957)
})
  