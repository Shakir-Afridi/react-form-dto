# FieldDTO

The `FieldDTO` type defines an individual field within a section of a form. It specifies the field's type, label, validation, layout, and other properties.

## Properties

| Name           | Type                       | Description                                                      |
|----------------|----------------------------|------------------------------------------------------------------|
| `id`           | `string`                   | Unique identifier for the field.                                 |
| `type`         | `InputType`                | Type of input (e.g., "text", "email", "select", etc.).           |
| `label`        | `string`                   | Field label to display.                                          |
| `placeholder`  | `string?`                  | Placeholder text (optional).                                     |
| `options`      | `string[]?`                | Options for select/autocomplete fields (optional).               |
| `required`     | `boolean?`                 | Whether the field is required (optional).                        |
| `disabled`     | `boolean?`                 | Whether the field is disabled (optional).                        |
| `defaultValue` | `any?`                     | Default value for the field (optional).                          |
| `layout`       | `{ col?: number }?`        | Field-level layout (e.g., starting column, optional).            |
| `validations`  | `Validations?`             | Validation rules for the field (optional).                       |

## Example

```ts
const field: FieldDTO = {
  id: "firstName",
  type: "text",
  label: "First Name",
  placeholder: "Enter your first name",
  required: true,
  validations: {
    minLength: 2,
    maxLength: 30,
    pattern: /^[A-Za-z]+$/
  }
};
```
