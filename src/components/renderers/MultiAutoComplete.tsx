// src/components/AutoCompleteField.tsx
import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import type { FieldDTO } from "../../types";
import { resolveI18nOptionLabels, resolveI18nString } from "../../utils/i18n";

type MultiAutoCompleteFieldProps = {
    field: FieldDTO;
    value: any[];
    onChange: (val: any) => void;
    error?: string | null;
    locale?: string;
};

export const MultiAutoCompleteField: React.FC<MultiAutoCompleteFieldProps> = ({
    field,
    value,
    onChange,
    error,
    locale,
}) => {
    const options = resolveI18nOptionLabels(field.options || [], locale);
    return (
        <Autocomplete
            multiple // ✅ enables multi‑select
            fullWidth
            options={options || []}
            value={value || []}
            onChange={(_, newValue) => onChange(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={field.id}
                    label={resolveI18nString(field.label, locale)}
                    placeholder={resolveI18nString(
                        field.placeholder || "",
                        locale
                    )}
                    disabled={field.disabled}
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};
