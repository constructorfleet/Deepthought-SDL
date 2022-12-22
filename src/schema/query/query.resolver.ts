import {Resolver} from "@nestjs/graphql";

export type PasswordInput = {
    password: string;
}

@Resolver()
export class QueryResolver {
    async login(input: PasswordInput): Promise<string> {
        console.log(input);
        return input.password;
    }
}