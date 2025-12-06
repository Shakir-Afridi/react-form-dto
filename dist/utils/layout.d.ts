/**
 * Maps a span value to a responsive size configuration for different screen breakpoints.
 * Ensures mobile devices always use full width (12) while other breakpoints use the provided span.
 *
 * @param span - The number of columns (1-12) the element should span. Defaults to 12 (full width).
 * @returns An object with responsive breakpoint sizes (xs, sm, md, lg, xl)
 *
 * @example
 * mapSpanToSize(6) // Returns { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }
 * mapSpanToSize() // Returns { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
 */
export declare function mapSpanToSize(span?: number): {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
};
