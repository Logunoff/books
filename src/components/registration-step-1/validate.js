const loginValidate = {
    isRegionCodeValid: (v) => v.includes(/А-я/g) || 'латинский алфавит',
};

export const loginValidateRules = {
    required: 'Поле',
    validate: loginValidate,
};