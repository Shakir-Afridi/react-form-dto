import type { FieldRendererProps } from "@components/Field";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";

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
    error,
}: FieldRendererProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
            <Select
                labelId={`${field.id}-label`}
                value={value}
                id={field.id}
                name={field.id}
                onChange={(e) => onChange(e.target.value)}
                label={field.label}
                error={!!error}
            >
                {field.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
            {error && (
                <Typography variant="caption" color="error">
                    {error}
                </Typography>
            )}
        </FormControl>
    );
}
