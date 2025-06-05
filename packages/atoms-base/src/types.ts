import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import type { OneAtomContext } from "@atomic-design/di";
import type { LinkStyles, ButtonStyles } from "@atomic-design/styles-base";

export type AtomsContext = LinkAtomContext & ButtonAtomContext;

export type LinkAtomContext = OneAtomContext<"Link", LinkStyles, LinkAtomProps>;
export type LinkAtomProps = ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonAtomContext = OneAtomContext<"Button", ButtonStyles, ButtonAtomProps>;
export type ButtonAtomProps = ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ButtonHTMLAttributes<HTMLButtonElement>;

export interface InteractiveProps {
    readonly disabled?: boolean;
    readonly active?: boolean;
    readonly focus?: boolean;
}

type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";

export interface ColorsProps {
    readonly color?: Colors;
}

type Sizes = "small" | "medium" | "large";

export interface SizeProps {
    readonly size?: Sizes;
}

type InputTypes = "input" | "textarea" | "boolean";

export interface InputTypeProps {
    readonly inputType?: InputTypes;
}

export interface EditAndReadProps {
    readonly read?: boolean;
    readonly editInRead?: boolean;
    readonly canEditInRead?: boolean;
}

export interface Container {
    readonly children: ReactNode;
}

export interface ManyPartsContainer extends Container {
    readonly icon?: ReactNode;
    readonly before?: ReactNode;
    readonly after?: ReactNode;
}

export interface InputContainer extends Container {
    readonly label?: ReactNode;
    readonly before?: ReactNode;
    readonly after?: ReactNode;
}


