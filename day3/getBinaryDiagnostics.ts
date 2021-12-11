type bit = 0 | 1
interface bitCount {
    zeroBitsCount: number,
    oneBitsCount: number
}

function transformDiagnosticsToBitArray(bitDiagnostics: string[], bitIndex: number): bit[]{
    return bitDiagnostics.map(bits => {
        return parseInt(bits.charAt(bitIndex), 2) as bit
    })
}

function countBits(bits: bit[]): bitCount {
    let zeroBitsCount = 0
    let oneBitsCount = 0

    for(const bit of bits) {
        if(bit === 0) {
            zeroBitsCount = zeroBitsCount + 1
        } else {
            oneBitsCount = oneBitsCount+ 1
        }
    }
    return {zeroBitsCount, oneBitsCount}
}

function getMostFrequentBit(bits: bit[]) {
    const { zeroBitsCount, oneBitsCount } = countBits(bits)
    return zeroBitsCount > oneBitsCount ? 0 : 1
}

function getLeastFrequentBit(bits: bit[]) {
    const { zeroBitsCount, oneBitsCount } = countBits(bits)
    return zeroBitsCount > oneBitsCount ? 1 : 0
}

export function getGammaRate(bitDiagnostics: string[]): number {
    let gammaRate = ""
    for (let index = 0; index < bitDiagnostics[0].length; index++) {
        const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index)
        gammaRate += getMostFrequentBit(bitArray);  
    }
    return parseInt(gammaRate, 2)
}

export function getEpsilonRate(bitDiagnostics: string[]): number {
    let epsilonRate = ""
    for (let index = 0; index < bitDiagnostics[0].length; index++) {
        const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index)
        epsilonRate += getLeastFrequentBit(bitArray);   
    }
    return parseInt(epsilonRate, 2)
}

export function getPowerRate(bitDiagnostics: string[]): number {
    return getGammaRate(bitDiagnostics) * getEpsilonRate(bitDiagnostics)
}