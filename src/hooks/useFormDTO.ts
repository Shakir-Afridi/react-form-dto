import { useRef, useMemo } from "react";
import { useForm } from "../form/useForm";
import type { FormDTO } from "../types";
import { validateField as validateFieldUtil } from "../utils";

/**
 * Creates a react-hook-form–style form bound to a FormDTO.
 *
 * Default values are extracted from `field.defaultValue`.
 * Validation rules come directly from `field.validations`.
 *
 * Use together with `<FormProvider>` and `<FormBuilder>` to get the
 * full hook-form experience without managing a ref:
 *
 * @example
 * const form = useFormDTO(myDTO);
 *
 * <FormProvider value={form}>
 *   <FormBuilder dto={myDTO} />
 *   <button onClick={form.handleSubmit(onSubmit)}>Submit</button>
 * </FormProvider>
 */
export function useFormDTO<T extends object = Record<string, any>>(
    dto: FormDTO,
    options?: { locale?: string }
) {
    const locale = options?.locale ?? "en";

    const defaultValues = useMemo(
        () =>
            dto.sections
                .flatMap((s) => s.fields)
                .reduce<Record<string, any>>((acc, f) => {
                    acc[f.id] = f.defaultValue ?? "";
                    return acc;
                }, {}),
        // dto is expected to be a stable reference (defined outside renders)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    // A ref lets the per-field validate closures always read the latest form
    // values, which enables cross-field validation in custom `validate` fns.
    const valuesRef = useRef<Record<string, any>>(defaultValues);

    const validate = useMemo(
        () =>
            dto.sections
                .flatMap((s) => s.fields)
                .filter((f) => f.validations)
                .reduce<Record<string, (val: any) => string | null>>(
                    (acc, f) => {
                        acc[f.id] = (val) => {
                            const snapshot = {
                                ...valuesRef.current,
                                [f.id]: val,
                            };
                            const errs = validateFieldUtil(
                                dto,
                                snapshot,
                                f.id,
                                locale
                            );
                            return errs[0] ?? null;
                        };
                        return acc;
                    },
                    {}
                ),
        // locale changes rebuild validate fns; dto is assumed stable
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [locale]
    );

    const form = useForm<T>({
        defaultValues: defaultValues as Partial<T>,
        validate: validate as any,
    });

    // Keep ref in sync with live state so validate closures see fresh values
    valuesRef.current = form.values as any;

    return form;
}
