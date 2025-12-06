export type LayoutDTO = {
    columns?: number;
    gap?: string;
    direction?: "row" | "column";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "space-between";
};
export type InputType = "text" | "email" | "password" | "textarea" | "number" | "select" | "checkbox" | "date" | "autocomplete" | "multi-autocomplete" | "radio";
export type FieldDTO = {
    id: string;
    type: InputType;
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    rows?: number;
    disabled?: boolean;
    defaultValue?: any;
    layout?: {
        col?: number;
        direction?: "row" | "column";
    };
    validations?: Validations;
};
export type SectionDTO = {
    id: string;
    heading?: string;
    headingFontSize?: number;
    description?: string;
    descriptionFontSize?: number;
    layout?: LayoutDTO;
    fields: FieldDTO[];
};
export type FormDTO = {
    title?: string;
    titleFontSize?: number;
    description?: string;
    descriptionFontSize?: number;
    layout?: LayoutDTO;
    sections: SectionDTO[];
};
export type Validations = {
    required?: boolean | string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => string | null;
};
