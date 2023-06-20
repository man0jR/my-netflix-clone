import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import useCurrentuser from "@/hooks/useCurrentuser";

export default function Home() {
  const { data: user } = useCurrentuser();

  return (
    <>
      <h1 className="text-white text-4xl">
        Login Successful! Welcome to Netflix {user?.name}
      </h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
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
