import {Kind} from "graphql/language";
import {GraphQLScalarType, GraphQLSchema} from "graphql/type";
import {getDirective} from "@graphql-tools/utils";
import {isDefined} from "class-validator";
import {isError} from "@nestjs/cli/lib/utils/is-error";
import {wrapFunction} from "../../utils/function.utils";
import {GraphQLError} from "graphql/error";

export type ScalarConstraint<TConstraintArg, TScalarValue> = {
    description: (constraintArg: TConstraintArg) => string;
    invalidMessage: (constraintArg: TConstraintArg) => (scalarValue: TScalarValue) => string;
    validate: (constraintArgs: TConstraintArg) => (scalarValue: TScalarValue) => boolean;
}

export type SpecificScalarConstraint<TScalarValue> = {
    description: string;
    invalidMessage: (scalarValue: TScalarValue) => string;
    validate: (scalarValue: TScalarValue) => boolean;
}

export type ConstrainedScalarDirective<TDirectiveArgs, TScalarValue> = {
    name: string;
    scalarKind: Kind;
    args: {[Arg in keyof TDirectiveArgs]: ScalarConstraint<TDirectiveArgs[Arg], TScalarValue>};
}

function applyArg<TConstraintArg, TScalarValue>(constraint: ScalarConstraint<TConstraintArg, TScalarValue>, constraintArg: TConstraintArg): SpecificScalarConstraint<TScalarValue> {
    return {
        description: constraint.description(constraintArg),
        invalidMessage: constraint.invalidMessage(constraintArg),
        validate: constraint.validate(constraintArg),
    }
}

function ensureConstraint<TScalarValue>(constraint: SpecificScalarConstraint<TScalarValue>, scalarValue: TScalarValue): Error | undefined {
    if (!constraint.validate(scalarValue)) {
        return new Error(constraint.invalidMessage(scalarValue));
    }
    return;
}

export function ConstrainScalar<TDirectiveArgs, TScalarValue>(directive: ConstrainedScalarDirective<TDirectiveArgs, TScalarValue>): (GraphQLSchema, GraphQLScalarType) => GraphQLScalarType {
    return (schema: GraphQLSchema, scalar: GraphQLScalarType): GraphQLScalarType => {
        const directiveArgs = getDirective(schema, scalar, directive.name)?.[0];
        if (!directiveArgs) {
            return scalar;
        }
        const specifiedConstraints = Object.entries(directiveArgs)
            .map(([arg, constraint]) => applyArg(directive.args[arg], constraint));
        const constraintDescriptions = specifiedConstraints.map((constraint) => constraint.description);
        const compositeValidation = (value: TScalarValue): TScalarValue => {
            const errors =specifiedConstraints
                .map((constraint) => ensureConstraint(constraint, value))
                .filter(isError);
            if (errors) {
                throw new GraphQLError(errors.join(","));
            }
            return value;
        }

        scalar.description = `${scalar.description} \n\n* ${constraintDescriptions.join("\n\n *")}`;
        scalar.serialize = wrapFunction(scalar.serialize, compositeValidation)
        scalar.parseValue = wrapFunction(scalar.parseValue, compositeValidation);
        scalar.parseLiteral = (valueNode) =>
            valueNode.kind === directive.scalarKind && "value" in valueNode
                ? compositeValidation(valueNode.value as unknown as TScalarValue)
                : undefined;
        return scalar;
    }
}

