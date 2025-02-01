import { FC } from "react";
import Card from "@/components/Dashboard/Card";
import Chart from "@/components/Dashboard/Chart";
import Layout from "@/components/LayoutComponents/Layout";

const Dashboard: FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Student Test Dashboard</h1>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card title="Total Tests Created" value="25" />
          <Card title="Total Tests Taken" value="150" />
          <Card title="Average Test Score" value="75%" />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Chart />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
