import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/DB/mongodb";
import TestResult from "@/models/TestResult";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { userId, testId } = req.query; // Getting userId and testId from query parameters

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      await connectToDatabase();

      // If testId is provided, find results for both userId and testId
      if (testId) {
        const result = await TestResult.find({ userId, testId });
        if (!result) {
          return res.status(404).json({ message: "No test result found for this testId and userId" });
        }

        return res.status(200).json({ result });
      }

      // Otherwise, fetch all results for the given userId
      const results = await TestResult.find({ userId });
      if (results.length === 0) {
        return res.status(404).json({ message: "No test results found for this user" });
      }

      res.status(200).json({ results });
    }  catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ error: "Error retrieving test results", details: error.message });
        } else {
          res.status(500).json({ error: "Error retrieving test results", details: "Unknown error" });
        }
      }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
