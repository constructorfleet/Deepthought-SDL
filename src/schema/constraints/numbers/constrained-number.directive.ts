import {ConstrainedScalarDirective} from "../scalar.constraints";
import {Kind} from "graphql/language";

export type ConstrainedNumberArguments = {
    min?: number,
    max?: number,
    multipleOf?: number,
    factorOf?: number
}

const constrainedNumberDirective = (name: string, kind: Kind): ConstrainedScalarDirective<ConstrainedNumberArguments, number> => ({
    name: name,
    scalarKind: kind,
    args: {
        min: {
            description: (min) => `must be at least ${min}`,
            invalidMessage: (min) => (value) => `"${value}" must be at least ${min}`,
            validate: (min) => (value) => value >= min
        },
        max: {
            description: (max) => `must be at least ${max}`,
            invalidMessage: (max) => (value) => `"${value}" must be at least ${max}`,
            validate: (max) => (value) => value <= max
        },
        multipleOf: {
            description: (multipleOf) => `must be a multiple of ${multipleOf}`,
            invalidMessage: (multipleOf) => (value) => `"${value}" must be a multiple of ${multipleOf}`,
            validate: (multipleOf) => (value) => value % multipleOf === 0
        },
        factorOf: {
            description: (factorOf) => `must be a factor of ${factorOf}`,
            invalidMessage: (factorOf) => (value) => `"${value}" must be a factor of ${factorOf}`,
            validate: (factorOf) => (value) => factorOf % value === 0
        }
    }
})

export const ConstrainedIntDirective = constrainedNumberDirective("constrainedInt", Kind.INT);
export const ConstrainedFloatDirective = constrainedNumberDirective("constrainedFloat", Kind.FLOAT);
