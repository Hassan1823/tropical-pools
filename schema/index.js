import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(1, {
    message: "Invalid Password",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Invalid Name",
  }),
  email: z.string().email({
    message: "Invalid Email",
  }),
  password: z.string().min(1, {
    message: "Invalid Password",
  }),
});
