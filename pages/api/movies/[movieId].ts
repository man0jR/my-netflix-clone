import { prisma } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { movieId } = req.query;

    if (!movieId) {
      return res.status(400).json({ message: "Movie id is required" });
    }

    await serverAuth(req, res);

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return res.status(200).json(movie);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error?.message || "Error occured while fetching movie details",
    });
  }
}
