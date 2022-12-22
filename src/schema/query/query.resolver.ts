import {Args, Query, Resolver} from "@nestjs/graphql";
import {Password, User} from "../../graphql.schema";

export type Credentials = {
    password: Password;
    username: User;
}

export type LoginResult = {
    password: Password;
    username: User
}

@Resolver()
export class QueryResolver {
    @Query()
    async login(@Args('input') input: Credentials): Promise<LoginResult> {
        console.log(input);
        return input;
    }
}