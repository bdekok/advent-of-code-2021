import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  getDepthIncrease,
  getDepthIncreaseSlidingScale,
} from "./getDepthIncrease.ts";

const testData = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ];
Deno.test("Exercise one on day one counts how often the depth increased of our elf submarine", () => {
  assertEquals(getDepthIncrease(testData), 7);
});

Deno.test("Exercise two on day one counts how often the depth increased of our elf submarine with a sliding scale of three", () => {
  assertEquals(getDepthIncreaseSlidingScale(testData), 5);
});
