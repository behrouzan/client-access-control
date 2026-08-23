# @behrouzan/access-control

Lightweight, backend-agnostic permission-based access control for TypeScript and JavaScript.

## Installation

```bash
npm install @behrouzan/access-control
```

## Usage

```ts
import { createAccessControl } from "@behrouzan/access-control";

const access = createAccessControl({
  permissions: [
    "products.view",
    "products.edit",
  ],
});

access.can("products.edit"); // true
access.can("orders.view"); // false
```

## Multiple permissions

Check whether at least one permission exists:

```ts
access.canAny([
  "products.edit",
  "products.delete",
]);
```

Check whether all permissions exist:

```ts
access.canAll([
  "products.view",
  "products.edit",
]);
```

## Numeric permissions

Permission identifiers can also be numbers:

```ts
const access = createAccessControl({
  permissions: [1, 3, 5],
});

access.can(3); // true
access.can(2); // false
```

## Runtime permission updates

Permissions can be updated at runtime:

```ts
access.setPermissions([
  "orders.view",
  "orders.edit",
]);

access.can("orders.edit"); // true
```

## Type-safe permissions

You can define your application's permission identifiers as a TypeScript union:

```ts
type Permission =
  | "products.view"
  | "products.edit"
  | "products.delete"
  | "orders.view";

const access = createAccessControl<Permission>({
  permissions: [
    "products.view",
    "orders.view",
  ],
});

access.can("products.edit");

// TypeScript error:
// access.can("users.delete");
```

## Recommended permission constants

For larger applications, it is usually better to keep permission identifiers in one place instead of repeating raw strings throughout the codebase:

```ts
export const Permissions = {
  Products: {
    View: "products.view",
    Edit: "products.edit",
    Delete: "products.delete",
  },
  Orders: {
    View: "orders.view",
  },
} as const;
```

Then use them throughout the application:

```ts
access.can(Permissions.Products.Edit);
```

The permission identifiers should match the identifiers used by your backend or authorization system.

## Server-side usage

The core package has no React dependency and can be used in server-side environments, including Next.js Server Components.

```ts
import { createAccessControl } from "@behrouzan/access-control";

const access = createAccessControl({
  permissions: session.permissions,
});

if (!access.can(Permissions.Products.View)) {
  // Redirect, return a forbidden response, etc.
}
```

For example, in a Next.js App Router page or layout, you can check permissions before rendering protected content.

## What this package does not do

`@behrouzan/access-control` is intentionally focused on permission evaluation.

It does not:

- authenticate users
- fetch permissions from an API
- manage sessions or tokens
- store permissions in cookies or local storage
- enforce backend authorization
- assume a specific role or permission model

Your application provides the current permission list, and the package evaluates access against it.

## Security

Client-side and server-rendering permission checks do not replace backend authorization.

Protected APIs, resources, and operations must always be authorized by the backend.

This package can control application flow and visibility, but the backend remains responsible for enforcing security boundaries.

## License

MIT