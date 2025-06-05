import { WithDeps } from "@atomic-design/di";
import { LinkStyles } from "@atomic-design/styles-base";
import { LinkAtomProps } from "~/types";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";

export function Link(props: LinkAtomProps & WithDeps<LinkStyles>) {
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
