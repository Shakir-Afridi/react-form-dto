import type { FieldRendererProps } from "@components/Field";
import { TextField } from "@mui/material";

export default function TextInput({
    field,
    value,
    onChange,
}: FieldRendererProps) {
    return (
        <TextField
            fullWidth
            label={field.label}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            disabled={field.disabled}
            type={field.type}
            slotProps={{
                inputLabel: {
                    shrink: field.type === "date" ? true : undefined,
                },
            }}
        />
    );
}
