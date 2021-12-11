const directions = ['up', 'down', 'forward'] as const;
export type Direction = typeof directions[number];

export interface Movement {
    direction: Direction,
    amount: number
}

export interface SubmarineLocation {
    horizontal: number,
    depth: number
}

export function mapMovementStringsToMovements(movementStrings: string[]): Movement[] {
    return movementStrings.map(movementString => {
        const movement = movementString.split(' ')
        const direction = movement[0] as Direction
        const amount = parseInt(movement[1])

        if(!directions.includes(direction)) {
            throw new Error('Oops the elfs have discovered a direction that doesn\'t exist')
        }
        return {direction, amount}
    })
}

export function getSubmarineLocation(movements: Movement[]): SubmarineLocation {
    let depth = 0;
    let horizontal = 0;

    for (const movement of movements) {
        switch(movement.direction) {
            case "up": 
                depth = depth - movement.amount
                break;
            case "down":
                depth = depth + movement.amount
                break;
            case "forward":
                horizontal = horizontal + movement.amount
                break;
        }
    }
    return {depth, horizontal}
}

export function getSubmarineLocationWithAim(movements: Movement[]): SubmarineLocation {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;

    for (const movement of movements) {
        switch(movement.direction) {
            case "up": 
                aim = aim - movement.amount
                break;
            case "down":
                aim = aim + movement.amount
                break;
            case "forward":
                horizontal = horizontal + movement.amount
                depth = depth + (aim * movement.amount)
                break;
        }
    }
    return {depth, horizontal}
}
    