import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb"
import TestResult, { ITestResult } from "@/models/TestResult";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === "POST") {
    try {
        await connectToDatabase()
      const { testId, testTitle, questionCount,userId, totalMarks, marksObtained } = req.body as ITestResult;

      if (!testId ||!userId || !testTitle || totalMarks === undefined || marksObtained === undefined || !questionCount) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newTestResult = new TestResult({
        testId,
        testTitle,
        questionCount,
        userId,
        totalMarks,
        marksObtained,
      });

      await newTestResult.save();
      res.status(201).json({ message: "Test result saved successfully", result: newTestResult });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: "Error saving test result", details: error.message });
      } else {
        res.status(500).json({ error: "Error saving test result", details: "Unknown error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
