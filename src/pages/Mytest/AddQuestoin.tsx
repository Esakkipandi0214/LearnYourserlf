import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutComponents/Layout";
import { useAppContext } from "../../../Providers/AppContext";


export default function AddQuestion() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const {isEnglish} = useAppContext()
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
      alert( isEnglish?"Question text is required!":"கேள்வி உரை தேவை!");
      return false;
    }

    if (options.length < 2) {
      alert(isEnglish?"Each question must have at least two options!":"ஒவ்வொரு கேள்விக்கும் குறைந்தது இரண்டு விருப்பங்கள் இருக்க வேண்டும்!");
      return false;
    }

    if (options.some((option) => !option.trim())) {
      alert(isEnglish?"All options must be filled!":"அனைத்து விருப்பங்களும் நிரப்பப்பட வேண்டும்!");
      return false;
    }

    if (correctAnswers.length === 0) {
      alert(isEnglish?"At least one correct answer is required!":"குறைந்தபட்சம் ஒரு சரியான பதில் தேவை!");
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
      alert(isEnglish?"Question added successfully!":"கேள்வி வெற்றிகரமாக சேர்க்கப்பட்டது!");
      router.push("/Mytest");
    } catch (error) {
      console.error("Error adding question:", error);
      alert(isEnglish?"Failed to Add Question !":"கேள்வியைச் சேர்ப்பதில் தோல்வி!")
    }
    setSaving(false);
  };

  return (
    <Layout>
    <div className=" p-2 sm:p-6  bg-white shadow-md rounded-md">
      <h2 className=" text-lg sm:text-2xl lg:text-lg font-bold text-indigo-600 mb-4">{isEnglish?"Add Question":"கேள்வியை சேர்க்கவும்"}</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border text-sm sm:text-lg p-2 text-black rounded-md mb-4"
        placeholder={`${ isEnglish?"Enter question text":"கேள்வியின் உரையை உள்ளிடவும்"}`}
      />
      {options.map((option, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-1 text-sm sm:text-lg lg:text-base border p-2 text-black rounded-md"
            placeholder={`${ isEnglish ?"Option":"தேர்வு"} ${index + 1}`}
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
          className="h-5 text-sm sm:text-lg lg:text-base  sm:w-5"
        />
        <span className=" text-black text-sm lg:text-base sm:text-lg">{isEnglish?"Allow multiple answers":"பல பதில்களை தேர்வு செய்ய அனுமதிக்கவும்"}</span>
      </label>
      <button
        onClick={handleSubmit}
        className=" text-sm sm:text-lg lg:text-base sm:w-full bg-indigo-600 text-white p-2 rounded-md"
      >
        {saving ? (isEnglish ? "Saving..." :"சேமிக்கப்படுகிறது..."): (isEnglish? "Add Question":"கேள்வியை சேர்க்கவும்")}
      </button>
    </div>
    </Layout>
  );
}
