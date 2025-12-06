import React from "react";
import type { FieldDTO } from "@types";
import SelectInput from "./renderers/SelectInput";
import TextInput from "./renderers/TextInput";
import CheckBoxInput from "./renderers/CheckBoxInput";
import { AutoCompleteField } from "./renderers/AutoComplete";
import { MultiAutoCompleteField } from "./renderers/MultiAutoComplete";

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
    error,
}) => {
    switch (field.type) {
        case "text":
        case "date":
        case "email":
        case "password":
        case "number":
            return (
                <TextInput
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        case "select":
            return (
                <SelectInput
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        case "autocomplete":
            return (
                <AutoCompleteField
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        case "multi-autocomplete":
            return (
                <MultiAutoCompleteField
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        case "checkbox":
            return (
                <CheckBoxInput
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
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
    error,
    renderers = {},
}) => {
    const Renderer = renderers[field.type] || DefaultRenderer;
    return (
        <Renderer
            field={field}
            value={value}
            onChange={onChange}
            error={error}
        />
    );
};
