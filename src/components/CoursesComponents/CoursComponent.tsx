import React from 'react';
 // Adjust the path if needed
 interface Course {
      id: number;
      name: string;
      description: string;
      totalChapters: number;
      totalModules: number;
      progress: string;
      collaborators: string[]; // Array of IDs
 }
const CourseStats = ({ course }: { course: Course }) => {
  return (
    <div className='w-full p-3 flex flex-col lg:flex-row gap-2 rounded-lg bg-gray-700 text-black shadow-2xl'>
      <div className='w-full lg:w-[50%] flex flex-col gap-2 bg-white p-2 rounded-lg'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-black underline font-bold'>Course Name</h1>
          <h2 className='text-black/75 font-medium'>{course.name}</h2>
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='text-black font-bold underline'>Course Description</h1>
          <p className='text-black/75 font-medium'>{course.description}</p>
        </div>
        <div className='w-full relative h-12'>
          <div>
            <h1 className='text-black font-bold underline'>Collaborators</h1>
          </div>
          <div className="relative w-full">
            {course.collaborators.map((collaborator, index) => (
              <h1
                key={index}
                className="absolute rounded-full p-1 bg-[#FCC6FF] w-7 text-white h-7 top-0 left-0"
                style={{ left: `${index * 3}rem` }}
              >
                {collaborator.slice(0, 2).toUpperCase()}
              </h1>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full lg:w-[50%] grid grid-cols-2 lg:flex lg:flex-row gap-2 justify-evenly items-center bg-white p-2 rounded-lg'>
        <div className='flex flex-col justify-center items-center gap-1'>
          <h1 className='text-red-600 font-bold text-xl '>Total Chapters</h1>
          <h2 className='text-black/75 font-medium text-2xl'>{course.totalChapters}</h2>
        </div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <h1 className='text-blue-600 font-bold text-xl '>Total Modules</h1>
          <p className='text-black/75 font-medium text-2xl'>{course.totalModules}</p>
        </div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <h1 className='text-green-600 font-bold text-xl '>Progress</h1>
          <p className='text-black/75 font-medium text-2xl'>{course.progress}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseStats;
