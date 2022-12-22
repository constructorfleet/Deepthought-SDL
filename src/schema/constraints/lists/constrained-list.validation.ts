export const ensureList = {
    minItems: (minItems: number) => ({
        description: `must contain ${minItems} elements`,
        validate: (value: any[]): Error | undefined =>
            value.length < minItems
                ? new Error(`"${value}" must contain at least ${minItems} elements`)
                : undefined
    }),

    maxItems: (maxItems: number) => ({
        description: `must contain less than ${maxItems} elements`,
        validate: (value: any[]): Error | undefined =>
            value.length > maxItems
                ? new Error(`"${value}" must contain at most ${maxItems} elements`)
                : undefined
    })
}