import React, { useImperativeHandle } from "react";
import type { FormDTO } from "../types";
import { Section } from "./Section";
import { Typography } from "@mui/material";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { useOptionalFormContext } from "../form/FormContext";
import { resolveI18nString } from "../utils/i18n";
import {
    validateAll as validateAllUtil,
    validateField as validateFieldUtil,
} from "../utils";

/**
 * Handle interface exposed by FormBuilder via ref.
 * Provides methods to interact with the form programmatically.
 */
export type FormBuilderHandle = {
    /** Returns all current form values */
    getValues: () => Record<string, any>;
    /** Returns all current form errors */
    getErrors: () => Record<string, string | null>;
    /** Validates all fields and returns errors */
    validateAll: () => Record<string, string[]>;
    /** Validates a specific field by ID and returns errors */
    validateField: (id: string) => string[];
    handleChange?: (id: string, val: any) => void;
};

/**
 * Props for the FormBuilder component.
 */
type FormBuilderProps = {
    /** The form DTO definition containing all sections and fields */
    dto: FormDTO;
    /** Optional custom renderers for specific field types */
    renderers?: Record<string, React.ComponentType<any>>;
    /** Current locale for i18n string resolution (default: 'en') */
    locale?: string;
    handleChangeCallback?: (id: string, val: any) => void;
};

/**
 * FormBuilder component that dynamically renders a form based on a FormDTO definition.
 *
 * **Standalone mode** (existing behaviour, unchanged):
 * Manage state internally and expose `getValues`, `validateAll`, etc. via a ref.
 *
 * **Context mode** (new):
 * When rendered inside a `<FormProvider>` the component reads values from
 * context and writes back through `setValue`. Errors are also stored in
 * context so they only appear after the field is touched or `trigger()` /
 * `handleSubmit()` is called — matching react-hook-form UX conventions.
 *
 * @example Standalone
 * const formRef = useRef<FormBuilderHandle>(null);
 * <FormBuilder ref={formRef} dto={myFormDTO} />
 *
 * @example With FormProvider (useFormDTO)
 * const form = useFormDTO(myFormDTO);
 * <FormProvider value={form}>
 *   <FormBuilder dto={myFormDTO} />
 *   <button onClick={form.handleSubmit(onSubmit)}>Submit</button>
 * </FormProvider>
 */
export const FormBuilder = React.forwardRef<
    FormBuilderHandle,
    FormBuilderProps
>(({ dto, renderers, locale = "en", handleChangeCallback }, ref) => {
    // Always call both hooks (hooks must not be conditional)
    const ctx = useOptionalFormContext();
    const internal = useFormBuilder(dto, locale, handleChangeCallback);

    const isContextMode = Boolean(ctx);

    // In context mode use context values; otherwise internal state
    const values = isContextMode ? ctx!.values : internal.values;

    const handleChange = (id: string, val: any) => {
        if (isContextMode) {
            // Validate on every change so the error clears as the user types
            ctx!.setValue(id, val, true);
            // Still fire the external callback if provided
            if (handleChangeCallback) {
                let resolved = val;
                if (Array.isArray(val)) {
                    resolved = val.map((v) => v.value ?? "");
                } else if (typeof val === "object" && val !== null) {
                    resolved = val.value ?? "";
                }
                handleChangeCallback(id, resolved);
            }
        } else {
            internal.handleChange(id, val);
        }
    };

    // In context mode errors live in context (updated on change / trigger).
    // In standalone mode we run DTO validation live on every render.
    const getFieldErrors = (id: string): string[] => {
        if (isContextMode && ctx) {
            const err = (ctx.errors as Record<string, string | null | undefined>)[id];
            return err ? [err] : [];
        }
        return internal.validateField(id);
    };

    useImperativeHandle(ref, () => ({
        getValues: () => (isContextMode ? ctx!.getValues() : internal.getValues()),
        getErrors: () =>
            isContextMode
                ? (ctx!.errors as Record<string, string | null>)
                : internal.getErrors(),
        validateAll: () => {
            const errors = validateAllUtil(dto, values, locale);
            if (isContextMode) {
                // Push DTO errors into context so the UI updates
                dto.sections.flatMap((s) => s.fields).forEach((f) => {
                    const errs = errors[f.id];
                    if (errs?.length) {
                        ctx!.setError(f.id, errs[0]);
                    } else {
                        ctx!.clearError(f.id);
                    }
                });
            }
            return errors;
        },
        validateField: (id: string) => {
            const errs = validateFieldUtil(dto, values, id, locale);
            if (isContextMode) {
                ctx!.setError(id, errs[0] ?? null);
            }
            return errs;
        },
        handleChange,
    }));

    return (
        <>
            {dto.title && (
                <Typography
                    variant="h5"
                    color="black"
                    sx={{
                        fontSize: dto.titleFontSize
                            ? `${dto.titleFontSize}rem`
                            : "1.5rem",
                        fontWeight: "bold",
                    }}
                    gutterBottom
                >
                    {resolveI18nString(dto.title, locale)}
                </Typography>
            )}
            {dto.description && (
                <Typography
                    component="p"
                    sx={{
                        fontSize: dto.descriptionFontSize
                            ? `${dto.descriptionFontSize}rem`
                            : "inherit",
                    }}
                    color="textSecondary"
                    gutterBottom
                >
                    {resolveI18nString(dto.description, locale)}
                </Typography>
            )}
            {dto.sections.map((section) => (
                <Section
                    key={section.id}
                    section={section}
                    values={values}
                    onChange={handleChange}
                    renderers={renderers}
                    validateField={getFieldErrors}
                    locale={locale}
                />
            ))}
        </>
    );
});
