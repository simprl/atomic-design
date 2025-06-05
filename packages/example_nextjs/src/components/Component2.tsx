"use client"
import React from "react";
// import { getLocale } from "~/lib/localeContext";
import { Component1 } from "~/components/Component1";
import { useAtomic } from "~/components/atomicContext";

interface Props {
    children: React.ReactNode;
}

export const Component2 = ({ children }: Props) => {
    // const clientLocale = getClientLocale("Component2");
    const context = useAtomic();
    const { contextName: locale, /*molecules: { LinkMolecule } */} = context;

    const [state, setState] = React.useState<string>(locale);
    // useEffect(() => setState(clientLocale), [clientLocale])
    // console.log("Component2", { LinkMolecule });
    return <div onClick={() => setState("ddddd")}>
        <h3>Start Component2</h3>
        {/*<LinkMolecule href="/">sss2</LinkMolecule>*/}
        <div>locale: {locale}</div>
        <div>state: {state}</div>
        <div>children: {children}</div>
        <h3>End Component2</h3>
        <Component1 />
    </div>;
}
