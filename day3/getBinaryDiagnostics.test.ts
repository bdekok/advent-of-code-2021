import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getEpsilonRate, getGammaRate } from "./getBinaryDiagnostics.ts";

const testData = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
]

Deno.test("We can get diagnostic gamma rate by looking at the most common of the first bits", () => {
    assertEquals(getGammaRate(testData), 22);
})
Deno.test("We can get diagnostic epsilon rate by looking at the least common of the first bits", () => {
    assertEquals(getEpsilonRate(testData), 9);
})