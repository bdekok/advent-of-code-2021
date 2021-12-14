interface MappedCoordinate {
    x: number,
    y: number,
    count: number
}

export interface Coordinate {
    from: number[]; 
    to: number[];
}


export function getOverlappingCoordinates(coordinates:Coordinate[], includeDiagonal: boolean): Map<string,number> {
    const coordinatesCount = new Map<string, number>()

    for (const { from, to } of coordinates) {
        const [fromX, fromY] = from
        const [toX, toY] = to

        const equalXaxis = fromX === toX
        const equalYaxis = fromY === toY
        const isHorizontalLine = equalYaxis && !equalXaxis
        const isVerticalLine = !equalYaxis && equalXaxis
        const isDiagnalLine = isDiagnonal(fromX, toX, fromY, toY) && includeDiagonal

        if(isHorizontalLine) {
            const lowestX = fromX < toX ? fromX : toX
            const highestX = fromX > toX ? fromX : toX

            for (let x = lowestX; x <= highestX; x++) {
                const key = `${x},${fromY}`
                const count = (coordinatesCount.get(key) || 0) + 1
                coordinatesCount.set(key, count)  
            }
        } else if(isVerticalLine) {
            const lowestY = fromY < toY ? fromY : toY
            const highestY = fromY > toY ? fromY : toY

            for (let y = lowestY; y <= highestY; y++) {
                const key = `${fromX},${y}`
                const count = (coordinatesCount.get(key) || 0) + 1
                coordinatesCount.set(key, count)
            }
        } else if(isDiagnalLine) {
            const movementY = toY - fromY
            const movementX = toX - fromX

            for (let index = 0; index <= Math.abs(movementY); index++) {
                const x = movementX > 0 ? fromX + index : fromX - index
                const y = movementY > 0 ? fromY + index : fromY - index
                const key = `${x},${y}`
                const count = (coordinatesCount.get(key) || 0) + 1
                coordinatesCount.set(key, count)
            }
        }
    }
    return coordinatesCount
}

export function getOverlappingCoordinatesCount(coordinates:Coordinate[], includeDiagonal = false): number {
    let count = 0;
    getOverlappingCoordinates(coordinates, includeDiagonal).forEach(value => {
        if(value > 1) {
            count = count + 1
        }
    })
    return count
}

const isDiagnonal = (fromX: number, toX: number, fromY:number, toY:number) => {
    return Math.abs(toX - fromX) === Math.abs(toY - fromY)
}