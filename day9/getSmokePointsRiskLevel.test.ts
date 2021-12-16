import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getSmokePointsRiskLevel, getSmokePointsRiskLevelZoned } from "./getSmokePointsRiskLevel.ts";

const testData = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
];

Deno.test("Smoke on water", () => {
  assertEquals(getSmokePointsRiskLevel(testData), 15)
})
Deno.test("Flood fill the smoke", () => {
  assertEquals(getSmokePointsRiskLevelZoned(testData), 1134)
})
