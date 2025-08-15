import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export const Table = (props: Atoms.AtomProps<"Table"> & WithDeps<Styles.StyleContext<"table">>) => {
    const { children, deps } = props;
    return (
        <table className={deps.styles.table.table}>
            {children}
        </table>
    );
}
