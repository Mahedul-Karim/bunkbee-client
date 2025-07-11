import { z } from "zod";

export const mealSchema = z.object({
  title: z.string().min(1, "Meal title is required"),
  category: z.string().min(1, "Meal category is required"),
  image: z
    .any()
    .refine((val) => val !== undefined && val !== null && val !== "", {
      message: "Image is required",
    }),
  ingredients: z.array(z.string()).min(1, "At least on ingredient is required"),
  description: z.string().min(1, "Description is required!"),
  price: z.string().min(1, "Meal price is required"),
  status: z.string().min(1, "Status is required"),
});
