// src/components/RadioInput.tsx
import React from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
} from "@mui/material";
import type { FieldDTO } from "../../types";
import { resolveI18nString, resolveI18nOptionLabels } from "../../utils/i18n";

type RadioInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
    locale?: string;
};

export const RadioInput: React.FC<RadioInputProps> = ({
    field,
    value,
    onChange,
    error,
    locale = "en",
}) => {
    const options = resolveI18nOptionLabels(field.options || [], locale);
    return (
        <FormControl component="fieldset" fullWidth error={!!error}>
            <FormLabel component="legend">
                {resolveI18nString(field.label, locale)}
                {field.validations?.required ? " *" : ""}
            </FormLabel>
            <RadioGroup
                row={field.layout?.direction === "row" || false} // ✅ optional: horizontal or vertical layout
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            >
                {(options || []).map((option) => (
                    <FormControlLabel
                        key={option.label}
                        value={option}
                        control={<Radio />}
                        label={option.label}
                        disabled={field.disabled}
                    />
                ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};
