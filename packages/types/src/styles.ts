import { ClassNames, OneStyleContext } from "@atomic-design/di";

export type Style <T extends keyof Styles> = Styles[T];

export type StyleContext <T extends keyof Styles> = OneStyleContext<T, Style<T>>;

export interface Styles {
    link: ManyPartsContainer & Interactive & WithColors & WithSize;
    button: ManyPartsContainer & Interactive & WithColors & WithSize;
    input: InputContainer & Interactive & WithColors & WithSize & InputType & EditAndRead;
    header: ManyPartsContainer;
    footer: ManyPartsContainer;
    separator: Container;
    card: CardPartsContainer & WithColors & WithSize;
    section: SectionPartsContainer & WithColors & WithSize;
    table: Required<ClassNames<"table">> & WithColors & WithSize;
    td: Required<ClassNames<"td">>;
    th: Required<ClassNames<"th">>;
    color: Container;
}

export type Interactive = ClassNames<"disabled" | "active" | "focus">;
export type WithColors = ClassNames<"colorPrimary" | "colorSecondary" | "colorAccent" | "colorSuccess" | "colorDanger" | "colorWarning" | "colorInfo">;
export type WithSize = ClassNames<"sizeSmall" | "sizeMedium" | "sizeLarge">;
export type Container = Required<ClassNames<"container">>;
export type ManyPartsContainer = Container & ClassNames<"icon" | "before" | "content" | "after">;
export type CardPartsContainer = Container & ClassNames<"thumbnail" | "before" | "content" | "after">;
export type SectionPartsContainer = Container & ClassNames<"icon" | "caption" | "subcaption" | "content">;
export type InputType = ClassNames<"typeBoolean" | "typeTextarea">;
export type InputContainer = Container & ClassNames<"label" | "before" | "content" | "after">;
export type EditAndRead = ClassNames<"read" | "editInRead" | "canEditInRead">;
