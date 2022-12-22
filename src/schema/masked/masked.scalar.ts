import {GraphQLScalarType} from "graphql/type";

export const MaskedScalar = (scalar: GraphQLScalarType): GraphQLScalarType => {
    const serialize = scalar.serialize;
    scalar.description = `${scalar.description}\nValue is masked when returned to client`;
    scalar.serialize = (value) => {
        const res = serialize(value);
        const masked = res.toString().replace(/./g, "*");
        console.log(masked);
        return masked;
    };

    return scalar;
}