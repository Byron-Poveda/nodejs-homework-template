const Joi = require("joi");

const schemasValidations = {
    schemaContact: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    }),
    schemaUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

module.exports = schemasValidations;