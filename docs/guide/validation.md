# Validation Guide

This page explains how validation works in `react-form-dto`, including built-in validation rules, custom validators, and how to use them in your form DTOs.

---

## Overview

Validation in `react-form-dto` is rule-based and declarative. Each field in your form DTO can specify validation rules, which are checked automatically when validating the form or individual fields.

---

## Built-in Validation Rules

The following validation rules are supported out of the box:

| Rule         | Description                                      | Field Types         |
|--------------|--------------------------------------------------|---------------------|
| `required`   | Ensures the field is not empty                   | All                 |
| `min`        | Minimum value for numbers                        | number              |
| `max`        | Maximum value for numbers                        | number              |
| `minLength`  | Minimum string length                            | string              |
| `maxLength`  | Maximum string length                            | string              |
| `pattern`    | Regex pattern match                              | string              |
| `options`    | Value must be one of the allowed options         | select              |
| `dateRange`  | Date must be within a specified range            | date                |
| `customValidator` | Custom validation function                  | All                 |

---

## Defining Validation Rules

Validation rules are defined in the `validations` property of a field:

```typescript
{
  id: "email",
  label: "Email",
  type: "text",
  validations: {
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    minLength: 5,
    maxLength: 50,
    validate: (value) => value.endsWith("@example.com") ? null : "Email must be from example.com"
  }
}
```

- **required**: Set to `true` or a custom error message string.
- **pattern**: Provide a RegExp object.
- **minLength/maxLength**: Provide a number.
- **validate**: Provide a custom function `(value) => string | null`.

---

## Custom Validation

You can add custom validation logic using the `validate` property:

```typescript
validations: {
  validate: (value) => {
    if (!value.startsWith("A")) return "Value must start with 'A'";
    return null;
  }
}
```

The function should return a string (error message) if invalid, or `null` if valid.

---

## Validating Fields and Forms

- **Validate a single field:**

```typescript
import { FormBuilder, type FormBuilderHandle } from 'react-form-dto';
import { useRef } from 'react';
import { myFormDTO } from './myFormDTO';

const formRef = useRef<FormBuilderHandle>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formRef.current) return;
  const firstNameErrors = formRef.current.validateField("firstName");
};

return (
  <form onSubmit={handleSubmit}>
    <FormBuilder ref={formRef} dto={myFormDTO} />
    <button type="submit">Submit</button>
  </form>
)
```

- **Validate the entire form:**

```typescript
import { FormBuilder, type FormBuilderHandle } from 'react-form-dto';
import { useRef } from 'react';
import { myFormDTO } from './myFormDTO';

const formRef = useRef<FormBuilderHandle>(null);

const handleSubmit = (e) => {
  e.preventDefault();
  if (!formRef.current) return;
  const errors = formRef.current.validateAll();
  // or
  const allErrors = formRef.current.getErrors();
};

return (
  <form onSubmit={handleSubmit}>
    <FormBuilder ref={formRef} dto={myFormDTO} />
    <button type="submit">Submit</button>
  </form>
);
```

## Error Messages

- Default error messages are generated automatically.

---

## Example

```typescript
const formDTO = {
  sections: [
    {
      fields: [
        {
          id: "username",
          label: "Username",
          type: "text",
          validations: {
            required: true,
            minLength: 3,
            maxLength: 20
          }
        },
        {
          id: "age",
          label: "Age",
          type: "number",
          validations: {
            min: 18,
            max: 99
          }
        }
      ]
    }
  ]
};

const values = { username: "ab", age: 15 };
const errors = validateAll(formDTO, values);
// errors = { username: [...], age: [...] }
```

---

## Notes

- Only rules specified in the field's `validations` property are checked.
- Custom validators can be used for complex or cross-field validation.
- Validation runs on demand; you can trigger it on submit or on change.

---
