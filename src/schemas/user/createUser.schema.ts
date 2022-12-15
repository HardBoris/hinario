import * as yup from "yup";

const createUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  userCategory: yup.string().default("player").optional(),
  password: yup.string().required(),
});

const serializedCreateUserSchema = yup.object().shape({
  userId: yup.string().uuid().required(),
  email: yup.string().email().required(),
  userCategory: yup.string().required(),
});

export { createUserSchema, serializedCreateUserSchema };
