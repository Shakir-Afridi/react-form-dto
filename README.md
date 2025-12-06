# React Form DTO

A **dynamic, DTO-driven form builder** built with **React, TypeScript, and Material UI (MUI v7)**.  
This library lets you define forms declaratively using JSON DTOs (`FormDTO`, `SectionDTO`, `FieldDTO`) and automatically renders responsive, accessible forms with MUI components.

---

## ✨ Features

- **DTO-driven**: Define forms entirely in JSON/TypeScript objects.
- **Material UI integration**: Uses MUI v7 components for consistent design and accessibility.
- **Responsive grid layout**: 12-column system mapped to MUI’s `Grid` with `size` props.
- **Conditional rendering**: Show/hide fields or sections based on other field values.
- **Custom renderers**: Override default MUI inputs with your own components.
- **TypeScript support**: Strongly typed DTOs for safety and autocompletion.
- **Composable architecture**: `FormBuilder`, `Section`, and `Field` components.
- **Built-in validation**: Use `useFormBuilder` hook and validation utilities for field and form validation.

---

📘 Documentation

Comprehensive documentation is available here

👉 [Documentation](https://shakir-afridi.github.io/react-form-dto/)

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/Shakir-Afridi/react-form-dto.git
cd react-form-dto
npm install
```

> **Requirements:**  
> - Node.js >= 18  
> - React >= 19  
> - Material UI >= 7

---

## 🏗️ Usage

Import and use the form builder in your React app:

```tsx
import { FormBuilder, type FormBuilderHandle } from 'react-form-dto';
import { useRef } from 'react';
import { myFormDTO } from './myFormDTO';

const formRef = useRef<FormBuilderHandle>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formRef.current) return;
  const values = formRef.current.getValues();
  const errors = formRef.current.validateAll();
  formRef.current.handleChange?.("firstName", "NewName");
  const firstNameErrors = formRef.current.validateField("firstName");
  const allErrors = formRef.current.getErrors();
};

return (
  <form onSubmit={handleSubmit}>
    <FormBuilder ref={formRef} dto={myFormDTO} />
    <button type="submit">Submit</button>
  </form>
);
```

Refer to the documentation and examples for DTO structure and customization.

---

### 📋 Example

![Form Example](./example.png)

The form in the image above is generated from this DTO.

```tsx
const profileForm: FormDTO = {
    title: "User Profile",
    description: "Fill out your personal information",
    layout: { cols: 12, gap: "1rem" }, // global form layout
    sections: [
        {
            id: "personal",
            heading: "Personal Information",
            description: "Basic details about you",
            layout: { cols: 12, gap: "1rem" }, // section layout
            fields: [
                {
                    id: "title",
                    type: "select",
                    label: "Title",
                    placeholder: "Select your title",
                    options: ["Mr", "Ms", "Dr", "Prof"],
                    layout: { col: 4 },
                },
                {
                    id: "firstName",
                    type: "text",
                    label: "First Name",
                    layout: { col: 4 },
                },
                {
                    id: "lastName",
                    type: "text",
                    label: "Last Name",
                    layout: { col: 4 },
                },
                {
                    id: "age",
                    type: "number",
                    label: "Age",
                    layout: { col: 6 },
                },
                {
                    id: "dob",
                    type: "date",
                    label: "Date of Birth",
                    layout: { col: 6 },
                },
                {
                    id: "skills",
                    type: "multi-autocomplete",
                    label: "Skills",
                    placeholder: "Select your skills",
                    options: [
                        "React",
                        "TypeScript",
                        "Node.js",
                        "GraphQL",
                        "Docker",
                    ],
                    layout: { col: 12 },
                    validations: {
                        required: "Select at least one skill",
                        validate: (val: string[]) =>
                            val && val.length < 2
                                ? "Pick at least 2 skills"
                                : null,
                    },
                },
            ],
        },
        {
            id: "contact",
            heading: "Contact Information",
            layout: { cols: 12 },
            fields: [
                {
                    id: "email",
                    type: "email",
                    label: "Email",
                    validations: {
                        required: "Email is required",
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                },
                { id: "phone", type: "text", label: "Phone Number" },
                {
                    id: "country",
                    type: "autocomplete",
                    label: "Country",
                    placeholder: "Select a country",
                    options: ["Pakistan", "India", "USA", "UK", "Germany"],
                    layout: { col: 6 },
                },
            ],
        },
    ],
};
```

---

### Supported Field Types & Renderers

- **TextInput**: text, number, date
- **SelectInput**: select/dropdown
- **CheckBoxInput**: boolean/checkbox
- **AutoCompleteField**: single autocomplete
- **MultiAutoCompleteField**: multi-select autocomplete

You can provide a custom renderer for any field via the DTO:

```tsx
{
  // ...existing field DTO...
  renderer: MyCustomComponent
}
```

### Validation

The `useFormBuilder` hook provides the following API for managing form state and validation:

```tsx
const {
  handleChange,   // Function to update a field value: (id, value) => void
  validateAll,    // Function to validate all fields: () => Record<string, string[]>
  getValues,      // Function to get all current form values: () => Record<string, any>
  getErrors,      // Function to get all current form errors: () => Record<string, string | null>
  validateField,  // Function to validate a specific field: (id) => string[]
} = useFormBuilder(myFormDTO);
```

- `handleChange(id, value)`: Update a field value.
- `validateAll()`: Validate all fields and return errors.
- `validateField(id)`: Validate a specific field and return errors for that field.
- `getValues()`: Get all form values.
- `getErrors()`: Get all form errors.

Refer to the documentation and examples for DTO structure and customization.

---

## 🤝 Contributing

- Fork the repo
- Create a feature branch (`git checkout -b feature/my-feature`)
- Commit changes (`git commit -m "Add my feature"`)
- Push to branch (`git push origin feature/my-feature`)
- Open a Pull Request

---

## 📜 License

MIT License © 2025 Shakir Ullah
