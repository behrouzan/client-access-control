# Client Access Control

Lightweight, backend-agnostic client-side access control for TypeScript, JavaScript, and React.

## Packages

- `@behrouzan/access-control`
- `@behrouzan/access-control-react`

## Status

Early development. Public API may change before the first stable release.

## Goals

- Framework-independent core
- React bindings
- String and numeric permission identifiers
- Runtime permission updates
- SSR-safe core
- No assumptions about backend, authentication, roles, or storage

## Security

This library is intended for client-side UI and rendering decisions.

Authorization for protected operations must always be enforced on the backend.