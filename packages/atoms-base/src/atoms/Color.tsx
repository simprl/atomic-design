import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function Color (props: Atoms.AtomProps<"Color"> & WithDeps<Styles.StyleContext<"color">>) {
    const { children, color, deps } = props;
    return (
        <div title={color} style={{ background: color }} className={deps.styles.color.container}>
            {children}
        </div>
    );
}
