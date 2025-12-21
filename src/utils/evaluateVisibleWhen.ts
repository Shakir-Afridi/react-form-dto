import { Condition } from "../types";

/**
 * Evaluates a condition tree against form state.
 * @param condition - The condition or group to evaluate
 * @param formState - Current form values (key-value pairs)
 * @returns boolean
 */
export function evaluateCondition(
    condition: Condition | undefined,
    formState: Record<string, any>
): boolean {
    if (!condition) {
        return true; // No condition means always visible
    }

    if ("field" in condition) {
        let value = formState[condition.field] ?? "";

        if (Array.isArray(value)) {
            value = value.map((v) => v.value ?? "");
        } else if (typeof value === "object" && value !== null) {
            value = value.value ?? "";
        }

        if (condition.equals !== undefined) {
            return value === condition.equals;
        }
        if (condition.notEquals !== undefined) {
            return value !== condition.notEquals;
        }
        if (condition.in !== undefined) {
            if (Array.isArray(value)) {
                // Multi-select: true if ANY of the selected values is in condition.in
                return condition.in
                    ? value.some((v) => condition.in!.includes(v))
                    : false;
            } else {
                // Single value
                return condition.in.includes(value);
            }
        }
        if (condition.notIn !== undefined) {
            if (Array.isArray(value)) {
                // Multi-select: true if NONE of the selected values are in condition.notIn
                return value.every((v) => !condition.notIn!.includes(v));
            } else {
                return !condition.notIn.includes(value);
            }
        }
        if (condition.greaterThan !== undefined) {
            return value > condition.greaterThan;
        }
        if (condition.lessThan !== undefined) {
            return value < condition.lessThan;
        }

        // If no operator matched, default to true
        return true;
    }

    // Condition group (AND/OR)
    if ("operator" in condition) {
        if (condition.operator === "AND") {
            const result = condition.conditions.every((c) =>
                evaluateCondition(c, formState)
            );

            return result;
        }
        if (condition.operator === "OR") {
            return condition.conditions.some((c) =>
                evaluateCondition(c, formState)
            );
        }
    }

    return false;
}
