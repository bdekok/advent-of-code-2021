type bit = 0 | 1;
interface bitCount {
  zeroBitsCount: number;
  oneBitsCount: number;
}

function transformDiagnosticsToBitArray(
  bitDiagnostics: string[],
  bitIndex: number,
): bit[] {
  return bitDiagnostics.map((bits) =>
    parseInt(bits.charAt(bitIndex), 2) as bit
  );
}

function countBits(bits: bit[]): bitCount {
  let zeroBitsCount = 0;
  let oneBitsCount = 0;

  for (const bit of bits) {
    if (bit === 0) {
      zeroBitsCount = zeroBitsCount + 1;
    } else {
      oneBitsCount = oneBitsCount + 1;
    }
  }
  return { zeroBitsCount, oneBitsCount };
}

function getMostFrequentBit(bits: bit[]) {
  const { zeroBitsCount, oneBitsCount } = countBits(bits);
  return zeroBitsCount > oneBitsCount ? 0 : 1;
}

function getLeastFrequentBit(bits: bit[]) {
  const { zeroBitsCount, oneBitsCount } = countBits(bits);
  return zeroBitsCount > oneBitsCount ? 1 : 0;
}

export function getPowerDiagnostics(
  bitDiagnostics: string[],
): { gammaRate: number; epsilonRate: number; powerRate: number } {
  let gammaRateString = "";
  let epsilonRateString = "";

  for (let index = 0; index < bitDiagnostics[0].length; index++) {
    const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index);
    gammaRateString += getMostFrequentBit(bitArray);
    epsilonRateString += getLeastFrequentBit(bitArray);
  }

  const gammaRate = parseInt(gammaRateString, 2);
  const epsilonRate = parseInt(epsilonRateString, 2);
  return { gammaRate, epsilonRate, powerRate: gammaRate * epsilonRate };
}

export function getPowerRate(bitDiagnostics: string[]): number {
  return getPowerDiagnostics(bitDiagnostics).powerRate;
}

export function getOxygenRate(bitDiagnostics: string[], index = 0): number {
  const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index);
  const mostFrequentValue = getMostFrequentBit(bitArray);
  const result = bitDiagnostics.filter((bit) =>
    parseInt(bit[index]) === mostFrequentValue
  );

  if (result.length > 1) {
    return getOxygenRate(result, index + 1);
  }
  return parseInt(result[0], 2);
}

export function getCarbonDioxideRate(
  bitDiagnostics: string[],
  index = 0,
): number {
  const bitArray = transformDiagnosticsToBitArray(bitDiagnostics, index);
  const mostFrequentValue = getLeastFrequentBit(bitArray);
  const result = bitDiagnostics.filter((bit) =>
    parseInt(bit[index]) === mostFrequentValue
  );

  if (result.length > 1) {
    return getCarbonDioxideRate(result, index + 1);
  }
  return parseInt(result[0], 2);
}

export function getLiveSupportRate(bitDiagnostics: string[]): number {
  return getOxygenRate(bitDiagnostics) * getCarbonDioxideRate(bitDiagnostics);
}
