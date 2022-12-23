export function wrapFunction<TArgs, TReturn>(
    targetFunction: (parameters: TArgs) => TReturn,
    before?: (parameters: TArgs) => TArgs,
    after?: (result: TReturn, parameters: TArgs) => TReturn
): (parameters: TArgs) => TReturn {
    return (parameters: TArgs) => {
        let args = parameters;
        if (before) {
            args = before(args);
        }
        let result = targetFunction(args);
        if (after) {
            result = after(result, args);
        }
        return result;
    };
}