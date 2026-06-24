# Validation Guide

Validation in `react-form-dto` is declarative. Each field in your `FormDTO` carries a `validations` object — the library runs those rules automatically on submit, on touch, or on demand.

---

## Built-in rules

| Rule | Type | Description |
|------|------|-------------|
| `required` | `boolean \| string` | Field must not be empty. Pass `true` for a default message or a string for a custom one. |
| `minLength` | `number` | Minimum string length. |
| `maxLength` | `number` | Maximum string length. |
| `min` | `number` | Minimum numeric value. |
| `max` | `number` | Maximum numeric value. |
| `pattern` | `RegExp` | Value must match the regex. |
| `options` | `string[]` | Value must be one of the listed options (for select fields). |
| `dateRange` | `{ from?: string; to?: string }` | Date must fall within the given range. |
| `validate` | `(value, allValues) => string \| null` | Custom function — return a string for an error, `null` for valid. |

---

## Defining rules on a field

```ts
import type { FormDTO } from 'react-form-dto';

const myForm: FormDTO = {
  sections: [
    {
      id: "account",
      fields: [
        {
          id: "email",
          type: "email",
          label: "Email",
          validations: {
            required: "Email is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            minLength: 5,
            maxLength: 100,
          },
        },
        {
          id: "age",
          type: "number",
          label: "Age",
          validations: {
            required: true,
            min: 18,
            max: 99,
          },
        },
        {
          id: "username",
          type: "text",
          label: "Username",
          validations: {
            required: "Username is required",
            minLength: 3,
            maxLength: 20,
            validate: (value) =>
              /^[a-z0-9_]+$/.test(value)
                ? null
                : "Only lowercase letters, numbers, and underscores",
          },
        },
      ],
    },
  ],
};
```

---

## Validating on submit

The recommended approach is `useFormDTO` + `FormProvider`. `form.handleSubmit` validates all fields before calling your callback — if any field is invalid the callback is not called and errors are shown inline.

```tsx
import { FormBuilder, FormProvider, useFormDTO } from 'react-form-dto';
import { myForm } from './myFormDTO';

export function AccountForm() {
  const form = useFormDTO(myForm);

  const onSubmit = (data: Record<string, any>) => {
    // Only reached when all fields pass validation
    console.log('Valid data:', data);
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

---

## Validating programmatically

Use `form.trigger()` when you need to validate without submitting — for example, a "Next" button in a multi-step form:

```tsx
import { FormBuilder, FormProvider, useFormDTO } from 'react-form-dto';
import { stepOneForm } from './stepOneForm';

export function StepOne({ onNext }: { onNext: () => void }) {
  const form = useFormDTO(stepOneForm);

  const handleNext = () => {
    const isValid = form.trigger();   // validate all fields
    if (isValid) onNext();
  };

  // Validate a single field
  const checkEmail = () => {
    const emailOk = form.trigger('email');
    console.log('Email valid:', emailOk);
  };

  return (
    <FormProvider value={form}>
      <FormBuilder dto={stepOneForm} />
      <button type="button" onClick={handleNext}>Next</button>
    </FormProvider>
  );
}
```

---

## Custom validation

The `validate` function receives the field's current value. It runs inside `useFormDTO`'s validation engine, which passes the full current form snapshot via `valuesRef` — enabling cross-field comparisons:

```ts
{
  id: "confirmPassword",
  type: "password",
  label: "Confirm Password",
  validations: {
    required: "Please confirm your password",
    validate: (value, allValues) =>
      value !== allValues?.password ? "Passwords do not match" : null,
  },
}
```

---

## Injecting server-side errors

After a failed API call, set errors manually using `form.setError`:

```tsx
const onSubmit = async (data: Record<string, any>) => {
  try {
    await api.register(data);
  } catch (err) {
    form.setError('email', 'This email is already registered');
  }
};
```

Clear them with `form.clearError('email')` when the user edits the field, or call `form.reset()` to wipe all errors.

---

## Error messages and i18n

All built-in rule messages can be overridden by passing a string instead of `true`:

```ts
validations: {
  required: "Dieses Feld ist erforderlich",
  minLength: 3,   // uses the default message
}
```

For fully localised apps, pass `locale` to `useFormDTO`:

```ts
const form = useFormDTO(myForm, { locale: 'de' });
```

Field labels and error strings defined as locale maps in the DTO are resolved to the given locale automatically.

---

## Notes

- Errors are shown **per-field** inline below each input.
- With `useFormDTO` + `FormProvider`, errors only appear after a field is first touched (or after submit is attempted) — not on initial render.
- The `validate` custom function should return `null` (not `undefined` or `false`) to indicate the field is valid.
