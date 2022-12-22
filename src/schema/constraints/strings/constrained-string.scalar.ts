import {GraphQLScalarType} from "graphql/type";
import {ConstrainedStringArguments} from "./constrained-string.directive";
import {ensureString} from "./constrained-string.validation";
import {Kind} from "graphql/language";

const compositeValidation = (value: string, ...validations: ((string) => undefined | Error)[]): Error[] =>
    validations.map((fn) => fn(value))
        .filter((res) => res !== undefined);

export const ConstrainedStringScalar = (scalar: GraphQLScalarType, constraints: ConstrainedStringArguments): GraphQLScalarType => {
    const validate = (value): string => {
        const errors = compositeValidation(
            value.toString(),
            ...Object.entries(constraints)
                .map(([key, val]) => ensureString[key].validate(val))
        );
        if (errors.length > 0) {
            throw new Error(errors.map((e) => e.message).join("\n"));
        }
        return value;
    }
    scalar.description += `${scalar.description}\n${Object.entries(constraints).map(([key, val]) => ensureString[key].description)}`;
    scalar.parseLiteral = (valueNode) =>
        valueNode.kind === Kind.STRING
            ? validate(valueNode.value)
            : undefined;
    scalar.parseValue = validate;
    scalar.serialize = validate;

    return scalar;
}