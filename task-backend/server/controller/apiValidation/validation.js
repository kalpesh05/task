const Joi = require("joi");
//Error message
const errorMessages = require("../../common/errorMessages");

exports.loginValidationSchema = Joi.object().keys({
  email: Joi.string()
    .min(3)
    .max(30)
    .email()
    .error(new Error(errorMessages.EMAIL))
    .required(),
  password: Joi.string()
    .min(8)
    .error(new Error(errorMessages.PASSWORD))
    .required()
});

exports.taskCreateSchema = Joi.object().keys({
  title: Joi.string()
    .min(1)
    .max(100)
    .error(new Error(errorMessages.TASK_TITLE))
    .required(),
  desciption: Joi.string()
    .min(1)
    .max(100)
    .error(new Error(errorMessages.TASK_DESCIPTION))
    .required()
});
