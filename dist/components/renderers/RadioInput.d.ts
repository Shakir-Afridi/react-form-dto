import { default as React } from 'react';
import { FieldDTO } from '../../types';
type RadioInputProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};
export declare const RadioInput: React.FC<RadioInputProps>;
export {};
