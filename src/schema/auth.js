import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1,"Email field cannot be empty")
    .email({
      message: "Invalid email address",
    }),
    
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});
