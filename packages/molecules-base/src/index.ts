import { MoleculesContext } from "./types";
import { Link } from "./molecules/Link";
import { Button } from "~/molecules/Button";

export type * from "./types";

export const moleculesContext: Pick<MoleculesContext, "molecules"> = {
    molecules: {
        Link,
        Button,
    }
};
