const openSigns = ['(', '[', '{', '<'] as const;
const closeSigns = [')', ']', '}', '>'] as const;
export type OpenSign = typeof openSigns[number];
export type CloseSign = typeof closeSigns[number];

const score: {[key in CloseSign]: number}  = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

export function getSyntaxScore(lines: string[]): number {
    return lines.reduce((acc, line) => acc + getLineScore(line), 0)
}

function getLineScore(line: string): number {
    const faultySign = getLineSyntaxError(line)
    return faultySign ? score[faultySign] : 0 
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

function getLineSyntaxError(line: string): CloseSign | undefined {   
    let openSigns: OpenSign[] = []
    const signs = line.split('') as Array<OpenSign | CloseSign>
    let continueLoop = true

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
                
                if(isLastOpenSign) {
                    openSigns = openSigns.slice(0, -1)
                } else {
                    continueLoop = false
                }
                break;
            }
        }
        if(!continueLoop) {
            return sign as CloseSign
        }         
    }
}