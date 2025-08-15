import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePageContext } from "vike-react/usePageContext";
import { useMemo } from "react";
import { PageContext } from "vike/types";

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext({
    "contextName": () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculesHooks: () => blankDeps({
        useLinkProps: (href?: string) => {
            const pageContext = usePageContext();
            const { urlPathname, locale } = pageContext as PageContext & { locale: string };
            const linkProps = useMemo(() => {
                const active = href === undefined ? false : href === "/" ? urlPathname === href : urlPathname.startsWith(href)
                return {
                    href: `/${locale}${href}`,
                    active,
                };
            }, [href, urlPathname]);
            return linkProps;
        }
    }),
    // cells: () => {
    //     const Color = ({ name = "color", deps: { molecules: { Field } }, signals: { useValue } })  => {
    //         return <Field {...useFieldProps(name)} />
    //     }
    //     return extractComponentDeps({
    //         Color,
    //     })
    // },
    sections: async () => {
        const designTokens = await import('~/components/sections/design-tokens');
        const sections = {
            ...designTokens
        }
        return extractComponentDeps(sections);
    },
    storeHooks: async () => {
        const { storeHooks } = (await import("@atomic-design/store-react-context")).storeContext;
        return blankDeps(storeHooks);
    },
    storeComponents: async () => {
        const { storeComponents } = (await import("@atomic-design/store-react-context")).storeContext;
        return blankDeps(storeComponents);
    },
    i18n: async () => {
        const i18n = await import('~/components/i18n/en');
        return blankDeps(i18n);
    }
}, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    },
    i18n: {
        ['en-US']: async () =>
            blankDeps(await import('~/components/i18n/en')),
        ['de-DE']: async () =>
            blankDeps(await import('~/components/i18n/de')),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }
