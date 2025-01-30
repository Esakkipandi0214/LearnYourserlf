"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2 } from "lucide-react"

interface Question {
  text: string
  options: string[]
  correctAnswers: number[]
  isMultipleChoice: boolean
  TestTitle: string
}

interface Test {
  questions: Question[]
  createdBy: string
  authorizedIds: string[]
  TestTitle: string
}

interface TestCreatorProps {
  createdBy: string
}

export default function TestCreator({ createdBy }: TestCreatorProps) {
  const [test, setTest] = useState<Test>({
    questions: [],
    createdBy: createdBy || "6795fce2f5a55a767b18523a", // Sample createdBy ID
    authorizedIds: [],
    TestTitle: "", // Add initial value for TestTitle
  })

  const addQuestion = () => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: [
        ...prevTest.questions,
        { text: "", options: [""], correctAnswers: [], isMultipleChoice: false, TestTitle: prevTest.TestTitle }, // Add TestTitle here
      ],
    }))
  }

  const updateQuestion = <K extends keyof Question>(
    index: number,
    field: K,
    value: Question[K]
  ) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      ),
    }))
  }

  const addOption = (questionIndex: number) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((q, i) =>
        i === questionIndex ? { ...q, options: [...q.options, ""] } : q
      ),
    }))
  }

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((q, i) =>
        i === questionIndex
          ? { ...q, options: q.options.map((opt, j) => (j === optionIndex ? value : opt)) }
          : q
      ),
    }))
  }

  const toggleCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              correctAnswers: q.correctAnswers.includes(optionIndex)
                ? q.correctAnswers.filter((a) => a !== optionIndex)
                : [...q.correctAnswers, optionIndex],
            }
          : q
      ),
    }))
  }

  const removeQuestion = (index: number) => {
    setTest((prevTest) => ({
      ...prevTest,
      questions: prevTest.questions.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:3000/api/tests/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
      })

      if (!response.ok) {
        throw new Error("Failed to create test")
      }

      const result = await response.json()
      console.log("Test created successfully:", result)
      alert("Test created successfully!")

      // Reset form after successful submission
      setTest({
        questions: [],
        createdBy,
        authorizedIds: [],
        TestTitle: "",
      })
    } catch (error) {
      console.error("Error creating test:", error)
      alert("Error creating test. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6">
      <h1 className="text-2xl font-bold text-black mb-6">Create a Test</h1>

      {/* Test Title Input */}
      <div className="space-y-2">
        <Label htmlFor="testTitle" className="text-black">Test Title</Label>
        <Input
          id="testTitle"
          value={test.TestTitle}
          onChange={(e) => setTest({ ...test, TestTitle: e.target.value })}
          placeholder="Enter the test title"
          className="text-black"
        />
      </div>

      {test.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-black">Question {questionIndex + 1}</h2>
            <Button type="button" variant="destructive" size="icon" onClick={() => removeQuestion(questionIndex)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            value={question.text}
            onChange={(e) => updateQuestion(questionIndex, "text", e.target.value)}
            placeholder="Enter your question here"
            className="text-black"
          />

          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox
                  id={`q${questionIndex}-o${optionIndex}`}
                  checked={question.correctAnswers.includes(optionIndex)}
                  onCheckedChange={() => toggleCorrectAnswer(questionIndex, optionIndex)}
                />
                <Input
                  value={option}
                  onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                  className="text-black"
                />
              </div>
            ))}
          </div>

          <Button type="button" className="text-black" variant="outline" size="sm" onClick={() => addOption(questionIndex)}>
            Add Option
          </Button>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`multipleChoice-${questionIndex}`}
              checked={question.isMultipleChoice}
              onCheckedChange={(checked: boolean) => updateQuestion(questionIndex, "isMultipleChoice", checked)}
            />
            <Label className="text-black" htmlFor={`multipleChoice-${questionIndex}`}>
              Allow multiple correct answers
            </Label>
          </div>
        </div>
      ))}

      <Button type="button" onClick={addQuestion} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Add Question
      </Button>

      <Button type="submit" className="w-full">
        Create Test
      </Button>
    </form>
  )
}
