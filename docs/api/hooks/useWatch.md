# useWatch

Reactively reads one or more field values from the nearest `FormProvider`. The component that calls `useWatch` re-renders whenever the watched value(s) change — no manual subscription needed.

Must be called inside a component that is a descendant of `<FormProvider>`.

## Import

```ts
import { useWatch } from 'react-form-dto';
```

## Signatures

```ts
// Watch a single field
useWatch<T>(name: keyof T): T[keyof T]

// Watch multiple fields
useWatch<T>(name: (keyof T)[]): Array<T[keyof T]>
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `name` | `keyof T` or `(keyof T)[]` | The field key(s) to watch. |

## Returns

- When `name` is a string: the current value of that field.
- When `name` is an array: an array of the current values in the same order.

## Single field

```tsx
import { useWatch } from 'react-form-dto';

function LiveGreeting() {
  const firstName = useWatch<{ firstName: string; lastName: string }>('firstName');
  return <p>Hello, {firstName || 'stranger'}!</p>;
}
```

## Multiple fields

```tsx
import { useWatch } from 'react-form-dto';

function NamePreview() {
  const [first, last] = useWatch<{ firstName: string; lastName: string }>([
    'firstName',
    'lastName',
  ]);
  return <p>{first} {last}</p>;
}
```

## Full example with FormProvider

```tsx
import { useForm, FormProvider, useWatch } from 'react-form-dto';

type CheckoutForm = {
  shippingAddress: string;
  billingSameAsShipping: boolean;
  billingAddress: string;
};

function BillingSection() {
  const same = useWatch<CheckoutForm>('billingSameAsShipping');
  const { register } = useFormContext<CheckoutForm>();

  if (same) return <p>Same as shipping address.</p>;

  return <input {...register('billingAddress')} placeholder="Billing address" />;
}

export function CheckoutForm() {
  const form = useForm<CheckoutForm>({
    defaultValues: { shippingAddress: '', billingSameAsShipping: true, billingAddress: '' },
  });

  return (
    <FormProvider value={form}>
      <form onSubmit={form.handleSubmit((d) => console.log(d))}>
        <input {...form.register('shippingAddress')} placeholder="Shipping address" />
        <label>
          <input type="checkbox" {...form.register('billingSameAsShipping')} />
          Billing same as shipping
        </label>
        <BillingSection />
        <button type="submit">Place order</button>
      </form>
    </FormProvider>
  );
}
```

## Notes

- `useWatch` reads straight from context — there is no intermediate `useState` or `useEffect`. React's context re-render mechanism handles reactivity automatically.
- Watching an undefined field key returns `undefined` without throwing.
- For reading values outside of the render cycle (e.g., in an event handler), use `form.getValues()` or `form.watch()` instead.
- For subscribing to the whole form state, use `useFormContext()` directly.
