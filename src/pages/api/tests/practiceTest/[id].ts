import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import { Test } from "@/models/Test";
import mongoose from "mongoose"; // Ensure mongoose is imported

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { id } = req.query; // Access the test ID from the query

    // Validate input
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid request: test ID is required" });
    }

    // Sanitize input by trimming any unwanted spaces or newlines
    const sanitizedId = id.trim();

    // Convert `id` to ObjectId if necessary
    if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
      return res.status(400).json({ error: "Invalid test ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(sanitizedId);

    // Fetch the test by its ID
    const test = await Test.findById(objectId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ test });
  } catch (error) {
    console.error("Error fetching test by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
