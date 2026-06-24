import { useFormContext } from "./FormContext";

// React context re-renders all consumers when the value changes, so
// there is no need for local state or effects here — just read directly.
export function useWatch<T extends object = any>(
    name: keyof T | (keyof T)[]
): any {
    const { values } = useFormContext<T>();
    if (Array.isArray(name)) return name.map((n) => values[n]);
    return values[name];
}
