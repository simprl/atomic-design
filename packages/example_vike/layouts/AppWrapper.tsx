import * as React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { AtomicProvider } from "~/components/atomicContext";
import { locales } from "~/locales";
import { useMemo } from "react";

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const { locale } = usePageContext() as unknown as { locale: typeof locales[number] };
    const variants = useMemo<Parameters<typeof AtomicProvider>[0]["variants"]>(() => ({
       i18n: locale
    }), [locale]);
    return <AtomicProvider variants={variants}>{ children }</AtomicProvider>;
}
