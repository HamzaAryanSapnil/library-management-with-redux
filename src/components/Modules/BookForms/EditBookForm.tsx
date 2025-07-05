import { useGetSingleBookQuery } from "@/redux/api/baseApi";
import { useParams } from "react-router";
import { BookFormComponent } from "./Create-EditBooks-Form";



export default function EditBookForm() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id);
  if (isError && !data) {
    return (
      <div className="min-h-screen flex justify-center items-center text-error font-medium font-title">
        {" "}
        Something went wrong{" "}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-primary font-medium font-title">
        {" "}
        Loading{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-y-10 ">
      <h1 className="text-5xl md:text-4xl font-baskerville font-bold ">
        Edit <span className="text-primary">{data.data?.title}</span>{" "}
      </h1>
      <BookFormComponent initialData={data.data} />
    </div>
  );
}
