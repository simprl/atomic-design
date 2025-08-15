import cssTokens from "~/database/designTokens/styles.module.scss";

export interface Token {
    token: string;
    space: string;
    kind?: string;
    step?: string;
    value: string;
}

const nameParsers = {
    border: ([step]: string[]) => ({ step }),
    color: ([kind, step]: string[]) => ({ kind, step }),
    breakpoint: ([step]: string[]) => ({ step }),
    shadow: ([step]: string[]) => ({ step }),
    width: ([step]: string[]) => ({ step }),
    height: ([step]: string[]) => ({ step }),
    spacing: ([step]: string[]) => ({ step }),
    fontSize: ([kind, step]: string[]) => ({ kind, step }),
    lineHeight: ([kind, step]: string[]) => ({ kind, step }),
    fontWeight: ([kind, step]: string[]) => ({ kind, step }),
    letterSpacing: ([kind, step]: string[]) => ({ kind, step }),
    zIndex: ([kind]: string[]) => ({ kind }),
} as const;

export const designTokens = Object.fromEntries(
    Object.entries(cssTokens)
        .map(([token, value]) => {
            const [space, ...parts] = token.split('-');
            const nameParser = space in nameParsers ? nameParsers[space as keyof typeof nameParsers] : () => ({});
            return [token, { token, space, ...(nameParser ? nameParser(parts) : {}), value } as Token];
        })
);
