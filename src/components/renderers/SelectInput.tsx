import type { FieldRendererProps } from "@components/Field";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectInput({
    field,
    value,
    onChange,
}: FieldRendererProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
                labelId={`${field.id}-label`}
                value={value}
                id={field.id}
                onChange={(e) => onChange(e.target.value)}
                label={field.label}
            >
                {field.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
