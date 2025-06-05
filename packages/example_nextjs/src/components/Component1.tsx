"use client"
import React from "react";
import { useAtomic, AtomicProvider } from "~/components/atomicContext";

interface Props {
    children?: React.ReactNode;
}
export const Component1 = ({children}: Props) => {
    const context = useAtomic();
    const { molecules: {Link} } = context;
    // console.log("Component1", LinkMolecule );
    return <div>
        <h3>Start Component1</h3>

        <AtomicProvider space="contextName" variant="v1">
            <Link href="/">sss4</Link>
        </AtomicProvider>
        {/*<div>locale: {ttt}</div>*/}
        <div>children: {children}</div>
        <h3>End Component1</h3>
    </div>;

}
