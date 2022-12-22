
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface PasswordInput {
    password?: Nullable<Password>;
}

export interface IQuery {
    login(input?: Nullable<PasswordInput>): Nullable<Password> | Promise<Nullable<Password>>;
    test(): Nullable<Password> | Promise<Nullable<Password>>;
}

export type RegEx = string;
export type Password = string;
type Nullable<T> = T | null;
