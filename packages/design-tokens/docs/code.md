I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use Clean Code, Clean Architecture, SOLID, Atomic design
If something is unclear or needs clarification, feel free to ask me.
# Project "@atomic-design/design-tokens"

## package.json

```json
{
  "name": "@atomic-design/design-tokens",
  "version": "0.1.1",
  "description": "",
  "type": "module",
  "files": [
    "src/scss/"
  ],
  "style": "src/scss/index.scss",
  "sass": "src/scss/index.scss",
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
  "keywords": []
}

```

## src/scss/border.scss

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

## src/scss/breakpoint.scss

```scss
$breakpoint-xs: 360px !default;
$breakpoint-sm: 640px !default;
$breakpoint-md: 768px !default;
$breakpoint-lg: 1024px !default;
$breakpoint-xl: 1280px !default;

```

## src/scss/color.scss

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

// Derived colors
$color-text: $color-secondary-900 !default;
$color-background: $color-white !default;
$color-border: $color-secondary-200 !default;

// Inverse colors
$color-text-inverse: $color-secondary-50 !default;
$color-background-inverse: $color-secondary-900 !default;
$color-border-inverse: $color-secondary-700 !default;

```

## src/scss/index.scss

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

## src/scss/shadow.scss

```scss
$shadow-xs: 0 1px 2px rgba(0 0 0 5%) !default;
$shadow-sm: 0 1px 3px rgba(0 0 0 10%), 0 1px 2px rgba(0 0 0 6%) !default;
$shadow-md: 0 4px 6px rgba(0 0 0 10%), 0 2px 4px rgba(0 0 0 6%) !default;
$shadow-lg: 0 10px 15px rgba(0 0 0 10%), 0 4px 6px rgba(0 0 0 5%) !default;
$shadow-xl: 0 20px 25px rgba(0 0 0 10%), 0 10px 10px rgba(0 0 0 4%) !default;

```

## src/scss/size.scss

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

## src/scss/spacing.scss

```scss
$spacing-xs: 4px !default;
$spacing-sm: 8px !default;
$spacing-md: 16px !default;
$spacing-lg: 24px !default;
$spacing-xl: 32px !default;

```

## src/scss/text.scss

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

## src/scss/z-index.scss

```scss
$z-index-dropdown: 1000 !default;
$z-index-sticky: 1020 !default;
$z-index-modal: 1040 !default;
$z-index-popover: 1060 !default;
$z-index-tooltip: 1080 !default;

```

## stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```
