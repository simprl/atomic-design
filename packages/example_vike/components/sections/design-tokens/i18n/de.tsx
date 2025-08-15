import { DesignTokens } from "./types";

export const designTokens: DesignTokens = {
    pageTitle: "Design Tokens",
    colorsTokens: {
        title: "Farb-Tokens",
        description: ({ module, tokensTable }) => (
            <>
                <p>Diese Demo zeigt die Kern-Design-Tokens von <code>{module}</code>.</p>
                {tokensTable}
            </>
        ),
    },
};
