export const isPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
}