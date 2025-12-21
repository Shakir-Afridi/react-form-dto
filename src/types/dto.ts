// Layout definition reusable across form, section, and field
export type LayoutDTO = {
    cols?: number; // number of grid columns
    gap?: string; // spacing between items (e.g. "1rem")
    direction?: "row" | "column"; // flex direction fallback
    align?: "start" | "center" | "end" | "stretch"; // alignment
    justify?: "start" | "center" | "end" | "space-between"; // justification
};

// i18n: plain string or a locale map, e.g. "Name" or { en: "Name", fr: "Nom" }
export type I18nString = string | Record<string, string>;

// Optional helper for selections with stable values and translatable labels
export type I18nOption = {
    value: string;
    label: I18nString;
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
    label: I18nString;
    placeholder?: I18nString;
    // Backward compatible: string[] still works (string is I18nString).
    // For richer control, use { value, label } objects.
    options?: I18nOption[] | I18nString[];
    rows?: number; // for textarea
    disabled?: boolean;
    defaultValue?: any;
    layout?: LayoutDTO;
    validations?: Validations;
    visibleWhen?: Condition;
};

// Section definition
export type SectionDTO = {
    id: string;
    heading?: I18nString;
    headingFontSize?: number; // rem
    description?: I18nString;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // section-level layout
    fields: FieldDTO[];
};

// Full form definition
export type FormDTO = {
    title?: I18nString;
    titleFontSize?: number; // rem
    description?: I18nString;
    descriptionFontSize?: number; // rem
    layout?: LayoutDTO; // global form-level layout
    sections: SectionDTO[];
};

export type Validations = {
    required?: boolean | I18nString; // string or i18n message
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => I18nString | null; // custom function; return message or null
};

export interface FieldCondition {
    field: string;
    equals?: any;
    notEquals?: any;
    in?: any[];
    notIn?: any[];
    greaterThan?: number;
    lessThan?: number;
}

// A group of conditions with logical operator
export interface ConditionGroup {
    operator: "AND" | "OR";
    conditions: Condition[];
}

// Union type: a condition can be either a leaf or a group
export type Condition = FieldCondition | ConditionGroup;
