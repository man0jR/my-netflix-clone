import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const user = await serverAuth(req);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error?.message || "error occured" });
  }
};

export default handler;
