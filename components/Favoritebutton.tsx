import useCurrentuser from "@/hooks/useCurrentuser";
import useFavoriteMovies from "@/hooks/useFavoriteMovies";
import { useCallback, useMemo } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { data: user, mutate: mutateUser } = useCurrentuser();
  const { mutate: mutateFavorites } = useFavoriteMovies();

  const isFavorite = useMemo(() => {
    const favorites: string[] = user?.favoriteIds || [];
    return favorites.includes(movieId);
  }, [user, movieId]);

  const toggleFavorite = useCallback(async () => {
    try {
      let response;
      if (isFavorite) {
        response = await fetch("/api/modifyfavorite", {
          method: "PUT",
          body: JSON.stringify({ movieId }),
        });
      } else {
        response = await fetch("/api/modifyfavorite", {
          method: "POST",
          body: JSON.stringify({ movieId }),
        });
      }

      const updatedFavorites = response.ok
        ? (await response.json())?.favoriteids
        : [];

      //   update user favorites
      mutateUser({ ...user, favoriteIds: updatedFavorites });
      // only re-fetches favorites, does not updte anything
      mutateFavorites();
    } catch (error) {
      console.log(error);
    }
  }, [isFavorite, movieId, mutateFavorites, mutateUser, user]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2
        rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" />
    </div>
  );
};

export default FavoriteButton;
