import React from 'react';
import Layout from '@/components/LayoutComponents/Layout';
import LessonsPage from '@/components/CoursesComponents/Modules/LessonsPage';
import { AiOutlineRight } from 'react-icons/ai'; // Import the arrow icon
import { useRouter } from 'next/router';

const Chapter = () => {
  const router = useRouter();

  const handleChapterCardClick = () => {
    router.push(`/Courses`);
  };

  return (
    <Layout>
      <div className="px-6 items-center flex gap-1">
        <h1 onClick={handleChapterCardClick} className="text-black font-medium cursor-pointer">
          My Courses
        </h1>
        <AiOutlineRight className="text-black text-xl" /> {/* Arrow icon */}
        <h1 className="text-black font-medium">Modules</h1>
      </div>
      <LessonsPage  />
    </Layout>
  );
};

export default Chapter;
