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

type RadioInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};

export const RadioInput: React.FC<RadioInputProps> = ({
    field,
    value,
    onChange,
    error,
}) => {
    return (
        <FormControl component="fieldset" fullWidth error={!!error}>
            <FormLabel component="legend">
                {field.label}
                {field.validations?.required ? " *" : ""}
            </FormLabel>
            <RadioGroup
                row={field.layout?.direction === "row" || false} // ✅ optional: horizontal or vertical layout
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            >
                {(field.options || []).map((option) => (
                    <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                        disabled={field.disabled}
                    />
                ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
};
