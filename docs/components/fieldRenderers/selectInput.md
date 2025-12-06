# SelectInput

The `SelectInput` component renders a dropdown/select field using Material-UI's `Select` component. It is designed to handle fields with predefined options, allowing users to select one value from a list.

## Props

- **field**: The field definition object, containing metadata such as label, id, options, required, and disabled.
- **value**: The currently selected value.
- **onChange**: Callback function invoked when the selection changes.
- **error**: Optional error message to display below the field.

## Features

- Displays a label and a dropdown menu populated with options from the field definition.
- Handles required and disabled states.
- Shows error messages using Material-UI's `Typography` component.
- Integrates seamlessly with form validation and state management.

## Example Usage

```tsx
<SelectInput
  field={{
    id: "country",
    label: "Country",
    options: ["USA", "Canada", "UK"],
    required: true,
    disabled: false,
  }}
  value={selectedCountry}
  onChange={handleCountryChange}
  error={countryError}
/>
```

## Accessibility

- Uses `InputLabel` and `labelId` for proper association between label and select.
- Error messages are displayed in a caption below the field.

## Customization

You can customize the options, label, and other field properties via the `field` prop.
