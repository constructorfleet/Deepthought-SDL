
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
    test(): Nullable<Password> | Promise<Nullable<Password>>;
}

export type RegEx = string;
export type Password = string;
export type User = string;
type Nullable<T> = T | null;
