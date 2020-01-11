const Joi = require("@hapi/joi");

const guestbookValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    message: Joi.string()
      .max(500)
  })
  return schema.validate(data);
};

module.exports.guestbookValidation = guestbookValidation;