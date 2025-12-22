# FormBuilder Component

The `FormBuilder` component dynamically renders a form based on a `FormDTO` definition. It supports custom field renderers, validation, and programmatic access via ref.

## Props

| Name        | Type                                                      | Description                                                        |
|-------------|-----------------------------------------------------------|--------------------------------------------------------------------|
| `dto`       | `FormDTO`                                                 | The form definition containing sections and fields.                |
| `renderers` | `Record<string, React.ComponentType<any>>` (optional)     | Custom renderers for specific field types.                         |
| `locale`    | `string`                                                  | Locale for localization. Default is `en`                   |
| `handleChangeCallback` | `(id: string, value: any) => void` (optional)    | Callback invoked on every input change with field ID and value.    |

## Ref Methods (`FormBuilderHandle`)

| Method         | Description                                                        |
|----------------|--------------------------------------------------------------------|
| `getValues()`  | Returns all current form values.                                   |
| `getErrors()`  | Returns all current form errors.                                   |
| `validateAll()`| Validates all fields and returns errors.                           |
| `validateField(id)` | Validates a specific field by ID and returns errors.          |

## Usage

```tsx
const formRef = useRef<FormBuilderHandle>(null);

<FormBuilder ref={formRef} dto={formDTO} renderers={customRenderers} />

// Access values/errors via ref
const values = formRef.current?.getValues();
const errors = formRef.current?.getErrors();
```

## Features

- **Dynamic Rendering:** Renders sections and fields based on DTO.
- **Custom Renderers:** Supports custom field components via `renderers` prop.
- **Validation:** Provides validation methods for all fields or individual fields.
- **Imperative Handle:** Exposes form methods via React ref for programmatic access.

## Example

```tsx
const formDTO = {
  title: "Registration",
  description: "Fill out the registration form.",
  sections: [
    { id: "personal", heading: "Personal Info", fields: [/* ... */] },
    { id: "contact", heading: "Contact Info", fields: [/* ... */] },
  ],
};

<FormBuilder ref={formRef} dto={formDTO} />
