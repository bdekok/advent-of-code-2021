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
                    const isOne = hasCorrectLength(value, 1) 
                    const isFour = hasCorrectLength(value, 4) 
                    const isSeven = hasCorrectLength(value, 7) 
                    const isEight = hasCorrectLength(value, 8) 

                    if(isOne || isFour || isSeven || isEight) {
                        return acc + 1
                    }
                    return acc
                }, 0)
}