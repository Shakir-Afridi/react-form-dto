# MultiAutoCompleteField

The `MultiAutoCompleteField` component renders a multi-select autocomplete input using Material-UI's `Autocomplete` and `TextField`. It allows users to select multiple values from a list of options.

## Props

- **field**: The field definition object, including label, id, options, required, and disabled.
- **value**: The currently selected values (array).
- **onChange**: Callback function invoked when the selection changes.
- **error**: Optional error message to display below the field.

## Features

- Enables selection of multiple options with search capability.
- Handles required and disabled states.
- Shows error messages using Material-UI's `TextField`.
- Integrates with form validation and state management.

## Example Usage

```tsx
<MultiAutoCompleteField
  field={{
    id: "skills",
    label: "Skills",
    options: ["JavaScript", "Python", "React", "Node.js"],
    required: false,
    disabled: false,
  }}
  value={selectedSkills}
  onChange={handleSkillsChange}
  error={skillsError}
/>
```

## Accessibility

- Uses `TextField` for input and label.
- Error messages are displayed below the field.

## Customization

You can customize the options, label, and other field properties via the `field` prop.
