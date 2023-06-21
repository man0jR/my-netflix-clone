import { prisma } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { movieId } = JSON.parse(req.body);

    const movieExists = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movieExists) {
      return res.status(400).json({ message: "Movie not found" });
    }
    const loggedInuser = await serverAuth(req, res);

    if (req.method === "POST") {
      const updatedFavorites = await prisma.user.update({
        where: {
          email: loggedInuser?.email,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(updatedFavorites);
    } else if (req.method === "PUT") {
      const updatedfavriteIds = without(loggedInuser?.favoriteIds, movieId);
      console.log("updatedfavriteIds in modifyfav", updatedfavriteIds);

      const updatedFavorites = await prisma.user.update({
        where: {
          email: loggedInuser?.email,
        },
        data: {
          favoriteIds: updatedfavriteIds,
        },
      });

      return res.status(200).json(updatedFavorites);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error?.message || "Server Error occured" });
  }
}
