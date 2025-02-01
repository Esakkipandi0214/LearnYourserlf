import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutComponents/Layout";


export default function AddQuestion() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const { testId } = router.query; // Replace with dynamic testId if needed

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (optionIndex: number) => {
    setCorrectAnswers((prev) => {
      if (!isMultipleChoice) {
        return [optionIndex];
      }
      return prev.includes(optionIndex)
        ? prev.filter((answer) => answer !== optionIndex)
        : [...prev, optionIndex].sort((a, b) => a - b);
    });
  };


  const validateQuestion = () => {
    if (!text.trim()) {
      alert("Question text is required!");
      return false;
    }

    if (options.length < 2) {
      alert("Each question must have at least two options!");
      return false;
    }

    if (options.some((option) => !option.trim())) {
      alert("All options must be filled!");
      return false;
    }

    if (correctAnswers.length === 0) {
      alert("At least one correct answer is required!");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateQuestion()) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/tests/AddQuestion/${testId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: { text, options, correctAnswers, isMultipleChoice },
        }),
      });
      if (!response.ok) throw new Error("Failed to add question");
      alert("Question added successfully!");
      router.push("/Mytest");
    } catch (error) {
      console.error("Error adding question:", error);
    }
    setSaving(false);
  };

  return (
    <Layout>
    <div className="p-6  bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">Add Question</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-2 rounded-md mb-4"
        placeholder="Enter question text"
      />
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-1 border p-2 rounded-md"
            placeholder={`Option ${index + 1}`}
          />
          <input
            type="checkbox"
            checked={correctAnswers.includes(index)}
            onChange={() => handleCorrectAnswerChange(index)}
            className="h-5 w-5"
          />
        </div>
      ))}
      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={isMultipleChoice}
          onChange={(e) => setIsMultipleChoice(e.target.checked)}
          className="h-5 w-5"
        />
        <span>Allow multiple answers</span>
      </label>
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white p-2 rounded-md"
      >
        {saving ? "Saving..." : "Add Question"}
      </button>
    </div>
    </Layout>
  );
}
