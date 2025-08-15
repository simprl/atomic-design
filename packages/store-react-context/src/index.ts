import { useSpace, SpaceForm } from "~/store/spaceContext";
import { ValueProvider, useValueText, useValue } from "~/store/valueContext";

export const storeContext = {
    storeHooks: {
        useSpace,
        useValue,
        useValueText
    },
    storeComponents: {
        SpaceForm,
        ValueProvider
    }
};
