import {GraphQLScalarType} from "graphql/type";
import {ConstrainedNumberArguments} from "./constrained-number.directive";
import {ensureNumber} from "./constrained-number.validation";
import {Kind} from "graphql/language";

const compositeValidation = (value: number, ...validations: ((number) => undefined | Error)[]): Error[] =>
    validations.map((fn) => fn(value))
        .filter((res) => res !== undefined);

export const ConstrainedNumberScalar = (scalar: GraphQLScalarType, constraints: ConstrainedNumberArguments): GraphQLScalarType => {
    const validate = (value): number => {
        const errors = compositeValidation(
            value,
            ...Object.entries(constraints)
                .map(([key, val]) => ensureNumber[key](val))
        );
        if (errors.length > 0) {
            throw new Error(errors.map((e) => e.message).join("\n"));
        }
        return value;
    }

    scalar.parseLiteral = (valueNode) =>
        valueNode.kind === Kind.INT
            ? validate(valueNode.value)
            : undefined;
    scalar.parseValue = validate;
    scalar.serialize = validate;

    return scalar;
}