import { FC } from "react";

interface CardProps {
  title: string;
  value: string;
}

const Card: FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <h2 className=" sm:text-base lg:text-xl font-semibold text-white mb-2">{title}</h2>
      <p className=" sm:text-lg lg:text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default Card;
