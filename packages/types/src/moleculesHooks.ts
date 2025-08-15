import { OneContextItem } from "@atomic-design/di";
import type { AtomProps } from "./atoms";

export interface MoleculesHooks {
    useLinkProps: (href: string | undefined) => AtomProps<"Link">;
}

export type MoleculesHook <T extends keyof MoleculesHooks> = MoleculesHooks[T];

export type MoleculeHooksContext<T extends keyof MoleculesHooks> = OneContextItem<"moleculesHooks", T, MoleculesHooks[T]>;
