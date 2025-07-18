# What Is This Library About

* First of all, it’s about interfaces, not implementations.
* It’s about splitting the application into multiple layers.
* It’s about making layer replacement easy.
* It’s about Dependency Inversion.

# Style

## Single Responsibility

* Styles are responsible for defining the style theme.

## Dependency Inversion

* For example, an input in a form and an input in a table should be displayed with different styles but should work the same way.
* Thus, for a form Organ we can inject one style, and for a table Organ we can inject another style.

# Atom

## Responsibility

* Atoms should be responsible only for rendering HTML with appropriate classNames based on the input properties.
* Atoms should not be responsible for performing any calculations.

## Dependency Inversion

* For testing other layers, we can mock atoms.

# Molecule

## Responsibility

* Molecules should be responsible for calculating props for atoms.
* Molecules should not perform calculations themselves. They simply compose functions, hooks, and one or more atoms.
* Molecules call functions and hooks that return props, then forward those props into atoms.

## Dependency Inversion
Molecules use functions and hooks that can be swapped out. 
For example, there are different functions to compute the current link in Next.js versus Vike. We can inject the appropriate helper for each environment.

# Cell

## Responsibility
* Cells are responsible for connecting the UI to data (for example, Redux).
* Cells are similar to containers in Redux.

# Organ

## Responsibility

* An Organ composes multiple Cells.
* Responsible for injecting dependencies.

# Organism

## Responsibility

* Responsible for placing page Organs into the page layout and running the Page Ghost.

# Ghosts

## Responsibility

* Responsible for implementing business logic.
