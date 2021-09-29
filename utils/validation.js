import Joi from "joi";

export const registrationValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });

  const result = schema.validate(data);
  return result;
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string(),
    password: Joi.string().required(),
  });

  const result = schema.validate(data);
  return result;
};

export const messageValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    message: Joi.string().required(),
  });

  const result = schema.validate(data);
  return result;
};
