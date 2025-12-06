import type { FieldDTO, FormDTO } from "@types";

type ValidationFn = (field: FieldDTO, value: any) => string | null;

/**
 * A collection of validation functions for form fields.
 * Each function takes a field definition and value, returning an error message or null.
 */
export const validationRules: Record<string, ValidationFn> = {
    /**
     * Validates that a required field has a value.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    required: (field, value) => {
        if (
            field.required &&
            (value === null || value === undefined || value === "")
        ) {
            return `${field.label} is required`;
        }
        return null;
    },

    /**
     * Validates that a number field meets the minimum value requirement.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    min: (field, value) => {
        if (
            field.type === "number" &&
            (field as any).min !== undefined &&
            value < (field as any).min
        ) {
            return `${field.label} must be at least ${(field as any).min}`;
        }
        return null;
    },

    /**
     * Validates that a number field does not exceed the maximum value.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    max: (field, value) => {
        if (
            field.type === "number" &&
            (field as any).max !== undefined &&
            value > (field as any).max
        ) {
            return `${field.label} must be at most ${(field as any).max}`;
        }
        return null;
    },

    /**
     * Validates that a string field meets the minimum length requirement.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    minLength: (field, value) => {
        if (
            typeof value === "string" &&
            (field as any).minLength !== undefined &&
            value.length < (field as any).minLength
        ) {
            return `${field.label} must be at least ${
                (field as any).minLength
            } characters`;
        }
        return null;
    },

    /**
     * Validates that a string field does not exceed the maximum length.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    maxLength: (field, value) => {
        if (
            typeof value === "string" &&
            (field as any).maxLength !== undefined &&
            value.length > (field as any).maxLength
        ) {
            return `${field.label} must be at most ${
                (field as any).maxLength
            } characters`;
        }
        return null;
    },

    /**
     * Validates that a string field matches the specified regex pattern.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    pattern: (field, value) => {
        if (
            (field as any).pattern &&
            typeof value === "string" &&
            !(field as any).pattern.test(value)
        ) {
            return `${field.label} is invalid`;
        }
        return null;
    },

    /**
     * Validates that a select field value is one of the allowed options.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    options: (field, value) => {
        if (
            field.type === "select" &&
            field.options &&
            !field.options.includes(value)
        ) {
            return `${field.label} must be one of: ${field.options.join(", ")}`;
        }
        return null;
    },

    /**
     * Validates that a date field falls within the specified date range.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    dateRange: (field, value) => {
        if (field.type === "date" && value) {
            const dateVal = new Date(value);
            if (
                (field as any).minDate &&
                dateVal < new Date((field as any).minDate)
            ) {
                return `${field.label} must be after ${(field as any).minDate}`;
            }
            if (
                (field as any).maxDate &&
                dateVal > new Date((field as any).maxDate)
            ) {
                return `${field.label} must be before ${
                    (field as any).maxDate
                }`;
            }
        }
        return null;
    },

    /**
     * Executes a custom validation function if provided in the field definition.
     * @param field - The field definition
     * @param value - The field value to validate
     * @returns Error message if validation fails, null otherwise
     */
    customValidator: (field, value) => {
        if (
            (field as any).customValidator &&
            typeof (field as any).customValidator === "function"
        ) {
            const customError = (field as any).customValidator(value);
            if (typeof customError === "string") {
                return customError;
            }
        }
        return null;
    },
};

/**
 * Validates a single field against all applicable validation rules.
 * @param field - The field definition containing validation rules
 * @param value - The current value of the field
 * @returns An array of error messages, empty if no errors
 */
const validateFieldDTO = (field: FieldDTO, value: any): string[] => {
    const errors: string[] = [];
    for (const rule of Object.values(validationRules)) {
        const error = rule(field, value);
        if (error) errors.push(error);
    }
    return errors;
};

/**
 * Validates all fields in a form DTO against their respective validation rules.
 * @param dto - The form DTO containing sections and fields
 * @param values - An object containing current values for all fields (keyed by field ID)
 * @returns An object mapping field IDs to arrays of error messages
 */
export const validateAll = (dto: FormDTO, values: Record<string, any>) => {
    const allErrors: Record<string, string[]> = {};
    dto.sections.forEach((section) => {
        section.fields.forEach((field) => {
            const errs = validateField(dto, values, field.id);
            if (errs.length > 0) allErrors[field.id] = errs;
        });
    });
    return allErrors;
};

/**
 * Validates a specific field in the form DTO.
 * Useful for real-time validation as the user interacts with individual fields.
 * @param dto - The form DTO containing sections and fields
 * @param values - An object containing current values for all fields (keyed by field ID)
 * @param fieldId - The ID of the specific field to validate
 * @returns An array of error messages for the field, empty if no errors or field not found
 */
export const validateField = (
    dto: FormDTO,
    values: Record<string, any>,
    fieldId: string
): string[] => {
    const field = dto.sections
        .flatMap((s) => s.fields)
        .find((f) => f.id === fieldId);
    if (!field) return [];

    const rules = field.validations || {};
    const value = values[fieldId];
    const errors: string[] = [];

    if (
        rules.required &&
        (value === null || value === undefined || value === "")
    ) {
        errors.push(
            typeof rules.required === "string"
                ? rules.required
                : `${field.label} is required`
        );
    }
    if (
        rules.min !== undefined &&
        typeof value === "number" &&
        value < rules.min
    ) {
        errors.push(`${field.label} must be at least ${rules.min}`);
    }
    if (
        rules.max !== undefined &&
        typeof value === "number" &&
        value > rules.max
    ) {
        errors.push(`${field.label} must be at most ${rules.max}`);
    }
    if (
        rules.minLength !== undefined &&
        typeof value === "string" &&
        value.length < rules.minLength
    ) {
        errors.push(
            `${field.label} must be at least ${rules.minLength} characters`
        );
    }
    if (
        rules.maxLength !== undefined &&
        typeof value === "string" &&
        value.length > rules.maxLength
    ) {
        errors.push(
            `${field.label} must be at most ${rules.maxLength} characters`
        );
    }
    if (
        rules.pattern &&
        typeof value === "string" &&
        !rules.pattern.test(value)
    ) {
        errors.push(`${field.label} is invalid`);
    }
    if (rules.validate) {
        const customError = rules.validate(value);
        if (customError) errors.push(customError);
    }

    return errors;
};
