import type { FieldRendererProps } from "@components/Field";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CheckBoxInput({
    field,
    value,
    onChange,
}: FieldRendererProps) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={field.disabled}
                />
            }
            label={field.label}
        />
    );
}
