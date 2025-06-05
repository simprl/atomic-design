import { WithDeps } from "@atomic-design/di";
import { LinkAtomContext } from "@atomic-design/atoms-base";
import { LinkMoleculeProps, UseIsActiveLinkContext } from "~/types";
import { memo } from "react";

export const Link = memo(function(props: LinkMoleculeProps & WithDeps<UseIsActiveLinkContext & LinkAtomContext>) {
    const { href, deps, active, ...otherProps } = props;
    const { atoms: { Link }, moleculesHelpers: { useIsActiveLink } } = deps;
    const isActive = useIsActiveLink(href);
    return <Link {...otherProps} href={href} active={active !== undefined ? active : isActive} />
});

Link.displayName = "LinkMolecule";
