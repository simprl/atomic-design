import type { WithDeps } from '@atomic-design/di';
import type { Atoms, Styles } from '@atomic-design/types';

export function Card(props: Atoms.AtomProps<"Card"> & WithDeps<Styles.StyleContext<"card">>) {
    const { thumbnail, before, after, children, deps } = props;
    const styles = deps.styles.card;

    return (
        <div className={styles.container}>
            {thumbnail && <div className={styles.thumbnail}>{thumbnail}</div>}
            {before && <div className={styles.before}>{before}</div>}
            {children && <div className={styles.content}>{children}</div>}
            {after && <div className={styles.after}>{after}</div>}
        </div>
    );
}
