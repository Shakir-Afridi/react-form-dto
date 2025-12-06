import { defineConfig } from "vitepress";

export default defineConfig({
    title: "React Form DTO",
    description: "DTO-driven form builder with MUI and validation",
    base: " /react-form-dto/",
    themeConfig: {
        nav: [
            { text: "Guide", link: "/guide/getting-started" },
            { text: "API", link: "/api" },
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
                    { text: "FormDTO", link: "/api/formdto" },
                    { text: "SectionDTO", link: "/api/sectiondto" },
                    { text: "FieldDTO", link: "/api/fielddto" },
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
    },
});
