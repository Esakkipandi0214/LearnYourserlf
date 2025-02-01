import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutComponents/Layout";
import Cookies from "js-cookie";
import {GlassmorphicLoader} from "@/components/common/LoaderModer";

interface Question {
  text: string;
  options: string[];
  correctAnswers: number[];
  isMultipleChoice: boolean;
  _id: string;
}

interface Test {
  _id: string;
  TestTitle: string;
  questions: Question[];
}

export default function AttendTestPage() {
  const [test, setTest] = useState<Test | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | number[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const router = useRouter();
  const { testId } = router.query;
  const [createdBy, setCreatedBy] = useState(""); // This would typically come from your auth system

  useEffect(() => {
    const updateUserId = async () => {
      const userId = Cookies.get("userId_LearnYourSelf");
      if (userId) {
        setCreatedBy(userId);
      }
    };

    if (!createdBy) {
      updateUserId();
    }
  }, [createdBy]);

  useEffect(() => {
    if (!testId) return;

    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/tests/practiceTest/${testId}`);
        const data = await response.json();
        setTest(data.test);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test:", error);
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prevAnswers) => {
      const isMultipleChoice = test?.questions.find((q) => q._id === questionId)?.isMultipleChoice;

      if (isMultipleChoice) {
        const previousSelections = Array.isArray(prevAnswers[questionId]) ? prevAnswers[questionId] as number[] : [];
        return {
          ...prevAnswers,
          [questionId]: previousSelections.includes(optionIndex)
            ? previousSelections.filter((i) => i !== optionIndex)
            : [...previousSelections, optionIndex],
        };
      } else {
        return { ...prevAnswers, [questionId]: optionIndex };
      }
    });
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;

    test?.questions.forEach((question) => {
      const selectedAnswer = selectedAnswers[question._id];

      if (Array.isArray(selectedAnswer)) {
        if (
          selectedAnswer.length === question.correctAnswers.length &&
          selectedAnswer.every((val) => question.correctAnswers.includes(val))
        ) {
          calculatedScore += 1;
        }
      } else {
        if (question.correctAnswers.includes(selectedAnswer)) {
          calculatedScore += 1;
        }
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    // Submit the result to the API
    const submitData = {
      testId: test?._id,
      testTitle: test?.TestTitle,
      userId: createdBy,
      questionCount: test?.questions.length,
      totalMarks: test?.questions.length, // Assuming each question is worth 1 mark
      marksObtained: calculatedScore,
    };

    try {
      const response = await fetch("/api/tests/Results/submitResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Result submitted successfully");
      } else {
        console.error("Error submitting result:", data.message);
      }
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  if (loading) {
    return (
      <Layout>
       <GlassmorphicLoader/>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {test && !submitted ? (
          <>
            <h1 className=" text-lg sm:text-3xl font-bold text-indigo-600 mb-6">{test.TestTitle}</h1>

            <div className="space-y-6">
              {test.questions.map((question, qIndex) => (
                <div key={question._id} className="border p-4 rounded-lg">
                  <p className=" text-sm sm:text-lg font-semibold text-black">
                    {qIndex + 1}. {question.text}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 mt-4">
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type={question.isMultipleChoice ? "checkbox" : "radio"}
                          name={question._id}
                          checked={Array.isArray(selectedAnswers[question._id])
                            ? (selectedAnswers[question._id] as number[]).includes(index)
                            : selectedAnswers[question._id] === index}
                          onChange={() => handleAnswerChange(question._id, index)}
                          className="h-4 w-4 text-indigo-600"
                        />
                        <span className="text-gray-700 text-base sm:text-3xl">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Submit Answers
              </button>
            </div>
          </>
        ) : (
          <div className=" space-y-3 sm:space-y-6">
            <h1 className=" text-lg sm:text-3xl font-bold text-indigo-600  sm:mb-6">Test Result</h1>
            <p className=" text-black text-sm sm:text-lg">Your score is: {score} out of {test?.questions.length}</p>
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-2  sm:justify-end  sm:items-center">
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
    <h1 className="text-black bg-blue-200 text-sm sm:text-lg px-2 py-1 rounded">Correct Options</h1>
  </div>
  
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 bg-green-500  rounded-full"></span>
    <h1 className="text-black bg-green-200 text-sm sm:text-lg px-2 py-1 rounded">Correct Selection</h1>
  </div>
  
  <div className="flex items-center gap-2">
    <span className="w-4 h-4 bg-red-500 rounded-full"></span>
    <h1 className="text-black bg-red-200 text-sm sm:text-lg px-2 py-1 rounded">Incorrect Selection</h1>
  </div>
</div>

            <div className="space-y-6">
              {test?.questions.map((question, qIndex) => (
                <div key={question._id} className="border p-4 rounded-lg">
                  <p className=" text-sm sm:text-lg font-semibold text-black">
                    {qIndex + 1}. {question.text}
                  </p>
                  <div className="flex flex-col sm:flex-row  gap-6 mt-4">
                    {question.options.map((option, index) => {
                      const isCorrect = question.correctAnswers.includes(index);
                      const isSelected = Array.isArray(selectedAnswers[question._id])
                        ? (selectedAnswers[question._id] as number[]).includes(index)
                        : selectedAnswers[question._id] === index;
                      return (
                        <p
                          key={index}
                          className={`p-2 text-sm sm:text-lg rounded-lg text-black ${isSelected ? (isCorrect ? 'bg-green-200' : 'bg-red-200') : ''} ${!isSelected && isCorrect ? 'bg-blue-200' : ''}`}
                        >
                          {`${index + 1})`}. {option}
                        </p>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
