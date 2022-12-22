import {getDirective} from "@graphql-tools/utils";
import {GraphQLScalarType, GraphQLSchema} from "graphql/type";
import {ConstrainedListScalar} from "./constrained-list.scalar";

export type ConstrainedListArguments = {
    minItems?: number,
    maxItems?: number
}

export const ConstrainedListDirective = (schema: GraphQLSchema, scalarType: GraphQLScalarType): GraphQLScalarType => {
    const constrainedDirective = getDirective(schema, scalarType, 'constrainedList')?.[0];
    if (!constrainedDirective) {
        return scalarType;
    }
    return ConstrainedListScalar(scalarType, constrainedDirective);
};