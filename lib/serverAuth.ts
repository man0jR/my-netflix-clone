import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "./prismadb";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

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
