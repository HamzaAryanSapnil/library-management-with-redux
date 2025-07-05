import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { IBooks } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  BowArrow,
  DeleteIcon,
  Edit,
  MoreHorizontal,
  PlusSquareIcon,
  ViewIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { DataTableViewOptions } from "./TableViewOption";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";

const useAllBooksColumn = () => {
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

  const columns: ColumnDef<IBooks>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select All"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select Row"
        />
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-start"> {row.original.title} </div>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
    },
    {
      accessorKey: "copies",
      header: "Copies",
    },
    {
      accessorKey: "available",
      header: "Availability",
    },
    {
      accessorKey: "action",
      header: "Action",
      id: "actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
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
                <DropdownMenuItem onClick={() => handleNavigate(data._id)}>
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
                  onClick={() => navigate(`/edit-book/${data._id}`)}
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
                <DropdownMenuItem onClick={() => handleDelete(data._id)}>
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
                  onClick={() => navigate(`/borrow/${data._id}`)}
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
        );
      },
    },
    {
      header: ({ table }) => <DataTableViewOptions table={table} />,
      id: "viewOptions",
    },
  ];
  return columns;
};

export default useAllBooksColumn;
