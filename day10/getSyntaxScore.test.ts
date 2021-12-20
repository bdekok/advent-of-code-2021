import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getSyntaxScore } from "./getSyntaxScore.ts";

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

Deno.test("Gives the correct score", () => {
  assertEquals(getSyntaxScore(testData), 26397)
})
