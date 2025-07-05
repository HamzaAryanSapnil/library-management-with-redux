import { BookFormComponent } from "./Create-EditBooks-Form";



export default function CreateBookForm() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-10 p-4">
      <h1 className="md:text-5xl text-3xl sm:text-xl font-baskerville font-bold text-primary ">
        Create New Book
      </h1>
      <div className="w-full max-w-5xl">
        <BookFormComponent />
      </div>
    </div>
  );
}
