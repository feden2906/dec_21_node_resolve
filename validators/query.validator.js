const Joi = require('joi');

const { emailValidator, ageValidator, nameValidator } = require("./common.validator");

module.exports = {
  findAll: Joi.object({
    name: nameValidator,
    age: ageValidator,
    email: emailValidator,
  }),
};
