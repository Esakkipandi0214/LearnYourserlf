import { Schema, model, models } from "mongoose"

// Define the schema for the Question
const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswers: { type: [Number], required: true },
  isMultipleChoice: { type: Boolean, required: true },
})

// Define the schema for the Test
const TestSchema = new Schema({
  TestTitle: { type: String, required: true }, // Added TestTitle field
  questions: { type: [QuestionSchema], required: true },
  createdBy: { type: String, required: true },
  authorizedIds: { type: [String], default: [] },
}, { timestamps: true })

// Create and export the Test model
export const Test = models.Test || model("Test", TestSchema)
