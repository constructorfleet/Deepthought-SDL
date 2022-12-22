export const ensureList = {
    minItems: (minItems: number) => (value: any[]): Error | undefined =>
        value.length < minItems
            ? new Error(`"${value}" must contain at least ${minItems} elements`)
            : undefined,

    maxItems: (maxItems: number) => (value: any[]): Error | undefined =>
        value.length > maxItems
            ? new Error(`"${value}" must contain at most ${maxItems} elements`)
            : undefined
}