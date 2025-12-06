import { defineConfig } from "vitepress";

export default defineConfig({
    title: "React Form DTO",
    description: "DTO-driven form builder with MUI and validation",
    base: "/react-form-dto/docs/",
    themeConfig: {
        nav: [
            { text: "Guide", link: "/guide/getting-started" },
            { text: "Components", link: "/components/formBuilder" },
            { text: "API", link: "/api/formDTO" },
        ],
        sidebar: [
            {
                text: "Guide",
                items: [
                    { text: "Introduction", link: "/" },
                    { text: "Getting Started", link: "/guide/getting-started" },
                    { text: "Validation", link: "/guide/validation" },
                ],
            },
            {
                text: "Components",
                items: [
                    { text: "FormBuilder", link: "/components/formBuilder" },
                    { text: "Section", link: "/components/section" },
                    { text: "Field", link: "/components/field" },
                    {
                        text: "Field Renderers",
                        items: [
                            {
                                text: "TextInput",
                                link: "/components/fieldRenderers/textInput",
                            },
                            {
                                text: "SelectInput",
                                link: "/components/fieldRenderers/selectInput",
                            },
                            {
                                text: "CheckBoxInput",
                                link: "/components/fieldRenderers/checkBoxInput",
                            },
                            {
                                text: "AutoComplete",
                                link: "/components/fieldRenderers/autocomplete",
                            },
                            {
                                text: "MultiAutoComplete",
                                link: "/components/fieldRenderers/multiAutoComplete",
                            },
                            {
                                text: "RadioInput",
                                link: "/components/fieldRenderers/radioInput",
                            },
                            {
                                text: "TextAreaInput",
                                link: "/components/fieldRenderers/textareaInput",
                            },
                        ],
                    },
                ],
            },
            {
                text: "API",
                items: [
                    { text: "FormDTO", link: "/api/formDTO" },
                    { text: "SectionDTO", link: "/api/sectionDTO" },
                    { text: "FieldDTO", link: "/api/fieldDTO" },
                    {
                        text: "Hooks",
                        items: [
                            {
                                text: "useFormBuilder",
                                link: "/api/hooks/useFormBuilder",
                            },
                        ],
                    },
                ],
            },
        ],
        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/Shakir-Afridi/react-form-dto",
            },
            {
                icon: "npm",
                link: "https://www.npmjs.com/package/react-form-dto",
            },
            {
                icon: {
                    svg: `
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FF4785" d="M23.86 0v24H.14V0zM19.97 2.47l-.08 2.35a.34.34 0 0 0 .56.28l.76-.57.74.54a.33.33 0 0 0 .53-.26l.1-2.36a.33.33 0 0 0-.34-.34h-2.03a.33.33 0 0 0-.34.36zm-2.23 10.55a.37.37 0 0 1 .37.37v5.44a.37.37 0 0 1-.37.37h-.76a.37.37 0 0 1-.36-.31l-.33-2.07-2.34.29-.4 1.77a.37.37 0 0 1-.37.31h-.78a.37.37 0 0 1-.37-.37V13.4a.37.37 0 0 1 .37-.37zm-6.7-.02a.37.37 0 0 1 .37.37v3.45c0 .2.16.36.36.36h2.54a.37.37 0 0 1 .36.37v.74a.37.37 0 0 1-.36.37H9.77a.37.37 0 0 1-.37-.37V13.4a.37.37 0 0 1 .37-.37zm3.77-4.77a1.11 1.11 0 1 1-1.11-1.11 1.1 1.1 0 0 1 1.11 1.11z"/>
                </svg>
              `,
                },
                link: "https://shakir-afridi.github.io/react-form-dto/storybook",
            },
        ],
    },
});
