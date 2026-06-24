import React from "react";
import { Playground } from "./FormBuilder.stories";

export default {
    title: "Examples/Playground",
    parameters: {
        docs: {
            description: {
                component:
                    "Interactive form builder — add/remove sections and fields on the left, see the live form on the right. Hit Submit to run validation and inspect the collected values.",
            },
        },
        layout: "fullscreen",
    },
};

export const Default = {
    render: () => (
        <div style={{ padding: 20 }}>
            <Playground />
        </div>
    ),
    name: "Form Builder Playground",
};
