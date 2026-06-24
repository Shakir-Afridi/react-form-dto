import React from "react";
import { useForm } from "../form/useForm";
import { FormProvider } from "../form/FormProvider";
import { useFormContext } from "../form/FormContext";
import { useWatch } from "../form/useWatch";
import { useFieldArray } from "../form/useFieldArray";

type MyFormData = {
    firstName: string;
    emails: { value: string }[];
};

function EmailFields() {
    const { control } = useFormContext<MyFormData>();
    const { fields, append, remove } = useFieldArray<MyFormData>({
        name: "emails",
    });

    return (
        <div>
            {fields.map((item, index) => (
                <div key={index}>
                    <input
                        {...control.register(`emails.${index}.value`)}
                        placeholder={`Email #${index + 1}`}
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => append({ value: "" })}>
                Add Email
            </button>
        </div>
    );
}

function WatchedFirstName() {
    const value = useWatch<MyFormData>("firstName");
    return <div style={{ fontSize: 12 }}>Live firstName: {value}</div>;
}

export function ReactHookFormDemo() {
    const form = useForm<MyFormData>({
        defaultValues: { firstName: "", emails: [{ value: "" }] },
        validate: {
            firstName: (v) => (!v ? "Required" : undefined),
        },
    });

    const onSubmit = (data: MyFormData) => {
        alert("Submitted: " + JSON.stringify(data, null, 2));
    };

    return (
        <FormProvider value={form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <input
                        placeholder="First Name"
                        {...form.register("firstName")}
                    />
                    {form.errors.firstName && (
                        <span style={{ color: "red" }}>
                            {form.errors.firstName}
                        </span>
                    )}
                </div>
                <WatchedFirstName />
                <EmailFields />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
}
