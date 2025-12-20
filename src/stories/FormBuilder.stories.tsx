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
    FormControl,
    InputLabel,
    Divider,
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
    title: { en: "User Profile", fr: "Profil utilisateur", ur: "صارف پروفائل" },
    description: {
        en: "Fill out your personal information",
        fr: "Renseignez vos informations personnelles",
        ur: "اپنی ذاتی معلومات درج کریں",
    },
    layout: { cols: 12, gap: "1rem" },
    sections: [
        {
            id: "personal",
            heading: {
                en: "Personal Information",
                fr: "Informations personnelles",
                ur: "ذاتی معلومات",
            },
            description: {
                en: "Basic details about you",
                fr: "Vos informations de base",
                ur: "آپ کے بنیادی تفصیلات",
            },
            layout: { cols: 12, gap: "1rem" },
            fields: [
                {
                    id: "title",
                    type: "select",
                    label: { en: "Title", fr: "Civilité", ur: "خطاب" },
                    placeholder: {
                        en: "Select your title",
                        fr: "Sélectionnez votre civilité",
                        ur: "اپنا خطاب منتخب کریں",
                    },
                    options: [
                        {
                            value: "mr",
                            label: { en: "Mr", fr: "M.", ur: "مسٹر" },
                        },
                        {
                            value: "ms",
                            label: { en: "Ms", fr: "Mme", ur: "مس" },
                        },
                        {
                            value: "dr",
                            label: { en: "Dr", fr: "Dr", ur: "ڈاکٹر" },
                        },
                        {
                            value: "prof",
                            label: { en: "Prof", fr: "Prof", ur: "پروفیسر" },
                        },
                    ],
                    layout: { cols: 4 },
                },
                {
                    id: "firstName",
                    type: "text",
                    label: { en: "First Name", fr: "Prénom", ur: "پہلا نام" },
                    placeholder: {
                        en: "Enter first name",
                        fr: "Saisissez le prénom",
                        ur: "پہلا نام درج کریں",
                    },
                    layout: { cols: 4 },
                },
                {
                    id: "lastName",
                    type: "text",
                    label: { en: "Last Name", fr: "Nom", ur: "آخری نام" },
                    placeholder: {
                        en: "Enter last name",
                        fr: "Saisissez le nom",
                        ur: "آخری نام درج کریں",
                    },
                    layout: { cols: 4 },
                },
                {
                    id: "age",
                    type: "number",
                    label: { en: "Age", fr: "Âge", ur: "عمر" },
                    layout: { cols: 6 },
                },
                {
                    id: "dob",
                    type: "date",
                    label: {
                        en: "Date of Birth",
                        fr: "Date de naissance",
                        ur: "تاریخ پیدائش",
                    },
                    layout: { cols: 6 },
                },
                {
                    id: "gender",
                    type: "radio",
                    label: { en: "Gender", fr: "Genre", ur: "جنس" },
                    options: [
                        {
                            value: "male",
                            label: { en: "Male", fr: "Homme", ur: "مرد" },
                        },
                        {
                            value: "female",
                            label: { en: "Female", fr: "Femme", ur: "عورت" },
                        },
                        {
                            value: "other",
                            label: { en: "Other", fr: "Autre", ur: "دیگر" },
                        },
                    ],
                    validations: {
                        required: {
                            en: "Please select your gender",
                            fr: "Veuillez sélectionner votre genre",
                            ur: "براہ کرم اپنا جنس منتخب کریں",
                        },
                    },
                    layout: { direction: "row" },
                },
                {
                    id: "skills",
                    type: "multi-autocomplete",
                    label: { en: "Skills", fr: "Compétences", ur: "مہارتیں" },
                    placeholder: {
                        en: "Select your skills",
                        fr: "Sélectionnez vos compétences",
                        ur: "اپنی مہارتیں منتخب کریں",
                    },
                    options: [
                        {
                            value: "react",
                            label: { en: "React", fr: "React", ur: "ری ایکٹ" },
                        },
                        {
                            value: "typescript",
                            label: {
                                en: "TypeScript",
                                fr: "TypeScript",
                                ur: "ٹائپ اسکرپٹ",
                            },
                        },
                        {
                            value: "node",
                            label: {
                                en: "Node.js",
                                fr: "Node.js",
                                ur: "نوڈ جے ایس",
                            },
                        },
                        {
                            value: "graphql",
                            label: {
                                en: "GraphQL",
                                fr: "GraphQL",
                                ur: "گراف کیو ایل",
                            },
                        },
                        {
                            value: "docker",
                            label: { en: "Docker", fr: "Docker", ur: "ڈوکر" },
                        },
                    ],
                    layout: { cols: 12 },
                    validations: {
                        required: {
                            en: "Select at least one skill",
                            fr: "Sélectionnez au moins une compétence",
                            ur: "کم از کم ایک مہارت منتخب کریں",
                        },
                        validate: (val: string[]) =>
                            val && val.length < 2
                                ? {
                                      en: "Pick at least 2 skills",
                                      fr: "Choisissez au moins 2 compétences",
                                      ur: "کم از کم دو مہارتیں منتخب کریں",
                                  }
                                : null,
                    },
                },
                {
                    id: "bio",
                    type: "textarea",
                    label: {
                        en: "Biography",
                        fr: "Biographie",
                        ur: "سوانح عمری",
                    },
                    placeholder: {
                        en: "Tell us about yourself...",
                        fr: "Parlez-nous de vous...",
                        ur: "اپنے بارے میں بتائیں...",
                    },
                    rows: 6,
                    validations: {
                        required: {
                            en: "Biography is required",
                            fr: "La biographie est requise",
                            ur: "سوانح عمری ضروری ہے",
                        },
                        minLength: 20,
                        maxLength: 500,
                    },
                    layout: { cols: 12 },
                },
            ],
        },
        {
            id: "contact",
            heading: {
                en: "Contact Information",
                fr: "Informations de contact",
                ur: "رابطے کی معلومات",
            },
            layout: { cols: 12 },
            fields: [
                {
                    id: "email",
                    type: "email",
                    label: { en: "Email", fr: "Email", ur: "ای میل" },
                    validations: {
                        required: {
                            en: "Email is required",
                            fr: "L'email est requis",
                            ur: "ای میل ضروری ہے",
                        },
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                },
                {
                    id: "phone",
                    type: "text",
                    label: {
                        en: "Phone Number",
                        fr: "Téléphone",
                        ur: "فون نمبر",
                    },
                },
                {
                    id: "country",
                    type: "autocomplete",
                    label: { en: "Country", fr: "Pays", ur: "ملک" },
                    placeholder: {
                        en: "Select a country",
                        fr: "Sélectionnez un pays",
                        ur: "ملک منتخب کریں",
                    },
                    options: [
                        {
                            value: "pk",
                            label: {
                                en: "Pakistan",
                                fr: "Pakistan",
                                ur: "پاکستان",
                            },
                        },
                        {
                            value: "in",
                            label: { en: "India", fr: "Inde", ur: "بھارت" },
                        },
                        {
                            value: "us",
                            label: {
                                en: "USA",
                                fr: "États-Unis",
                                ur: "امریکہ",
                            },
                        },
                        {
                            value: "uk",
                            label: {
                                en: "UK",
                                fr: "Royaume-Uni",
                                ur: "برطانیہ",
                            },
                        },
                        {
                            value: "de",
                            label: {
                                en: "Germany",
                                fr: "Allemagne",
                                ur: "جرمنی",
                            },
                        },
                    ],
                    layout: { cols: 6 },
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
            } else if (key === "type") {
                field[key] = value;
                field.defaultValue = null;
            } else {
                field[key] = value;
            }
            sections[sectionIdx].fields[fieldIdx] = field;
            return { ...prev, sections };
        });
    };

    // Edit section heading
    const editSectionHeading = (
        sectionIdx: number,
        value: string,
        key: "heading" | "description"
    ) => {
        setDTO((prev) => {
            const sections = [...prev.sections];
            sections[sectionIdx][key] = value;
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
                                        e.target.value,
                                        "heading"
                                    )
                                }
                                size="small"
                                sx={{ mr: 2 }}
                            />
                            <TextField
                                label="Section Description"
                                value={section.description || ""}
                                onChange={(e) =>
                                    editSectionHeading(
                                        sectionIdx,
                                        e.target.value,
                                        "description"
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
                                <FormControl
                                    size="small"
                                    sx={{ minWidth: 120 }}
                                >
                                    <InputLabel
                                        id={`type-label-${sectionIdx}-${fieldIdx}`}
                                    >
                                        Type
                                    </InputLabel>
                                    <Select
                                        labelId={`type-label-${sectionIdx}-${fieldIdx}`}
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
                                    >
                                        {fieldTypes.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
    const [locale, setLocale] = React.useState<string>("en");

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
            <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id={`label-locale`}>Select Language</InputLabel>
                <Select
                    labelId={`label-locale`}
                    label="Select Language"
                    value={locale}
                    onChange={(e) => setLocale(e.target.value)}
                >
                    {["en", "fr", "ur"].map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Divider sx={{ mb: 2 }} />
            <FormBuilder ref={formRef} dto={args.dto} locale={locale} />
        </div>
    );
};

EditableDTO.args = {
    dto: defaultDTO,
};
