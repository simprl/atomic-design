import { ReactNode } from "react";

export interface DesignTokens {
    pageTitle: string,
    colorsTokens: {
        title: string,
        description: (props: { module: string, tokensTable: ReactNode }) => ReactNode
    }
}
