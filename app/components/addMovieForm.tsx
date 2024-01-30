export const AddMovieForm = ({
  handleClick,
}: {
  handleClick: (formdata: FormData) => void;
}) => {
  return (
    <form action={handleClick}>
      <input type="text" placeholder="Title" name="title" />
      <input type="text" placeholder="Description" name="description" />
      <input type="number" placeholder="Year of Release" name="releaseYear" />
      <input type="number" placeholder="Date of Release" name="releaseDate" />
      <div className="flex mt-4 w-full">
        <button
          type="submit"
          className="inline-flex justify- rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Add Movie
        </button>
      </div>
    </form>
  );
};
