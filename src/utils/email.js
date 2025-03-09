

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s'.-]{2,50}$/
    return nameRegex.test(name);
}

export const validateMobile = (mobileNumber) => {

    const mobileRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return mobileRegex.test(mobileNumber);
};

// Example usage:
// console.log(validateMobileNumber("+11234567890"));  // true
// console.log(validateMobileNumber("+919876543210"));  // true
// console.log(validateMobileNumber("+123"));          // false
// console.log(validateMobileNumber("+1234567890123456")); // false
// console.log(validateMobileNumber("+1abc1234567"));    // false
// console.log(validateMobileNumber("+1 123 456 7890"));//true
// console.log(validateMobileNumber("+1-123-456-7890"));//false
// console.log(validateMobileNumber("+1.123.456.7890"));//false
// console.log(validateMobileNumber("1234567890")); //false, no leading +