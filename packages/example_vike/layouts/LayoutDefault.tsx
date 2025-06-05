import "./style.css";
import logoUrl from "../assets/logo.svg";
import { Link, AtomicProvider } from "~/components/atomic";
import * as React from "react";

export default function asLayoutDefault({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                display: "flex",
                maxWidth: 900,
                margin: "auto",
            }}
        >
            <Sidebar>
                <Logo/>
                    <AtomicProvider space="contextName" variant="v1">
                        <Link href="/">Welcome</Link>
                        <Link color="Success" href="/todo">Todo</Link>
                        <AtomicProvider space="contextName" variant="v2">
                            <Link href="/star-wars">Data Fetching</Link>
                        </AtomicProvider>
                    </AtomicProvider>
            </Sidebar>
            <Content>{children}</Content>
        </div>
    );
}

function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="sidebar"
            style={{
                padding: 20,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.8em",
                borderRight: "2px solid #eee",
            }}
        >
            {children}
        </div>
    );
}

function Content({ children }: { children: React.ReactNode }) {
    return (
        <div id="page-container">
            <div
                id="page-content"
                style={{
                    padding: 20,
                    paddingBottom: 50,
                    minHeight: "100vh",
                }}
            >
                {children}
            </div>
        </div>
    );
}

function Logo() {
    return (
        <div
            style={{
                marginTop: 20,
                marginBottom: 10,
            }}
        >
            <a href="/">
                <img src={logoUrl} height={64} width={64} alt="logo"/>
            </a>
        </div>
    );
}
