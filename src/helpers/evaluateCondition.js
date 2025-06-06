export function evaluateCondition(fieldValue, condition, value) {
    const isNumberComparison = [">=", "<=", ">", "<"].includes(condition);

    if (isNumberComparison) {
        // If number comparison → compare numbers
        const fieldNum = !isNaN(Number(fieldValue)) && fieldValue !== "" ? Number(fieldValue) : NaN;
        const valueNum = Number(value);

        switch (condition) {
            //!isNaN checks if the value inside is a valid number
            case ">=": return !isNaN(fieldNum) && fieldNum >= valueNum;
            case "<=": return !isNaN(fieldNum) && fieldNum <= valueNum;
            case ">": return !isNaN(fieldNum) && fieldNum > valueNum;
            case "<": return !isNaN(fieldNum) && fieldNum < valueNum;
            default: return false;
        }
    } else {
        const fieldStr = fieldValue === undefined ? "" : fieldValue;

        switch (condition) {
            case "==": return fieldStr === value;
            case "!=": return fieldStr !== value;
            default: return false;
        }
    }
}
