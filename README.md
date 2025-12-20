# React Form DTO

**Schema-first, DTO-driven form builder for React and Material UI (MUI v7)**

React Form DTO helps you build complex, responsive, and accessible forms using declarative JSON/TypeScript DTOs instead of verbose JSX. It is designed for enterprise-grade applications, internal tools, admin panels, and workflows where forms are dynamic, configurable, and data-driven.

---

## Why React Form DTO?

Most form libraries focus on low-level state management. React Form DTO operates at a **higher abstraction level**.

**Use this library when:**

- Your forms are generated from backend schemas or configurations
- You want to avoid duplicating UI logic across applications
- You need imperative control over form state (wizards, modals, async flows)
- Your project is built on Material UI

**Key advantages:**

- 📄 **DTO-first design** – define forms entirely in JSON or TypeScript
- 🎨 **Material UI v7 native** – consistent design & accessibility
- 🧱 **Composable architecture** – Form → Section → Field
- 🎯 **Imperative API** – programmatic access via refs
- 🔀 **Conditional rendering** – show/hide fields dynamically
- 🧩 **Custom renderers** – plug in your own components
- 🛡️ **Strong TypeScript typing** – predictable, safe APIs

---

## How It Compares

| Feature | React Form DTO | React Hook Form | Formik |
|------|---------------|----------------|--------|
| Schema/DTO driven | ✅ Native | ❌ Manual | ❌ Manual |
| MUI-first | ✅ Yes | ⚠️ Partial | ⚠️ Partial |
| Imperative API | ✅ First-class | ⚠️ Limited | ⚠️ Limited |
| Large dynamic forms | ✅ Excellent | ⚠️ Medium | ❌ Poor |
| Boilerplate | ✅ Minimal | ❌ High | ❌ High |

> React Form DTO is **not a replacement** for React Hook Form. It is a higher-level abstraction for schema-driven UI generation.

---

## Installation

```bash
git clone https://github.com/Shakir-Afridi/react-form-dto.git
cd react-form-dto
npm install
```

### Requirements

- Node.js >= 18
- React >= 19
- Material UI >= 7

---

## Minimal Example

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

---

## 📋 Example Form rendered

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
                    layout: { cols: 4 },
                },
                {
                    id: "firstName",
                    type: "text",
                    label: "First Name",
                    layout: { cols: 4 },
                },
                {
                    id: "lastName",
                    type: "text",
                    label: "Last Name",
                    layout: { cols: 4 },
                },
                {
                    id: "age",
                    type: "number",
                    label: "Age",
                    layout: { cols: 6 },
                },
                {
                    id: "dob",
                    type: "date",
                    label: "Date of Birth",
                    layout: { cols: 6 },
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
                    layout: { cols: 12 },
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
                    layout: { cols: 6 },
                },
            ],
        },
    ],
};
```

---

## Supported Field Types

### Text Inputs

- `text`
- `number`
- `date`
- `email`
- `password`

### Selection Inputs

- `select`
- `autocomplete`
- `multi-autocomplete`

### Boolean Inputs

- `checkbox`

---

## 🌍 Internationalization (I18n)

React Form DTO has built-in support for multi-language forms through `I18String` and `I18nOption` types.

### Using I18String

Any text property (`label`, `placeholder`, `title`, `description`, validation messages) can be either a plain string or a locale map:

```tsx
// Simple string (single language)
{
  label: "First Name"
}

// Multi-language support
{
  label: {
    en: "First Name",
    fr: "Prénom",
    es: "Nombre",
    de: "Vorname"
  }
}
```

### Using I18nOption for Selections

For select, autocomplete, and multi-autocomplete fields, you can use `I18nOption` objects to provide translatable labels while maintaining stable values:

```tsx
{
  id: "country",
  type: "select",
  label: { en: "Country", fr: "Pays" },
  options: [
    {
      value: "us",
      label: { en: "United States", fr: "États-Unis" }
    },
    {
      value: "fr",
      label: { en: "France", fr: "France" }
    },
    {
      value: "de",
      label: { en: "Germany", fr: "Allemagne" }
    }
  ]
}
```

**Backward Compatibility:** Simple string arrays still work:

```tsx
options: ["USA", "France", "Germany"] // Still supported
```

### I18n Validation Messages

Validation messages also support I18n:

```tsx
validations: {
  required: {
    en: "This field is required",
    fr: "Ce champ est obligatoire",
    es: "Este campo es obligatorio"
  },
  validate: (value) => value.length < 2 
    ? { 
        en: "Minimum 2 characters",
        fr: "Minimum 2 caractères" 
      }
    : null
}
```

### Complete I18n Example

```tsx
const multilingualForm: FormDTO = {
  title: {
    en: "User Registration",
    fr: "Inscription de l'utilisateur",
    es: "Registro de Usuario"
  },
  description: {
    en: "Please fill in your details",
    fr: "Veuillez remplir vos coordonnées",
    es: "Por favor complete sus datos"
  },
  sections: [
    {
      id: "personal",
      heading: {
        en: "Personal Information",
        fr: "Informations personnelles",
        es: "Información Personal"
      },
      fields: [
        {
          id: "title",
          type: "select",
          label: { en: "Title", fr: "Titre", es: "Título" },
          options: [
            { value: "mr", label: { en: "Mr", fr: "M.", es: "Sr." } },
            { value: "ms", label: { en: "Ms", fr: "Mme", es: "Sra." } },
            { value: "dr", label: { en: "Dr", fr: "Dr", es: "Dr." } }
          ]
        },
        {
          id: "firstName",
          type: "text",
          label: { en: "First Name", fr: "Prénom", es: "Nombre" },
          placeholder: { 
            en: "Enter your first name",
            fr: "Entrez votre prénom",
            es: "Ingrese su nombre"
          },
          validations: {
            required: {
              en: "First name is required",
              fr: "Le prénom est obligatoire",
              es: "El nombre es obligatorio"
            }
          }
        }
      ]
    }
  ]
};
```

> **Note:** The library provides the I18n structure. You'll need to implement locale selection and text resolution in your application layer.

---

## Custom Field Renderers

Override any default renderer by supplying your own component:

```ts
{
  id: "salary",
  type: "number",
  label: "Salary",
  renderer: CurrencyInput
}
```

This makes the library extensible without modifying core logic.

---

## Validation API

Validation is handled through the `useFormBuilder` hook and the imperative form handle.

```ts
const {
  handleChange,   // Function to update a field value: (id, value) => void
  validateAll,    // Function to validate all fields: () => Record<string, string[]>
  getValues,      // Function to get all current form values: () => Record<string, any>
  getErrors,      // Function to get all current form errors: () => Record<string, string | null>
  validateField,  // Function to validate a specific field: (id) => string[]
} = useFormBuilder(myFormDTO);
```

### Validation Rules

```ts
validations: {
  required: "This field is required",
  validate: (value) => value.length < 2 ? "Minimum 2 characters" : null
}
```

> Recommendation: Standardize validation return values to `string[]` for predictable handling in large applications.

---

## Documentation & Demo

- 📘 **Documentation:** See full DTO reference, APIs, and advanced examples [Documentation](https://shakir-afridi.github.io/react-form-dto/docs)
- 📗 **Storybook:** Interactive component playground and live demos [Live Demo](https://shakir-afridi.github.io/react-form-dto/storybook)

---

## Ideal Use Cases

- Admin dashboards
- Internal enterprise tools
- Multi-step onboarding flows
- Config-driven forms from APIs
- Rapid UI scaffolding for MUI projects

---

## Roadmap (Suggested)

- Field registry API (`registerFieldType`)
- Async validation support
- Form-level conditional logic
- Schema import (JSON Schema / OpenAPI)

---

## 🤝 Contributing

- Fork the repo
- Create a feature branch (`git checkout -b feature/my-feature`)
- Commit changes (`git commit -m "Add my feature"`)
- Push to branch (`git push origin feature/my-feature`)
- Open a Pull Request

---

## 📜 License

MIT

---

**React Form DTO — Schema-first forms for Material UI**
