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

    const { createdBy } = req.query; // Access createdBy from the query

    // Validate input
    if (!createdBy || typeof createdBy !== "string") {
      return res.status(400).json({ error: "Invalid request: createdBy is required" });
    }

    // Trim and sanitize the createdBy ID to avoid extra spaces or newlines
    const sanitizedCreatedBy = createdBy.toString().trim();

    // Convert `createdBy` to ObjectId if necessary
    const objectId = new mongoose.Types.ObjectId(sanitizedCreatedBy);

    // Fetch tests created by the given createdBy ID
    const tests = await Test.find({ createdBy: objectId });

    if (!tests || tests.length === 0) {
      return res.status(404).json({ message: "No tests found for this createdBy" });
    }

    return res.status(200).json({ tests });
  } catch (error) {
    console.error("Error fetching tests:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
