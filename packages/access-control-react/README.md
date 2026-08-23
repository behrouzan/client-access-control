# @behrouzan/access-control-react

React bindings for `@behrouzan/access-control`.

## Installation

```bash
npm install @behrouzan/access-control @behrouzan/access-control-react
```

## Provider

Pass the current user's permissions to `AccessControlProvider`:

```tsx
import {
  AccessControlProvider,
} from "@behrouzan/access-control-react";

function App() {
  return (
    <AccessControlProvider
      permissions={[
        "products.view",
        "products.edit",
      ]}
    >
      {/* application */}
    </AccessControlProvider>
  );
}
```

The package does not fetch or store permissions. Your application owns the permission data and passes the current list to the provider.

## Can

Check a single permission:

```tsx
import {
  Can,
} from "@behrouzan/access-control-react";

<Can permission="products.edit">
  <EditButton />
</Can>
```

Use a fallback when access is denied:

```tsx
<Can
  permission="products.edit"
  fallback={<span>Not allowed</span>}
>
  <EditButton />
</Can>
```

Require at least one permission:

```tsx
<Can
  permissions={[
    "products.edit",
    "products.delete",
  ]}
  match="any"
>
  <ProductActions />
</Can>
```

Require all permissions:

```tsx
<Can
  permissions={[
    "products.view",
    "products.edit",
  ]}
  match="all"
>
  <EditProduct />
</Can>
```
## Hooks

### useCan

Check a single permission:

```tsx
import {
  useCan,
} from "@behrouzan/access-control-react";

const canEdit = useCan("products.edit");

if (canEdit) {
  // User has the permission
}
```

### useCanAny

Check whether the user has at least one of the specified permissions:

```tsx
import {
  useCanAny,
} from "@behrouzan/access-control-react";

const canManageProducts = useCanAny([
  "products.edit",
  "products.delete",
]);
```

### useCanAll

Check whether the user has all of the specified permissions:

```tsx
import {
  useCanAll,
} from "@behrouzan/access-control-react";

const canEditProducts = useCanAll([
  "products.view",
  "products.edit",
]);
```

## Runtime permission updates

`AccessControlProvider` reacts when its `permissions` prop changes:

```tsx
const [permissions, setPermissions] = useState([
  "products.view",
]);

return (
  <AccessControlProvider permissions={permissions}>
    <App />
  </AccessControlProvider>
);
```

Components using `Can`, `useCan`, `useCanAny`, or `useCanAll` will receive the updated access state when the permission list changes.

## Recommended permission constants

For larger applications, keep permission identifiers in one place:

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

Then use the constants instead of repeating raw strings:

```tsx
<Can permission={Permissions.Products.Edit}>
  <EditButton />
</Can>
```

```tsx
const canEdit = useCan(Permissions.Products.Edit);
```

The identifiers should match the permission identifiers used by your backend or authorization system.

## Next.js

`@behrouzan/access-control-react` is intended for React client-side access checks.

For example, a Next.js Client Component can use:

```tsx
"use client";

import {
  Can,
} from "@behrouzan/access-control-react";

export function ProductActions() {
  return (
    <Can permission="products.edit">
      <button>Edit</button>
    </Can>
  );
}
```

A Next.js Server Component cannot use React client hooks such as `useCan`.

For server-side permission checks, use the core package instead:

```tsx
import {
  createAccessControl,
} from "@behrouzan/access-control";
import { redirect } from "next/navigation";

export default async function ProductsPage() {
  const session = await getSession();

  const access = createAccessControl({
    permissions: session.permissions,
  });

  if (!access.can("products.view")) {
    redirect("/forbidden");
  }

  return <Products />;
}
```

An `AccessControlProvider` can also be rendered from a Server Component and receive serializable permissions as props, allowing Client Components below it to use `Can` and the hooks.

## Security

UI permission checks do not replace backend authorization.

Hiding a button, menu item, or page in the frontend does not prevent a user from calling a protected API directly.

Protected resources and operations must always be authorized by the backend.

## License

MIT
