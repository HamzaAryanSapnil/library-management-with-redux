import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { bookFormSchema, type Book } from "@/zodSchemas/booksSchema";
import type { IBooks } from "@/types";
import { useNavigate } from "react-router";
import { LoaderPinwheel } from "lucide-react";

// 2. Props
interface BookFormProps {
  initialData?: Partial<IBooks>;
  onSuccess?: () => void;
}

export const BookFormComponent = ({
  initialData,
  onSuccess,
}: BookFormProps) => {
  const navigate = useNavigate();
  const isEdit = Boolean(initialData && initialData._id);
  const form = useForm<Book>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 0,
      available: true,
      ...initialData,
    },
  });

  const [createBook, { isLoading: creating }] = useCreateBookMutation();
  const [updateBook, { isLoading: updating }] = useUpdateBookMutation();

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (values: Book) => {
    console.log("From onsubmit", values);
    try {
      if (isEdit && initialData?._id) {
        await updateBook({
          bookId: initialData._id,
          booksData: values,
        }).unwrap();
        toast.success("Book updated successfully");
        navigate(`/books/${initialData._id}`);
      } else {
        await createBook(values).unwrap();
        toast.success("Book created successfully");
        form.reset();
        navigate(`/books`);
      }
      onSuccess?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" inputMode="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "FICTION",
                      "NON_FICTION",
                      "SCIENCE",
                      "HISTORY",
                      "BIOGRAPHY",
                      "FANTASY",
                    ].map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  className="h-5 w-5"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={creating || updating} className="min-w-32">
          {isEdit ? (
            updating ? (
              <LoaderPinwheel className="w-6 h-6" />
            ) : (
              "Update Book"
            )
          ) : creating ? (
            <LoaderPinwheel className="w-6 h-6" />
          ) : (
            "Create Book"
          )}
        </Button>
      </form>
    </Form>
  );
};
