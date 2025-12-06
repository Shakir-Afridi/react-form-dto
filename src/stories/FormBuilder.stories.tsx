import React, { useRef } from "react";
import { FormBuilder, FormBuilderHandle } from "../components/FormBuilder";
import type { FormDTO } from "../types";

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
