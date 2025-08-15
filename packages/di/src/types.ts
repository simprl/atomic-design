/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType, ReactNode } from "react";

type OmitDeps<T> =  T extends { deps: unknown } ? Omit<T, "deps"> : T;

type FunctionWithoutDeps<F> =
    F extends () => infer R ? () => R :
        F extends (props: infer P, ...args: infer A) => infer R ? (props: OmitDeps<P>, ...args: A) => R :
            F extends (this: infer T, props: infer P, ...args: infer A) => infer R
                ? (this: OmitDeps<T>, props: OmitDeps<P>, ...args: A) => R
                : never;

export type ComponentWithoutDeps<C> =
    C extends ComponentType<infer P>
        ? ComponentType<Omit<P, 'deps'>>
        : "never";

export type DepsWithoutDeps<T> = {
    [K in keyof T]:
    T[K] extends (this: any, ...args: any[]) => any
        ? FunctionWithoutDeps<T[K]>
        :T[K] extends ComponentType<any>
        ? ComponentWithoutDeps<T[K]>
        : T[K] extends PlainObject
            ? DepsWithoutDeps<T[K]>
            : T[K];
};

export type WithDeps<Deps> = {
    deps: DepsWithoutDeps<Deps>;
}

export type DepsFunctionComponent<P = any, Deps = void> = ComponentType<P & WithDeps<Deps>>
export type DepsFunction<Arguments extends unknown[], Return, Deps = void> = Deps extends void ? (...props: Arguments) => Return : (this: WithDeps<Deps>, ...props: Arguments) => Return;

export type AnyFunction = (...args: unknown[]) => unknown;
export type PlainObject = Record<string, unknown>;

export type OneStyleContext<Name extends string, ClassNames> = {
    styles: {
        [N in Name]: ClassNames
    }
};

export type ClassNames<ClassNamesStrings extends string> = {
    readonly [ClassName in ClassNamesStrings]?: string;
};

export type ReactNodes<ClassNamesStrings extends string> = {
    readonly [ClassName in ClassNamesStrings]?: ReactNode;
};

export type OneFunctionComponentContext<Space extends string, Name extends string, Props, Deps = void> = {
    [S in Space]: {
        [N in Name]: DepsFunctionComponent<Props, Deps>;
    }
}

export type OneFunctionContext<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = void> = {
    [S in Space]: {
        [N in Name]: DepsFunction<Arguments, Return, Deps>;
    }
}

export type OneContextItem<Space extends string, Name extends string, F> = {
    [S in Space]: {
        [N in Name]: F;
    }
}

