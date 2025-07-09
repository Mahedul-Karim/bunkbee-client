import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email field cannot be empty").email({
    message: "Invalid email address",
  }),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().min(1, "Email field can not be empty").email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match",
    path: ["confirmPassword"],
  });
