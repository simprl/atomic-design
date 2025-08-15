import { ComponentProps, type ComponentType } from "react";
import { OneContextItem, ReactNodes } from "@atomic-design/di";

export type AtomContext<T extends keyof AtomsProps> = OneContextItem<"atoms", T, ComponentType<AtomProps<T>>>;

export interface AtomsProps {
    Link: ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ComponentProps<"a">;
    Button: ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ComponentProps<"button">;
    Card: CardPartsContainer & ColorsProps & SizeProps & ComponentProps<"div">;
    Section: SectionPartsContainer & ColorsProps & SizeProps & ComponentProps<"div">;
    Table: ComponentProps<"table">;
    TD: ComponentProps<"td">;
    TH: ComponentProps<"th">;
    Color: ComponentProps<"div"> & { color?: string };
}
export type AtomProps<T extends keyof AtomsProps> = AtomsProps[T];

export interface InteractiveProps {
    readonly disabled?: boolean;
    readonly active?: boolean;
    readonly focus?: boolean;
}

export type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";

export interface ColorsProps {
    readonly color?: Colors;
}

export type Sizes = "small" | "medium" | "large";

export interface SizeProps {
    readonly size?: Sizes;
}

export type InputTypes = "input" | "textarea" | "boolean";

export interface InputTypeProps {
    readonly inputType?: InputTypes;
}

export interface EditAndReadProps {
    readonly read?: boolean;
    readonly editInRead?: boolean;
    readonly canEditInRead?: boolean;
}

export type Container = ReactNodes<"children">;


export type ManyPartsContainer = ReactNodes<"icon" | "before" |"after" >;
export type CardPartsContainer = ReactNodes<"thumbnail" | "before" |"after" >;
export type SectionPartsContainer = ReactNodes<"icon" | "caption" | "subcaption" >;
export type InputContainer = ReactNodes<"label" | "before" |"after" >;
