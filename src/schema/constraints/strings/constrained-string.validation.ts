export const ensureString = {
    minLength: (minLength: number) => (value: string): Error | undefined =>
        value.length < minLength
            ? new Error(`"${value}" must be at least ${minLength}`)
            : undefined,

    maxLength: (maxLength: number) => (value: string): Error | undefined =>
        value.length > maxLength
            ? new Error(`"${value}" must be at most ${maxLength}`)
            : undefined,

    startsWith: (startsWith: string) => (value: string): Error | undefined =>
        value.startsWith(startsWith)
            ? new Error(`"${value}" must start with "${startsWith}"`)
            : undefined,

    endsWith: (endsWith: string) => (value: string): Error | undefined =>
        value.endsWith(endsWith)
            ? new Error(`"${value}" must end with "${endsWith}"`)
            : undefined,

    includes: (includes: string) => (value: string): Error | undefined =>
        value.includes(includes)
            ? new Error(`"${value}" must include "${includes}"`)
            : undefined,

    excludes: (excludes: string) => (value: string): Error | undefined =>
        !value.includes(excludes)
            ? new Error(`"${value}" must exclude "${excludes}"`)
            : undefined,

    pattern: (pattern: RegExp) => (value: string): Error | undefined =>
        value.matchAll(pattern)
            ? new Error(`"${value}" must match "${pattern.source}"`)
            : undefined
}