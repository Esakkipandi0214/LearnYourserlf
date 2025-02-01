import { useState, useEffect } from "react";
import Layout from "@/components/LayoutComponents/Layout";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { Trash } from 'lucide-react';
import Cookies from "js-cookie";
import {GlassmorphicLoader} from "@/components/common/LoaderModer"
import { History } from "lucide-react";

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
  createdBy: string;
  authorizedIds: string[];
  createdAt: string;
  updatedAt: string;
}

export default function TestsPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [createdBy, setCreatedBy] = useState(""); // This would typically come from your auth system
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [testToDelete, setTestToDelete] = useState<string | null>(null); // ID of test to delete

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
    // Check if `createdBy` is defined before fetching
    if (createdBy) {
      // Fetch tests immediately on mount
      fetchTests(createdBy);

      // Set an interval to fetch tests every 5 seconds (5000ms)
      const intervalId = setInterval(() => fetchTests(createdBy), 5000);

      // Cleanup function to clear the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [createdBy]); // Dependency array includes `createdBy`

  const fetchTests = async (createdBy: string) => {
    try {
      const response = await fetch(`/api/tests/getTests/${createdBy}`);
      const data = await response.json();
      setTests(data.tests);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setLoading(false);
    }
  };

  const handleDeleteConfirmation = (testId: string) => {
    setTestToDelete(testId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!testToDelete) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tests/deleteTest?id=${testToDelete}`, {
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
      <div className="space-y-6  sm:p-6">
        <div className=" flex justify-between items-center">
          <h1 className=" text-lg sm:text-xl flex justify-center items-center font-bold text-[#23486A] ">
            Question Bank
          </h1>
          <button
            onClick={() => router.push("/Create-test")}
            className=" bg-red-600 flex  text-xs sm:text-sm justify-center items-center font-medium px-1 py-2 rounded-lg text-white"
          >
            Create Test
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test._id}
              className="border border-gray-200 rounded-lg px-1.5  py-3 sm:p-6 transition-transform duration-300 transform hover:sm:scale-105 hover:shadow-xl bg-[#23486A]"
            >
              <div className=" flex justify-between items-center">
                <h2 className=" text-base sm:text-xl font-semibold text-white">
                  {test.TestTitle}
                </h2>
                <div className=" flex gap-1">
                <button
                   onClick={()=>router.push(`/Mytest/test-overView/${test._id}`)}
                    disabled={isDeleting}
                    className="  rounded-lg px-1.5 py-1 "
                  >
                     <History className=" sm:w-5 sm:h-5 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleDeleteConfirmation(test._id)}
                    disabled={isDeleting}
                    className=" text-white rounded-lg flex items-center gap-2  sm:p-1   bg-red-600"
                  >
                    <Trash className=" h-4 sm:h-auto" /> {/* Trash is the delete icon */}
                  </button>
                  <button
                    onClick={() => router.push(`/Mytest/AddQuestoin?testId=${test._id}`)}
                    className="flex items-center gap-2  sm:p-1 px-1 text-blue-600 bg-white rounded-lg"
                  >
                    <FaPlus className=" h-3 sm:h-auto" />
                  </button>
                </div>
                
              </div>
              <p className="text-white/70">
                Questions:{" "}
                <span className="font-semibold">{test.questions.length}</span>
              </p>
              <div className=" flex items-center gap-3">
                <button
                  className="mt-4 p-1 text-xs sm:text-xl sm:px-4 sm:py-2  text-black bg-white rounded-md  transition-colors"
                  onClick={() => router.push(`/Mytest/EditTest?testId=${test._id}`)}
                >
                  Edit Test
                </button>
                <button
                  className="mt-4 p-1 text-xs sm:text-xl sm:px-4 sm:py-2  text-white bg-red-600 rounded-md  transition-colors"
                  onClick={() => router.push(`/Mytest/AttendTestPage?testId=${test._id}`)}
                >
                  Take Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
            <p className="text-gray-600 mt-2">This action cannot be undone.</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
