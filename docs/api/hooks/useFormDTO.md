# useFormDTO

A hook that creates a fully wired form instance from a `FormDTO`. It extracts default values and wires all `validations` from the DTO into the react-hook-form–style API so you can use `FormProvider` without manually writing validate functions.

This is the recommended hook when you want the **FormProvider pattern** with a DTO-driven form.

## Import

```ts
import { useFormDTO } from 'react-form-dto';
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dto` | `FormDTO` | Yes | The form DTO definition. |
| `options.locale` | `string` | No | Locale passed to validation messages. Defaults to `"en"`. |

## Returns

Returns the same object as [`useForm`](/api/hooks/useForm) — a `FormContextType<T>` — so it can be spread directly into `<FormProvider value={...}>`.

| Name | Type | Description |
|------|------|-------------|
| `values` | `T` | Current form values. |
| `errors` | `{ [K in keyof T]?: string \| null }` | Current field errors. |
| `touchedFields` | `{ [K in keyof T]?: boolean }` | Which fields have been interacted with. |
| `handleSubmit` | `(cb) => (e) => void` | Returns a submit handler that validates first. |
| `register` | `(name, options?) => props` | Returns props for a native `<input>`. |
| `setValue` | `(name, value, shouldValidate?) => void` | Programmatically set a field value. |
| `getValues` | `() => T` | Returns all current values. |
| `setError` | `(name, error) => void` | Manually set a field error. |
| `clearError` | `(name) => void` | Clear a field error. |
| `reset` | `(nextValues?) => void` | Reset to defaults (or provided values). |
| `trigger` | `(name?) => boolean` | Validate one or all fields. Returns `true` if valid. |
| `watch` | `(name?) => any` | Read a field value (or all values) inline. |
| `control` | `FormContextType<T>` | Self-reference — pass to `useFieldArray` / `useWatch`. |

## Usage

```tsx
import { FormBuilder, FormProvider, useFormDTO } from 'react-form-dto';
import { myDTO } from './myDTO';

export function MyForm() {
  const form = useFormDTO(myDTO);

  const onSubmit = (data: Record<string, any>) => {
    console.log('Submitted:', data);
  };

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBuilder dto={myDTO} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## How it works

`useFormDTO` does three things:

1. **Extracts `defaultValues`** from `field.defaultValue` across all sections/fields.
2. **Builds per-field `validate` functions** from each field's `validations` object using the same engine that powers standalone `FormBuilder` validation.
3. **Delegates to `useForm`** with those defaults and validators.

Because the validate functions capture a ref to the latest values, cross-field validation in a custom `validate` function works correctly:

```ts
{
  id: "confirmPassword",
  validations: {
    validate: (val, ctx) => val !== ctx.password ? "Passwords don't match" : null,
  }
}
```

## With locale

```tsx
const form = useFormDTO(myDTO, { locale: 'fr' });
```

Validation error messages respect the locale if they are defined as i18n strings in the DTO.

## Notes

- The `dto` reference is expected to be stable (defined outside of render). Changing it does not reset the form.
- Use `form.reset()` to re-initialize values at runtime.
- If you don't have a DTO and want a plain hook-form experience, use [`useForm`](/api/hooks/useForm) directly.
