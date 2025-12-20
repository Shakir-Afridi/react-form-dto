import type { FieldRendererProps } from "../../components/Field";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { resolveI18nString, resolveI18nOptionLabels } from "../../utils/i18n";

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
export function SelectInput({
    field,
    value,
    onChange,
    error,
    locale = "en",
}: FieldRendererProps) {
    const options = resolveI18nOptionLabels(field.options || [], locale);

    return (
        <FormControl fullWidth>
            <InputLabel id={`${field.id}-label`}>
                {resolveI18nString(field.label, locale)}
            </InputLabel>
            <Select
                labelId={`${field.id}-label`}
                value={value}
                id={field.id}
                name={field.id}
                onChange={(e) => onChange(e.target.value)}
                label={resolveI18nString(field.label, locale)}
                error={!!error}
            >
                {options?.map((opt) => (
                    <MenuItem key={opt.label} value={opt.value}>
                        {opt.label}
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
