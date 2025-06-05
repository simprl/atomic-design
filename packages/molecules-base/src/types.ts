import type { OneMoleculeContext, OneMoleculeHelperContext } from "@atomic-design/di";
import type { LinkAtomProps, LinkAtomContext, ButtonAtomContext, ButtonAtomProps } from "@atomic-design/atoms-base";

export type MoleculesContext = LinkMoleculeContext & ButtonMoleculeContext;

export type LinkMoleculeContext = OneMoleculeContext<"Link", LinkAtomContext & UseIsActiveLinkContext, LinkMoleculeProps>;
export type UseIsActiveLinkContext = OneMoleculeHelperContext<"useIsActiveLink", [string | undefined], boolean>;
export type LinkMoleculeProps = LinkAtomProps;

export type ButtonMoleculeContext = OneMoleculeContext<"Button", ButtonAtomContext, ButtonMoleculeProps>;
export type ButtonMoleculeProps = ButtonAtomProps;

//
// export interface InteractiveProps {
//     readonly disabled?: boolean;
//     readonly active?: boolean;
//     readonly focus?: boolean;
// }
//
// type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";
//
// export interface ColorsProps {
//     readonly color?: Colors;
// }
//
// type Sizes = "small" | "medium" | "large";
//
// export interface SizeProps {
//     readonly size?: Sizes;
// }
//
// type InputTypes = "input" | "textarea" | "boolean";
//
// export interface InputTypeProps {
//     readonly inputType?: InputTypes;
// }
//
// export interface EditAndReadProps {
//     readonly read?: boolean;
//     readonly editInRead?: boolean;
//     readonly canEditInRead?: boolean;
// }
//
// export interface Container {
//     readonly children: ReactNode;
// }
//
// export interface ManyPartsContainer extends Container {
//     readonly icon?: ReactNode;
//     readonly before?: ReactNode;
//     readonly after?: ReactNode;
// }
//
// export interface InputContainer extends Container {
//     readonly label?: ReactNode;
//     readonly before?: ReactNode;
//     readonly after?: ReactNode;
// }


