import { resolve } from "path";
import { writeFileSync } from 'node:fs'
import { CSSModulesOptions, defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import PrettyModuleClassnames from "vite-plugin-pretty-module-classnames";

const srcDir = resolve(__dirname, "./src");

export default defineConfig(({ mode }) => {
    const isScssMode = mode === 'scss' || mode === 'development';
    if (isScssMode) {
        console.log("'Generate dts for  SCSS' enabled");
    }

    return {
        resolve: {
            alias: {
                "~": srcDir,
            },
        },
        plugins: [
            PrettyModuleClassnames(),
            !isScssMode && dts({ rollupTypes: false })
        ],
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name:  'AtomsSCSS',
                fileName: 'index'
            }
        },
        css: {
            modules: {
                localsConvention: "camelCaseOnly",
                exportGlobals: true,
                getJSON: isScssMode ? getDts : null
            },
            preprocessorOptions: {
                scss: {
                    api: "modern",
                },
            },
        },
    }
})

const getDts: CSSModulesOptions["getJSON"] = (cssFileName, json, outputFileName) => {
    if (/\.scss$/.test(outputFileName)) {
        const dts = `
    declare const classNames: {
      ${Object.entries(json).map(([name, value]) => `readonly ${name}: "${value}";`).join(`
      `)}
    };
    export = classNames;
                        `
        writeFileSync(outputFileName.replace(/\.scss$/, '.scss.d.ts'), dts);
    }
};
