import useAllBooksColumn from "@/components/Modules/AllBooks-Components/AllBooks-Column";
import AllBooksGridCard from "@/components/Modules/AllBooks-Components/AllBooks-Grid-Card";
import AllBooksTable from "@/components/Modules/AllBooks-Components/AllBooks-Table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBookQuery } from "@/redux/api/baseApi";
import type { IBooks } from "@/types";
import { LoaderPinwheel } from "lucide-react";
import React, { useState, type FormEvent } from "react";

const backgroundImage = {
  backgroundImage: `url('/all-books-hero.jpeg')`,
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const AllBooks = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [jumpPage, setJumpPage] = useState("");
  const [selectedTab, setSelectedTab] = useState("table");

  const columns = useAllBooksColumn();

  const { data, isLoading, isError } = useGetBookQuery(
    { page, limit },
    {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );
  const { data: allBooksData, isLoading: isAllBooksLoading } = useGetBookQuery(
    { page: 1, limit: 1000 },
    {
      skip: selectedTab !== "table",
    }
  );

  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        {" "}
        Loading... <LoaderPinwheel className="w-7 h-7 animate-spin " />
      </div>
    );

  if (isError || !data)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {" "}
        Something went wrong{" "}
      </div>
    );

  const { data: books, meta } = data;
  const totalPages = meta.totalPages;

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleJumpSubmit = (e: FormEvent) => {
    e.preventDefault();
    const targetPage = Number(jumpPage);
    if (targetPage >= 1 && targetPage <= targetPage) {
      setPage(targetPage);
      setJumpPage("");
    }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => setPage(i)}
          className={`px-3 py-1 border rounded-sm ${
            i === page ? "bg-primary text-white" : "bg-slate-700 text-white"
          }`}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex flex-col gap-y-10 justify-center items-center p-4 mt-10 font-lato">
      <div
        style={backgroundImage}
        className="min-h-[550px] w-full flex justify-center items-center"
      >
        {" "}
        <h1 className="font-script font-bold text-4xl text-primary bg-black/50 p-5">
          All Books
        </h1>{" "}
      </div>

      <Tabs
        defaultValue="table"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="max-w-[400px] mx-auto">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="grid">Grid</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="w-full">
          <div className="mt-10 w-full">
            <h2 className="font-baskerville font-bold text-2xl text-secondary my-5">
              Tabular Format
            </h2>
            <AllBooksTable
              columns={columns}
              data={allBooksData?.data || []}
              isAllBooksLoading={isAllBooksLoading}
            />
          </div>
        </TabsContent>
        <TabsContent value="grid" className="w-full">
          { books.length > 0 ?
            <div className="w-full  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 justify-center items-center justify-self-center ">
              {books.map((book: IBooks) => (
                <AllBooksGridCard key={book._id} book={book} />
              ))}
            </div> :
            <div className="flex justify-center items-center text-3xl font-baskerville font-bold my-10" > No Books TO Show </div>
          }

          {/* pagination */}
          <div className="w-full flex flex-col items-center gap-4 my-10 gap-y-10">
            <div className="flex justify-center items-center gap-2 flex-wrap ">
              <Button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </Button>

              {renderPageButtons()}

              {/* <span>
              Page {meta.page} of {meta.totalPages}{" "}
            </span> */}

              <Button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === meta.totalPages}
              >
                Next
              </Button>
            </div>

            {/* jump */}
            <div className="flex items-center justify-center flex-wrap gap-4">
              <form
                onSubmit={handleJumpSubmit}
                className="flex items-center gap-2"
              >
                <label htmlFor="jump" className="text-sm">
                  Jump to page:
                </label>
                <input
                  type="number"
                  id="jump"
                  value={jumpPage}
                  onChange={(e) => setJumpPage(e.target.value)}
                  className="border px-2 py-1 w-20 rounded-sm"
                  min={1}
                  max={totalPages}
                />
                <Button type="submit"> Go </Button>
              </form>

              <div className="flex items-center gap-2">
                <label htmlFor="limit" className="text-sm">
                  Books Per Page:
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={handleLimitChange}
                  className="border px-2 py-1 rounded-sm"
                >
                  {[5, 9, 10, 12, 16, 20, 30, 50].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllBooks;
