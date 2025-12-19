// Layout definition reusable across form, section, and field
export type LayoutDTO = {
    cols?: number; // number of grid columns
    gap?: string; // spacing between items (e.g. "1rem")
    direction?: "row" | "column"; // flex direction fallback
    align?: "start" | "center" | "end" | "stretch"; // alignment
    justify?: "start" | "center" | "end" | "space-between"; // justification
};

// i18n: plain string or a locale map, e.g. "Name" or { en: "Name", fr: "Nom" }
export type I18nText = string | Record<string, string>;

// Optional helper for selections with stable values and translatable labels
export type I18nOption = {
    value: string;
    label: I18nText;
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
    label: I18nText;
    placeholder?: I18nText;
    // Backward compatible: string[] still works (string is I18nText).
    // For richer control, use { value, label } objects.
    options?: Array<I18nOption | I18nText>;
    rows?: number; // for textarea
    disabled?: boolean;
    defaultValue?: any;
    layout?: LayoutDTO;
    validations?: Validations;
};

// Section definition
export type SectionDTO = {
    id: string;
    heading?: I18nText;
    headingFontSize?: number; // rem
    description?: I18nText;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // section-level layout
    fields: FieldDTO[];
};

// Full form definition
export type FormDTO = {
    title?: I18nText;
    titleFontSize?: number; // rem
    description?: I18nText;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // global form-level layout
    sections: SectionDTO[];
};

export type Validations = {
    required?: boolean | I18nText; // string or i18n message
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => I18nText | null; // custom function; return message or null
};
