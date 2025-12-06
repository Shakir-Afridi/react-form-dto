# AutoCompleteField

The `AutoCompleteField` component renders an autocomplete input using Material-UI's `Autocomplete` and `TextField`. It is designed for fields where users can search and select from a list of options.

## Props

- **field**: The field definition object, including label, id, options, required, and disabled.
- **value**: The currently selected value.
- **onChange**: Callback function invoked when the selection changes.
- **error**: Optional error message to display below the field.

## Features

- Provides a searchable dropdown for selecting a single value.
- Handles required and disabled states.
- Shows error messages using Material-UI's `TextField`.
- Integrates with form validation and state management.

## Example Usage

```tsx
<AutoCompleteField
  field={{
    id: "city",
    label: "City",
    options: ["New York", "London", "Paris"],
    required: true,
    disabled: false,
  }}
  value={selectedCity}
  onChange={handleCityChange}
  error={cityError}
/>
```

## Accessibility

- Uses `TextField` for input and label.
- Error messages are displayed below the field.

## Customization

You can customize the options, label, and other field properties via the `field` prop.
