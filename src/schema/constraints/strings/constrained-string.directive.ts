import {getDirective} from "@graphql-tools/utils";
import {GraphQLScalarType, GraphQLSchema} from "graphql/type";
import {ConstrainedStringScalar} from "./constrained-string.scalar";

export type ConstrainedStringArguments = {
    minLength?: number,
    maxLength?: number,
    startsWith?: string,
    endsWith?: string,
    includes?: string,
    excludes?: string,
    pattern?: string
}


export const ConstrainedStringDirective = (schema: GraphQLSchema, scalarType: GraphQLScalarType): GraphQLScalarType => {
    const constrainedDirective = getDirective(schema, scalarType, 'constrainedString')?.[0];
    if (!constrainedDirective) {
        return scalarType;
    }
    return ConstrainedStringScalar(scalarType, constrainedDirective);
};