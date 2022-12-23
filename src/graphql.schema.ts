
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Credential {
    password: Password;
    username: User;
}

export interface LoginResult {
    username: User;
    password: Password;
}

export interface IQuery {
    login(input: Credential): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;
}

export type RegularExpression = RegExp;
export type Password = string;
export type User = string;
type Nullable<T> = T | null;
