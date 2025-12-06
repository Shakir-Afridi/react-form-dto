# FormDTO

The `FormDTO` type defines the structure of a form, including its title, description, layout, and sections. It is the top-level object used to describe a form in a data-driven way.

## Properties

| Name                | Type            | Description                                                                 |
|---------------------|-----------------|-----------------------------------------------------------------------------|
| `title`             | `string?`       | The form's title (optional).                                                |
| `titleFontSize`     | `number?`       | Font size for the title in `rem` units (optional).                          |
| `description`       | `string?`       | Description text for the form (optional).                                   |
| `descriptionFontSize`| `number?`      | Font size for the description in `rem` units (optional).                    |
| `layout`            | `LayoutDTO?`    | Layout configuration for the entire form (optional).                        |
| `sections`          | `SectionDTO[]`  | Array of section definitions, each containing fields.                       |

## Example

```ts
const formDTO: FormDTO = {
  title: "User Registration",
  titleFontSize: 2,
  description: "Please fill out all required fields.",
  descriptionFontSize: 1.2,
  layout: { col: 2, gap: "1rem" },
  sections: [
    {
      id: "personal",
      heading: "Personal Information",
      fields: [
        { id: "firstName", type: "text", label: "First Name", required: true },
        { id: "lastName", type: "text", label: "Last Name", required: true }
      ]
    }
  ]
};
```
