"use client"

import { useState , useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2 } from "lucide-react"
import Cookies from "js-cookie"
import { useAppContext } from "../../../Providers/AppContext"

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

// interface TestCreatorProps {
//   createdBy: string
// }

export default function TestCreator() {
  const [createdBy, setCreatedBy] = useState("")
  const {isEnglish} = useAppContext()
  const [test, setTest] = useState<Test>({
    questions: [],
    createdBy: createdBy , 
    authorizedIds: [],
    TestTitle: "", // Add initial value for TestTitle
  })


  // This would typically come from your auth system
    
    
  useEffect(() => {
    const userId = Cookies.get("userId_LearnYourSelf")
    if (userId) {
      setCreatedBy(userId)
      setTest((prevTest) => ({ ...prevTest, createdBy: userId }))
    }
  }, [])

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

       // Validate the form
  if (!test.TestTitle) {
    alert( isEnglish?"Test title is required!":"தேர்வு தலைப்பு தேவை!")
    return
  }

  if (test.questions.length === 0) {
    alert( isEnglish?"You must add at least one question!":"நீங்கள் குறைந்தபட்சம் ஒரு கேள்வியைச் சேர்க்க வேண்டும்!")
    return
  }

  if (!test.createdBy.trim()) {
    alert( isEnglish?"Required Credentials Missing !":"தேவையான சான்றுகள் காணவில்லை!")
    return
  }

  for (const question of test.questions) {
    // Check if the question text is filled
    if (!question.text.trim()) {
      alert( isEnglish?"Question text is required for all questions!":"அனைத்து கேள்விகளுக்கும் கேள்வி உரை தேவை!")
      return
    }

    // Check if there are at least two options
    if (question.options.length < 2) {
      alert( isEnglish?`Question ${test.questions.indexOf(question) + 1} must have at least two options!`:`கேள்வி ${test.questions.indexOf(question) + 1} குறைந்தது இரண்டு விருப்பங்கள் இருக்க வேண்டும்!`)
      return
    }

    // Check if all options are filled
    if (question.options.some(option => !option.trim())) {
      alert( isEnglish?`All options must be filled for Question ${test.questions.indexOf(question) + 1}!`:`கேள்விக்கான அனைத்து விருப்பங்களும் நிரப்பப்பட வேண்டும் ${test.questions.indexOf(question) + 1}!`)
      return
    }

    // Check if there is at least one correct answer
    if (question.correctAnswers.length === 0) {
      alert(isEnglish?`At least one correct answer is required for Question ${test.questions.indexOf(question) + 1}!`:`கேள்விக்கு குறைந்தபட்சம் ஒரு சரியான பதில் தேவை ${test.questions.indexOf(question) + 1}!`)
      return
    }
  }



    try {
      const response = await fetch("/api/tests/create", {
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
      alert(isEnglish?"Test created successfully!":"சோதனை வெற்றிகரமாக உருவாக்கப்பட்டது!")

      // Reset form after successful submission
      setTest({
        questions: [],
        createdBy,
        authorizedIds: [],
        TestTitle: "",
      })
    } catch (error) {
      console.error("Error creating test:", error)
      alert(isEnglish?"Failed to create test. Please try again.":"சோதனையை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" space-y-5 sm:space-y-8  p-2 sm:p-6">
      <h1 className=" text-lg sm:text-2xl font-bold text-black sm:mb-6">{ isEnglish?"Create a Test":"சோதனையை உருவாக்கு"}</h1>

      {/* Test Title Input */}
      <div className="space-y-2">
        <Label htmlFor="testTitle" className="text-black">{ isEnglish?"Test Title":"சோதனை தலைப்பு"}</Label>
        <Input
          id="testTitle"
          value={test.TestTitle}
          onChange={(e) => setTest({ ...test, TestTitle: e.target.value })}
          placeholder={isEnglish?"Enter the test title":"சோதனை தலைப்பை உள்ளிடவும்"}
          className="text-black"
        />
      </div>

      {test.questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded-md space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-black">{ isEnglish?"Question":"கேள்வி"} {questionIndex + 1}</h2>
            <Button type="button" variant="destructive" size="icon" onClick={() => removeQuestion(questionIndex)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            value={question.text}
            onChange={(e) => updateQuestion(questionIndex, "text", e.target.value)}
            placeholder={ isEnglish?"Enter your question here":"உங்கள் கேள்வியை இங்கு உள்ளிடவும்"}
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
                  placeholder={`${ isEnglish?"Option":"தேர்வு"} ${optionIndex + 1}`}
                  className="text-black"
                />
              </div>
            ))}
          </div>

          <Button type="button" className="text-black" variant="outline" size="sm" onClick={() => addOption(questionIndex)}>
           { isEnglish?" Add Option":"தேர்வை சேர்க்கவும்"}
          </Button>

          <div className="flex items-center space-x-2">
            <Checkbox
              id={`multipleChoice-${questionIndex}`}
              checked={question.isMultipleChoice}
              onCheckedChange={(checked: boolean) => updateQuestion(questionIndex, "isMultipleChoice", checked)}
            />
            <Label className="text-black" htmlFor={`multipleChoice-${questionIndex}`}>
              { isEnglish?"Allow multiple correct answers":"பல சரியான பதில்களை அனுமதிக்கவும்"}
            </Label>
          </div>
        </div>
      ))}

      <Button type="button" onClick={addQuestion} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> { isEnglish?"Add Question":"கேள்வி சேர்க்கவும்"}
      </Button>

      <Button type="submit" className="w-full">
        { isEnglish?"Create Test":"சோதனையை உருவாக்கு"}
      </Button>
    </form>
  )
}
