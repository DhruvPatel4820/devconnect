const Joi = require("joi");

const updateProfileSchema = Joi.object({
  fullName: Joi.string().trim().min(3).max(50),
  username: Joi.string().trim().min(3).max(30).lowercase(),
  bio: Joi.string().trim().allow("").max(300),

  skills: Joi.array().items(Joi.string().trim()),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),

  newPassword: Joi.string().min(8).required(),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
};
