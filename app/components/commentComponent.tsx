import { useMovieListStore, useSelectedMovieStore } from "@/lib/store/state";
import { Comment, Movie } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import staticImage from "../../public/preview-1.jpg";
import Rating from "./ratingComponent";
import { GetNumericMovieRating } from "@/lib/util/helper";
import { IoMdSend } from "react-icons/io";
import {
  AddRating,
  DeleteComment,
  GetMovieComments,
  PostComment,
} from "@/lib/util/apiCall";
import { MessageCircle, Trash2 } from "lucide-react";

export default function CommentComponent() {
  const movieList = useMovieListStore((state) => state.movieList);
  const selectedMovieId = useSelectedMovieStore((state) => state.id);
  const [rating, setRating] = useState(1 ?? 0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentString, setCommentString] = useState<string>("");
  const [movie, setMovie] = useState<Movie>(
    movieList.find((m) => m.id === selectedMovieId) as Movie
  );
  useEffect(() => {
    GetNumericMovieRating(movie.id!).then((rating) => {
      setRating(rating ?? 0);
      GetMovieComments(movie.id!).then((comments) => {
        setComments(comments);
      });
    });
  }, []);
  const handleDeleteComment = async (id: number) => {
    const data = await DeleteComment(id);
    if (!data) {
      // TODO: Handle error
    }
    GetMovieComments(movie.id!).then((comments) => {
      setComments(comments);
    });
  };
  async function addComment() {
    const data = await PostComment(String(commentString), movie.id!);
    setCommentString("");
    if (!data) return alert("Something went wrong");
    GetMovieComments(movie.id!).then((comments) => {
      setComments(comments);
    });
  }
  const handleRating = async (rate: number) => {
    // other logic
    const data = await AddRating(rate, movie.id!);
    console.log(data);
    if (!data) {
      // TODO: Handle error
    }
    GetNumericMovieRating(movie.id!).then((rating) => {
      setRating(rating ?? 0);
    });
  };

  return (
    <div className="relative">
      <h2 className="text-xl font-medium intro-y sm:text-2xl">{movie.title}</h2>
      <div className="mt-3 text-xs  text-slate-600 dark:text-slate-500 sm:text-sm">
        {movie.releaseYear}
      </div>
      <div className="mt-6 ">
        <div className="h-[250px]  image-fit">
          <Image
            alt="Midone Tailwind HTML Admin Template"
            className="rounded-md object-fill"
            src={movie.image!}
            width={2000}
            height={2000}
          />
        </div>
      </div>
      <div className="relative flex items-center pt-16 pb-6 intro-y sm:pt-6">
        <div className="absolute flex w-full -mt-12 text-xs sm:relative sm:mt-0 text-slate-600 dark:text-slate-500 sm:text-sm">
          <div className="mr-auto intro-x sm:mr-auto">
            <Rating movieRating={rating} handleRating={handleRating} />
          </div>
          <div className="mr-1 intro-x sm:mr-3 my-auto">
            Comments:
            <span className="font-medium">{comments.length}</span>
          </div>
        </div>
      </div>
      <div className="leading-relaxed text-justify intro-y indent-[30px]">
        <p className="mb-5">{movie.description}</p>
      </div>
      <div className="text-base font-medium sm:text-lg border-b p-4 ">
        Comments
      </div>
      <div className=" intro-y w-full max-h-72 overflow-y-auto no-scrollbar pb-24">
        {comments.map((comment) => {
          return (
            <div
              className="pt-5 mt-5 border-t border-gray-200/40 "
              key={comment.id}
            >
              <div className="flex">
                <div className="flex-none w-10 h-10 sm:w-12 sm:h-12 image-fit">
                  <Image
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={staticImage}
                  />
                </div>
                <div className="flex-1 ml-3">
                  <div className="mt-2">{comment.value}</div>
                </div>
                <div className="my-auto">
                  <Trash2
                    className="w-5 h-5 text-slate-500 cursor-pointer hover:text-red-600"
                    onClick={() => handleDeleteComment(comment.id!)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 pt-5 mt-5  intro-y border-slate-200/60  w-full">
        <div className="relative mt-5 news__input h-[71px] w-full">
          <MessageCircle className="absolute inset-y-0 left-0 w-5 h-5 my-auto ml-6 text-slate-500" />
          <input
            value={commentString}
            className="py-6 pl-16 border-transparent resize-none bg-slate-100 w-full pr-16"
            placeholder="Post a comment..."
            onChange={(e) => {
              setCommentString(e.target.value);
            }}
          />
          <button
            className="  absolute inset-y-0 right-0    text-slate-500 h-full bg-gray-400/20 w-12 hover:bg-gray-400/30 cursor-pointer"
            onClick={addComment}
          >
            <div className="flex h-full w-full">
              <IoMdSend className=" mx-auto my-auto w-12 " />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
