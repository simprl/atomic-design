import { DesignTokens } from "./types";

export const designTokens: DesignTokens = {
    pageTitle: "Design Tokens",
    colorsTokens: {
        title: "Colors Tokens",
        description: ({ module, tokensTable }) => <>
            <p>This demo shows core design tokens from <code>{module}</code>.</p>
            {tokensTable}
        </>
    }
};
