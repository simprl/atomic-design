import type { WithDeps } from "@atomic-design/di";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";
import type { Atoms, Styles } from "@atomic-design/types";

export function Link(props: Atoms.AtomProps<"Link"> & WithDeps<Styles.StyleContext<"link">>) {
    const { children, icon, before, after, href, color = "Primary", deps } = props;
    const classNames = deps.styles.link;
    const containerClassNames = [
        classNames.container,
        classNameByColor(color, classNames),
        ...classNameByInteractive(props, classNames),
    ]
    return <a href={href} className={containerClassNames.join(' ')}>
        {icon && <div className={classNames.icon}>{icon}</div>}
        {before && <div className={classNames.before}>{before}</div>}
        {children && <div className={classNames.content}>{children}</div>}
        {after && <div className={classNames.after}>{after}</div>}
    </a>
}
