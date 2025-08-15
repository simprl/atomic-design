import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
    resolve: {
        alias: {
            "~": resolve(__dirname, "./src"),
        },
    },
    plugins: [
        dts({ rollupTypes: false,  insertTypesEntry: true }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'StoreReactContext',
            fileName: 'index',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime',
                'lodash-es',
            ],
            output: {
                globals: {
                    react: 'React',
                    'lodash-es': 'LodashES',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'react/jsx-dev-runtime': 'React'
                }
            }
        }
    }
});
