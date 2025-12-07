import React, { useRef } from "react";
import { FormBuilder, FormBuilderHandle } from "../components/FormBuilder";
import type { FieldDTO, FormDTO } from "../types";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Box,
    IconButton,
    Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default {
    title: "Components/FormBuilder",
    component: FormBuilder,
    argTypes: {
        dto: {
            control: "object",
            description: "Form DTO definition",
        },
    },
};

const defaultDTO: FormDTO = {
    title: "User Registration",
    titleFontSize: 2,
    description: "Fill out the form to register.",
    descriptionFontSize: 1,
    sections: [
        {
            id: "personal",
            heading: "Personal Info",
            fields: [
                {
                    id: "firstName",
                    label: "First Name",
                    type: "text",
                    layout: {
                        cols: 6,
                    },
                },
                {
                    id: "lastName",
                    label: "Last Name",
                    type: "text",
                    layout: {
                        cols: 6,
                    },
                },
                {
                    id: "email",
                    label: "Email",
                    type: "email",
                },
            ],
        },
        {
            id: "account",
            heading: "Account Details",
            fields: [
                {
                    id: "username",
                    label: "Username",
                    type: "text",
                },
                {
                    id: "password",
                    label: "Password",
                    type: "password",
                },
            ],
        },
    ],
};

const fieldTypes = [
    "text",
    "email",
    "password",
    "number",
    "date",
    "checkbox",
    "select",
    "radio",
    "textarea",
    "autocomplete",
    "multi-autocomplete",
];

const validationsOptions = [
    "required",
    "min",
    "max",
    "minLength",
    "maxLength",
    "pattern",
];

// Helper to check if a field type supports options
const fieldTypeHasOptions = (type: string) =>
    ["select", "autocomplete", "multi-autocomplete", "radio"].includes(type);

const FormBuilderPlayground = ({ initialDTO }: { initialDTO: FormDTO }) => {
    const [dto, setDTO] = React.useState<FormDTO>(initialDTO);
    const formRef = useRef<FormBuilderHandle>(null);

    // Add section
    const addSection = () => {
        setDTO((prev) => ({
            ...prev,
            sections: [
                ...prev.sections,
                {
                    id: `section${prev.sections.length + 1}`,
                    heading: "New Section",
                    fields: [],
                },
            ],
        }));
    };

    // Remove section
    const removeSection = (idx: number) => {
        setDTO((prev) => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== idx),
        }));
    };

    // Add field to section (with default layout/options)
    const addField = (sectionIdx: number) => {
        setDTO((prev) => {
            const sections = [...prev.sections];
            sections[sectionIdx].fields.push({
                id: `field${sections[sectionIdx].fields.length + 1}`,
                label: "New Field",
                type: "text",
                layout: { cols: 12 },
                options: [],
            });
            return { ...prev, sections };
        });
    };

    // Remove field from section
    const removeField = (sectionIdx: number, fieldIdx: number) => {
        setDTO((prev) => {
            const sections = [...prev.sections];
            sections[sectionIdx].fields = sections[sectionIdx].fields.filter(
                (_, i) => i !== fieldIdx
            );
            return { ...prev, sections };
        });
    };

    // Edit field property (handle nested layout/options)
    const editField = (
        sectionIdx: number,
        fieldIdx: number,
        key: keyof FieldDTO | "cols",
        value: any
    ) => {
        setDTO((prev) => {
            const sections = [...prev.sections];
            const field = { ...sections[sectionIdx].fields[fieldIdx] };
            if (key === "cols") {
                field.layout = { ...(field.layout || {}), cols: value };
            } else if (key === "options") {
                // Always store as array
                field.options = value
                    .split(",")
                    .map((opt: string) => opt.trim())
                    .filter(Boolean);
                field.defaultValue = value;
            } else if (key === "validations") {
            } else {
                field[key] = value;
            }
            sections[sectionIdx].fields[fieldIdx] = field;
            return { ...prev, sections };
        });
    };

    // Edit section heading
    const editSectionHeading = (sectionIdx: number, value: string) => {
        setDTO((prev) => {
            const sections = [...prev.sections];
            sections[sectionIdx].heading = value;
            return { ...prev, sections };
        });
    };

    // Edit form title/description
    const editFormMeta = (key: string, value: any) => {
        setDTO((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        const errors = formRef.current?.validateAll();
        if (errors && Object.keys(errors).length === 0) {
            const values = formRef.current?.getValues();
            alert("Form submitted!\n" + JSON.stringify(values, null, 2));
        } else {
            alert("Validation errors:\n" + JSON.stringify(errors, null, 2));
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
                <Box mb={2}>
                    <TextField
                        label="Form Title"
                        value={dto.title}
                        onChange={(e) => editFormMeta("title", e.target.value)}
                        size="small"
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Description"
                        value={dto.description}
                        onChange={(e) =>
                            editFormMeta("description", e.target.value)
                        }
                        size="small"
                    />
                </Box>
                {dto.sections.map((section, sectionIdx) => (
                    <Box
                        key={section.id}
                        mb={2}
                        p={2}
                        border={1}
                        borderRadius={2}
                    >
                        <Box display="flex" alignItems="center" mb={1}>
                            <TextField
                                label="Section Heading"
                                value={section.heading}
                                onChange={(e) =>
                                    editSectionHeading(
                                        sectionIdx,
                                        e.target.value
                                    )
                                }
                                size="small"
                                sx={{ mr: 2 }}
                            />
                            <IconButton
                                onClick={() => removeSection(sectionIdx)}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Button
                                startIcon={<AddIcon />}
                                onClick={() => addField(sectionIdx)}
                                sx={{ ml: 2 }}
                                size="small"
                            >
                                Add Field
                            </Button>
                        </Box>
                        {section.fields.map((field, fieldIdx) => (
                            <Box
                                key={field.id}
                                display="flex"
                                alignItems="center"
                                mb={1}
                                flexWrap="wrap"
                                gap={1}
                            >
                                <TextField
                                    label="Label"
                                    value={field.label}
                                    onChange={(e) =>
                                        editField(
                                            sectionIdx,
                                            fieldIdx,
                                            "label",
                                            e.target.value
                                        )
                                    }
                                    size="small"
                                    sx={{ width: 120 }}
                                />
                                <TextField
                                    label="ID"
                                    value={field.id}
                                    onChange={(e) =>
                                        editField(
                                            sectionIdx,
                                            fieldIdx,
                                            "id",
                                            e.target.value
                                        )
                                    }
                                    size="small"
                                    sx={{ width: 100 }}
                                />
                                <Select
                                    label="Type"
                                    value={field.type}
                                    onChange={(e) =>
                                        editField(
                                            sectionIdx,
                                            fieldIdx,
                                            "type",
                                            e.target.value
                                        )
                                    }
                                    size="small"
                                    sx={{ minWidth: 120 }}
                                >
                                    {fieldTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    label="Cols"
                                    type="number"
                                    value={field.layout?.cols ?? 12}
                                    onChange={(e) =>
                                        editField(
                                            sectionIdx,
                                            fieldIdx,
                                            "cols",
                                            Number(e.target.value)
                                        )
                                    }
                                    size="small"
                                    sx={{ width: 60 }}
                                    inputProps={{ min: 1, max: 12 }}
                                />
                                {/* <Select
                                    label="Validations"
                                    value={field.type}
                                    onChange={(e) =>
                                        editField(
                                            sectionIdx,
                                            fieldIdx,
                                            "validations",
                                            e.target.value
                                        )
                                    }
                                    size="small"
                                >
                                    {validationsOptions.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select> */}
                                {fieldTypeHasOptions(field.type) && (
                                    <TextField
                                        label="Options (comma separated)"
                                        variant="outlined"
                                        fullWidth
                                        value={field.defaultValue}
                                        onChange={(e) =>
                                            editField(
                                                sectionIdx,
                                                fieldIdx,
                                                "options",
                                                e.target.value
                                            )
                                        }
                                        size="small"
                                        sx={{ maxWidth: 180 }}
                                    />
                                )}
                                <IconButton
                                    onClick={() =>
                                        removeField(sectionIdx, fieldIdx)
                                    }
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                ))}
                <Button
                    startIcon={<AddIcon />}
                    onClick={addSection}
                    sx={{ mb: 2 }}
                >
                    Add Section
                </Button>
            </Grid>
            <Grid size={{ xs: 6 }}>
                <FormBuilder ref={formRef} dto={dto} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export const Playground = () => (
    <FormBuilderPlayground initialDTO={defaultDTO} />
);

export const EditableDTO = (args: { dto: FormDTO }) => {
    const formRef = useRef<FormBuilderHandle>(null);

    const handleSubmit = () => {
        const errors = formRef.current?.validateAll();
        if (errors && Object.keys(errors).length === 0) {
            const values = formRef.current?.getValues();
            alert("Form submitted!\n" + JSON.stringify(values, null, 2));
        } else {
            alert("Validation errors:\n" + JSON.stringify(errors, null, 2));
        }
    };

    return (
        <div>
            <FormBuilder ref={formRef} dto={args.dto} />
            <button style={{ marginTop: 16 }} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

EditableDTO.args = {
    dto: defaultDTO,
};
