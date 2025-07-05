import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";

export default function BorrowBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const { data, isLoading, isError } = useGetSingleBookQuery(bookId);
  console.log(data, isLoading, isError)
  return <div>This is borrow book</div>;
}
