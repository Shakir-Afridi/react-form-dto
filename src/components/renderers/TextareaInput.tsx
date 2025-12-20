// src/components/TextAreaInput.tsx
import React from "react";
import { TextField } from "@mui/material";
import type { FieldDTO } from "../../types";
import { resolveI18nString } from "../../utils/i18n";

type TextAreaInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
    locale?: string;
};

export const TextAreaInput: React.FC<TextAreaInputProps> = ({
    field,
    value,
    onChange,
    error,
    locale = "en",
}) => {
    return (
        <TextField
            fullWidth
            multiline
            rows={(field as any).rows || 4} // ✅ default to 4 rows, configurable via DTO
            label={resolveI18nString(field.label, locale)}
            placeholder={resolveI18nString(field.placeholder || "", locale)}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.validations?.required ? true : false}
            disabled={field.disabled}
            error={!!error}
            helperText={error}
        />
    );
};
