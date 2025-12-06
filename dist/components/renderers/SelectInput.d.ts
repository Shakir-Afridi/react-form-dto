import { FieldRendererProps } from '../../components/Field';
/**
 * Select input renderer for dropdown/select field types.
 * Renders a Material-UI Select component with options from the field definition.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured Select component with MenuItems for each option
 *
 * @example
 * <SelectInput
 *   field={fieldDTO}
 *   value={selectedValue}
 *   onChange={handleChange}
 * />
 */
export declare function SelectInput({ field, value, onChange, error, }: FieldRendererProps): import("react/jsx-runtime").JSX.Element;
