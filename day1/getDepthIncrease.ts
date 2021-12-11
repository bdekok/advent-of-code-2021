export function getDepthIncrease(depths: number[]): number {
    return depths.reduce((accumulator, currentDepth, index, array) => {
        if(index === 0) return 0

        const previousDepth = array[index - 1]
        if(currentDepth > previousDepth) {
            return accumulator + 1
        }
        return accumulator
    }, 0)
}

export function getDepthIncreaseSlidingScale(values: number[]): number {
    const sum = (acc: number, current: number) => acc + current

    return values.reduce((acc, _, index, array) => {
        if(index < 3) return 0

        const previousThree = array.slice(index - 3, index).reduce(sum, 0)
        const currentThree = array.slice(index - 2, index + 1).reduce(sum, 0)
        if(currentThree > previousThree) {
            return acc + 1
        }
        return acc
    })
}