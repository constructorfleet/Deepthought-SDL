import {GraphQLScalarType, GraphQLSchema} from "graphql/type";
import {getDirective} from "@graphql-tools/utils";
import {MaskedScalar} from "./masked.scalar";

export const MaskedDirective = (schema: GraphQLSchema, scalarType: GraphQLScalarType): GraphQLScalarType => {
    const constrainedDirective = getDirective(schema, scalarType, 'masked');
    if (!constrainedDirective) {
        return scalarType;
    }
    return MaskedScalar(scalarType,);
};