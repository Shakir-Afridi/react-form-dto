# useFieldArray

Manages an array field inside a `FormProvider`. Provides reactive helpers to append, prepend, remove, swap, and insert items — all backed by the same context state, so any `useWatch` or `useFormContext` consumer sees the changes immediately.

Must be called inside a component that is a descendant of `<FormProvider>`.

## Import

```ts
import { useFieldArray } from 'react-form-dto';
```

## Parameters

```ts
useFieldArray<T extends object>({ name: keyof T })
```

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `keyof T` | Yes | The field key in the form values that holds the array. |

## Returns

| Name | Type | Description |
|------|------|-------------|
| `fields` | `any[]` | The current array value from context. Re-renders when it changes. |
| `append` | `(value: any) => void` | Adds an item at the end of the array. |
| `prepend` | `(value: any) => void` | Inserts an item at the beginning of the array. |
| `remove` | `(index: number) => void` | Removes the item at the given index. |
| `swap` | `(iA: number, iB: number) => void` | Swaps items at two positions. |
| `insert` | `(index: number, value: any) => void` | Inserts an item at the given index, shifting existing items right. |

## Usage

```tsx
import { useForm, FormProvider, useFieldArray } from 'react-form-dto';

type Skill = { label: string };
type MyForm = { name: string; skills: Skill[] };

function SkillsField() {
  const { fields, append, remove } = useFieldArray<MyForm>({ name: 'skills' });

  return (
    <div>
      {fields.map((skill, i) => (
        <div key={i} style={{ display: 'flex', gap: 8 }}>
          <span>{skill.label}</span>
          <button type="button" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ label: 'New skill' })}>
        Add skill
      </button>
    </div>
  );
}

export function ProfileForm() {
  const form = useForm<MyForm>({
    defaultValues: { name: '', skills: [] },
  });

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((d) => console.log(d))}>
        <input {...form.register('name')} placeholder="Your name" />
        <SkillsField />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## With useFormDTO and FormBuilder

`useFieldArray` works the same way when the form is driven by a `FormDTO`:

```tsx
import { FormBuilder, FormProvider, useFormDTO, useFieldArray } from 'react-form-dto';
import { myDTO } from './myDTO';

type MyForm = { tags: { value: string }[] };

function TagManager() {
  const { fields, append, remove } = useFieldArray<MyForm>({ name: 'tags' });
  return (
    <div>
      {fields.map((tag, i) => (
        <span key={i}>
          {tag.value} <button type="button" onClick={() => remove(i)}>×</button>
        </span>
      ))}
      <button type="button" onClick={() => append({ value: '' })}>Add</button>
    </div>
  );
}

export function MyPage() {
  const form = useFormDTO<MyForm>(myDTO);
  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((d) => console.log(d))}>
        <FormBuilder dto={myDTO} />
        <TagManager />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Notes

- `fields` is derived directly from `values[name]` in context on every render — there is no local copy that can fall out of sync.
- Calling `reset()` on the parent form will also reset the array because `fields` reads from context state.
- The generic type `T` is optional but improves autocomplete. If omitted the hook falls back to `any`.
