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
    "packages/design-tokens",
    "packages/styles-base",
    "packages/atoms-base",
    "packages/molecules-base",
    "packages/example_vike",
    "packages/example_nextjs"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "docs": "npm run docs --workspaces",
    "docsAllInOne": "codools --root . --output docs/code.md",
    "test": "npm run test --workspaces"
  },
  "type": "module",
  "keywords": [],
  "author": "simprl",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.21.0",
    "@typescript-eslint/parser": "^8.21.0",
    "eslint": "^9.18.0",
    "codools": "^0.2.17"
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
  "files": [
    "dist"
  ],
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "classnames": "^2.5.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@atomic-design/di": "*",
    "@atomic-design/design-tokens": "*",
    "@atomic-design/styles-base": "*",
    "@eslint/js": "^9.23.0",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.5",
    "eslint-plugin-react": "^7.37.4",
    "globals": "^16.0.0",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.2.4",
    "vite-plugin-dts": "^4.5.3"
  }
}

```

## packages/atoms-base/src/atoms/Button.tsx

```typescript
import type { WithDeps } from "@atomic-design/di";
import type { ButtonStyles } from "@atomic-design/styles-base";
import type { ButtonAtomProps } from "~/types";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";
import { useState } from "react";

export function Button(props: ButtonAtomProps & WithDeps<ButtonStyles>) {
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

Button.contextProp = true;

```

## packages/atoms-base/src/atoms/Link.tsx

```typescript
import { WithDeps } from "@atomic-design/di";
import { LinkStyles } from "@atomic-design/styles-base";
import { LinkAtomProps } from "~/types";
import { classNameByColor, classNameByInteractive } from "~/helpers/classname";

export function Link(props: LinkAtomProps & WithDeps<LinkStyles>) {
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

## packages/atoms-base/src/helpers/classname.ts

```typescript
import { InteractiveProps, LinkAtomProps } from "~/types";
import { Interactive, WithColors } from "@atomic-design/styles-base";

export function classNameByColor(color: LinkAtomProps["color"], classNames: WithColors): string | undefined {
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

export function classNameByInteractive(props: InteractiveProps, classNames: Interactive): (string | undefined)[] {
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
import { AtomsContext } from "./types";
import { Button } from "./atoms/Button";

export type * from "./types";

export const atomsContext: Pick<AtomsContext, "atoms"> = {
    atoms: {
        Link,
        Button,
    }
};

```

## packages/atoms-base/src/types.ts

```typescript
import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import type { OneAtomContext } from "@atomic-design/di";
import type { LinkStyles, ButtonStyles } from "@atomic-design/styles-base";

export type AtomsContext = LinkAtomContext & ButtonAtomContext;

export type LinkAtomContext = OneAtomContext<"Link", LinkStyles, LinkAtomProps>;
export type LinkAtomProps = ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonAtomContext = OneAtomContext<"Button", ButtonStyles, ButtonAtomProps>;
export type ButtonAtomProps = ManyPartsContainer & InteractiveProps & ColorsProps & SizeProps & ButtonHTMLAttributes<HTMLButtonElement>;

export interface InteractiveProps {
    readonly disabled?: boolean;
    readonly active?: boolean;
    readonly focus?: boolean;
}

type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";

export interface ColorsProps {
    readonly color?: Colors;
}

type Sizes = "small" | "medium" | "large";

export interface SizeProps {
    readonly size?: Sizes;
}

type InputTypes = "input" | "textarea" | "boolean";

export interface InputTypeProps {
    readonly inputType?: InputTypes;
}

export interface EditAndReadProps {
    readonly read?: boolean;
    readonly editInRead?: boolean;
    readonly canEditInRead?: boolean;
}

export interface Container {
    readonly children: ReactNode;
}

export interface ManyPartsContainer extends Container {
    readonly icon?: ReactNode;
    readonly before?: ReactNode;
    readonly after?: ReactNode;
}

export interface InputContainer extends Container {
    readonly label?: ReactNode;
    readonly before?: ReactNode;
    readonly after?: ReactNode;
}



```

## packages/atoms-base/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/atoms-base/tsconfig.json

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
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client",
      "vike-react",
      "vite-plugin-vercel/types"
    ],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "~/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "src",
  ]
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
  "files": [
    "src/scss/",
    "index.scss"
  ],
  "style": "index.scss",
  "scripts": {
    "build": "tsup",
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
$text-title1-font-size: 48px !default;
$text-title1-line-height: 1.167 !default; // 56px / 48px
$text-title1-font-weight: 700 !default;
$text-title1-letter-spacing: -0.05em !default; // Tailwind 'tighter'

$text-title2-font-size: 36px !default;
$text-title2-line-height: 1.222 !default; // 44px / 36px
$text-title2-font-weight: 700 !default;
$text-title2-letter-spacing: -0.025em !default; // Tailwind 'tight'

$text-title3-font-size: 30px !default;
$text-title3-line-height: 1.200 !default; // 36px / 30px
$text-title3-font-weight: 600 !default;
$text-title3-letter-spacing: 0em !default; // Tailwind 'normal'

// Subtitles
$text-subtitle1-font-size: 24px !default;
$text-subtitle1-line-height: 1.333 !default; // 32px / 24px
$text-subtitle1-font-weight: 600 !default;
$text-subtitle1-letter-spacing: 0em !default; // Tailwind 'normal'

$text-subtitle2-font-size: 20px !default;
$text-subtitle2-line-height: 1.400 !default; // 28px / 20px
$text-subtitle2-font-weight: 500 !default;
$text-subtitle2-letter-spacing: 0em !default; // Tailwind 'normal'

// Body text
$text-body1-font-size: 16px !default;
$text-body1-line-height: 1.500 !default; // 24px / 16px
$text-body1-font-weight: 400 !default;
$text-body1-letter-spacing: 0em !default; // Tailwind 'normal'

$text-body2-font-size: 14px !default;
$text-body2-line-height: 1.429 !default; // 20px / 14px
$text-body2-font-weight: 400 !default;
$text-body2-letter-spacing: 0em !default; // Tailwind 'normal'

// Captions
$text-caption1-font-size: 12px !default;
$text-caption1-line-height: 1.333 !default; // 16px / 12px
$text-caption1-font-weight: 400 !default;
$text-caption1-letter-spacing: 0.025em !default; // Tailwind 'wide'

$text-caption2-font-size: 10px !default;
$text-caption2-line-height: 1.400 !default; // 14px / 10px
$text-caption2-font-weight: 400 !default;
$text-caption2-letter-spacing: 0.05em !default; // Tailwind 'wider'

// Overline
$text-overline-font-size: 10px !default;
$text-overline-line-height: 1.600 !default; // 16px / 10px
$text-overline-font-weight: 500 !default; // typically semi-bold
$text-overline-letter-spacing: 0.1em !default; // Tailwind 'widest'

// Mixins for typographic styles
@mixin title1 {
  font-size: $text-title1-font-size;
  font-weight: $text-title1-font-weight;
  line-height: $text-title1-line-height;
  letter-spacing: $text-title1-letter-spacing;
}

@mixin title2 {
  font-size: $text-title2-font-size;
  font-weight: $text-title2-font-weight;
  line-height: $text-title2-line-height;
  letter-spacing: $text-title2-letter-spacing;
}

@mixin title3 {
  font-size: $text-title3-font-size;
  font-weight: $text-title3-font-weight;
  line-height: $text-title3-line-height;
  letter-spacing: $text-title3-letter-spacing;
}

@mixin subtitle1 {
  font-size: $text-subtitle1-font-size;
  font-weight: $text-subtitle1-font-weight;
  line-height: $text-subtitle1-line-height;
  letter-spacing: $text-subtitle1-letter-spacing;
}

@mixin subtitle2 {
  font-size: $text-subtitle2-font-size;
  font-weight: $text-subtitle2-font-weight;
  line-height: $text-subtitle2-line-height;
  letter-spacing: $text-subtitle2-letter-spacing;
}

@mixin body1 {
  font-size: $text-body1-font-size;
  font-weight: $text-body1-font-weight;
  line-height: $text-body1-line-height;
  letter-spacing: $text-body1-letter-spacing;
}

@mixin body2 {
  font-size: $text-body2-font-size;
  font-weight: $text-body2-font-weight;
  line-height: $text-body2-line-height;
  letter-spacing: $text-body2-letter-spacing;
}

@mixin caption1 {
  font-size: $text-caption1-font-size;
  font-weight: $text-caption1-font-weight;
  line-height: $text-caption1-line-height;
  letter-spacing: $text-caption1-letter-spacing;
}

@mixin caption2 {
  font-size: $text-caption2-font-size;
  font-weight: $text-caption2-font-weight;
  line-height: $text-caption2-line-height;
  letter-spacing: $text-caption2-letter-spacing;
}

@mixin overline {
  font-size: $text-overline-font-size;
  font-weight: $text-overline-font-weight;
  line-height: $text-overline-line-height;
  letter-spacing: $text-overline-letter-spacing;
  text-transform: uppercase;
}

```

## packages/design-tokens/src/scss/z-index.scss

```scss
$z-index-dropdown: 1000 !default;
$z-index-sticky: 1020 !default;
$z-index-modal: 1040 !default;
$z-index-popover: 1060 !default;
$z-index-tooltip: 1080 !default;

```

## packages/design-tokens/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/di/index.scss

```scss
@forward "src/helpers";

```

## packages/di/package.json

```json
{
  "name": "@atomic-design/di",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "eslint-plugin-react-hooks": "^5.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.23.0",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.5",
    "eslint-plugin-react": "^7.37.4",
    "globals": "^16.0.0",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.2.4",
    "vite-plugin-dts": "^4.5.3"
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
        const parent = useContext(reactContext);
        const value = useMemo(async () => {
            const parentVariants = parent.variants;
            const newVariants = mergeVariants(parentVariants, variants, space, variant);
            const newContext = await variantManager.getVariant(newVariants);
            return { variants: newVariants, context: newContext };
        }, [parent, variants, space, variant]);
        const v = use(value);
        return <Provider value={v} >{children}</Provider>
    }

    const SuspenseProvider: typeof AtomicProvider = (props) => <Suspense><AtomicProvider {...props}/></Suspense>

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
    const getVariant = async (selectedVariants: {[SpaceName in keyof Ctx]?: keyof V[SpaceName]}) => {
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
        return Object.fromEntries(entries) as Ctx;
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

import type { ComponentType } from "react";

type OmitDeps<T> =  T extends PlainObject ? Omit<T, "deps"> : T;

type FunctionWithoutDeps<F> =
    F extends (this: infer T, props: infer P, ...args: infer A) => infer R ? (this: OmitDeps<T>, props: OmitDeps<P>, ...args: A) => R : never;

export type ComponentWithoutDeps<C> =
    C extends ComponentType<infer P>
        ? ComponentType<Omit<P, 'deps'>>
        : never;

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

export type DepsFunctionComponent<P = any, Deps = undefined> = ComponentType<P & WithDeps<Deps>>
export type DepsFunction<Arguments extends unknown[], Return, Deps = undefined> = Deps extends undefined ? (...props: Arguments) => Return : (this: WithDeps<Deps>, ...props: Arguments) => Return;

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

export type OneFunctionComponentContext<Space extends string, Name extends string, Props, Deps = undefined> = {
    [S in Space]: {
        [N in Name]: DepsFunctionComponent<Props, Deps>;
    }
}

export type OneFunctionContext<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = undefined> = {
    [S in Space]: {
        [N in Name]: DepsFunction<Arguments, Return, Deps>;
    }
}

export type OneFunctionComponentContextWithDeps<Space extends string, Name extends string, Props, Deps = undefined> =
    Deps extends undefined ? OneFunctionComponentContext<Space, Name, Props, Deps> : Deps & OneFunctionComponentContext<Space, Name, Props, Deps>;
export type OneFunctionContextWithDeps<Space extends string, Name extends string, Arguments extends unknown[], Return, Deps = undefined> =
    Deps extends undefined ? OneFunctionContext<Space, Name, Arguments, Return, Deps> : Deps & OneFunctionContext<Space, Name, Arguments, Return, Deps>;

export type OneAtomContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"atoms", Name, Props, Deps>;

export type OneMoleculeContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"molecules", Name, Props, Deps>;

export type OneMoleculeHelperContext<Name extends string, Arguments extends unknown[], Return, Deps = undefined> = OneFunctionContextWithDeps<"moleculesHelpers", Name, Arguments, Return, Deps>;

export type OneCellContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"cells", Name, Props, Deps>;
export type OneOrganContext<Name extends string, Deps, Props> = OneFunctionComponentContextWithDeps<"organs", Name, Props, Deps>;

```

## packages/di/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/di/tsconfig.json

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
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client",
      "vike-react",
      "vite-plugin-vercel/types"
    ],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "~/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "src",
  ]
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
    moleculesHelpers: () => blankDeps({
        useIsActiveLink: (href?: string) => {
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


```

## packages/example_vike/components/atomicContext.tsx

```typescript
"use client"
import "@atomic-design/styles-base/index.css";
import { blankDeps, extractComponentDeps, createVariantsContext } from "@atomic-design/di";
import { usePageContext } from "vike-react/usePageContext";

const [useAtomic, AtomicProvider, getServerReadyComponent] = createVariantsContext({
    "contextName": () => blankDeps("ttt11"),
    styles: async () => blankDeps((await import("@atomic-design/styles-base")).stylesContext.styles),
    atoms: async () => extractComponentDeps((await import("@atomic-design/atoms-base")).atomsContext.atoms),
    molecules: async () => extractComponentDeps((await import("@atomic-design/molecules-base")).moleculesContext.molecules),
    moleculesHelpers: () => blankDeps({
        useIsActiveLink: (href?: string) => {
            const pageContext = usePageContext();
            if (href === undefined) {
                return false;
            }
            const { urlPathname } = pageContext;
            return href === "/" ? urlPathname === href : urlPathname.startsWith(href);
        }
    }),
}, {
    contextName: {
        v1: () => blankDeps("text v1"),
        v2: () => blankDeps("text v2"),
    }
})

export { useAtomic, AtomicProvider, getServerReadyComponent }

```

## packages/example_vike/components/types.ts

```typescript

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

## packages/example_vike/layouts/LayoutDefault.tsx

```typescript
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
    "vike-react": "^0.6.4",
    "@atomic-design/styles-base": "*",
    "@atomic-design/atoms-base": "*",
    "@atomic-design/molecules-base": "*",
    "@atomic-design/di": "*"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vite": "^6.2.6",
    "@types/react": "^19.1.1",
    "@types/react-dom": "^19.1.2"
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
import Layout from "../layouts/LayoutDefault.js";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/Layout
  Layout,

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
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client",
      "vike-react"
    ],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "~/*": [
        "./*"
      ]
    }
  },
  "include": [
    ".",
  ],
  "exclude": [
    "dist"
  ]
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
  "files": [
    "dist"
  ],
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "classnames": "^2.5.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "devDependencies": {
    "@atomic-design/di": "*",
    "@atomic-design/design-tokens": "*",
    "@atomic-design/atoms-base": "*",
    "@eslint/js": "^9.23.0",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.5",
    "eslint-plugin-react": "^7.37.4",
    "globals": "^16.0.0",
    "prettier": "^3.5.3",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.2.4",
    "vite-plugin-dts": "^4.5.3"
  }
}

```

## packages/molecules-base/src/index.ts

```typescript
import { MoleculesContext } from "./types";
import { Link } from "./molecules/Link";
import { Button } from "~/molecules/Button";

export type * from "./types";

export const moleculesContext: Pick<MoleculesContext, "molecules"> = {
    molecules: {
        Link,
        Button,
    }
};

```

## packages/molecules-base/src/molecules/Button.tsx

```typescript
import { WithDeps } from "@atomic-design/di";
import { ButtonAtomContext } from "@atomic-design/atoms-base";
import { ButtonMoleculeProps } from "~/types";
import { memo } from "react";

export const Button = memo(function(props: ButtonMoleculeProps & WithDeps<ButtonAtomContext>) {
    const { deps, ...otherProps } = props;
    const { atoms: { Button } } = deps;
    return <Button {...otherProps} />
});

Button.displayName = "ButtonMolecule";

```

## packages/molecules-base/src/molecules/Link.tsx

```typescript
import { WithDeps } from "@atomic-design/di";
import { LinkAtomContext } from "@atomic-design/atoms-base";
import { LinkMoleculeProps, UseIsActiveLinkContext } from "~/types";
import { memo } from "react";

export const Link = memo(function(props: LinkMoleculeProps & WithDeps<UseIsActiveLinkContext & LinkAtomContext>) {
    const { href, deps, active, ...otherProps } = props;
    const { atoms: { Link }, moleculesHelpers: { useIsActiveLink } } = deps;
    const isActive = useIsActiveLink(href);
    return <Link {...otherProps} href={href} active={active !== undefined ? active : isActive} />
});

Link.displayName = "LinkMolecule";

```

## packages/molecules-base/src/types.ts

```typescript
import type { OneMoleculeContext, OneMoleculeHelperContext } from "@atomic-design/di";
import type { LinkAtomProps, LinkAtomContext, ButtonAtomContext, ButtonAtomProps } from "@atomic-design/atoms-base";

export type MoleculesContext = LinkMoleculeContext & ButtonMoleculeContext;

export type LinkMoleculeContext = OneMoleculeContext<"Link", LinkAtomContext & UseIsActiveLinkContext, LinkMoleculeProps>;
export type UseIsActiveLinkContext = OneMoleculeHelperContext<"useIsActiveLink", [string | undefined], boolean>;
export type LinkMoleculeProps = LinkAtomProps;

export type ButtonMoleculeContext = OneMoleculeContext<"Button", ButtonAtomContext, ButtonMoleculeProps>;
export type ButtonMoleculeProps = ButtonAtomProps;

//
// export interface InteractiveProps {
//     readonly disabled?: boolean;
//     readonly active?: boolean;
//     readonly focus?: boolean;
// }
//
// type Colors = "Primary" | "Secondary" | "Accent" | "Success" | "Danger" | "Warning" | "Info";
//
// export interface ColorsProps {
//     readonly color?: Colors;
// }
//
// type Sizes = "small" | "medium" | "large";
//
// export interface SizeProps {
//     readonly size?: Sizes;
// }
//
// type InputTypes = "input" | "textarea" | "boolean";
//
// export interface InputTypeProps {
//     readonly inputType?: InputTypes;
// }
//
// export interface EditAndReadProps {
//     readonly read?: boolean;
//     readonly editInRead?: boolean;
//     readonly canEditInRead?: boolean;
// }
//
// export interface Container {
//     readonly children: ReactNode;
// }
//
// export interface ManyPartsContainer extends Container {
//     readonly icon?: ReactNode;
//     readonly before?: ReactNode;
//     readonly after?: ReactNode;
// }
//
// export interface InputContainer extends Container {
//     readonly label?: ReactNode;
//     readonly before?: ReactNode;
//     readonly after?: ReactNode;
// }



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
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "module": "ESNext",
    "noEmit": true,
    "moduleResolution": "Bundler",
    "target": "ES2022",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client",
      "vike-react",
      "vite-plugin-vercel/types"
    ],
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "~/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "src",
  ]
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

## packages/styles-base/index.scss

```scss
@forward "src/helpers";

```

## packages/styles-base/package.json

```json
{
  "name": "@atomic-design/styles-base",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": [
    "dist/",
    "index.scss"
  ],
  "style": "dist/index.css",
  "sass": "index.scss",
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.umd.cjs"
    },
    "./index.css": "./dist/index.css"
  },
  "scripts": {
    "dev": "vite dev",
    "build:scss": "vite build --mode scss",
    "build": "npm run build:scss && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@atomic-design/design-tokens": "*",
    "@vite-plugin-vercel/vike": "^9.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "classnames": "^2.5.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-markdown": "^10.1.0"
  },
  "devDependencies": {
    "@atomic-design/di": "*",
    "@eslint/js": "^9.23.0",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.12",
    "@types/react-dom": "^19.0.4",
    "codools": "^0.2.17",
    "eslint": "^9.23.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.5",
    "eslint-plugin-react": "^7.37.4",
    "globals": "^16.0.0",
    "prettier": "^3.5.3",
    "sass": "^1.86.3",
    "typed-scss-modules": "^8.1.1",
    "typescript": "^5.8.2",
    "typescript-eslint": "^8.29.0",
    "vite": "^6.2.4",
    "vite-plugin-dts": "^4.5.3",
    "vite-plugin-sass-dts": "^1.3.31"
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

```

## packages/styles-base/src/styles/button.module.scss

```scss
.container {
  /* */
}

```

## packages/styles-base/src/styles/button.module.scss.d.ts

```typescript
declare const classNames: {
  readonly container: "container";
};
export = classNames;

```

## packages/styles-base/src/styles/footer.module.scss

```scss
.container {
  /* */
}

```

## packages/styles-base/src/styles/footer.module.scss.d.ts

```typescript
declare const classNames: {
  readonly container: "container";
};
export = classNames;

```

## packages/styles-base/src/styles/header.module.scss

```scss
.container {
  /* */
}

```

## packages/styles-base/src/styles/header.module.scss.d.ts

```typescript
declare const classNames: {
  readonly container: "container";
};
export = classNames;

```

## packages/styles-base/src/styles/input.module.scss

```scss
.container {
  /* */
}

```

## packages/styles-base/src/styles/input.module.scss.d.ts

```typescript
declare const classNames: {
  readonly container: "container";
};
export = classNames;

```

## packages/styles-base/src/styles/link.module.scss

```scss
@use "~/helpers" as helpers;
@use "sass:map";

.container {
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
  readonly container: "container";
  readonly colorPrimary: "colorPrimary";
  readonly active: "active";
  readonly colorSecondary: "colorSecondary";
  readonly colorAccent: "colorAccent";
  readonly colorSuccess: "colorSuccess";
  readonly colorDanger: "colorDanger";
  readonly colorWarning: "colorWarning";
  readonly colorInfo: "colorInfo";
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
  readonly container: "container";
};
export = classNames;

```

## packages/styles-base/src/types.ts

```typescript
import { ClassNames, OneStyleContext } from "@atomic-design/di";

export type StylesContext =
    LinkStyles
    & ButtonStyles
    & InputStyles
    & HeaderStyles
    & FooterStyles
    & SeparatorStyles;

export type LinkStyles = OneStyleContext<"link", ManyPartsContainer & Interactive & WithColors & WithSize>;
export type ButtonStyles = OneStyleContext<"button", ManyPartsContainer & Interactive & WithColors & WithSize>;
export type InputStyles = OneStyleContext<"input", InputContainer & Interactive & WithColors & WithSize & InputType & EditAndRead>;
export type HeaderStyles = OneStyleContext<"header", ManyPartsContainer>;
export type FooterStyles = OneStyleContext<"footer", ManyPartsContainer>;
export type SeparatorStyles = OneStyleContext<"separator", Container>;

export type Interactive = ClassNames<"disabled" | "active" | "focus">;
export type WithColors = ClassNames<"colorPrimary" | "colorSecondary" | "colorAccent" | "colorSuccess" | "colorDanger" | "colorWarning" | "colorInfo">;
export type WithSize = ClassNames<"sizeSmall" | "sizeMedium" | "sizeLarge">;
export type Container = ClassNames<"container">;
export type ManyPartsContainer = Container & ClassNames<"icon" | "before" | "content" | "after">;
export type InputType = ClassNames<"typeBoolean" | "typeTextarea">;
export type InputContainer = Container & ClassNames<"label" | "before" | "content" | "after">;
export type EditAndRead = ClassNames<"read" | "editInRead" | "canEditInRead">;

```

## packages/styles-base/stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```

## packages/styles-base/tsconfig.json

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
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "types": [
      "vite/client",
      "vike-react",
      "vite-plugin-vercel/types"
    ],
    "jsx": "preserve",
    "jsxImportSource": "react",
    "paths": {
      "~/*": [
        "./src/*"
      ]
    },
    "plugins": [{"name": "ts-css-modules-vite-plugin", "root": "./"}]
  },
  "include": [
    "src",
  ]
}

```

## packages/styles-base/vite.config.ts

```typescript
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

```
