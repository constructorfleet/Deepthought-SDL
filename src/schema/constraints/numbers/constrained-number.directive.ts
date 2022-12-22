import {Injectable} from "@nestjs/common";
import {getDirective, MapperKind, mapSchema} from "@graphql-tools/utils";
import {GraphQLSchema} from "graphql/type";
import {ConstrainedNumberScalar} from "./constrained-number.scalar";

export type ConstrainedNumberArguments = {
    min?: number,
    max?: number,
    multipleOf?: number,
    factorOf?: number
}

@Injectable()
export class ConstrainedIntDirective {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.SCALAR_TYPE]: scalarType => {
                const constrainedDirective = getDirective(schema, scalarType, 'constrainedInt')?.[0];
                if (!constrainedDirective) {
                    return scalarType;
                }
                return ConstrainedNumberScalar(scalarType, constrainedDirective);
            }
        })
    }
}

@Injectable()
export class ConstrainedFloatDirective {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.SCALAR_TYPE]: scalarType => {
                const constrainedDirective = getDirective(schema, scalarType, 'constrainedFloat')?.[0];
                if (!constrainedDirective) {
                    return scalarType;
                }
                return ConstrainedNumberScalar(scalarType, constrainedDirective);
            }
        })
    }
}