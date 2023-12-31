import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./Favoritebutton";
import { data } from "autoprefixer";
import { useRouter } from "next/router";

interface Moviecardprops {
  movie: Record<string, any>;
}

const Moviecard: React.FC<Moviecardprops> = ({ movie }) => {
  const router = useRouter();

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
        src={movie.thumbnailUrl}
        alt="movie_thumbnail"
      />

      <div
        className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0
                  group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100"
      >
        <img
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={movie.thumbnailUrl}
          alt="movie_thumbnail"
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                router.push(`/watch/${movie?.id}`);
              }}
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={movie?.id} />
          </div>
          <span className="text-white mt-5">{movie?.title}</span>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {movie?.duration}
            </p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{movie?.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviecard;
