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

export function getOxygenRate(bitDiagnostics: string[], index = 0): number {
   const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index)
   const mostFrequentValue = getMostFrequentBit(bitArray)
   const result = bitDiagnostics.filter(bit => parseInt(bit[index]) === mostFrequentValue)

   if(result.length > 1) {
    return getOxygenRate(result, index + 1)
   }
   return parseInt(result[0], 2)
}

export function getCarbonDioxideRate(bitDiagnostics: string[], index = 0): number {
    const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index)
    const mostFrequentValue = getLeastFrequentBit(bitArray)
    const result = bitDiagnostics.filter(bit => parseInt(bit[index]) === mostFrequentValue)
 
    if(result.length > 1) {
     return getCarbonDioxideRate(result, index + 1)
    }
    return parseInt(result[0], 2)
 }

 export function getLiveSupportRate(bitDiagnostics: string[]): number {
     return getOxygenRate(bitDiagnostics) * getCarbonDioxideRate(bitDiagnostics)
 }