import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function TD (props: Atoms.AtomProps<"TD"> & WithDeps<Styles.StyleContext<"td">>) {
    const { children, deps } = props;
    return (
        <td className={deps.styles.td.td}>
            {children}
        </td>
    );
}
