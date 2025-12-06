import type { FieldRendererProps } from "../../components/Field";
import { TextField } from "@mui/material";

/**
 * Text input renderer for text, number, and date field types.
 * Renders a Material-UI TextField with appropriate configuration based on field properties.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured TextField component
 *
 * @example
 * <TextInput
 *   field={fieldDTO}
 *   value={currentValue}
 *   onChange={handleChange}
 * />
 */
export function TextInput({
    field,
    value,
    onChange,
    error,
}: FieldRendererProps) {
    console.log("error", error);

    return (
        <TextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            value={value || ""}
            name={field.id}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            disabled={field.disabled}
            type={field.type}
            slotProps={{
                inputLabel: {
                    shrink: field.type === "date" ? true : undefined,
                },
            }}
            error={!!error}
            helperText={error}
        />
    );
}
