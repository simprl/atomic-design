import type { WithDeps } from "@atomic-design/di";
import { memo } from "react";
import type { Molecules, MoleculesHooks, Atoms } from "@atomic-design/types";

export const Link = memo(function Link(props: Molecules.MoleculeProps<"Link"> & WithDeps<Atoms.AtomContext<"Link"> & MoleculesHooks.MoleculeHooksContext<"useLinkProps">>) {
    const { href, deps, active, ...otherProps } = props;
    const { atoms: { Link }, moleculesHooks: { useLinkProps } } = deps;
    const linkProps = useLinkProps(href);
    return <Link {...otherProps} {...linkProps} />
});
