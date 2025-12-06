import type { FieldRendererProps } from "../../components/Field";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

/**
 * Checkbox input renderer for boolean/checkbox field types.
 * Renders a Material-UI Checkbox wrapped in a FormControlLabel.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured Checkbox component with label
 *
 * @example
 * <CheckBoxInput
 *   field={fieldDTO}
 *   value={isChecked}
 *   onChange={handleChange}
 * />
 */
export function CheckBoxInput({
    field,
    value,
    onChange,
    error,
}: FieldRendererProps) {
    return (
        <>
            <FormControlLabel
                name={field.id}
                control={
                    <Checkbox
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={field.disabled}
                    />
                }
                label={field.label}
            />
            {error && <FormHelperText>{error}</FormHelperText>}
        </>
    );
}
