# @atomic-design/design-tokens

> Minimal, semantic SCSS tokens for atomic design systems.

## Overview

This library provides a **minimal**, **semantic** set of SCSS variables and mixins that establish a consistent naming standard for any atomic design system. The goal is _not_ to lock in specific values, but to define a small, opinionated base of token names so that every project starts with the same vocabulary:

```scss
@use "@atomic-design/design-tokens" with (
  // Override defaults here:
  $color-secondary-500: blue,
);
```

By focusing on _standardized names_ rather than an exhaustive list of values, you get:

- **Fast start:** minimal cognitive load when setting up a new design system.  
- **Customizable scale:** change only the tokens you need.  
- **Consistent language:** every project uses the same variable names.

## Installation

```bash
npm install @atomic-design/design-tokens --save
```

or

```bash
yarn add @atomic-design/design-tokens
```

## Usage

Import the tokens in your main SCSS entrypoint:

```scss
@use "@atomic-design/design-tokens" as tokens;
```

Use variables:

```scss
.button {
  background-color: tokens.$color-primary;
  padding: tokens.$spacing-md;
  @include tokens.body1;
}
```

If you need to override any default, do so in the `with` block before the import.

## Available Tokens

### Color Palette

Drawing from conventions in Tailwind CSS, Material UI, Ant Design, and common Figma libraries, we offer a **10‑step color scale** (50→950) for each semantic category. This mirrors designers’ mental model of light‑to‑dark ramps:

- **Primary** (`color-primary-50 … color-primary-950`): your brand’s core hue, used for primary buttons, links, highlights. Shortcut: `$color-primary` maps to the 500 shade (midpoint).
- **Secondary** (`color-secondary-50 … color-secondary-950`): neutral surface tones (backgrounds, cards, forms). Shortcut: `$color-secondary`.
- **Accent** (`color-accent-50 … color-accent-950`): high‑visibility highlights such as badges or call‑to‑actions where a contrasting accent is needed. Shortcut: `$color-accent`.
- **Success** (`color-success-50 … color-success-950`): confirmatory actions, positive messages (e.g. success toasts). Shortcut: `$color-success`.
- **Danger** (`color-danger-50 … color-danger-950`): destructive actions, errors, critical alerts. Shortcut: `$color-danger`.
- **Warning** (`color-warning-50 … color-warning-950`): cautionary states and warnings. Shortcut: `$color-warning`.
- **Info** (`color-info-50 … color-info-950`): neutral informational messages, tooltips. Shortcut: `$color-info`.

Each category follows the **50** (lightest) to **950** (darkest) step convention popularized by Tailwind and adopted by MUI and Ant Design. Designers in Figma also use this ramp concept for easy prototyping.

Below are the tokens available (all use `!default` so you can override):

| Category   | Token Range                            | Default Shortcut |
|------------|----------------------------------------|------------------|
| Primary    | `$color-primary-50` … `$color-primary-950` | `$color-primary` |
| Secondary  | `$color-secondary-50` … `$color-secondary-950` | `$color-secondary` |
| Accent     | `$color-accent-50` … `$color-accent-950` | `$color-accent` |
| Success    | `$color-success-50` … `$color-success-950` | `$color-success` |
| Danger     | `$color-danger-50` … `$color-danger-950` | `$color-danger` |
| Warning    | `$color-warning-50` … `$color-warning-950` | `$color-warning` |
| Info       | `$color-info-50` … `$color-info-950`    | `$color-info`    |

Additional semantic helpers:

- **Derived roles** (tailored for text, background, and borders):
  - `$color-text`, `$color-background`, `$color-border`
- **Inverse roles** (for dark interfaces):
  - `$color-text-inverse`, `$color-background-inverse`, `$color-border-inverse`

_Use these scales to ensure consistency with industry standards and give designers a familiar structure._

### Spacing

Consistent spacing scale for margins, padding, and gaps:

- `$spacing-xs` (4px)
- `$spacing-sm` (8px)
- `$spacing-md` (16px)
- `$spacing-lg` (24px)
- `$spacing-xl` (32px)

### Borders & Radii

Border widths:

- `$border-none` (0)
- `$border-md` (1px)
- `$border-lg` (2px)
- `$border-xl` (4px)

Border radius:

- `$radius-none` (0)
- `$radius-sm` (4px)
- `$radius-md` (8px)
- `$radius-lg` (16px)
- `$radius-full` (same as `$radius-sm`)

### Breakpoints

Responsive breakpoints for media queries:

- `$breakpoint-xs` (360px)
- `$breakpoint-sm` (640px)
- `$breakpoint-md` (768px)
- `$breakpoint-lg` (1024px)
- `$breakpoint-xl` (1280px)

### Size Tokens

Preset panel/container sizes:

- **Widths:** `$width-xs`, `$width-sm`, `$width-md`, `$width-lg`, `$width-xl`
- **Heights:** `$height-xs`, `$height-sm`, `$height-md`, `$height-lg`, `$height-xl`

### Typography

Defines font size, line-height, weight, and letter-spacing tokens, plus mixins to apply them:

- **Titles:**
    - `title1`, `title2`, `title3`
    - Tokens: `$text-<titleN>-font-size`, `$text-<titleN>-line-height`, `$text-<titleN>-font-weight`, `$text-<titleN>-letter-spacing`
- **Subtitles:**
    - `subtitle1`, `subtitle2`
    - Tokens: `$text-<subtitleN>-font-size`, `$text-<subtitleN>-...` etc.
- **Body:**
    - `body1`, `body2`
    - Tokens: `$text-<bodyN>-font-size`, `$text-<bodyN>-...` etc.
- **Captions & Overline:**
    - `caption1`, `caption2`, `overline`
    - Tokens: `$text-<captionN>-font-size`, `$text-<captionN>-...` etc.

Apply styles via mixins:

```scss
@mixin body1;
@mixin title2;
@mixin caption1;
``` 

### Shadows

Elevation shadows:

- `$shadow-xs`
- `$shadow-sm`
- `$shadow-md`
- `$shadow-lg`
- `$shadow-xl`

### Z-Index

Stack context levels:

- `$z-index-dropdown`
- `$z-index-sticky`
- `$z-index-modal`
- `$z-index-popover`
- `$z-index-tooltip`

## Scripts & Tooling

- **Lint:** `npm run lint` – checks SCSS style via Stylelint.
- **Docs (optional):** `npm run docs` – generate documentation via `codools`.

## Contributing

1. Fork the repo.
2. Create a branch: `feature/your-change`.
3. Commit with descriptive message.
4. Submit a pull request.

Please follow the existing naming conventions and SCSS lint rules.

## License

MIT © [Your Name]

