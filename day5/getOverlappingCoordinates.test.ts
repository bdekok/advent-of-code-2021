import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getOverlappingCoordinatesCount } from "./getOverlappingCoordinates.ts";

const testData = [
    { from: [0,9], to: [5,9]},
    { from: [8,0], to: [0,8]},
    { from: [9,4], to: [3,4]},
    { from: [2,2], to: [2,1]},
    { from: [7,0], to: [7,4]},
    { from: [6,4], to: [2,0]},
    { from: [0,9], to: [2,9]},
    { from: [3,4], to: [1,4]},
    { from: [0,0], to: [8,8]},
    { from: [5,5], to: [8,2]},
]
Deno.test("Playing with an octopus is dangerous, picking the last winning chart is now the winning strategy.", () => {
    assertEquals(getOverlappingCoordinatesCount(testData), 5);
})