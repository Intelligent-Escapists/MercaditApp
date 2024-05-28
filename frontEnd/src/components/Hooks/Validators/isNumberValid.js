export const isNumberValid = (value) => {
    return !isNaN(value) && value.trim() !== '';
}