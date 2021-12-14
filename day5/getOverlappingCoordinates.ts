interface MappedCoordinate {
    x: number,
    y: number,
    count: number
}

export interface Coordinate {
    from: number[]; 
    to: number[];
}

function getOverlappingCoordinates(coordinates:Coordinate[]): Map<string,number> {
    const coordinatesCount = new Map<string, number>()

    for (const coordinate of coordinates) {
        const [fromX, fromY] = coordinate.from
        const [toX, toY] = coordinate.to

        const equalXaxis = fromX === toX
        const equalYaxis = fromY === toY
        const isHorizontalLine = equalYaxis && !equalXaxis
        const isVerticalLine = !equalYaxis && equalXaxis

        if(isHorizontalLine) {
            const lowestX = fromX < toX ? fromX : toX
            const highestX = fromX > toX ? fromX : toX
            for (let x = lowestX; x <= highestX; x++) {
                const existingCoordinate = coordinatesCount.has(`${x},${fromY}`)
                if(existingCoordinate) {
                    coordinatesCount.set(`${x},${fromY}`, coordinatesCount.get(`${x},${fromY}`)! + 1)
                } else {
                    coordinatesCount.set(`${x},${fromY}`, 1)  
                }
            }
        } else if(isVerticalLine) {
            const lowestY = fromY < toY ? fromY : toY
            const highestY = fromY > toY ? fromY : toY

            for (let y = lowestY; y <= highestY; y++) {
                const existingCoordinate = coordinatesCount.has(`${fromX},${y}`)
                if(existingCoordinate) {
                    coordinatesCount.set(`${fromX},${y}`, coordinatesCount.get(`${fromX},${y}`)! + 1)
                } else {
                    coordinatesCount.set(`${fromX},${y}`, 1)  
                }
            }
        }
    }
    return coordinatesCount

}

export function getOverlappingCoordinatesCount(coordinates:Coordinate[]): number {
    let count = 0;
    getOverlappingCoordinates(coordinates).forEach(value => {
        if(value > 1) {
            count = count + 1
        }
    })
    return count
}