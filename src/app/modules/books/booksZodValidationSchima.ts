import { z } from "zod";

export const bookZodSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  author: z.string({
    required_error: "Author is required",
  }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
      invalid_type_error: "Invalid genre value",
    }
  ),
  isbn: z.string({
    required_error: "ISBN is required",
  }),
  description: z.string().optional(),
  copies: z
    .number({
      required_error: "Copies is required",
      invalid_type_error: "Copies must be a number",
    })
    .int()
    .nonnegative("Copies must be a non-negative integer"),
  available: z.boolean().optional(),
});