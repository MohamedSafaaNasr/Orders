const mails = require("./mails");
const joi = require("joi");

const mailConfigSchema = joi.object({
  email: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  host: joi.string().required(),
  port: joi.string(),
});

// // Can be repeated with every email validation.
// mailConfigSchema.validate(mails.VERIFICATION_MAIL.CONFIG, mailConfigSchema);
// mailConfigSchema.validate(mails.FORGET_PASSWORD.CONFIG, mailConfigSchema);
// mailConfigSchema.validate(mails.NOTIFICATION_MAIL.CONFIG, mailConfigSchema);

// if (error) {
//   throw new Error(`Support mail Config validation error: ${error.message}`);
// }

module.exports = mails;
