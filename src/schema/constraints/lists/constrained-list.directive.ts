import {Injectable} from "@nestjs/common";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {GraphQLSchema} from "graphql/type";
import {ConstrainedListScalar} from "./constrained-list.scalar";

export type ConstrainedListArguments = {
    minItems?: number,
    maxItems?: number
}

@Injectable()
export class ConstrainedListDirective {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.SCALAR_TYPE]: scalarType => {
                const constrainedDirective = getDirective(schema, scalarType, 'constrainedList')?.[0];
                if (!constrainedDirective) {
                    return scalarType;
                }
                return ConstrainedListScalar(scalarType, constrainedDirective);
            }
        })
    }
}