import { InteractiveProps, LinkAtomProps } from "~/types";
import { Interactive, WithColors } from "@atomic-design/styles-base";

export function classNameByColor(color: LinkAtomProps["color"], classNames: WithColors): string | undefined {
    switch (color) {
        case "Primary": return classNames.colorPrimary;
        case "Secondary": return classNames.colorSecondary;
        case "Success": return classNames.colorSuccess;
        case "Accent": return classNames.colorAccent;
        case "Info": return classNames.colorInfo;
        case "Warning": return classNames.colorWarning;
        case "Danger": return classNames.colorDanger;
    }
}

export function classNameByInteractive(props: InteractiveProps, classNames: Interactive): (string | undefined)[] {
    const result = [];
    if (props.active) result.push(classNames.active);
    if (props.disabled) result.push(classNames.disabled);
    if (props.focus) result.push(classNames.focus);
    return result;
}
