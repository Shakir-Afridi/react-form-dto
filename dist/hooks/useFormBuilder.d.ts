import { FormDTO } from '../types';
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
export declare function useFormBuilder(dto: FormDTO): {
    /** Current form values for all fields */
    values: Record<string, any>;
    /** Function to update a field value */
    handleChange: (id: string, val: any) => void;
    /** Function to validate all fields */
    validateAll: () => Record<string, string[]>;
    /** Function to get all current form values */
    getValues: () => Record<string, any>;
    /** Function to get all current form errors */
    getErrors: () => Errors;
    /** Function to validate a specific field */
    validateField: (id: string) => string[];
};
export {};
