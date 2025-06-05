"use client"
import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePageContext } from "vike-react/usePageContext";

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext({
    "contextName": () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculesHelpers: () => blankDeps({
        useIsActiveLink: (href?: string) => {
            const pageContext = usePageContext();
            if (href === undefined) {
                return false;
            }
            const { urlPathname } = pageContext;
            return href === "/" ? urlPathname === href : urlPathname.startsWith(href);
        }
    }),
}, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }
