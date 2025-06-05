import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'
import sassDts from "vite-plugin-sass-dts";
import Plugin from "vite-plugin-sass-dts";


export default defineConfig(({ mode }) => {
    const isScssMode = mode === 'scss'
    if (isScssMode) {
        console.log("Mode 'Generate SCSS'");
    }

    return {
        resolve: {
            alias: {
                "~": resolve(__dirname, "./src"),
            },
        },
        plugins: [
            isScssMode
                ? sassDts({ enabledMode: ['scss'] as string[] as Parameters<typeof Plugin>[0]["enabledMode"]})
                : dts({ rollupTypes: false })
        ],
        build: isScssMode
            ? {
                lib: {
                    entry: resolve(__dirname, 'src/index.ts'),
                    name:  'AtomsSCSS',
                    fileName: 'index'
                }
            }
            : {
                lib: {
                    entry: resolve(__dirname, 'src/index.ts'),
                    name:  'AtomsSCSS',
                    fileName: 'index'
                }
            },
        css: {
            modules: {
                localsConvention: "camelCaseOnly",
            },
            preprocessorOptions: {
                scss: {
                    loadPaths: ['node_modules', '../../node_modules'],
                    api: "modern",
                },
            },
        },
    }
})
