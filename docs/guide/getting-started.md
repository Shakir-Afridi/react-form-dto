# Getting Started

`react-form-dto` helps you build forms dynamically from DTO (Data Transfer Object) definitions. It automatically generates form fields based on your DTO structure.

## Installation

```bash
npm install react-form-dto
```

## Basic Usage

Import the `FormBuilder` component and provide your DTO definition:

```tsx
import { FormBuilder } from 'react-form-dto';

// Define your DTO
const dto = {
  title: "User Profile",
  description: "Fill out your personal information",
  sections:[
    {
      id: "personal",
      heading: "Personal Information",
      description: "Basic details about you",
      fields:[
        { type: 'text', label: 'Name' },
        { type: 'number', label: 'Age' },
        { type: 'email', label: 'Email' }
      ]
    }
  ]
};

export default function MyForm() {
  return <FormBuilder dto={dto} />;
}
```

## DTO Structure

A DTO is a plain object where each key represents a form field. Each field can specify:

- `type`: Field type (`text`, `select`, `autocomplete`, etc.)
- `label`: Field label
- `required`: Whether the field is required

## Rendering the Form

The `FormBuilder` will automatically render input fields for each property in your DTO. You can handle form submission and validation using the built-in features or customize as needed.
