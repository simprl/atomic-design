import type { WithDeps } from '@atomic-design/di';
import type { Atoms, Styles } from "@atomic-design/types";

export function Section(props: Atoms.AtomProps<"Section"> & WithDeps<Styles.StyleContext<"section">>) {
    const { caption, subcaption, children, deps } = props;
    const styles = deps.styles.section;

    return (
        <div className={styles.container}>
            {caption && <h2 className={styles.caption}>{caption}</h2>}
            {subcaption && <div className={styles.subcaption}>{subcaption}</div>}
            {children && <div className={styles.content}>{children}</div>}
        </div>
    );
}
