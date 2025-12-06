import { default as React } from 'react';
import { FieldDTO } from '../../types';
type MultiAutoCompleteFieldProps = {
    field: FieldDTO;
    value: any[];
    onChange: (val: any) => void;
    error?: string | null;
};
export declare const MultiAutoCompleteField: React.FC<MultiAutoCompleteFieldProps>;
export {};
