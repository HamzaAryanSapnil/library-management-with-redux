import {
  useGetSingleBookQuery,
  useDeleteBookMutation,
} from "@/redux/api/baseApi";
import {  Edit, Trash2, LoaderPinwheel, Flower } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "@/redux/hook";
import { setAvailable, setCopies } from "@/redux/features/book-copies/copiesSlice";

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  const [deleteBook, { isLoading: deleting }] = useDeleteBookMutation();
  const [deletingState, setDeletingState] = useState(false);
  const dispatch = useAppDispatch();

  const book = data?.data;

  useEffect(() => {
    if (book) {
      dispatch(setCopies(book.copies));
      dispatch(setAvailable(book.available));
    }
  }, [book,dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading... <LoaderPinwheel className="w-7 h-7 animate-spin " />
      </div>
    );

  if (isError || !data?.data)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Something went wrong while loading the book.
      </div>
    );

  const handleDelete = async () => {
    setDeletingState(true);
    try {
      await deleteBook(book._id).unwrap();
      if (deleting) {
        toast.message("Book is deleting");
      }
      toast.success("Book deleted successfully");
      navigate("/books");
    } catch (err) {
      toast.error("Failed to delete book");
      console.error(err);
    } finally {
      setDeletingState(false);
    }
  };

  return (
    <div className="container w-full  mx-auto px-4 py-10  flex justify-center items-center">
      <Card className="shadow-xl p-6 space-y-6 border border-gray-200 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-5">
          <h1 className="text-4xl font-extrabold text-primary tracking-tight text-wrap">
            {book.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/edit-book/${book._id}`)}
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deletingState}
              className="min-w-32"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {deletingState ? (
                <LoaderPinwheel className="w-6 h-6" />
              ) : (
                "Delete"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/borrow/${book._id}`)}
            >
              <Flower className="w-4 h-4 mr-1" /> Borrow this book
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-muted-foreground">
          <p className="text-sm">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
          <Badge variant="outline" className="text-xs mt-2 sm:mt-0">
            {book.genre}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium">ISBN:</span> {book.isbn}
          </p>
          <p>
            <span className="font-medium">Copies:</span> {book.copies}
          </p>
          <p>
            <span className="font-medium">Available:</span>{" "}
            {book.available ? (
              <Badge variant="default">Yes</Badge>
            ) : (
              <Badge variant="destructive">No</Badge>
            )}
          </p>
        </div>

        {book.description && (
          <CardContent className="pt-6 border-t text-base leading-relaxed">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="whitespace-pre-wrap">{book.description}</p>
          </CardContent>
        )}

        <div className="pt-4 text-xs text-muted-foreground border-t">
          <p>Created: {new Date(book.createdAt).toLocaleString()}</p>
          <p>Last Updated: {new Date(book.updatedAt).toLocaleString()}</p>
        </div>
      </Card>
    </div>
  );
};

export default BookDetailsPage;
