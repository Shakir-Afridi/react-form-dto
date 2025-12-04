import React, { useState } from "react";
import type { FormDTO } from "@types";
import { Section } from "./Section";
import { Typography } from "@mui/material";

type FormBuilderProps = {
    dto: FormDTO;
    renderers?: Record<string, React.ComponentType<any>>;
};

export const FormBuilder: React.FC<FormBuilderProps> = ({ dto, renderers }) => {
    const [values, setValues] = useState<Record<string, any>>({});

    const handleChange = (id: string, val: any) => {
        setValues((prev) => ({ ...prev, [id]: val }));
    };

    return (
        <>
            {dto.title && (
                <Typography
                    variant="h5"
                    color="black"
                    sx={{
                        fontSize: dto.titleFontSize
                            ? `${dto.titleFontSize}rem`
                            : "1.5rem",
                        fontWeight: "bold",
                    }}
                    gutterBottom
                >
                    {dto.title}
                </Typography>
            )}
            {dto.description && (
                <Typography
                    component="p"
                    sx={{
                        fontSize: dto.descriptionFontSize
                            ? `${dto.descriptionFontSize}rem`
                            : "inherit",
                    }}
                    color="textSecondary"
                    gutterBottom
                >
                    {dto.description}
                </Typography>
            )}
            {dto.sections.map((section) => (
                <Section
                    key={section.id}
                    section={section}
                    values={values}
                    onChange={handleChange}
                    renderers={renderers}
                />
            ))}
        </>
    );
};
