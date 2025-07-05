import BorrowBookCard from "@/components/Modules/BorrowBooksComponents/BorrowBookCard";
import { useGetBorrowSummeryQuery } from "@/redux/api/borrowBookApi"
import type { BorrowedBookSummary } from "@/types";
import { Loader2 } from "lucide-react";

const BorrowedSummery = () => {
  const {data, isLoading, isError} = useGetBorrowSummeryQuery(undefined)
  const borrowedBooks = data?.data ?? [];


  const backgroundImage = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/borrow-summery-hero.png')`,
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <p className="text-center text-error mt-20">Failed to load summary.</p>
    );
  }

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center  mt-10 font-lato">
      <div
        style={backgroundImage}
        className="min-h-[550px] w-full flex justify-center items-center lg:items-end lg:pb-10"
      >
        {" "}
        <h1 className="font-script font-bold text-2xl md:text-4xl text-primary bg-black/50 p-5">
          Borrow Book Summery
        </h1>{" "}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-primary font-title mt-8">
        Easily Track All Borrowed Books at a Glance 📚
      </h2>
      <div className="w-full   grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-center items-center  p-4 ">
        {borrowedBooks.map(
          (borrowedBook: BorrowedBookSummary, index: number) => (
            <BorrowBookCard key={index} borrowedBook={borrowedBook} />
          )
        )}
      </div>
    </div>
  );
}

export default BorrowedSummery
