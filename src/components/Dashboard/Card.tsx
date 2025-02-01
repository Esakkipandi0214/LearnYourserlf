import { FC } from "react";

interface CardProps {
  title: string;
  value: string;
}

const Card: FC<CardProps> = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default Card;
