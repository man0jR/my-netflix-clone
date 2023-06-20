import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import useCurrentuser from "@/hooks/useCurrentuser";
import Navbar from "@/components/Navbar";
import BillBoard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";

export default function Home() {
  const { data: user } = useCurrentuser();
  const { data: movies = [] } = useMovieList();

  return (
    <>
      <Navbar />
      <BillBoard />
      <div className="pb-10">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("session from serverprops ", session);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
