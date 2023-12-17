

export type Value = string | number | (string | number)[]

export type BreakoutSize = {
    min?: Value
    max?: Value
} | string | number

export type BlueprintOptions = {
    [key: string]: {
        breakouts: Record<string, BreakoutSize>
        default?: string
    }
}