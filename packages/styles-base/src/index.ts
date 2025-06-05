import link from "./styles/link.module.scss";
import button from "./styles/button.module.scss";
import input from "./styles/input.module.scss";
import header from "./styles/header.module.scss";
import footer from "./styles/footer.module.scss";
import separator from "./styles/separator.module.scss";
import { StylesContext } from "./types";

export type * from "./types";

export const stylesContext: StylesContext = {
    styles: {
        link,
        button,
        input,
        footer,
        header,
        separator
    },
};
