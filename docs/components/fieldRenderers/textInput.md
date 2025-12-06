# TextInput

The `TextInput` component renders a text field using Material-UI's `TextField` component. It supports various input types such as text, number, and date, and is suitable for fields where users enter free-form values.

## Props

- **field**: The field definition object, including label, id, type, placeholder, required, and disabled.
- **value**: The current value of the input.
- **onChange**: Callback function invoked when the input value changes.
- **error**: Optional error message to display below the field.

## Features

- Supports multiple input types (`text`, `number`, `date`, etc.) via the `type` property.
- Displays a label and placeholder as defined in the field.
- Handles required and disabled states.
- Shows error messages using Material-UI's `helperText`.
- Integrates with form validation and state management.

## Example Usage

```tsx
<TextInput
  field={{
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
    disabled: false,
  }}
  value={firstName}
  onChange={handleFirstNameChange}
  error={firstNameError}
/>
```

## Accessibility

- Uses `label` and `name` for proper association.
- Error messages are displayed below the field.

## Customization

You can customize the label, type, placeholder, and other field properties via the `field` prop.
