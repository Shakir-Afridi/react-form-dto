import type { FormDTO } from "../types";

export const profileFormI18n: FormDTO = {
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
