# Section Component

The `Section` component is responsible for rendering a logical grouping of fields within a form. It displays a heading, description, and arranges fields in a responsive grid layout.

## Props

| Name         | Type                                                      | Description                                                                                 |
|--------------|-----------------------------------------------------------|---------------------------------------------------------------------------------------------|
| `section`    | `SectionDTO`                                              | Section definition containing heading, description, and fields.                              |
| `values`     | `Record<string, any>`                                     | Current form values keyed by field ID.                                                       |
| `onChange`   | `(id: string, val: any) => void`                          | Callback to handle field value changes.                                                      |
| `renderers`  | `Record<string, React.ComponentType<any>>` (optional)     | Custom renderers for specific field types.                                                   |
| `validateField` | `(id: string) => string[]`                             | Function to validate a field and return error messages.                                      |

## Usage

```tsx
<Section
  section={sectionDTO}
  values={formValues}
  onChange={handleFieldChange}
  renderers={customRenderers}
  validateField={validateField}
/>
```

## Features

- **Heading & Description:** Displays section heading and description with customizable font sizes.
- **Grid Layout:** Fields are arranged using Material UI's Grid, with column spans determined by field layout.
- **Field Rendering:** Each field is rendered using the `Field` component, supporting custom renderers.
- **Validation:** Field errors are displayed using the `validateField` callback.

## Example

```tsx
const sectionDTO = {
  id: "personal",
  heading: "Personal Information",
  description: "Enter your personal details.",
  fields: [
    { id: "firstName", type: "text", label: "First Name", layout: { col: 6 } },
    { id: "lastName", type: "text", label: "Last Name", layout: { col: 6 } },
  ],
};

<Section
  section={sectionDTO}
  values={{ firstName: "", lastName: "" }}
  onChange={(id, val) => { /* handle change */ }}
  validateField={(id) => []}
/>
```
