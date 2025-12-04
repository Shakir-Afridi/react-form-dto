// Layout definition reusable across form, section, and field
export type LayoutDTO = {
    columns?: number; // number of grid columns
    gap?: string; // spacing between items (e.g. "1rem")
    direction?: "row" | "column"; // flex direction fallback
    align?: "start" | "center" | "end" | "stretch"; // alignment
    justify?: "start" | "center" | "end" | "space-between"; // justification
};

// Individual field definition
export type FieldDTO = {
    id: string;
    type: string; // "text" | "number" | "select" | "checkbox" | "date" | "custom"
    label: string;
    placeholder?: string;
    options?: string[];
    required?: boolean;
    disabled?: boolean;
    defaultValue?: any;
    layout?: {
        col?: number; // starting column
    };
    conditional?: {
        dependsOn: string;
        value: any;
    };
};

// Section definition
export type SectionDTO = {
    id: string;
    heading: string;
    headingFontSize?: number; // rem
    description?: string;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // section-level layout
    fields: FieldDTO[];
    conditional?: {
        dependsOn: string;
        value: any;
    };
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
