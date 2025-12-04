import React from "react";
import type { FieldDTO } from "@types";
import SelectInput from "./renderers/SelectInput";
import TextInput from "./renderers/TextInput";
import CheckBoxInput from "./renderers/CheckBoxInput";

export type FieldRendererProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
};

type FieldProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    renderers?: Record<string, React.ComponentType<FieldRendererProps>>;
};

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

export const Field: React.FC<FieldProps> = ({
    field,
    value,
    onChange,
    renderers = {},
}) => {
    const Renderer = renderers[field.type] || DefaultRenderer;
    return <Renderer field={field} value={value} onChange={onChange} />;
};
