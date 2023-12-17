import { BlueprintOptions, BreakoutSize, Value } from "./types"

export const parsePrimitiveValue = (value: Value) => {
    if (Array.isArray(value)) {
        if (value.length === 1) {
            return parseNumberValue(value[0])
        }

        throw new Error('value must be a string or number not an array')
    }

    return parseNumberValue(value)
}

export const parseNumberValue = (value: Value) => {
    if (typeof value === 'number') {
        return `${value}px`
    }

    return value as string
}

export const isSimpleValue = (value: Value) => {
    return typeof value === 'string' || typeof value === 'number' || Array.isArray(value) && value.length === 1
}

export const parseBreakoutSize = (value: BreakoutSize) => {
    if (typeof value !== 'object') {
        return parseNumberValue(value)
    }

    const { min, max } = value

    if (max && min) {
        return `minmax(${parsePrimitiveValue(min)}, ${parsePrimitiveValue(max)})`
    }

    if (max) {
        return isSimpleValue(max) ? `minmax(auto, ${parsePrimitiveValue(max)})`
            : `max(${(max as string[]).map(parseNumberValue).join(', ')})`
    }

    if (min) {
        return isSimpleValue(min) ? `minmax(${parsePrimitiveValue(min)}, auto)`
            : `min(${(min as string[]).map(parseNumberValue).join(', ')})`
    }

    throw new Error('min or max must be defined')
}

export const isTheEdgeBreakout = (breakout: string, blueprint: BlueprintOptions) => {
    return Object.values(blueprint).some(v => Object.keys(v.breakouts).includes(breakout))
}

export const generateGridTemplateColumns = (values: Record<string, BreakoutSize>) => {
    return Object.entries(values).reduce((acc, [key, value]) => {
        const breakoutSize = parseBreakoutSize(value)
        const inner = acc === '' ? breakoutSize : `${breakoutSize} ${acc} ${breakoutSize}`
        return `[${key}-start] ${inner} [${key}-end]`
    }, '')
}

