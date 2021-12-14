import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { getFishCount } from "./getFishCount.ts";

const testData = [3,4,3,1,2]
Deno.test("Count the amount of fishies", () => {
    const days = 18
    assertEquals(getFishCount(testData, days), 26);

    const daysTwo = 80
    assertEquals(getFishCount(testData, daysTwo), 5934);

    const daysThree = 256
    assertEquals(getFishCount(testData, daysThree), 26984457539)
})