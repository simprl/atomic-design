/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType } from "react";

type OmitDeps<T> =  T extends PlainObject ? Omit<T, "deps"> : T;

type FunctionWithoutDeps<F> =
    F extends (this: infer T, props: infer P, ...args: infer A) => infer R ? (this: OmitDeps<T>, props: OmitDeps<P>, ...args: A) => R : never;

export type ComponentWithoutDeps<C> =
    C extends ComponentType<infer P>
        ? ComponentType<Omit<P, 'deps'>>
        : never;

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

export type DepsFunctionComponent<P = any, Deps = undefined> = ComponentType<P & WithDeps<Deps>>
export type DepsFunction<Arguments extends unknown[], Return, Deps = undefined> = Deps extends undefined ? (...props: Arguments) => Return : (this: WithDeps<Deps>, ...props: Arguments) => Return;

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

export type OneFunctionComponentContext<Space extends string, Name extends string, Props, Deps = undefined> = {
    [S in Space]: {
        [N in Name]: DepsFunctionComponent<Props, Deps>;
    }
}

export type OneFunctionContext<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = undefined> = {
    [S in Space]: {
        [N in Name]: DepsFunction<Arguments, Return, Deps>;
    }
}

export type OneFunctionComponentContextWithDeps<Space extends string, Name extends string, Props, Deps = undefined> =
    Deps extends undefined ? OneFunctionComponentContext<Space, Name, Props, Deps> : Deps & OneFunctionComponentContext<Space, Name, Props, Deps>;
export type OneFunctionContextWithDeps<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = undefined> =
    Deps extends undefined ? OneFunctionContext<Space, Name, Arguments, Return, Deps> : Deps & OneFunctionContext<Space, Name, Arguments, Return, Deps>;

export type OneAtomContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"atoms", Name, Props, Deps>;

export type OneMoleculeContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"molecules", Name, Props, Deps>;

export type OneMoleculeHelperContext<Name extends string, Arguments extends unknown[], Return, Deps = undefined> = OneFunctionContextWithDeps<"moleculesHelpers", Name, Arguments, Return, Deps>;

export type OneCellContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"cells", Name, Props, Deps>;
export type OneOrganContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"organs", Name, Props, Deps>;
