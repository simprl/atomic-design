import { ClassNames, OneStyleContext } from "@atomic-design/di";

export type StylesContext =
    LinkStyles
    & ButtonStyles
    & InputStyles
    & HeaderStyles
    & FooterStyles
    & SeparatorStyles;

export type LinkStyles = OneStyleContext<"link", ManyPartsContainer & Interactive & WithColors & WithSize>;
export type ButtonStyles = OneStyleContext<"button", ManyPartsContainer & Interactive & WithColors & WithSize>;
export type InputStyles = OneStyleContext<"input", InputContainer & Interactive & WithColors & WithSize & InputType & EditAndRead>;
export type HeaderStyles = OneStyleContext<"header", ManyPartsContainer>;
export type FooterStyles = OneStyleContext<"footer", ManyPartsContainer>;
export type SeparatorStyles = OneStyleContext<"separator", Container>;

export type Interactive = ClassNames<"disabled" | "active" | "focus">;
export type WithColors = ClassNames<"colorPrimary" | "colorSecondary" | "colorAccent" | "colorSuccess" | "colorDanger" | "colorWarning" | "colorInfo">;
export type WithSize = ClassNames<"sizeSmall" | "sizeMedium" | "sizeLarge">;
export type Container = ClassNames<"container">;
export type ManyPartsContainer = Container & ClassNames<"icon" | "before" | "content" | "after">;
export type InputType = ClassNames<"typeBoolean" | "typeTextarea">;
export type InputContainer = Container & ClassNames<"label" | "before" | "content" | "after">;
export type EditAndRead = ClassNames<"read" | "editInRead" | "canEditInRead">;
