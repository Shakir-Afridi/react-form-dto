# useForm

A lower-level hook that creates a form state container without any DTO dependency. The API mirrors react-hook-form so the mental model is familiar.

Use this when you have a **plain (non-DTO) form** and want the context/hook system. For DTO-driven forms use [`useFormDTO`](/api/hooks/useFormDTO) instead.

## Import

```ts
import { useForm } from 'react-form-dto';
```

## Parameters

```ts
useForm<T extends object>(options?: UseFormOptions<T>)
```

| Name | Type | Description |
|------|------|-------------|
| `options.defaultValues` | `Partial<T>` | Initial field values. |
| `options.validate` | `{ [K in keyof T]?: (value: any) => string \| null \| undefined }` | Per-field validation functions. Return a string for an error, `null`/`undefined` for valid. |

## Returns

| Name | Type | Description |
|------|------|-------------|
| `values` | `T` | Current form values (re-renders on every change). |
| `errors` | `{ [K in keyof T]?: string \| null }` | Current error map. |
| `touchedFields` | `{ [K in keyof T]?: boolean }` | Fields that have been focused/changed. |
| `register` | `(name, options?) => InputProps` | Spread onto a native `<input>` to wire it up. |
| `setValue` | `(name, value, shouldValidate?) => void` | Programmatically set a field. |
| `getValues` | `() => T` | Read all values (stable reference). |
| `setError` | `(name, error) => void` | Manually inject an error (e.g. from a server response). |
| `clearError` | `(name) => void` | Clear a field error. |
| `handleSubmit` | `(cb) => (e) => void` | Validates all fields; calls `cb(data)` only when valid. |
| `reset` | `(nextValues?) => void` | Reset to `defaultValues` or a provided snapshot. |
| `trigger` | `(name?) => boolean` | Validate one or all fields. Returns `true` if valid. |
| `watch` | `(name?) => any` | Read a value inline (non-reactive outside of renders). |
| `control` | `FormContextType<T>` | Self-reference for use with `useFieldArray` / `useWatch`. |

## Basic usage

```tsx
import { useForm, FormProvider } from 'react-form-dto';

type LoginData = { email: string; password: string };

export function LoginForm() {
  const form = useForm<LoginData>({
    defaultValues: { email: '', password: '' },
    validate: {
      email: (v) => (!v ? 'Email is required' : null),
      password: (v) => (v.length < 8 ? 'Min 8 characters' : null),
    },
  });

  const onSubmit = (data: LoginData) => {
    console.log('Submitted:', data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input placeholder="Email" {...form.register('email')} />
      {form.errors.email && <span>{form.errors.email}</span>}

      <input type="password" placeholder="Password" {...form.register('password')} />
      {form.errors.password && <span>{form.errors.password}</span>}

      <button type="submit">Login</button>
    </form>
  );
}
```

## With FormProvider

Wrap with `<FormProvider>` to make the form state available to any descendant component via `useFormContext`, `useWatch`, and `useFieldArray`:

```tsx
import { useForm, FormProvider, useFormContext, useWatch, useFieldArray } from 'react-form-dto';

type MyForm = { name: string; tags: { value: string }[] };

function TagList() {
  const { fields, append, remove } = useFieldArray<MyForm>({ name: 'tags' });
  return (
    <div>
      {fields.map((_, i) => (
        <div key={i}>
          <input {...useFormContext<MyForm>().register(`tags.${i}.value`)} />
          <button type="button" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ value: '' })}>Add tag</button>
    </div>
  );
}

function LiveName() {
  const name = useWatch<MyForm>('name');
  return <p>Hello, {name}!</p>;
}

export function MyPage() {
  const form = useForm<MyForm>({
    defaultValues: { name: '', tags: [{ value: '' }] },
  });

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((d) => console.log(d))}>
        <input {...form.register('name')} placeholder="Your name" />
        <LiveName />
        <TagList />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Hooks that work inside a FormProvider

| Hook | Description |
|------|-------------|
| `useFormContext<T>()` | Returns the full `FormContextType<T>`. Throws if no provider found. |
| `useOptionalFormContext<T>()` | Like `useFormContext` but returns `undefined` instead of throwing. |
| `useWatch<T>(name)` | Reactively reads one or more field values. Re-renders when they change. |
| `useFieldArray<T>({ name })` | Manages array fields — `fields`, `append`, `prepend`, `remove`, `swap`, `insert`. |

## setValue with validation

Pass `true` as the third argument to run validation immediately after setting:

```ts
form.setValue('email', 'user@example.com', true);
```

## trigger

Validate programmatically without submitting:

```ts
const isValid = form.trigger();         // validate all
const emailOk = form.trigger('email');  // validate one field
```

## reset

```ts
form.reset();                           // back to defaultValues
form.reset({ email: 'pre@filled.com' }); // reset to a snapshot
```
