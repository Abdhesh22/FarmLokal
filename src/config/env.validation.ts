import * as Joi from 'joi';

export const envValidationSchema = Joi.object({

    OAUTH_TOKEN_URL: Joi.string().uri().required(),
    OAUTH_CLIENT_ID: Joi.string().required(),
    OAUTH_CLIENT_SECRET: Joi.string().required(),
    OAUTH_AUDIENCE: Joi.string().required(),

    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),



});
