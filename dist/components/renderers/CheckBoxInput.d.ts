import { FieldRendererProps } from '../../components/Field';
/**
 * Checkbox input renderer for boolean/checkbox field types.
 * Renders a Material-UI Checkbox wrapped in a FormControlLabel.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured Checkbox component with label
 *
 * @example
 * <CheckBoxInput
 *   field={fieldDTO}
 *   value={isChecked}
 *   onChange={handleChange}
 * />
 */
export declare function CheckBoxInput({ field, value, onChange, error, }: FieldRendererProps): import("react/jsx-runtime").JSX.Element;
