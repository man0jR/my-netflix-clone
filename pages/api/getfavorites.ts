import { prisma } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const loggedInUser = await serverAuth(req, res);
    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: loggedInUser.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: error?.message || "Error Occured while fetching favorites.",
    });
  }
}
