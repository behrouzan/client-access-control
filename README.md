# Client Access Control

Lightweight, backend-agnostic client-side access control for TypeScript, JavaScript, and React.

The project includes a framework-independent core for permission checks and React bindings built on top of the same access-control model.

## Packages

### [`@behrouzan/access-control`](./packages/access-control)

Framework-independent core package for checking permissions.

- String and numeric permission identifiers
- Single permission checks with `can()`
- Multiple permission checks with `canAny()` and `canAll()`
- Runtime permission updates
- No dependency on React or any backend authorization model
- SSR-safe

See the [core package documentation](./packages/access-control/README.md) for installation, API details, and examples.

### [`@behrouzan/access-control-react`](./packages/access-control-react)

React bindings for `@behrouzan/access-control`.

It provides React integration while keeping permission logic in the framework-independent core.

See the [React package documentation](./packages/access-control-react/README.md) for installation and usage.

## Design Goals

* Small and predictable API
* Backend-agnostic
* Framework-independent core
* TypeScript-first with JavaScript support
* Runtime permission updates
* No assumptions about RBAC, roles, or backend permission models
* SSR-safe core

## Security

This library is intended for **client-side UI access control**.

Client-side permission checks must not be used as a security boundary. Always enforce authorization rules on the server or API as well.

## Status

Early development. The public API may change before the first stable release.

## License

MIT
