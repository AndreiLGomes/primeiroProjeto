import Joi from 'joi';

export const userSchema = Joi.object({
    nome: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user', 'guest').required()
});
