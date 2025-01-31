import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import { Test } from "@/models/Test";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid ID provided" });
  }

  try {
    await connectToDatabase();

    // Find and delete the test by ID
    const test = await Test.findByIdAndDelete(id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
