# CheckBoxInput

The `CheckBoxInput` component renders a boolean/checkbox field using Material-UI's `Checkbox` and `FormControlLabel`. It is suitable for fields that represent true/false or yes/no values.

## Props

- **field**: The field definition object, including label, id, required, and disabled.
- **value**: The current checked state (boolean).
- **onChange**: Callback function invoked when the checkbox is toggled.
- **error**: Optional error message to display below the field.

## Features

- Displays a labeled checkbox.
- Handles required and disabled states.
- Shows error messages using Material-UI's `Typography` component.
- Integrates with form validation and state management.

## Example Usage

```tsx
<CheckBoxInput
  field={{
    id: "subscribe",
    label: "Subscribe to newsletter",
    required: false,
    disabled: false,
  }}
  value={isSubscribed}
  onChange={handleSubscribeChange}
  error={subscribeError}
/>
```

## Accessibility

- Uses `FormControlLabel` for proper label association.
- Error messages are displayed in a caption below the field.

## Customization

You can customize the label and other field properties via the `field` prop.
