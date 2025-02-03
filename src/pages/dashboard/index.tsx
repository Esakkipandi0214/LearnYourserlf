import { FC } from "react";
import Card from "@/components/Dashboard/Card";
import Chart from "@/components/Dashboard/Chart";
import Layout from "@/components/LayoutComponents/Layout";
import { useAppContext } from "../../../Providers/AppContext";

const Dashboard: FC = () => {
  const {isEnglish} = useAppContext()
  return (
    <Layout>
      <div className="max-w-7xl mx-auto  px-3 sm:px-6 py-8">
        <h1 className={` text-xl sm:text-2xl ${ isEnglish?"lg:text-4xl":" lg:text-xl"} font-bold text-gray-900 mb-8`}>{isEnglish?"Dashboard":"டாஷ்போர்டு"}</h1>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3 sm:gap-8  sm:mb-12">
          <Card title={ isEnglish?"Total Tests Created":"மொத்த சோதனைகள் உருவாக்கப்பட்டது"} value="25" />
          <Card title={ isEnglish?"Total Tests Taken":"எடுக்கப்பட்ட மொத்த சோதனைகள்"} value="150" />
          <Card title={ isEnglish?"Average Test Score":"சராசரி டெஸ்ட் ஸ்கோர்"} value="75%" />
        </div>

        {/* Chart Section */}
        <div className=" bg-transparent sm:bg-white p-2 mt-5 sm:p-8 rounded-lg shadow-lg">
          <Chart />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
