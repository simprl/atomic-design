import { type atomsContext } from "~/index";
import { type Atoms } from "@atomic-design/types";
import { type DepsWithoutDeps } from "@atomic-design/di";

const atomsContextWithoutDeps = {} as DepsWithoutDeps<typeof atomsContext>;

atomsContextWithoutDeps as Atoms.AtomContext<"Button">;
atomsContextWithoutDeps as Atoms.AtomContext<"Card">;
atomsContextWithoutDeps as Atoms.AtomContext<"Section">;
atomsContextWithoutDeps as Atoms.AtomContext<"Table">;
atomsContextWithoutDeps as Atoms.AtomContext<"TD">;
atomsContextWithoutDeps as Atoms.AtomContext<"TH">;
atomsContextWithoutDeps as Atoms.AtomContext<"Color">;
