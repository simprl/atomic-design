"use client"
import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePathname } from "next/navigation";

const atomicContext = {
    contextName: () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculeHooks: () => blankDeps({
        useLinkProps: (href?: string) => {
            const pathname = usePathname() || '/'
            if (href === undefined) {
                return false;
            }
            return href === '/' ? pathname === href : pathname.startsWith(href);
        }
    }),
};

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext(atomicContext, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }
