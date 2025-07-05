import z from "zod";

export const borrowBookFormZod = z.object({
  book: z.string({ required_error: "Book ID is required" }),
  quantity: z.coerce.number().int().min(1, "Minimum 1 book must be borrowed"),
  dueDate: z.date({ required_error: "Due date is required" }).refine(
    (val) => {
      const now = new Date();
      val.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      return val >= now;
    },
    { message: "Due date cannot be in the past" }
  ),
});

export type BorrowBookFormValues = z.infer<typeof borrowBookFormZod>;
