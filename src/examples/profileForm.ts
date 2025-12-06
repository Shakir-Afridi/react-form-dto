import type { FormDTO } from "../types";

export const profileForm: FormDTO = {
    title: "User Profile",
    description: "Fill out your personal information",
    layout: { columns: 12, gap: "1rem" }, // global form layout
    sections: [
        {
            id: "personal",
            heading: "Personal Information",
            description: "Basic details about you",
            layout: { columns: 12, gap: "1rem" }, // section layout
            fields: [
                {
                    id: "title",
                    type: "select",
                    label: "Title",
                    placeholder: "Select your title",
                    options: ["Mr", "Ms", "Dr", "Prof"],
                    layout: { col: 4 },
                },
                {
                    id: "firstName",
                    type: "text",
                    label: "First Name",
                    layout: { col: 4 },
                },
                {
                    id: "lastName",
                    type: "text",
                    label: "Last Name",
                    layout: { col: 4 },
                },
                {
                    id: "age",
                    type: "number",
                    label: "Age",
                    layout: { col: 6 },
                },
                {
                    id: "dob",
                    type: "date",
                    label: "Date of Birth",
                    layout: { col: 6 },
                },
                {
                    id: "gender",
                    type: "radio",
                    label: "Gender",
                    options: ["Male", "Female", "Other"],
                    validations: {
                        required: "Please select your gender",
                    },
                    layout: { direction: "row" },
                },
                {
                    id: "skills",
                    type: "multi-autocomplete",
                    label: "Skills",
                    placeholder: "Select your skills",
                    options: [
                        "React",
                        "TypeScript",
                        "Node.js",
                        "GraphQL",
                        "Docker",
                    ],
                    layout: { col: 12 },
                    validations: {
                        required: "Select at least one skill",
                        validate: (val: string[]) =>
                            val && val.length < 2
                                ? "Pick at least 2 skills"
                                : null,
                    },
                },
                {
                    id: "bio",
                    type: "textarea",
                    label: "Biography",
                    placeholder: "Tell us about yourself...",
                    rows: 6,
                    validations: {
                        required: "Biography is required",
                        minLength: 20,
                        maxLength: 500,
                    },
                    layout: { col: 12 },
                },
            ],
        },
        {
            id: "contact",
            heading: "Contact Information",
            layout: { columns: 12 },
            fields: [
                {
                    id: "email",
                    type: "email",
                    label: "Email",
                    validations: {
                        required: "Email is required",
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    },
                },
                { id: "phone", type: "text", label: "Phone Number" },
                {
                    id: "country",
                    type: "autocomplete",
                    label: "Country",
                    placeholder: "Select a country",
                    options: ["Pakistan", "India", "USA", "UK", "Germany"],
                    layout: { col: 6 },
                },
            ],
        },
    ],
};
