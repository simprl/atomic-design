import { stylesContext } from "~/index";
import { type Styles } from "@atomic-design/types";

export type DeepRequired<T> = {
    [K in keyof T]: Required<DeepRequired<T[K]>>
}

stylesContext as DeepRequired<Styles.StyleContext<"link">>;
stylesContext as DeepRequired<Styles.StyleContext<"button">>;
stylesContext as DeepRequired<Styles.StyleContext<"input">>;
stylesContext as DeepRequired<Styles.StyleContext<"footer">>;
stylesContext as DeepRequired<Styles.StyleContext<"header">>;
stylesContext as DeepRequired<Styles.StyleContext<"separator">>;
stylesContext as DeepRequired<Styles.StyleContext<"card">>;
stylesContext as DeepRequired<Styles.StyleContext<"table">>;
stylesContext as DeepRequired<Styles.StyleContext<"td">>;
stylesContext as DeepRequired<Styles.StyleContext<"th">>;
stylesContext as DeepRequired<Styles.StyleContext<"color">>;
stylesContext as DeepRequired<Styles.StyleContext<"section">>;
