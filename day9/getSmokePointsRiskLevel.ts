export function getSmokePointsRiskLevel(heightmap: number[][]): number {
  const lowPoints = getLowPoints(heightmap);
  return lowPoints.reduce((acc, value) => acc + (value + 1), 0);
}

function getLowPoints(heightmap: number[][]): number[] {
  const lowPoints: number[] = [];

  for (let y = 0; y < heightmap.length; y++) {
    for (let x = 0; x < heightmap[y].length; x++) {
      const currentValue = heightmap[y][x];

      const isFirstRow = y === 0
      const isLastRow = y === (heightmap.length - 1)
      const isFirstColumn = x === 0
      const isLastColumn = x === (heightmap[y].length - 1)

      const isLowerTopValue = isFirstRow || currentValue < heightmap[y - 1][x] 
      const isLowerBottomValue = isLastRow || currentValue < heightmap[y + 1][x]
      const isLowerLeftValue = isFirstColumn || currentValue < heightmap[y][x - 1]
      const isLowerRightValue = isLastColumn || currentValue < heightmap[y][x + 1]

      if (
        isLowerTopValue &&
        isLowerBottomValue &&
        isLowerLeftValue &&
        isLowerRightValue
      ) {
        lowPoints.push(currentValue);
      }
    }
  }
  return lowPoints;
}

/* Exercise two; had to look up about flood fills and the code is very meh */

interface HeightZone {
  value: number;
  zone: number;
}

function floodFill(heightmap: Array<Array<HeightZone | number>>, x: number, y: number, zone = 0) {

  const newHeightmap = [...heightmap]
  const value = newHeightmap[y][x]

  if(typeof(newHeightmap[y][x]) !== "number") {
    return
  }

  const isFirstRow = y === 0
  const isLastRow = y === (heightmap.length - 1)
  const isFirstColumn = x === 0
  const isLastColumn = x === (heightmap[y].length - 1)

  const topValueIsZone = !isFirstRow && heightmap[y - 1][x] !== 9
  const bottomValueIsZone = !isLastRow && heightmap[y + 1][x] !== 9
  const leftValueIsZone = !isFirstColumn && heightmap[y][x - 1] !== 9
  const rightValueIsZone = !isLastColumn && heightmap[y][x + 1] !== 9

  newHeightmap[y][x] = {
    value: value as number,
    zone, 
  }

  if (topValueIsZone) {
    floodFill(newHeightmap, x, y - 1, zone);
  }
  if (bottomValueIsZone) {
    floodFill(newHeightmap, x, y + 1, zone);
  }
  if (leftValueIsZone) {
    floodFill(newHeightmap, x - 1, y, zone);
  }
  if (rightValueIsZone) {
    floodFill(newHeightmap, x + 1, y, zone);
  }
  return newHeightmap;
}

function getNextZoneStart(heightmap: Array<Array<number | HeightZone>>): {x:number, y:number} {
  let start: { x: number, y: number} | null = null
  
  nestedLoops:
  for (let y = 0; y < heightmap.length; y++) {
    for (let x = 0; x < heightmap[y].length; x++) {
      const value = heightmap[y][x]
      if(value !== 9 && typeof(value) === "number") {
        start = {x,y}
        break nestedLoops
      }
    }
  }
  return start!
}

function getMultiplicationThreeHeighestZones(heightmap: Array<Array<number | HeightZone>>): number {
  const zones: { [number: number]: number } = {}

  heightmap.flat().filter((value: number | HeightZone) => value !== 9).forEach((value) => {
    const currentZone = (value as HeightZone).zone
    zones[currentZone] = zones[currentZone] ? zones[currentZone] + 1 : 1
  }, {})

  return Object.values(zones).sort((a,b) => b - a).slice(0,3).reduce((acc, val) => acc * val, 1)
}

export function getSmokePointsRiskLevelZoned(heightmap: Array<Array<number | HeightZone>>, zoneIndex = 0): number {
  const hasNextZone = heightmap.some(row => row.some(value => value !== 9 && typeof(value) === "number"))

  if(hasNextZone) {
    const {x, y} = getNextZoneStart(heightmap)
    return getSmokePointsRiskLevelZoned(floodFill(heightmap, x, y, zoneIndex)!, zoneIndex + 1)
  }
  return getMultiplicationThreeHeighestZones(heightmap)
}
