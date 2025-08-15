import { memo } from "react";
import { WithDeps } from "@atomic-design/di";
import { Molecules, Atoms } from "@atomic-design/types";

export const Button = memo(function Button(props: Molecules.MoleculeProps<"Button"> & WithDeps<Atoms.AtomContext<"Button">>) {
    const { deps, ...otherProps } = props;
    const { atoms: { Button } } = deps;
    return <Button {...otherProps} />
});
