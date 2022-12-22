import {Injectable} from "@nestjs/common";
import {ConstrainedStringDirective} from "./strings/constrained-string.directive";
import {ConstrainedFloatDirective, ConstrainedIntDirective} from "./numbers/constrained-number.directive";
import {ConstrainedListDirective} from "./lists/constrained-list.directive";
import {GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLSchema, GraphQLString} from "graphql/type";
import {MapperKind, mapSchema} from "@graphql-tools/utils";
import {MaskedDirective} from "../masked/masked.directive";
import {GraphQLError} from "graphql/error";

const ensureAllowedScalarType = (name: string) => {
    if ([GraphQLFloat.name, GraphQLInt.name, GraphQLString.name, GraphQLBoolean.name].includes(name)) {
        throw new GraphQLError("Must define domain-specific scalars");
    }
}

const checkDefinitionConfig = (config) => {
    if (("name" in config.type)) {
        ensureAllowedScalarType(config.type.name);
    }
    return config;
}

@Injectable()
export class ConstraintsFactory {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.FIELD]: checkDefinitionConfig,
            [MapperKind.ARGUMENT]: checkDefinitionConfig,
            [MapperKind.INPUT_OBJECT_FIELD]: checkDefinitionConfig,
            [MapperKind.INTERFACE_FIELD]: checkDefinitionConfig,
            [MapperKind.OBJECT_FIELD]: checkDefinitionConfig,
            [MapperKind.UNION_TYPE]: (union) => {
                union.getTypes().every(checkDefinitionConfig);
                return union;
            },
            [MapperKind.SCALAR_TYPE]: (scalarType) =>
                MaskedDirective(schema, [
                    ConstrainedListDirective,
                    ConstrainedStringDirective,
                    ConstrainedFloatDirective,
                    ConstrainedIntDirective,
                ].reduce(
                    (scalar, directive) => directive(schema, scalar),
                    scalarType
                ))
        })
    }
}