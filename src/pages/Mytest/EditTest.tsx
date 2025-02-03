import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/LayoutComponents/Layout";
import { Trash } from 'lucide-react';
import {GlassmorphicLoader} from "@/components/common/LoaderModer"
import { useAppContext } from "../../../Providers/AppContext";


interface Question {
  text: string;
  options: string[];
  correctAnswers: number[]; // Store multiple correct answers for multiple choice
  isMultipleChoice: boolean;
  _id: string;
}

interface Test {
  _id: string;
  TestTitle: string;
  questions: Question[];
  authorizedIds?: string[];
  updatedAt?: string;
}

export default function EditTestPage() {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [questionToDelete, setTestToDelete] = useState<string | null>(null);
  const { testId } = router.query;
  const {isEnglish} = useAppContext()

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

  const handleTestTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTest((prevTest) => (prevTest ? { ...prevTest, TestTitle: event.target.value } : null));
  };

  const handleQuestionChange = (index: number, field: keyof Question, value: string | boolean | string[]) => {
    setTest((prevTest) => {
      if (!prevTest) return null;
      const updatedQuestions = [...prevTest.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prevTest, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (qIndex: number, optionIndex: number, value: string) => {
    setTest((prevTest) => {
      if (!prevTest) return null;
      const updatedQuestions = [...prevTest.questions];
      updatedQuestions[qIndex].options[optionIndex] = value;
      return { ...prevTest, questions: updatedQuestions };
    });
  };

  const handleCorrectAnswerChange = (qIndex: number, optionIndex: number) => {
    setTest((prevTest) => {
      if (!prevTest) return null;
  
      const updatedQuestions = [...prevTest.questions];
      const question = { ...updatedQuestions[qIndex] }; // Create a shallow copy of the question object
  
      // For single choice question
      if (!question.isMultipleChoice) {
        question.correctAnswers = [optionIndex];
      } else {
        // Check if the option is already in the correctAnswers array
        const isAlreadyCorrect = question.correctAnswers.includes(optionIndex);
        
        if (isAlreadyCorrect) {
          // Remove the option if it's already marked as correct
          question.correctAnswers = question.correctAnswers.filter(
            (answer) => answer !== optionIndex
          );
        } else {
          // Add the option to correctAnswers if it's not selected
          question.correctAnswers = [...question.correctAnswers, optionIndex];
        }
  
        // Ensure the correctAnswers are sorted
        question.correctAnswers.sort((a, b) => a - b);
      }
  
      // Replace the original question with the updated question in the questions array
      updatedQuestions[qIndex] = question;
  
      // Return the updated test state with the updated questions array
      return { ...prevTest, questions: updatedQuestions };
    });
  };

  const saveTest = async () => {
    if (!test) return;
  
      // Validate the form
  if (!test.TestTitle) {
    alert("Test title is required!")
    return
  }

  if (test.questions.length === 0) {
    alert("You must add at least one question!")
    return
  }

  for (const question of test.questions) {
    // Check if the question text is filled
    if (!question.text.trim()) {
      alert("Question text is required for all questions!")
      return
    }

    // Check if there are at least two options
    if (question.options.length < 2) {
      alert(`Question ${test.questions.indexOf(question) + 1} must have at least two options!`)
      return
    }

    // Check if all options are filled
    if (question.options.some(option => !option.trim())) {
      alert(`All options must be filled for Question ${test.questions.indexOf(question) + 1}!`)
      return
    }

    // Check if there is at least one correct answer
    if (question.correctAnswers.length === 0) {
      alert(`At least one correct answer is required for Question ${test.questions.indexOf(question) + 1}!`)
      return
    }
  }



    setSaving(true);

    try {
      const updatedTest = {
        TestTitle: test.TestTitle,
        questions: test.questions.map((question) => ({
          _id: question._id,
          text: question.text,
          options: question.options,
          correctAnswers: question.correctAnswers,
          isMultipleChoice: question.isMultipleChoice,
        })),
      };

      const response = await fetch(`/api/tests/updateTest/${test._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTest),
      });

      if (!response.ok) throw new Error("Failed to save test");

      alert("Test updated successfully!");

    } catch (error) {
      console.error("Error saving test:", error);
    }

    setSaving(false);
  };

  const handleDeleteConfirmation = (testId: string) => {
    setTestToDelete(testId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!questionToDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tests/deleteQuestion?testId=${test?._id}&&questionId=${questionToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete test');
      }

      alert('Test deleted successfully!');
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Error deleting test');
      setIsModalOpen(false); // Close the modal if there's an error
    } finally {
      setIsDeleting(false);
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
      <div className="space-y-6 p-2 sm:p-6">
        <h1 className="  text-xl lg:text-xl font-bold text-indigo-600 mb-6">{ isEnglish?"Edit Test":"சோதனையை திருத்து"}</h1>

        <div className="mb-6">
          <label className="block text-base lg:text-base font-semibold text-black">{ isEnglish?"Test Title":"சோதனை தலைப்பு"}</label>
          <input
            type="text"
            value={test?.TestTitle || ""}
            onChange={handleTestTitleChange}
            className="w-full border text-sm lg:text-base p-2 text-black rounded-md"
          />
        </div>

        {test?.questions.map((question, qIndex) => (
          <div key={question._id} className="border p-4 rounded-lg space-y-3">
            <div className=" flex flex-col sm:flex-row gap-3  w-[97%]">
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
              className="w-full border p-2 text-sm lg:text-base text-black rounded-md"
              placeholder="Enter question text"
            />
              <button
                    onClick={() => handleDeleteConfirmation(question._id)}
                    disabled={isDeleting}
                    className=" text-white  flex w-[15%] sm:w-auto items-center justify-center rounded-lg sm:px-1.5 py-0.5 sm:py-1  bg-red-600"
                  >
                    <Trash className=" text-lg" /> {/* Trash is the delete icon */}
                  </button>
                  </div>
            <div className="grid gap-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="flex-1 text-sm lg:text-sm border p-2 text-black rounded-md"
                    placeholder={`Option ${oIndex + 1}`}
                  />
                  <input
                    type="checkbox"
                    checked={question.correctAnswers.includes(oIndex)}
                    onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                    className="h-5 w-5 text-indigo-600"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between">
          <button
            onClick={saveTest}
            className="px-6 py-3 bg-indigo-600 text-sm sm:text-lg  lg:text-base text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            {saving ? isEnglish? "Saving...":"சேமிக்கப்படுகிறது" : isEnglish ? "Save Changes":"மாற்றங்களை சேமிக்கவும்"}
          </button>
        </div>
      </div>

       {/* Confirmation Modal */}
       {isModalOpen && (
        <div className="fixed p-4 sm:p-2 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className={`font-semibold text-base ${ isEnglish?"sm:text-xl":"sm:text-base"} text-gray-800`}>{isEnglish?"Are you sure?":"நீங்கள் நிச்சயமாக இருக்கிறீர்களா?"}</h2>
            <p className={`text-gray-600 text-base ${ isEnglish?"sm:text-xl":" sm:text-base"} mt-2`}>{isEnglish?"This action cannot be undone.":"இந்த செயலை பின்வாங்க முடியாது"}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={` ${ isEnglish?"sm:px-4 sm:text-xl":" sm:text-base sm:px-2 "} px-2 text-sm  py-2 bg-gray-300 text-gray-800 rounded-md`}
              >
                { isEnglish?"Cancel":"ரத்து செய்"}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={` ${ isEnglish?"sm:px-4 sm:text-xl":" sm:text-base sm:px-2"} px-2 text-sm  py-2 bg-red-600 text-white rounded-md`}
              >
                {isDeleting ? isEnglish?"Deleting...":"அழிக்கப்படுகிறது" : isEnglish? "Delete":"அழிக்கவும்"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
