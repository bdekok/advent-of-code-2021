interface MappedCoordinate {
    x: number,
    y: number,
    count: number
}

export interface Coordinate {
    from: number[]; 
    to: number[];
}

function getOverlappingCoordinates(coordinates:Coordinate[]): MappedCoordinate[] {
    const coordinatesCount: MappedCoordinate[] = []

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
                const existingCoordinate = coordinatesCount.find(coordinate => coordinate.x === x && coordinate.y === fromY)
                if(existingCoordinate) {
                    existingCoordinate.count = existingCoordinate.count + 1
                } else {
                    coordinatesCount.push({
                        x,
                        y: fromY,
                        count: 1 
                    })  
                }
            }
        } else if(isVerticalLine) {
            const lowestY = fromY < toY ? fromY : toY
            const highestY = fromY > toY ? fromY : toY

            for (let y = lowestY; y <= highestY; y++) {
                const existingCoordinate = coordinatesCount.find(coordinate => coordinate.x === fromX && coordinate.y === y)
                if(existingCoordinate) {
                    existingCoordinate.count = existingCoordinate.count +1 
                } else {
                    coordinatesCount.push({
                        x: fromX,
                        y,
                        count: 1 
                    })  
                }
            }
        }
    }
    return coordinatesCount.filter(coordinate => coordinate.count > 1)
}

export function getOverlappingCoordinatesCount(coordinates:Coordinate[]): number {
    return getOverlappingCoordinates(coordinates).length
}