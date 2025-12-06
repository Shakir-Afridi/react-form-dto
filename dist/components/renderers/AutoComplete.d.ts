import { default as React } from 'react';
import { FieldDTO } from '../../types';
type AutoCompleteFieldProps = {
    field: FieldDTO;
    value: any;
    onChange: (val: any) => void;
    error?: string | null;
};
export declare const AutoCompleteField: React.FC<AutoCompleteFieldProps>;
export {};
