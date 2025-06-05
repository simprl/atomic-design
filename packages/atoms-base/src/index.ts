import { Link } from "./atoms/Link";
import { AtomsContext } from "./types";
import { Button } from "./atoms/Button";

export type * from "./types";

export const atomsContext: Pick<AtomsContext, "atoms"> = {
    atoms: {
        Link,
        Button,
    }
};
