# RadioInput

`RadioInput` is a reusable React component for rendering a group of radio buttons using Material UI. It is designed to work with a `FieldDTO` object and supports validation, error display, and layout customization.

## Props

| Name      | Type                       | Description                                                                 |
|-----------|----------------------------|-----------------------------------------------------------------------------|
| `field`   | `FieldDTO`                 | The field configuration object (label, options, validations, etc).          |
| `value`   | `any`                      | The currently selected value.                                               |
| `onChange`| `(val: any) => void`       | Callback invoked when the selected value changes.                           |
| `error`   | `string \| null` (optional)| Error message to display below the radio group.                             |

## Features

- Renders a Material UI radio group with options from `field.options`.
- Displays a label and marks as required if specified in `field.validations`.
- Supports horizontal (`row`) or vertical layout via `field.layout.direction`.
- Shows error messages and highlights the group on error.
- Disables all options if `field.disabled` is true.

## Example

```tsx
import { RadioInput } from "src/components/renderers/RadioInput";

const field = {
  label: "
