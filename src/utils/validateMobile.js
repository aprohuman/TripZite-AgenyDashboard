export const validateMobile = (mobile) => {
    const mobileRegex = /^\+[1-9]\d{1,14}$/;
    return mobileRegex.test(mobile);
};




