import { useFormContext } from "./FormContext";

export function useFieldArray<T extends object = any>(props: {
    name: keyof T;
}) {
    const { values, setValue } = useFormContext<T>();
    const name = props.name;
    // Derive directly from context — no local copy that can diverge
    const fields = ((values[name] as any) ?? []) as any[];

    const append = (value: any) =>
        setValue(name as string, [...fields, value]);

    const prepend = (value: any) =>
        setValue(name as string, [value, ...fields]);

    const remove = (index: number) =>
        setValue(
            name as string,
            fields.filter((_, i) => i !== index)
        );

    const swap = (iA: number, iB: number) => {
        const copy = [...fields];
        [copy[iA], copy[iB]] = [copy[iB], copy[iA]];
        setValue(name as string, copy);
    };

    const insert = (index: number, value: any) => {
        const copy = [...fields];
        copy.splice(index, 0, value);
        setValue(name as string, copy);
    };

    return { fields, append, prepend, remove, swap, insert };
}
