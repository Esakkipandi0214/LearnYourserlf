import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutComponents/Layout";

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
      const isMultipleChoice = test?.questions.find(q => q._id === questionId)?.isMultipleChoice;

      if (isMultipleChoice) {
        const previousSelections = Array.isArray(prevAnswers[questionId]) ? prevAnswers[questionId] as number[] : [];
        return {
          ...prevAnswers,
          [questionId]: previousSelections.includes(optionIndex)
            ? previousSelections.filter(i => i !== optionIndex) // Unselect if already selected
            : [...previousSelections, optionIndex], // Select new option
        };
      } else {
        return { ...prevAnswers, [questionId]: optionIndex }; // Single-choice selection
      }
    });
  };

  const handleSubmit = () => {
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
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <span className="text-2xl text-gray-600">Loading test...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {test && !submitted ? (
          <>
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">{test.TestTitle}</h1>

            <div className="space-y-6">
              {test.questions.map((question, qIndex) => (
                <div key={question._id} className="border p-4 rounded-lg">
                  <p className="text-lg font-semibold text-black">
                    {qIndex + 1}. {question.text}
                  </p>
                  <div className="flex gap-6 mt-4">
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
                        <span className="text-gray-700">{option}</span>
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
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">Test Result</h1>
            <p className="text-lg">Your score is: {score} out of {test?.questions.length}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
