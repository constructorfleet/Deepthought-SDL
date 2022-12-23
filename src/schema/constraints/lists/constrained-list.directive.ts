import {ConstrainedScalarDirective} from "../scalar.constraints";
import {Kind} from "graphql/language";

export type ConstrainedListArguments = {
    minItems?: number,
    maxItems?: number
}

export const ConstrainedListDirective: ConstrainedScalarDirective<ConstrainedListArguments, any[]> = {
    name: "constrainedList",
    scalarKind: Kind.LIST,
    args: {
        minItems: {
            description: (minItems) => `must contain at least ${minItems} items`,
            invalidMessage: (minItems) => (value) => `"${value}" must contain at least ${minItems} elements`,
            validate: (minItems) => (value) => value.length >= minItems
        },
        maxItems: {
            description: (maxItems) => `must contain at most ${maxItems} items`,
            invalidMessage: (maxItems) => (value) => `"${value}" must contain at most ${maxItems} elements`,
            validate: (maxItems) => (value) => value.length <= maxItems
        }
    }
}