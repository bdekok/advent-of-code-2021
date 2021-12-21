import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getOutput, getOutputPerLine, getSimpleOutputDigitsCount } from "./getSegmentDisplay.ts";

const testData = [
    `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
    fdgacbe cefdb cefbgd gcbe`,
    `edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
    fcgedb cgb dgebacf gc`,
    `fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
    cg cg fdcagb cbg`,
    `fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
    efabcd cedba gadfec cb`,
    `aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
    gecf egdcabf bgf bfgea`,
    `fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
    gebdcfa ecba ca fadegcb`,
    `dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
    cefg dcbef fcge gbcadfe`,
    `bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
    ed bcgafe cdgba cbgef`,
    `egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
    gbdfcae bgc cg cgb`,
    `gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
    fgae cfgab fg bagce`,
]

Deno.test("Count the amount of simple output numbers", () => {
    assertEquals(getSimpleOutputDigitsCount(testData), 26);
})

Deno.test("Get the right output per line", () => {
    assertEquals(getOutputPerLine(testData[0]), 8394);
    assertEquals(getOutputPerLine(testData[1]), 9781);
    assertEquals(getOutputPerLine(testData[2]), 1197);
    assertEquals(getOutputPerLine(testData[3]), 9361);
    assertEquals(getOutputPerLine(testData[4]), 4873);
    assertEquals(getOutputPerLine(testData[5]), 8418);
    assertEquals(getOutputPerLine(testData[6]), 4548);
    assertEquals(getOutputPerLine(testData[7]), 1625);
    assertEquals(getOutputPerLine(testData[8]), 8717);
    assertEquals(getOutputPerLine(testData[9]), 4315);
})

Deno.test("Get the right output total by having the sum of lines", () => {
    assertEquals(getOutput(testData), 61229);
})