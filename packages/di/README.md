# @atomic-design/di

> **Dependency Injection** utilities for Atomic Design contexts in React.

## Overview

`@atomic-design/di` provides a lightweight, type-safe dependency injection system tailored for Atomic Design architectures. It enables:

* **Context-based injection** of styles, atoms, molecules, and custom services into React components.
* **Named variants**: Swap implementations at runtime (e.g., feature flags, themes).
* **Server-ready components**: Support for SSR/CSR via React Server Components and Suspense.
* **Automatic dependency wiring**: Components don’t need manual prop drilling for shared dependencies.

## Installation

```bash
npm install @atomic-design/di
# or
yarn add @atomic-design/di
```

## Key Concepts

### Spaces & Variants

* **Space**: A logical group of dependencies (e.g., `styles`, `atoms`, `molecules`, or your own service spaces).
* **Variant**: A named version of a space (e.g., `default`, `v1`, `v2`) that can provide different implementations.

### Hooks & Providers

* **`useAtomic()`**: Hook to access the merged dependencies for the current React tree.
* **`AtomicProvider`**: React component to set variants for a subtree.
* **`getServerReadyComponent(space, name)`**: Wraps a component for server rendering without needing `deps` prop.

### Automatic Injection

* **`extractComponentDeps()`**: Wraps a set of components so they automatically receive a `deps` prop from context.
* **`blankDeps()`**: Utility to create a stub dependency context (useful for testing or simple values).

## Usage

### Creating a Variants Context

```tsx
import { createVariantsContext, extractComponentDeps, blankDeps } from '@atomic-design/di';
import { usePathname } from 'next/navigation';

// Define how each space is loaded (async or sync)
const atomicContext = {
  styles: async () => blankDeps((await import('@atomic-design/styles-base')).stylesContext.styles),
  atoms: async () => extractComponentDeps((await import('@atomic-design/atoms-base')).atomsContext.atoms),
  molecules: async () => extractComponentDeps((await import('@atomic-design/molecules-base')).moleculesContext.molecules),
  // Custom helper space
  moleculesHelpers: () => blankDeps({
    useIsActiveLink: (href?: string) => {
      const pathname = usePathname() || '/';
      return href ? (href === '/' ? pathname === href : pathname.startsWith(href)) : false;
    }
  })
};

// Optional variants for a custom "contextName" space
const variantsBySpace = {
  contextName: {
    v1: () => blankDeps('Variant 1'),
    v2: () => blankDeps('Variant 2'),
  }
};

const [useAtomic, AtomicProvider, getServerReadyComponent] =
  createVariantsContext(atomicContext, variantsBySpace);
```

### Providing Variants

```tsx
<AtomicProvider space="contextName" variant="v1">
  <App />
</AtomicProvider>
```

You can nest multiple providers to switch variants for subtrees.

### Using Dependencies in Components

```tsx
import React from 'react';

function MyButton(props) {
  const { atoms: { Button } } = useAtomic();
  return <Button {...props}>Click me</Button>;
}
```

### Server-Ready Components

Instead of manually wiring `deps`, you can export:

```tsx
export const Link = getServerReadyComponent('molecules', 'Link');
```

Then in your UI code:

```tsx
<Link href="/about">About us</Link>
```

## API Reference

### `createVariantsContext(context, variantsBySpace)`

* **`context`**: Record of space loaders (`() => WrappedPromise<Context, AllSpaces>`).
* **`variantsBySpace`**: Optional record defining named variants per space.

**Returns**: `[useAtomic, AtomicProvider, getServerReadyComponent]`

---

### `extractComponentDeps(components)`

Wraps components so each receives `deps` automatically from the nearest `AtomicProvider`.

* **`components`**: Object mapping names to React components expecting a `deps` prop.

**Returns**: `{ output: wrappedComponents, setDepsHook }`

---

### `blankDeps(output)`

Creates a stub context with a fixed `output` and no-op `setDepsHook`.

## Contributing

1. Fork the repo.
2. Create your feature branch: `git checkout -b feature/foo`.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

Please follow existing code conventions (TypeScript, React JSX, ESLint, Prettier).

## License

[MIT](LICENSE)
