"use strict";

import { Attributes, ComponentChildren, Ref } from "preact";

import { Omit } from "./Helpers";

export type RenderProperties<P, RefType = any> = P & Attributes & { children?: ComponentChildren; ref?: Ref<RefType> };

export type MigrateProperties<P = {}, E = JSX.HTMLAttributes> = P & FilterAttributes<E, P>;
export type FilterAttributes<E, P> = Pick<E, Exclude<keyof E, keyof P>>;
