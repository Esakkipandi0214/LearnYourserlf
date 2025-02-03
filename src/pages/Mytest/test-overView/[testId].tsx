import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "@/components/LayoutComponents/Layout";
import { useAppContext } from "../../../../Providers/AppContext";

// Define the type for test results
interface TestResult {
  _id: string;
  testTitle: string;
  questionCount: number;
  totalMarks: number;
  marksObtained: number;
  submittedAt: string;
  formattedDate?: string;
}

export default function TestResultsPage() {
  const [formattedResults, setFormattedResults] = useState<TestResult[]>([]);
  const router = useRouter();
  const { testId } = router.query;
  const [createdBy, setCreatedBy] = useState("");
  const { isEnglish } = useAppContext();

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
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `/api/tests/Results/getResults?userId=${createdBy}&&testId=${testId}`
        );
        const data = await response.json();

        // Format date and update state
        const resultsWithFormattedDate = data.result.map(
          (result: TestResult) => ({
            ...result,
            formattedDate: new Date(result.submittedAt).toLocaleString(
              "en-GB",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }
            ),
          })
        );

        setFormattedResults(resultsWithFormattedDate);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };
    if (createdBy && testId) {
      fetchResults();
    }
  }, [createdBy, testId]);

  return (
    <Layout>
      <div className="container mx-auto  sm:p-4">
        <Card className="shadow-lg rounded-xl">
          <CardContent className="p-4">
            <h2
              className={`text-lg ${
                isEnglish ? "lg:text-2xl" : ""
              } font-semibold mb-4`}
            >
              {isEnglish ? "Test Results" : "சோதனை முடிவுகள்"}
            </h2>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "ID" : "அடையாளம்"}
                    </TableHead>
                    <TableHead className="px-32 lg:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "Test Title" : "சோதனை தலைப்பு"}
                    </TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "Questions" : "கேள்விகள்"}
                    </TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "Marks Obtained" : "பெற்ற மதிப்பெண்கள்"}
                    </TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "Total Marks" : "மொத்த மதிப்பெண்கள்"}
                    </TableHead>
                    <TableHead className="px-28 lg:px-4 py-2 whitespace-nowrap">
                      {isEnglish ? "Submitted At" : "சமர்ப்பிக்கப்பட்ட தேதி"}
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {formattedResults.map((result, index) => (
                    <TableRow key={result._id} className="border-b">
                      <TableCell className="px-8 sm:px-4 py-2 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-14 flex justify-center items-center sm:px-4 py-2">
                        {result.testTitle}
                      </TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">
                        {result.questionCount}
                      </TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">
                        {result.marksObtained}
                      </TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">
                        {result.totalMarks}
                      </TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">
                        {result.formattedDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
