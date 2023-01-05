const Joi = require('joi');

const signupValidation = Joi.object({
  nickname: Joi.string().alphanum().not('').required(),
  password: Joi.string().min(3).not('').required(),
  confirm: Joi.equal(Joi.ref('password')).required().messages({
    'any.only': '비밀번호가 일치하지 않습니다.',
  }),
});

module.exports = {
  signupValidation,
};
