# useFormBuilder

A custom React hook for building and managing form state with validation, based on a FormDTO schema. It provides a simple API to handle form values, errors, and validation logic for dynamic forms.

---

## Import

```typescript
import { useFormBuilder } from 'react-form-dto';
```

---

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `dto` | `FormDTO` | The form DTO definition containing sections and fields. |

---

## Returns

An object with the following properties and methods:

| Name | Type | Description |
|------|------|-------------|
| `values` | `Record<string, any>` | Current form values, keyed by field ID. |
| `handleChange` | `(id: string, val: any) => void` | Updates the value of a specific field and clears its error. |
| `validateAll` | `() => Record<string, string[] | null>` | Validates all fields and returns errors for each field. |
| `getValues` | `() => Record<string, any>` | Returns the current form values. |
| `getErrors` | `() => Record<string, string | null>` | Returns the current form errors. |
| `validateField` | `(id: string) => string[]` | Validates a single field by its ID and returns error messages. |

---

## Usage

```typescript
const form = useFormBuilder(myFormDTO);

// Update a field value
form.handleChange('email', 'user@example.com');

// Validate all fields
const errors = form.validateAll();

// Validate a single field
const emailErrors = form.validateField('email');

// Get current values and errors
const values = form.getValues();
const currentErrors = form.getErrors();
```

---

## Example

```typescript
import { useFormBuilder } from 'react-form-dto';
import { myFormDTO } from './formSchema';

function MyFormComponent() {
  const form = useFormBuilder(myFormDTO);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = form.validateAll();
    if (Object.values(errors).every(err => !err || err.length === 0)) {
      // Submit form
      console.log('Form submitted:', form.getValues());
    } else {
      // Handle errors
      console.log('Validation errors:', errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.values.email || ''}
        onChange={e => form.handleChange('email', e.target.value)}
      />
      {/* Render other fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Notes

- The hook expects a valid `FormDTO` object describing the form structure and validation rules.
- Validation functions (`validateAll`, `validateField`) return error messages as arrays for each field.
- `handleChange` automatically clears the error for the updated field.
- Useful for dynamic forms where the schema is not known at compile time.

---
