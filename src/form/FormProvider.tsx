import React from "react";
import { FormContext, FormContextType } from "./FormContext";

type Props<T extends object> = {
    value: FormContextType<T>;
    children: React.ReactNode;
};

export function FormProvider<T extends object = {}>({
    value,
    children,
}: Props<T>) {
    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
}
