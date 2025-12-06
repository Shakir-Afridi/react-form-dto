// Layout definition reusable across form, section, and field
export type LayoutDTO = {
    columns?: number; // number of grid columns
    gap?: string; // spacing between items (e.g. "1rem")
    direction?: "row" | "column"; // flex direction fallback
    align?: "start" | "center" | "end" | "stretch"; // alignment
    justify?: "start" | "center" | "end" | "space-between"; // justification
};

export type InputType =
    | "text"
    | "email"
    | "password"
    | "textarea"
    | "number"
    | "select"
    | "checkbox"
    | "date"
    | "autocomplete"
    | "multi-autocomplete"
    | "radio";

// Individual field definition
export type FieldDTO = {
    id: string;
    type: InputType;
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    rows?: number; // for textarea
    disabled?: boolean;
    defaultValue?: any;
    layout?: {
        col?: number; // starting column
        direction?: "row" | "column"; // flex direction
    };
    validations?: Validations;
};

// Section definition
export type SectionDTO = {
    id: string;
    heading?: string;
    headingFontSize?: number; // rem
    description?: string;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // section-level layout
    fields: FieldDTO[];
};

// Full form definition
export type FormDTO = {
    title?: string;
    titleFontSize?: number; // rem
    description?: string;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // global form-level layout
    sections: SectionDTO[];
};

export type Validations = {
    required?: boolean | string; // string = custom message
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => string | null; // custom function
};
