import type { WithDeps } from "@atomic-design/di";
import { Atoms, Store } from "@atomic-design/types";
import { designTokens } from "~/database/designTokens";
import { OneContextItem } from "@atomic-design/di";
import React from "react";
import { DesignTokens } from "~/components/sections/design-tokens/i18n/types";

type Deps = Atoms.AtomContext<"TD">
    & Atoms.AtomContext<"TH">
    & Atoms.AtomContext<"Color">
    & Atoms.AtomContext<"Section">
    & Store.StoreHooksContext<"useSpace">
    & Store.StoreHooksContext<"useValue">
    & OneContextItem<"i18n", "designTokens", DesignTokens>;

export const ColorsTokens = (props: WithDeps<Deps>) => {
    const { deps: {
        atoms: {
            Section
        },
        i18n: { designTokens: { colorsTokens } }
    } } = props;

    const description = colorsTokens.description({
        module: '@atomic-design/design-tokens',
        tokensTable: <ColorsTokensTable deps={props.deps} />
    })

    return <Section caption={colorsTokens.title} >
        {description}
    </Section>;
}

function ColorsTokensTable (props: WithDeps<Atoms.AtomContext<"TD"> & Atoms.AtomContext<"TH"> & Atoms.AtomContext<"Color">>) {

    const colorsEntries = Object.entries(designTokens).filter(([,{ space, kind, step }]) => step && space === 'color' && kind && !['background', 'text', 'border'].includes(kind));
    const tokens = Object.fromEntries(colorsEntries);

    const kinds = [...new Set(colorsEntries.map(([, { kind }]) => kind))] as string[];
    const steps = [...new Set(colorsEntries.map(([, { step }]) => step))] as string[];

    const { deps: {
        atoms: {
            TD, TH, Color
        },
    } } = props;

    return <table>
        <thead>
            <tr>
                <TH />{steps.map((step) => <TH key={step}>{step}</TH>)}
            </tr>
        </thead>
        <tbody>
            {kinds.map((kind) => <tr key={kind}>
                <TH>{kind}</TH>
                {steps.map((step) => <TD key={step}>
                    <Color color={tokens[getToken("color", kind, step)].value} />
                </TD>)}
            </tr>)}
        </tbody>
    </table>;
}

function getToken(space: string, kind: string, step: string) {
   return `${space}-${kind}-${step}`;
}


