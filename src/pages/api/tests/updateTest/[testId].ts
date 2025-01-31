import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import { Test } from "@/models/Test";
import mongoose from "mongoose";

// Define the structure of a Question
interface Question {
  _id: string | mongoose.Types.ObjectId;
  text: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    
    const { testId } = req.query;
    const { TestTitle, questions }: { TestTitle: string; questions: Question[] } = req.body;
    
    if (!testId || typeof testId !== "string") {
      return res.status(400).json({ error: "Invalid request: testId is required" });
    }

    const sanitizedId = testId.trim();
    
    if (!mongoose.Types.ObjectId.isValid(sanitizedId)) {
      return res.status(400).json({ error: "Invalid testId format" });
    }

    // Ensure each question has a valid _id
    const processedQuestions = questions.map((question: Question) => {
      return {
        ...question,
        _id: question._id ? question._id : new mongoose.Types.ObjectId(),
      };
    });
    
    // Update the test with the processed questions
    const updatedTest = await Test.findByIdAndUpdate(
      sanitizedId,
      { $set: { TestTitle, questions: processedQuestions } },
      { new: true }
    );
    
    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }
    
    return res.status(200).json({ message: "Test updated successfully", test: updatedTest });
  } catch (error) {
    console.error("Error updating test:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
