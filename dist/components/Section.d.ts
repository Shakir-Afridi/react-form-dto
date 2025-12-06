import { default as React } from 'react';
import { SectionDTO } from '../types';
/**
 * Props for the Section component.
 */
type SectionProps = {
    /** The section definition containing heading, description, and fields */
    section: SectionDTO;
    /** Current form values keyed by field ID */
    values: Record<string, any>;
    /** Callback function to handle field value changes */
    onChange: (id: string, val: any) => void;
    /** Optional custom renderers for specific field types */
    renderers?: Record<string, React.ComponentType<any>>;
    validateField: (id: string) => string[];
};
/**
 * Section component that renders a form section with its heading, description, and fields.
 * Automatically arranges fields in a responsive grid layout based on their column span configuration.
 *
 * @example
 * <Section
 *   section={sectionDTO}
 *   values={formValues}
 *   onChange={handleFieldChange}
 *   renderers={customRenderers}
 * />
 */
export declare const Section: React.FC<SectionProps>;
export {};
