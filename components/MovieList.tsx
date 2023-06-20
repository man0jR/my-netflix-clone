import { isEmpty } from "lodash";
import MovieCard from "@/components/MovieCard";

interface MovieListprops {
  data: Record<string, any>[];
  title: string;
}

const MovieList: React.FC<MovieListprops> = ({ data, title }) => {
  if (isEmpty(data)) {
    return;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
