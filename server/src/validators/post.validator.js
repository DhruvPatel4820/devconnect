const Joi = require("joi");

exports.createPostSchema = Joi.object({
  content: Joi.string().allow("").max(2000),

  visibility: Joi.string().valid("PUBLIC", "PRIVATE").optional(),

  images: Joi.any(),
});
