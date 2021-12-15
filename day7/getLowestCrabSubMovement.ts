export function getLowestCrabSubMovement(array: number[]) {
    const lowestNumber = Math.min(...array)
    const highestNumber = Math.max(...array)

    let lowestSum = -1;
    for (let numberAttempt = lowestNumber; numberAttempt <= highestNumber; numberAttempt++) {
        const sum = array.reduce((acc, current) => acc + Math.abs(numberAttempt - current), 0)

        if(lowestSum === -1 || sum < lowestSum) {
            lowestSum = sum
        }
    }
    return lowestSum
}

export function getLowestCrabSubMovementRTFM(array: number[]) {
    const lowestNumber = Math.min(...array)
    const highestNumber = Math.max(...array)

    let lowestSum = -1;
    for (let numberAttempt = lowestNumber; numberAttempt <= highestNumber; numberAttempt++) {
        const sum = array.reduce((acc, current) => {
            return acc + calculateFuelConsumption(Math.abs(numberAttempt - current))
        }, 0)

        if(lowestSum === -1 || sum < lowestSum) {
            lowestSum = sum
        }
    }
    return lowestSum
}

export function calculateFuelConsumption(steps:number) {
    let prev = 0
    for (let index = 1; index <= steps; index++) {
        prev = prev + index;    
    }
    return prev
}


