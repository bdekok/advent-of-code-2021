import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getSubmarineLocation, getSubmarineLocationWithAim, mapMovementStringsToMovements, Movement, SubmarineLocation } from "./getSubmarineLocation.ts";

const expectedMovements: Movement[] = [{
    direction: "forward",
    amount: 5
}, {
    direction: "down",
    amount: 5
}, {
    direction: "forward",
    amount: 8
}, {
    direction: "up",
    amount: 3
}, {
    direction: "down",
    amount: 8
}, {
    direction: "forward",
    amount: 2
}] 

Deno.test("We can map string descriptions of movements to the movements model", () => {
    const testData = [
        "forward 5",
        "down 5",
        "forward 8",
        "up 3",
        "down 8",
        "forward 2"
    ]
    const actual = mapMovementStringsToMovements(testData)
    assertEquals(actual, expectedMovements);
  });
  
  Deno.test("We can get the location of the submarine based on the movements", () => {
    const expected: SubmarineLocation = {
        horizontal: 15,
        depth: 10
    }
    assertEquals(getSubmarineLocation(expectedMovements), expected);
  });
  
  Deno.test("We can get another location as we rtfm and found out we have to aim our elf submarine", () => {
    const expected: SubmarineLocation = {
        horizontal: 15,
        depth: 60
    }
    assertEquals(getSubmarineLocationWithAim(expectedMovements), expected);
  })

