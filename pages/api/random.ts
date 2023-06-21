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
    await serverAuth(req, res);

    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount) + 1;

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return res.status(200).json(randomMovies[0]);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error?.message || "Internal server error" });
  }
}
