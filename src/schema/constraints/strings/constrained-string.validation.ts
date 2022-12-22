export const ensureString = {
    minLength: (minLength: number) => ({
        description: `must be at least ${minLength}`,
        validate: (value: string): Error | undefined =>
            value.length < minLength
                ? new Error(`"${value}" must be at least ${minLength}`)
                : undefined
    }),

    maxLength: (maxLength: number) => ({
        description: `must be at least ${maxLength}`,
        validate: (value: string): Error | undefined =>
            value.length > maxLength
                ? new Error(`"${value}" must be at most ${maxLength}`)
                : undefined
    }),

    startsWith: (startsWith: string) => ({
        description: `must start with "${startsWith}"`,
        validate: (value: string): Error | undefined =>
            value.startsWith(startsWith)
                ? new Error(`"${value}" must start with "${startsWith}"`)
                : undefined
    }),

    endsWith: (endsWith: string) => ({
        description: `must end with "${endsWith}"`,
        validate: (value: string): Error | undefined =>
            value.endsWith(endsWith)
                ? new Error(`"${value}" must end with "${endsWith}"`)
                : undefined
    }),

    includes: (includes: string) => ({
        description: `must contain "${includes}"`,
        validate: (value: string): Error | undefined =>
            value.includes(includes)
                ? new Error(`"${value}" must include "${includes}"`)
                : undefined
    }),

    excludes: (excludes: string) => ({
        description: `must not contain ${excludes}`,
        validate: (value: string): Error | undefined =>
            !value.includes(excludes)
                ? new Error(`"${value}" must exclude "${excludes}"`)
                : undefined
    }),

    pattern: (pattern: string) => ({
        description: `must match the regex /${pattern}/`,
        validate: (value: string): Error | undefined =>
            !value.match(pattern)
                ? new Error(`"${value}" must match "${pattern}"`)
                : undefined
    })
}
