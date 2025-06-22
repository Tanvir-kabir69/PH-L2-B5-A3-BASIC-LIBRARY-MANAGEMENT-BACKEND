import { z } from "zod";

export const borrowZodSchema = z.object({
  book: z.string({
    required_error: "Book ID is required",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be a positive integer"),
  dueDate: z
    .string({
      required_error: "Due date is required",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Due date must be a valid date string",
    }),
});
