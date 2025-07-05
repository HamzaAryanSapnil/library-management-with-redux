

import CreateBookForm from "@/components/Modules/BookForms/CreateBookForm";
import EditBookForm from "@/components/Modules/BookForms/EditBookForm";
import { BorrowBookForm } from "@/components/Modules/BorrowBooksComponents/BorrowBookForm";
import Homepage from "@/components/Modules/Homepage-Components/Homepage";
import AllBooks from "@/Pages/All-Books";
import BorrowedSummery from "@/Pages/Borrowed-Summery";
import Home from "@/Pages/Home";
import SingleBook from "@/Pages/Single-Book";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/books/:id",
        Component: SingleBook,
      },
      {
        path: "/create-book",
        Component: CreateBookForm,
      },
      {
        path: "/borrow-summary",
        Component: BorrowedSummery,
      },
      {
        path: "/edit-book/:id",
        Component: EditBookForm,
      },
      
      {
        path: "/borrow/:id",
        Component: BorrowBookForm,
      },
    ],
  },
]);