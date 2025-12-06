import { FieldDTO, FormDTO } from '../types';
type ValidationFn = (field: FieldDTO, value: any) => string | null;
/**
 * A collection of validation functions for form fields.
 * Each function takes a field definition and value, returning an error message or null.
 */
export declare const validationRules: Record<string, ValidationFn>;
/**
 * Validates all fields in a form DTO against their respective validation rules.
 * @param dto - The form DTO containing sections and fields
 * @param values - An object containing current values for all fields (keyed by field ID)
 * @returns An object mapping field IDs to arrays of error messages
 */
export declare const validateAll: (dto: FormDTO, values: Record<string, any>) => Record<string, string[]>;
/**
 * Validates a specific field in the form DTO.
 * Useful for real-time validation as the user interacts with individual fields.
 * @param dto - The form DTO containing sections and fields
 * @param values - An object containing current values for all fields (keyed by field ID)
 * @param fieldId - The ID of the specific field to validate
 * @returns An array of error messages for the field, empty if no errors or field not found
 */
export declare const validateField: (dto: FormDTO, values: Record<string, any>, fieldId: string) => string[];
export {};
