import {Injectable} from "@nestjs/common";
import {ConstrainedStringDirective} from "./strings/constrained-string.directive";
import {ConstrainedFloatDirective, ConstrainedIntDirective} from "./numbers/constrained-number.directive";
import {ConstrainedListDirective} from "./lists/constrained-list.directive";
import {GraphQLSchema} from "graphql/type";
import {MapperKind, mapSchema} from "@graphql-tools/utils";

@Injectable()
export class ConstraintsFactory {
    transformSchema(schema: GraphQLSchema): GraphQLSchema {
        return mapSchema(schema, {
            [MapperKind.SCALAR_TYPE]: (scalarType) =>
                [
                    ConstrainedListDirective,
                    ConstrainedStringDirective,
                    ConstrainedFloatDirective,
                    ConstrainedIntDirective,
                ].reduce(
                    (scalar, directive) => {
                        console.log(directive);
                        return directive(schema, scalar)
                    },
                    scalarType
                )
        })
    }
}