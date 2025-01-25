import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { courses } from '../Datas/chapterData'; // Adjust the path as needed
import SearchComponent from '@/components/common/SearchComponent';

// Define types for course and lesson
interface Course {
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  name: string;
  description: string;
  QuestionCount: string;
  Progess: string;
}

const LessonsPage = () => {
  const router = useRouter();
  const { course: courseName, chapter: chapterTitle } = router.query;

  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Find the selected course and chapter
  const selectedCourse = courses.find((course: Course) => course.name === courseName);
  const selectedChapter = selectedCourse?.chapters.find(
    (chapter: Chapter) => chapter.title === chapterTitle
  );

  // Update the filtered lessons based on the selected chapter and search query
  useEffect(() => {
    if (selectedChapter) {
      const filtered = selectedChapter.lessons.filter((lesson) =>
        lesson.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLessons(filtered);
    }
  }, [selectedChapter, searchQuery]); // Re-filter lessons when the query or chapter changes

  // Ensure the query parameters exist before proceeding
  if (!courseName || !chapterTitle) {
    return <p>Loading...</p>;
  }

  // If no course or chapter is found, show an error message
  if (!selectedCourse || !selectedChapter) {
    return <p>Course or Chapter not found!</p>;
  }

  // Function to handle the search query update
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update search query state
  };

  return (
    <>
      <SearchComponent
        data={selectedChapter.lessons.map((lesson) => lesson.name)} // Pass lesson names to search component
        onSearch={handleSearch} // Handle search in the parent component
      />
      <div className="w-full px-5">
        <h1 className="text-2xl font-bold mb-4">{selectedChapter.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson: Lesson, index: number) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
            >
              <h2 className="text-lg font-semibold">{lesson.name}</h2>
              <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>⏱ Questions | {lesson.QuestionCount}</span>
                <span>📘 Prpgress | {lesson.Progess}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonsPage;
