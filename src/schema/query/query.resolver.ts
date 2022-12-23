import {Args, Query, Resolver} from "@nestjs/graphql";
// import {Password, User} from "../../graphql.schema";
declare type Password = string;
declare type User = string;
export type Credentials = {
    password: Password;
    username: User;
}

export type LoginResult = {
    password: Password;
    username: User
}

@Resolver('Query')
export class QueryResolver {
    @Query("login")
    async login(@Args('input') input: Credentials): Promise<LoginResult> {
        console.log(input);
        return input;
    }
}