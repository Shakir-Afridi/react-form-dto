import { useState } from "react";
import type { FormDTO } from "../types";
import { validateAll, validateField } from "../utils";

type Errors = Record<string, string | null>;

/**
 * A custom React hook for building and managing form state with validation.
 * Provides form values, errors, and validation utilities for a given FormDTO.
 *
 * @param dto - The form DTO definition containing sections and fields
 * @returns An object containing form state and utility functions
 *
 * @example
 * const form = useFormBuilder(myFormDTO);
 * form.handleChange('email', 'user@example.com');
 * const errors = form.validateAll();
 */
export function useFormBuilder(
    dto: FormDTO,
    locale = "en",
    handleChangeCallback?: (id: string, val: any) => void
) {
    const [values, setValues] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Errors>({});

    /**
     * Updates the value of a specific field and clears its error.
     *
     * @param id - The field ID to update
     * @param val - The new value for the field
     */
    const handleChange = (id: string, val: any) => {
        setValues((prev) => ({ ...prev, [id]: val }));
        setErrors((prev) => ({ ...prev, [id]: null }));
        if (handleChangeCallback) {
            let value = val;
            if (Array.isArray(val)) {
                value = val.map((v) => v.value ?? "");
            } else if (typeof val === "object" && val !== null) {
                value = val.value ?? "";
            }
            handleChangeCallback(id, value);
        }
    };

    /**
     * Validates all fields in the form against their validation rules.
     *
     * @returns An object mapping field IDs to arrays of error messages
     */
    const validateAllFields = () => {
        return validateAll(dto, values, locale);
    };

    /**
     * Validates a single field by its ID.
     *
     * @param id - The field ID to validate
     * @returns An array of error messages for the field
     */
    const validateFieldById = (id: string) => {
        return validateField(dto, values, id, locale);
    };

    /**
     * Returns the current form values.
     *
     * @returns An object containing all field values keyed by field ID
     */
    const getValues = () => values;

    /**
     * Returns the current form errors.
     *
     * @returns An object containing all field errors keyed by field ID
     */
    const getErrors = () => errors;

    return {
        /** Current form values for all fields */
        values,
        /** Function to update a field value */
        handleChange,
        /** Function to validate all fields */
        validateAll: validateAllFields,
        /** Function to get all current form values */
        getValues,
        /** Function to get all current form errors */
        getErrors,
        /** Function to validate a specific field */
        validateField: validateFieldById,
    };
}
