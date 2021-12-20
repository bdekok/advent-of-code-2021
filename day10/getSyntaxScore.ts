const openSigns = ['(', '[', '{', '<'] as const;
const closeSigns = [')', ']', '}', '>'] as const;
export type OpenSign = typeof openSigns[number];
export type CloseSign = typeof closeSigns[number];

const scoreBreakingSigns: {[key in CloseSign]: number}  = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
const scoreUnclosedSigns: {[key in CloseSign]: number}  = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

export function getSyntaxScoreBreakingSigns(lines: string[]): number {
    return lines.reduce((acc, line) => acc + getLineScoreBreakingSigns(line), 0)
}

export function getSyntaxScoreUnclosedLines(lines: string[]): number {
    const totals = lines
                    .map(getLineScoreUnclosed)
                    .filter(value => value !== 0)
                    .sort((a,b) => a - b)
    const middleScore = totals[Math.floor(totals.length / 2)]
    return middleScore
}

function getLineScoreBreakingSigns(line: string): number {
    const {breakingSign} = getLineSyntaxError(line)
    return breakingSign ? scoreBreakingSigns[breakingSign] : 0
}
function getLineScoreUnclosed(line: string): number {
    const { unclosedSigns, breakingSign } = getLineSyntaxError(line)
    if(breakingSign) {
        return 0
    }
    if(unclosedSigns) {
        return unclosedSigns
            .reverse()
            .map(mapOpenSignToCloseSign)
            .reduce((acc, current) => {
                return (acc * 5) + scoreUnclosedSigns[current]
            }, 0)
    }
    return 0 
}

function mapCloseSignToOpenSign(closeSign: CloseSign): OpenSign {
    switch(closeSign) {
        case ')':
            return '('
        case '>':
            return '<'
        case ']':
            return '['
        case '}': 
            return '{'
    }
}

function mapOpenSignToCloseSign(openSign: OpenSign): CloseSign {
    switch(openSign) {
        case '(':
            return ')'
        case '<':
            return '>'
        case '[':
            return ']'
        case '{': 
            return '}'
    }
}

interface LineSyntaxError {
    unclosedSigns?: OpenSign[]
    breakingSign?: CloseSign
}

function getLineSyntaxError(line: string): LineSyntaxError {   
    let openSigns: OpenSign[] = []
    const signs = line.split('') as Array<OpenSign | CloseSign>
    
    for (const sign of signs) {
        switch(sign) {
            case '(':
            case '[':
            case '{':
            case '<':
                openSigns.push(sign)
                break;
            case ')': 
            case ']':
            case '}':
            case '>': {
                const openSign = mapCloseSignToOpenSign(sign)
                const isLastOpenSign = openSigns[openSigns.length - 1] === openSign
                
                if(!isLastOpenSign) {
                    openSigns = openSigns.slice(0, -1)
                } else {
                    return {
                        breakingSign: sign as CloseSign,
                        unclosedSigns: openSigns
                    }
                }
                break;
            }
        }       
    }
    return {
        unclosedSigns: openSigns
    }
}