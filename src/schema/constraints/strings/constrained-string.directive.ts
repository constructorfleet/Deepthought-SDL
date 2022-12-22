import {Injectable} from "@nestjs/common";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {GraphQLSchema} from "graphql/type";
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

@Injectable()
export class ConstrainedStringDirective {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.SCALAR_TYPE]: scalarType => {
                const constrainedDirective = getDirective(schema, scalarType, 'constrainedString')?.[0];
                if (!constrainedDirective) {
                    return scalarType;
                }
                return ConstrainedStringScalar(scalarType, constrainedDirective);
            }
        })
    }
}