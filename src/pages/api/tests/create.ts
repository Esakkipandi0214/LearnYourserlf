import { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "@/DB/mongodb"
import { Test } from "@/models/Test"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    await connectToDatabase()

    // Destructure the data from the request body
    const { TestTitle, questions, createdBy, authorizedIds } = req.body

    // Validate input
    if (!TestTitle || !createdBy || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: "Invalid request data" })
    }

    // Create test document
    const test = await Test.create({
      TestTitle, // Added TestTitle to the model
      questions,
      createdBy,
      authorizedIds,
    })

    return res.status(201).json({ message: "Test created successfully", test })
  } catch (error) {
    console.error("Error creating test:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
