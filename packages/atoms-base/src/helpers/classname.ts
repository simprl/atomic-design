import { Atoms, Styles } from "@atomic-design/types";

export function classNameByColor(color: Atoms.ColorsProps["color"], classNames: Styles.WithColors): string | undefined {
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

export function classNameByInteractive(props: Atoms.InteractiveProps, classNames: Styles.Interactive): (string | undefined)[] {
    const result = [];
    if (props.active) result.push(classNames.active);
    if (props.disabled) result.push(classNames.disabled);
    if (props.focus) result.push(classNames.focus);
    return result;
}
