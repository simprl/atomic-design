import type { WithDeps } from "@atomic-design/di";
import { OneContextItem } from "@atomic-design/di";
import React from "react";
import { DesignTokens } from "~/components/sections/design-tokens/i18n/types";

type Deps = OneContextItem<"i18n", "designTokens", DesignTokens>;

export const DesignTokensHeader = (props: WithDeps<Deps>) => {
    return <h1>{props.deps.i18n.designTokens.pageTitle}</h1>;
}
