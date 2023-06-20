import { prisma } from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await serverAuth(req);
    const movies = await prisma.movie.findMany();

    return res.status(200).json(movies);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error?.message || "Internal server error" });
  }
}
