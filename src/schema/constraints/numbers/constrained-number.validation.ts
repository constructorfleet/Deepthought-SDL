export const ensureNumber = {
    min: (min: number) => ({
        description: `must greater than ${min}`,
        validate: (value: number): Error | undefined =>
            value < min
                ? new Error(`"${value}" must be at least ${min}`)
                : undefined
    }),

    max: (max) => ({
        description: `must less than ${max}`,
        validate: (value: number): Error | undefined =>
            value > max
                ? new Error(`"${value}" must be at most ${max}`)
                : undefined
    }),

    multipleOf: (multipleOf: number) => ({
        description: `must be a multiple of ${multipleOf}`,
        validate: (value: number): Error | undefined =>
            value % multipleOf === 0
                ? new Error(`"${value}" must be a multiple of ${multipleOf}`)
                : undefined
    }),

    factorOf: (factorOf: number) => ({
        description: `must be a factor of ${factorOf}`,
        validate: (value: number): Error | undefined =>
            factorOf % value === 0
                ? new Error(`"${value}" must be a factor of ${factorOf}`)
                : undefined
    }),
}