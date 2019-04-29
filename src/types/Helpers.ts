"use strict";

export type Filter<T, U> = T extends U ? T : never;
export type Permit<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
