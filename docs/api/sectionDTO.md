# SectionDTO

The `SectionDTO` type defines a section within a form, grouping related fields together and allowing for section-specific layout and headings.

## Properties

| Name                  | Type           | Description                                                      |
|-----------------------|----------------|------------------------------------------------------------------|
| `id`                  | `string`       | Unique identifier for the section.                               |
| `heading`             | `string?`      | Section heading text (optional).                                 |
| `headingFontSize`     | `number?`      | Font size for the heading in `rem` units (optional).             |
| `description`         | `string?`      | Description text for the section (optional).                     |
| `descriptionFontSize` | `number?`      | Font size for the description in `rem` units (optional).         |
| `layout`              | `LayoutDTO?`   | Layout configuration for the section (optional).                 |
| `fields`              | `FieldDTO[]`   | Array of field definitions for this section.                     |

## Example

```ts
const section: SectionDTO = {
  id: "contact",
  heading: "Contact Details",
  headingFontSize: 1.5,
  description: "How can we reach you?",
  layout: { cols: 2, gap: "0.5rem" },
  fields: [
    { id: "email", type: "email", label: "Email Address", required: true },
    { id: "phone", type: "text", label: "Phone Number" }
  ]
};
