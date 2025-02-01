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
  // Define state for test results
  const [formattedResults, setFormattedResults] = useState<TestResult[]>([]);
   const router = useRouter();
    const { testId } = router.query;

    const [createdBy, setCreatedBy] = useState("") // This would typically come from your auth system
    
    
    useEffect(() => {
        const updateUserId = async () => {
            const userId =  Cookies.get("userId_LearnYourSelf")
            if (userId) {
                setCreatedBy(userId)
            }
        }

        if (!createdBy) {
            updateUserId()
        }
    }, [createdBy])

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
    if(createdBy && testId){
        fetchResults();
    }
  
  }, [createdBy,testId]);

  return (
    <Layout>
    <div className="container mx-auto p-6">
      <Card className="shadow-lg rounded-xl">
        <CardContent className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Test Results</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Test Title</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedResults.map((result) => (
                <TableRow key={result._id}>
                  <TableCell>{result._id.slice(-6)}</TableCell>
                  <TableCell>{result.testTitle}</TableCell>
                  <TableCell>{result.questionCount}</TableCell>
                  <TableCell>{result.marksObtained}</TableCell>
                  <TableCell>{result.totalMarks}</TableCell>
                  <TableCell>{result.formattedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </Layout>
  );
}