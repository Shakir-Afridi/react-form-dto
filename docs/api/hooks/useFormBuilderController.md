# useFormBuilderController

A custom React hook for building and controlling a form based on a `FormDTO` schema.  
It returns both an auto-rendering `Form` component and an API to access values, errors, and validation logic from outside the form.

This is useful when you want the form UI to be handled for you, but still need programmatic control (e.g. validation on submit, reading values, pre-filling fields).

---

## Import

```typescript
import { useFormBuilderController } from 'react-form-dto';
```

---

## Parameters

The hook accepts a single configuration object with the following properties:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `dto` | `FormDTO` | Yes | The form DTO definition containing sections and fields. |
| `locale` | `string` | Yes | Locale used by the internal `FormBuilder` (e.g. `'en'`). |
| `renderers` | `Record<string, React.ComponentType<any>>` | No | Custom field renderers keyed by field type. |
| `handleChangeCallback` | `(id: string, val: any) => void` | No | Optional callback invoked every time a field value changes. |

---

## Returns

An object with the following properties and methods:

| Name | Type | Description |
|------|------|-------------|
| `getValues` | `() => Record<string, any>` | Returns the current form values, keyed by field ID. Returns an empty object if the form is not yet initialized. |
| `getErrors` | `() => Record<string, string \| null>` | Returns the current form errors, keyed by field ID. Returns an empty object if the form is not yet initialized. |
| `validateAll` | `() => Record<string, string[] \| null>` | Validates all fields and returns error messages for each field ID. |
| `validateField` | `(id: string) => string[]` | Validates a single field by its ID and returns an array of error messages. |
| `handleChange` | `(id: string, val: any) => void` | Programmatically updates the value of a specific field. Useful for pre-filling or syncing external state. |
| `Form` | `() => JSX.Element` | A React component that renders the form according to the `FormDTO`, `locale`, and optional `renderers`. |

---

## Usage

```typescript
import { useFormBuilderController } from 'react-form-dto';
import { myFormDTO } from './formSchema';

function MyFormContainer() {
  const formController = useFormBuilderController({
    dto: myFormDTO,
    locale: 'en',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = formController.validateAll();

    if (Object.values(errors).every(err => !err || err.length === 0)) {
      // All good: use the form values
      const values = formController.getValues();
      console.log('Form submitted:', values);
    } else {
      // Validation failed
      console.log('Validation errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <formController.Form />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Example with handleChangeCallback

```typescript
import { useFormBuilderController } from 'react-form-dto';
import { myFormDTO } from './formSchema';

function MyFormWithChangeLogging() {
  const formController = useFormBuilderController({
    dto: myFormDTO,
    locale: 'en',
    handleChangeCallback: (id, value) => {
      console.log(`Field "${id}" changed to:`, value);
    },
  });

  return (
    <form>
      <formController.Form />
    </form>
  );
}
```

---

## Example with Custom Renderers

```typescript
import { useFormBuilderController } from 'react-form-dto';
import { myFormDTO } from './formSchema';
import { TextInput, SelectInput } from './customFields';

const customRenderers = {
  text: TextInput,
  select: SelectInput,
  // add more mappings as needed
};

function MyFormWithCustomRenderers() {
  const formController = useFormBuilderController({
    dto: myFormDTO,
    locale: 'en',
    renderers: customRenderers,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = formController.validateAll();

    if (Object.values(errors).every(err => !err || err.length === 0)) {
      console.log('Submitted values:', formController.getValues());
    } else {
      console.log('Errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <formController.Form />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Programmatic Updates / Prefill

```typescript
import { useFormBuilderController } from 'react-form-dto';
import { myFormDTO } from './formSchema';

function PrefilledForm() {
  const formController = useFormBuilderController({
    dto: myFormDTO,
    locale: 'en',
  });

  const prefill = () => {
    formController.handleChange('firstName', 'Jane');
    formController.handleChange('lastName', 'Doe');
    formController.handleChange('email', 'jane.doe@example.com');
  };

  const validateEmail = () => {
    const emailErrors = formController.validateField('email');
    console.log('Email errors:', emailErrors);
  };

  return (
    <>
      <button type="button" onClick={prefill}>
        Prefill
      </button>
      <button type="button" onClick={validateEmail}>
        Validate Email
      </button>

      <form>
        <formController.Form />
      </form>
    </>
  );
}
```

---

## Notes

- The `Form` component is the main UI part of this hook; it internally uses `FormBuilder` and the provided `FormDTO`.
- All control methods (`getValues`, `getErrors`, `validateAll`, `validateField`, `handleChange`) are safe to call; they return empty objects/arrays when the internal form reference is not yet ready.
- `handleChangeCallback` is useful for:
  - Logging changes.
  - Syncing form state with external stores (e.g. Redux, Zustand).
  - Triggering side-effects when certain fields change.
- Use this hook when:
  - You want a quick way to render the entire form from a DTO.
  - You still need external access to form values and validation, for example on submit.
- If you need full control over rendering individual fields (mapping sections, custom layout, etc.), consider using `useFormBuilder` instead.

---
