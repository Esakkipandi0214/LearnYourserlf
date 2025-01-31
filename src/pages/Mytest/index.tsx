import { useState, useEffect } from "react";
import Layout from "@/components/LayoutComponents/Layout";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";

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

  useEffect(() => {
    // Fetch tests from the API
    const fetchTests = async () => {
      try {
        const response = await fetch(
          "/api/tests/getTests/6795fce2f5a55a767b18523a"
        );
        const data = await response.json();
        setTests(data.tests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <span className="text-2xl text-gray-600">Loading tests...</span>
        </div>
      </Layout>
    );
  }
  // console.log("Tests:", tests);

  return (
    <Layout>
      <div className="space-y-6 p-6">
        <div className=" flex justify-between items-center">
          <h1 className="text-xl flex justify-center items-center font-bold text-[#23486A] ">
            Qeustion Bank
          </h1>
          <button
            onClick={() => router.push("/Create-test")}
            className=" bg-red-600 flex text-sm justify-center items-center font-medium px-1 py-2 rounded-lg text-white"
          >
            Create Test
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div
              key={test._id}
              className="border border-gray-200 rounded-lg p-6 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl bg-[#23486A]"
            >
              <div className=" flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                {test.TestTitle}
              </h2>
                <button onClick={()=>router.push(`/Mytest/AddQuestoin?testId=${test._id}`)} className="flex items-center gap-2 p-1 text-blue-600 bg-white rounded-lg">
                  <FaPlus />
                </button>
              </div>
              <p className="text-white/70">
                Questions:{" "}
                <span className="font-semibold">{test.questions.length}</span>
              </p>
              <div className=" flex items-center gap-3">
                <button
                  className="mt-4 px-4 py-2 text-black bg-white rounded-md  transition-colors"
                  onClick={() =>
                    router.push(`/Mytest/EditTest?testId=${test._id}`)
                  } // For example, triggering a test details view
                >
                  Edit Test
                </button>
                <button
                  className="mt-4 px-4 py-2 text-white bg-red-600 rounded-md  transition-colors"
                  onClick={() =>
                    router.push(`/Mytest/AttendTestPage?testId=${test._id}`)
                  } // For example, triggering a test details view
                >
                  Take Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
