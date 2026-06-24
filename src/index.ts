// ─── Components ──────────────────────────────────────────────────────────────
export {
    FormBuilder,
    Section,
    Field,
    TextAreaInput,
    AutoCompleteField,
    MultiAutoCompleteField,
    RadioInput,
    SelectInput,
    TextInput,
    CheckBoxInput,
} from "./components";

export type { FormBuilderHandle } from "./components/FormBuilder";

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useFormBuilder, useFormBuilderController, useFormDTO } from "./hooks";

// react-hook-form–style API
export { useForm } from "./form/useForm";
export { useFieldArray } from "./form/useFieldArray";
export { useWatch } from "./form/useWatch";

// ─── Context / Provider ───────────────────────────────────────────────────────
export { FormProvider } from "./form/FormProvider";
export {
    useFormContext,
    useOptionalFormContext,
} from "./form/FormContext";

export type { FormContextType, FieldError, FieldArrayHelpers } from "./form/FormContext";

// ─── Validation utilities ─────────────────────────────────────────────────────
export { validateAll, validateField, validationRules } from "./utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export type {
    FieldDTO,
    SectionDTO,
    FormDTO,
    InputType,
    Validations,
    Condition as VisibleWhenCondition,
    FieldCondition as VisibleWhenFieldCondition,
    ConditionGroup as VisibleWhenConditionGroup,
} from "./types";
