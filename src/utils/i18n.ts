import type { I18nString, I18nOption } from "../types";

/**
 * Resolves an i18n string to a plain string based on locale
 * @param value - Either a string or an object with locale keys
 * @param locale - The current locale (default: 'en')
 * @returns The resolved string
 */
export function resolveI18nString(
    value: I18nString | undefined,
    locale: string = "en"
): string {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[locale] || value["en"] || Object.values(value)[0] || "";
}

/**
 * Resolves i18n option labels for display
 * @param options - Array of string or i18n option objects
 * @param locale - The current locale (default: 'en')
 * @returns Array of objects with value and label
 */
export function resolveI18nOptionLabels(
    options: I18nOption[] | I18nString[],
    locale: string = "en"
): Array<{ value: string; label: string }> {
    if (!options) return [];
    return options.map((opt) => {
        if (typeof opt === "string") {
            return { value: opt, label: opt };
        }
        return {
            value: opt.value,
            label: resolveI18nString(opt.label, locale),
        };
    });
}
