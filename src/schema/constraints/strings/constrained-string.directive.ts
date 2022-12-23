import {RegularExpression} from "../../../graphql.schema";
import {ConstrainedScalarDirective} from "../scalar.constraints";
import {Kind} from "graphql/language";

export type ConstrainedStringArguments = {
    minLength?: number,
    maxLength?: number,
    startsWith?: string,
    endsWith?: string,
    includes?: string,
    excludes?: string,
    pattern?: RegularExpression
}

export const ConstrainedStringDirective: ConstrainedScalarDirective<ConstrainedStringArguments, string> = {
    name: "constrainedString",
    scalarKind: Kind.STRING,
    args: {
        minLength: {
            description: (minLength) => `must be at least ${minLength}`,
            invalidMessage: (minLength) => (value) => `"${value}" must be at least ${minLength}`,
            validate: (minLength) => (value) => value.length > minLength
        },
        maxLength: {
            description: (maxLength) => `must be at most ${maxLength}`,
            invalidMessage: (maxLength) => (value) => `"${value}" must be at most ${maxLength}`,
            validate: (maxLength) => (value) => value.length < maxLength
        },
        startsWith: {
            description: (startsWith) => `must start with "${startsWith}"`,
            invalidMessage: (startsWith) => (value) => `"${value}" must start with "${startsWith}"`,
            validate: (startsWith) => (value) => value.startsWith(startsWith)
        },
        endsWith: {
            description: (endsWith) => `must end with "${endsWith}"`,
            invalidMessage: (endsWith) => (value) => `"${value}" must end with "${endsWith}"`,
            validate: (endsWith) => (value) => value.endsWith(endsWith)
        },
        includes: {
            description: (includes) => `must include "${includes}"`,
            invalidMessage: (includes) => (value) => `"${value}" must include "${includes}"`,
            validate: (includes) => (value) => value.includes(includes)
        },
        excludes: {
            description: (exclude) => `must exclude "${exclude}"`,
            invalidMessage: (exclude) => (value) => `"${value}" must exclude "${exclude}"`,
            validate: (exclude) => (value) => !value.includes(exclude)
        },
        pattern: {
            description: (pattern) => `must match "${pattern}"`,
            invalidMessage: (pattern) => (value) => `"${value}" must match "${pattern}"`,
            validate: (pattern) => (value) => !!value.matchAll(pattern)
        }
    }
}
