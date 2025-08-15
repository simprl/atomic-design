import React from 'react';
import { getServerReadyComponent } from "~/components/atomicContext";

export const ColorsTokens = getServerReadyComponent("sections", "ColorsTokens");
export const DesignTokensHeader = getServerReadyComponent("sections", "DesignTokensHeader");
export const SpacesTokens = getServerReadyComponent("sections", "SpacesTokens");

export default function Page() {
    return <>
        <DesignTokensHeader />
        <ColorsTokens />
        <SpacesTokens />
    </>;
}
