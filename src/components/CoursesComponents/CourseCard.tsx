import Image from "next/image";
import React from "react";

interface CourseCardProps {
  image: string;
  name: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ image, name }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg shadow-lg"
        />
      </div>
      {/* Name */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
};

export default CourseCard;
