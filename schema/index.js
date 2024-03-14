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
  confirmPassword: z.string().min(1, {
    message: "Invalid Password",
  }),
});

export const QueriesSchema = z.object({
  name: z.string().min(1, {
    message: "Invalid Name",
  }),
  phone: z
    .string()
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  email: z.string().email({
    message: "Invalid Email",
  }),
  message: z.string().min(1, {
    message: "Please Write Your Query",
  }),
});

export const QueryReplySchema = z.object({
  queryReply: z.string().min(1, {
    message: "Please Write Your Query Answer",
  }),
});

export const ProductReviewSchema = z.object({
  review: z.string().min(1, {
    message: "Please Write Your Review",
  }),
  rating: z.string().min(1, {
    message: "Please Rate Your Experience",
  }),
});

export const AddProductSchema = z.object({
  title: z.string().min(1, {
    message: "please enter a title",
  }),
  description: z.string().min(1, {
    message: "please enter a description",
  }),
  price: z.string().min(1, {
    message: "please enter a price",
  }),
  quantity: z.string().min(1, {
    message: "please enter a quantity",
  }),
});
export const EditProductSchema = z.object({
  title: z.string().min(1, {
    message: "please enter a title",
  }),
  description: z.string().min(1, {
    message: "please enter a description",
  }),
  price: z.string().min(1, {
    message: "please enter a price",
  }),
  quantity: z.string().min(1, {
    message: "please enter a quantity",
  }),
});
