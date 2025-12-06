# TextAreaInput

`TextAreaInput` is a reusable React component for rendering a multi-line text input (textarea) using Material UI's `TextField`. It is designed to work with a `FieldDTO` object and integrates with form validation and error handling.

## Props

| Name      | Type                       | Description                                                                 |
|-----------|----------------------------|-----------------------------------------------------------------------------|
| `field`   | `FieldDTO`                 | The field configuration object (label, placeholder, validations, etc).      |
| `value`   | `any`                      | The current value of the textarea.                                          |
| `onChange`| `(val: any) => void`       | Callback invoked when the value changes.                                    |
| `error`   | `string \| null` (optional)| Error message to display below the textarea.                                |

## Features

- Renders a Material UI `TextField` in multiline mode.
- The number of rows is configurable via `field.rows` (defaults to 4).
- Displays label and placeholder from the `field` prop.
- Shows error messages and highlights the field on error.
- Supports required and disabled states based on `field.validations` and `field.disabled`.

## Example

```tsx
import { TextAreaInput } from "src/components/renderers/TextareaInput";

const field = {
  label: "Description",
  placeholder: "Enter your description...",
  validations: { required: true },
  rows: 6,
  disabled: false,
};

<TextAreaInput
  field={field}
  value={formState.description}
  onChange={(val) => setFormState({ ...formState, description: val })}
  error={errors.description}
/>
```

## FieldDTO Example

```ts
const field: FieldDTO = {
  label: "Comments",
  placeholder: "Type your comments here...",
  validations: { required: true },
  rows: 5,
  disabled: false,
};
```

## Notes

- The `rows` property is optional; if not provided, it defaults to 4.
- The `required` and `disabled` states are inferred from the `field` prop.
- Error messages are shown below the textarea if the `error` prop is set.
