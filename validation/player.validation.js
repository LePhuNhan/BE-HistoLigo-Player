import Joi from 'joi';

export const createPlayerSchema = Joi.object({
  fullname: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  sex: Joi.number().valid(0, 1, 2).required(),
  dateOfBirth: Joi.date().iso().required(),
  locale: Joi.string().valid('vi_VN', 'en_US', 'ru_RU').required(),
  avatar: Joi.string().uri().optional(),
});

export const updatePlayerSchema = Joi.object({
  fullname: Joi.string().optional(),
  userName: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  sex: Joi.number().valid(0, 1, 2).optional(),
  dateOfBirth: Joi.date().iso().optional(),
  locale: Joi.string().valid('vi_VN', 'en_US', 'ru_RU').optional(),
  avatar: Joi.string().uri().optional(),
});
