import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import { Test } from "@/models/Test";
import mongoose from "mongoose";

// Define the structure of a Question
interface Question {
  _id?: string | mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    
    const { testId } = req.query;
    const { question }: { question: Question } = req.body;
    
    if (!testId || typeof testId !== "string") {
      return res.status(400).json({ error: "Invalid request: testId is required" });
    }

    const sanitizedId = testId.trim();
    
    if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
      return res.status(400).json({ error: "Invalid testId format" });
    }

    // Assign a new ObjectId if _id is not provided
    const newQuestion = {
      ...question,
      _id: question._id ? question._id : new mongoose.Types.ObjectId(),
    };

    // Update the test by adding the new question
    const updatedTest = await Test.findByIdAndUpdate(
      sanitizedId,
      { $push: { questions: newQuestion } },
      { new: true }
    );
    
    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }
    
    return res.status(200).json({ message: "Question added successfully", test: updatedTest });
  } catch (error) {
    console.error("Error adding question:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
