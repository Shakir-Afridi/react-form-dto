import React from "react";
import type { FieldDTO } from "@types";
import SelectInput from "./renderers/SelectInput";
import TextInput from "./renderers/TextInput";
import CheckBoxInput from "./renderers/CheckBoxInput";

/**
 * Props passed to field renderer components.
 */
export type FieldRendererProps = {
    /** The field definition containing type, label, validation rules, etc. */
    field: FieldDTO;
    /** The current value of the field */
    value: any;
    /** Callback function to update the field value */
    onChange: (val: any) => void;
};

/**
 * Props for the Field component.
 */
type FieldProps = {
    /** The field definition containing type, label, validation rules, etc. */
    field: FieldDTO;
    /** The current value of the field */
    value: any;
    /** Callback function to update the field value */
    onChange: (val: any) => void;
    /** Optional custom renderers for specific field types */
    renderers?: Record<string, React.ComponentType<FieldRendererProps>>;
};

/**
 * Default field renderer that handles common field types (text, number, date, select, checkbox).
 * Falls back to an unsupported field type message if no renderer is found.
 *
 * @param props - Field renderer props
 * @returns The appropriate input component for the field type
 */
const DefaultRenderer: React.FC<FieldRendererProps> = ({
    field,
    value,
    onChange,
}) => {
    switch (field.type) {
        case "text":
        case "date":
        case "number":
            return (
                <TextInput field={field} value={value} onChange={onChange} />
            );
        case "select":
            return (
                <SelectInput field={field} value={value} onChange={onChange} />
            );
        case "checkbox":
            return (
                <CheckBoxInput
                    field={field}
                    value={value}
                    onChange={onChange}
                />
            );
        default:
            return <span>Unsupported field type: {field.type}</span>;
    }
};

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
export const Field: React.FC<FieldProps> = ({
    field,
    value,
    onChange,
    renderers = {},
}) => {
    const Renderer = renderers[field.type] || DefaultRenderer;
    return <Renderer field={field} value={value} onChange={onChange} />;
};
