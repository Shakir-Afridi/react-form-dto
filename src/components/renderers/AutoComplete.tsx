// src/components/AutoCompleteField.tsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import type { FieldDTO } from "@types";

type AutoCompleteFieldProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};

export const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
    field,
    value,
    onChange,
    error,
}) => {
    return (
        <Autocomplete
            fullWidth
            options={field.options || []}
            value={value || null}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    disabled={field.disabled}
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};
