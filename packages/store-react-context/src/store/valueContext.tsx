import { ReactNode, createContext, useMemo, useContext } from "react";
import { Store } from "@atomic-design/types";
import { get } from "lodash-es";

const ValueContext = createContext<Record<string, { value: unknown, meta: unknown }>>({});

export interface ValueProviderProps {
    name: string;
    value: unknown;
    meta?: unknown;
    children: ReactNode;
}

export const ValueProvider = ({ name, value, meta, children }: ValueProviderProps) => {
    const parent = useContext(ValueContext);
    const newValue = useMemo(() => ({
        ...parent,
        [name]: { ...parent[name], value, meta }
    }), [parent, name, value]);
    return <ValueContext.Provider value={newValue} >
        {children}
    </ValueContext.Provider>
};

export const useValue: Store.StoreHook<"useValue"> = (space, path) => {
    return get(useContext(ValueContext), [space,'value',path].filter(Boolean).join('.')) as unknown;
}

export const useValueText: Store.StoreHook<"useValueText"> = (space, path, emptyValue) => {
    return (useValue(space, path) as string | undefined) ?? emptyValue;
}
