/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType } from "react";

type ExtractProps<F> =
    F extends ComponentType<infer P> ? P : never;
//
// type ExtractArgs<F> =
//     F extends (props: any, ...args: infer A) => any ? A : never;
//
// type ExtractReturn<F> =
//     F extends (props: any, ...args: any[]) => infer R ? R : never;

type UnionToIntersection<U> =
    (U extends any ? (x: U) => void : never) extends (x: infer I) => void
        ? I
        : never;

type DepsFromComponents<Comps extends Record<string, ComponentType<any>>> =
    UnionToIntersection<
        {
            [K in keyof Comps]:
            ExtractProps<Comps[K]> extends { deps: infer C }
                ? C
                : never
        }[keyof Comps]
    >;

let i = 1;
export function extractComponentDeps<
    Comps extends Record<string, ComponentType<any>>
>(
    components: {
        [K in keyof Comps]:
        ExtractProps<Comps[K]> extends { deps: unknown }
            ? Comps[K]
            : never
    }
) {
    let useDeps: () => DepsFromComponents<Comps>;

    const result = Object.fromEntries(Object.entries(components).map(([name, Original]) => {
        const Component = (...args: unknown[]): unknown => {
            const [props] = args;
            const deps = useDeps();
            const propsWithDeps = isPlainObject(props) ? {
                ...props,
                deps
            } : { deps };
            return <Original {...propsWithDeps} />;
        }
        if ("displayName" in Original) {
            (Component as { displayName?: string }).displayName = `${Original.displayName}_${i++}`;
        } else if ("name" in Original) {
            (Component as { displayName?: string }).displayName = `${Original.name}_${i++}`;
        }
        return [name, Component];
    }))

    return {
        output: result as unknown as {
            [K in keyof Comps]: ComponentType<Omit<ExtractProps<Comps[K]>, 'deps'>>
        },
        setDepsHook: (getter: () => DepsFromComponents<Comps>) => {
            useDeps = getter;
        },
    };
}

export const blankDeps = <T,>(output: T) => ({
    output,
    setDepsHook: () => {},
})

function isPlainObject(x: unknown): x is object {
    return typeof x === 'object' && x !== null;
}

