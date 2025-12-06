# Field Component

The `Field` component renders an individual form field using the appropriate input component based on its type. It supports both default and custom renderers.

## Props

| Name        | Type                                                      | Description                                                        |
|-------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| `field`     | `FieldDTO`                                                | Field definition (type, label, validation, etc.).                  |
| `value`     | `any`                                                     | Current value of the field.                                        |
| `onChange`  | `(val: any) => void`                                      | Callback to update the field value.                                |
| `error`     | `string \| null` (optional)                               | Error message for the field.                                       |
| `renderers` | `Record<string, React.ComponentType<FieldRendererProps>>` (optional) | Custom renderers for field types.                                  |

## Usage

```tsx
<Field
  field={fieldDTO}
  value={currentValue}
  onChange={handleChange}
  error={error}
  renderers={{ type: CustomRenderer }}
/>
```

### Note: 

`type` should only be [`text`, `email`, `password`, `textarea`, `number`, `select`, `checkbox`, `date`, `autocomplete`, `multi-autocomplete`]

---

## Features

- **Default Renderers:** Supports text, number, date, select, checkbox, autocomplete, and multi-autocomplete.
- **Custom Renderers:** Allows overriding default renderer for any field type.
- **Error Handling:** Passes error messages to input components for display.

## Example

```tsx
const fieldDTO = {
  id: "email",
  type: "email",
  label: "Email Address",
  required: true,
};

<Field
  field={fieldDTO}
  value={"user@example.com"}
  onChange={(val) => { /* handle change */ }}
  error={null}
/>
