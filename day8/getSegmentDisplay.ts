type DisplayNumber =  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type DisplayNumberValues = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

const segments: {[key in DisplayNumber]: DisplayNumberValues[]} = {
    0: ['a','b','c','e','f','g'],
    1: ['c','f'],
    2: ['a','c','d','e','g'],
    3: ['a','c','d','f','g'],
    4: ['b','c','d','f'],
    5: ['a','b','d','f','g'],
    6: ['a','b','d','e','f','g'],
    7: ['a','c','f'],
    8: ['a','b','c','d','e','f','g'],
    9: ['a','b','c','d','f','g'],
}
const knownNumbers:DisplayNumber[]  = [1, 4, 7, 8]

export function getSimpleOutputDigitsCount(lines: string[]) {
    return lines.reduce((acc, line) => acc + getSimpleDigitCountByLine(line), 0)
}
function hasCorrectLength(line: string, digit: DisplayNumber): boolean {
    return line.length === segments[digit].length
}

function getSimpleDigitCountByLine(line: string): number {
    return line.split('|')[1]
                .trim()
                .split(' ')
                .reduce((acc: number, value: string) => {
                    const isKnownNumber = knownNumbers.some(number => hasCorrectLength(value, number))
                    if(isKnownNumber) {
                        return acc + 1
                    }
                    return acc
                }, 0)
}
export function getOutput(lines: string[]) {
    return lines.reduce((acc, line) => acc + getOutputPerLine(line), 0)
}

function countOverlapping(a: DisplayNumberValues[], b: DisplayNumberValues[]): number {
    return a.filter(valueA => b.includes(valueA)).length
}

export function getOutputPerLine(line: string) {
    const [signals, output] = line.split('|')
    const signalList = signals.trim().split(' ')
    const numberMap = new Map()
    // build up a set of the known numbers [1,4,7,8]
    for (const signal of signalList) {
        const number = knownNumbers.find(number => hasCorrectLength(signal, number))
        if(number) {
            const value = signal.split('') as DisplayNumberValues[]
            numberMap.set(number, value)
        }
    }
    // Do some ugly code to deduct the rest of the numbers
    for (const signal of signalList) {
        const signalArray = signal.split('') as DisplayNumberValues[]
        const overlapWithOneCount = countOverlapping(signalArray, numberMap.get(1))
        const overlapWithFourCount = countOverlapping(signalArray, numberMap.get(4))
        
        const isZero = overlapWithFourCount === 3 && overlapWithOneCount === 2 && hasCorrectLength(signal, 0)
        if(isZero) {
            numberMap.set(0, signalArray)
        }
        const isTwo = overlapWithFourCount === 2 && hasCorrectLength(signal, 2)
        if(isTwo) {
            numberMap.set(2, signalArray)
        }
        const isThree = overlapWithOneCount === 2 && hasCorrectLength(signal, 3)
        if(isThree) {
            numberMap.set(3, signalArray)
        }
        const isFive = overlapWithFourCount === 3 && overlapWithOneCount === 1 && hasCorrectLength(signal, 5)
        if(isFive) {
            numberMap.set(5, signalArray)
        }
        const isSix = overlapWithFourCount === 3 && overlapWithOneCount === 1 && hasCorrectLength(signal, 6)
        if(isSix) {
            numberMap.set(6, signalArray)
        }
        const isNine = !isSix && !isZero && hasCorrectLength(signal, 9)
        if(isNine) {
            numberMap.set(9, signalArray)
        }
    }

    // map the output to the numbers
    const numberMapArray = Array.from(numberMap, ([number, value]) => ({ number, value: value.sort().join('') }));
    const solution = output.trim().split(' ').map((value: string) => {
        return value.split('').sort().join('')
    }).map((value: string) => {
        return numberMapArray.find(numberMap => numberMap.value === value)?.number
    })
    .join('')

    return parseInt(solution)
}



