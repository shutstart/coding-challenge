import { useModalStore } from "@/lib/store/state";
import { GetAndSetMovieList } from "@/lib/util/helper";
import { useState } from "react";
import Dropzone from "react-dropzone";

export const AddMovieForm = () => {
  function base64ToArrayBuffer(base64: string) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  const [uploadedPhoto, setUploadingPhoto] = useState<File>(new File([], ""));
  async function handleUploadPhoto(files: any) {
    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        const uint8 = new Uint8Array(binaryStr as ArrayBuffer);
        console.log("my binary string", uint8);
        console.log("my binary string", binaryStr);
      };
      reader.readAsArrayBuffer(file);

      setUploadingPhoto(file);
    });
  }
  async function addMovie(formData: FormData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const releaseYear = formData.get("releaseYear");
    const image = uploadedPhoto;
    console.log(image, title, description, releaseYear);
    formData.append("image", uploadedPhoto);

    const res = await fetch("/api/add-movie", {
      method: "POST",
      body: formData,
    });

    console.log("UPLOADED ADD FILM RESULT", res);

    GetAndSetMovieList();
    closeModal();
  }
  function closeModal() {
    useModalStore.setState({ open: false });
  }
  return (
    <form className="max-w-sm mx-auto mt-8" action={addMovie}>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block mb-1 text-sm font-medium text-gray-900 "
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Movie Title"
          required
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="releaseYear"
          className="block mb-1 text-sm font-medium text-gray-900 "
        >
          Release Year
        </label>
        <input
          name="releaseYear"
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          type="number"
          id="releaseYear"
          placeholder="Release Year of Movie"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          required
        />
      </div>

      <label
        htmlFor="description"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        Descripton
      </label>
      <textarea
        name="description"
        id="description"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-5 "
        placeholder="Write a description of the movie ..."
      ></textarea>

      <Dropzone onDrop={(acceptedFiles) => handleUploadPhoto(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="flex items-center justify-center w-full mb-5"
            {...getRootProps()}
          >
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop movie poster
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF
                </p>
              </div>
              <input
                name="dropzone-file"
                id="dropzone-file"
                {...getInputProps()}
                className="hidden"
              />
            </label>
          </div>
        )}
      </Dropzone>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Submit
      </button>
    </form>
  );
};
