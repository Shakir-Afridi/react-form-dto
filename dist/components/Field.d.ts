import { default as React } from 'react';
import { FieldDTO } from '../types';
/**
 * Props passed to field renderer components.
 */
export interface FieldRendererProps {
    /** The field definition containing type, label, validation rules, etc. */
    field: FieldDTO;
    /** The current value of the field */
    value: any;
    /** Callback function to update the field value */
    onChange: (val: any) => void;
    error?: string | null;
}
/**
 * Props for the Field component.
 */
interface FieldProps extends FieldRendererProps {
    renderers?: Record<string, React.ComponentType<FieldRendererProps>>;
}
/**
 * Field component that renders the appropriate input component based on field type.
 * Supports both default renderers and custom renderers provided via props.
 *
 * @example
 * <Field
 *   field={fieldDTO}
 *   value={currentValue}
 *   onChange={handleChange}
 *   renderers={{ customType: CustomRenderer }}
 * />
 */
export declare const Field: React.FC<FieldProps>;
export {};
