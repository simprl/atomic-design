"use client"
import React from "react";

export const Component3 = () => {
    const [state] = React.useState<string>("Component3");
    return <div>state: {state}</div>;
}
