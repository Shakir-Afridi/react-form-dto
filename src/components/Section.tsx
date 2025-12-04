import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import type { SectionDTO } from "@types";
import { Field } from "./Field";
import { mapSpanToSize } from "@utils/layout";

type SectionProps = {
    section: SectionDTO;
    values: Record<string, any>;
    onChange: (id: string, val: any) => void;
    renderers?: Record<string, React.ComponentType<any>>;
};

export const Section: React.FC<SectionProps> = ({
    section,
    values,
    onChange,
    renderers,
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
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
