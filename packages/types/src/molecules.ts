import type { OneContextItem } from "@atomic-design/di";
import { AtomProps } from "./atoms";
import { ComponentType } from "react";

export type MoleculeContext<T extends keyof MoleculesProps> = OneContextItem<"molecules", T, ComponentType<MoleculeProps<T>>>;

export type MoleculeProps<T extends keyof MoleculesProps> = MoleculesProps[T];

export interface MoleculesProps {
    Link: AtomProps<"Link">;
    Button: AtomProps<"Button">;
    Card: AtomProps<"Card">;
    Table: AtomProps<"Table">;
    TD: AtomProps<"TD">;
    TH: AtomProps<"TH">;
}
