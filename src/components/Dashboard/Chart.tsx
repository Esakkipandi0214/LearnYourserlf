import { FC, useEffect, useState } from "react";
import { Bar, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement, RadialLinearScale } from "chart.js";
import { useAppContext } from "../../../Providers/AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale
);

const submissions = [
  {
    _id: "679d07facbb90b627ce18ba3",
    testId: "679b8c5f6ca43f14b95041ec",
    testTitle: "Expert Python Programming",
    questionCount: 6,
    userId: "6795fce2f5a55a767b18523a",
    totalMarks: 6,
    marksObtained: 1,
    submittedAt: "2025-01-31T17:27:22.196Z",
    __v: 0,
  },
  {
    _id: "679d0e61488aaa04ae66257f",
    testId: "679d0d74488aaa04ae6624ff",
    testTitle: "NewTest",
    questionCount: 2,
    userId: "6795fce2f5a55a767b18523a",
    totalMarks: 2,
    marksObtained: 1,
    submittedAt: "2025-01-31T17:54:41.907Z",
    __v: 0,
  },
  {
    _id: "679d0ff3e7ead24a01646cff",
    testId: "679d0fb5e7ead24a01646ccd",
    testTitle: "sdfafsdfas",
    questionCount: 2,
    userId: "6795fce2f5a55a767b18523a",
    totalMarks: 2,
    marksObtained: 0,
    submittedAt: "2025-01-31T18:01:23.940Z",
    __v: 0,
  }
];

interface TestResult {
  testTitle: string;
  totalMarks: number;
  totalMarksObtained: number;
  questionCount: number;
  correctAnswers: number;
  submissionDate: string;
}

const Chart: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {isEnglish} = useAppContext()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testResults = submissions.reduce<{ [key: string]: TestResult }>((acc, submission) => {
    const { testTitle, marksObtained, totalMarks, submittedAt, questionCount } = submission;
    if (!acc[testTitle]) {
      acc[testTitle] = {
        testTitle,
        totalMarks: 0,
        totalMarksObtained: 0,
        correctAnswers: 0,
        questionCount: 0,
        submissionDate: submittedAt,
      };
    }
    acc[testTitle].totalMarks += totalMarks;
    acc[testTitle].totalMarksObtained += marksObtained;
    acc[testTitle].correctAnswers += marksObtained;
    acc[testTitle].questionCount += questionCount;

    if (new Date(submittedAt) > new Date(acc[testTitle].submissionDate)) {
      acc[testTitle].submissionDate = submittedAt;
    }

    return acc;
  }, {});

  const tests = Object.values(testResults).map((test) => {
    const percentage = ((test.totalMarksObtained / test.totalMarks) * 100).toFixed(0);
    const correctAnswerPercentage = ((test.correctAnswers / test.questionCount) * 100).toFixed(0);
    return { ...test, percentage: parseInt(percentage), correctAnswerPercentage: parseInt(correctAnswerPercentage) };
  });

  const chartData = {
    labels: tests.map((test) => test.testTitle),
    datasets: [
      {
        label:isEnglish ?"Marks Percentage":"மதிப்பெண் சதவீதம்",
        data: tests.map((test) => test.percentage),
        backgroundColor: "#4CAF50", 
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: isEnglish ? "Correct Answer Percentage":"சரியான பதில் சதவீதம்",
        data: tests.map((test) => test.correctAnswerPercentage),
        backgroundColor: "#2196F3", 
        borderColor: "#1976D2",
        borderWidth: 1,
      },
    ],
  };

  const mobileChartData = {
    labels: tests.map((test) => test.testTitle),
    datasets: [
      {
        label: isEnglish ?"Marks Percentage":"மதிப்பெண் சதவீதம்",
        data: tests.map((test) => test.percentage),
        backgroundColor: [
          "#FF9800", "#FF5722", "#FFEB3B", "#8BC34A", "#2196F3"
        ], 
        borderColor: "#FB8C00",
        borderWidth: 1,
      },
      {
        label: isEnglish ? "Correct Answer Percentage":"சரியான பதில் சதவீதம்",
        data: tests.map((test) => test.correctAnswerPercentage),
        backgroundColor: [
          "#9C27B0", "#673AB7", "#3F51B5", "#4CAF50", "#FFC107"
        ], 
        borderColor: "#7B1FA2",
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <h2 className={`text-lg ${ isEnglish?"sm:text-2xl":" sm:text-lg"} font-semibold text-gray-900 mb-4`}>{ isEnglish?"Test Scores":"சோதனை மதிப்பெண்கள்"}</h2>

      {isMobile ? (
        <PolarArea className="w-full" data={mobileChartData} options={{ responsive: true, plugins: { title: { display: true, text: isEnglish ? "Test Results":"சோதனை முடிவுகள்" } } }} />
      ) : (
        <Bar className="w-full" data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: isEnglish ? "Test Results":"சோதனை முடிவுகள்" } } }} />
      )}

      {/* Test Details for Mobile */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div key={test.testTitle} className="bg-white p-4 rounded-lg shadow-md">
            <p className="font-semibold text-gray-800 text-lg">{test.testTitle}</p>
            <p className="text-sm text-gray-600">{ isEnglish?"Questions:":"கேள்விகள்:"} {test.questionCount}</p>
            <p className="text-sm text-gray-600">{ isEnglish?"Correct Answers:":"சரியான பதில்கள்:"} {test.correctAnswers}</p>
            <p className="text-sm text-gray-600">{isEnglish?"Avg. Mark:":"சராசரி குறி:"} {test.percentage}%</p>
            <p className="text-sm text-gray-600">{isEnglish?"Correct Answer %:":"சரியான பதில் %:"} {test.correctAnswerPercentage}%</p>
            <p className="text-sm text-gray-600">{isEnglish?"Test Taken:":"சோதனை எடுக்கப்பட்டது:"} {new Date(test.submissionDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
