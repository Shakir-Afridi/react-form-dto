import type { FormDTO } from "@types";

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
            ],
        },
        {
            id: "contact",
            heading: "Contact Information",
            layout: { columns: 12 },
            fields: [
                { id: "email", type: "text", label: "Email" },
                { id: "phone", type: "text", label: "Phone Number" },
            ],
        },
    ],
};
