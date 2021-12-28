import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  getFlashingDumboOctopuses,
  getDayCountFlashingOctopuses,
getDayWhenAllOctopusesFlash,
} from "./getFlashingDumboOctopuses.ts";

Deno.test("When an octopus flashes all around them also flash", () => {
  const testData = [
    [1, 1, 1, 1, 1],
    [1, 9, 9, 9, 1],
    [1, 9, 1, 9, 1],
    [1, 9, 9, 9, 1],
    [1, 1, 1, 1, 1],
  ];
  const dayOneExpected = [
    [3, 4, 5, 4, 3],
    [4, 0, 0, 0, 4],
    [5, 0, 0, 0, 5],
    [4, 0, 0, 0, 4],
    [3, 4, 5, 4, 3],
  ];
  const dayTwoExpected = [
    [4, 5, 6, 5, 4],
    [5, 1, 1, 1, 5],
    [6, 1, 1, 1, 6],
    [5, 1, 1, 1, 5],
    [4, 5, 6, 5, 4],
  ];

  const dayThreeExpected = [
    [5, 6, 7, 6, 5],
    [6, 2, 2, 2, 6],
    [7, 2, 2, 2, 7],
    [6, 2, 2, 2, 6],
    [5, 6, 7, 6, 5],
  ];

  const dayOneResult = getFlashingDumboOctopuses(testData);
  assertEquals(JSON.stringify(dayOneResult), JSON.stringify(dayOneExpected));

  const dayTwoResult = getFlashingDumboOctopuses(dayOneResult);
  assertEquals(JSON.stringify(dayTwoResult), JSON.stringify(dayTwoExpected));

  const dayThreeResult = getFlashingDumboOctopuses(dayTwoResult);
  assertEquals(
    JSON.stringify(dayThreeResult),
    JSON.stringify(dayThreeExpected),
  );
});

Deno.test("The grid of octopusses can be larger", () => {
  const start = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
  ];
  const dayOneExpected = [
    [6, 5, 9, 4, 2, 5, 4, 3, 3, 4],
    [3, 8, 5, 6, 9, 6, 5, 8, 2, 2],
    [6, 3, 7, 5, 6, 6, 7, 2, 8, 4],
    [7, 2, 5, 2, 4, 4, 7, 2, 5, 7],
    [7, 4, 6, 8, 4, 9, 6, 5, 8, 9],
    [5, 2, 7, 8, 6, 3, 5, 7, 5, 6],
    [3, 2, 8, 7, 9, 5, 2, 8, 3, 2],
    [7, 9, 9, 3, 9, 9, 2, 2, 4, 5],
    [5, 9, 5, 7, 9, 5, 9, 6, 6, 5],
    [6, 3, 9, 4, 8, 6, 2, 6, 3, 7],
  ];
  const dayTwoExpected = [
    [8, 8, 0, 7, 4, 7, 6, 5, 5, 5],
    [5, 0, 8, 9, 0, 8, 7, 0, 5, 4],
    [8, 5, 9, 7, 8, 8, 9, 6, 0, 8],
    [8, 4, 8, 5, 7, 6, 9, 6, 0, 0],
    [8, 7, 0, 0, 9, 0, 8, 8, 0, 0],
    [6, 6, 0, 0, 0, 8, 8, 9, 8, 9],
    [6, 8, 0, 0, 0, 0, 5, 9, 4, 3],
    [0, 0, 0, 0, 0, 0, 7, 4, 5, 6],
    [9, 0, 0, 0, 0, 0, 0, 8, 7, 6],
    [8, 7, 0, 0, 0, 0, 6, 8, 4, 8],
  ];

  const dayThreeExpected = [
    [0, 0, 5, 0, 9, 0, 0, 8, 6, 6],
    [8, 5, 0, 0, 8, 0, 0, 5, 7, 5],
    [9, 9, 0, 0, 0, 0, 0, 0, 3, 9],
    [9, 7, 0, 0, 0, 0, 0, 0, 4, 1],
    [9, 9, 3, 5, 0, 8, 0, 0, 6, 3],
    [7, 7, 1, 2, 3, 0, 0, 0, 0, 0],
    [7, 9, 1, 1, 2, 5, 0, 0, 0, 9],
    [2, 2, 1, 1, 1, 3, 0, 0, 0, 0],
    [0, 4, 2, 1, 1, 2, 5, 0, 0, 0],
    [0, 0, 2, 1, 1, 1, 9, 0, 0, 0],
  ];
  const dayOneResult = getFlashingDumboOctopuses(start);
  assertEquals(JSON.stringify(dayOneResult), JSON.stringify(dayOneExpected));

  const dayTwoResult = getFlashingDumboOctopuses(dayOneResult);
  assertEquals(JSON.stringify(dayTwoResult), JSON.stringify(dayTwoExpected));

  const dayThreeResult = getFlashingDumboOctopuses(dayTwoResult);
  assertEquals(
    JSON.stringify(dayThreeResult),
    JSON.stringify(dayThreeExpected),
  );
});

Deno.test("Counts the right amount of octopusses after 1 day", () => {
  const test = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
  ];

  const actual = getDayCountFlashingOctopuses(test, 100);
  assertEquals(actual, 1656);
});

Deno.test("Can get the day when all the ocotopusses flash", () => {
  const testData = [
    [5, 4, 8, 3, 1, 4, 3, 2, 2, 3],
    [2, 7, 4, 5, 8, 5, 4, 7, 1, 1],
    [5, 2, 6, 4, 5, 5, 6, 1, 7, 3],
    [6, 1, 4, 1, 3, 3, 6, 1, 4, 6],
    [6, 3, 5, 7, 3, 8, 5, 4, 7, 8],
    [4, 1, 6, 7, 5, 2, 4, 6, 4, 5],
    [2, 1, 7, 6, 8, 4, 1, 7, 2, 1],
    [6, 8, 8, 2, 8, 8, 1, 1, 3, 4],
    [4, 8, 4, 6, 8, 4, 8, 5, 5, 4],
    [5, 2, 8, 3, 7, 5, 1, 5, 2, 6],
  ];

  const actual = getDayWhenAllOctopusesFlash(testData);
  assertEquals(actual, 195);
});
