function growFish(fishies: Map<number,number>, maximumDays: number, currentDay = 1): Map<number,number> {
    const newFishies = new Map()

    newFishies.set(8, fishies.get(0))
    newFishies.set(6, (fishies.get(0) || 0) + (fishies.get(7) || 0))
    newFishies.set(0, fishies.get(1))
    newFishies.set(1, fishies.get(2))
    newFishies.set(2, fishies.get(3))
    newFishies.set(3, fishies.get(4))
    newFishies.set(4, fishies.get(5))
    newFishies.set(5, fishies.get(6))
    newFishies.set(7, fishies.get(8))

    if(currentDay < maximumDays) {
        return growFish(newFishies, maximumDays, currentDay + 1)
    }
    return newFishies
}

function convertFishArrayToCountedMap(initalFishies:number[]):Map<number,number> {
    const fishMap = new Map()
    initalFishies.forEach(age => {
        fishMap.has(age) ? fishMap.set(age, fishMap.get(age) + 1) : fishMap.set(age, 1)
    })
    return fishMap
}

export function getFishCount(initalFishies:number[], days:number):number {
    let total = 0
    const initialFishMap = convertFishArrayToCountedMap(initalFishies)

    growFish(initialFishMap, days).forEach((value: number) => {
        total = total + value
    })
    return total
}