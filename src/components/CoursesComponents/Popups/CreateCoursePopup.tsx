import React, { useState } from "react";
import { X } from "lucide-react";
import { Course } from "@/components/CoursesComponents/Datas/chapterData"; // Adjust the path if needed

interface PopupCourseProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (value: Course) => void;
}

const CreateCoursePopup: React.FC<PopupCourseProps> = ({ isOpen, onClose, onCreate }) => {
  const [course, setCourse] = useState<Course>({
    id: Date.now(),
    name: "",
    description: "",
    totalChapters: 0,
    totalModules: 0,
    progress: "0%",
    collaborators: [], // No need to handle collaborators here
    chapters: [], // Empty chapters
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (course.name && course.description) {
      const newCourse: Course = {
        ...course,
        chapters: [],  // Empty chapters
      };
      onCreate(newCourse); // Pass the course data to the parent component
      onClose(); // Close the popup after submitting
    } else {
      alert("Please fill out the course name and description.");
    }
  };

  if (!isOpen) return null; // If popup is not open, don't render

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create a New Course</h2>
          <button onClick={onClose} className="text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={course.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Course Description"
              value={course.description}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            ></textarea>

            {/* Optional fields */}
            <input
              type="number"
              name="totalChapters"
              placeholder="Total Chapters"
              value={course.totalChapters}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              name="totalModules"
              placeholder="Total Modules"
              value={course.totalModules}
              onChange={handleInputChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePopup;
