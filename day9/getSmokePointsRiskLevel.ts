export function getSmokePointsRiskLevel(heightmap: number[][]): number {
    const lowPoints = getLowPoints(heightmap)
    return lowPoints.reduce((acc, value) => acc + (value + 1), 0)
}
    
function isLowerThanAdjacentValue(currentValue: number, adjacentValue: number): boolean {
    return currentValue < adjacentValue || adjacentValue === -1
}

function getLowPoints(heightmap: number[][]): number[] {
    const lowPoints:number[] = []
    
    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[y].length; x++) {      
            const currentValue = heightmap[y][x]
            const topValue = y > 0 ? heightmap[y - 1][x] : -1
            const bottomValue = y < heightmap.length -1 ? heightmap[y + 1][x] : -1
            const leftValue = x > 0 ? heightmap[y][x -1] : -1
            const rightValue = x < heightmap[y].length - 1 ? heightmap[y][x + 1] : -1

            if(
               isLowerThanAdjacentValue(currentValue, topValue) && 
               isLowerThanAdjacentValue(currentValue, leftValue) && 
               isLowerThanAdjacentValue(currentValue, rightValue) && 
               isLowerThanAdjacentValue(currentValue, bottomValue)
            ) 
            {
                lowPoints.push(currentValue)
            }
        }
    }
    return lowPoints
}