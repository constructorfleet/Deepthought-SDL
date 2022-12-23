import {Injectable} from "@nestjs/common";
import {ConstrainedStringDirective} from "./strings/constrained-string.directive";
import {GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLSchema, GraphQLString} from "graphql/type";
import {MapperKind, mapSchema} from "@graphql-tools/utils";
import {MaskedDirective} from "../masked/masked.directive";
import {GraphQLError} from "graphql/error";
import {ConstrainScalar} from "./scalar.constraints";
import {ConstrainedFloatDirective, ConstrainedIntDirective} from "./numbers/constrained-number.directive";
import {ConstrainedListDirective} from "./lists/constrained-list.directive";

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
                    ConstrainedStringDirective,
                    ConstrainedIntDirective,
                    ConstrainedFloatDirective,
                    ConstrainedListDirective
                ].map(ConstrainScalar)
                    .reduce(
                        (scalar, constrainedScalar) => constrainedScalar(schema, scalar),
                        scalarType
                    ))
        })
    }
}