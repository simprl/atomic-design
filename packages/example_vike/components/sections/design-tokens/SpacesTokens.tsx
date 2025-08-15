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

export const SpacesTokens = (props: WithDeps<Deps>) => {
    const { deps: {
        atoms: {
            Section
        },
        i18n: { designTokens: { colorsTokens } }
    } } = props;

    const description = colorsTokens.description({
        module: '@atomic-design/design-tokens',
        tokensTable: <SpacesTokensTable deps={props.deps} />
    })

    return <Section caption={colorsTokens.title} >
        {description}
    </Section>;
}

function SpacesTokensTable (props: WithDeps<Atoms.AtomContext<"TD"> & Atoms.AtomContext<"TH"> & Atoms.AtomContext<"Color">>) {

    const spacesEntries = Object.entries(designTokens).filter(([,{ space, step }]) => step && space === 'spacing');
    const tokens = Object.fromEntries(spacesEntries);

    const steps = [...new Set(spacesEntries.map(([, { step }]) => step))] as string[];

    const { deps: {
        atoms: {
            TD, TH
        },
    } } = props;

    return <table>
        <tbody>
            {steps.map((step) => {
                const value = tokens[getToken("spacing", step)].value;
                const el = <div style={{ width: '20px', height: '20px', backgroundColor: 'grey', margin: value }}/>;
                return <tr key={step}>
                    <TH>{step}</TH>
                    <TD>
                        {value}
                    </TD>
                    <TD>
                        <div style={{ width: "max-content", display: 'flex', flex: '0 0 auto', border: '1px solid grey' }}>{el}</div>
                    </TD>
                </tr>;
            })}
        </tbody>
    </table>;
}

function getToken(space: string, step: string) {
   return `${space}-${step}`;
}


