import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getOverlappingCoordinates, getOverlappingCoordinatesCount } from "./getOverlappingCoordinates.ts";

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
Deno.test("Count the amount of overlapping thingies", () => {
    assertEquals(getOverlappingCoordinatesCount(testData), 5);
})

Deno.test('Should translate to this diagram', () => {
    const coordinates = getOverlappingCoordinates(testData, true)
    
    const expected = 
`1.1....11.
.111...2..
..2.1.111.
...1.2.2..
.112313211
...1.2....
..1...1...
.1.....1..
1.......1.
222111....
`

    let actual = ''
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            actual += coordinates.get(`${x},${y}`) || '.'            
        }
        actual+= '\n'
    }
    assertEquals(actual, expected);
})

Deno.test("Count the amount of overlapping thingies diagnonal.", () => {
    assertEquals(getOverlappingCoordinatesCount(testData, true), 12);
})

