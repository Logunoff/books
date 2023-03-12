export const PHONE_MASK = [
    '+',
    '3',
    '7',
    '5',
    ' ',
    '(',
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
];

const ALLOWED_REGION_CODES = [29, 33, 25, 44];
const CORRECT_NUMBER_LENGTH = 12;

const phoneValidate = {
    isRegionCodeValid: (v) => ALLOWED_REGION_CODES.includes(Number(v.slice(6, 8))) || 'В формате +375 (xx) xxx-xx-xx',
    isFullNumber: (v) => v.replace(/\D/g, '').length === CORRECT_NUMBER_LENGTH || 'В формате +375 (xx) xxx-xx-xx',
};

export const phoneValidateRules = {
    required: 'В формате +375 (xx) xxx-xx-xx',
    validate: phoneValidate,
};
