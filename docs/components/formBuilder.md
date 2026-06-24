# FormBuilder Component

`FormBuilder` dynamically renders a form from a `FormDTO`. It works in two modes:

- **FormProvider mode** — connects to a parent `FormProvider` for a react-hook-form–style hook-driven workflow
- **Standalone / ref mode** — manages its own internal state, accessed imperatively via a ref

The same `FormDTO` and the same UI work in both modes.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dto` | `FormDTO` | — | The form definition containing sections and fields. |
| `locale` | `string` | `"en"` | Locale for i18n string resolution. |
| `renderers` | `Record<string, React.ComponentType<any>>` | — | Optional custom renderers keyed by field type. |
| `handleChangeCallback` | `(id: string, value: any) => void` | — | Optional callback fired on every field change. |

---

## FormProvider mode (recommended)

When `FormBuilder` is rendered inside a `<FormProvider>`, it reads values from context and writes changes back through `setValue`. Validation errors come from context and only appear after a field is touched or `handleSubmit` / `trigger()` is called.

```tsx
import { FormBuilder, FormProvider, useFormDTO } from 'react-form-dto';
import { myDTO } from './myDTO';

export function MyForm() {
  const form = useFormDTO(myDTO);

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormBuilder dto={myDTO} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

In this mode any descendant component can read or react to form state via `useFormContext`, `useWatch`, or `useFieldArray`:

```tsx
import { useWatch } from 'react-form-dto';

function LiveGreeting() {
  const firstName = useWatch('firstName');
  return <p>Hello, {firstName || 'stranger'}!</p>;
}
```

---

## Standalone mode — Ref API (`FormBuilderHandle`)

When used without a `FormProvider`, `FormBuilder` manages its own internal state. Access values and trigger validation imperatively through a ref.

| Method | Returns | Description |
|--------|---------|-------------|
| `getValues()` | `Record<string, any>` | All current field values. |
| `getErrors()` | `Record<string, string \| null>` | Current error state. |
| `validateAll()` | `Record<string, string[]>` | Validates every field; returns errors keyed by field ID. |
| `validateField(id)` | `string[]` | Validates a single field; returns its error messages. |
| `handleChange(id, value)` | `void` | Programmatically sets a field value. |

```tsx
import { useRef } from 'react';
import { FormBuilder, type FormBuilderHandle } from 'react-form-dto';
import { myDTO } from './myDTO';

export function MyForm() {
  const formRef = useRef<FormBuilderHandle>(null);

  const handleSubmit = () => {
    const errors = formRef.current?.validateAll() ?? {};
    if (Object.keys(errors).every((k) => !errors[k]?.length)) {
      const values = formRef.current?.getValues();
      console.log('Submitted:', values);
    }
  };

  return (
    <>
      <FormBuilder ref={formRef} dto={myDTO} />
      <button type="button" onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

---

::: tip Choosing a mode
Use **FormProvider** for new forms — you get `handleSubmit`, reactive `useWatch`, `useFieldArray`, context access in child components, and a standard hook API.

Use **standalone / ref** when you need a minimal drop-in and don't need to observe values from outside the form, or when migrating gradually from an older integration.
:::

---

## Features

- **Dynamic rendering** — sections, fields, and layouts driven entirely by the DTO
- **Conditional visibility** — `visibleWhen` rules hide/show fields based on live values
- **Custom renderers** — swap any field type with your own component via `renderers`
- **i18n** — all labels, placeholders, and error messages support locale maps
- **Both modes coexist** — the ref API remains available even when inside a `FormProvider`
