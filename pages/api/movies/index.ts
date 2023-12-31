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
    await serverAuth(req, res);
    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: error?.message || "Error occurred while fetching all movies",
    });
  }
}
