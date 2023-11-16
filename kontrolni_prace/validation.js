export function isValidInput(value, field) {
    if (field.dataType === 'number') {
        const numberValue = Number(value);
        return !isNaN(numberValue) && numberValue >= field.minLength && numberValue <= field.maxLength;
    } else {
        return value.length >= field.minLength && value.length <= field.maxLength;
    }
}