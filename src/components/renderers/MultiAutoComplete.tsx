// src/components/AutoCompleteField.tsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import type { FieldDTO } from "../../types";

type MultiAutoCompleteFieldProps = {
    field: FieldDTO;
    value: any[];
    onChange: (val: any) => void;
    error?: string | null;
};

export const MultiAutoCompleteField: React.FC<MultiAutoCompleteFieldProps> = ({
    field,
    value,
    onChange,
    error,
}) => {
    return (
        <Autocomplete
            multiple // ✅ enables multi‑select
            fullWidth
            options={field.options || []}
            value={value || []}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={field.id}
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
