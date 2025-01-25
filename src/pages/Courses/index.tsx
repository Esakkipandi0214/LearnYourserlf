import React, { useState, useEffect } from 'react';
import Layout from '@/components/LayoutComponents/Layout';
import CourseStats from '@/components/CoursesComponents/CoursComponent';
import ChapterPage from '@/components/CoursesComponents/ChaptersComponent/ChapterPage';
import SearchComponent from '@/components/common/SearchComponent';
import { Course, courses } from '../../components/CoursesComponents/Datas/chapterData'; // Adjust the path if needed

const Index = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Handle search query updates
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter courses based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCourses([]); // Clear the filtered courses if search query is empty
    } else {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery]); // Re-filter when the search query changes

  return (
    <Layout>
      <SearchComponent
        data={courses.map((course) => course.name)} // Pass all course names to search component
        onSearch={handleSearch} // Handle search in the parent component
      />
       <div className="px-6 my-2">
        <h1 className="font-bold text-black text-xl">My Courses</h1>
      </div>
      {/* Render CourseStats for the filtered course */}
      {filteredCourses.length === 1 ? (
        <CourseStats key={filteredCourses[0].id} course={filteredCourses[0]} />
      ) : (
        filteredCourses.length === 0 && (
          <div className="text-center px-6 py-2  bg-transparent h-auto w-full  text-gray-500">
            <div className=' bg-gray-700 rounded-lg p-3  h-[100px]'><h1 className=' p-5  text-black font-medium text-xl bg-white/90 h-full '>No course found</h1></div></div>
        )
      )}

      <div className="pt-10">
        <div className="px-6">
          <h1 className="font-bold text-black text-xl">Chapters</h1>
        </div>
        {filteredCourses.length === 1 ? (
          <ChapterPage CourseName={filteredCourses[0].name} filteredChapters={filteredCourses[0].chapters} />
        ) : (
          <div className="text-center px-6 py-2  bg-transparent h-auto w-full  text-gray-500">
            <div className=' bg-gray-700 rounded-lg p-3  h-[100px]'><h1 className=' p-5  text-black font-medium text-xl bg-white/90 h-full '>No chapters available</h1></div></div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
