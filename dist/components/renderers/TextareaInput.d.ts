import { default as React } from 'react';
import { FieldDTO } from '../../types';
type TextAreaInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};
export declare const TextAreaInput: React.FC<TextAreaInputProps>;
export {};
