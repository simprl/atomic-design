import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function TH(props: Atoms.AtomProps<"TH"> & WithDeps<Styles.StyleContext<"th">>){
    const { children, deps } = props;
    return (
        <th className={deps.styles.th.th}>
            {children}
        </th>
    );
}
