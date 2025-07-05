import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { addDays, addMonths, format } from "date-fns";
import { CalendarIcon, LoaderPinwheel } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useBorrowBookMutation } from "@/redux/api/borrowBookApi";
import BookDetailsPage from "@/Pages/Single-Book";
import {
  borrowBookFormZod,
  type BorrowBookFormValues,
} from "@/zodSchemas/borrowBookFormSchema";
import { useAppSelector } from "@/redux/hook";

export const BorrowBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const copies = useAppSelector((state) => state.copies.copies);
  const available = useAppSelector((state) => state.copies.available);

  const form = useForm<BorrowBookFormValues>({
    resolver: zodResolver(borrowBookFormZod),
    defaultValues: {
      book: id || "",
      quantity: 1,
      dueDate: addDays(new Date(), 7),
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fromNowToOneMonth = addMonths(new Date(), 1);
  fromNowToOneMonth.setHours(23, 59, 59, 999);

  const [borrowBook, { isLoading: savingBorrowBook }] = useBorrowBookMutation();
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: BorrowBookFormValues) => {
    if (values.quantity > copies) {
      toast.error("You can't borrow more than the available copies.");
      return;
    }
    console.log(values);
    try {
      await borrowBook(values).unwrap();
      form.reset();
      navigate("/borrow-summary");
      toast.success("Book borrowed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to borrow book");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-5xl w-full mx-auto mt-10 font-lato"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setOpen(false);
                      }}
                      hidden={{
                        before: today,
                        after: fromNowToOneMonth,
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={savingBorrowBook || !available}
            className="w-full font-semibold font-title min-w-32"
          >
            {savingBorrowBook ? (
              <LoaderPinwheel className="w-6 h-6" />
            ) : (
              "Borrow Book"
            )}
          </Button>
        </form>
      </Form>
      <BookDetailsPage />
    </div>
  );
};
