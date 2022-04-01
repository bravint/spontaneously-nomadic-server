import joi from 'joi';

export const registerSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: joi.ref('password'),
});

export const loginSchema = joi.object().keys({
    username: joi.string().alphanum().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
