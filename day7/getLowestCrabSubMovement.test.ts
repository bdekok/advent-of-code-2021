import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { calculateFuelConsumption, getLowestCrabSubMovement, getLowestCrabSubMovementRTFM } from "./getLowestCrabSubMovement.ts";


const testData = [16,1,2,0,4,2,7,1,2,14]
Deno.test("Count the amount of overlapping thingies", () => {
    assertEquals(getLowestCrabSubMovement(testData), 37);
})


Deno.test("Count the amount of overlapping thingies", () => {
    assertEquals(getLowestCrabSubMovementRTFM(testData), 168);
})

Deno.test("Should have the proper fuel consumption", () => {
    assertEquals(calculateFuelConsumption(11), 66)
})