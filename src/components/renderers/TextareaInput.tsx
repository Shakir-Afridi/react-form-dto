// src/components/TextAreaInput.tsx
import React from "react";
import { TextField } from "@mui/material";
import type { FieldDTO } from "@types";

type TextAreaInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
    field,
    value,
    onChange,
    error,
}) => {
    return (
        <TextField
            fullWidth
            multiline
            rows={(field as any).rows || 4} // ✅ default to 4 rows, configurable via DTO
            label={field.label}
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.validations?.required ? true : false}
            disabled={field.disabled}
            error={!!error}
            helperText={error}
        />
    );
};
