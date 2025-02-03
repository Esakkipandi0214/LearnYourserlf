import { FC } from "react";
import { useAppContext } from "../../../Providers/AppContext";

interface CardProps {
  title: string;
  value: string;
}

const Card: FC<CardProps> = ({ title, value }) => {
  const {isEnglish} = useAppContext()
  return (
    <div className={`bg-gray-800 p-3 sm:p-6 rounded-lg ${isEnglish&&" text-base"} shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl`}>
      <h2 className= {`sm:text-base ${ isEnglish?"lg:text-xl":" lg:text-base"} font-semibold text-white mb-2`}>{title}</h2>
      <p className={`sm:text-lg ${ isEnglish?"lg:text-3xl":" lg:text-xl"} font-bold text-white`}>{value}</p>
    </div>
  );
};

export default Card;
