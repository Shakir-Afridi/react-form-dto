import type { FieldRendererProps } from "@components/Field";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/**
 * Select input renderer for dropdown/select field types.
 * Renders a Material-UI Select component with options from the field definition.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured Select component with MenuItems for each option
 *
 * @example
 * <SelectInput
 *   field={fieldDTO}
 *   value={selectedValue}
 *   onChange={handleChange}
 * />
 */
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
