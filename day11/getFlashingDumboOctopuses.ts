export function getDayCountFlashingOctopuses(
  grid: number[][],
  returnAfterXDays: number,
  days = 0,
  flashCount = 0,
): number {
  if (days === returnAfterXDays) {
    return flashCount;
  }

  const result = getFlashingDumboOctopuses(grid);
  const newFlashes = result.flat().reduce(
    (acc, cur) => cur === 0 ? acc + 1 : acc,
    0,
  );
  days = days + 1;
  flashCount = flashCount + newFlashes;

  return getDayCountFlashingOctopuses(
    result,
    returnAfterXDays,
    days,
    flashCount,
  );
}

function getFlashGrid(x: number, y: number, maxY: number, maxX: number) {
  return [{
    x: x - 1,
    y: y - 1,
  }, {
    x,
    y: y - 1,
  }, {
    x: x + 1,
    y: y - 1,
  }, {
    x: x + 1,
    y,
  }, {
    x: x + 1,
    y: y + 1,
  }, {
    x,
    y: y + 1,
  }, {
    x: x - 1,
    y: y + 1,
  }, {
    x: x - 1,
    y,
  }]
    .filter(({ x, y }) => {
      return x >= 0 && y >= 0 && x < maxX && y < maxY;
    });
}

function flash(grid: number[][], x: number, y: number) {
  const value = grid[y][x];

  if (value < 9 && value !== -1) {
    grid[y][x] = value + 1;
  }

  if (value === 9) {
    grid[y][x] = -1;
    const maxY = grid.length;
    const maxX = grid[y].length;
    const changeCoordinates = getFlashGrid(x, y, maxX, maxY);
    for (const { x, y } of changeCoordinates) {
      flash(grid, x, y);
    }
  }
  return grid;
}

export function getFlashingDumboOctopuses(grid: number[][]) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      flash(grid, x, y);
    }
  }
  return grid.map((row) => row.map((number) => number === -1 ? 0 : number));
}
