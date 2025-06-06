import { evaluateCondition } from "./evaluateCondition";

export function isFieldVisible(field, formData) {
    if (field.visibleIf) {
        const { field: targetField, condition, value } = field.visibleIf;
        return evaluateCondition(formData[targetField], condition, value);
    }

    if (field.visibleIfAll) {
        return field.visibleIfAll.every((rule) =>
            evaluateCondition(formData[rule.field], rule.condition, rule.value)
        );
    }

    return true;
}