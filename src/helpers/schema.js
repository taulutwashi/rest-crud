const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().min(10).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    address: Joi.string().required()
});

module.exports = schema;