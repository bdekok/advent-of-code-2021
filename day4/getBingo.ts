function getWinningRangesOfBingoChart(bingoChart: number[][]) {
    const columns = bingoChart[0].map((_, colIndex) => bingoChart.map(row => row[colIndex]));   
    return [...bingoChart, ...columns]
}

function getLastOfArray<T>(array: T []) {
    return array[array.length - 1]
}
interface ChartInformation {
    bingoChart: number[][],
    winningNumbers: number[][],
    chartIndex: number
}

interface WinningChartInformation {
    chartIndex: number
    lastDrawnNumber: number
    sumUnmarked: number
    score: number,
    round: number
}


export function getWinningCharts(drawnNumbers: number[],bingoCharts: number[][][]) {
    const bingoChartsInformation: ChartInformation[] = bingoCharts.map((bingoChart, chartIndex) => ({
        bingoChart,
        winningNumbers: getWinningRangesOfBingoChart(bingoChart),
        chartIndex
    }))

    const winningCharts:WinningChartInformation[] = []

    for (let index = 0; index < drawnNumbers.length; index++) {
        const drawnNumbersRound = drawnNumbers.slice(0,index + 1)
        
        const winningChartsThisRound = bingoChartsInformation.filter(bingoChart => {
            return bingoChart.winningNumbers.some(row => row.every(number => drawnNumbersRound.includes(number)))
        })
        
        for (const winningChartThisround of winningChartsThisRound) {
            const { bingoChart, chartIndex } = winningChartThisround
            const isNewWinningChart = !winningCharts.some(chart => chart.chartIndex === chartIndex)
           
            if(isNewWinningChart){
                const sumUnmarked = bingoChart.flat().reduce((acc, number) => {
                    if(drawnNumbersRound.includes(number)) {
                        return acc
                    }
                    return acc + number
                }, 0)
                const lastDrawnNumber = drawnNumbers[index]
                winningCharts.push({
                    lastDrawnNumber,
                    sumUnmarked,
                    score: sumUnmarked * lastDrawnNumber,
                    chartIndex,
                    round: index
                })
            }
        }
    }
    return winningCharts
}

export function getFirstWinningChartInformation(drawnNumbers: number[],bingoCharts: number[][][]) {
    return getWinningCharts(drawnNumbers,bingoCharts)[0]
}
export function getLastWinningChartInformation(drawnNumbers: number[],bingoCharts: number[][][]) {
    const winningCharts = getWinningCharts(drawnNumbers,bingoCharts)
    return getLastOfArray(winningCharts)
}
