import { z } from "zod";

// 1. Zod Schema
export const bookFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine((val) => isNaN(Number(val)), {
      message: "Author name must not be only numbers",
    }),
  author: z
    .string()
    .min(1, "Author is required")
    .refine((val) => isNaN(Number(val)), {
      message: "Author name must not be only numbers",
    }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
    }
  ),
  isbn: z.string().regex(/^\d{10}(\d{3})?$/, "ISBN must be 10 or 13 digits"),
  description: z.string().optional(),
  copies: z.coerce.number().int().min(0, "Must be 0 or greater"),
  available: z.boolean({
    required_error: "Availability is required",
  }),
});

export type Book = z.infer<typeof bookFormSchema>;
