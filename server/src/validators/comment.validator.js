const Joi = require("joi");

exports.createCommentSchema = Joi.object({
  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required(),
});


