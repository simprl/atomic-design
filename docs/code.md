I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use Clean Code, Clean Architecture, SOLID, Atomic design
If something is unclear or needs clarification, feel free to ask me.
# Project "@atomic-design/all"

## package.json

```json
{
  "name": "@atomic-design/all",
  "version": "1.0.28",
  "private": true,
  "workspaces": [
    "packages/di",
    "packages/types",
    "packages/design-tokens",
    "packages/styles-base",
    "packages/atoms-base",
    "packages/molecules-base",
    "packages/store-react-context",
    "packages/example_vike"
  ],
  "scripts": {
    "install_and_build": "npm run install_and_build --workspaces --if-present",
    "build": "npm run build --workspaces --if-present",
    "docs": "npm run docs --workspaces --if-present",
    "docsAllInOne": "codools --root . --output docs/code.md",
    "test": "npm run test --workspaces --if-present"
  },
  "type": "module",
  "keywords": [],
  "author": "simprl",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.21.0",
    "@typescript-eslint/parser": "^8.21.0",
    "@eslint/js": "^9.23.0",
    "globals": "^16.0.0",
    "codools": "^0.2.17",
    "eslint": "^9.18.0"
  }
}

```

## packages/atoms-base/index.scss

```scss
@forward "src/helpers";

```

## packages/atoms-base/package.json

```json
{
  "name": "@atomic-design/atoms-base",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": ["dist", "index.scss", "src/helpers"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "sideEffects": false,
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "build": "vite build",
    "test": "tsc --project tsconfig.test.json",
    "lint": "eslint ."
  },
  "dependencies": {
    "@atomic-design/di": "*",
    "@atomic-design/types": "*",
    "@atomic-design/design-tokens": "*"
  },
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "codools": "^0.2.17",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.3.5",
    "vite-plugin-dts": "^4.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}

```

## packages/atoms-base/src/atoms/Button.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";
import { useState } from "react";
import type { Atoms, Styles } from "@atomic-design/types";

export function Button(props: Atoms.AtomProps<"Button"> & WithDeps<Styles.StyleContext<"button">>) {
    const { children, icon, before, after, color = "Primary", deps } = props;
    const classNames = deps.styles.button;
    const containerClassNames = [
        classNames.container,
        classNameByColor(color, classNames),
        ...classNameByInteractive(props, classNames),
    ]
    useState();
    return <button className={containerClassNames.join(' ')}>
        {icon && <div className={classNames.icon}>{icon}</div>}
        {before && <div className={classNames.before}>{before}</div>}
        {children && <div className={classNames.content}>{children}</div>}
        {after && <div className={classNames.after}>{after}</div>}
    </button>
}

```

## packages/atoms-base/src/atoms/Card.tsx

```typescript
import type { WithDeps } from '@atomic-design/di';
import type { Atoms, Styles } from '@atomic-design/types';

export function Card(props: Atoms.AtomProps<"Card"> & WithDeps<Styles.StyleContext<"card">>) {
    const { thumbnail, before, after, children, deps } = props;
    const styles = deps.styles.card;

    return (
        <div className={styles.container}>
            {thumbnail && <div className={styles.thumbnail}>{thumbnail}</div>}
            {before && <div className={styles.before}>{before}</div>}
            {children && <div className={styles.content}>{children}</div>}
            {after && <div className={styles.after}>{after}</div>}
        </div>
    );
}

```

## packages/atoms-base/src/atoms/Color.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function Color (props: Atoms.AtomProps<"Color"> & WithDeps<Styles.StyleContext<"color">>) {
    const { children, color, deps } = props;
    return (
        <div title={color} style={{ background: color }} className={deps.styles.color.container}>
            {children}
        </div>
    );
}

```

## packages/atoms-base/src/atoms/Link.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";
import type { Atoms, Styles } from "@atomic-design/types";

export function Link(props: Atoms.AtomProps<"Link"> & WithDeps<Styles.StyleContext<"link">>) {
    const { children, icon, before, after, href, color = "Primary", deps } = props;
    const classNames = deps.styles.link;
    const containerClassNames = [
        classNames.container,
        classNameByColor(color, classNames),
        ...classNameByInteractive(props, classNames),
    ]
    return <a href={href} className={containerClassNames.join(' ')}>
        {icon && <div className={classNames.icon}>{icon}</div>}
        {before && <div className={classNames.before}>{before}</div>}
        {children && <div className={classNames.content}>{children}</div>}
        {after && <div className={classNames.after}>{after}</div>}
    </a>
}

```

## packages/atoms-base/src/atoms/Section.tsx

```typescript
import type { WithDeps } from '@atomic-design/di';
import type { Atoms, Styles } from "@atomic-design/types";

export function Section(props: Atoms.AtomProps<"Section"> & WithDeps<Styles.StyleContext<"section">>) {
    const { caption, subcaption, children, deps } = props;
    const styles = deps.styles.section;

    return (
        <div className={styles.container}>
            {caption && <h2 className={styles.caption}>{caption}</h2>}
            {subcaption && <div className={styles.subcaption}>{subcaption}</div>}
            {children && <div className={styles.content}>{children}</div>}
        </div>
    );
}

```

## packages/atoms-base/src/atoms/Table.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export const Table = (props: Atoms.AtomProps<"Table"> & WithDeps<Styles.StyleContext<"table">>) => {
    const { children, deps } = props;
    return (
        <table className={deps.styles.table.table}>
            {children}
        </table>
    );
}

```

## packages/atoms-base/src/atoms/TD.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function TD (props: Atoms.AtomProps<"TD"> & WithDeps<Styles.StyleContext<"td">>) {
    const { children, deps } = props;
    return (
        <td className={deps.styles.td.td}>
            {children}
        </td>
    );
}

```

## packages/atoms-base/src/atoms/TH.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import type { Atoms, Styles } from "@atomic-design/types";

export function TH(props: Atoms.AtomProps<"TH"> & WithDeps<Styles.StyleContext<"th">>){
    const { children, deps } = props;
    return (
        <th className={deps.styles.th.th}>
            {children}
        </th>
    );
}

```

## packages/atoms-base/src/helpers/classname.ts

```typescript
import { Atoms, Styles } from "@atomic-design/types";

export function classNameByColor(color: Atoms.ColorsProps["color"], classNames: Styles.WithColors): string | undefined {
    switch (color) {
        case "Primary": return classNames.colorPrimary;
        case "Secondary": return classNames.colorSecondary;
        case "Success": return classNames.colorSuccess;
        case "Accent": return classNames.colorAccent;
        case "Info": return classNames.colorInfo;
        case "Warning": return classNames.colorWarning;
        case "Danger": return classNames.colorDanger;
    }
}

export function classNameByInteractive(props: Atoms.InteractiveProps, classNames: Styles.Interactive): (string | undefined)[] {
    const result = [];
    if (props.active) result.push(classNames.active);
    if (props.disabled) result.push(classNames.disabled);
    if (props.focus) result.push(classNames.focus);
    return result;
}

```

## packages/atoms-base/src/helpers/colors.scss

```scss
@use "@atomic-design/design-tokens" as tokens;

@mixin colors-classes {
  @each $name, $colors in tokens.$color-map {
    .color-#{$name} {
      @content($colors);
    }
  }
}

```

## packages/atoms-base/src/helpers/index.scss

```scss
@forward "colors";

```

## packages/atoms-base/src/index.ts

```typescript
import { Link } from "./atoms/Link";
import { Button } from "./atoms/Button";
import { Card } from "./atoms/Card";
import { Section } from "./atoms/Section";
import { Table } from "./atoms/Table";
import { TD } from "./atoms/TD";
import { TH } from "./atoms/TH";
import { Color } from "./atoms/Color";

export const atomsContext = {
    atoms: {
        Card,
        Section,
        Link,
        Button,
        Table,
        TD,
        TH,
        Color
    }
};

```

## packages/atoms-base/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/atoms-base/test-dts/index.test-d.ts

```typescript
import { type atomsContext } from "~/index";
import { type Atoms } from "@atomic-design/types";
import { type DepsWithoutDeps } from "@atomic-design/di";

const atomsContextWithoutDeps = {} as DepsWithoutDeps<typeof atomsContext>;

atomsContextWithoutDeps as Atoms.AtomContext<"Button">;
atomsContextWithoutDeps as Atoms.AtomContext<"Card">;
atomsContextWithoutDeps as Atoms.AtomContext<"Section">;
atomsContextWithoutDeps as Atoms.AtomContext<"Table">;
atomsContextWithoutDeps as Atoms.AtomContext<"TD">;
atomsContextWithoutDeps as Atoms.AtomContext<"TH">;
atomsContextWithoutDeps as Atoms.AtomContext<"Color">;

```

## packages/atoms-base/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## packages/atoms-base/tsconfig.test.json

```json
{
  "extends": "./tsconfig.json",
  "include": ["test-dts/index.test-d.ts"],
  "compilerOptions": {
    "noEmit": true
  }
}

```

## packages/atoms-base/vite.config.ts

```typescript
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
            name: 'AtomsBase',
            fileName: 'index',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'react/jsx-dev-runtime': 'React'
                }
            }
        }
    }
});

```

## packages/design-tokens/index.scss

```scss
@forward "src/scss";

```

## packages/design-tokens/package.json

```json
{
  "name": "@atomic-design/design-tokens",
  "version": "0.1.2",
  "description": "A minimal, semantic SCSS tokens library for atomic design systems—providing a standardized, override‑friendly set of color, spacing, typography, border, shadow, breakpoint, size and z‑index tokens to kickstart any project.",
  "type": "module",
  "files": ["src/scss/", "index.scss"],
  "style": "index.scss",
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "build": "",
    "test": "",
    "docs": "codools",
    "lint": "stylelint src/scss/**/*.scss"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "codools": "^0.2.17",
    "stylelint": "^16.18.0",
    "stylelint-config-standard-scss": "^14.0.0",
    "stylelint-scss": "^6.11.1"
  },
  "keywords": [
    "design-tokens",
    "scss",
    "atomic-design",
    "css-variables",
    "css-tokens",
    "tailwind-style",
    "ui-kit",
    "style-tokens",
    "semantic-css",
    "design-system"
  ]
}

```

## packages/design-tokens/src/scss/border.scss

```scss
// Border size
$border-none: 0 !default;
$border-md: 1px !default;
$border-lg: 2px !default;
$border-xl: 4px !default;

// Border radius
$radius-none: 0 !default;
$radius-sm: 4px !default;
$radius-md: 8px !default;
$radius-lg: 16px !default;
$radius-full: $radius-sm !default;

```

## packages/design-tokens/src/scss/breakpoint.scss

```scss
$breakpoint-xs: 360px !default;
$breakpoint-sm: 640px !default;
$breakpoint-md: 768px !default;
$breakpoint-lg: 1024px !default;
$breakpoint-xl: 1280px !default;

```

## packages/design-tokens/src/scss/color.scss

```scss
$color-white: #fff !default;

// Primary color (blue)
$color-primary-50: #eff6ff !default;
$color-primary-100: #dbeafe !default;
$color-primary-200: #bfdbfe !default;
$color-primary-300: #93c5fd !default;
$color-primary-400: #60a5fa !default;
$color-primary-500: #3b82f6 !default;
$color-primary-600: #2563eb !default;
$color-primary-700: #1d4ed8 !default;
$color-primary-800: #1e40af !default;
$color-primary-900: #1e3a8a !default;
$color-primary-950: #172554 !default;
$color-primary: $color-primary-500 !default;

// Secondary color (neutral)
$color-secondary-50: #f9fafb !default;
$color-secondary-100: #f3f4f6 !default;
$color-secondary-200: #e5e7eb !default;
$color-secondary-300: #d1d5db !default;
$color-secondary-400: #9ca3af !default;
$color-secondary-500: #6b7280 !default;
$color-secondary-600: #4b5563 !default;
$color-secondary-700: #374151 !default;
$color-secondary-800: #1f2937 !default;
$color-secondary-900: #111827 !default;
$color-secondary-950: #030712 !default;
$color-secondary: $color-secondary-500 !default;

// Accent color (vivid highlight)
$color-accent-50: #fffbeb !default;
$color-accent-100: #fef3c7 !default;
$color-accent-200: #fde68a !default;
$color-accent-300: #fcd34d !default;
$color-accent-400: #fbbf24 !default;
$color-accent-500: #f59e0b !default;
$color-accent-600: #d97706 !default;
$color-accent-700: #b45309 !default;
$color-accent-800: #92400e !default;
$color-accent-900: #78350f !default;
$color-accent-950: #451a03 !default;
$color-accent: $color-accent-500 !default;

// Success color (green)
$color-success-50: #ecfdf5 !default;
$color-success-100: #d1fae5 !default;
$color-success-200: #a7f3d0 !default;
$color-success-300: #6ee7b7 !default;
$color-success-400: #34d399 !default;
$color-success-500: #10b981 !default;
$color-success-600: #059669 !default;
$color-success-700: #047857 !default;
$color-success-800: #065f46 !default;
$color-success-900: #064e3b !default;
$color-success-950: #022c22 !default;
$color-success: $color-success-500 !default;

// Danger color (red)
$color-danger-50: #fef2f2 !default;
$color-danger-100: #fee2e2 !default;
$color-danger-200: #fecaca !default;
$color-danger-300: #fca5a5 !default;
$color-danger-400: #f87171 !default;
$color-danger-500: #ef4444 !default;
$color-danger-600: #dc2626 !default;
$color-danger-700: #b91c1c !default;
$color-danger-800: #991b1b !default;
$color-danger-900: #7f1d1d !default;
$color-danger-950: #450a0a !default;
$color-danger: $color-danger-500 !default;

// Warning color (yellow)
$color-warning-50: #fefce8 !default;
$color-warning-100: #fef9c3 !default;
$color-warning-200: #fef08a !default;
$color-warning-300: #fde047 !default;
$color-warning-400: #facc15 !default;
$color-warning-500: #eab308 !default;
$color-warning-600: #ca8a04 !default;
$color-warning-700: #a16207 !default;
$color-warning-800: #854d0e !default;
$color-warning-900: #713f12 !default;
$color-warning-950: #422006 !default;
$color-warning: $color-warning-500 !default;

// Info color (cyan)
$color-info-50: #ecfeff !default;
$color-info-100: #cffafe !default;
$color-info-200: #a5f3fc !default;
$color-info-300: #67e8f9 !default;
$color-info-400: #22d3ee !default;
$color-info-500: #06b6d4 !default;
$color-info-600: #0891b2 !default;
$color-info-700: #0e7490 !default;
$color-info-800: #155e75 !default;
$color-info-900: #164e63 !default;
$color-info-950: #123947 !default;
$color-info: $color-info-500 !default;

// Colors map
$color-map: (
  primary: (
    50:  $color-primary-50,
    100: $color-primary-100,
    200: $color-primary-200,
    300: $color-primary-300,
    400: $color-primary-400,
    500: $color-primary-500,
    600: $color-primary-600,
    700: $color-primary-700,
    800: $color-primary-800,
    900: $color-primary-900,
    950: $color-primary-950
  ),
  secondary: (
    50:  $color-secondary-50,
    100: $color-secondary-100,
    200: $color-secondary-200,
    300: $color-secondary-300,
    400: $color-secondary-400,
    500: $color-secondary-500,
    600: $color-secondary-600,
    700: $color-secondary-700,
    800: $color-secondary-800,
    900: $color-secondary-900,
    950: $color-secondary-950
  ),
  accent: (
    50:  $color-accent-50,
    100: $color-accent-100,
    200: $color-accent-200,
    300: $color-accent-300,
    400: $color-accent-400,
    500: $color-accent-500,
    600: $color-accent-600,
    700: $color-accent-700,
    800: $color-accent-800,
    900: $color-accent-900,
    950: $color-accent-950
  ),
  success: (
    50:  $color-success-50,
    100: $color-success-100,
    200: $color-success-200,
    300: $color-success-300,
    400: $color-success-400,
    500: $color-success-500,
    600: $color-success-600,
    700: $color-success-700,
    800: $color-success-800,
    900: $color-success-900,
    950: $color-success-950
  ),
  danger: (
    50:  $color-danger-50,
    100: $color-danger-100,
    200: $color-danger-200,
    300: $color-danger-300,
    400: $color-danger-400,
    500: $color-danger-500,
    600: $color-danger-600,
    700: $color-danger-700,
    800: $color-danger-800,
    900: $color-danger-900,
    950: $color-danger-950
  ),
  warning: (
    50:  $color-warning-50,
    100: $color-warning-100,
    200: $color-warning-200,
    300: $color-warning-300,
    400: $color-warning-400,
    500: $color-warning-500,
    600: $color-warning-600,
    700: $color-warning-700,
    800: $color-warning-800,
    900: $color-warning-900,
    950: $color-warning-950
  ),
  info: (
    50:  $color-info-50,
    100: $color-info-100,
    200: $color-info-200,
    300: $color-info-300,
    400: $color-info-400,
    500: $color-info-500,
    600: $color-info-600,
    700: $color-info-700,
    800: $color-info-800,
    900: $color-info-900,
    950: $color-info-950
  )
);

// Derived colors
$color-text: $color-secondary-900 !default;
$color-background: $color-white !default;
$color-border: $color-secondary-200 !default;

// Inverse colors
$color-text-inverse: $color-secondary-50 !default;
$color-background-inverse: $color-secondary-900 !default;
$color-border-inverse: $color-secondary-700 !default;

```

## packages/design-tokens/src/scss/index.scss

```scss
@forward "color";
@forward "spacing";
@forward "border";
@forward "size";
@forward "text";
@forward "breakpoint";
@forward "shadow";
@forward "z-index";

```

## packages/design-tokens/src/scss/shadow.scss

```scss
$shadow-xs: 0 1px 2px rgba(0 0 0 / 5%) !default;
$shadow-sm: 0 1px 3px rgba(0 0 0 / 10%), 0 1px 2px rgba(0 0 0 / 6%) !default;
$shadow-md: 0 4px 6px rgba(0 0 0 / 10%), 0 2px 4px rgba(0 0 0 / 6%) !default;
$shadow-lg: 0 10px 15px rgba(0 0 0 / 10%), 0 4px 6px rgba(0 0 0 / 5%) !default;
$shadow-xl: 0 20px 25px rgba(0 0 0 / 10%), 0 10px 10px rgba(0 0 0 / 4%) !default;

```

## packages/design-tokens/src/scss/size.scss

```scss
// Width
$width-xs: 160px;   // extra small panel (half mobile width)
$width-sm: 480px;   // small panel, typical dialogs, side-panels
$width-md: 640px;   // medium panel, common dialog size, modals
$width-lg: 960px;   // large panels, detailed views or modals with extensive content
$width-xl: 1280px;  // extra-large panels, suitable for wide content or complex layouts

// Height
$height-xs: 200px;
$height-sm: 360px;
$height-md: 480px;
$height-lg: 720px;
$height-xl: 900px;

```

## packages/design-tokens/src/scss/spacing.scss

```scss
$spacing-xs: 4px !default;
$spacing-sm: 8px !default;
$spacing-md: 16px !default;
$spacing-lg: 24px !default;
$spacing-xl: 32px !default;

```

## packages/design-tokens/src/scss/text.scss

```scss
// Typography tokens (Font size, Line height, Font weight, Letter spacing)

// Titles
$fontSize-title-1:      48px !default;
$lineHeight-title-1:    1.167 !default; // 56px / 48px
$fontWeight-title-1:    700 !default;
$letterSpacing-title-1: -0.05em !default; // Tailwind 'tighter'

$fontSize-title-2:      36px !default;
$lineHeight-title-2:    1.222 !default; // 44px / 36px
$fontWeight-title-2:    700 !default;
$letterSpacing-title-2: -0.025em !default; // Tailwind 'tight'

$fontSize-title-3:      30px !default;
$lineHeight-title-3:    1.200 !default; // 36px / 30px
$fontWeight-title-3:    600 !default;
$letterSpacing-title-3: 0em !default;    // Tailwind 'normal'

// Subtitles
$fontSize-subtitle-1:      24px !default;
$lineHeight-subtitle-1:    1.333 !default; // 32px / 24px
$fontWeight-subtitle-1:    600 !default;
$letterSpacing-subtitle-1: 0em !default;   // Tailwind 'normal'

$fontSize-subtitle-2:      20px !default;
$lineHeight-subtitle-2:    1.400 !default; // 28px / 20px
$fontWeight-subtitle-2:    500 !default;
$letterSpacing-subtitle-2: 0em !default;   // Tailwind 'normal'

// Body text
$fontSize-body-1:      16px !default;
$lineHeight-body-1:    1.500 !default; // 24px / 16px
$fontWeight-body-1:    400 !default;
$letterSpacing-body-1: 0em !default;   // Tailwind 'normal'

$fontSize-body-2:      14px !default;
$lineHeight-body-2:    1.429 !default; // 20px / 14px
$fontWeight-body-2:    400 !default;
$letterSpacing-body-2: 0em !default;   // Tailwind 'normal'

// Captions
$fontSize-caption-1:      12px !default;
$lineHeight-caption-1:    1.333 !default; // 16px / 12px
$fontWeight-caption-1:    400 !default;
$letterSpacing-caption-1: 0.025em !default; // Tailwind 'wide'

$fontSize-caption-2:      10px !default;
$lineHeight-caption-2:    1.400 !default; // 14px / 10px
$fontWeight-caption-2:    400 !default;
$letterSpacing-caption-2: 0.05em !default;  // Tailwind 'wider'

// Overline
$fontSize-overline:      10px !default;
$lineHeight-overline:    1.600 !default; // 16px / 10px
$fontWeight-overline:    500 !default;   // typically semi-bold
$letterSpacing-overline: 0.1em !default; // Tailwind 'widest'

// Mixins for typographic styles
@mixin title1 {
  font-size:      $fontSize-title-1;
  font-weight:    $fontWeight-title-1;
  line-height:    $lineHeight-title-1;
  letter-spacing: $letterSpacing-title-1;
}

@mixin title2 {
  font-size:      $fontSize-title-2;
  font-weight:    $fontWeight-title-2;
  line-height:    $lineHeight-title-2;
  letter-spacing: $letterSpacing-title-2;
}

@mixin title3 {
  font-size:      $fontSize-title-3;
  font-weight:    $fontWeight-title-3;
  line-height:    $lineHeight-title-3;
  letter-spacing: $letterSpacing-title-3;
}

@mixin subtitle1 {
  font-size:      $fontSize-subtitle-1;
  font-weight:    $fontWeight-subtitle-1;
  line-height:    $lineHeight-subtitle-1;
  letter-spacing: $letterSpacing-subtitle-1;
}

@mixin subtitle2 {
  font-size:      $fontSize-subtitle-2;
  font-weight:    $fontWeight-subtitle-2;
  line-height:    $lineHeight-subtitle-2;
  letter-spacing: $letterSpacing-subtitle-2;
}

@mixin body1 {
  font-size:      $fontSize-body-1;
  font-weight:    $fontWeight-body-1;
  line-height:    $lineHeight-body-1;
  letter-spacing: $letterSpacing-body-1;
}

@mixin body2 {
  font-size:      $fontSize-body-2;
  font-weight:    $fontWeight-body-2;
  line-height:    $lineHeight-body-2;
  letter-spacing: $letterSpacing-body-2;
}

@mixin caption1 {
  font-size:      $fontSize-caption-1;
  font-weight:    $fontWeight-caption-1;
  line-height:    $lineHeight-caption-1;
  letter-spacing: $letterSpacing-caption-1;
}

@mixin caption2 {
  font-size:      $fontSize-caption-2;
  font-weight:    $fontWeight-caption-2;
  line-height:    $lineHeight-caption-2;
  letter-spacing: $letterSpacing-caption-2;
}

@mixin overline {
  font-size:      $fontSize-overline;
  font-weight:    $fontWeight-overline;
  line-height:    $lineHeight-overline;
  letter-spacing: $letterSpacing-overline;
  text-transform: uppercase;
}

```

## packages/design-tokens/src/scss/z-index.scss

```scss
$zIndex-dropdown: 1000 !default;
$zIndex-sticky: 1020 !default;
$zIndex-modal: 1040 !default;
$zIndex-popover: 1060 !default;
$zIndex-tooltip: 1080 !default;

```

## packages/design-tokens/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/di/package.json

```json
{
  "name": "@atomic-design/di",
  "version": "0.1.1",
  "description": "Lightweight, type-safe dependency inversion utilities for Atomic Design architectures in React",
  "keywords": [
    "atomic-design",
    "dependency-injection",
    "dependency-inversion",
    "di",
    "react",
    "react-context",
    "react-hooks",
    "design-system",
    "variants",
    "typescript",
    "ssr",
    "csr"
  ],
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "sideEffects": false,
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.3.5",
    "vite-plugin-dts": "^4.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}

```

## packages/di/src/createVariantsContext.tsx

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

import { DepsWithoutDeps } from "./types";
import { createContext, ReactNode, use, useContext, useMemo, ComponentType, Suspense } from "react";

const throwingObj = {};

export function createVariantsContext <
    Ctx extends DepsWithoutDeps<Record<string, unknown>>,
    V extends Partial<Record<keyof Ctx, Record<string, () => WrappedPromise<Ctx[keyof Ctx], Ctx>>>>,
>(context: {[SpaceName in keyof Ctx]: () => WrappedPromise<Ctx[SpaceName], Ctx>}, variantsBySpace: V) {
    const variantManager = createVariantsManager(context, variantsBySpace);

    const initVariants = variantManager.getInitVariants();
    const reactContext = createContext(initVariants);
    const { Provider } = reactContext;

    const useAtomic = () => {
        const value = use(reactContext);
        if (value === initVariants){
            throw new Error(`Need to wrap into Provider`);
        }
        return value.context;
    }

    variantManager.setDepsHook(() => useAtomic());

    const AtomicProvider = ({children, variants, space, variant }: AtomicProviderProps<(typeof initVariants)["variants"]>) => {
        const { variants: parentVariants } = useContext(reactContext);
        const newVariants = useMemo(
            () => mergeVariants(parentVariants, variants, space, variant),
            [parentVariants, space, variant, variants]
        );
        const newContextPromise = useMemo(async () => {
            try {
                return await variantManager.getVariant(newVariants);
            } catch (e) {
                console.error(e);
                throw e;
            }
        }, [ newVariants ]);
        const newContext = use(newContextPromise);
        const v = useMemo(
            () => ({ variants: newVariants, context: newContext }),
            [newVariants, newContext]
        );
        return <Provider value={v} >{children}</Provider>
    }

    const SuspenseProvider: typeof AtomicProvider = (props) => <Suspense fallback={null}>
        <AtomicProvider {...props}/>
    </Suspense>;

    type ComponentKeys<Space extends keyof Ctx> =
        {
            [Name in keyof Ctx[Space]]: Ctx[Space][Name] extends ComponentType<any>
            ? Name
            : never
        }[keyof Ctx[Space]];

    type PropsOf<
        Space extends keyof Ctx,
        Name extends ComponentKeys<Space>
    > =
        Ctx[Space][Name] extends ComponentType<infer P>
            ? P
            : never;

    function getServerReadyComponent<
        Space extends keyof Ctx,
        Name extends ComponentKeys<Space>,
    >(
        space: Space,
        name: Name
    ): ComponentType<PropsOf<Space, Name>> {
        const Wrapped: ComponentType<PropsOf<Space, Name>> = (props) => {
            // TS now knows Molecule is ComponentType<PropsOf<Space,Name>>
            const Molecule = useAtomic()[space][name] as ComponentType<PropsOf<Space, Name> | unknown>;
            return <Molecule {...(props || {})} />;
        };
        return Wrapped;
    }

    return [useAtomic, SuspenseProvider, getServerReadyComponent] as [
        typeof useAtomic,
        typeof AtomicProvider,
        typeof getServerReadyComponent
    ]
}

interface AtomicProviderProps<Variants extends Record<string, unknown>> {
    children: ReactNode;
    variants?: Partial<Variants>;
    space?: keyof Variants;
    variant?: Variants[keyof Variants];
}

function mergeVariants<OriginalVariants extends Record<string, unknown>, Variants extends OriginalVariants>(
    parentVariants: OriginalVariants,
    variants?: Variants,
    space?: keyof Variants,
    variant?: Variants[keyof Variants]
) {
    const combined: OriginalVariants = { ...parentVariants };
    if (variants) {
        Object.assign(combined, variants);
    }
    if (space && space) {
        Object.assign(combined, { [space]: variant });
    }
    return combined as OriginalVariants;
}

type Wrapped<OutputContext, InputContext> =  {
    output: OutputContext;
    setDepsHook: (c: () => InputContext) => void;
}

type WrappedPromise<OutputContext, InputContext> = Wrapped<OutputContext, InputContext> | Promise<Wrapped<OutputContext, InputContext>>;

function createVariantsManager <
    Ctx extends DepsWithoutDeps<Record<string, unknown>>,
    V extends Partial<Record<keyof Ctx, Record<string, () => WrappedPromise<Ctx[keyof Ctx], Ctx>>>>,
>(context: {[SpaceName in keyof Ctx]: () => WrappedPromise<Ctx[SpaceName], Ctx>}, variantsBySpace: V) {
    let useContextHook: () => Ctx;
    const useContext = () => useContextHook();
    const loadedVariants = new Map<string, Ctx>();

    const getVariant = async (selectedVariants: {[SpaceName in keyof Ctx]?: keyof V[SpaceName]}) => {
        const hash = getVariantsHash(selectedVariants);
        let loadedVariant = loadedVariants.get(hash);
        if (loadedVariant) {
            return loadedVariant;
        }
        const promises = Object.entries(context).map(
            async ([spaceName, spaceValue]: [keyof Ctx, () => WrappedPromise<Ctx[keyof Ctx], Ctx>]) => {
                const selectedVariant = selectedVariants[spaceName] as string;
                if(selectedVariant) {
                    const variants = variantsBySpace[spaceName];
                    if (variants) {
                        const valueLoader = variants[selectedVariant];
                        if (valueLoader) {
                            const wrapped = await valueLoader();
                            wrapped.setDepsHook(useContext);
                            return [spaceName, wrapped.output] as [keyof Ctx, Ctx];
                        }
                    }
                }
                const wrapped = await spaceValue();
                wrapped.setDepsHook(useContext)
                return [spaceName, wrapped.output];
            }
        );
        const entries = await Promise.all(promises);
        loadedVariant = Object.fromEntries(entries) as Ctx;
        loadedVariants.set(hash, loadedVariant)
        return loadedVariant;
    }
    const getInitVariants = () => throwingObj as {
        variants: {[SpaceName in keyof Ctx]?: keyof V[SpaceName]};
        context: Ctx;
    };

    const setDepsHook = (newUseContextHook: () => Ctx) => {
        useContextHook = newUseContextHook
    }
    return {
        getVariant,
        getInitVariants,
        setDepsHook,
    }
}

function getVariantsHash (variants: Record<string, string | number | symbol | undefined>) {
    return Object.entries(variants)
        .filter(([, value]) => value !== undefined)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([key, value]) => `${key}=${String(value)}`).join("&");
}

```

## packages/di/src/extractComponentDeps.tsx

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentType } from "react";

type ExtractProps<F> =
    F extends ComponentType<infer P> ? P : never;
//
// type ExtractArgs<F> =
//     F extends (props: any, ...args: infer A) => any ? A : never;
//
// type ExtractReturn<F> =
//     F extends (props: any, ...args: any[]) => infer R ? R : never;

type UnionToIntersection<U> =
    (U extends any ? (x: U) => void : never) extends (x: infer I) => void
        ? I
        : never;

type DepsFromComponents<Comps extends Record<string, ComponentType<any>>> =
    UnionToIntersection<
        {
            [K in keyof Comps]:
            ExtractProps<Comps[K]> extends { deps: infer C }
                ? C
                : never
        }[keyof Comps]
    >;

let i = 1;
export function extractComponentDeps<
    Comps extends Record<string, ComponentType<any>>
>(
    components: {
        [K in keyof Comps]:
        ExtractProps<Comps[K]> extends { deps: unknown }
            ? Comps[K]
            : never
    }
) {
    let useDeps: () => DepsFromComponents<Comps>;

    const result = Object.fromEntries(Object.entries(components).map(([name, Original]) => {
        const Component = (...args: unknown[]): unknown => {
            const [props] = args;
            const deps = useDeps();
            const propsWithDeps = isPlainObject(props) ? {
                ...props,
                deps
            } : { deps };
            return <Original {...propsWithDeps} />;
        }
        if ("displayName" in Original) {
            (Component as { displayName?: string }).displayName = `${Original.displayName}_${i++}`;
        } else if ("name" in Original) {
            (Component as { displayName?: string }).displayName = `${Original.name}_${i++}`;
        }
        return [name, Component];
    }))

    return {
        output: result as unknown as {
            [K in keyof Comps]: ComponentType<Omit<ExtractProps<Comps[K]>, 'deps'>>
        },
        setDepsHook: (getter: () => DepsFromComponents<Comps>) => {
            useDeps = getter;
        },
    };
}

export const blankDeps = <T,>(output: T) => ({
    output,
    setDepsHook: () => {},
})

function isPlainObject(x: unknown): x is object {
    return typeof x === 'object' && x !== null;
}


```

## packages/di/src/index.ts

```typescript
import { createVariantsContext } from "./createVariantsContext";
import { extractComponentDeps, blankDeps } from "./extractComponentDeps";

export type * from "./types";

export {
    createVariantsContext,
    extractComponentDeps,
    blankDeps
};

```

## packages/di/src/types.ts

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ComponentType, ReactNode } from "react";

type OmitDeps<T> =  T extends { deps: unknown } ? Omit<T, "deps"> : T;

type FunctionWithoutDeps<F> =
    F extends () => infer R ? () => R :
        F extends (props: infer P, ...args: infer A) => infer R ? (props: OmitDeps<P>, ...args: A) => R :
            F extends (this: infer T, props: infer P, ...args: infer A) => infer R
                ? (this: OmitDeps<T>, props: OmitDeps<P>, ...args: A) => R
                : never;

export type ComponentWithoutDeps<C> =
    C extends ComponentType<infer P>
        ? ComponentType<Omit<P, 'deps'>>
        : "never";

export type DepsWithoutDeps<T> = {
    [K in keyof T]:
    T[K] extends (this: any, ...args: any[]) => any
        ? FunctionWithoutDeps<T[K]>
        :T[K] extends ComponentType<any>
        ? ComponentWithoutDeps<T[K]>
        : T[K] extends PlainObject
            ? DepsWithoutDeps<T[K]>
            : T[K];
};

export type WithDeps<Deps> = {
    deps: DepsWithoutDeps<Deps>;
}

export type DepsFunctionComponent<P = any, Deps = void> = ComponentType<P & WithDeps<Deps>>
export type DepsFunction<Arguments extends unknown[], Return, Deps = void> = Deps extends void ? (...props: Arguments) => Return : (this: WithDeps<Deps>, ...props: Arguments) => Return;

export type AnyFunction = (...args: unknown[]) => unknown;
export type PlainObject = Record<string, unknown>;

export type OneStyleContext<Name extends string, ClassNames> = {
    styles: {
        [N in Name]: ClassNames
    }
};

export type ClassNames<ClassNamesStrings extends string> = {
    readonly [ClassName in ClassNamesStrings]?: string;
};

export type ReactNodes<ClassNamesStrings extends string> = {
    readonly [ClassName in ClassNamesStrings]?: ReactNode;
};

export type OneFunctionComponentContext<Space extends string, Name extends string, Props, Deps = void> = {
    [S in Space]: {
        [N in Name]: DepsFunctionComponent<Props, Deps>;
    }
}

export type OneFunctionContext<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = void> = {
    [S in Space]: {
        [N in Name]: DepsFunction<Arguments, Return, Deps>;
    }
}

export type OneContextItem<Space extends string, Name extends string, F> = {
    [S in Space]: {
        [N in Name]: F;
    }
}


```

## packages/di/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## packages/di/vite.config.ts

```typescript
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
            name: 'atomicContext',
            fileName: 'index',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'react/jsx-dev-runtime': 'React'
                }
            }
        }
    },
});

```

## packages/example_nextjs/next-env.d.ts

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

## packages/example_nextjs/next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```

## packages/example_nextjs/package.json

```json
{
  "name": "example_nextjs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "next": "15.3.2",
    "@atomic-design/styles-base": "*",
    "@atomic-design/atoms-base": "*",
    "@atomic-design/molecules-base": "*",
    "@atomic-design/di": "*"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "@eslint/eslintrc": "^3"
  }
}

```

## packages/example_nextjs/src/app/globals.css

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

```

## packages/example_nextjs/src/app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

```

## packages/example_nextjs/src/app/page.module.css

```css
.page {
  --gray-rgb: 0, 0, 0;
  --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  --gray-alpha-100: rgba(var(--gray-rgb), 0.05);

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;

  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100svh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);
}

@media (prefers-color-scheme: dark) {
  .page {
    --gray-rgb: 255, 255, 255;
    --gray-alpha-200: rgba(var(--gray-rgb), 0.145);
    --gray-alpha-100: rgba(var(--gray-rgb), 0.06);

    --button-primary-hover: #ccc;
    --button-secondary-hover: #1a1a1a;
  }
}

.main {
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;
}

.main ol {
  font-family: var(--font-geist-mono);
  padding-left: 0;
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.01em;
  list-style-position: inside;
}

.main li:not(:last-of-type) {
  margin-bottom: 8px;
}

.main code {
  font-family: inherit;
  background: var(--gray-alpha-100);
  padding: 2px 4px;
  border-radius: 4px;
  font-weight: 600;
}

.ctas {
  display: flex;
  gap: 16px;
}

.ctas a {
  appearance: none;
  border-radius: 128px;
  height: 48px;
  padding: 0 20px;
  border: none;
  border: 1px solid transparent;
  transition:
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}

a.primary {
  background: var(--foreground);
  color: var(--background);
  gap: 8px;
}

a.secondary {
  border-color: var(--gray-alpha-200);
  min-width: 158px;
}

.footer {
  grid-row-start: 3;
  display: flex;
  gap: 24px;
}

.footer a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer img {
  flex-shrink: 0;
}

/* Enable hover only on non-touch devices */
@media (hover: hover) and (pointer: fine) {
  a.primary:hover {
    background: var(--button-primary-hover);
    border-color: transparent;
  }

  a.secondary:hover {
    background: var(--button-secondary-hover);
    border-color: transparent;
  }

  .footer a:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
}

@media (max-width: 600px) {
  .page {
    padding: 32px;
    padding-bottom: 80px;
  }

  .main {
    align-items: center;
  }

  .main ol {
    text-align: center;
  }

  .ctas {
    flex-direction: column;
  }

  .ctas a {
    font-size: 14px;
    height: 40px;
    padding: 0 16px;
  }

  a.secondary {
    min-width: auto;
  }

  .footer {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}

@media (prefers-color-scheme: dark) {
  .logo {
    filter: invert();
  }
}

```

## packages/example_nextjs/src/app/page.tsx

```typescript
import Image from "next/image";
import styles from "./page.module.css";
import { Component1 } from "~/components/Component1";
import { Component2 } from "~/components/Component2";
import { Link, AtomicProvider } from "~/components/atomic";

export default function Home() {
   return (
      <>
        <div className={styles.page}>
          <main className={styles.main}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />

            <AtomicProvider space={"contextName"} variant={"v1"} >
              <Link href={"ss"}> ddd</Link>
              <Component1 />
              <AtomicProvider space={"contextName"} variant={"v2"} >
                <Link href={"sss"}> fff</Link>
                <Component1 />

                <Component2 >rrrrrrrrr</Component2>
              </AtomicProvider>
            </AtomicProvider>
            <ol>
              <li>
                Get started by editing <code>src/app/page.tsx</code>.
              </li>
              <li>Save and see your changes instantly.</li>
            </ol>

            <div className={styles.ctas}>
              <a
                className={styles.primary}
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className={styles.logo}
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Deploy now
              </a>
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
              >
                Read our docs
              </a>
            </div>
          </main>
          <footer className={styles.footer}>
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Go to nextjs.org →
            </a>
          </footer>
        </div>
      </>
  );
}

```

## packages/example_nextjs/src/components/atomic.tsx

```typescript
"use client"
import { getServerReadyComponent, AtomicProvider } from "~/components/atomicContext";

export { AtomicProvider };
export const Link = getServerReadyComponent("molecules", "Link");

```

## packages/example_nextjs/src/components/atomicContext.tsx

```typescript
"use client"
import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePathname } from "next/navigation";

const atomicContext = {
    contextName: () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculeHooks: () => blankDeps({
        useLinkProps: (href?: string) => {
            const pathname = usePathname() || '/'
            if (href === undefined) {
                return false;
            }
            return href === '/' ? pathname === href : pathname.startsWith(href);
        }
    }),
};

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext(atomicContext, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }

```

## packages/example_nextjs/src/components/Component1.tsx

```typescript
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

```

## packages/example_nextjs/src/components/Component2.tsx

```typescript
"use client"
import React from "react";
// import { getLocale } from "~/lib/localeContext";
import { Component1 } from "~/components/Component1";
import { useAtomic } from "~/components/atomicContext";

interface Props {
    children: React.ReactNode;
}

export const Component2 = ({ children }: Props) => {
    // const clientLocale = getClientLocale("Component2");
    const context = useAtomic();
    const { contextName: locale, /*molecules: { LinkMolecule } */} = context;

    const [state, setState] = React.useState<string>(locale);
    // useEffect(() => setState(clientLocale), [clientLocale])
    // console.log("Component2", { LinkMolecule });
    return <div onClick={() => setState("ddddd")}>
        <h3>Start Component2</h3>
        {/*<LinkMolecule href="/">sss2</LinkMolecule>*/}
        <div>locale: {locale}</div>
        <div>state: {state}</div>
        <div>children: {children}</div>
        <h3>End Component2</h3>
        <Component1 />
    </div>;
}

```

## packages/example_nextjs/src/components/Component3.tsx

```typescript
"use client"
import React from "react";

export const Component3 = () => {
    const [state] = React.useState<string>("Component3");
    return <div>state: {state}</div>;
}

```

## packages/example_nextjs/src/components/molecules/LinkMolecule.tsx

```typescript
"use client"
import { WithDeps } from "@atomic-design/di";
import { LinkAtomContext } from "@atomic-design/atoms-base";
import { memo } from "react";
import { usePathname } from "next/navigation";

export interface LinkProps {
  href: string;
  children: string;
}

export const LinkMolecule = memo(function ({ href, children, deps }: LinkProps & WithDeps<LinkAtomContext>) {
  const { atoms: { Link } } = deps;

  const pathname = usePathname() || '/'
  const isActive =
      href === '/' ? pathname === href : pathname.startsWith(href)
  return (
    <Link href={href} color="Secondary" active={isActive} >
      {children}
    </Link>
  );
});
LinkMolecule.displayName = "LinkMolecule";

```

## packages/example_nextjs/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

## packages/example_vike/components/atomic.tsx

```typescript
"use client"
import { getServerReadyComponent, AtomicProvider } from "~/components/atomicContext";

export { AtomicProvider };
export const Link = getServerReadyComponent("molecules", "Link");
export const SpaceForm = getServerReadyComponent("storeComponents", "SpaceForm");
export const ValueProvider = getServerReadyComponent("storeComponents", "ValueProvider");

```

## packages/example_vike/components/atomicContext.tsx

```typescript
import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePageContext } from "vike-react/usePageContext";
import { useMemo } from "react";
import { PageContext } from "vike/types";

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext({
    "contextName": () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculesHooks: () => blankDeps({
        useLinkProps: (href?: string) => {
            const pageContext = usePageContext();
            const { urlPathname, locale } = pageContext as PageContext & { locale: string };
            const linkProps = useMemo(() => {
                const active = href === undefined ? false : href === "/" ? urlPathname === href : urlPathname.startsWith(href)
                return {
                    href: `/${locale}${href}`,
                    active,
                };
            }, [href, urlPathname]);
            return linkProps;
        }
    }),
    // cells: () => {
    //     const Color = ({ name = "color", deps: { molecules: { Field } }, signals: { useValue } })  => {
    //         return <Field {...useFieldProps(name)} />
    //     }
    //     return extractComponentDeps({
    //         Color,
    //     })
    // },
    sections: async () => {
        const designTokens = await import('~/components/sections/design-tokens');
        const sections = {
            ...designTokens
        }
        return extractComponentDeps(sections);
    },
    storeHooks: async () => {
        const { storeHooks } = (await import("@atomic-design/store-react-context")).storeContext;
        return blankDeps(storeHooks);
    },
    storeComponents: async () => {
        const { storeComponents } = (await import("@atomic-design/store-react-context")).storeContext;
        return blankDeps(storeComponents);
    },
    i18n: async () => {
        const i18n = await import('~/components/i18n/en');
        return blankDeps(i18n);
    }
}, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    },
    i18n: {
        ['en-US']: async () =>
            blankDeps(await import('~/components/i18n/en')),
        ['de-DE']: async () =>
            blankDeps(await import('~/components/i18n/de')),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }

```

## packages/example_vike/components/i18n/de.ts

```typescript
export * from "~/components/sections/design-tokens/i18n/de";

```

## packages/example_vike/components/i18n/en.ts

```typescript
export * from "~/components/sections/design-tokens/i18n/en";

```

## packages/example_vike/components/sections/design-tokens/ColorsTokens.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { Atoms, Store } from "@atomic-design/types";
import { designTokens } from "~/database/designTokens";
import { OneContextItem } from "@atomic-design/di";
import React from "react";
import { DesignTokens } from "~/components/sections/design-tokens/i18n/types";

type Deps = Atoms.AtomContext<"TD">
    & Atoms.AtomContext<"TH">
    & Atoms.AtomContext<"Color">
    & Atoms.AtomContext<"Section">
    & Store.StoreHooksContext<"useSpace">
    & Store.StoreHooksContext<"useValue">
    & OneContextItem<"i18n", "designTokens", DesignTokens>;

export const ColorsTokens = (props: WithDeps<Deps>) => {
    const { deps: {
        atoms: {
            Section
        },
        i18n: { designTokens: { colorsTokens } }
    } } = props;

    const description = colorsTokens.description({
        module: '@atomic-design/design-tokens',
        tokensTable: <ColorsTokensTable deps={props.deps} />
    })

    return <Section caption={colorsTokens.title} >
        {description}
    </Section>;
}

function ColorsTokensTable (props: WithDeps<Atoms.AtomContext<"TD"> & Atoms.AtomContext<"TH"> & Atoms.AtomContext<"Color">>) {

    const colorsEntries = Object.entries(designTokens).filter(([,{ space, kind, step }]) => step && space === 'color' && kind && !['background', 'text', 'border'].includes(kind));
    const tokens = Object.fromEntries(colorsEntries);

    const kinds = [...new Set(colorsEntries.map(([, { kind }]) => kind))] as string[];
    const steps = [...new Set(colorsEntries.map(([, { step }]) => step))] as string[];

    const { deps: {
        atoms: {
            TD, TH, Color
        },
    } } = props;

    return <table>
        <thead>
            <tr>
                <TH />{steps.map((step) => <TH key={step}>{step}</TH>)}
            </tr>
        </thead>
        <tbody>
            {kinds.map((kind) => <tr key={kind}>
                <TH>{kind}</TH>
                {steps.map((step) => <TD key={step}>
                    <Color color={tokens[getToken("color", kind, step)].value} />
                </TD>)}
            </tr>)}
        </tbody>
    </table>;
}

function getToken(space: string, kind: string, step: string) {
   return `${space}-${kind}-${step}`;
}



```

## packages/example_vike/components/sections/design-tokens/DesignTokensHeader.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { OneContextItem } from "@atomic-design/di";
import React from "react";
import { DesignTokens } from "~/components/sections/design-tokens/i18n/types";

type Deps = OneContextItem<"i18n", "designTokens", DesignTokens>;

export const DesignTokensHeader = (props: WithDeps<Deps>) => {
    return <h1>{props.deps.i18n.designTokens.pageTitle}</h1>;
}

```

## packages/example_vike/components/sections/design-tokens/i18n/de.tsx

```typescript
import { DesignTokens } from "./types";

export const designTokens: DesignTokens = {
    pageTitle: "Design Tokens",
    colorsTokens: {
        title: "Farb-Tokens",
        description: ({ module, tokensTable }) => (
            <>
                <p>Diese Demo zeigt die Kern-Design-Tokens von <code>{module}</code>.</p>
                {tokensTable}
            </>
        ),
    },
};

```

## packages/example_vike/components/sections/design-tokens/i18n/en.tsx

```typescript
import { DesignTokens } from "./types";

export const designTokens: DesignTokens = {
    pageTitle: "Design Tokens",
    colorsTokens: {
        title: "Colors Tokens",
        description: ({ module, tokensTable }) => <>
            <p>This demo shows core design tokens from <code>{module}</code>.</p>
            {tokensTable}
        </>
    }
};

```

## packages/example_vike/components/sections/design-tokens/i18n/types.ts

```typescript
import { ReactNode } from "react";

export interface DesignTokens {
    pageTitle: string,
    colorsTokens: {
        title: string,
        description: (props: { module: string, tokensTable: ReactNode }) => ReactNode
    }
}

```

## packages/example_vike/components/sections/design-tokens/index.ts

```typescript
import { DesignTokensHeader } from './DesignTokensHeader';
import { ColorsTokens } from './ColorsTokens';
import { SpacesTokens } from './SpacesTokens';

export { ColorsTokens, DesignTokensHeader, SpacesTokens };

```

## packages/example_vike/components/sections/design-tokens/SpacesTokens.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { Atoms, Store } from "@atomic-design/types";
import { designTokens } from "~/database/designTokens";
import { OneContextItem } from "@atomic-design/di";
import React from "react";
import { DesignTokens } from "~/components/sections/design-tokens/i18n/types";

type Deps = Atoms.AtomContext<"TD">
    & Atoms.AtomContext<"TH">
    & Atoms.AtomContext<"Color">
    & Atoms.AtomContext<"Section">
    & Store.StoreHooksContext<"useSpace">
    & Store.StoreHooksContext<"useValue">
    & OneContextItem<"i18n", "designTokens", DesignTokens>;

export const SpacesTokens = (props: WithDeps<Deps>) => {
    const { deps: {
        atoms: {
            Section
        },
        i18n: { designTokens: { colorsTokens } }
    } } = props;

    const description = colorsTokens.description({
        module: '@atomic-design/design-tokens',
        tokensTable: <SpacesTokensTable deps={props.deps} />
    })

    return <Section caption={colorsTokens.title} >
        {description}
    </Section>;
}

function SpacesTokensTable (props: WithDeps<Atoms.AtomContext<"TD"> & Atoms.AtomContext<"TH"> & Atoms.AtomContext<"Color">>) {

    const spacesEntries = Object.entries(designTokens).filter(([,{ space, step }]) => step && space === 'spacing');
    const tokens = Object.fromEntries(spacesEntries);

    const steps = [...new Set(spacesEntries.map(([, { step }]) => step))] as string[];

    const { deps: {
        atoms: {
            TD, TH
        },
    } } = props;

    return <table>
        <tbody>
            {steps.map((step) => {
                const value = tokens[getToken("spacing", step)].value;
                const el = <div style={{ width: '20px', height: '20px', backgroundColor: 'grey', margin: value }}/>;
                return <tr key={step}>
                    <TH>{step}</TH>
                    <TD>
                        {value}
                    </TD>
                    <TD>
                        <div style={{ width: "max-content", display: 'flex', flex: '0 0 auto', border: '1px solid grey' }}>{el}</div>
                    </TD>
                </tr>;
            })}
        </tbody>
    </table>;
}

function getToken(space: string, step: string) {
   return `${space}-${step}`;
}



```

## packages/example_vike/database/designTokens/index.ts

```typescript
import cssTokens from "~/database/designTokens/styles.module.scss";

export interface Token {
    token: string;
    space: string;
    kind?: string;
    step?: string;
    value: string;
}

const nameParsers = {
    border: ([step]: string[]) => ({ step }),
    color: ([kind, step]: string[]) => ({ kind, step }),
    breakpoint: ([step]: string[]) => ({ step }),
    shadow: ([step]: string[]) => ({ step }),
    width: ([step]: string[]) => ({ step }),
    height: ([step]: string[]) => ({ step }),
    spacing: ([step]: string[]) => ({ step }),
    fontSize: ([kind, step]: string[]) => ({ kind, step }),
    lineHeight: ([kind, step]: string[]) => ({ kind, step }),
    fontWeight: ([kind, step]: string[]) => ({ kind, step }),
    letterSpacing: ([kind, step]: string[]) => ({ kind, step }),
    zIndex: ([kind]: string[]) => ({ kind }),
} as const;

export const designTokens = Object.fromEntries(
    Object.entries(cssTokens)
        .map(([token, value]) => {
            const [space, ...parts] = token.split('-');
            const nameParser = space in nameParsers ? nameParsers[space as keyof typeof nameParsers] : () => ({});
            return [token, { token, space, ...(nameParser ? nameParser(parts) : {}), value } as Token];
        })
);

```

## packages/example_vike/database/designTokens/styles.module.scss

```scss
@use "sass:meta";
@use "sass:list";
@use "../../../../node_modules/@atomic-design/design-tokens/index" as tokens;

$export-types: ("number", "string", "color", "bool", null, "list");

:export {
  @each $name, $value in meta.module-variables(tokens) {
    @if list.index($export-types, meta.type-of($value)) != null {
      #{$name}: $value;
    }
  }
}

```

## packages/example_vike/database/todoItems.ts

```typescript
interface TodoItem {
  text: string;
}

const todosDefault = [{ text: "Buy milk" }, { text: "Buy strawberries" }];

const database =
  // We create an in-memory database.
  // - We use globalThis so that the database isn't reset upon HMR.
  // - The database is reset when restarting the server, use a proper database (SQLite/PostgreSQL/...) if you want persistent data.
  // biome-ignore lint:
  ((globalThis as unknown as { __database: { todos: TodoItem[] } }).__database ??= { todos: todosDefault });

const { todos } = database;

export { todos };
export type { TodoItem };

```

## packages/example_vike/layouts/AppWrapper.tsx

```typescript
import * as React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { AtomicProvider } from "~/components/atomicContext";
import { locales } from "~/locales";
import { useMemo } from "react";

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const { locale } = usePageContext() as unknown as { locale: typeof locales[number] };
    const variants = useMemo<Parameters<typeof AtomicProvider>[0]["variants"]>(() => ({
       i18n: locale
    }), [locale]);
    return <AtomicProvider variants={variants}>{ children }</AtomicProvider>;
}

```

## packages/example_vike/layouts/LayoutDefault.tsx

```typescript
import "./style.css";
import logoUrl from "../assets/logo.svg";
import { Link, AtomicProvider } from "~/components/atomic";
import * as React from "react";
import { AppWrapper } from "~/layouts/AppWrapper";

export function LayoutDefault({ children }: { children: React.ReactNode }) {
    return <AppWrapper>
        <div
            style={{
                display: "flex",
                maxWidth: 900,
                margin: "auto",
            }}
        >
            <Sidebar>
                <Logo/>

                        <Link href="/">Welcome</Link>
                        <Link color="Success" href="/todo">Todo</Link>
                        <Link href="/design-tokens">Design Tokens</Link>
                        <AtomicProvider space="contextName" variant="v2">
                            <Link href="/star-wars">Data Fetching</Link>
                        </AtomicProvider>

            </Sidebar>
            <Content>{children}</Content>
        </div>
    </AppWrapper>;
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

```

## packages/example_vike/layouts/style.css

```css
/* Links */
a {
  text-decoration: none;
}
#sidebar a {
  padding: 2px 10px;
  margin-left: -10px;
}
#sidebar a.is-active {
  background-color: #eee;
}

/* Reset */
body {
  margin: 0;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}

/* Page Transition Animation */
#page-content {
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}
body.page-is-transitioning #page-content {
  opacity: 0;
}

```

## packages/example_vike/locales/extractLocale.ts

```typescript
import { localeDefault } from './locales'

export function extractLocale(urlPathname: string) {
    const [ _, locale, urlPathnameWithoutLocale = '' ] = urlPathname.split('/', 3)
    return {
        locale: locale || localeDefault,
        urlPathnameWithoutLocale: `/${urlPathnameWithoutLocale}`
    }
}

```

## packages/example_vike/locales/index.ts

```typescript
export { extractLocale } from './extractLocale'
export { locales, localeDefault } from './locales'

```

## packages/example_vike/locales/locales.ts

```typescript
export const locales = ['en-US', 'de-DE'] as const;
export const localeDefault = locales[0]

```

## packages/example_vike/package.json

```json
{
  "scripts": {
    "dev": "vike dev",
    "build": "vike build",
    "preview": "vike preview"
  },
  "dependencies": {
    "vike": "^0.4.231",
    "@vitejs/plugin-react": "^4.5.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "vike-react": "^0.6.5",
    "@atomic-design/design-tokens": "*",
    "@atomic-design/styles-base": "*",
    "@atomic-design/atoms-base": "*",
    "@atomic-design/molecules-base": "*",
    "@atomic-design/store-react-context": "*",
    "@atomic-design/di": "*",
    "@atomic-design/types": "*"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "@types/react": "^19.1.1",
    "@types/react-dom": "^19.1.2",
    "sass-embedded": "^1.89.2"
  },
  "type": "module",
  "private": true
}

```

## packages/example_vike/pages/_error/+Page.tsx

```typescript
import { usePageContext } from "vike-react/usePageContext";

export default function Page() {
  const { is404 } = usePageContext();
  if (is404) {
    return (
      <>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </>
    );
  }
  return (
    <>
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong.</p>
    </>
  );
}

```

## packages/example_vike/pages/+config.ts

```typescript
import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import { LayoutDefault } from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout: LayoutDefault,
  passToClient: ['pageProps', 'locale', 'urlLogical'],

  // https://vike.dev/head-tags
  title: "My Vike App",
  description: "Demo showcasing Vike",

  extends: vikeReact,
  stream: true,
} satisfies Config;

```

## packages/example_vike/pages/+Head.tsx

```typescript
// https://vike.dev/Head

import logoUrl from "../assets/logo.svg";

export default function HeadDefault() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
    </>
  );
}

```

## packages/example_vike/pages/+onBeforeRoute.ts

```typescript
import { PageContext } from "vike/types";

export default onBeforeRoute

import { extractLocale } from '~/locales'
import { modifyUrl } from 'vike/modifyUrl'

function onBeforeRoute(pageContext: PageContext) {
    const url = pageContext.urlParsed
    const { urlPathnameWithoutLocale, locale } = extractLocale(url.pathname)
    const urlLogical = modifyUrl(url.href, { pathname: urlPathnameWithoutLocale });
    return {
        pageContext: {
            // Make `locale` available as pageContext.locale
            locale,
            // Vike's router will use pageContext.urlLogical instead of pageContext.urlOriginal
            urlLogical,
        },
    }
}

```

## packages/example_vike/pages/+onPageTransitionEnd.ts

```typescript
import type { OnPageTransitionEndAsync } from "vike/types";

export const onPageTransitionEnd: OnPageTransitionEndAsync = async () => {
  console.log("Page transition end");
  document.querySelector("body")?.classList.remove("page-is-transitioning");
};

```

## packages/example_vike/pages/+onPageTransitionStart.ts

```typescript
import type { OnPageTransitionStartAsync } from "vike/types";

export const onPageTransitionStart: OnPageTransitionStartAsync = async () => {
  console.log("Page transition start");
  document.querySelector("body")?.classList.add("page-is-transitioning");
};

```

## packages/example_vike/pages/design-tokens/+Page.tsx

```typescript
import React from 'react';
import { getServerReadyComponent } from "~/components/atomicContext";

export const ColorsTokens = getServerReadyComponent("sections", "ColorsTokens");
export const DesignTokensHeader = getServerReadyComponent("sections", "DesignTokensHeader");
export const SpacesTokens = getServerReadyComponent("sections", "SpacesTokens");

export default function Page() {
    return <>
        <DesignTokensHeader />
        <ColorsTokens />
        <SpacesTokens />
    </>;
}

```

## packages/example_vike/pages/index/+Page.tsx

```typescript
import { Counter } from "./Counter.js";

export default function Page() {
  return (
    <>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </>
  );
}

```

## packages/example_vike/pages/index/Counter.tsx

```typescript
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  );
}

```

## packages/example_vike/pages/star-wars/@id/+data.ts

```typescript
// https://vike.dev/data

import type { PageContextServer } from "vike/types";
import type { MovieDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async (pageContext: PageContextServer) => {
  // https://vike.dev/useConfig
  const config = useConfig();

  const response = await fetch(`https://brillout.github.io/star-wars/api/films/${pageContext.routeParams.id}.json`);
  let movie = (await response.json()) as MovieDetails;

  config({
    // Set <title>
    title: movie.title,
  });

  // We remove data we don't need because the data is passed to
  // the client; we should minimize what is sent over the network.
  movie = minimize(movie);

  return movie;
};

function minimize(movie: MovieDetails): MovieDetails {
  const { id, title, release_date, director, producer } = movie;
  const minimizedMovie = { id, title, release_date, director, producer };
  return minimizedMovie;
}

```

## packages/example_vike/pages/star-wars/@id/+Page.tsx

```typescript
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const movie = useData<Data>();
  return (
    <>
      <h1>{movie.title}</h1>
      Release Date: {movie.release_date}
      <br />
      Director: {movie.director}
      <br />
      Producer: {movie.producer}
    </>
  );
}

```

## packages/example_vike/pages/star-wars/index/+data.ts

```typescript
// https://vike.dev/data

import type { Movie, MovieDetails } from "../types.js";
import { useConfig } from "vike-react/useConfig";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  // https://vike.dev/useConfig
  const config = useConfig();

  const response = await fetch("https://brillout.github.io/star-wars/api/films.json");
  const moviesData = (await response.json()) as MovieDetails[];

  config({
    // Set <title>
    title: `${moviesData.length} Star Wars Movies`,
  });

  // We remove data we don't need because the data is passed to the client; we should
  // minimize what is sent over the network.
  const movies = minimize(moviesData);

  return movies;
};

function minimize(movies: MovieDetails[]): Movie[] {
  return movies.map((movie) => {
    const { title, release_date, id } = movie;
    return { title, release_date, id };
  });
}

```

## packages/example_vike/pages/star-wars/index/+Page.tsx

```typescript
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export default function Page() {
  const movies = useData<Data>();
  return (
    <>
      <h1>Star Wars Movies</h1>
      <ol>
        {movies.map(({ id, title, release_date }) => (
          <li key={id}>
            <a href={`/star-wars/${id}`}>{title}</a> ({release_date})
          </li>
        ))}
      </ol>
      <p>
        Source: <a href="https://brillout.github.io/star-wars">brillout.github.io/star-wars</a>.
      </p>
    </>
  );
}

```

## packages/example_vike/pages/star-wars/types.ts

```typescript
export type Movie = {
  id: string;
  title: string;
  release_date: string;
};

export type MovieDetails = Movie & {
  director: string;
  producer: string;
};

```

## packages/example_vike/pages/todo/+config.ts

```typescript
export const config = {
  prerender: false,
};

```

## packages/example_vike/pages/todo/+data.ts

```typescript
// https://vike.dev/data
import { todos } from "../../database/todoItems";
import type { PageContextServer } from "vike/types";

export type Data = {
  todo: { text: string }[];
};

export default async function data(_pageContext: PageContextServer): Promise<Data> {
  return { todo: todos };
}

```

## packages/example_vike/pages/todo/+Page.tsx

```typescript
import type { Data } from "./+data";
import { useData } from "vike-react/useData";
import { TodoList } from "./TodoList.js";

export default function Page() {
  const data = useData<Data>();
  return (
    <>
      <h1>To-do List</h1>
      <TodoList initialTodoItems={data.todo} />
    </>
  );
}

```

## packages/example_vike/pages/todo/TodoList.tsx

```typescript
import { useState } from "react";

export function TodoList({ initialTodoItems }: { initialTodoItems: { text: string }[] }) {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [newTodo, setNewTodo] = useState("");
  return (
    <>
      <ul>
        {todoItems.map((todoItem, index) => (
          // biome-ignore lint:
          <li key={index}>{todoItem.text}</li>
        ))}
      </ul>
      <div>
        <form
          onSubmit={async (ev) => {
            ev.preventDefault();

            // Optimistic UI update
            setTodoItems((prev) => [...prev, { text: newTodo }]);
          }}
        >
          <input type="text" onChange={(ev) => setNewTodo(ev.target.value)} value={newTodo} />
          <button type="submit">Add to-do</button>
        </form>
      </div>
    </>
  );
}

```

## packages/example_vike/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "types": ["vite/client", "vike-react"],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "~/*": ["./*"]
    }
  },
  "include": ["."],
  "exclude": ["dist"]
}

```

## packages/example_vike/vite.config.ts

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import { resolve } from "path";

export default defineConfig({
  plugins: [vike(), react({})],
  build: {
    target: "es2022",
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./"),
    },
  },
  css: {
    modules: {
      exportGlobals: true,
    },
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
});

```

## packages/molecules-base/index.scss

```scss
@forward "src/helpers";

```

## packages/molecules-base/package.json

```json
{
  "name": "@atomic-design/molecules-base",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "sideEffects": false,
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@atomic-design/di": "*",
    "@atomic-design/types": "*"
  },
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "codools": "^0.2.17",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.3.5",
    "vite-plugin-dts": "^4.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}

```

## packages/molecules-base/src/index.ts

```typescript
import { Link } from "~/molecules/Link";
import { Button } from "~/molecules/Button";

export const moleculesContext = {
    molecules: {
        Link,
        Button,
    }
};

```

## packages/molecules-base/src/molecules/Button.tsx

```typescript
import { memo } from "react";
import { WithDeps } from "@atomic-design/di";
import { Molecules, Atoms } from "@atomic-design/types";

export const Button = memo(function Button(props: Molecules.MoleculeProps<"Button"> & WithDeps<Atoms.AtomContext<"Button">>) {
    const { deps, ...otherProps } = props;
    const { atoms: { Button } } = deps;
    return <Button {...otherProps} />
});

```

## packages/molecules-base/src/molecules/Link.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import { memo } from "react";
import type { Molecules, MoleculesHooks, Atoms } from "@atomic-design/types";

export const Link = memo(function Link(props: Molecules.MoleculeProps<"Link"> & WithDeps<Atoms.AtomContext<"Link"> & MoleculesHooks.MoleculeHooksContext<"useLinkProps">>) {
    const { href, deps, active, ...otherProps } = props;
    const { atoms: { Link }, moleculesHooks: { useLinkProps } } = deps;
    const linkProps = useLinkProps(href);
    return <Link {...otherProps} {...linkProps} />
});

```

## packages/molecules-base/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/molecules-base/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## packages/molecules-base/vite.config.ts

```typescript
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
            name: 'MoleculesBase',
            fileName: 'index',
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                'react/jsx-dev-runtime'
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'React',
                    'react/jsx-dev-runtime': 'React'
                }
            }
        }
    }
});

```

## packages/store-react-context/package.json

```json
{
  "name": "@atomic-design/store-react-context",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "sideEffects": false,
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "build": "vite build",
    "lint": "eslint ."
  },
  "dependencies": {
    "lodash-es": "^4.17.21",
    "@atomic-design/types": "*"
  },
  "peerDependencies": {
    "react": "^18.2.0 || ^19.0.0",
    "react-dom": "^18.2.0 || ^19.0.0"
  },
  "devDependencies": {
    "@types/lodash-es": "^4.17.12",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "typescript": "^5.8.2",
    "vite": "^6.3.5",
    "vite-plugin-dts": "^4.5.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}

```

## packages/store-react-context/src/index.ts

```typescript
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

```

## packages/store-react-context/src/store/spaceContext.tsx

```typescript
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

```

## packages/store-react-context/src/store/valueContext.tsx

```typescript
import { ReactNode, createContext, useMemo, useContext } from "react";
import { Store } from "@atomic-design/types";
import { get } from "lodash-es";

const ValueContext = createContext<Record<string, { value: unknown, meta: unknown }>>({});

export interface ValueProviderProps {
    name: string;
    value: unknown;
    meta?: unknown;
    children: ReactNode;
}

export const ValueProvider = ({ name, value, meta, children }: ValueProviderProps) => {
    const parent = useContext(ValueContext);
    const newValue = useMemo(() => ({
        ...parent,
        [name]: { ...parent[name], value, meta }
    }), [parent, name, value]);
    return <ValueContext.Provider value={newValue} >
        {children}
    </ValueContext.Provider>
};

export const useValue: Store.StoreHook<"useValue"> = (space, path) => {
    return get(useContext(ValueContext), [space,'value',path].filter(Boolean).join('.')) as unknown;
}

export const useValueText: Store.StoreHook<"useValueText"> = (space, path, emptyValue) => {
    return (useValue(space, path) as string | undefined) ?? emptyValue;
}

```

## packages/store-react-context/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## packages/store-react-context/vite.config.ts

```typescript
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

```

## packages/styles-base/index.scss

```scss
@forward "src/helpers";
@forward "@atomic-design/design-tokens";

```

## packages/styles-base/package.json

```json
{
  "name": "@atomic-design/styles-base",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": ["dist/", "index.scss"],
  "style": "dist/index.css",
  "sass": "index.scss",
  "main": "./dist/index.umd.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs"
    },
    "./index.css": "./dist/index.css"
  },
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "build:scss": "vite build --mode scss",
    "build": "npm run build:scss && npm run test && vite build",
    "preview": "vite preview",
    "test": "tsc --project tsconfig.test.json",
    "lint": "eslint ."
  },
  "dependencies": {
    "@atomic-design/types": "*",
    "@atomic-design/design-tokens": "*"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "codools": "^0.2.17",
    "prettier": "^3.5.3",
    "sass-embedded": "^1.89.2",
    "typed-scss-modules": "^8.1.1",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.3.5",
    "vite-plugin-dts": "^4.5.3",
    "vite-plugin-pretty-module-classnames": "^1.4.1"
  }
}

```

## packages/styles-base/src/helpers/colors.scss

```scss
@use "@atomic-design/design-tokens" as tokens;

@mixin colors-classes {
  @each $name, $colors in tokens.$color-map {
    &.color-#{$name} {
      @content($colors);
    }
  }
}

```

## packages/styles-base/src/helpers/index.scss

```scss
@forward "colors";

```

## packages/styles-base/src/index.ts

```typescript
import link from "./styles/link.module.scss";
import button from "./styles/button.module.scss";
import input from "./styles/input.module.scss";
import header from "./styles/header.module.scss";
import footer from "./styles/footer.module.scss";
import separator from "./styles/separator.module.scss";
import card from "./styles/card.module.scss";
import table from "./styles/table.module.scss";
import td from "./styles/td.module.scss";
import th from "./styles/th.module.scss";
import color from "./styles/color.module.scss";
import section from "./styles/section.module.scss";

export const stylesContext = {
    styles: {
        link,
        button,
        input,
        footer,
        header,
        separator,
        card,
        table,
        td,
        th,
        color,
        section,
    }
};

```

## packages/styles-base/src/styles/button.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.container {
  .icon, .before, .content, .after, .disabled, .focus, .sizeSmall, .sizeMedium, .sizeLarge {
    /* */
  }

  @include helpers.colors-classes() using($colors) {
    color: map.get($colors, 500);

    &:hover {
      color: map.get($colors, 600);
    }

    &:active, &.active {
      color: map.get($colors, 700);
    }
  }
}

```

## packages/styles-base/src/styles/button.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "button__container_c81fc";
      readonly icon: "button__icon_7a0e9";
      readonly before: "button__before_1723b";
      readonly content: "button__content_cf708";
      readonly after: "button__after_6e403";
      readonly disabled: "button__disabled_b3564";
      readonly focus: "button__focus_f50b6";
      readonly sizeSmall: "button__sizeSmall_b6a9a";
      readonly sizeMedium: "button__sizeMedium_5b55d";
      readonly sizeLarge: "button__sizeLarge_2bad8";
      readonly colorPrimary: "button__color-primary_61a40";
      readonly active: "button__active_ea8e8";
      readonly colorSecondary: "button__color-secondary_c7c79";
      readonly colorAccent: "button__color-accent_51d84";
      readonly colorSuccess: "button__color-success_eb0cd";
      readonly colorDanger: "button__color-danger_35f94";
      readonly colorWarning: "button__color-warning_eca27";
      readonly colorInfo: "button__color-info_85c1e";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/card.module.scss

```scss
@use "@atomic-design/design-tokens" as tokens;
@use "../helpers" as helpers;
@use "sass:map";

.container {
  .thumbnail, .before, .content, .after, .sizeSmall, .sizeMedium, .sizeLarge {
    /* */
  }

  border: solid tokens.$border-md;
  border-radius: tokens.$radius-md;
  @include helpers.colors-classes() using($colors) {
    border-color: map.get($colors, 500);
  }
}

```

## packages/styles-base/src/styles/card.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "card__container_51624";
      readonly thumbnail: "card__thumbnail_ab2c5";
      readonly before: "card__before_3731b";
      readonly content: "card__content_6e47f";
      readonly after: "card__after_295fb";
      readonly sizeSmall: "card__sizeSmall_467a6";
      readonly sizeMedium: "card__sizeMedium_162e5";
      readonly sizeLarge: "card__sizeLarge_ada7b";
      readonly colorPrimary: "card__color-primary_fec73";
      readonly colorSecondary: "card__color-secondary_fe478";
      readonly colorAccent: "card__color-accent_8959a";
      readonly colorSuccess: "card__color-success_56f58";
      readonly colorDanger: "card__color-danger_38479";
      readonly colorWarning: "card__color-warning_fdd29";
      readonly colorInfo: "card__color-info_ae9ce";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/color.module.scss

```scss
@use "@atomic-design/design-tokens" as tokens;

.container {
  width: tokens.$fontSize-subtitle-1;
  height: tokens.$fontSize-subtitle-1;
}

```

## packages/styles-base/src/styles/color.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "color__container_39634";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/footer.module.scss

```scss
.container {
  .icon, .before, .content, .after {
    /*   */
  }
}

```

## packages/styles-base/src/styles/footer.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "footer__container_28a24";
      readonly icon: "footer__icon_f6fec";
      readonly before: "footer__before_22c9a";
      readonly content: "footer__content_0b9e7";
      readonly after: "footer__after_8c1bd";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/header.module.scss

```scss
.container {
  .icon, .before, .content, .after {
    /*   */
  }
}

```

## packages/styles-base/src/styles/header.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "header__container_69153";
      readonly icon: "header__icon_e5c9e";
      readonly before: "header__before_21ad7";
      readonly content: "header__content_cc0b1";
      readonly after: "header__after_72659";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/input.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.container {
  .label, .before, .content, .after,
  .disabled, .active, .focus,
  .sizeSmall, .sizeMedium, .sizeLarge,
  .typeBoolean, .typeTextarea,
  .read, .editInRead, .canEditInRead {
    /*   */
  }

  @include helpers.colors-classes() using($colors) {
    /*   */
  }
}

```

## packages/styles-base/src/styles/input.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "input__container_65104";
      readonly label: "input__label_03f8f";
      readonly before: "input__before_a122e";
      readonly content: "input__content_5ab98";
      readonly after: "input__after_0079d";
      readonly disabled: "input__disabled_e7364";
      readonly active: "input__active_b005a";
      readonly focus: "input__focus_308ac";
      readonly sizeSmall: "input__sizeSmall_08314";
      readonly sizeMedium: "input__sizeMedium_e2d87";
      readonly sizeLarge: "input__sizeLarge_b5527";
      readonly typeBoolean: "input__typeBoolean_3d254";
      readonly typeTextarea: "input__typeTextarea_b28c8";
      readonly read: "input__read_be628";
      readonly editInRead: "input__editInRead_13b31";
      readonly canEditInRead: "input__canEditInRead_10dcf";
      readonly colorPrimary: "input__color-primary_5d04e";
      readonly colorSecondary: "input__color-secondary_2eeed";
      readonly colorAccent: "input__color-accent_1f98f";
      readonly colorSuccess: "input__color-success_95639";
      readonly colorDanger: "input__color-danger_8f6ae";
      readonly colorWarning: "input__color-warning_9bb49";
      readonly colorInfo: "input__color-info_1eb4b";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/link.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.container {
  .icon, .before, .content, .after,
  .disabled, .focus,
  .sizeSmall, .sizeMedium, .sizeLarge {
    /* */
  }

  @include helpers.colors-classes() using($colors) {
    color: map.get($colors, 500);

    &:hover {
      color: map.get($colors, 600);
    }

    &:active, &.active {
      color: map.get($colors, 700);
    }
  }
}

```

## packages/styles-base/src/styles/link.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "link__container_17dfe";
      readonly icon: "link__icon_bc073";
      readonly before: "link__before_4579c";
      readonly content: "link__content_8bac0";
      readonly after: "link__after_0f1e9";
      readonly disabled: "link__disabled_748d9";
      readonly focus: "link__focus_c503a";
      readonly sizeSmall: "link__sizeSmall_57a28";
      readonly sizeMedium: "link__sizeMedium_b8223";
      readonly sizeLarge: "link__sizeLarge_d08f9";
      readonly colorPrimary: "link__color-primary_16200";
      readonly active: "link__active_356f6";
      readonly colorSecondary: "link__color-secondary_96ee7";
      readonly colorAccent: "link__color-accent_4e701";
      readonly colorSuccess: "link__color-success_daca1";
      readonly colorDanger: "link__color-danger_8c8ce";
      readonly colorWarning: "link__color-warning_e2a6a";
      readonly colorInfo: "link__color-info_a410e";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/section.module.scss

```scss
@use "@atomic-design/design-tokens" as tokens;
@use "../helpers" as helpers;
@use "sass:map";

.container {
  .icon, .caption, .subcaption, .content, .sizeSmall, .sizeMedium, .sizeLarge {
    /* */
  }

  @include helpers.colors-classes() using($colors) {
    color: map.get($colors, 500);
  }
}

```

## packages/styles-base/src/styles/section.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "section__container_8e953";
      readonly icon: "section__icon_dc49e";
      readonly caption: "section__caption_23769";
      readonly subcaption: "section__subcaption_9054d";
      readonly content: "section__content_a59d6";
      readonly sizeSmall: "section__sizeSmall_39fcd";
      readonly sizeMedium: "section__sizeMedium_db71b";
      readonly sizeLarge: "section__sizeLarge_41389";
      readonly colorPrimary: "section__color-primary_b07e1";
      readonly colorSecondary: "section__color-secondary_ae95c";
      readonly colorAccent: "section__color-accent_03fbb";
      readonly colorSuccess: "section__color-success_9ee7d";
      readonly colorDanger: "section__color-danger_e954d";
      readonly colorWarning: "section__color-warning_d108d";
      readonly colorInfo: "section__color-info_e2923";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/separator.module.scss

```scss
.container {
  /* */
}

```

## packages/styles-base/src/styles/separator.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly container: "separator__container_94639";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/table.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.table {
  .sizeSmall, .sizeMedium, .sizeLarge {
    /* */
  }
  @include helpers.colors-classes() using($colors) {
    /* */
  }
}

```

## packages/styles-base/src/styles/table.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly table: "table__table_4e23a";
      readonly sizeSmall: "table__sizeSmall_bc372";
      readonly sizeMedium: "table__sizeMedium_bbc83";
      readonly sizeLarge: "table__sizeLarge_e3ceb";
      readonly colorPrimary: "table__color-primary_df995";
      readonly colorSecondary: "table__color-secondary_54ea1";
      readonly colorAccent: "table__color-accent_c0e15";
      readonly colorSuccess: "table__color-success_32ae2";
      readonly colorDanger: "table__color-danger_d0c5f";
      readonly colorWarning: "table__color-warning_7c4bf";
      readonly colorInfo: "table__color-info_3aef0";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/td.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.td {
  @include helpers.colors-classes() using($colors) {
    /* */
  }
}

```

## packages/styles-base/src/styles/td.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly td: "td__td_aa986";
      readonly colorPrimary: "td__color-primary_662c2";
      readonly colorSecondary: "td__color-secondary_a6164";
      readonly colorAccent: "td__color-accent_92db6";
      readonly colorSuccess: "td__color-success_dc066";
      readonly colorDanger: "td__color-danger_dacfd";
      readonly colorWarning: "td__color-warning_aa7be";
      readonly colorInfo: "td__color-info_d51f9";
    };
    export = classNames;
                        
```

## packages/styles-base/src/styles/th.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.th {
  @include helpers.colors-classes() using($colors) {
    /* */
  }
}

```

## packages/styles-base/src/styles/th.module.scss.d.ts

```typescript

    declare const classNames: {
      readonly th: "th__th_ff332";
      readonly colorPrimary: "th__color-primary_e4eca";
      readonly colorSecondary: "th__color-secondary_32aa8";
      readonly colorAccent: "th__color-accent_6bf44";
      readonly colorSuccess: "th__color-success_af9f0";
      readonly colorDanger: "th__color-danger_9faa5";
      readonly colorWarning: "th__color-warning_95085";
      readonly colorInfo: "th__color-info_40af7";
    };
    export = classNames;
                        
```

## packages/styles-base/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/styles-base/test-dts/index.test-d.ts

```typescript
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

```

## packages/styles-base/tsconfig.json

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": ["src"]
}

```

## packages/styles-base/tsconfig.test.json

```json
{
  "extends": "./tsconfig.json",
  "include": ["test-dts/index.test-d.ts"],
  "compilerOptions": {
    "noEmit": true
  }
}

```

## packages/styles-base/vite.config.ts

```typescript
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

```

## packages/types/package.json

```json
{
  "name": "@atomic-design/types",
  "version": "0.1.0",
  "private": false,
  "type": "module",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts"
    },
    "./styles": {
      "types": "./dist/styles.d.ts"
    },
    "./atoms": {
      "types": "./dist/atoms.d.ts"
    },
    "./molecules": {
      "types": "./dist/molecules.d.ts"
    },
    "./moleculesHooks": {
      "types": "./dist/moleculesHooks.d.ts"
    },
    "./store": {
      "types": "./dist/store.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "install_and_build": "npm i && npm run build",
    "build": "tsc -p tsconfig.json"
  },
  "dependencies": {
    "@atomic-design/di": "*"
  },
  "devDependencies": {
    "typescript": "^5.8.2"
  }
}

```

## packages/types/src/atoms.ts

```typescript
import { ComponentProps, type ComponentType } from "react";
import { OneContextItem, ReactNodes } from "@atomic-design/di";

export type AtomContext<T extends keyof AtomsProps> = OneContextItem<"atoms", T, ComponentType<AtomProps<T>>>;

export interface AtomsProps {
    Link: ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ComponentProps<"a">;
    Button: ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ComponentProps<"button">;
    Card: CardPartsContainer & ColorsProps & SizeProps & ComponentProps<"div">;
    Section: SectionPartsContainer & ColorsProps & SizeProps & ComponentProps<"div">;
    Table: ComponentProps<"table">;
    TD: ComponentProps<"td">;
    TH: ComponentProps<"th">;
    Color: ComponentProps<"div"> & { color?: string };
}
export type AtomProps<T extends keyof AtomsProps> = AtomsProps[T];

export interface InteractiveProps {
    readonly disabled?: boolean;
    readonly active?: boolean;
    readonly focus?: boolean;
}

export type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";

export interface ColorsProps {
    readonly color?: Colors;
}

export type Sizes = "small" | "medium" | "large";

export interface SizeProps {
    readonly size?: Sizes;
}

export type InputTypes = "input" | "textarea" | "boolean";

export interface InputTypeProps {
    readonly inputType?: InputTypes;
}

export interface EditAndReadProps {
    readonly read?: boolean;
    readonly editInRead?: boolean;
    readonly canEditInRead?: boolean;
}

export type Container = ReactNodes<"children">;


export type ManyPartsContainer = ReactNodes<"icon" | "before" |"after" >;
export type CardPartsContainer = ReactNodes<"thumbnail" | "before" |"after" >;
export type SectionPartsContainer = ReactNodes<"icon" | "caption" | "subcaption" >;
export type InputContainer = ReactNodes<"label" | "before" |"after" >;

```

## packages/types/src/index.ts

```typescript
export * as Store from "./store";
export * as Styles from "./styles";
export * as Atoms from "./atoms";
export * as Molecules from "./molecules";
export * as MoleculesHooks from "./moleculesHooks";

```

## packages/types/src/molecules.ts

```typescript
import type { OneContextItem } from "@atomic-design/di";
import { AtomProps } from "./atoms";
import { ComponentType } from "react";

export type MoleculeContext<T extends keyof MoleculesProps> = OneContextItem<"molecules", T, ComponentType<MoleculeProps<T>>>;

export type MoleculeProps<T extends keyof MoleculesProps> = MoleculesProps[T];

export interface MoleculesProps {
    Link: AtomProps<"Link">;
    Button: AtomProps<"Button">;
    Card: AtomProps<"Card">;
    Table: AtomProps<"Table">;
    TD: AtomProps<"TD">;
    TH: AtomProps<"TH">;
}

```

## packages/types/src/moleculesHooks.ts

```typescript
import { OneContextItem } from "@atomic-design/di";
import type { AtomProps } from "./atoms";

export interface MoleculesHooks {
    useLinkProps: (href: string | undefined) => AtomProps<"Link">;
}

export type MoleculesHook <T extends keyof MoleculesHooks> = MoleculesHooks[T];

export type MoleculeHooksContext<T extends keyof MoleculesHooks> = OneContextItem<"moleculesHooks", T, MoleculesHooks[T]>;

```

## packages/types/src/store.ts

```typescript
import { OneContextItem } from "@atomic-design/di";

export interface StoreHooks {
    useSpace: () => SpaceValue;
    useValue: (space: string | undefined, path: string | undefined) => unknown;
    useValueText: (space: string | undefined, path: string | undefined, emptyValue?: string) => string | undefined;
}
export type StoreHook <T extends keyof StoreHooks> = StoreHooks[T];

export type StoreHooksContext <T extends keyof StoreHooks> = OneContextItem<"storeHooks", T, StoreHooks[T]>;

export interface SpaceValue {
    type: SpaceType;
    space: string;
    paths: string[];
}

export const SpaceTypes = {
    FORM_ROOT: "FORM_ROOT",
    LIST_HEADER: "LIST_HEADER",
    LIST_ROW: "LIST_ROW",
    SUBLIST_HEADER: "SUBLIST_HEADER",
    SUBLIST_ROW: "SUBLIST_ROW",
    FORM_FILTER: "FORM_FILTER",
    LIST_FOOTER: "LIST_FOOTER",
} as const;

export type SpaceType = typeof SpaceTypes[keyof typeof SpaceTypes];

```

## packages/types/src/styles.ts

```typescript
import { ClassNames, OneStyleContext } from "@atomic-design/di";

export type Style <T extends keyof Styles> = Styles[T];

export type StyleContext <T extends keyof Styles> = OneStyleContext<T, Style<T>>;

export interface Styles {
    link: ManyPartsContainer & Interactive & WithColors & WithSize;
    button: ManyPartsContainer & Interactive & WithColors & WithSize;
    input: InputContainer & Interactive & WithColors & WithSize & InputType & EditAndRead;
    header: ManyPartsContainer;
    footer: ManyPartsContainer;
    separator: Container;
    card: CardPartsContainer & WithColors & WithSize;
    section: SectionPartsContainer & WithColors & WithSize;
    table: Required<ClassNames<"table">> & WithColors & WithSize;
    td: Required<ClassNames<"td">>;
    th: Required<ClassNames<"th">>;
    color: Container;
}

export type Interactive = ClassNames<"disabled" | "active" | "focus">;
export type WithColors = ClassNames<"colorPrimary" | "colorSecondary" | "colorAccent" | "colorSuccess" | "colorDanger" | "colorWarning" | "colorInfo">;
export type WithSize = ClassNames<"sizeSmall" | "sizeMedium" | "sizeLarge">;
export type Container = Required<ClassNames<"container">>;
export type ManyPartsContainer = Container & ClassNames<"icon" | "before" | "content" | "after">;
export type CardPartsContainer = Container & ClassNames<"thumbnail" | "before" | "content" | "after">;
export type SectionPartsContainer = Container & ClassNames<"icon" | "caption" | "subcaption" | "content">;
export type InputType = ClassNames<"typeBoolean" | "typeTextarea">;
export type InputContainer = Container & ClassNames<"label" | "before" | "content" | "after">;
export type EditAndRead = ClassNames<"read" | "editInRead" | "canEditInRead">;

```

## packages/types/tsconfig.json

```json
{
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "moduleResolution": "bundler",
    "outDir": "dist",
    "declarationMap": false,
    "skipLibCheck": true,
    "strict": true,
    "target": "ESNext",
    "module": "ESNext"
  },
  "include": ["src"]
}

```
