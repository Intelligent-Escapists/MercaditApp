export const isPasswordValid = (password) => {
    // Al menos una letra mayúscula
    if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[-_]/.test(password)) {
        return false;
    }

    // La contraseña cumple con todos los criterios de validación
    return true;
}