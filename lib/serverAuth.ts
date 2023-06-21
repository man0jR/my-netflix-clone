import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const loggedInuser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      email: true,
      id: true,
      image: true,
      name: true,
      favoriteIds: true,
      account: true,
      sessions: true,
    },
  });
  if (!loggedInuser) {
    throw new Error("Unauthorized");
  }

  return loggedInuser;
};

export default serverAuth;
