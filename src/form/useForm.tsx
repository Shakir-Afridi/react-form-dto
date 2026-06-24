import React, { useRef, useCallback, useState } from "react";
import { FormContextType, FieldError } from "./FormContext";

type FieldValidation = (value: any) => FieldError;

type UseFormOptions<T> = {
    defaultValues?: Partial<T>;
    validate?: { [K in keyof T]?: FieldValidation };
};

export function useForm<T extends object = any>(
    options: UseFormOptions<T> = {}
): FormContextType<T> {
    const [values, setValues] = useState<T>({ ...options.defaultValues } as T);
    const [errors, setErrors] = useState<{ [K in keyof T]?: FieldError }>({});
    const [touchedFields, setTouchedFields] = useState<{
        [K in keyof T]?: boolean;
    }>({});

    const fieldsRef = useRef<{ [name: string]: HTMLInputElement | null }>({});
    // Always-current values ref so stable callbacks can read the latest state
    const valuesRef = useRef<T>(values);
    valuesRef.current = values;

    const register = useCallback(
        (name: string, registerOptions?: { validate?: FieldValidation }) => {
            return {
                name,
                ref: (el: HTMLInputElement | null) => {
                    fieldsRef.current[name] = el;
                },
                onChange: (e: React.ChangeEvent<any>) => {
                    const newValue = e.target.value;
                    setValues((prev: any) => ({ ...prev, [name]: newValue }));
                    setTouchedFields((prev: any) => ({
                        ...prev,
                        [name]: true,
                    }));
                    const validateFn =
                        registerOptions?.validate ??
                        options.validate?.[name as keyof T];
                    setErrors((prev) => ({
                        ...prev,
                        [name]: validateFn ? validateFn(newValue) : null,
                    }));
                },
                onBlur: () => {
                    setTouchedFields((prev: any) => ({
                        ...prev,
                        [name]: true,
                    }));
                },
            };
        },
        [options.validate]
    );

    // Accepts string so it works for both typed keys and dynamic field names
    const setValue = useCallback(
        (name: string, value: any, shouldValidate?: boolean) => {
            setValues((prev: any) => ({ ...prev, [name]: value }));
            if (shouldValidate) {
                const validateFn = options.validate?.[name as keyof T];
                setErrors((prev) => ({
                    ...prev,
                    [name]: validateFn ? validateFn(value) : null,
                }));
            }
        },
        [options.validate]
    );

    const setError = useCallback((name: string, error: FieldError) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    const clearError = useCallback((name: string) => {
        setErrors((prev) => ({ ...prev, [name]: null }));
    }, []);

    const getValues = useCallback((): T => valuesRef.current, []);

    const reset = useCallback(
        (nextValues?: Partial<T>) => {
            const next = (nextValues ?? options.defaultValues ?? {}) as T;
            setValues(next);
            valuesRef.current = next;
            setErrors({});
            setTouchedFields({});
        },
        [options.defaultValues]
    );

    const trigger = useCallback(
        (name?: string): boolean => {
            const current = valuesRef.current;
            if (!name) {
                // Validate all fields in a single state update
                const newErrors: Partial<{ [K in keyof T]: FieldError }> = {};
                let valid = true;
                for (const [field, fn] of Object.entries(
                    options.validate ?? {}
                )) {
                    const err = (fn as FieldValidation)(
                        current[field as keyof T]
                    );
                    newErrors[field as keyof T] = err ?? null;
                    if (err) valid = false;
                }
                setErrors((prev) => ({ ...prev, ...newErrors }));
                return valid;
            }
            const fn = options.validate?.[name as keyof T];
            const err = fn ? fn(current[name as keyof T]) : null;
            setErrors((prev) => ({ ...prev, [name]: err ?? null }));
            return !err;
        },
        [options.validate]
    );

    const handleSubmit = useCallback(
        (cb: (data: T, event?: React.BaseSyntheticEvent) => void) =>
            (e?: React.SyntheticEvent) => {
                if (e?.preventDefault) e.preventDefault();
                const isValid = trigger();
                if (isValid) cb(valuesRef.current, e as any);
            },
        [trigger]
    );

    const watch = useCallback(
        (name?: string | string[]): any => {
            const current = valuesRef.current;
            if (!name) return current;
            if (typeof name === "string") return current[name as keyof T];
            return name.map((n) => current[n as keyof T]);
        },
        []
    );

    const control: FormContextType<T> = {
        values,
        errors,
        touchedFields,
        register,
        setValue,
        getValues,
        setError,
        clearError,
        handleSubmit,
        reset,
        trigger,
        watch,
        control: undefined as any,
    };
    control.control = control;

    return control;
}
