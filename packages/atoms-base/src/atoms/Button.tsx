import type { WithDeps } from "@atomic-design/di";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";
import { useState } from "react";
import type { Atoms, Styles } from "@atomic-design/types";

export function Button(props: Atoms.AtomProps<"Button"> & WithDeps<Styles.StyleContext<"button">>) {
    const { children, icon, before, after, color = "Primary", deps } = props;
    const classNames = deps.styles.button;
    const containerClassNames = [
        classNames.container,
        classNameByColor(color, classNames),
        ...classNameByInteractive(props, classNames),
    ]
    useState();
    return <button className={containerClassNames.join(' ')}>
        {icon && <div className={classNames.icon}>{icon}</div>}
        {before && <div className={classNames.before}>{before}</div>}
        {children && <div className={classNames.content}>{children}</div>}
        {after && <div className={classNames.after}>{after}</div>}
    </button>
}
