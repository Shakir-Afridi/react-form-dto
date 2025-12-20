import React, { useImperativeHandle } from "react";
import type { FormDTO } from "../types";
import { Section } from "./Section";
import { Typography } from "@mui/material";
import { useFormBuilder } from "../hooks/useFormBuilder";
import { resolveI18nString } from "../utils/i18n";

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
};

/**
 * FormBuilder component that dynamically renders a form based on a FormDTO definition.
 * Supports custom field renderers, validation, and programmatic access via ref.
 *
 * @example
 * const formRef = useRef<FormBuilderHandle>(null);
 *
 * const handleSubmit = () => {
 *   const errors = formRef.current?.validateAll();
 *   if (Object.keys(errors || {}).length === 0) {
 *     const values = formRef.current?.getValues();
 *     // Submit form values
 *   }
 * };
 *
 * <FormBuilder ref={formRef} dto={myFormDTO} renderers={customRenderers} />
 */
export const FormBuilder = React.forwardRef<
    FormBuilderHandle,
    FormBuilderProps
>(({ dto, renderers, locale = "en" }, ref) => {
    const {
        values,
        handleChange,
        getValues,
        getErrors,
        validateAll,
        validateField,
    } = useFormBuilder(dto, locale);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        getValues,
        getErrors,
        validateAll,
        validateField,
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
                    validateField={validateField}
                    locale={locale}
                />
            ))}
        </>
    );
});
