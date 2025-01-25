import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {  Chapter } from '../Datas/chapterData'; // Adjust the path if needed
import SearchComponent from '@/components/common/SearchComponent';

const ChapterPage = ({ filteredChapters,CourseName }: { filteredChapters: Chapter[],CourseName:string }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayChapters, setDisplayChapters] = useState<Chapter[]>(filteredChapters);

  // Update search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter chapters based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setDisplayChapters(filteredChapters); // Show all if no query
    } else {
      const filtered = filteredChapters.filter((chapter) =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayChapters(filtered);
    }
  }, [searchQuery, filteredChapters]);

  // Navigate to chapter details page
  const handleChapterCardClick = (chapterTitle: string) => {
    router.push(`/Courses/${CourseName}/${chapterTitle}`); // Adjust routing path as necessary
  };

  console.log("filteredChapters",filteredChapters)

  return (
    <>
      <SearchComponent
        data={filteredChapters.map((chapter) => chapter.title)}
        onSearch={handleSearch}
      />
      <div className="w-full px-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayChapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => handleChapterCardClick(chapter.title)}
              className="bg-gray-700 rounded-lg p-2 cursor-pointer max-w-[300px] sm:min-w-[270px] lg:min-w-[300px]"
            >
              <div className="flex flex-col gap-6 bg-white p-2 rounded-lg h-full">
                <div className="flex gap-10 items-center p-2">
                  <h1 className="font-bold text-xl">SR</h1>
                  <h2 className="font-semibold text-lg">{chapter.title}</h2>
                </div>
                <div>
                  <div className="flex gap-2">
                    <p className="font-medium">Modules:</p>
                    <p>{chapter.modules}</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-medium">Progress:</p>
                    <p>{chapter.progress}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {displayChapters.length === 0 && (
          <div className="text-center text-gray-500 mt-4">No chapters found</div>
        )}
      </div>
    </>
  );
};

export default ChapterPage;
