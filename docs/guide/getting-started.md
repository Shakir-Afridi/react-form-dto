# Getting Started

`react-form-dto` renders forms from a plain DTO (Data Transfer Object) definition. Define your form structure once and the library handles rendering, validation, layout, and i18n — with a react-hook-form–style API for managing state and submission.

## Installation

```bash
npm install react-form-dto
```

## Define a FormDTO

A `FormDTO` describes your entire form: its title, sections, and fields. Define it once outside of any component so it is a stable reference.

```ts
import type { FormDTO } from 'react-form-dto';

const myForm: FormDTO = {
  title: "User Profile",
  description: "Fill out your personal information",
  sections: [
    {
      id: "personal",
      heading: "Personal Information",
      fields: [
        {
          id: "firstName",
          type: "text",
          label: "First Name",
          layout: { cols: 6 },
          validations: { required: "First name is required" },
        },
        {
          id: "lastName",
          type: "text",
          label: "Last Name",
          layout: { cols: 6 },
          validations: { required: "Last name is required" },
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          validations: {
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        },
      ],
    },
  ],
};
```

## Render and submit a form

Pass the DTO to `useFormDTO` to create a form instance, wrap your UI in `FormProvider`, and render with `FormBuilder`. The `<form>` element's `onSubmit` comes from `form.handleSubmit` — it validates every field before calling your callback.

```tsx
import { FormBuilder, FormProvider, useFormDTO } from 'react-form-dto';
import { myForm } from './myFormDTO';

export function MyPage() {
  const form = useFormDTO(myForm);

  const onSubmit = (data: Record<string, any>) => {
    console.log('Submitted:', data);
    // send to your API here
  };

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormBuilder dto={myForm} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

`useFormDTO` automatically extracts default values from each field's `defaultValue` and wires all `validations` rules into the form context. Errors appear after a field is touched — not on initial load.

## Read values and errors from child components

Any component rendered inside `FormProvider` can access the form state without prop-drilling:

```tsx
import { useFormContext, useWatch } from 'react-form-dto';

// Reactively watch a single field
function LiveName() {
  const firstName = useWatch('firstName');
  return <p>Hello, {firstName || 'stranger'}!</p>;
}

// Read values or set errors from anywhere in the tree
function SubmitSummary() {
  const { values, errors } = useFormContext();
  return <pre>{JSON.stringify(values, null, 2)}</pre>;
}
```

## Validate programmatically

Call `form.trigger()` to validate without submitting — useful for multi-step forms or custom submit buttons:

```ts
const isValid = form.trigger();          // validate all fields
const emailOk = form.trigger('email');   // validate one field
```

## Reset the form

```ts
form.reset();                                    // back to defaultValues
form.reset({ firstName: 'Jane', email: '' });    // reset to a snapshot
```

---

::: tip Migrating from the ref-based API
The older `FormBuilderHandle` ref API (`ref.current.validateAll()`, `ref.current.getValues()`) still works and is not removed. If you have existing code using it, see the [FormBuilder component docs](/components/formBuilder#standalone-mode-ref-api-formbuilderhandle) for reference. For new forms, `useFormDTO` + `FormProvider` is the recommended approach.
:::

---

## Next steps

- [Validation guide](/guide/validation) — all built-in rules and custom validators
- [FormBuilder component](/components/formBuilder) — props and both usage modes
- [useFormDTO](/api/hooks/useFormDTO) — hook reference
- [useFormContext](/api/hooks/useFormContext) — `FormProvider`, `useFormContext`, `useOptionalFormContext`
- [useWatch](/api/hooks/useWatch) — reactively read field values
- [useFieldArray](/api/hooks/useFieldArray) — manage array fields
