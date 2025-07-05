import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteBookMutation } from "@/redux/api/baseApi";

import type { IBooks } from "@/types";
import {
  BowArrow,
  DeleteIcon,
  Edit,
  MoreHorizontal,
  PlusSquareIcon,
  ViewIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AllBooksGridCardProps {
  book: IBooks; // Assuming 'books' is an array of IBooks objects
}

const AllBooksGridCard = ({ book }: AllBooksGridCardProps) => {
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/books/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };
  return (
    <Card className="min-h-96 ">
      <CardHeader>
        <CardTitle className="text-primary font-lora text-2xl">
          {" "}
          {book.title}{" "}
        </CardTitle>
        <CardDescription className="w-full">
          {" "}
          {book.description}{" "}
        </CardDescription>
        <CardAction>
          {" "}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col items-center"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <div className="flex gap-2 justify-center items-center">
                <DropdownMenuItem onClick={() => handleNavigate(book._id)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <ViewIcon className="w-6 h-6" />{" "}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> View this Book </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <Edit className="w-6 h-6" />{" "}
                      </TooltipTrigger>
                      <TooltipContent className="bg-secondary">
                        <p> Edit this Book </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(book._id)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DeleteIcon className="w-6 h-6" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-error">
                        <p> Delete this Book </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/create-book`)}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <PlusSquareIcon className="w-6 h-6" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-primary text-white">
                        <p> Add New Book </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(`/borrow/${book._id}`)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BowArrow className="w-6 h-6" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-secondary font-medium text-white">
                        <p> Borrow this book </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          {" "}
          <span className="text-secondary">Author's Name</span> : {book.author}
        </p>
        <p>
          {" "}
          <span className="text-secondary">Total Copies</span> : {book.copies}
        </p>

        <p>
          <span className="text-secondary "> Book Availability </span>{" "}
          {book.available
            ? "This book is available to borrow"
            : "Currently this book is unavailable"}
        </p>
      </CardContent>
      <CardFooter className="text-secondary">
        <p>{book.genre}</p>
      </CardFooter>
    </Card>
  );
};

export default AllBooksGridCard;
