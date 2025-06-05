import { WithDeps } from "@atomic-design/di";
import { ButtonAtomContext } from "@atomic-design/atoms-base";
import { ButtonMoleculeProps } from "~/types";
import { memo } from "react";

export const Button = memo(function(props: ButtonMoleculeProps & WithDeps<ButtonAtomContext>) {
    const { deps, ...otherProps } = props;
    const { atoms: { Button } } = deps;
    return <Button {...otherProps} />
});

Button.displayName = "ButtonMolecule";
