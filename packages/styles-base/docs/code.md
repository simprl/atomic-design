I will provide the source code of my project. Please analyze the code structure and help me extend the functionality when I ask.
All code and comments must be in English. Please follow the style and conventions used in the existing codebase.
For react project use version 18 and 19 versions (with jsx-runtime style).
Also use Clean Code, Clean Architecture, SOLID, Atomic design
If something is unclear or needs clarification, feel free to ask me.
# Project "@atomic-design/styles-base"

## package.json

```json
{
  "name": "@atomic-design/styles-base",
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
    "lint": "stylelint src/**/*.scss"
  },
  "author": "",
  "license": "MIT",
  "private": false,
  "devDependencies": {
    "codools": "^0.2.15",
    "stylelint": "^16.18.0",
    "stylelint-config-standard-scss": "^14.0.0",
    "stylelint-scss": "^6.11.1"
  },
  "keywords": []
}

```

## src/Link/link.module.scss

```scss
@use "@atomic-design/design-tokens";
@use "sass:map";

.link {
  @include colors-classes using($colors) {
    color: map.get($colors, 500);

    &:hover {
      color: map.get($colors, 600);
    }

    &:active {
      color: map.get($colors, 700);
    }
  }
}

```

## stylelint.config.js

```javascript
export default {
    extends: "stylelint-config-standard-scss",
    rules: {
    }
};

```
