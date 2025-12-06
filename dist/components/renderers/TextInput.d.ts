import { FieldRendererProps } from '../../components/Field';
/**
 * Text input renderer for text, number, and date field types.
 * Renders a Material-UI TextField with appropriate configuration based on field properties.
 *
 * @param props - Field renderer props containing field definition, value, and onChange handler
 * @returns A configured TextField component
 *
 * @example
 * <TextInput
 *   field={fieldDTO}
 *   value={currentValue}
 *   onChange={handleChange}
 * />
 */
export declare function TextInput({ field, value, onChange, error, }: FieldRendererProps): import("react/jsx-runtime").JSX.Element;
