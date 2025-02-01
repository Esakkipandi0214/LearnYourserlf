import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "@/components/LayoutComponents/Layout";

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
        const resultsWithFormattedDate = data.result.map((result: TestResult) => ({
          ...result,
          formattedDate: new Date(result.submittedAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }),
        }));

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
            <h2 className=" text-lg sm:text-2xl font-semibold mb-4">Test Results</h2>

            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="  px-8 sm:px-4 py-2 whitespace-nowrap">ID</TableHead>
                    <TableHead className="px-32 sm:px-4 py-2 whitespace-nowrap">Test Title</TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">Questions</TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">Marks Obtained</TableHead>
                    <TableHead className="px-8 sm:px-4 py-2 whitespace-nowrap">Total Marks</TableHead>
                    <TableHead className="px-28 sm:px-4 py-2 whitespace-nowrap">Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formattedResults.map((result,index) => (
                    <TableRow key={result._id} className="border-b">
                      <TableCell className="px-8 sm:px-4 py-2 text-center">{index+1}</TableCell>
                      <TableCell className="px-14 sm:px-4 py-2">{result.testTitle}</TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">{result.questionCount}</TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">{result.marksObtained}</TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">{result.totalMarks}</TableCell>
                      <TableCell className="px-8 sm:px-4 py-2 text-center">{result.formattedDate}</TableCell>
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
