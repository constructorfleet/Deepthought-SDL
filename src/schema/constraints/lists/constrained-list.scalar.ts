import {GraphQLScalarType} from "graphql/type";
import {ConstrainedListArguments} from "./constrained-list.directive";
import {ensureList} from "./constrained-list.validation";
import {Kind} from "graphql/language";

const compositeValidation = (value: any[], ...validations: ((string) => undefined | Error)[]): Error[] =>
    validations.map((fn) => fn(value))
        .filter((res) => res !== undefined);

export const ConstrainedListScalar = (scalar: GraphQLScalarType, constraints: ConstrainedListArguments): GraphQLScalarType => {
    const validate = (value): any[] => {
        const errors = compositeValidation(
            value,
            ...Object.entries(constraints)
                .map(([key, val]) => ensureList[key](val))
        );
        if (errors.length > 0) {
            throw new Error(errors.map((e) => e.message).join("\n"));
        }
        return value;
    }

    scalar.parseLiteral = (valueNode) =>
        valueNode.kind === Kind.LIST
            ? validate(valueNode.values)
            : undefined;
    scalar.parseValue = validate;
    scalar.serialize = validate;

    return scalar;
}