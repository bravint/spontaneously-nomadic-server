import joi from 'joi';

export const registerSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const loginSchema = joi.object().keys({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const createLocationSchema = joi.object().keys({
    name: joi.string().required(),
    lat: joi.number().required(),
    lng: joi.number().required(),
    rating: joi.number().integer().required(),
});

export const editLocationSchema = joi.object().keys({
    name: joi.string().required(),
    lat: joi.number().required(),
    lng: joi.number().required(),
    rating: joi.number().integer().required(),
    ratingId: joi.number().integer().required(),
});
