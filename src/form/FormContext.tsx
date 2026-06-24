import React, { createContext, useContext } from "react";

export type FieldError = string | null | undefined;

export interface FieldArrayHelpers {
    fields: any[];
    append: (value: any) => void;
    remove: (index: number) => void;
    prepend: (value: any) => void;
    swap: (a: number, b: number) => void;
    insert: (index: number, value: any) => void;
}

export interface FormContextType<T extends object = any> {
    values: T;
    errors: { [K in keyof T]?: FieldError };
    touchedFields: { [K in keyof T]?: boolean };
    register: (
        name: string,
        options?: { validate?: (value: any) => FieldError }
    ) => {
        name: string;
        ref: (el: HTMLInputElement | null) => void;
        onChange: (e: React.ChangeEvent<any>) => void;
        onBlur: () => void;
    };
    setValue: (name: string, value: any, shouldValidate?: boolean) => void;
    getValues: () => T;
    setError: (name: string, error: FieldError) => void;
    clearError: (name: string) => void;
    handleSubmit: (
        cb: (data: T, event?: React.BaseSyntheticEvent) => void
    ) => (e?: React.SyntheticEvent) => void;
    reset: (nextValues?: Partial<T>) => void;
    trigger: (name?: string) => boolean;
    /** Self-reference so child components can do `const { control } = useFormContext()` and spread `control.register(...)` */
    control: FormContextType<T>;
    watch: (name?: string | string[]) => any;
}

export const FormContext = createContext<FormContextType<any> | undefined>(
    undefined
);

export function useFormContext<T extends object = any>(): FormContextType<T> {
    const ctx = useContext(FormContext);
    if (!ctx)
        throw new Error("useFormContext must be used inside a <FormProvider>.");
    return ctx as FormContextType<T>;
}

/** Returns the context value without throwing — useful for optional context bridges. */
export function useOptionalFormContext<
    T extends object = any
>(): FormContextType<T> | undefined {
    return useContext(FormContext) as FormContextType<T> | undefined;
}
