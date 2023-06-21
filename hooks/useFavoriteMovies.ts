import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export default function useFavoriteMovies() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/getfavorites",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
}
