import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import type { SectionDTO } from "@types";
import { Field } from "./Field";
import { mapSpanToSize } from "@utils/layout";

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
export const Section: React.FC<SectionProps> = ({
    section,
    values,
    onChange,
    renderers,
    validateField,
}) => {
    return (
        <Box mb={1}>
            {section.heading && (
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: section.headingFontSize
                            ? `${section.headingFontSize}rem`
                            : "1.25rem",
                    }}
                    gutterBottom
                    color="black"
                >
                    {section.heading}
                </Typography>
            )}

            {section.description && (
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: section.descriptionFontSize
                            ? `${section.descriptionFontSize}rem`
                            : "inherit",
                    }}
                    color="textSecondary"
                    gutterBottom
                >
                    {section.description}
                </Typography>
            )}
            <Grid container spacing={2}>
                {section.fields.map((field) => (
                    <Grid
                        key={field.id}
                        size={mapSpanToSize(field.layout?.col)}
                    >
                        <Field
                            field={field}
                            value={values[field.id]}
                            onChange={(val) => onChange(field.id, val)}
                            renderers={renderers}
                            error={validateField(field.id)?.join(",")}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
