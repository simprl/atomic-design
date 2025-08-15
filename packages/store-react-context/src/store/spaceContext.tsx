import { ReactNode, createContext, useMemo, useContext } from "react";
import { Store } from "@atomic-design/types";

const SpaceContext = createContext<Store.SpaceValue>({ space: '', paths: [], type: "FORM_ROOT" });

export const SpaceForm = ({ space, children }: { space: string; children: ReactNode }) => (
    <SpaceContext.Provider
        value={useMemo(
            () => ({ space, paths: [], type: "FORM_ROOT" }),
            [space]
        )}
    >
        {children}
    </SpaceContext.Provider>
);

export const useSpace: Store.StoreHook<"useSpace"> = () => useContext(SpaceContext);
