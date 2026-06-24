# useFormContext / useOptionalFormContext / FormProvider

These three exports form the context layer that powers the react-hook-form–style API. Together they let you share a single form instance across a component tree without prop-drilling.

## FormProvider

Wraps a subtree and makes a form instance available to all descendants.

### Import

```ts
import { FormProvider } from 'react-form-dto';
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `value` | `FormContextType<T>` | The form instance returned by `useForm` or `useFormDTO`. |
| `children` | `ReactNode` | The component tree that needs access to the form. |

### Usage

```tsx
import { useFormDTO, FormProvider, FormBuilder } from 'react-form-dto';
import { myDTO } from './myDTO';

export function MyPage() {
  const form = useFormDTO(myDTO);

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((d) => console.log(d))}>
        <FormBuilder dto={myDTO} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

---

## useFormContext

Reads the form instance from the nearest `FormProvider`. **Throws** if no provider is found in the tree.

### Import

```ts
import { useFormContext } from 'react-form-dto';
```

### Signature

```ts
useFormContext<T extends object = any>(): FormContextType<T>
```

### Returns

The full `FormContextType<T>` — same object returned by `useForm` / `useFormDTO`. See [`useForm` → Returns](/api/hooks/useForm#returns) for the complete property list.

### Usage

```tsx
import { useFormContext } from 'react-form-dto';

type MyForm = { email: string; name: string };

function EmailField() {
  const { register, errors } = useFormContext<MyForm>();
  return (
    <div>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email}</span>}
    </div>
  );
}
```

---

## useOptionalFormContext

Like `useFormContext` but returns `undefined` instead of throwing when no provider exists. Useful for components that work both inside and outside a `FormProvider`.

### Import

```ts
import { useOptionalFormContext } from 'react-form-dto';
```

### Signature

```ts
useOptionalFormContext<T extends object = any>(): FormContextType<T> | undefined
```

### Usage

```tsx
import { useOptionalFormContext } from 'react-form-dto';

function AdaptiveField({ name }: { name: string }) {
  const ctx = useOptionalFormContext();

  if (ctx) {
    // Inside a FormProvider — wire to context
    return <input {...ctx.register(name)} />;
  }

  // Outside — render uncontrolled
  return <input name={name} />;
}
```

::: tip When to use each
- `useFormContext` — when the component **requires** a provider (throws a clear error if missing).
- `useOptionalFormContext` — when the component **optionally** enhances behavior when a provider is present.
:::

---

## FormContextType

The TypeScript interface shared by `useForm`, `useFormDTO`, `useFormContext`, and `FormProvider.value`:

```ts
import type { FormContextType, FieldError } from 'react-form-dto';
```

| Property | Type | Description |
|----------|------|-------------|
| `values` | `T` | Current field values. |
| `errors` | `{ [K in keyof T]?: FieldError }` | Current field errors (`string \| null \| undefined`). |
| `touchedFields` | `{ [K in keyof T]?: boolean }` | Fields that have been interacted with. |
| `register` | `(name, options?) => InputProps` | Wires a native `<input>` to the form. |
| `setValue` | `(name, value, shouldValidate?) => void` | Sets a field value programmatically. |
| `getValues` | `() => T` | Returns all current values (stable, non-reactive). |
| `setError` | `(name, error) => void` | Manually injects an error. |
| `clearError` | `(name) => void` | Clears a field error. |
| `handleSubmit` | `(cb) => (e?) => void` | Validates then calls `cb` if valid. |
| `reset` | `(nextValues?) => void` | Resets to default or provided values. |
| `trigger` | `(name?) => boolean` | Validates one or all fields synchronously. |
| `watch` | `(name?) => any` | Non-reactive read of a value (for event handlers). |
| `control` | `FormContextType<T>` | Self-reference — pass to `useFieldArray` / `useWatch`. |
