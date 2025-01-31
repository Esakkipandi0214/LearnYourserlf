import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import { Test } from "@/models/Test";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { testId, questionId } = req.query;

    if (!testId || typeof testId !== "string" || !questionId || typeof questionId !== "string") {
      return res.status(400).json({ error: "Invalid request: testId and questionId are required" });
    }

    const sanitizedTestId = testId.trim();
    const sanitizedQuestionId = questionId.trim();

    if (!mongoose.Types.ObjectId.isValid(sanitizedTestId) || !mongoose.Types.ObjectId.isValid(sanitizedQuestionId)) {
      return res.status(400).json({ error: "Invalid testId or questionId format" });
    }

    // Update the test by removing the question with the provided questionId
    const updatedTest = await Test.findByIdAndUpdate(
      sanitizedTestId,
      { $pull: { questions: { _id: sanitizedQuestionId } } },
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ error: "Test not found" });
    }

    return res.status(200).json({ message: "Question deleted successfully", test: updatedTest });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
