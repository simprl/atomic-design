import { OneContextItem } from "@atomic-design/di";

export interface StoreHooks {
    useSpace: () => SpaceValue;
    useValue: (space: string | undefined, path: string | undefined) => unknown;
    useValueText: (space: string | undefined, path: string | undefined, emptyValue?: string) => string | undefined;
}
export type StoreHook <T extends keyof StoreHooks> = StoreHooks[T];

export type StoreHooksContext <T extends keyof StoreHooks> = OneContextItem<"storeHooks", T, StoreHooks[T]>;

export interface SpaceValue {
    type: SpaceType;
    space: string;
    paths: string[];
}

export const SpaceTypes = {
    FORM_ROOT: "FORM_ROOT",
    LIST_HEADER: "LIST_HEADER",
    LIST_ROW: "LIST_ROW",
    SUBLIST_HEADER: "SUBLIST_HEADER",
    SUBLIST_ROW: "SUBLIST_ROW",
    FORM_FILTER: "FORM_FILTER",
    LIST_FOOTER: "LIST_FOOTER",
} as const;

export type SpaceType = typeof SpaceTypes[keyof typeof SpaceTypes];
