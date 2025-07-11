/* eslint-disable @typescript-eslint/no-explicit-any */

import { DepsWithoutDeps } from "./types";
import { createContext, ReactNode, use, useContext, useMemo, ComponentType, Suspense } from "react";

const throwingObj = {};

export function createVariantsContext <
    Ctx extends DepsWithoutDeps<Record<string, unknown>>,
    V extends Partial<Record<keyof Ctx, Record<string, () => WrappedPromise<Ctx[keyof Ctx], Ctx>>>>,
>(context: {[SpaceName in keyof Ctx]: () => WrappedPromise<Ctx[SpaceName], Ctx>}, variantsBySpace: V) {
    const variantManager = createVariantsManager(context, variantsBySpace);

    const initVariants = variantManager.getInitVariants();
    const reactContext = createContext(initVariants);
    const { Provider } = reactContext;

    const useAtomic = () => {
        const value = use(reactContext);
        if (value === initVariants){
            throw new Error(`Need to wrap into Provider`);
        }
        return value.context;
    }

    variantManager.setDepsHook(() => useAtomic());

    const AtomicProvider = ({children, variants, space, variant }: AtomicProviderProps<(typeof initVariants)["variants"]>) => {
        const parent = useContext(reactContext);
        const value = useMemo(async () => {
            const parentVariants = parent.variants;
            const newVariants = mergeVariants(parentVariants, variants, space, variant);
            const newContext = await variantManager.getVariant(newVariants);
            return { variants: newVariants, context: newContext };
        }, [parent, variants, space, variant]);
        const v = use(value);
        return <Provider value={v} >{children}</Provider>
    }

    const SuspenseProvider: typeof AtomicProvider = (props) => <Suspense><AtomicProvider {...props}/></Suspense>

    type ComponentKeys<Space extends keyof Ctx> =
        {
            [Name in keyof Ctx[Space]]: Ctx[Space][Name] extends ComponentType<any>
            ? Name
            : never
        }[keyof Ctx[Space]];

    type PropsOf<
        Space extends keyof Ctx,
        Name extends ComponentKeys<Space>
    > =
        Ctx[Space][Name] extends ComponentType<infer P>
            ? P
            : never;

    function getServerReadyComponent<
        Space extends keyof Ctx,
        Name extends ComponentKeys<Space>,
    >(
        space: Space,
        name: Name
    ): ComponentType<PropsOf<Space, Name>> {
        const Wrapped: ComponentType<PropsOf<Space, Name>> = (props) => {
            // TS now knows Molecule is ComponentType<PropsOf<Space,Name>>
            const Molecule = useAtomic()[space][name] as ComponentType<PropsOf<Space, Name> | unknown>;
            return <Molecule {...(props || {})} />;
        };
        return Wrapped;
    }

    return [useAtomic, SuspenseProvider, getServerReadyComponent] as [
        typeof useAtomic,
        typeof AtomicProvider,
        typeof getServerReadyComponent
    ]
}

interface AtomicProviderProps<Variants extends Record<string, unknown>> {
    children: ReactNode;
    variants?: Partial<Variants>;
    space?: keyof Variants;
    variant?: Variants[keyof Variants];
}

function mergeVariants<OriginalVariants extends Record<string, unknown>, Variants extends OriginalVariants>(
    parentVariants: OriginalVariants,
    variants?: Variants,
    space?: keyof Variants,
    variant?: Variants[keyof Variants]
) {
    const combined: OriginalVariants = { ...parentVariants };
    if (variants) {
        Object.assign(combined, variants);
    }
    if (space && space) {
        Object.assign(combined, { [space]: variant });
    }
    return combined as OriginalVariants;
}

type Wrapped<OutputContext, InputContext> =  {
    output: OutputContext;
    setDepsHook: (c: () => InputContext) => void;
}

type WrappedPromise<OutputContext, InputContext> = Wrapped<OutputContext, InputContext> | Promise<Wrapped<OutputContext, InputContext>>;

function createVariantsManager <
    Ctx extends DepsWithoutDeps<Record<string, unknown>>,
    V extends Partial<Record<keyof Ctx, Record<string, () => WrappedPromise<Ctx[keyof Ctx], Ctx>>>>,
>(context: {[SpaceName in keyof Ctx]: () => WrappedPromise<Ctx[SpaceName], Ctx>}, variantsBySpace: V) {
    let useContextHook: () => Ctx;
    const useContext = () => useContextHook();
    const getVariant = async (selectedVariants: {[SpaceName in keyof Ctx]?: keyof V[SpaceName]}) => {
        const promises = Object.entries(context).map(
            async ([spaceName, spaceValue]: [keyof Ctx, () => WrappedPromise<Ctx[keyof Ctx], Ctx>]) => {
                const selectedVariant = selectedVariants[spaceName] as string;
                if(selectedVariant) {
                    const variants = variantsBySpace[spaceName];
                    if (variants) {
                        const valueLoader = variants[selectedVariant];
                        if (valueLoader) {
                            const wrapped = await valueLoader();
                            wrapped.setDepsHook(useContext);
                            return [spaceName, wrapped.output] as [keyof Ctx, Ctx];
                        }
                    }
                }
                const wrapped = await spaceValue();
                wrapped.setDepsHook(useContext)
                return [spaceName, wrapped.output];
            }
        );
        const entries = await Promise.all(promises);
        return Object.fromEntries(entries) as Ctx;
    }
    const getInitVariants = () => throwingObj as {
        variants: {[SpaceName in keyof Ctx]?: keyof V[SpaceName]};
        context: Ctx;
    };

    const setDepsHook = (newUseContextHook: () => Ctx) => {
        useContextHook = newUseContextHook
    }
    return {
        getVariant,
        getInitVariants,
        setDepsHook,
    }
}
