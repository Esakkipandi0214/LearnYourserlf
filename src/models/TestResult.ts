import mongoose, { Schema, Document } from "mongoose";

export interface ITestResult extends Document {
  testId: string;
  testTitle: string;
  questionCount: number;
  userId: string;
  totalMarks: number;
  marksObtained: number;
  submittedAt: Date;
}

const testResultSchema = new Schema<ITestResult>({
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },
  questionCount: { type: Number, required: true },
  userId: { type: String, required: true }, // Ensure this is required
  totalMarks: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const TestResult = mongoose.models.TestResult || mongoose.model<ITestResult>('TestResult', testResultSchema);

export default TestResult;
