export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s'.-]{2,50}$/
    return nameRegex.test(name);
};

export const validateMobile = (mobileNumber) => {

    const mobileRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    return mobileRegex.test(mobileNumber);
};