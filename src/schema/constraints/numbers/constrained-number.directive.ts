import {getDirective} from "@graphql-tools/utils";
import {GraphQLScalarType, GraphQLSchema} from "graphql/type";
import {ConstrainedNumberScalar} from "./constrained-number.scalar";

export type ConstrainedNumberArguments = {
    min?: number,
    max?: number,
    multipleOf?: number,
    factorOf?: number
}

export const ConstrainedIntDirective = (schema: GraphQLSchema, scalarType: GraphQLScalarType): GraphQLScalarType => {
    const constrainedDirective = getDirective(schema, scalarType, 'constrainedInt')?.[0];
    if (!constrainedDirective) {
        return scalarType;
    }
    return ConstrainedNumberScalar(scalarType, constrainedDirective);
};

export const ConstrainedFloatDirective = (schema: GraphQLSchema, scalarType: GraphQLScalarType): GraphQLScalarType => {
    const constrainedDirective = getDirective(schema, scalarType, 'constrainedFloat')?.[0];
    if (!constrainedDirective) {
        return scalarType;
    }
    return ConstrainedNumberScalar(scalarType, constrainedDirective);
};