// src/utils/layout.ts
export function mapSpanToSize(span?: number) {
    const s = span ?? 12;
    return {
        xs: 12, // always full width on mobile
        sm: s, // use span for tablet
        md: s, // use span for desktop
        lg: s, // use span for large screens
        xl: s,
    };
}
