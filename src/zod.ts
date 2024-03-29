import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
}); // zod schema
export type SignupInput = z.infer<typeof signupSchema>; // type inference in zod

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SigninInput = z.infer<typeof signinSchema>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});
export type CreateBlogInput = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  id: z.number(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
// type inference in zod

// customer schema
export const customerInput = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  state: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  storeId: z.number(),
});
export const supplierInput = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  state: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  storeId: z.number(),
});
export const transactionInput = z.object({
  amount: z.number(),
  description: z.number(),
  attachBill: z.string().optional(),
  received: z.boolean(),
  customerId: z.number(),
  storeId: z.number(),
  date: z.number().optional(),
});