# visibleWhen API

The `visibleWhen` property allows you to conditionally show or hide fields based on the values of other fields in the form. It supports both simple field conditions and complex logical expressions using `AND`/`OR` operators.

## Types

### Condition

A union type that can be either a `FieldCondition` or a `ConditionGroup`:

```ts
type Condition = FieldCondition | ConditionGroup;
```

### FieldCondition

Defines a single condition based on a field's value.

| Property       | Type      | Description                                                    |
|----------------|-----------|----------------------------------------------------------------|
| `field`        | `string`  | The ID of the field to evaluate.                               |
| `equals`       | `any?`    | Field value must equal this value (optional).                  |
| `notEquals`    | `any?`    | Field value must not equal this value (optional).              |
| `in`           | `any[]?`  | Field value must be in this array (optional).                  |
| `notIn`        | `any[]?`  | Field value must not be in this array (optional).              |
| `greaterThan`  | `number?` | Field value must be greater than this number (optional).       |
| `lessThan`     | `number?` | Field value must be less than this number (optional).          |

### ConditionGroup

Groups multiple conditions with a logical operator.

| Property     | Type          | Description                                      |
|--------------|---------------|--------------------------------------------------|
| `operator`   | `"AND" \| "OR"` | Logical operator to combine conditions.        |
| `conditions` | `Condition[]` | Array of conditions to evaluate.                 |

## Usage in FieldDTO

Add the `visibleWhen` property to any field:

```ts
type FieldDTO = {
  // ...other properties...
  visibleWhen?: Condition;
};
```

## Examples

### Simple Equality Condition

Show a field only when another field equals a specific value:

```ts
{
  id: "partnerName",
  type: "text",
  label: "Partner Name",
  visibleWhen: {
    field: "maritalStatus",
    equals: "married"
  }
}
```

### Using `in` Operator

Show a field when another field's value is in a list:

```ts
{
  id: "licenseNumber",
  type: "text",
  label: "License Number",
  visibleWhen: {
    field: "vehicleType",
    in: ["car", "motorcycle", "truck"]
  }
}
```

### Using `notIn` Operator

Show a field when another field's value is not in a list:

```ts
{
  id: "alternativeContact",
  type: "text",
  label: "Alternative Contact",
  visibleWhen: {
    field: "contactMethod",
    notIn: ["email", "phone"]
  }
}
```

### Numeric Comparisons

Show a field based on numeric conditions:

```ts
{
  id: "seniorDiscount",
  type: "checkbox",
  label: "Apply Senior Discount",
  visibleWhen: {
    field: "age",
    greaterThan: 65
  }
}
```

### AND Condition Group

Show a field only when ALL conditions are met:

```ts
{
  id: "employeeId",
  type: "text",
  label: "Employee ID",
  visibleWhen: {
    operator: "AND",
    conditions: [
      { field: "employmentStatus", equals: "employed" },
      { field: "age", greaterThan: 18 }
    ]
  }
}
```

### OR Condition Group

Show a field when ANY condition is met:

```ts
{
  id: "assistanceType",
  type: "select",
  label: "Type of Assistance",
  options: ["Financial", "Medical", "Legal"],
  visibleWhen: {
    operator: "OR",
    conditions: [
      { field: "income", lessThan: 30000 },
      { field: "hasDisability", equals: true },
      { field: "age", greaterThan: 65 }
    ]
  }
}
```

### Nested Condition Groups

Combine multiple logical groups for complex conditions:

```ts
{
  id: "specialOffer",
  type: "text",
  label: "Special Offer Code",
  visibleWhen: {
    operator: "AND",
    conditions: [
      { field: "isNewCustomer", equals: true },
      {
        operator: "OR",
        conditions: [
          { field: "referralSource", equals: "friend" },
          { field: "campaignCode", in: ["SPRING2024", "WELCOME"] }
        ]
      }
    ]
  }
}
```

### Multi-Select Field Conditions

When evaluating multi-select or multi-autocomplete fields:

- **`in` operator**: Returns `true` if ANY selected value is in the condition array
- **`notIn` operator**: Returns `true` if NONE of the selected values are in the condition array

```ts
{
  id: "expertiseLevel",
  type: "select",
  label: "Expertise Level",
  options: ["Beginner", "Intermediate", "Advanced"],
  visibleWhen: {
    field: "interests",
    in: ["programming", "data-science"]
  }
}
```

## Behavior Notes

- If `visibleWhen` is not specified, the field is always visible.
- If a referenced field doesn't exist in the form state, its value is treated as an empty string.
- For multi-select fields, values are extracted from `{ value, label }` objects automatically.
- Conditions are evaluated reactively as form values change.
- All operators within a condition are mutually exclusive; only one should be used per `FieldCondition`.

## Evaluation Logic

The condition evaluation follows these rules:

1. **No condition**: Field is always visible
2. **Field condition**: Evaluates the specified operator against the field's value
3. **AND group**: All conditions must be `true`
4. **OR group**: At least one condition must be `true`
5. **Nested groups**: Evaluated recursively from innermost to outermost
